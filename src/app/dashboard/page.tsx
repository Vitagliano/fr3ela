"use client";
import { useAuth } from "@/context/Auth";
import { useGetUserDoc } from "@/hooks/useGetUser";

export default function Dashboard() {
  const { user } = useAuth();
  const userData = useGetUserDoc(user?.uid);
  console.log(userData, "userData");

  return (
    <div className="px-4 lg:px-8 max-w-screen-xl mx-auto bg-red-500 py-12">
      <h3> Dashboard </h3>
      <p> {user ? "Hello " + user.displayName : ""} </p>
      <p> {user ? user.metadata.creationTime : ""}</p>
      {userData && <p>Seller: {userData.roles.seller ? "sim " : "não"}</p>}
      <main className="grid sm:grid-cols-1 sm:gap-0 lg:grid-cols-3 lg:gap-4">
        <div className="gap-4 grid sm:mb-4 lg:mb-0 col-span-1">
          <div className="lg:h-48 border-indigo-700 border-dashed border-2 rounded-lg justify-center items-center flex sm:h-32">
            a
          </div>
          <div className="lg:h-48 border-indigo-700 border-dashed border-2 rounded-lg justify-center items-center flex sm:h-32">
            a
          </div>
          <div className="lg:h-48 border-indigo-700 border-dashed border-2 rounded-lg justify-center items-center flex sm:h-32">
            a
          </div>
          <div className="lg:h-48 border-indigo-700 border-dashed border-2 rounded-lg justify-center items-center flex sm:h-32">
            a
          </div>
        </div>
        <div className="sm:flex grid flex-col gap-4 col-span-2">
          <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-indigo-700 h-64 sm:h-32">
            b
          </div>
          <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-indigo-700 h-64 sm:h-32">
            b
          </div>
          <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-indigo-700 h-64 sm:h-32">
            b
          </div>
          <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-indigo-700 h-64 sm:h-32">
            b
          </div>
          <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-indigo-700 h-64 sm:h-32">
            b
          </div>
        </div>
      </main>
    </div>
  );
}
