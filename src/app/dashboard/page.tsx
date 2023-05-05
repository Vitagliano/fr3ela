"use client"
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <>
      <h3> Dashboard </h3>
      <p> {user ? "Hello " + user.uid : ""} </p>
    </>
  );
}
