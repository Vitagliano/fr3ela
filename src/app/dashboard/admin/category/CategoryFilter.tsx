"use client";
import { Button } from "@/components/Button";
import { CategoryShow } from "@/types/category";
import { SelectHandler, TextHandler } from "@/types/events";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export type CategoryFilterProps = {
  search: {
    name: string;
    show: CategoryShow;
  };
};

function CategoryFilter({ search }: CategoryFilterProps) {
  const { push } = useRouter();

  const [name, setName] = useState(search.name);
  const [show, setShow] = useState(search.show);

  const onChangeName: TextHandler = e => setName(e.currentTarget.value);
  const onChangeShow: SelectHandler = e =>
    setShow(e.currentTarget.value as CategoryShow);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const params = new URLSearchParams({ name, show });

    push(`dashboard/admin/category?${params.toString()}`);
  }

  function onClear() {
    setName("");
    setShow("all");
    push("dashboard/admin/category");
  }

  return (
    <form className="contents" onSubmit={onSubmit}>
      <input
        name="name"
        id="name"
        className="col-span-4 border border-gray-300 rounded-md py-1 px-2"
        type="text"
        placeholder="Search"
        onChange={onChangeName}
        value={name}
      />

      <select
        name="show"
        id="show"
        className="col-span-2 border border-gray-300 rounded-md"
        onChange={onChangeShow}
        value={show}
      >
        <option value="all">Show All</option>
        <option value="main">Show Only Main</option>
        <option value="sub">Show Only Sub</option>
      </select>

      <Button className="col-start-9 col-end-11" type="submit">
        Filter
      </Button>
      <Button
        className="col-start-11 col-end-13"
        variant="secondary"
        type="reset"
        onClick={onClear}
      >
        Clear
      </Button>
    </form>
  );
}

export default CategoryFilter;
