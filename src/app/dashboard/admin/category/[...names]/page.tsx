"use client";
import { Button } from "@/components/Button";
import { useGetCategory } from "@/hooks/useGetCategory";
import { NextPageProps } from "@/types/components";
import Link from "next/link";
import React from "react";

export type CategoryDetailsProps = NextPageProps<{
  names: [string, string | undefined];
}>;

function CategoryDetails({ params }: CategoryDetailsProps) {
  const {
    names: [categoryEnc, subCategoryEnc]
  } = params;

  const catName = decodeURIComponent(categoryEnc);
  const subName = decodeURIComponent(subCategoryEnc || "");

  const isSub = !!subName;

  console.log({ categoryEnc, subCategoryEnc, catName, subName, isSub });

  const category = useGetCategory(catName, "ignore-sub");
  const subCategory = isSub
    ? category?.subCategories?.find(sub => sub.name === subName)
    : void 0;

  const activeName = subName || catName;

  console.log({ category, subCategory });

  const additionalFields =
    (isSub ? subCategory?.additionalFields : category?.additionalFields) ?? [];

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl flex flex-col items-center">
        <div className="w-full">
          <div className="flex items-center">
            <div className="text-lg font-bold">
              {isSub ? (
                <>
                  <Link
                    href={`/dashboard/admin/category/${categoryEnc}`}
                    className="text-gray-500"
                  >
                    {catName}
                  </Link>
                  <span className="mx-2 text-gray-500"> &#10097; </span>
                  <span>{subName}</span>
                </>
              ) : (
                <span>{catName}</span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 w-full max-w-2xl">
          <div className="flex justify-between items-center">
            <div className="text-4xl font-bold">{activeName}</div>

            <div
              id="actions"
              className="max-w-[12rem] grid grid-cols-2 gap-2 mr-5"
            >
              <Button>Edit</Button>
              <Button className="bg-red-500 hover:bg-red-700">Delete</Button>
            </div>
          </div>

          {category ? (
            <>
              <div className="mt-12">
                <div>
                  {additionalFields.length ? (
                    <div className="flex flex-col gap-4">
                      <span className="text-2xl font-bold">
                        Additional Fields
                      </span>

                      <div className="flex flex-col gap-2">
                        {additionalFields.map((field, i) => (
                          <div
                            key={`${field.label}-${i}`}
                            className="card py-3 flex justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-lg">
                                {field.label}
                              </span>
                              -<span>{field.type}</span>
                            </div>

                            <div className="max-w-[12rem] grid grid-cols-2 gap-2">
                              <Button>Edit</Button>
                              <Button className="bg-red-500 hover:bg-red-700">
                                Delete
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="mt-12">
                {isSub ? null : (
                  <div className="flex flex-col gap-4">
                    <span className="text-2xl font-bold">Sub Categories</span>

                    <div className="flex flex-col gap-2">
                      {category?.subCategories?.map(sub => (
                        <div
                          key={sub.name}
                          className="card py-3 flex justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <Link
                              className="font-bold text-lg"
                              href={`/dashboard/admin/category/${categoryEnc}/${encodeURIComponent(
                                sub.name
                              )}`}
                            >
                              {sub.name}
                            </Link>
                          </div>

                          <div className="max-w-[12rem] grid grid-cols-2 gap-2">
                            <Button>Edit</Button>
                            <Button className="bg-red-500 hover:bg-red-700">
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryDetails;
