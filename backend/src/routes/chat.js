import express from 'express';
import { openaiClient, openAiAvailable } from '../services/openaiClient.js';
import { config } from '../config.js';
import { buildMessages } from '../services/promptBuilder.js';
import { generateFallbackAnswer } from '../services/fallbackResponder.js';
import { chatLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

const handleError = (error, message) => {
  const status = error.response?.status || 500;
  const errorMap = {
    400: 'Қате сұраныс. Хабарламаны тексеріңіз.',
    401: 'Авторизация қатесі. API кілті жарамсыз.',
    429: 'Сұраныс шектеуіне жетті. Бірнеше минуттан соң қайталаңыз.',
    500: 'Сервердегі ішкі қате. Кейінірек қайталаңыз.'
  };
  
  return {
    status,
    message: errorMap[status] || 'Қызмет көрсетуде уақытша қиындықтар туындады.',
    isRetryable: status >= 500
  };
};

export const registerChatRoutes = (app, knowledgeBase) => {
  router.post('/chat', chatLimiter, async (req, res) => {
    const { message, history = [] } = req.body || {};

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ 
        error: 'Жарамсыз немесе бос хабарлама.' 
      });
    }

    try {
      if (!openAiAvailable) {
        const fallback = generateFallbackAnswer(message);
        return res.json({
          reply: fallback,
          source: 'fallback',
          knowledgeAvailable: knowledgeBase.available,
          warning: 'OPENAI_API_KEY табылмады. Қор жауабы көрсетілуде.',
          isRetryable: false,
        });
      }

      const messages = buildMessages(knowledgeBase, message, history);

      const response = await openaiClient.chat.completions.create({
        model: config.openAiModel,
        messages,
        temperature: 0.2,
        max_tokens: 800,
      });

      const assistantMessage = response.choices?.[0]?.message?.content?.trim();

      if (!assistantMessage) {
        throw new Error('OpenAI жауабы бос.');
      }

      res.json({ 
        reply: assistantMessage, 
        source: 'openai', 
        knowledgeAvailable: knowledgeBase.available 
      });

    } catch (error) {
      console.error('Чат қатесі:', error);
      const errorInfo = handleError(error, message);
      const fallback = generateFallbackAnswer(message);
      
      res.status(errorInfo.status === 429 ? 200 : 500).json({
        reply: fallback,
        source: 'fallback',
        knowledgeAvailable: knowledgeBase.available,
        warning: errorInfo.message,
        isRetryable: errorInfo.isRetryable
      });
    }
  });

  app.use('/api', router);
};
