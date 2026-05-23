import { WandSparkles } from "lucide-react";
import { InspirationCategory } from "../data/themes";

type CategoryCardProps = {
  category: InspirationCategory;
  selectedTheme: string;
  onThemeSelect: (theme: string) => void;
};

const iconClassNames: Record<string, string> = {
  basic: "from-amber-100 to-orange-50 text-party-coral",
  food: "from-emerald-100 to-lime-50 text-party-mint",
  consumer: "from-violet-100 to-fuchsia-50 text-party-grape",
  entertainment: "from-rose-100 to-orange-50 text-rose-500",
  sports: "from-sky-100 to-emerald-50 text-sky-600",
  gaming: "from-indigo-100 to-violet-50 text-indigo-600",
  school: "from-yellow-100 to-white text-amber-600",
  social: "from-pink-100 to-white text-pink-500",
};

const CategoryCard = ({
  category,
  selectedTheme,
  onThemeSelect,
}: CategoryCardProps) => {
  const iconClassName = iconClassNames[category.id] ?? iconClassNames.basic;

  return (
    <article className="glass-card rounded-[2rem] p-5 transition hover:-translate-y-0.5 hover:shadow-[0_28px_88px_rgba(15,23,42,0.1)] sm:p-6">
      <div className="flex items-start gap-3">
        <span
          className={`mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br shadow-[0_14px_30px_rgba(15,23,42,0.08)] ring-1 ring-white/70 ${iconClassName}`}
        >
          <WandSparkles className="h-4 w-4" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-lg font-black text-party-ink sm:text-xl">
            {category.name}
          </h3>
          <p className="mt-1 text-sm font-medium leading-6 text-stone-500">
            {category.description}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2.5">
        {category.themes.map((theme) => {
          const selected = selectedTheme === theme;

          return (
            <button
              type="button"
              key={theme}
              onClick={() => onThemeSelect(theme)}
              className={`min-h-10 rounded-full px-3.5 text-sm font-bold transition ${
                selected
                  ? "bg-party-ink text-white shadow-[0_14px_30px_rgba(15,23,42,0.18)]"
                  : "premium-chip text-stone-700 hover:text-party-ink"
              }`}
              aria-pressed={selected}
            >
              {theme}
            </button>
          );
        })}
      </div>
    </article>
  );
};

export default CategoryCard;
