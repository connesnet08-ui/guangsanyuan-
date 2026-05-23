import { InspirationCategory } from "../data/themes";
import CategoryCard from "./CategoryCard";

type InspirationLibraryProps = {
  categories: InspirationCategory[];
  selectedTheme: string;
  onThemeSelect: (theme: string) => void;
};

const InspirationLibrary = ({
  categories,
  selectedTheme,
  onThemeSelect,
}: InspirationLibraryProps) => (
  <section className="mt-8">
    <div>
      <p className="text-sm font-bold text-party-coral">逛三园主题灵感库</p>
      <h2 className="mt-1 text-2xl font-black tracking-normal text-party-ink">
        不知道玩什么，就从这里点
      </h2>
    </div>

    <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          selectedTheme={selectedTheme}
          onThemeSelect={onThemeSelect}
        />
      ))}
    </div>
  </section>
);

export default InspirationLibrary;
