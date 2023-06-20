import { getCategories } from "@/firebase/utils";
import CategoryItem from "./CategoryItem";

export type CategoryListProps = {
  search: {
    name: string;
    show: "all" | "main" | "sub";
  };
};

async function CategoryList({ search }: CategoryListProps) {
  const categories = await getCategories(search);
  console.log(categories);
  return (
    <ul
      id="category-list"
      className="grid text-lg mt-4 md:mt-6 sm:grid-cols-2 sm:gap-0 lg:grid-cols-4 lg:gap-4 list-disc"
    >
      {categories.map(cat => (
        <CategoryItem key={cat.name} category={cat} show={search.show} />
      ))}
    </ul>
  );
}

export default CategoryList;
