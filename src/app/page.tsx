import GigSection from "@/components/Gig/GigSection";
import { getDocs } from "firebase/firestore";
import { gigQuery } from "@/firebase/queries";
import { GigDoc } from "@/types/gig";

async function Home() {
  const querySnapshot = await getDocs(gigQuery);

  const gigs = querySnapshot.docs.map(doc => doc.data() as GigDoc);

  return (
    <main className="px-4 lg:px-8 max-w-screen-xl mx-auto py-12">
      {gigs && gigs.length > 0 ? <GigSection title="Gigs" gigs={gigs} /> : null}
    </main>
  );
}

export default Home;
