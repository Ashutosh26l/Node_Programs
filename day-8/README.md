# Rate Limiter Middleware Demo

A custom rate limiter middleware that limits requests to **499 per minute** per IP address.

## Features

- ✅ **499 requests per minute** limit per IP address
- ✅ **Automatic cleanup** of expired entries
- ✅ **Rate limit headers** in responses
- ✅ **Status endpoint** for monitoring
- ✅ **In-memory storage** (no external dependencies)
- ✅ **Sliding window** implementation

## Installation

```bash
cd day-8
npm install
```

## Usage

### Start the server

```bash
npm start
# or for development with auto-restart
npm run dev
```

The server will start on `http://localhost:3000`

### Available Endpoints

- `GET /` - Welcome message and available endpoints
- `GET /test` - Test endpoint to see rate limiting in action
- `GET /rate-limit-status` - Check your current rate limit status
- `POST /api/data` - Test POST endpoint with rate limiting

### Rate Limit Headers

Each response includes these headers:
- `X-RateLimit-Limit`: Maximum requests allowed (499)
- `X-RateLimit-Remaining`: Remaining requests in current window
- `X-RateLimit-Reset`: When the rate limit window resets

### Testing

Run the test script to see the rate limiter in action:

```bash
npm test
```

## How It Works

1. **IP Tracking**: Each client IP is tracked separately
2. **Sliding Window**: Uses a 1-minute sliding window
3. **Memory Storage**: Stores request counts in memory using Map
4. **Auto Cleanup**: Removes expired entries every minute
5. **Headers**: Adds rate limit information to response headers

## Rate Limit Response

When the limit is exceeded, you'll get:

```json
{
  "success": false,
  "message": "Rate limit exceeded. Maximum 499 requests per minute allowed.",
  "retryAfter": 45
}
```

Status: `429 Too Many Requests`

## Status Endpoint Response

```json
{
  "ip": "::1",
  "requests": 10,
  "limit": 499,
  "remaining": 489,
  "resetTime": "2024-01-15T10:30:00.000Z",
  "timeLeft": 45
}
```

## Integration with Other Projects

To use this rate limiter in other Express projects:

```javascript
import { rateLimiter } from './rateLimiter.js';

// Apply to all routes
app.use(rateLimiter);

// Or apply to specific routes
app.use('/api', rateLimiter);
```

## Customization

You can easily modify the rate limit by changing these values in `rateLimiter.js`:

- `499` - Maximum requests per window
- `60000` - Window duration in milliseconds (1 minute)

## Notes

- This implementation uses in-memory storage
- Data is lost when the server restarts
- For production, consider using Redis or a database
- The cleanup interval runs every minute to prevent memory leaks
