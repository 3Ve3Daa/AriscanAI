import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { defaultSecrets } from './defaultSecrets.js';

const __filename = fileURLToPath(import.meta.url);
const rawDirname = path.dirname(__filename);
const decodedDirname = decodeURIComponent(rawDirname);

const envFiles = ['../.env', '../.env.development', '../.env.local'];
envFiles.forEach((relativePath) => {
  dotenv.config({ path: path.resolve(decodedDirname, relativePath) });
});

const localSecretsPath = path.resolve(decodedDirname, '../config/local.env.json');
if (fs.existsSync(localSecretsPath)) {
  try {
    const payload = JSON.parse(fs.readFileSync(localSecretsPath, 'utf-8'));
    Object.entries(payload).forEach(([key, value]) => {
      if (!process.env[key]) {
        process.env[key] = value;
      }
    });
  } catch (error) {
    console.warn('⚠️  Failed to load local.env.json:', error.message);
  }
}

Object.entries(defaultSecrets).forEach(([key, value]) => {
  if (!process.env[key]) {
    process.env[key] = value;
  }
});

// Fallback to default .env lookup if custom paths not found
dotenv.config();

const requiredEnv = ['OPENAI_API_KEY'];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`⚠️  Environment variable ${key} is not set. Please update your .env file.`);
  }
});

const docSourceEnv = process.env.DOC_SOURCE_PATH || '';
const resolvedDocSourcePath = docSourceEnv
  ? path.isAbsolute(docSourceEnv)
    ? docSourceEnv
    : path.resolve(decodedDirname, '..', docSourceEnv)
  : '';

export const config = {
  port: Number(process.env.PORT || 8080),
  openAiApiKey: process.env.OPENAI_API_KEY || '',
  docSourcePath: resolvedDocSourcePath,
  requestsPerMinute: Number(process.env.REQUESTS_PER_MINUTE || 30),
  environment: process.env.NODE_ENV || 'development',
  openAiModel: process.env.OPENAI_MODEL || 'gpt-4o-mini',
};
