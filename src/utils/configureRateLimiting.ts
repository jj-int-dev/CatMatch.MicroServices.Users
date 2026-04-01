import config from '../config/config';
import rateLimit from 'express-rate-limit';
import type { Express } from 'express';

export default function configureRateLimiting(endpoint: string, app: Express) {
  if (config.NODE_ENV !== 'developmnent') {
    const limiter = rateLimit({
      windowMs: 10 * 1000,
      max: 50,
      standardHeaders: true,
      legacyHeaders: false
    });

    app.use(endpoint, limiter);
  }
}
