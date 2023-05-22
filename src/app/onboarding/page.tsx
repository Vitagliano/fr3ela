"use client";
import Input from "@/components/Input";
import { useAuth } from "@/context/Auth";
import { useGetUserDoc } from "@/hooks/useGetUser";
import Link from "next/link";
import "./style.css";

export default function Onboarding() {
  const { user } = useAuth();
  const userData = useGetUserDoc(user?.uid);
  console.log(userData, "userData");
  return (
    <form
      action="#"
      className="mt-8 grid grid-cols-6 gap-6 text-gray-700 dark:text-inherit"
    >
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
            className="h-5 w-5 border-gray-200 bg-white shadow-sm"
          />

          <span className="text-sm">
            I want to receive emails about events, product updates and company
            announcements.
          </span>
        </label>
      </div>

      <div className="col-span-6">
        <p className="text-sm text-gray-500">
          By creating an account, you agree to our&nbsp;
          <Link href="#" className="text-gray-700 underline">
            terms and conditions
          </Link>
          &nbsp;and&nbsp;
          <Link href="#" className="text-gray-700 underline">
            privacy policy
          </Link>
          .
        </p>
      </div>

      <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
        <button className="inline-block shrink-0  border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
          Create an account
        </button>

        <p className="mt-4 text-sm text-gray-500 sm:mt-0">
          Already have an account?
          <Link href="#" className="text-gray-700 underline">
            Log in
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
