import { AiWordBank } from "./aiWordBankCache";

const GENERATE_ERROR_MESSAGE = "生成失败了，可以换一个更常见的主题再试试。";

const normalizeWords = (words: unknown) => {
  if (!Array.isArray(words)) {
    return [];
  }

  return [...new Set(words.filter((word): word is string => typeof word === "string"))]
    .map((word) => word.trim())
    .filter(Boolean)
    .slice(0, 50);
};

export const requestAiWordBank = async (theme: string): Promise<AiWordBank> => {
  const response = await fetch("/api/generate-words", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ theme }),
  });

  const data = (await response.json().catch(() => null)) as Partial<
    AiWordBank & { error: string }
  > | null;

  if (!response.ok || data?.error) {
    throw new Error(data?.error || GENERATE_ERROR_MESSAGE);
  }

  const words = normalizeWords(data?.words);

  if (!data?.theme || !data.title || words.length < 5) {
    throw new Error(GENERATE_ERROR_MESSAGE);
  }

  return {
    theme: data.theme,
    title: data.title,
    words,
  };
};
