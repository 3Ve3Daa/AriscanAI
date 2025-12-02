import fs from 'fs/promises';
import path from 'path';
import mammoth from 'mammoth';

const normalizeWhitespace = (text) =>
  text
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[\t ]+/g, (match) => (match.includes('\n') ? '\n' : ' '))
    .trim();

const chunkText = (text, chunkSize = 2000) => {
  if (!text) return [];
  const paragraphs = text.split(/\n{2,}/);
  const chunks = [];
  let current = '';

  paragraphs.forEach((paragraph) => {
    const candidate = current ? `${current}\n\n${paragraph}` : paragraph;
    if (candidate.length >= chunkSize) {
      if (current) {
        chunks.push(current.trim());
      }
      if (paragraph.length >= chunkSize) {
        const words = paragraph.split(' ');
        let segment = '';
        words.forEach((word) => {
          const candidateSegment = segment ? `${segment} ${word}` : word;
          if (candidateSegment.length >= chunkSize) {
            chunks.push(candidateSegment.trim());
            segment = '';
          } else {
            segment = candidateSegment;
          }
        });
        if (segment) {
          chunks.push(segment.trim());
        }
      } else {
        chunks.push(paragraph.trim());
      }
      current = '';
    } else {
      current = candidate;
    }
  });

  if (current) {
    chunks.push(current.trim());
  }

  return chunks;
};

export const loadKnowledgeBase = async (docPath) => {
  if (!docPath) {
    return {
      rawText: '',
      chunks: [],
      available: false,
    };
  }

  const absolutePath = path.resolve(docPath);
  try {
    await fs.access(absolutePath);
  } catch (error) {
    console.warn(`⚠️  Knowledge base document not found at ${absolutePath}. Continuing without it.`);
    return {
      rawText: '',
      chunks: [],
      available: false,
    };
  }

  let result;
  try {
    result = await mammoth.extractRawText({ path: absolutePath });
  } catch (error) {
    console.warn(`⚠️  Failed to read Word document (${absolutePath}): ${error.message}`);
    return {
      rawText: '',
      chunks: [],
      available: false,
    };
  }

  const cleaned = normalizeWhitespace(result.value || '');
  if (!cleaned) {
    console.warn(`⚠️  Knowledge base document at ${absolutePath} produced empty content.`);
    return {
      rawText: '',
      chunks: [],
      available: false,
    };
  }

  const chunks = chunkText(cleaned);

  return {
    rawText: cleaned,
    chunks,
    available: true,
  };
};
