import fetch from 'node-fetch';
import { evaluate, format } from 'mathjs';

const detectLanguage = (text = '') => {
  const sample = text.trim();
  if (!sample) {
    return 'kk';
  }
  if (/[әіңғүұқөһ]/i.test(sample)) {
    return 'kk';
  }
  if (/[а-яёіїҢңҮүҰұҚқӨөҺһ]/i.test(sample)) {
    return 'ru';
  }
  if (/[a-z]/i.test(sample)) {
    return 'en';
  }
  return 'en';
};

const respond = (lang, variants) => variants[lang] || variants.en;

const extractExpression = (message) => {
  const cleaned = message
    .replace(/[^0-9+\-*/%^().,\s]/g, ' ')
    .replace(/,/g, '.')
    .replace(/\s+/g, '')
    .trim();

  if (!cleaned || cleaned.length > 120) {
    return null;
  }
  if (!/^[0-9+\-*/%^().]+$/.test(cleaned)) {
    return null;
  }
  return cleaned;
};

const tryMath = (message, lang) => {
  const expression = extractExpression(message);
  if (!expression) {
    return null;
  }

  try {
    const result = evaluate(expression);
    const formatted = Array.isArray(result) ? result : format(result, { precision: 12 });

    return {
      reply: respond(lang, {
        kk: `Есептеу нәтижесі: ${expression} = ${formatted}`,
        ru: `Результат вычисления: ${expression} = ${formatted}`,
        en: `Calculation result: ${expression} = ${formatted}`,
      }),
      source: 'toolkit-math',
    };
  } catch (error) {
    return null;
  }
};

const parseWaterUsage = (message) => {
  const normalized = message.replace(/,/g, '.');
  const amountMatch = normalized.match(/(\d+(?:\.\d+)?)\s*(литр|литров|л|литрге|литрді|gallon|галлон|галлона|gal)/i);
  if (!amountMatch) {
    return null;
  }

  const value = Number(amountMatch[1]);
  if (Number.isNaN(value)) {
    return null;
  }

  const peopleMatch = normalized.match(/(\d+)\s*(адам|человек|people|үй|семья|family|person)/i);
  const perDay = /(күніне|тәулігіне|в\s*день|per\s*day|daily)/i.test(normalized);

  return {
    value,
    people: peopleMatch ? Number(peopleMatch[1]) : 1,
    perDay,
  };
};

const waterAdvice = (lang, data) => {
  const { value, people, perDay } = data;
  const perPerson = Math.max(people, 1);
  const dailyPerPerson = perDay ? value / perPerson : (value / 7) / perPerson;
  const baseline = 120;
  const delta = dailyPerPerson - baseline;

  const summary = delta > 0
    ? respond(lang, {
        kk: `Тұтыну нормадан ${Math.round(delta)} л/адам/күні артық. Кеңестерді қолдансаңыз, шамамен ${Math.max(15, Math.round(delta * 0.4))} литр үнемдей аласыз.`,
        ru: `Потребление превышает норму на ${Math.round(delta)} л/чел/день. Следуя советам, можно сэкономить ≈${Math.max(15, Math.round(delta * 0.4))} литров.`,
        en: `Usage exceeds baseline by ${Math.round(delta)} L/person/day. Applying these tips can save ≈${Math.max(15, Math.round(delta * 0.4))} L.`,
      })
    : respond(lang, {
        kk: 'Тұтыну базалық нормадан төмен. Қазіргі әдеттер тиімді, ал төмендегі кеңестер қосымша үнем береді.',
        ru: 'Потребление уже ниже базовой нормы. Сохраните привычки, а советы усилят эффект.',
        en: 'Consumption is already below baseline. Keep your habits; the tips will add extra savings.',
      });

  const tips = [
    respond(lang, {
      kk: '• Су ағатын кран/бачоктарды тексеріп, жөндеңіз — күніне 20–30 л үнем.',
      ru: '• Проверьте и устраните протечки в кранах и бачках — экономия 20–30 л в день.',
      en: '• Fix leaks in taps and cisterns — saves 20–30 L per day.',
    }),
    respond(lang, {
      kk: '• Душ уақытын 1–2 минутқа қысқартыңыз немесе су үнемдейтін душ басын орнатыңыз.',
      ru: '• Сократите время душа на 1–2 минуты или поставьте экономичную лейку.',
      en: '• Shorten shower time by 1–2 minutes or install a low-flow showerhead.',
    }),
    respond(lang, {
      kk: '• Кір/ыдыс жуғышты тек толық жүктемемен қосыңыз — қосымша 15–20% үнемдейді.',
      ru: '• Запускайте стиральную и посудомоечную машины только при полной загрузке — ещё 15–20% экономии.',
      en: '• Run laundry and dishwasher only with full loads — another 15–20% savings.',
    }),
  ];

  return {
    reply: [summary, '', ...tips].join('\n'),
    source: 'toolkit-water',
  };
};

const tryWaterOptimization = (message, lang) => {
  if (!/(су|вода|water)/i.test(message)) {
    return null;
  }
  const parsed = parseWaterUsage(message);
  if (!parsed) {
    return null;
  }
  return waterAdvice(lang, parsed);
};

const pickLocationFromText = (text, keywords = []) => {
  const lower = text.toLowerCase();

  for (const keyword of keywords) {
    const idx = lower.indexOf(keyword.toLowerCase());
    if (idx >= 0) {
      const fragment = text.slice(idx + keyword.length).trim();
      const match = fragment.match(/([a-zA-Zа-яА-ЯёЁіІңҢүҮұҰқҚөӨһҺ\-\s]{2,})/);
      if (match) {
        return match[1]
          .trim()
          .replace(/^(в\s+|в\s+г\.?\s+|in\s+|по\s+)/i, '')
          .split(/[?!.,]/)[0]
          .trim();
      }
    }
  }

  const direct = text.match(/(?:в|in|по)\s+([A-Za-zА-Яа-яёЁіІңҢүҮұҰқҚөӨһҺ\-\s]{2,})/i);
  if (direct) {
    return direct[1].trim();
  }

  return null;
};

const resolveLocation = (message, history = [], keywords = []) => {
  let location = pickLocationFromText(message, keywords);
  if (location) {
    return location;
  }

  for (let i = history.length - 1; i >= 0; i -= 1) {
    const entry = history[i];
    if (entry?.role !== 'user') {
      continue;
    }
    const maybe = pickLocationFromText(entry.content || '', keywords);
    if (maybe) {
      return maybe;
    }
  }

  return null;
};

const formatWeather = (lang, location, current, tomorrow) => respond(lang, {
  kk: `${location} бойынша ауа райы:\n• Температура: ${current.temp_C}°C (сезіледі ${current.FeelsLikeC}°C)\n• Ылғалдылық: ${current.humidity}%\n• Жел: ${current.windspeedKmph} км/сағ, бағыты ${current.winddir16Point}\n${tomorrow ? `\nЕртең: күндіз ${tomorrow.maxtempC}°C, түнде ${tomorrow.mintempC}°C.` : ''}`,
  ru: `Погода для ${location}:\n• Температура: ${current.temp_C}°C (ощущается ${current.FeelsLikeC}°C)\n• Влажность: ${current.humidity}%\n• Ветер: ${current.windspeedKmph} км/ч, направление ${current.winddir16Point}\n${tomorrow ? `\nЗавтра: днём ${tomorrow.maxtempC}°C, ночью ${tomorrow.mintempC}°C.` : ''}`,
  en: `Weather for ${location}:\n• Temperature: ${current.temp_C}°C (feels like ${current.FeelsLikeC}°C)\n• Humidity: ${current.humidity}%\n• Wind: ${current.windspeedKmph} km/h from ${current.winddir16Point}\n${tomorrow ? `\nTomorrow: high ${tomorrow.maxtempC}°C, low ${tomorrow.mintempC}°C.` : ''}`,
});

const tryWeather = async (message, lang, history) => {
  if (!/(погода|weather|hava|ауа райы)/i.test(message)) {
    return null;
  }

  const location = resolveLocation(message, history, ['погода в', 'weather in', 'ауа райы', 'weather']);
  if (!location) {
    return {
      reply: respond(lang, {
        kk: 'Қай қала бойынша ауа райы қажет? Мысалы: "Алматыда ауа райы".',
        ru: 'Укажите город для прогноза, например: "Погода в Алматы".',
        en: 'Please specify the city, e.g. "weather in Almaty".',
      }),
      source: 'toolkit-weather',
      needsFollowUp: true,
    };
  }

  try {
    const url = `https://wttr.in/${encodeURIComponent(location)}?format=j1`;
    const response = await fetch(url, { timeout: 6500 });
    if (!response.ok) {
      throw new Error('weather fetch failed');
    }
    const data = await response.json();

    const current = data.current_condition?.[0];
    const tomorrow = data.weather?.[1];
    if (!current) {
      throw new Error('weather data missing');
    }

    return {
      reply: formatWeather(lang, location, current, tomorrow),
      source: 'toolkit-weather',
    };
  } catch (error) {
    return {
      reply: respond(lang, {
        kk: 'Қазір ауа райын алу мүмкін болмады. Қала атауын нақтылап, біраздан кейін қайталап көріңіз.',
        ru: 'Не удалось получить данные о погоде. Уточните город и попробуйте позже.',
        en: 'Unable to retrieve weather now. Please refine the city and try again later.',
      }),
      source: 'toolkit-weather',
    };
  }
};

const knownTimezones = {
  almaty: 'Asia/Almaty',
  астана: 'Asia/Almaty',
  astana: 'Asia/Almaty',
  nur_sultan: 'Asia/Almaty',
  shymkent: 'Asia/Almaty',
  taraz: 'Asia/Almaty',
  london: 'Europe/London',
  tokyo: 'Asia/Tokyo',
  new_york: 'America/New_York',
  nyc: 'America/New_York',
  los_angeles: 'America/Los_Angeles',
  paris: 'Europe/Paris',
  berlin: 'Europe/Berlin',
};

const formatTime = (lang, zone, label) => {
  try {
    const formatter = new Intl.DateTimeFormat(
      lang === 'ru' ? 'ru-RU' : lang === 'kk' ? 'kk-KZ' : 'en-US',
      {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
        timeZone: zone,
      },
    );

    return respond(lang, {
      kk: `${label} уақыты: ${formatter.format(new Date())}`,
      ru: `Текущее время для ${label}: ${formatter.format(new Date())}`,
      en: `Current time in ${label}: ${formatter.format(new Date())}`,
    });
  } catch (error) {
    return null;
  }
};

const tryTime = async (message, lang, history) => {
  if (!/(уақыт|время|time)/i.test(message)) {
    return null;
  }

  let location = resolveLocation(message, history, ['время в', 'time in', 'уақыт', 'time']);
  if (!location) {
    return {
      reply: respond(lang, {
        kk: 'Қай қала немесе уақыт белдеуі керек? Мысалы: "Астанада уақыт".',
        ru: 'Уточните город или пояс, например: "Время в Астане".',
        en: 'Please specify the city or time zone, e.g. "time in Astana".',
      }),
      source: 'toolkit-time',
      needsFollowUp: true,
    };
  }

  const normalized = location.toLowerCase().replace(/\s+/g, '_');
  const matchedEntry = Object.entries(knownTimezones).find(([key]) => normalized.includes(key));
  if (matchedEntry) {
    const direct = formatTime(lang, matchedEntry[1], location);
    if (direct) {
      return {
        reply: direct,
        source: 'toolkit-time',
      };
    }
  }

  try {
    const searchUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(`${location} current time`)}&format=json&no_redirect=1&no_html=1`;
    const searchRes = await fetch(searchUrl, { timeout: 6000 });
    if (!searchRes.ok) {
      throw new Error('timezone search failed');
    }
    const payload = await searchRes.json();

    let timezone = null;
    if (payload?.Infobox?.content) {
      const tzEntry = payload.Infobox.content.find((entry) => /time zone/i.test(entry.label || ''));
      if (tzEntry?.data?.value) {
        timezone = tzEntry.data.value;
      }
    }

    if (!timezone && payload?.Answer) {
      const tzMatch = payload.Answer.match(/([A-Za-z_\/]+\/[^\s]+)/);
      if (tzMatch) {
        timezone = tzMatch[1];
      }
    }

    const fetchWorldTime = async (zone) => {
      const res = await fetch(`http://worldtimeapi.org/api/timezone/${encodeURIComponent(zone)}`, { timeout: 6000 });
      if (!res.ok) {
        throw new Error('worldtimeapi error');
      }
      return res.json();
    };

    let timeData = null;
    if (timezone) {
      try {
        timeData = await fetchWorldTime(timezone);
      } catch (error) {
        timeData = null;
      }
    }

    if (!timeData) {
      const listRes = await fetch('http://worldtimeapi.org/api/timezone', { timeout: 6000 });
      if (listRes.ok) {
        const zones = await listRes.json();
        if (Array.isArray(zones)) {
          const zoneGuess = zones.find((zone) => zone.toLowerCase().includes(normalized));
          if (zoneGuess) {
            timeData = await fetchWorldTime(zoneGuess);
          }
        }
      }
    }

    if (timeData?.datetime) {
      const date = new Date(timeData.datetime);
      const formatted = date.toLocaleString(lang === 'ru' ? 'ru-RU' : lang === 'kk' ? 'kk-KZ' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
      });

      return {
        reply: respond(lang, {
          kk: `${location} бойынша ағымдағы уақыт: ${formatted}`,
          ru: `Текущее время для ${location}: ${formatted}`,
          en: `Current time in ${location}: ${formatted}`,
        }),
        source: 'toolkit-time',
      };
    }

    throw new Error('time data missing');
  } catch (error) {
    return {
      reply: respond(lang, {
        kk: 'Қазір уақытты алу мүмкін болмады. Қаланы нақтылап қайта сұраңыз немесе басқа сұрақ қойыңыз.',
        ru: 'Не удалось получить время. Уточните город и попробуйте снова, либо задайте другой вопрос.',
        en: 'Unable to fetch the time right now. Please specify the city again or ask another question.',
      }),
      source: 'toolkit-time',
    };
  }
};

const tryWebSearch = async (message, lang) => {
  const tokens = message.trim().split(/\s+/);
  if (tokens.length < 2) {
    return null;
  }

  try {
    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(message)}&format=json&no_redirect=1&no_html=1&skip_disambig=1`;
    const response = await fetch(url, { timeout: 6000 });
    if (!response.ok) {
      throw new Error('search failed');
    }
    const data = await response.json();

    const abstract = data.AbstractText || data.Abstract || null;
    const related = (data.RelatedTopics || [])
      .map((item) => (item.Text ? item.Text : item.Topic ? item.Topic.Text : null))
      .filter(Boolean)
      .slice(0, 3);

    if (!abstract && !related.length) {
      return null;
    }

    const reply = [
      abstract,
      related.length
        ? respond(lang, {
            kk: `Қосымша дереккөздер:\n• ${related.join('\n• ')}`,
            ru: `Дополнительные источники:\n• ${related.join('\n• ')}`,
            en: `Additional sources:\n• ${related.join('\n• ')}`,
          })
        : null,
      respond(lang, {
        kk: 'Деректер DuckDuckGo ашық іздеу сервисі арқылы алынды.',
        ru: 'Данные получены через открытый поиск DuckDuckGo.',
        en: 'Information sourced via the DuckDuckGo open search API.',
      }),
    ]
      .filter(Boolean)
      .join('\n\n');

    return {
      reply,
      source: 'toolkit-search',
    };
  } catch (error) {
    return null;
  }
};

export const handleWithToolkit = async (message, history = []) => {
  const lang = detectLanguage(message);

  const mathResult = tryMath(message, lang);
  if (mathResult) {
    return mathResult;
  }

  const waterResult = tryWaterOptimization(message, lang);
  if (waterResult) {
    return waterResult;
  }

  const weatherResult = await tryWeather(message, lang, history);
  if (weatherResult && !weatherResult.needsFollowUp) {
    return weatherResult;
  }

  const timeResult = await tryTime(message, lang, history);
  if (timeResult && !timeResult.needsFollowUp) {
    return timeResult;
  }

  if (weatherResult?.needsFollowUp) {
    return weatherResult;
  }

  if (timeResult?.needsFollowUp) {
    return timeResult;
  }

  const searchResult = await tryWebSearch(message, lang);
  if (searchResult) {
    return searchResult;
  }

  return null;
};
