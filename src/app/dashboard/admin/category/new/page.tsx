"use client";
import { CategoryField } from "@/components/Category";
import { CategoryFieldDoc } from "@/types/field";
import { useState } from "react";

function CreateCategory() {
  const [isSub, setIsSub] = useState(false);
  const [fields, setFields] = useState<Array<CategoryFieldDoc>>([]);

  return (
    <div className="lg:max-w-xl mx-auto">
      <h2 className="text-center text-2xl">
        Create a new {isSub ? "Sub-Category" : "Category"}
      </h2>
      <form className="py-6 px-12 mt-8 flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <label htmlFor="name" className="text-lg">
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 py-1 px-3"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-lg">
            Additional Fields:
          </label>
          {fields.map((field, i) => (
            <CategoryField
              key={i}
              field={field}
              onDelete={() =>
                setFields(p => p.filter((_, index) => index !== i))
              }
              onEdit={edit =>
                setFields(p =>
                  p.map((f, index) => {
                    if (index === i) {
                      return edit;
                    }

                    return f;
                  })
                )
              }
            />
          ))}
        </div>
      </form>
    </div>
  );
}

export default CreateCategory;
