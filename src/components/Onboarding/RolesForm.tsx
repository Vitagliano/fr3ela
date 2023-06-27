"use client";
import { Button } from "@/components/Button";
import { useMultistepForm } from "@/context/Form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import clsx from "clsx";
import Field from "../Form/Field";

const Roles = [
  {
    name: "freelancer",
    description: "Start selling your services to the web3 world."
  },
  {
    name: "buyer",
    description: "Need a service? You will find right here."
  }
];

const schema = z.object({
  roles: z
    .string({ invalid_type_error: "Please select a role." })
    .refine(val => Roles.map(role => role.name).includes(val))
});

type RoleSchema = z.infer<typeof schema>;

const resolver = zodResolver(schema);

function RolesForm() {
  const { next } = useMultistepForm<RoleSchema>();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<RoleSchema>({ resolver });

  const role = watch("roles");

  const onSubmit = (data: RoleSchema) => next(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 card mx-auto max-w-xl w-full"
    >
      {Roles.map((item, idx) => (
        <label
          key={idx}
          htmlFor={item.name}
          className={clsx(
            "flex gap-6 ring-blue-600 duration-200 relative w-full p-5 cursor-pointer rounded-lg border bg-white shadow-sm",
            item.name === role && "ring-2"
          )}
        >
          <Field
            name="roles"
            type="radio"
            control={control}
            value={item.name}
            id={item.name}
            disabled={isSubmitting}
          />
          <div>
            <h3 className="leading-none text-gray-800 font-medium capitalize">
              {item.name}
            </h3>
            <p className="mt-1 text-sm text-gray-600">{item.description}</p>
          </div>
        </label>
      ))}
      {errors.roles?.message ? <p>{errors.roles?.message}</p> : null}
      <Button
        type="submit"
        variant="hover-outline"
        className="inline-block shrink-0 rounded-md text-sm font-medium text-white transitiom"
      >
        Next
      </Button>
    </form>
  );
}

export default RolesForm;
