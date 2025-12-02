const systemPrompt = `Сен — AriscanAI. Сенің міндетің — құрғақшылық, су тапшылығы, климат, экология, топырақ, су ресурстарын басқару тақырыптары бойынша ғылыми әрі түсінікті жауап беру. Барлық жауаптарың деректерге негізделген болуы керек. Фактілерді ойдан шығаруға болмайды.`;

const summarizeChunk = (chunk) =>
  chunk
    .replace(/\s+/g, ' ')
    .split(' ')
    .slice(0, 150) // Increased from 120 to 150 words
    .join(' ')
    .trim();

const detectLanguage = (text) => {
  if (!text) return 'kk';
  if (/[\u0400-\u04FF]/.test(text)) {
    return /[әіңғүұқөһ]/i.test(text) ? 'kk' : 'ru';
  }
  return 'en';
};

const getLanguagePrompt = (lang) => {
  const prompts = {
    kk: 'Жауабыңызды қазақ тілінде беріңіз. Жауап ресми-әдеби тілде болуы керек.',
    ru: 'Отвечайте на русском языке. Ответ должен быть в официально-деловом стиле.',
    en: 'Please respond in English. Use formal and professional language.'
  };
  return prompts[lang] || prompts.kk;
};

const summarizeConversation = (conversation) => {
  if (!conversation || !conversation.length) return 'Әлі әңгіме басталмаған';
  
  return conversation
    .filter(msg => msg.role === 'assistant')
    .slice(-3) // Keep last 3 assistant messages
    .map((msg, i) => `Алдыңғы жауап ${i + 1}: ${msg.content.slice(0, 200)}...`)
    .join('\n\n');
};

export const buildMessages = (knowledgeBase, userMessage, history = []) => {
  const knowledgeChunks = Array.isArray(knowledgeBase?.chunks) ? knowledgeBase.chunks : [];
  const lang = detectLanguage(userMessage);
  const contextSummary = summarizeConversation(history);
  
  // Build knowledge references
  const knowledgeReferences = knowledgeChunks.length
    ? knowledgeChunks
        .slice(0, 15) // Increased from 10 to 15 chunks
        .map((chunk, index) => `Бөлік ${index + 1}: ${summarizeChunk(chunk)}`)
        .join('\n\n')
    : 'Қосымша құжат жүктелмеген. Нақты деректер сұралса, дереккөзді көрсетіңіз.';

  // Build system message with context
  const systemContent = `${systemPrompt}

Қолжетімді ақпарат:
${knowledgeReferences}

Соңғы әңгіме:
${contextSummary}

${getLanguagePrompt(lang)}`;

  // Build message history (keep last 6 messages - 3 exchanges)
  const recentHistory = history.slice(-6);
  
  return [
    { role: 'system', content: systemContent },
    ...recentHistory,
    { role: 'user', content: userMessage }
  ];
};
