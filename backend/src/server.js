import express from 'express';
import http from 'http';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';

import { config } from './config.js';
import { createRateLimiter } from './middleware/rateLimiter.js';
import { loadKnowledgeBase } from './utils/docLoader.js';
import { registerChatRoutes } from './routes/chat.js';

const app = express();

app.set('trust proxy', 1);
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(createRateLimiter(config.requestsPerMinute));

const server = http.createServer(app);

(async () => {
  try {
    const knowledgeBase = await loadKnowledgeBase(config.docSourcePath);
    registerChatRoutes(app, knowledgeBase);

    app.get('/api/health', (_req, res) => {
      res.json({ status: 'ok', environment: config.environment });
    });

    const publicDir = path.resolve(process.cwd(), '../frontend/dist');
    app.use(express.static(publicDir));
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api/')) return next();
      res.sendFile(path.join(publicDir, 'index.html'));
    });

    server.listen(config.port, () => {
      console.log(`🚀 AriscanAI backend running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();
