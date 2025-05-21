const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Log environment variables (without sensitive data)
console.log('Environment Configuration:');
console.log('PORT:', port);
console.log('DB_HOST:', process.env.DB_HOST || 'localhost');
console.log('DB_NAME:', process.env.DB_NAME || 'asia_db');
console.log('NODE_ENV:', process.env.NODE_ENV || 'development');

// Middleware
app.use(cors());
app.use(express.json());

// Add SDG routes
const sdgRoutes = require('./routes/sdg');
app.use('/api/sdg', sdgRoutes);

// Serve static frontend files from 'frontend' folder inside backend
app.use(express.static(path.join(__dirname, 'frontend')));

// API placeholder route (test)
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Serve index.html on root route explicitly
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Optional: catch-all fallback for SPA support
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('Press Ctrl+C to stop the server');
});
