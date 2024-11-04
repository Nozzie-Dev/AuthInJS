const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.json());

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
    if (err) return res.status(500).json({ message: 'Database error' });
    const token = jwt.sign({ email }, 'your_secret_key', { expiresIn: '1h' });
    res.status(201).json({ message: 'User registered', token });
  });
});

// Google login endpoint
app.post('/api/google-login', async (req, res) => {
  // Verify Google token here
  // Return JWT on successful verification
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
