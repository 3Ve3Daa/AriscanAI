import rateLimit from 'express-rate-limit';

export const createRateLimiter = (requestsPerMinute = 30) =>
  rateLimit({
    windowMs: 60 * 1000,
    max: requestsPerMinute,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      error: 'Too many requests. Please slow down and try again shortly.',
    },
  });
