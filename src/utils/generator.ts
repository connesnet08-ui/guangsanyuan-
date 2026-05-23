import { WordBank, wordBanks } from "../data/themes";

export type WordResultSource = "local" | "ai" | "empty";

export type GeneratedWordResult = {
  bank: WordBank | null;
  requestedTheme: string;
  title: string;
  words: string[];
  source: WordResultSource;
  statusText?: string;
  message?: string;
};

const EMPTY_MESSAGE =
  "暂时没有找到这个主题的内置词库，你可以换一个更常见的主题，例如：动物、品牌、城市、明星、食物。";

const normalizeTheme = (theme: string) =>
  theme
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[，。,.、/\\|_-]/g, "");

const matchesBank = (input: string, bank: WordBank) => {
  const normalizedNames = bank.names.map(normalizeTheme);

  return normalizedNames.some((name) => {
    if (!input || !name) {
      return false;
    }

    return input === name || input.includes(name) || name.includes(input);
  });
};

export const shuffleWords = (words: string[]) =>
  [...words].sort(() => Math.random() - 0.5);

// 只负责本地词库匹配；AI 兜底在前端异步流程和后端接口中处理。
export const generateWordsByTheme = (theme: string): GeneratedWordResult => {
  const requestedTheme = theme.trim();
  const normalizedInput = normalizeTheme(requestedTheme);
  const bank = wordBanks.find((item) => matchesBank(normalizedInput, item));

  if (!bank) {
    return {
      bank: null,
      requestedTheme,
      title: requestedTheme ? `${requestedTheme}词库` : "未选择主题",
      words: [],
      source: "empty",
      message: EMPTY_MESSAGE,
    };
  }

  return {
    bank,
    requestedTheme: bank.names[0],
    title: bank.title,
    words: bank.words,
    source: "local",
    statusText: "内置词库",
  };
};
