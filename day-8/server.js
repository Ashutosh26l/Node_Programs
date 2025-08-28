import express from 'express';
import cors from 'cors';
import { rateLimiter, getRateLimitStatus } from './rateLimiter.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Apply rate limiter to all routes
app.use(rateLimiter);

// Rate limit status endpoint (for debugging)
app.get('/rate-limit-status', getRateLimitStatus);

// Test endpoints
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Rate Limiter Demo!',
    endpoints: {
      status: '/rate-limit-status',
      test: '/test'
    }
  });
});

app.get('/test', (req, res) => {
  res.json({
    message: 'This is a test endpoint',
    timestamp: new Date().toISOString(),
    headers: {
      'X-RateLimit-Limit': req.headers['x-ratelimit-limit'],
      'X-RateLimit-Remaining': req.headers['x-ratelimit-remaining'],
      'X-RateLimit-Reset': req.headers['x-ratelimit-reset']
    }
  });
});

app.post('/api/data', (req, res) => {
  res.json({
    message: 'Data endpoint hit successfully',
    data: req.body,
    timestamp: new Date().toISOString()
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Rate limiter demo available at http://localhost:${PORT}`);
  console.log(`Check rate limit status at http://localhost:${PORT}/rate-limit-status`);
});

export default app;
