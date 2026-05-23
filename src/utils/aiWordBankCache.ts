export type AiWordBank = {
  theme: string;
  title: string;
  words: string[];
};

const CACHE_PREFIX = "sanyuan_ai_wordbank_";

const getCacheKey = (theme: string) => `${CACHE_PREFIX}${theme.trim()}`;

const normalizeWords = (words: unknown) => {
  if (!Array.isArray(words)) {
    return [];
  }

  return [...new Set(words.filter((word): word is string => typeof word === "string"))]
    .map((word) => word.trim())
    .filter(Boolean)
    .slice(0, 50);
};

export const readCachedAiWordBank = (theme: string): AiWordBank | null => {
  const normalizedTheme = theme.trim();

  if (!normalizedTheme) {
    return null;
  }

  try {
    const rawValue = localStorage.getItem(getCacheKey(normalizedTheme));

    if (!rawValue) {
      return null;
    }

    const parsedValue = JSON.parse(rawValue) as Partial<AiWordBank>;
    const words = normalizeWords(parsedValue.words);

    if (!parsedValue.title || words.length < 5) {
      return null;
    }

    return {
      theme: normalizedTheme,
      title: parsedValue.title,
      words,
    };
  } catch {
    return null;
  }
};

export const writeCachedAiWordBank = (wordBank: AiWordBank) => {
  const normalizedTheme = wordBank.theme.trim();

  if (!normalizedTheme || wordBank.words.length < 5) {
    return;
  }

  try {
    localStorage.setItem(
      getCacheKey(normalizedTheme),
      JSON.stringify({
        theme: normalizedTheme,
        title: wordBank.title,
        words: normalizeWords(wordBank.words),
      }),
    );
  } catch {
    // localStorage 可能被隐私模式或浏览器策略禁用，失败时不影响主流程。
  }
};
