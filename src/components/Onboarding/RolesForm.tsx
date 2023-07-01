"use client";
import { Button } from "@/components/Button";
import { useMultistepForm } from "@/context/Form";

import { zodResolver } from "@hookform/resolvers/zod";
<<<<<<< HEAD
import { useForm } from "react-hook-form";
=======
>>>>>>> 74111546c3e62f9bddcf9e17a8828e24d82057f8
import * as z from "zod";

import clsx from "clsx";
import { createForm } from "../Form";

import { UserRoles } from "@/types/user";

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
    .string({ required_error: "Please select a role." })
    .refine(val => Roles.map(role => role.name).includes(val))
});

type RoleSchema = z.infer<typeof schema>;

const { Form, Field, ErrorMessage } = createForm<RoleSchema>({
  resolver: zodResolver(schema)
});

function RolesForm() {
  const { next } = useMultistepForm<RoleSchema>();

  return (
    <Form
      onSubmit={next}
      className="flex flex-col gap-6 card mx-auto max-w-xl w-full"
    >
      {Roles.map((item, idx) => (
        <label
          key={idx}
          htmlFor={item.name}
          className="flex gap-6 ring-blue-600 duration-200 relative w-full p-5 cursor-pointer rounded-lg border bg-white shadow-sm"
        >
          <Field id={item.name} name="roles" type="radio" value={item.name} />
          <div>
            <h3 className="leading-none text-gray-800 font-medium capitalize">
              {item.name}
            </h3>
            <p className="mt-1 text-sm text-gray-600">{item.description}</p>
          </div>
        </label>
      ))}
      <ErrorMessage name="roles" />
      <Button
        type="submit"
        variant="hover-outline"
        className="inline-block shrink-0 rounded-md text-sm font-medium text-white transitiom"
      >
        Next
      </Button>
    </Form>
  );
}

export default RolesForm;
