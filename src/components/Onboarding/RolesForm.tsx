"use client";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { useMultistepForm } from "@/context/Form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Input from "@/components/Input";

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
  const { next, prev, step } = useMultistepForm<{ roles: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RoleSchema>({ resolver });

  const onSubmit = (data: RoleSchema) => next(data);

  return (
    <Card className="w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <ul className="flex flex-col gap-4">
          {Roles.map((item, idx) => (
            <li key={idx}>
              <label htmlFor={item.name} className="block relative">
                <Input
                  id={item.name}
                  type="radio"
                  value={item.name}
                  {...register("roles", { required: true })}
                  className="sr-only peer"
                  disabled={isSubmitting}
                />
                <div className="w-full p-5 cursor-pointer rounded-lg border bg-white shadow-sm ring-blue-600 peer-checked:ring-2 duration-200">
                  <div className="pl-7">
                    <h3 className="leading-none text-gray-800 font-medium capitalize">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
                <span className="block absolute top-5 left-5 border peer-checked:border-[5px] border-gray-400 peer-checked:border-blue-600 w-4 h-4 rounded-full"></span>
              </label>
            </li>
          ))}
          {errors.roles?.message ? <p>{errors.roles?.message}</p> : null}
        </ul>

        <div>
          {step !== 0 ? (
            <Button
              onClick={() => prev()}
              variant="hover-outline"
              className="text-sm"
            >
              Go Back
            </Button>
          ) : null}
          <Button
            type="submit"
            variant="hover-outline"
            className="inline-block shrink-0 rounded-md text-sm font-medium text-white transitiom"
          >
            Next
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default RolesForm;
