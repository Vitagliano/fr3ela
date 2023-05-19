"use client";

import Link from "next/link";

const submenuNav = [
  { title: "Overview", path: "/" },
  { title: "Integration", path: "/" },
  { title: "Billing", path: "/" },
  { title: "Transactions", path: "/" },
  { title: "Plans", path: "/" },
];

const submenuItems = submenuNav.map((item, idx) => (
  <li
    key={idx}
    className={`py-1 ${idx === 0 ? "border-b-2 border-indigo-600" : ""}`}
  >
    <Link
      href={item.path}
      className="block py-2 px-3 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 duration-150"
    >
      {item.title}
    </Link>
  </li>
));

export const Subnav = () => {
  return (
    <ul className="flex items-center gap-x-3 max-w-screen-xl mx-auto px-4 overflow-x-auto lg:px-8">
      {submenuItems}
    </ul>
  );
};

export default Subnav;
