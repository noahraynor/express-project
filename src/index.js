// src/index.js
import express from 'express';

// get path module for formatting paths
import path from 'path';

// imports Node function that converts a file URL to a file path.
import { fileURLToPath } from 'url';

// creates new web server instance
const app = express();

app.use(express.json()); // ✅ This is required to parse JSON bodies

// gets gets absolute path to the current file
// '/home/noah/express-project/src/index.js'
const __filename = fileURLToPath(import.meta.url);

// '/home/noah/express-project/src'
const __dirname = path.dirname(__filename);

// Serve static files from public/
// Always looks for index.html
app.use(express.static(path.join(__dirname, '../public')));

// Doesn't seem like I need this, should work withouth this
// Optional: fallback if someone hits '/' directly
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html')); // 👈 fixed the path
});

app.listen(3000, () =>
  console.log('App running on port 3000...')
);

import pool from './db.js';

app.post('/submit', async (req, res) => {
  const { name } = req.body;

  try {
    await pool.query('INSERT INTO users (name) VALUES ($1)', [name]);
    res.json({ message: 'Name saved!' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

app.get('/receive', async (req, res) => {
  try {
    const result = await pool.query('SELECT name FROM users');
    const names = result.rows.map(row => row.name); // Extract names only
    res.json({ names });
  } catch (err) {
    console.error('Error fetching names:', err);
    res.status(500).json({ message: 'Failed to fetch names' });
  }
});