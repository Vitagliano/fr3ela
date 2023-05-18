"use client";
import { useAuth } from "@/context/AuthContext";
import { useGetUserDoc } from "@/hooks/useGetUser";

export default function Onboarding() {
  const { user } = useAuth();
  const userData = useGetUserDoc(user?.uid);
  console.log(userData, "userData");
  return (
    <>
      <form action="#" className="mt-8 grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="FirstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>

          <input
            type="text"
            id="FirstName"
            name="first_name"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="LastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>

          <input
            type="text"
            id="LastName"
            name="last_name"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
          />
        </div>

        <div className="col-span-6">
          <label
            htmlFor="Email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>

          <input
            type="email"
            id="Email"
            name="email"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="Password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>

          <input
            type="password"
            id="Password"
            name="password"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="PasswordConfirmation"
            className="block text-sm font-medium text-gray-700"
          >
            Password Confirmation
          </label>

          <input
            type="password"
            id="PasswordConfirmation"
            name="password_confirmation"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
          />
        </div>

        <div className="col-span-6">
          <label htmlFor="MarketingAccept" className="flex gap-4">
            <input
              type="checkbox"
              id="MarketingAccept"
              name="marketing_accept"
              className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
            />

            <span className="text-sm text-gray-700">
              I want to receive emails about events, product updates and company
              announcements.
            </span>
          </label>
        </div>

        <div className="col-span-6">
          <p className="text-sm text-gray-500">
            By creating an account, you agree to our
            <a href="#" className="text-gray-700 underline">
              terms and conditions
            </a>
            and
            <a href="#" className="text-gray-700 underline">
              privacy policy
            </a>
            .
          </p>
        </div>

        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
            Create an account
          </button>

          <p className="mt-4 text-sm text-gray-500 sm:mt-0">
            Already have an account?
            <a href="#" className="text-gray-700 underline">
              Log in
            </a>
            .
          </p>
        </div>
      </form>
    </>
  );
}
