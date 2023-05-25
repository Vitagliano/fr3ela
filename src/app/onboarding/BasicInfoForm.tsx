"use client";
import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { useMultistepForm } from "@/context/Form";
import Link from "next/link";

function BasicInfoForm() {
  const { next } = useMultistepForm<{ name: string }>();

  return (
    <div className="mt-8 grid grid-cols-6 gap-5 lg:gap-6 dark:text-inherit">
      <div className="col-span-6 sm:col-span-3">
        <Input
          type="text"
          label="First Name"
          id="FirstName"
          name="first_name"
          className="input"
          sizing="sm"
          autoFocus
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <Input
          type="text"
          label="Last Name"
          id="LastName"
          name="last_name"
          className="input"
          sizing="sm"
        />
      </div>

      <div className="col-span-6">
        <Input
          type="email"
          label="Email"
          id="Email"
          name="email"
          className="input"
          sizing="sm"
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <Input
          type="password"
          label="Password"
          id="Password"
          name="password"
          className="input"
          sizing="sm"
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <Input
          type="password"
          label="Password Confirmation"
          id="PasswordConfirmation"
          name="password_confirmation"
          className="input"
          sizing="sm"
        />
      </div>

      <div className="col-span-6">
        <label htmlFor="MarketingAccept" className="flex gap-4">
          <input
            type="checkbox"
            id="MarketingAccept"
            name="marketing_accept"
            className="h-5 w-5 rounded-md hover:cursor-pointer shadow-sm"
          />

          <span className="text-sm">
            I want to receive emails about events, product updates and company
            announcements.
          </span>
        </label>
      </div>

      <div className="col-span-6">
        <p className="caption">
          By creating an account, you agree to our&nbsp;
          <Link href="#" className="link">
            terms and conditions
          </Link>
          &nbsp;and&nbsp;
          <Link href="#" className="link">
            privacy policy
          </Link>
          .
        </p>
      </div>

      <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
        <Button
          onClick={() => next({ name: "John Doe" })}
          variant="hover-outline"
          className="inline-block shrink-0 rounded-md text-sm font-medium text-white transitio"
        >
          Create an account
        </Button>

        <p className="mt-4 caption sm:mt-0">
          Already have an account?&nbsp;
          <Link href="#" className="link">
            Log in
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default BasicInfoForm;
