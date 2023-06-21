import { Button } from "@/components/Button";
import { NextPageProps } from "@/types/components";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import CategoryFilter from "./CategoryFilter";
import CategoryList from "./CategoryList";
import "./styles.css";
import Link from "next/link";

export type ManageCategoriesSearch = {
  name: string;
  show: "all" | "main" | "sub";
};
export type ManageCategoriesProps = NextPageProps<{}, ManageCategoriesSearch>;

function ManageCategories({ searchParams }: ManageCategoriesProps) {
  return (
    <>
      <div id="categories-action-bar" className="grid grid-cols-12 gap-4">
        <CategoryFilter search={searchParams} />
        <Link
          href="dashboard/admin/category/new"
          className="col-start-11 col-end-13 bg-indigo-600 text-white rounded-md py-2 px-2 text-center"
        >
          New Category
        </Link>
      </div>
      {/* @ts-expect-error */}
      <CategoryList search={searchParams} />
    </>
  );
}

export default ManageCategories;
