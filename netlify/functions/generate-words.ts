import OpenAI from "openai";

type AiWordResponse = {
  theme?: unknown;
  title?: unknown;
  words?: unknown;
};

const DEFAULT_ERROR_MESSAGE = "AI 生成失败了，可以换一个主题再试试。";
const MISSING_API_KEY_MESSAGE =
  "AI API Key 未配置，请先在 Netlify 环境变量中填写 AI_API_KEY。";
const INSUFFICIENT_BALANCE_MESSAGE =
  "AI 平台账户余额不足或免费额度已用完，请检查平台余额后再试。";
const DEFAULT_BASE_URL = "https://api.deepseek.com";
const DEFAULT_MODEL = "deepseek-v4-flash";
const MAX_THEME_LENGTH = 30;
const MAX_WORDS = 50;
const MIN_WORDS = 5;

const SYSTEM_PROMPT = `你是一个中文聚会游戏「逛三园」词库生成助手。

用户会输入一个主题，例如：动物、植物、口红品牌、中国省份、啤酒品牌、运动品牌、健身动作、教培行业黑话。

你的任务是生成适合线下多人游戏「逛三园」使用的词库。

生成要求：
1. 只生成和主题强相关的词。
2. 词语必须适合玩家口头快速说出。
3. 每个词尽量短，不要超过 8 个中文字符，品牌英文名可以例外。
4. 不要生成解释。
5. 不要生成句子。
6. 不要重复。
7. 不要生成低俗、违法、成人、危险、仇恨、敏感政治或明显不适合聚会游戏的内容。
8. 默认生成 40 个词。
9. 如果主题本身不适合生成词库，返回空数组。
10. 必须只返回 JSON，不要返回 Markdown，不要返回代码块。
11. 用户输入的是一个类别时，你只能生成这个类别下的直接成员。
12. 不要生成相关人物、相关事件、相关称号、相关解释。
13. 例如：用户输入“中国朝代”，只能生成朝代名称，不能生成秦始皇、汉武帝、唐太宗、成吉思汗等历史人物。
14. 例如：用户输入“运动品牌”，只能生成品牌名，不能生成运动员。
15. 例如：用户输入“游戏主播”，只能生成主播名，不能生成游戏名。
16. 例如：用户输入“水果”，只能生成水果名，不能生成果汁、甜品或水果品牌。

JSON 格式必须是：
{
  "theme": "用户输入的主题",
  "title": "xxx词库",
  "words": ["词1", "词2", "词3"]
}`;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json; charset=utf-8",
    },
  });

const normalizeWords = (words: unknown) => {
  if (!Array.isArray(words)) {
    return null;
  }

  const seen = new Set<string>();
  const result: string[] = [];

  for (const item of words) {
    if (typeof item !== "string") {
      continue;
    }

    const word = item.trim();

    if (!word || seen.has(word)) {
      continue;
    }

    seen.add(word);
    result.push(word);

    if (result.length >= MAX_WORDS) {
      break;
    }
  }

  return result;
};

const getStatusCode = (error: unknown) => {
  if (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof (error as { status?: unknown }).status === "number"
  ) {
    return (error as { status: number }).status;
  }

  return undefined;
};

const getSafeErrorMessage = (error: unknown) => {
  const status = getStatusCode(error);

  if (status === 402 || status === 429) {
    return INSUFFICIENT_BALANCE_MESSAGE;
  }

  if (status === 401 || status === 403) {
    return "AI API Key 无效或没有访问权限，请检查 Netlify 环境变量 AI_API_KEY。";
  }

  return DEFAULT_ERROR_MESSAGE;
};

export default async function handler(request: Request) {
  if (request.method !== "POST") {
    return json({ error: DEFAULT_ERROR_MESSAGE }, 405);
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return json({ error: DEFAULT_ERROR_MESSAGE }, 400);
  }

  const theme =
    body && typeof body === "object" && typeof (body as { theme?: unknown }).theme === "string"
      ? (body as { theme: string }).theme.trim()
      : "";

  if (!theme || Array.from(theme).length > MAX_THEME_LENGTH) {
    return json({ error: DEFAULT_ERROR_MESSAGE }, 400);
  }

  const apiKey = process.env.AI_API_KEY;
  const baseURL = process.env.AI_BASE_URL || DEFAULT_BASE_URL;
  const model = process.env.AI_MODEL || DEFAULT_MODEL;

  if (!apiKey) {
    return json({ error: MISSING_API_KEY_MESSAGE }, 500);
  }

  try {
    const client = new OpenAI({
      apiKey,
      baseURL,
    });

    const completion = await client.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `主题：${theme}`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 1200,
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      return json({ error: DEFAULT_ERROR_MESSAGE }, 500);
    }

    let parsed: AiWordResponse;

    try {
      parsed = JSON.parse(content) as AiWordResponse;
    } catch {
      return json({ error: DEFAULT_ERROR_MESSAGE }, 500);
    }

    const words = normalizeWords(parsed.words);

    if (!words || words.length < MIN_WORDS) {
      return json({ error: DEFAULT_ERROR_MESSAGE }, 500);
    }

    const title =
      typeof parsed.title === "string" && parsed.title.trim()
        ? parsed.title.trim()
        : `${theme}词库`;

    return json({
      theme,
      title,
      words,
    });
  } catch (error) {
    return json({ error: getSafeErrorMessage(error) }, 500);
  }
}
