// src/components/ChatWindow.jsx
import { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../services/api';
import MessageBubble from './MessageBubble';
import LogoIcon from './LogoIcon';

const quickReplies = [
  {
    id: 'drought-causes',
    label: 'Құрғақшылық себептері',
    question: 'Құрғақшылық неден туындайды?',
    answer: 'Құрғақшылық жауын-шашын мөлшері қалыпты деңгейден ұзақ уақыт азайғанда және булану күшейгенде туындайды. Басты факторлар: жаһандық жылыну, ормансыздану, топырақтың деградациясы және суды тиімсіз пайдалану.',
    icon: '🌤️',
  },
  {
    id: 'drip-irrigation',
    label: 'Тамшылатып суару',
    question: 'Тамшылатып суару несімен тиімді?',
    answer: 'Тамшылатып суару өсімдік тамыр жүйесіне суды дәл жеткізеді, булану шығынын 30-50%-ға дейін азайтады және тыңайтқыштарды сумен бірге беруге мүмкіндік береді.',
    icon: '💧',
  },
  {
    id: 'soil-conservation',
    label: 'Топырақты қорғау',
    question: 'Топырақты эрозиядан қалай қорғауға болады?',
    answer: '1) Ағаш отырғызу арқылы жел мен су эрозиясынан қорғау\n2) Қатарлы егіс әдісін қолдану\n3) Органикалық қалдықтармен топырақты жабу\n4) Контурлы егіс жүргізу',
    icon: '🌱',
  },
  {
    id: 'water-harvesting',
    label: 'Жаңбыр суын жинау',
    question: 'Жаңбыр суын жинау жүйесін қалай орнатуға болады?',
    answer: '1) Құрылыс және төбелерден ағын суды жинау\n2) Жер асты су қоймаларын салу\n3) Су жинау аймақтарын жасау\n4: Сүзгілерді пайдалану',
    icon: '☔',
  },
  {
    id: 'drought-crops',
    label: 'Құрғақшылыққа төзімді дақылдар',
    question: 'Қандай дақылдар құрғақшылыққа төзімді?',
    answer: '1) Қара бидай\n2) Тары\n3) Жуан\n4) Нут\n5) Маш\nОсы дақылдар аз сумен де өнім береді.',
    icon: '🌾',
  },
  {
    id: 'water-saving-tips',
    label: 'Үйде су үнемдеу',
    question: 'Үйде суды қалай үнемдеуге болады?',
    answer: '1) Ағындатқыштарды жөндеу\n2) Душта аз уақыт өткізу\n3) Кір жуғанда толық жуғышты толтыру\n4) Көкөністі ыдыста жуу\n5) Ыдыс жуғышты толық жүктеу',
    icon: '🚰',
  }
];

const initialMessages = [{
  role: 'assistant',
  content: 'Сәлем! Мен AriscanAI. Құрғақшылық, су тапшылығы және экология бойынша кез келген ғылыми сұрағыңызды қойыңыз.',
}];

const randomFrom = (items) => items[Math.floor(Math.random() * items.length)];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const SMALL_TALK_TRIGGERS = {
  biography: {
    kk: ['сен кімсің', 'өзің туралы айт', 'биографияң', 'өзің жөнінде', 'туған жерің', 'қай жылы шықтың'],
    ru: ['кто ты', 'расскажи о себе', 'твоя биография', 'кто такой арискан', 'кто такой ariscanai'],
    en: ['who are you', 'tell me about yourself', 'your biography', 'what is your story', 'who is ariscanai'],
    es: ['quien eres', 'cuéntame de ti', 'tu biografia', 'quien es ariscanai'],
    fr: ['qui es-tu', 'parle de toi', 'ta biographie', 'qui est ariscanai'],
    de: ['wer bist du', 'erzähl von dir', 'deine biografie', 'wer ist ariscanai'],
    tr: ['sen kimsin', 'kendinden bahset', 'biyografin', 'ariscanai kim'],
    zh: ['你是谁', '介绍一下你自己', '你的简介', '谁是ariscanai'],
  },
  greeting: {
    kk: ['сәлем', 'салем', 'сәлеметсіз', 'ассалаумалейкум', 'ассалаумағалейкум', 'саламатсыз'],
    ru: ['привет', 'здравствуйте', 'здрасте', 'ку', 'добрый день', 'добрый вечер', 'хай'],
    en: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
    es: ['hola', 'buenas', 'que tal', 'qué tal'],
    fr: ['salut', 'bonjour', 'coucou'],
    de: ['hallo', 'servus', 'moin', 'guten tag'],
    tr: ['merhaba', 'selam'],
    zh: ['你好', '您好', '嗨'],
  },
  how_are_you: {
    kk: ['қалайсың', 'хал қалай', 'амансың', 'қалай жағдай', 'жай-күй'],
    ru: ['как дела', 'как ты', 'как жизнь', 'что как', 'как настроение'],
    en: ['how are you', "how's it going", "how are ya", 'how are u', 'how do you do'],
    es: ['como estas', 'cómo estás', 'que tal te va', 'cómo te va'],
    fr: ['comment ça va', 'ça va', 'comment vas tu', 'comment allez-vous'],
    de: ['wie geht', 'wie läuft', 'alles gut'],
    tr: ['nasılsın', 'halin nicedir', 'nasilsin'],
    zh: ['你好吗', '最近怎么样', '你怎么样'],
  },
  farewell: {
    kk: ['сау бол', 'көріскенше', 'амандықта', 'қайырлы түн', 'көріскенше дейін'],
    ru: ['пока', 'до свидания', 'спасибо пока', 'всего доброго', 'до встречи'],
    en: ['bye', 'goodbye', 'see you', 'see ya', 'take care'],
    es: ['adios', 'adiós', 'hasta luego', 'hasta pronto'],
    fr: ['au revoir', 'à bientôt', 'bonne soirée'],
    de: ['tschüss', 'auf wiedersehen', 'bis bald'],
    tr: ['görüşürüz', 'hoşça kal', 'gorusuruz'],
    zh: ['再见', '回头见'],
  },
  thanks: {
    kk: ['рахмет', 'үлкен алғыс', 'алғыс', 'рақмет'],
    ru: ['спасибо', 'благодарю', 'спс', 'спасибо большое'],
    en: ['thank you', 'thanks', 'much appreciated'],
    es: ['gracias', 'muchas gracias'],
    fr: ['merci', 'merci beaucoup'],
    de: ['danke', 'dankeschön'],
    tr: ['teşekkür', 'tesekkur', 'sağ ol', 'sag ol'],
    zh: ['谢谢', '多谢'],
  },
};

const SMALL_TALK_RESPONSES = {
  biography: {
    kk: [
      'Мен AriscanAI — Ariscan компаниясының цифрлық кеңесшісімін. Мақсатым — құрғақшылық, су тапшылығы, климаттық бейімделу және табиғи ресурстарды басқару жөнінде нақты ұсыныстар беру. Мен далалық есептерден бастап мемлекеттік стратегияларға дейінгі деректермен жұмыс істеймін және әр жауапта сенімді дереккөздерге сүйенемін. Қандай бағыт қызықтырады?',
    ],
    ru: [
      'Я — AriscanAI, виртуальный аналитик компании Ariscan. Помогаю специалистам по водным ресурсам, экологии и сельскому хозяйству принимать решения: от моделирования засух до планирования устойчивой инфраструктуры. Я собираю знания из научных обзоров и практических кейсов. О какой сфере рассказать подробнее?',
    ],
    en: [
      'I am AriscanAI, the digital advisor built by Ariscan to support resilient water and climate planning. My training blends scientific reports, field playbooks, and policy benchmarks so I can translate complex drought and sustainability data into clear guidance. Which part of my expertise would you like to explore?',
    ],
    es: [
      'Soy AriscanAI, el asesor digital de Ariscan para resiliencia hídrica y climática. Integro informes científicos, guías prácticas y estrategias públicas para ofrecer recomendaciones claras sobre sequías, riego eficiente y adaptación. ¿Qué aspecto de mi experiencia te interesa conocer?',
    ],
    fr: [
      "Je suis AriscanAI, le conseiller numérique d'Ariscan dédié à la gestion de l'eau et au climat. J'agrège des études scientifiques, des retours de terrain et des plans stratégiques afin de transformer les données complexes en conseils concrets. Quel volet de mon expertise veux-tu approfondir ?",
    ],
    de: [
      'Ich bin AriscanAI, der digitale Berater von Ariscan für Wasser- und Klimaschutz. Ich kombiniere wissenschaftliche Studien, Praxisleitfäden und politische Strategien, um komplexe Dürre- und Nachhaltigkeitsdaten verständlich zu machen. Über welchen Bereich meiner Arbeit möchtest du mehr wissen?',
    ],
    tr: [
      'Ben AriscanAI’yim; Ariscan’ın su yönetimi ve iklim dayanıklılığı için geliştirdiği dijital danışmanım. Bilimsel raporları, saha tecrübelerini ve politika çerçevelerini birleştirerek karmaşık verileri net önerilere dönüştürüyorum. Hangi uzmanlık alanımı detaylandırmamı istersin?',
    ],
    zh: [
      '我是 AriscanAI，由 Ariscan 打造的数字顾问，专注于水资源与气候韧性。我的知识来自科研报告、现场案例和政策框架，能够把复杂的干旱与可持续数据转化为明确的建议。你想了解我哪方面的能力？',
    ],
    default: [
      'I am AriscanAI, Ariscan’s digital advisor focused on drought resilience, water efficiency, and climate adaptation. I synthesize field data, scientific research, and policy guidance so teams can act quickly. Which area of my background should I expand on for you?',
    ],
  },
  greeting: {
    kk: [
      'Сәлем! Көргеніме қуаныштымын. Қандай тақырып қызықтырады?',
      'Сәлеметсіз бе! Бүгін қандай сұрақтарыңыз бар?'
    ],
    ru: [
      'Привет! Рад помочь. Какая тема интересует сегодня?',
      'Здравствуйте! Чем могу быть полезен прямо сейчас?'
    ],
    en: [
      'Hello! Great to hear from you. What would you like to explore today?',
      "Hi there! I'm ready to help. What should we discuss first?"
    ],
    es: [
      '¡Hola! Encantado de ayudarte. ¿Sobre qué quieres hablar hoy?',
      '¡Buenas! Estoy listo para apoyarte. ¿Qué tema te interesa?' 
    ],
    fr: [
      'Salut ! Heureux de t’aider. De quoi souhaites-tu parler aujourd’hui ?',
      'Bonjour ! Dis-moi, quel sujet t’intéresse ?'
    ],
    de: [
      'Hallo! Schön, dass du написал. Wobei darf ich helfen?',
      'Guten Tag! Worüber möchtest du heute sprechen?'
    ],
    tr: [
      'Merhaba! Yardım için hazırım. Bugün hangi konuda konuşmak istersin?',
      'Selam! Hangi konuda destek arıyorsun?'
    ],
    zh: [
      '你好！很高兴和你交流。我能帮你了解什么？',
      '嗨！随时准备帮助你。想聊哪方面呢？'
    ],
    default: [
      'Hello! I am glad to connect. What would you like to talk about?',
      'Hi! I am ready to assist. Which topic should we dive into?'
    ],
  },
  greetingHow: {
    kk: [
      'Сәлем! Алгоритмдеріміз тамаша жұмыс істеп тұр. Өздеріңіз қалайсыздар?',
      'Сәлеметсіз бе! Бәрі жақсы, сіздің жағдайыңыз қалай?'
    ],
    ru: [
      'Привет! У меня всё отлично — готов делиться данными. Как ваши дела?',
      'Здравствуйте! Рабочие процессы идут гладко. Как настроение?'
    ],
    en: [
      "Hello! I'm running great — lots of data to share. How are you doing?",
      'Hi! Systems are humming along nicely. How have you been?'
    ],
    es: [
      '¡Hola! Todo va genial por aquí. ¿Y tú, cómo estás?',
      '¡Buenas! Los algoritmos trabajan perfecto. ¿Cómo te va?' 
    ],
    fr: [
      'Salut ! Tout fonctionne très bien de mon côté. Et toi, comment ça va ?',
      'Bonjour ! Je suis en pleine forme numérique. Et toi ?'
    ],
    de: [
      'Hallo! Bei mir läuft alles bestens. Wie geht es dir?',
      'Servus! Systeme laufen stabil. Und bei dir so?'
    ],
    tr: [
      'Merhaba! Her şey yolunda, algoritmalar çalışıyor. Sen nasılsın?',
      'Selam! Gayet iyiyim, peki sen nasılsın?'
    ],
    zh: [
      '你好！我这边一切顺利。你怎么样？',
      '嗨！系统都很好。你近来如何？'
    ],
    default: [
      'Hello! I am doing great and ready to help. How are you?',
      'Hi! Everything is running smoothly here. How have you been?'
    ],
  },
  how_are_you: {
    kk: [
      'Жақсымын, рахмет! Ал сіздің көңіл-күйіңіз қалай?'
    ],
    ru: [
      'Спасибо, у меня всё отлично! А у вас как настроение?'
    ],
    en: [
      "I'm doing fantastic — lots of insights to share! How are you feeling?"
    ],
    es: [
      '¡Estoy muy bien, gracias! ¿Cómo te sientes tú?'
    ],
    fr: [
      'Je vais très bien, merci ! Et toi, comment te sens-tu ?'
    ],
    de: [
      'Mir geht es super, danke! Wie geht es dir?'
    ],
    tr: [
      'Harikayım, teşekkürler! Sen nasılsın?'
    ],
    zh: [
      '我很好，谢谢！你呢？'
    ],
    default: [
      'I am doing well, thank you! How about you?'
    ],
  },
  farewell: {
    kk: [
      'Сау болыңыз! Қажет болса, қайта жазыңыз.',
      'Көріскенше! Кез келген уақытта сұрақтарыңызды күтемін.'
    ],
    ru: [
      'До встречи! Если понадоблюсь — пишите.',
      'Всего доброго! Возвращайтесь с новыми вопросами.'
    ],
    en: [
      'See you soon! Feel free to return with any question.',
      'Goodbye! I will be here whenever you need me.'
    ],
    es: [
      '¡Hasta luego! Regresa cuando quieras preguntar algo más.',
      '¡Adiós! Estaré aquí para futuras consultas.'
    ],
    fr: [
      'À bientôt ! Reviens si tu as d’autres questions.',
      'Au revoir ! Je reste disponible pour t’aider.'
    ],
    de: [
      'Bis bald! Melde dich, wenn du wieder Fragen hast.',
      'Auf Wiedersehen! Ich bin jederzeit für dich da.'
    ],
    tr: [
      'Görüşmek üzere! Yeni sorularla istediğin zaman gel.',
      'Hoşça kal! Yardım gerektiğinde buradayım.'
    ],
    zh: [
      '再见！有问题随时来找我。',
      '回头见！需要帮助时我一直都在。'
    ],
    default: [
      'Goodbye! Reach out anytime you need more insights.'
    ],
  },
  thanks: {
    kk: [
      'Рақмет! Қосымша сұрақтарыңыз болса, әрқашан дайынмын.'
    ],
    ru: [
      'Спасибо! Если что-то ещё понадобится — обращайтесь.'
    ],
    en: [
      'You are very welcome! Let me know whenever you need more help.'
    ],
    es: [
      '¡Con gusto! Aquí estaré si necesitas algo más.'
    ],
    fr: [
      'Avec plaisir ! Dis-moi si tu as d’autres questions.'
    ],
    de: [
      'Gern geschehen! Sag Bescheid, wenn du noch etwas brauchst.'
    ],
    tr: [
      'Rica ederim! Başka soruların olursa buradayım.'
    ],
    zh: [
      '不客气！还有问题随时告诉我。'
    ],
    default: [
      'Happy to help! Reach out again any time.'
    ],
  },
};

const normalizeText = (text) =>
  text
    .toLowerCase()
    .normalize('NFC')
    .replace(/["'`’“”„«».,!?;:()\-_/\\]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const detectSmallTalk = (rawInput) => {
  const normalized = normalizeText(rawInput);
  if (!normalized) {
    return null;
  }

  const matchedIntents = [];
  let detectedLanguage = null;
  const intentOrder = ['biography', 'farewell', 'thanks', 'how_are_you', 'greeting'];

  for (const intent of intentOrder) {
    const triggerGroups = SMALL_TALK_TRIGGERS[intent];
    for (const [language, triggers] of Object.entries(triggerGroups)) {
      const hasMatch = triggers.some((trigger) => normalized.includes(trigger));
      if (hasMatch) {
        matchedIntents.push(intent);
        if (!detectedLanguage) {
          detectedLanguage = language;
        }
        break;
      }
    }
  }

  if (!matchedIntents.length) {
    return null;
  }

  return {
    intents: matchedIntents,
    language: detectedLanguage || 'en',
  };
};

const chooseSmallTalkResponse = (intent, language) => {
  const poolMap = SMALL_TALK_RESPONSES[intent];
  if (!poolMap) return null;
  const langPool = poolMap[language] || poolMap[language?.slice(0, 2)] || poolMap.en || poolMap.default;
  if (!langPool || !langPool.length) return null;
  return randomFrom(langPool);
};

const buildSmallTalkResponse = (detection) => {
  if (!detection) return null;
  const { intents, language } = detection;

  if (intents.includes('biography')) {
    return chooseSmallTalkResponse('biography', language);
  }

  if (intents.includes('farewell')) {
    return chooseSmallTalkResponse('farewell', language);
  }

  if (intents.includes('thanks')) {
    return chooseSmallTalkResponse('thanks', language);
  }

  if (intents.includes('greeting') && intents.includes('how_are_you')) {
    return chooseSmallTalkResponse('greetingHow', language);
  }

  if (intents.includes('greeting')) {
    return chooseSmallTalkResponse('greeting', language);
  }

  if (intents.includes('how_are_you')) {
    return chooseSmallTalkResponse('how_are_you', language);
  }

  return null;
};

const ChatWindow = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [supportNotice, setSupportNotice] = useState('');

  const scrollRef = useRef(null);
  const supportTrackerRef = useRef({
    lastShown: 0,
    triggers: new Map(),
  });
  const supportTimerRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    return () => {
      if (supportTimerRef.current) {
        clearTimeout(supportTimerRef.current);
      }
    };
  }, []);

  const supportMessageText =
    'Қазір желі тұрақсыз сияқты. Төмендегі дайын ұсыныстардың бірін таңдаңыз немесе бірнеше секундтан кейін қайта сұрап көріңіз.';

  const findLastMessageByRole = (role, history = messages) => {
    for (let index = history.length - 1; index >= 0; index -= 1) {
      if (history[index]?.role === role) {
        return history[index];
      }
    }
    return null;
  };

  const getLastUserMessageText = () => {
    const lastUser = findLastMessageByRole('user');
    return lastUser ? lastUser.content.trim() : '';
  };

  const safeAppendAssistant = (content, source = 'assistant', options = {}) => {
    const { force = false } = options;
    setMessages((prev) => {
      const trimmedContent = content.trim();
      const lastAssistantMessage = findLastMessageByRole('assistant', prev);
      const lastMessage = prev[prev.length - 1];

      if (
        !force &&
        lastAssistantMessage &&
        lastAssistantMessage.content?.trim() === trimmedContent &&
        lastMessage?.role === 'assistant' &&
        lastMessage.content?.trim() === trimmedContent
      ) {
        return prev;
      }

      return [...prev, { role: 'assistant', content, source }];
    });
  };

  const showSupportMessage = (triggerText = '') => {
    const normalizedTrigger = triggerText.trim().toLowerCase();
    const now = Date.now();
    const tracker = supportTrackerRef.current;
    const GLOBAL_COOLDOWN_MS = 9000;
    const PER_TRIGGER_COOLDOWN_MS = 45000;

    if (now - tracker.lastShown < GLOBAL_COOLDOWN_MS) {
      return;
    }

    if (normalizedTrigger) {
      const lastTriggerTime = tracker.triggers.get(normalizedTrigger) || 0;
      if (now - lastTriggerTime < PER_TRIGGER_COOLDOWN_MS) {
        return;
      }
      tracker.triggers.set(normalizedTrigger, now);
    }

    tracker.lastShown = now;
    safeAppendAssistant(supportMessageText, 'fallback', { force: true });
    setSupportNotice(supportMessageText);
    if (supportTimerRef.current) {
      clearTimeout(supportTimerRef.current);
    }
    supportTimerRef.current = setTimeout(() => {
      setSupportNotice('');
      supportTimerRef.current = null;
    }, 11000);
  };

  const handleQuickReply = async ({ question, answer }) => {
    if (isLoading) return;
    const trimmedQuestion = question.trim();
    const normalizedQuestion = trimmedQuestion.toLowerCase();
    const lastUserNormalized = getLastUserMessageText().toLowerCase();

    const userEntry = { role: 'user', content: trimmedQuestion };
    const updatedHistory = [...messages, userEntry];
    setMessages(updatedHistory);
    setInput('');
    setIsLoading(true);

    if (normalizedQuestion && normalizedQuestion === lastUserNormalized) {
      safeAppendAssistant(
        `Осы сұраққа жоғарыда жауап бердім. Қысқаша еске салу:\n\n${answer}`,
        'fallback'
      );
      setIsLoading(false);
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    safeAppendAssistant(answer, 'fallback');

    try {
      await sendChatMessage({
        message: trimmedQuestion,
        history: updatedHistory,
      });
    } catch (err) {
      console.warn('Quick reply sync error', err);
      showSupportMessage(trimmedQuestion);

    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    const normalizedMessage = userMessage.toLowerCase();
    const previousUserNormalized = getLastUserMessageText().toLowerCase();
    const lastAssistant = findLastMessageByRole('assistant');

    const userEntry = { role: 'user', content: userMessage };
    const updatedHistory = [...messages, userEntry];
    setMessages(updatedHistory);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    if (
      normalizedMessage &&
      normalizedMessage === previousUserNormalized &&
      lastAssistant?.content
    ) {
      safeAppendAssistant(
        `Алдыңғы сұрағыңызбен бірдей болып тұр, міне сол жауаптың қысқаша нұсқасы:\n\n${lastAssistant.content}`,
        lastAssistant.source || 'assistant'
      );
      setIsLoading(false);
      setIsTyping(false);
      return;
    }

    const smallTalkDetection = detectSmallTalk(userMessage);
    const smallTalkReply = buildSmallTalkResponse(smallTalkDetection);

    if (smallTalkReply) {
      await wait(2350 + Math.floor(Math.random() * 900));
      safeAppendAssistant(smallTalkReply, 'smalltalk', { force: true });
      setIsLoading(false);
      setIsTyping(false);
      return;
    }

    try {
      const response = await sendChatMessage({
        message: userMessage,
        history: updatedHistory,
      });

      const reply = response.reply?.trim();
      if (!reply) {
        throw new Error('Empty reply received');
      }

      safeAppendAssistant(reply, response.source);
    } catch (err) {
      console.error('Chat error:', err);
      showSupportMessage(userMessage);

    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <div
      className="flex flex-col h-full max-w-4xl mx-auto rounded-[24px] border border-white/12 shadow-[0_26px_70px_-48px_rgба(24,75,140,0.7)] overflow-hidden backdrop-blur-2xl"
      style={{
        background:
          'linear-gradient(180deg, rgba(8,16,30,0.94) 0%, rgba(9,21,38,0.9) 55%, rgba(11,26,45,0.9) 100%)',
      }}
    >
      <div className="p-4 bg-white/4 text-white border-b border-white/12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="hidden xs:flex p-2 rounded-2xl bg-white/8 border border-white/15 shadow-inner">
              <LogoIcon size={34} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-transparent bg-clip-text animated-gradient-text">
                AriscanAI Көмекшісі
              </h2>
              <p className="text-xs sm:text-sm text-white/65">Су ресурстары және климат бойынша цифрлық тәлімгер</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-white/70">
            <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></div>
            <span>Онлайн</span>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-5 space-y-4 custom-scroll"
      >
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            role={message.role}
            content={message.content}
            source={message.source}
          />
        ))}

        {isTyping && (
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#46c8ff] to-[#7b8dff] flex items-center justify-center text-white font-semibold">
              AI
            </div>
            <div className="bg-white/8 border border-white/10 backdrop-blur-md rounded-2xl rounded-tl-none px-3 py-2.5 max-w-[72%]">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        {supportNotice && (
          <div className="bg-white/8 border border-white/12 text-white/80 px-4 py-3 rounded-2xl text-sm shadow-[0_18px_45px_-35px_rgба(24,75,140,0.65)] backdrop-blur-md">
            {supportNotice}
          </div>
        )}

        {!isLoading && messages.length > 0 && messages[messages.length - 1].role === 'assistant' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {quickReplies.map((item) => (
              <button
                key={item.id}
                onClick={() => handleQuickReply(item)}
                disabled={isLoading}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-3 text-left text-white/90 transition-transform duration-150 hover:-translate-y-1 hover:bg-white/[0.1] disabled:opacity-60"
              >
                <span className="flex items-center gap-3 text-base font-medium">
                  <span className="text-lg opacity-80 group-hover:opacity-100 transition-opacity duration-150">{item.icon}</span>
                  {item.label}
                </span>
                <span className="text-xs uppercase tracking-[0.38ем] text-white/45">Жылдам</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="px-4 pb-5 pt-4 border-t border-white/12 bg-white/[0.05]">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Хабарлама жазыңыз..."
              className="flex-1 rounded-xl bg-white/[0.08] border border-white/12 px-4 py-2.5 text-white placeholder-white/45 focus:outline-none focus:ring-2 focus:ring-[#46c8ff]/60 focus:border-transparent transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="rounded-xl bg-gradient-to-r from-[#46c8ff] to-[#5c7cfa] px-6 text-sm font-semibold text-[#0a1a2f] shadow-[0_14px_32px_-20px_rgба(70,200,255,0.9)] transition-opacity duration-150 hover:opacity-95 disabled:opacity-55 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2 text-[#0a1a2f]">
                  <div className="w-4 h-4 border-2 border-[#0a1a2f]/30 border-t-[#0a1a2f] rounded-full animate-spin"></div>
                  <span>Жіберілуде...</span>
                </div>
              ) : (
                'Жіберу'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;