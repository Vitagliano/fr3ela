import { Button } from "@/components/Button";
import { useAuth, useAuthActions } from "@/context/Auth";
import { auth } from "@/firebase";
import { getUserDoc } from "@/firebase/utils";
import { useGetUserDoc } from "@/hooks/useGetUser";

export default async function Dashboard() {
  const user = auth.currentUser;

  if (!user) return null;

  const userDoc = await getUserDoc(user.uid);

  return (
    <div className="px-4 lg:px-8 max-w-screen-xl mx-auto py-12">
      {/* <h3> Dashboard </h3>
      <p> {user ? "Hello " + user.displayName : ""} </p>
      <Button onClick={() => signOut()}>Sair</Button>
      <p> {user ? user.metadata.creationTime : ""}</p>
      {userData && userData.roles.seller ? "sim " : "não"}
      <main className="grid sm:grid-cols-1 sm:gap-0 lg:grid-cols-3 lg:gap-4">
        <div className="gap-4 grid sm:mb-4 lg:mb-0 col-span-1">
          <div className="lg:h-48 border-blue-700 border-dashed border-2 rounded-lg justify-center items-center flex sm:h-32">
            a
          </div>
          <div className="lg:h-48 border-blue-700 border-dashed border-2 rounded-lg justify-center items-center flex sm:h-32">
            a
          </div>
          <div className="lg:h-48 border-blue-700 border-dashed border-2 rounded-lg justify-center items-center flex sm:h-32">
            a
          </div>
          <div className="lg:h-48 border-blue-700 border-dashed border-2 rounded-lg justify-center items-center flex sm:h-32">
            a
          </div>
        </div>
        <div className="sm:flex grid flex-col gap-4 col-span-2">
          <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-blue-700 h-64 sm:h-32">
            b
          </div>
          <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-blue-700 h-64 sm:h-32">
            b
          </div>
          <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-blue-700 h-64 sm:h-32">
            b
          </div>
          <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-blue-700 h-64 sm:h-32">
            b
          </div>
          <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-blue-700 h-64 sm:h-32">
            b
          </div>
        </div> */}
      {/* </main> */}
      <div className="grid sm:grid-cols-1 sm:gap-0 lg:grid-cols-3 lg:gap-4">
        <div className="col-span-2 bg-red-200">a</div>
        <div className="bg-blue-200">b</div>
      </div>
    </div>
  );
}
