import { BadgeCheck, PartyPopper, Sparkles } from "lucide-react";

const Header = () => (
  <header className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-5 pt-6 sm:px-6 lg:px-8 lg:pt-10">
    <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-party-coral sm:gap-2 sm:text-sm">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-2.5 py-1.5 shadow-sm ring-1 ring-black/5 sm:gap-2 sm:px-3">
        <PartyPopper className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
        聚会小游戏助手
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1.5 text-party-mint ring-1 ring-emerald-100 sm:gap-2 sm:px-3">
        <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
        即点即玩
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-2.5 py-1.5 text-party-grape shadow-sm ring-1 ring-violet-100 sm:gap-2 sm:px-3">
        <BadgeCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
        不倒翁阿奇
      </span>
    </div>

    <div className="max-w-3xl">
      <h1 className="text-4xl font-black tracking-normal text-party-ink sm:text-5xl">
        逛三园生成器
      </h1>
      <p className="mt-3 text-base leading-7 text-stone-700 sm:text-lg">
        输入一个主题，马上生成能玩的词库；想不到主题，也可以直接从灵感库里选。
      </p>
    </div>
  </header>
);

export default Header;
