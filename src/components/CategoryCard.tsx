import { WandSparkles } from "lucide-react";
import { InspirationCategory } from "../data/themes";

type CategoryCardProps = {
  category: InspirationCategory;
  selectedTheme: string;
  onThemeSelect: (theme: string) => void;
};

const CategoryCard = ({
  category,
  selectedTheme,
  onThemeSelect,
}: CategoryCardProps) => (
  <article className="rounded-3xl bg-white/80 p-5 shadow-sm ring-1 ring-amber-100/80">
    <div className="flex items-start gap-3">
      <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-party-coral">
        <WandSparkles className="h-4 w-4" aria-hidden="true" />
      </span>
      <div>
        <h3 className="text-lg font-black text-party-ink">{category.name}</h3>
        <p className="mt-1 text-sm leading-6 text-stone-500">
          {category.description}
        </p>
      </div>
    </div>

    <div className="mt-4 flex flex-wrap gap-2">
      {category.themes.map((theme) => {
        const selected = selectedTheme === theme;

        return (
          <button
            type="button"
            key={theme}
            onClick={() => onThemeSelect(theme)}
            className={`min-h-9 rounded-full px-3.5 text-sm font-bold transition ${
              selected
                ? "bg-party-coral text-white shadow-sm"
                : "bg-stone-100 text-stone-700 hover:bg-amber-100 hover:text-party-ink"
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

export default CategoryCard;
