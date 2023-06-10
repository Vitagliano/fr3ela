import { gigQuery } from "@/firebase/queries";
import { NextPageProps } from "@/types/components";
import { GigDoc } from "@/types/gig";
import { getDocs, query, where } from "firebase/firestore";
import Image from "next/image";

// fetch with react server components with static page generation and cache optimization
// Speed goes brrrrr
export default async function Gig({ params }: NextPageProps<{ slug: string }>) {
  const gigSnapshot = query(gigQuery, where("slug", "==", params.slug));

  const querySnapshot = await getDocs(gigSnapshot);

  if (querySnapshot.empty)
    // Handle possible not found
    return <h1>404</h1>;

  const gigData = querySnapshot.docs[0].data() as GigDoc;

  return (
    <main className="px-4 lg:px-8 max-w-screen-xl mx-auto py-12">
      <div className="grid sm:grid-cols-1 sm:gap-0 lg:grid-cols-2 lg:gap-4">
        <div>
          <div>Title: {gigData.title}</div>
          <div>Category: {gigData.category}</div>
          <div>Slug: {gigData.slug}</div>
          <div>Description: {gigData.description}</div>
          <Image
            src={gigData.images[0]}
            alt={gigData.title}
            width={300}
            height={300}
          />
        </div>
        <div className="bg-red-500">aa</div>
      </div>
    </main>
  );
}

// Generate static pages for performance boost
export async function generateStaticParams() {
  const gigSnapshot = query(gigQuery);

  const querySnapshot = await getDocs(gigSnapshot);

  return querySnapshot.docs.map(doc => ({
    slug: doc.data().slug
  }));
}
