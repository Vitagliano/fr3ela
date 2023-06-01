"use client";
import Input from "@/components/Input";
import { useAuth } from "@/context/Auth";
import { useGetUserDoc } from "@/hooks/useGetUser";

export default function NewService() {
  const { user } = useAuth();
  const userData = useGetUserDoc(user?.uid);
  console.log(userData, "userData");

  return (
    <div className="px-4 lg:px-8 max-w-screen-xl mx-auto bg-red-500 py-12">
      teste
      <Input placeholder="teste"/>
    </div>
  );
}
