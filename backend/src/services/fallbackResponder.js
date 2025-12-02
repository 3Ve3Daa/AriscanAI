const detectLanguage = (text) => {
  if (/[\u0400-\u04FF]/.test(text)) {
    return /[әіңғүұқөһ]/i.test(text) ? 'kk' : 'ru';
  }
  return 'en';
};

const domainSpecificResponses = {
  kk: {
    'су деңгейі': 'Қазіргі су деңгейі туралы ақпаратты су ресурстары министрлігінің ресми сайтынан алуға болады.',
    'ауа райы': 'Нақты аудан үшін ауа райын метеорологиялық қызметтен тексеріңіз.',
    'топырақ': 'Топырақтың ылғалдылығын анықтау үшін арнайы аспаптар қажет.',
    'су сапасы': 'Су сапасы туралы ақпаратты жергілікті су құбырларынан немесе экологиялық бақылау органдарынан алуға болады.',
    'су қоры': 'Су қорларын үнемдеу бойынша кеңестер алу үшін су шаруашылығы комитетіне хабарласыңыз.'
  },
  ru: {
    'уровень воды': 'Актуальную информацию об уровне воды можно получить на официальном сайте комитета водных ресурсов.',
    'погода': 'Проверьте прогноз погоды для вашего региона на сайте метеорологической службы.',
    'почва': 'Для определения влажности почвы требуются специальные приборы.',
    'качество воды': 'Информацию о качестве воды можно уточнить в местном водоканале или экологических службах.',
    'запасы воды': 'По вопросам водосбережения обратитесь в комитет водного хозяйства.'
  },
  en: {
    'water level': 'Current water level information is available on the official water resources committee website.',
    'weather': 'Check the weather forecast for your region on the meteorological service website.',
    'soil': 'Special instruments are required to measure soil moisture.',
    'water quality': 'For water quality information, please check with your local water utility or environmental agency.',
    'water supply': 'For water conservation tips, contact your local water resources committee.'
  }
};

const templates = {
  kk: `Құрғақшылық пен су үнемдеу бойынша қысқаша анықтама:

• Құрғақшылық — жауын-шашын ұзақ уақыт бойы нормадан азайып, булану күшейгенде туындайтын гидроклиматтық құбылыс.
• Негізгі себептер: жаһандық жылыну, топырақ эрозиясы, ормансыздану және су ресурстарын тиімсіз басқару.
• Салдары: ауыл шаруашылығы өнімінің азаюы, жайылымдардың тозуы, су тапшылығы мен әлеуметтік шығындар.
• Шешімдер: тамшылатып суару, жаңбыр суын жинау, құрғақшылыққа төзімді дақылдар, топырақты мульчалау және дренажды жақсарту.

Қажет болса, белгілі бір аймақ немесе технология бойынша сұрақ қойыңыз — мен егжей-тегжейлі ұсыныспен бөлісемін.`,
  ru: `Краткая справка по засухе и экономии воды:

• Засуха возникает, когда осадков меньше нормы и усиливается испарение, что приводит к дефициту влаги в почве.
• Причины: изменение климата, деградация почв, вырубка лесов и неэффективное использование водных ресурсов.
• Последствия: снижение урожайности, деградация пастбищ, дефицит пресной воды и социально-экономические риски.
• Меры смягчения: капельное орошение, сбор дождевой воды, устойчивые сорта культур, мульчирование и развитие дренажа.

Если хотите углубиться в конкретную отрасль или регион — уточните, и я расскажу подробнее.`,
  en: `Here is a concise AriscanAI brief on drought resilience and water efficiency:

• Drought emerges when precipitation stays below normal and evaporation increases, creating moisture deficits in soils.
• Core drivers: climate change, soil degradation, deforestation, and inefficient water governance.
• Impacts: lower crop yields, pasture degradation, freshwater scarcity, and socio-economic stress.
• Mitigation: drip irrigation, rainwater harvesting, drought-tolerant crops, mulching, and improved drainage planning.

Let me know the specific sector or region you are interested in, and I will expand with tailored recommendations.`
};

export const generateFallbackAnswer = (userMessage) => {
  if (!userMessage) {
    return templates.en;
  }
  
  const lang = detectLanguage(userMessage);
  const lowerMessage = userMessage.toLowerCase();
  
  // Check for domain-specific responses
  const langResponses = domainSpecificResponses[lang] || domainSpecificResponses.en;
  for (const [key, response] of Object.entries(langResponses)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }
  
  return templates[lang] || templates.en;
};
