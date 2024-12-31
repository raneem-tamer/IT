const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

router.post('/submit', (req, res) => {
  const { name, feedback } = req.body;
  const sql = 'INSERT INTO feedback (name, feedback) VALUES (?, ?)';
  
  db.query(sql, [name, feedback], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Database error');
    }
    // Redirect to the correct path
    res.redirect('/feedback/thank-you');
  });
});

router.get('/thank-you', (req, res) => {
  res.render('thank-you'); // Ensure the thank-you.ejs file exists
});

module.exports = router;
