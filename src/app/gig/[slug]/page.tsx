"use client";

import { NextPageProps } from "@/types/components";
import { NextPage } from "next";
import useGig from "@/hooks/useGig";
import { GigDoc } from "@/types/gig";
import { useState, useEffect } from "react";

export default async function Gig({ params }: NextPageProps<{ slug: string }>) {
  const { getGigBySlug } = useGig();

  const [gigData, setGig] = useState<GigDoc | null>();

  useEffect(() => {
    const fetchGig = async () => {
      const gig = await getGigBySlug(params.slug);
      setGig(gig);
      console.log(gig, "gig");
    };

    fetchGig();
  }, [getGigBySlug, params]);

  return <div>Slug: {gigData?.category}</div>;
}
