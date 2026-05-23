import { Copy, RotateCcw, Trash2 } from "lucide-react";
import { GeneratedWordResult } from "../utils/generator";
import EmptyState from "./EmptyState";
import WordTag from "./WordTag";

type WordResultProps = {
  result: GeneratedWordResult | null;
  onCopy: () => void;
  onShuffle: () => void;
  onClear: () => void;
  isGenerating: boolean;
};

const WordResult = ({
  result,
  onCopy,
  onShuffle,
  onClear,
  isGenerating,
}: WordResultProps) => {
  if (!result) {
    return (
      <section className="rounded-[2rem] bg-white/80 p-5 shadow-soft ring-1 ring-white sm:p-6">
        <EmptyState message="输入主题或点击灵感库里的主题，就能在这里生成词库。" />
      </section>
    );
  }

  const hasWords = result.words.length > 0;
  const statusText = result.statusText ?? (hasWords ? "" : "等待补充词库");
  const countText = hasWords ? `共 ${result.words.length} 个词` : "";
  const statusClassName =
    result.source === "local"
      ? "bg-amber-100 text-party-coral"
      : result.source === "ai" && hasWords
        ? "bg-emerald-100 text-emerald-700"
        : "bg-stone-100 text-stone-600";

  return (
    <section className="rounded-[2rem] bg-white/85 p-5 shadow-soft ring-1 ring-white sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold text-party-coral">
            当前主题
          </p>
          <h2 className="mt-1 text-2xl font-black tracking-normal text-party-ink">
            {result.title}
          </h2>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm font-semibold">
            {statusText && (
              <span className={`rounded-full px-2.5 py-1 ${statusClassName}`}>
                {statusText}
              </span>
            )}
            {countText && <span className="text-stone-500">{countText}</span>}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onCopy}
            disabled={!hasWords || isGenerating}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-party-amber px-4 text-sm font-bold text-party-ink transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-500"
          >
            <Copy className="h-4 w-4" aria-hidden="true" />
            复制词库
          </button>
          <button
            type="button"
            onClick={onShuffle}
            disabled={!hasWords || isGenerating}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-violet-100 px-4 text-sm font-bold text-party-grape transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-500"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            换一批
          </button>
          <button
            type="button"
            onClick={onClear}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-stone-100 px-4 text-sm font-bold text-stone-700 transition hover:-translate-y-0.5 hover:bg-stone-200"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            清空
          </button>
        </div>
      </div>

      <div className="mt-5">
        {hasWords ? (
          <div className="flex flex-wrap gap-2.5">
            {result.words.map((word) => (
              <WordTag key={word} word={word} />
            ))}
          </div>
        ) : (
          <EmptyState message={result.message ?? "这个主题还没有内置词库。"} />
        )}
      </div>
    </section>
  );
};

export default WordResult;
