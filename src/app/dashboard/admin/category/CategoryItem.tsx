import { CategoryDoc } from "@/types/category";
import clsx from "clsx";
import Link from "next/link";
import SubCategoryList from "./SubCategoryList";

export type CategoryItemProps = {
  category: CategoryDoc;
  show: "all" | "main" | "sub";
};

function CategoryItem({ category, show }: CategoryItemProps) {
  return (
    <li key={category.name}>
      {show !== "sub" ? (
        <Link
          href={`/dashboard/admin/category/${encodeURIComponent(
            category.name
          )}`}
          className="hover:underline hover:text-indigo-400 transition"
        >
          {category.name}
        </Link>
      ) : null}
      {category.subCategories.length > 0 && show !== "main" ? (
        <SubCategoryList
          category={category.name}
          show={show}
          subCategories={category.subCategories}
        />
      ) : null}
    </li>
  );
}

export default CategoryItem;
