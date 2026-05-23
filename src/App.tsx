import { useMemo, useRef, useState } from "react";
import Header from "./components/Header";
import InspirationLibrary from "./components/InspirationLibrary";
import ThemeInput from "./components/ThemeInput";
import WordResult from "./components/WordResult";
import { inspirationCategories } from "./data/themes";
import { requestAiWordBank } from "./utils/aiWordApi";
import {
  AiWordBank,
  readCachedAiWordBank,
  writeCachedAiWordBank,
} from "./utils/aiWordBankCache";
import {
  GeneratedWordResult,
  generateWordsByTheme,
  shuffleWords,
} from "./utils/generator";

const AI_LOADING_MESSAGE = "AI 正在帮你补充词库，大概几秒钟……";
const AI_SUCCESS_MESSAGE = "AI 已补充词库";
const AI_ERROR_MESSAGE = "生成失败了，可以换一个更常见的主题再试试。";

const copyToClipboard = async (text: string) => {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // 部分内嵌浏览器会暴露 clipboard API，但拒绝写入权限。
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
};

const createAiResult = (wordBank: AiWordBank): GeneratedWordResult => ({
  bank: null,
  requestedTheme: wordBank.theme,
  title: wordBank.title,
  words: wordBank.words,
  source: "ai",
  statusText: AI_SUCCESS_MESSAGE,
});

const createLoadingResult = (theme: string): GeneratedWordResult => ({
  bank: null,
  requestedTheme: theme,
  title: `${theme}词库`,
  words: [],
  source: "ai",
  statusText: AI_LOADING_MESSAGE,
  message: AI_LOADING_MESSAGE,
});

const createFailedResult = (
  theme: string,
  message = AI_ERROR_MESSAGE,
): GeneratedWordResult => ({
  bank: null,
  requestedTheme: theme,
  title: `${theme}词库`,
  words: [],
  source: "empty",
  statusText: "生成失败",
  message,
});

const App = () => {
  const initialResult = useMemo(() => generateWordsByTheme("动物"), []);
  const activeRequestId = useRef(0);
  const [theme, setTheme] = useState("动物");
  const [selectedTheme, setSelectedTheme] = useState("动物");
  const [result, setResult] = useState<GeneratedWordResult | null>(
    initialResult,
  );
  const [toast, setToast] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 1800);
  };

  const generate = async (nextTheme = theme) => {
    const requestedTheme = nextTheme.trim();
    const requestId = activeRequestId.current + 1;
    activeRequestId.current = requestId;

    if (!requestedTheme) {
      setTheme("");
      setSelectedTheme("");
      setResult({
        bank: null,
        requestedTheme: "",
        title: "未选择主题",
        words: [],
        source: "empty",
        statusText: "等待输入",
        message: "请输入一个主题再生成词库。",
      });
      return;
    }

    setTheme(requestedTheme);
    setSelectedTheme(requestedTheme);

    const localResult = generateWordsByTheme(requestedTheme);

    if (localResult.bank) {
      setIsGenerating(false);
      setSelectedTheme(localResult.bank.names[0]);
      setResult(localResult);
      return;
    }

    const cachedResult = readCachedAiWordBank(requestedTheme);

    if (cachedResult) {
      setIsGenerating(false);
      setResult(createAiResult(cachedResult));
      return;
    }

    setIsGenerating(true);
    setResult(createLoadingResult(requestedTheme));

    try {
      const aiResult = await requestAiWordBank(requestedTheme);

      if (activeRequestId.current !== requestId) {
        return;
      }

      const normalizedResult = createAiResult(aiResult);
      writeCachedAiWordBank(aiResult);
      setSelectedTheme(aiResult.theme);
      setResult(normalizedResult);
    } catch (error) {
      if (activeRequestId.current !== requestId) {
        return;
      }

      setResult(
        createFailedResult(
          requestedTheme,
          error instanceof Error ? error.message : AI_ERROR_MESSAGE,
        ),
      );
    } finally {
      if (activeRequestId.current === requestId) {
        setIsGenerating(false);
      }
    }
  };

  const handleCopy = async () => {
    if (!result?.words.length) {
      return;
    }

    await copyToClipboard(`${result.title}\n${result.words.join("、")}`);
    showToast("已复制到剪贴板");
  };

  const handleShuffle = () => {
    if (!result?.words.length) {
      return;
    }

    setResult({
      ...result,
      words: shuffleWords(result.words),
    });
  };

  const handleClear = () => {
    activeRequestId.current += 1;
    setIsGenerating(false);
    setTheme("");
    setSelectedTheme("");
    setResult(null);
  };

  const handleThemeSelect = (nextTheme: string) => {
    void generate(nextTheme);
  };

  return (
    <div className="app-shell min-h-screen overflow-hidden">
      <Header />

      <main className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
        <section className="grid gap-5 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-start">
          <div className="glass-card-strong rounded-[2rem] p-5 transition hover:-translate-y-0.5 sm:rounded-[2.25rem] sm:p-7 lg:sticky lg:top-6">
            <div className="mb-5">
              <p className="text-sm font-bold text-party-coral">输入主题生成词库</p>
              <h2 className="mt-2 text-2xl font-black leading-tight text-party-ink sm:text-3xl">
                一句话成逛三园大神
              </h2>
            </div>
            <ThemeInput
              theme={theme}
              onThemeChange={setTheme}
              onSubmit={() => generate()}
              isGenerating={isGenerating}
            />
            <div className="mt-5 flex flex-wrap gap-2 text-sm text-stone-500">
              {["动物", "口红品牌", "中国省份", "啤酒品牌"].map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => handleThemeSelect(item)}
                  className="premium-chip min-h-10 px-4 text-sm font-semibold text-stone-700 hover:text-party-ink"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <WordResult
            result={result}
            onCopy={handleCopy}
            onShuffle={handleShuffle}
            onClear={handleClear}
            isGenerating={isGenerating}
          />
        </section>

        <InspirationLibrary
          categories={inspirationCategories}
          selectedTheme={selectedTheme}
          onThemeSelect={handleThemeSelect}
        />
      </main>

      <footer className="border-t border-white/60 bg-white/35 px-4 py-7 text-center text-sm font-semibold text-stone-500 backdrop-blur-2xl">
        适合聚会、团建、课堂、酒桌、直播互动
      </footer>

      <div
        className={`fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-full bg-party-ink/95 px-5 py-3 text-sm font-bold text-white shadow-[0_18px_46px_rgba(15,23,42,0.22)] backdrop-blur-xl transition ${
          toast ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
        }`}
        role="status"
        aria-live="polite"
      >
        {toast}
      </div>
    </div>
  );
};

export default App;
