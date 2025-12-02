import rateLimit from 'express-rate-limit';

export const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: JSON.stringify({
    error: 'Тым көп сұраныс. 15 минуттан кейін қайталаңыз.'
  }),
  standardHeaders: true,
  legacyHeaders: false
});

export const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 1000, // limit each IP to 1000 requests per hour
  message: JSON.stringify({
    error: 'Серверге тым көп сұраныс. 1 сааттан кейін қайталаңыз.'
  }),
  standardHeaders: true,
  legacyHeaders: false
});
