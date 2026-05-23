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
    className="flex flex-col gap-3 xl:flex-row"
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
      className="min-h-16 flex-1 rounded-[1.25rem] border border-white/75 bg-white/72 px-5 text-base font-semibold text-party-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.86),0_12px_28px_rgba(15,23,42,0.04)] outline-none ring-0 backdrop-blur-xl transition placeholder:font-medium placeholder:text-stone-400 focus:border-party-amber/70 focus:bg-white/90 focus:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_0_0_5px_rgba(255,177,42,0.18),0_18px_34px_rgba(15,23,42,0.08)]"
    />
    <button
      type="submit"
      disabled={isGenerating}
      className="premium-button inline-flex min-h-16 items-center justify-center gap-2 rounded-[1.25rem] bg-gradient-to-br from-[#1f1a13] to-[#050505] px-6 text-base font-bold text-white disabled:cursor-not-allowed disabled:from-stone-400 disabled:to-stone-500 disabled:opacity-70 disabled:hover:translate-y-0 xl:min-w-44"
    >
      <Sparkles className="h-5 w-5" aria-hidden="true" />
      {isGenerating ? "生成中..." : "生成词库"}
    </button>
  </form>
);

export default ThemeInput;
