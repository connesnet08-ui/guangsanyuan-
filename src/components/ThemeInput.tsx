import { Sparkles } from "lucide-react";

type ThemeInputProps = {
  theme: string;
  onThemeChange: (theme: string) => void;
  onSubmit: () => void | Promise<void>;
  isGenerating: boolean;
};

const ThemeInput = ({
  theme,
  onThemeChange,
  onSubmit,
  isGenerating,
}: ThemeInputProps) => (
  <form
    className="flex flex-col gap-3 sm:flex-row"
    onSubmit={(event) => {
      event.preventDefault();
      onSubmit();
    }}
  >
    <label className="sr-only" htmlFor="theme-input">
      逛三园主题
    </label>
    <input
      id="theme-input"
      value={theme}
      onChange={(event) => onThemeChange(event.target.value)}
      placeholder="输入一个逛三园主题，比如：动物、口红品牌、中国省份、啤酒品牌"
      className="min-h-12 flex-1 rounded-2xl border border-amber-200 bg-white px-4 text-base text-party-ink outline-none ring-0 transition placeholder:text-stone-400 focus:border-party-amber focus:shadow-[0_0_0_4px_rgba(255,177,42,0.22)]"
    />
    <button
      type="submit"
      disabled={isGenerating}
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-party-ink px-5 text-base font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-black active:translate-y-0 disabled:cursor-not-allowed disabled:bg-stone-400 disabled:hover:translate-y-0"
    >
      <Sparkles className="h-5 w-5" aria-hidden="true" />
      {isGenerating ? "生成中..." : "生成词库"}
    </button>
  </form>
);

export default ThemeInput;
