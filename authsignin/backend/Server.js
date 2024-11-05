const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const { OAuth2Client } = require('google-auth-library');

//require('dotenv').config(); 

const jwtSecret = 'securesecretkey798mybrainisfried'; 
console.log('JWT Secret:', jwtSecret);

const app = express();
app.use(cors()); 
app.use(bodyParser.json()); 

// Set up Google OAuth client from google console
const client = new OAuth2Client('500919968051-vk45pf1l94rmbmul66q6cvd3ipi1f6p5.apps.googleusercontent.com'); // Replace with your Google OAuth 2.0 Client ID

// Set up SQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Onthatile@2016',
  database: 'ruixAuth_db',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

// Registration endpoint
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, hashedPassword], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    // Generate the JWT token after registration is successful
    const token = jwt.sign({ email }, jwtSecret, { expiresIn: '1h' });
    res.status(201).json({ message: 'User registered', token });
  });
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = results[0]; // Get the user from the results
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate the JWT token after validating the login credentials
    const token = jwt.sign({ email: user.email }, jwtSecret, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  });
});

// Google login endpoint
app.post('/api/google-login', async (req, res) => {
  const { token } = req.body;

  try {
    // Verify the token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      // CLIENT_ID from google console
      audience: '500919968051-vk45pf1l94rmbmul66q6cvd3ipi1f6p5.apps.googleusercontent.com', 
    });

    const payload = ticket.getPayload();
    const email = payload.email;

    // Check if the user exists in your database
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' });

      let user = results[0];

      if (!user) {
        // If the user doesn't exist, create a new record
        const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
        db.query(query, [payload.name, email], (err, results) => {
          if (err) return res.status(500).json({ message: 'Database error', err });

          // Generate the JWT token after inserting the new user
          const token = jwt.sign({ email }, jwtSecret, { expiresIn: '1h' });
          res.status(200).json({ message: 'Google login successful', token });
        });
      } else {
        // If the user exists, log them in and generate a JWT token
        const token = jwt.sign({ email: user.email }, jwtSecret, { expiresIn: '1h' });
        res.status(200).json({ message: 'Google login successful', token });
      }
    });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ message: 'Google login failed' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
