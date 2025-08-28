// Rate Limiter Middleware
// Limits requests to 499 per minute per IP address

const requestStore = new Map();

// Clean up old entries every minute
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of requestStore.entries()) {
    if (now - data.timestamp > 60000) { // 60 seconds = 1 minute
      requestStore.delete(ip);
    }
  }
}, 60000);

export const rateLimiter = (req, res, next) => {
  const clientIP = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
  const now = Date.now();
  
  // Get existing data for this IP
  const existingData = requestStore.get(clientIP);
  
  if (!existingData) {
    // First request from this IP
    requestStore.set(clientIP, {
      count: 1,
      timestamp: now
    });
    return next();
  }
  
  // Check if the window has expired (1 minute)
  if (now - existingData.timestamp > 60000) {
    // Reset the window
    requestStore.set(clientIP, {
      count: 1,
      timestamp: now
    });
    return next();
  }
  
  // Check if limit exceeded
  if (existingData.count >= 499) {
    return res.status(429).json({
      success: false,
      message: 'Rate limit exceeded. Maximum 499 requests per minute allowed.',
      retryAfter: Math.ceil((existingData.timestamp + 60000 - now) / 1000)
    });
  }
  
  // Increment count
  existingData.count++;
  requestStore.set(clientIP, existingData);
  
  // Add rate limit headers
  res.set({
    'X-RateLimit-Limit': '499',
    'X-RateLimit-Remaining': 499 - existingData.count,
    'X-RateLimit-Reset': new Date(existingData.timestamp + 60000).toISOString()
  });
  
  next();
};

// Optional: Get current rate limit status for debugging
export const getRateLimitStatus = (req, res) => {
  const clientIP = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
  const data = requestStore.get(clientIP);
  
  if (!data) {
    return res.json({
      ip: clientIP,
      requests: 0,
      limit: 499,
      remaining: 499,
      resetTime: new Date(Date.now() + 60000).toISOString()
    });
  }
  
  const now = Date.now();
  const timeLeft = Math.max(0, data.timestamp + 60000 - now);
  
  res.json({
    ip: clientIP,
    requests: data.count,
    limit: 499,
    remaining: Math.max(0, 499 - data.count),
    resetTime: new Date(data.timestamp + 60000).toISOString(),
    timeLeft: Math.ceil(timeLeft / 1000)
  });
};
