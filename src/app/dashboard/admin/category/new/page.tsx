"use client";
import { Button } from "@/components/Button";
import { CategoryField } from "@/components/Category";
import { db } from "@/firebase";
import { getCategories } from "@/firebase/utils";
import { CategoryBase, CategoryDoc } from "@/types/category";
import { CategoryFieldDoc } from "@/types/field";
import {
  addDoc,
  collection,
  doc,
  query,
  setDoc,
  updateDoc,
  where
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { FormEvent, useDeferredValue, useEffect, useState } from "react";

function CreateCategory() {
  const [isSub, setIsSub] = useState(false);
  const [name, setName] = useState("");
  const [parentSearch, setParentSearch] = useState("");
  const deferredSearch = useDeferredValue(parentSearch);
  const [parents, setParents] = useState<Array<CategoryDoc>>([]);
  const [parent, setParent] = useState<CategoryDoc | null>(null);
  const [fields, setFields] = useState<Array<CategoryFieldDoc>>([]);
  const [newField, setNewField] = useState<CategoryFieldDoc | null>(null);

  const { push } = useRouter();

  useEffect(() => {
    if (deferredSearch) {
      getCategories({ name: deferredSearch, show: "main" }).then(p =>
        setParents([
          ...p,
          {
            additionalFields: [],
            name: "Stub Category",
            id: "stub",
            subCategories: []
          }
        ])
      );
    } else setParents([]);
  }, [deferredSearch]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("submit");

    const categoryBase: CategoryBase = {
      name,
      additionalFields: fields
    };

    if (isSub) {
      if (parent) {
        parent.subCategories.push(categoryBase);

        const ref = doc(db, "categories", parent.id);

        await updateDoc(ref, {
          subCategories: parent.subCategories
        });

        push("dashboard/admin/category");
      } else {
        console.error("No parent selected");
      }
    } else {
      const ref = collection(db, "categories");

      const parentCategory = {
        ...categoryBase,
        subCategories: []
      };

      await addDoc(ref, parentCategory);
      push("dashboard/admin/category");
    }
  }

  return (
    <div className="lg:max-w-3xl mx-auto">
      <h2 className="text-center text-2xl">
        Create a new {isSub ? "Sub-Category" : "Category"}
      </h2>
      <form
        onSubmit={onSubmit}
        className="py-6 px-12 mt-8 flex flex-col gap-10"
      >
        <div className="flex flex-col gap-4">
          <label htmlFor="name" className="text-lg">
            Name:
          </label>
          <input
            type="text"
            id="name"
            onChange={e => setName(e.target.value)}
            value={name}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 py-1 px-3"
          />
        </div>
        <div className="flex gap-4 items-center">
          <input
            type="checkbox"
            className="h-5 w-5 rounded-md hover:cursor-pointer shadow-sm"
            id="sub"
            checked={isSub}
            onChange={e => setIsSub(e.target.checked)}
          />
          <label htmlFor="sub" className="text-lg">
            Create as Sub-Category
          </label>
        </div>
        {isSub ? (
          // if is sub category then show a parent category dropdown with search functionality

          <div className="flex flex-col gap-4">
            <label htmlFor="parent" className="text-lg">
              Parent Category: {parent ? parent.name : null}
            </label>
            <input
              type="text"
              name="parent"
              id="parent"
              onChange={e => setParentSearch(e.target.value)}
              value={parentSearch}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 py-1 px-3"
            />
            {parents.length ? (
              <ul className="card p-0">
                {parents
                  .filter((_, i) => i < 10)
                  .map((p, i) => (
                    <>
                      <li
                        key={p.name}
                        className="text-lg py-3 px-6 first:pt-4 last:pb-4 hover:bg-zinc-800 cursor-pointer transition-colors first:rounded-t-lg last:rounded-b-lg"
                        onClick={() => {
                          setParentSearch("");
                          setParent(p);
                        }}
                      >
                        {p.name}
                      </li>
                      {i !== parents.length - 1 ? (
                        <hr className="border-gray-300" />
                      ) : null}
                    </>
                  ))}
              </ul>
            ) : null}
          </div>
        ) : null}
        <div className="flex flex-col gap-4">
          <label className="text-lg">Additional Fields:</label>
          {fields.map((field, i) => (
            <CategoryField
              key={i}
              field={field}
              onDelete={() =>
                setFields(p => p.filter((_, index) => index !== i))
              }
              onEdit={edit =>
                setFields(p => p.map((f, idx) => (idx === i ? edit : f)))
              }
            />
          ))}

          {newField ? (
            <CategoryField
              field={newField}
              onCancel={() => setNewField(null)}
              onEdit={edit => {
                setFields(p => [...p, edit]);
                setNewField(null);
              }}
              newField
            />
          ) : null}

          <Button
            disabled={!!newField}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setNewField({ label: "", type: "text" })}
          >
            Add Field
          </Button>
        </div>
        <div className="flex gap-4">
          <Button className="!bg-green-900 hover:!bg-green-800" type="submit">
            Submit
          </Button>
          <Button
            className="!bg-red-900 hover:!bg-red-800"
            onClick={() => push("dashboard/admin/category")}
            type="button"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateCategory;
