import {
  CategoriesQueryShow,
  getCategories
} from "@/firebase/utils";
import { CategoryDoc } from "@/types/category";
import { useEffect, useState } from "react";

export function useGetCategories(
  name: string,
  show: CategoriesQueryShow = "all"
) {
  const [categories, setCategories] = useState<CategoryDoc[]>([]);

  useEffect(() => {
    getCategories({ name, show }).then(setCategories);
  }, [name, show]);

  return categories;
}

export function useGetCategory(
  name: string,
  show: CategoriesQueryShow = "all"
) {
  const [category, setCategory] = useState<CategoryDoc | null>(null);

  useEffect(() => {
    getCategories({ name, show }).then(cats => {
      if (cats.length) setCategory(cats[0]);
      else setCategory(null);
    });
  }, [name, show]);

  return category;
}
