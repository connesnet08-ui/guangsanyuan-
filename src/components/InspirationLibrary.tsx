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
  <section className="mt-10 lg:mt-14">
    <div className="max-w-3xl">
      <p className="text-sm font-bold text-party-coral">逛三园主题灵感库</p>
      <h2 className="mt-2 text-3xl font-black leading-tight tracking-normal text-party-ink sm:text-4xl">
        不知道玩什么，就从这里点
      </h2>
    </div>

    <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
