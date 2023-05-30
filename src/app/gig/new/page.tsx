"use client";
import Input from "@/components/Input";
import { useAuth } from "@/context/Auth";
import { useGetUserDoc } from "@/hooks/useGetUser";
import { createGigDoc } from "@/util/gig";

export default function NewGig() {
  const { user } = useAuth();
  const userData = useGetUserDoc(user?.uid);
  console.log(userData, "userData");

  return (
    <div className="px-4 lg:px-8 max-w-screen-xl mx-auto py-12">
      <form action="">
        <div id="create-product-accordion-collapse" data-accordion="collapse">
          <div
            id="create-product-accordion-collapse-body-1"
            className=""
            aria-labelledby="create-product-accordion-collapse-heading-1"
          >
            <div className="">
              <div className="lg:gap-6 gap-4 grid grid-cols-2">
                <div className="">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-gray-600 font-medium text-sm leading-5 block mb-2"
                    >
                      Product Name
                    </label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      className="w-full"
                      placeholder="Type product name"
                      required
                    />
                  </div>
                  <div className="flex gap-6">
                    <div className="w-full">
                      <label
                        htmlFor="brand"
                        className="text-gray-600 font-medium text-sm leading-5 block mb-2"
                      >
                        Brand
                      </label>
                      <Input
                        type="text"
                        name="brand"
                        id="brand"
                        className="w-full"
                        placeholder="Product brand"
                        required
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="price"
                        className="text-gray-600 font-medium text-sm leading-5 block mb-2"
                      >
                        Price
                      </label>
                      <Input
                        type="number"
                        name="price"
                        id="price"
                        className="w-full"
                        placeholder="$2999"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-full">
                      <label
                        htmlFor="category"
                        className="text-gray-600 font-medium text-sm leading-5 block mb-2"
                      >
                        Category
                      </label>
                      <select
                        id="category"
                        className="px-3 py-2 rounded-lg w-full block text-gray-500 bg-white outline-none border focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      >
                        <option selected>Select category</option>
                        <option value="TV">TV/Monitors</option>
                        <option value="PC">PC</option>
                        <option value="GA">Gaming/Console</option>
                        <option value="PH">Phones</option>
                      </select>
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="return-policy"
                        className="text-gray-600 font-medium text-sm leading-5 block mb-2"
                      >
                        Return Policy
                      </label>
                      <select
                        id="return-policy"
                        className="px-3 py-2 rounded-lg w-full block text-gray-500 bg-white outline-none border focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      >
                        <option selected>30 days</option>
                        <option value="10">10 days</option>
                        <option value="NO">None</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="text-gray-600 font-medium text-sm leading-5 block mb-2"
                    >
                      Description
                    </label>
                    <div className="border rounded-lg w-full mb-4 bg-white">
                      <div className="pl-3 pr-3 pb-2 pt-2 border-b justify-between items-center flex">
                        <div className="flex flex-wrap items-center">
                          <div className="pr-4 flex items-center">
                            <button
                              type="button"
                              className="cursor-pointer p-2 bg-transparent hover:bg-gray-100 rounded-lg"
                            >
                              <svg
                                aria-hidden="true"
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                              <span className="border-0 h-px -m-px overflow-hidden p-0 absolute whitespace-no-wrap">
                                Attach file
                              </span>
                            </button>
                            <button
                              type="button"
                              className="cursor-pointer p-2 bg-transparent hover:bg-gray-100 rounded-lg"
                            >
                              <svg
                                aria-hidden="true"
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                              <span className="border-0 h-px -m-px overflow-hidden p-0 absolute whitespace-no-wrap w-px">
                                Embed map
                              </span>
                            </button>
                            <button
                              type="button"
                              className="cursor-pointer p-2 bg-transparent hover:bg-gray-100 rounded-lg"
                            >
                              <svg
                                aria-hidden="true"
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                              <span className="border-0 h-px -m-px overflow-hidden p-0 absolute whitespace-no-wrap w-px">
                                Upload image
                              </span>
                            </button>
                            <button
                              type="button"
                              className="cursor-pointer p-2 bg-transparent hover:bg-gray-100 rounded-lg"
                            >
                              <svg
                                aria-hidden="true"
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                              <span className="border-0 h-px -m-px overflow-hidden p-0 absolute whitespace-no-wrap w-px">
                                Format code
                              </span>
                            </button>
                            <button
                              type="button"
                              className="cursor-pointer p-2 bg-transparent hover:bg-gray-100 rounded-lg"
                            >
                              <svg
                                aria-hidden="true"
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                              <span className="border-0 h-px -m-px overflow-hidden p-0 absolute whitespace-no-wrap w-px">
                                Add emoji
                              </span>
                            </button>
                          </div>
                          <div className="pl-4 lg:flex items-center flex-wrap sm:hidden">
                            <button
                              type="button"
                              className="cursor-pointer p-2 bg-transparent hover:bg-gray-100 rounded-lg"
                            >
                              <svg
                                aria-hidden="true"
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                              <span className="border-0 h-px -m-px overflow-hidden p-0 absolute whitespace-no-wrap w-px">
                                Timeline
                              </span>
                            </button>
                            <button
                              type="button"
                              className="cursor-pointer p-2 bg-transparent hover:bg-gray-100 rounded-lg"
                            >
                              <svg
                                aria-hidden="true"
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                              <span className="border-0 h-px -m-px overflow-hidden p-0 absolute whitespace-no-wrap w-px">
                                Download
                              </span>
                            </button>
                          </div>
                        </div>
                        <button
                          type="button"
                          data-tooltip-target="tooltip-fullscreen"
                          className="cursor-pointer p-2 bg-transparent hover:bg-gray-100 rounded-lg"
                        >
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                          <span className="border-0 h-px -m-px overflow-hidden p-0 absolute whitespace-no-wrap w-px">
                            Full screen
                          </span>
                        </button>
                      </div>
                      <div className="rounded-bl-lg rounded-br-lg px-4 py-2">
                        <textarea
                          id="description"
                          rows={8}
                          className="border-0 block resize-y w-full pl-0 pr-0"
                          placeholder="Write product description here"
                          required
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="FLfl_xS1XCloWU2wRi87 SGqensOKx3gy996_A_ZF">
                  <div>
                    <label
                      htmlFor="dropzone-file"
                      className="ttxtqsLWp2pFRX8yUvWd rD4HtsUG_hahmbh2Kj09 MxG1ClE4KPrIvlL5_Q5x _A6LflweZRUwrcL6M2Tk g3OYBOqwXUEW4dRGogkH a0Ed69aMSu0vgf4oysz0"
                    >
                      Product Images
                    </label>
                    <div className="w-full items-center flex justify-center">
                      <label
                        htmlFor="dropzone-file"
                        className="bg-white border rounded-lg justify-center items-center flex-col cursor-pointer w-full h-64 flex"
                      >
                        <div className="pb-6 pt-5 justify-center items-center flex flex-col">
                          <svg
                            aria-hidden="true"
                            className="w-10 h-10 mb-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                          </svg>
                          <p className="text-sm leading-5 mb-2">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs leading-4 mb-4">
                            Max. File Size: 30MB
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
