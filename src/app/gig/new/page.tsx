"use client";
import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { useAuth } from "@/context/Auth";
import { storage } from "@/firebase";
import { useGetUserDoc } from "@/hooks/useGetUser";
import useGig from "@/hooks/useGig";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useForm } from "react-hook-form";
import { z } from "zod";

// use number separators for readability
const MAX_FILE_SIZE = 5_000_000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp"
];

const schema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(10).max(500),
  category: z.string().min(3).max(50),
  images: z
    .any()
    .refine(files => files?.length === 1, "Image is required.")
    .refine(files => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      files => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    )
});

type FormData = z.infer<typeof schema>;

export default function NewGig() {
  const { user } = useAuth();
  const userData = useGetUserDoc(user?.uid);

  const { createGig } = useGig();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    console.log("data", data);
    const { title, description, category, images } = data;
    const imagesArray: File[] = Array.from(images);
    await createGig(
      {
        title,
        description,
        category,
        images: []
      },
      imagesArray
    );
  };

  // refactoring needed
  return (
    <div className="px-4 lg:px-8 max-w-screen-xl mx-auto py-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="lg:gap-6 gap-4 grid grid-cols-2">
          <div>
            <label
              htmlFor="title"
              className="text-gray-600 font-medium text-sm leading-5 block mb-2"
            >
              Title
            </label>
            <Input
              type="text"
              {...register("title")}
              className="px-3 py-2 text-gray-500 bg-white outline-none border focus:border-blue-600 shadow-sm rounded-lg w-full"
              placeholder="Give your gig a title"
              required
            />
            {errors.title && <span>{errors.title.message}</span>}

            <label
              htmlFor="description"
              className="text-gray-600 font-medium text-sm leading-5 block mb-2"
            >
              Description
            </label>
            <Input
              {...register("description")}
              className="px-3 py-2 text-gray-500 bg-white outline-none border focus:border-blue-600 shadow-sm rounded-lg w-full"
              placeholder="Give your gig a description"
              required
            />
            {errors.description && <span>{errors.description.message}</span>}

            <label
              htmlFor="category"
              className="text-gray-600 font-medium text-sm leading-5 block mb-2"
            >
              Category
            </label>
            <select
              {...register("category")}
              className="px-3 py-2 rounded-lg w-full block text-gray-500 bg-white outline-none border focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option defaultValue="Select category">Select category</option>
              <option value="Design">Design</option>
              <option value="Development">Development</option>
              <option value="Art">Art</option>
              <option value="Other">Other</option>
            </select>
            {errors.category && <span>{errors.category.message}</span>}

            <label
              htmlFor="images"
              className="text-gray-600 font-medium text-sm leading-5 block mb-2"
            >
              Images
            </label>
            <input type="file" multiple {...register("images")} />

            {
              //TODO: typecheck errors.images.message correctly
            }

            {errors.images && <span>{errors.images.message as string}</span>}

            <Button type="submit" className="mt-4">
              Create Gig
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
