"use client";
import { useAuth } from "@/context/Auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const { replace } = useRouter();

  useEffect(() => {
    if (!loading && !user) replace("/signin");
  }, [user, loading, replace]);

  if (loading) return <div>Loading...</div>;

  if (!user) return null;

  return <>{children}</>;
};

export default PrivateRoute;
