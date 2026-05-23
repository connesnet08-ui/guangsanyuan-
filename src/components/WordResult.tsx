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
      <section className="glass-card-strong rounded-[2rem] p-5 sm:rounded-[2.25rem] sm:p-7">
        <EmptyState message="输入主题或点击灵感库里的主题，就能在这里生成词库。" />
      </section>
    );
  }

  const hasWords = result.words.length > 0;
  const statusText = result.statusText ?? (hasWords ? "" : "等待补充词库");
  const countText = hasWords ? `共 ${result.words.length} 个词` : "";
  const statusClassName =
    result.source === "local"
      ? "border-amber-200/70 bg-amber-100/70 text-party-coral"
      : result.source === "ai" && hasWords
        ? "border-emerald-200/70 bg-emerald-100/70 text-emerald-700"
        : "border-stone-200/70 bg-stone-100/70 text-stone-600";

  return (
    <section className="glass-card-strong rounded-[2rem] p-5 transition hover:-translate-y-0.5 sm:rounded-[2.25rem] sm:p-7">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-bold text-party-coral">
            当前主题
          </p>
          <h2 className="mt-2 break-words text-3xl font-black leading-tight tracking-normal text-party-ink sm:text-4xl">
            {result.title}
          </h2>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm font-semibold">
            {statusText && (
              <span className={`inline-flex rounded-full border px-3 py-1.5 backdrop-blur-xl ${statusClassName}`}>
                {statusText}
              </span>
            )}
            {countText && <span className="rounded-full bg-white/45 px-3 py-1.5 text-stone-500 ring-1 ring-white/60">{countText}</span>}
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5 xl:justify-end">
          <button
            type="button"
            onClick={onCopy}
            disabled={!hasWords || isGenerating}
            className="premium-button inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-br from-party-amber to-[#ff8a3d] px-4 text-sm font-bold text-party-ink disabled:cursor-not-allowed disabled:from-stone-200 disabled:to-stone-200 disabled:text-stone-500 disabled:shadow-none"
          >
            <Copy className="h-4 w-4" aria-hidden="true" />
            复制词库
          </button>
          <button
            type="button"
            onClick={onShuffle}
            disabled={!hasWords || isGenerating}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-violet-100 bg-violet-100/70 px-4 text-sm font-bold text-party-grape shadow-[0_10px_24px_rgba(124,58,237,0.08)] transition hover:-translate-y-0.5 hover:bg-violet-100 disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-500"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            换一批
          </button>
          <button
            type="button"
            onClick={onClear}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-stone-200/70 bg-white/60 px-4 text-sm font-bold text-stone-700 shadow-[0_10px_24px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:bg-white/90"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            清空
          </button>
        </div>
      </div>

      <div className="mt-7">
        {hasWords ? (
          <div className="rounded-[1.75rem] border border-white/65 bg-white/30 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] sm:p-4">
            <div className="flex flex-wrap gap-3">
              {result.words.map((word) => (
                <WordTag key={word} word={word} />
              ))}
            </div>
          </div>
        ) : (
          <EmptyState message={result.message ?? "这个主题还没有内置词库。"} />
        )}
      </div>
    </section>
  );
};

export default WordResult;
