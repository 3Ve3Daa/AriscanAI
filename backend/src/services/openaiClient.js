import OpenAI from 'openai';
import { config } from '../config.js';

const hasOpenAiApiKey = Boolean(config.openAiApiKey);

if (!hasOpenAiApiKey) {
  console.warn('⚠️  OPENAI_API_KEY is not set. Running in fallback-only mode.');
}

export const openaiClient = hasOpenAiApiKey
  ? new OpenAI({
      apiKey: config.openAiApiKey,
    })
  : null;

export const openAiAvailable = hasOpenAiApiKey;
