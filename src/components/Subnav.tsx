"use client";
import categories from "@/util/categories";
import Link from "next/link";

const topicsItems = (topics: any) => {
  console.log(topics);
  const { name, subCategories } = topics;

  return (
    <div
      id="mega-menu-full-dropdown"
      className="mt-1 border-gray-200 shadow-sm bg-gray-50 md:bg-white border-y dark:bg-gray-800 dark:border-gray-600"
    >
      <div className="grid max-w-screen-xl px-4 py-5 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:px-6">
        <ul>
          <li>
            <div className="font-semibold">{name}</div>
            {subCategories[0]}
          </li>
        </ul>
      </div>
    </div>
  );
};

const categoryItems = categories.map((item, idx) => {
  const category = categories.find(category => category.name === item.name);

  if (category) {
    const topics = category.topics;
    // console.log(category); // "Graphics & Design"
    // console.log(topics); // [{ name: "Logo & Brand Identity", subCategories: [...] }, { name: "Art & Illustration", subCategories: [...] }]

    return (
      <li
        key={idx}
        className={`py-1 ${idx === 0 ? "border-b-2 border-blue-600" : ""}`}
      >
        <p className="block py-2 px-3 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 duration-150">
          {item.name}
        </p>

        {/* {topicsItems(topics)} */}
      </li>
    );
  }
});

export const Subnav = () => {
  return (
    <ul className="flex items-center gap-x-3 max-w-screen-xl mx-auto px-4 overflow-x-auto lg:px-8">
      {categoryItems}
    </ul>
  );
};

export default Subnav;
