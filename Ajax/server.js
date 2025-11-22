import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import fetch from 'node-fetch'; // if using Node 18+, you can use native fetch

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Base URL of the actual restaurant API
const API_BASE = 'https://media2.edu.metropolia.fi/restaurant/api/v1';

// Proxy route for all restaurants
app.get('/api/restaurants', async (req, res) => {
  try {
    const response = await fetch(`${API_BASE}/restaurants`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({error: 'Failed to fetch restaurants'});
  }
});

// Proxy route for a single restaurant
app.get('/api/restaurants/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const response = await fetch(`${API_BASE}/restaurants/${id}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(`Error fetching restaurant ${id}:`, error);
    res.status(500).json({error: 'Failed to fetch restaurant'});
  }
});

// Proxy route for daily menu of a restaurant
app.get('/api/restaurants/daily/:id/:lang', async (req, res) => {
  const {id, lang} = req.params;
  try {
    const response = await fetch(`${API_BASE}/restaurants/daily/${id}/${lang}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(`Error fetching daily menu for restaurant ${id}:`, error);
    res.status(500).json({error: 'Failed to fetch daily menu'});
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
