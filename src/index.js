// src/index.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from public/
app.use(express.static(path.join(__dirname, '../public')));

// Optional: fallback if someone hits '/' directly
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html')); // 👈 fixed the path
});

app.listen(3000, () =>
  console.log('App running on port 3000...')
);
