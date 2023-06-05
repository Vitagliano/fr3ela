"use client";

import { NextPageProps } from "@/types/components";
import { NextPage } from "next";

export default function Gig({ params }: NextPageProps<{ id: string }>) {
  return <div>ID: {params.id}</div>;
}
