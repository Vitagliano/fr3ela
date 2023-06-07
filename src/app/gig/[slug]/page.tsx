import { gigQuery } from "@/firebase/queries";
import { NextPageProps } from "@/types/components";
import { GigDoc } from "@/types/gig";
import { getDocs, query, where } from "firebase/firestore";

// fetch with react server components with static page generation and cache optimization
// Speed goes brrrrr
export default async function Gig({ params }: NextPageProps<{ slug: string }>) {
  const gigSnapshot = query(gigQuery, where("slug", "==", params.slug));

  const querySnapshot = await getDocs(gigSnapshot);

  if (querySnapshot.empty)
    // Handle possible not found
    return <h1>404</h1>;

  const gigData = querySnapshot.docs[0].data() as GigDoc;

  return <div>Slug: {gigData.category}</div>;
}

// Generate static pages for performance boost
export async function generateStaticParams() {
  const gigSnapshot = query(gigQuery);

  const querySnapshot = await getDocs(gigSnapshot);

  return querySnapshot.docs.map(doc => ({
    slug: doc.data().slug
  }));
}
