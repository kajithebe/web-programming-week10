console.log('app.js is loaded');

import express from 'express';
import api from './api/index.js';

const app = express();

// middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// mount API routes
app.use('/api/v1', api);

// temporary test route (optional)
app.get('/test', (req, res) => {
  res.json({message: 'Test route is working'});
});

export default app;
