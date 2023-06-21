import { SubCategoryDoc } from "@/types/category";
import clsx from "clsx";
import Link from "next/link";

export type SubCategoryListProps = {
  show: "all" | "sub";
  subCategories: SubCategoryDoc[];
  category: string;
};

function SubCategoryList({
  show,
  subCategories,
  category
}: SubCategoryListProps) {
  return (
    <ul className={clsx(show === "sub" ? "list-disc" : "sub-categories-list")}>
      {subCategories.map(sub => (
        <li key={sub.name}>
          <Link
            href={`/dashboard/admin/category/${encodeURIComponent(
              category
            )}/${encodeURIComponent(sub.name)}`}
            className="hover:underline hover:text-indigo-400 transition"
          >
            {sub.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default SubCategoryList;
