import { PartyPopper } from "lucide-react";

const TumblerIcon = () => (
  <svg
    className="h-3.5 w-3.5 sm:h-4 sm:w-4"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="8" cy="4.2" r="1.8" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M4.6 9.6c0-2 1.5-3.3 3.4-3.3s3.4 1.3 3.4 3.3c0 2.2-1.5 3.9-3.4 3.9s-3.4-1.7-3.4-3.9Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M6.4 12.9c.5.3 1 .4 1.6.4s1.1-.1 1.6-.4"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
    />
  </svg>
);

const Header = () => (
  <header className="fade-slide-up mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-7 pt-6 sm:px-6 lg:px-8 lg:pb-10 lg:pt-12">
    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold sm:text-sm">
      <span className="premium-badge text-party-coral">
        <PartyPopper className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
        聚会小游戏助手
      </span>
      <span className="premium-badge text-party-mint">
        🐟 小鱼
      </span>
      <span className="premium-badge text-party-grape">
        <TumblerIcon />
        不倒翁阿奇
      </span>
    </div>

    <div className="max-w-4xl">
      <h1 className="bg-gradient-to-br from-[#17120b] via-[#2d2418] to-[#7c4b18] bg-clip-text text-5xl font-black tracking-normal text-transparent sm:text-6xl lg:text-7xl">
        逛三园生成器
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-8 text-[#584532] sm:text-xl sm:leading-9">
        输入一个主题，马上生成可以偷偷摸摸使用的词库了；想不到主题，也可以直接从灵感库里选。
      </p>
    </div>
  </header>
);

export default Header;
