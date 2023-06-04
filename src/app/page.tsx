"use client";
import useGig from "@/hooks/useGig";
import GigSection from "@/components/Gig/GigSection";

function Home() {
  const { gigs } = useGig();
  return (
    <main className="px-4 lg:px-8 max-w-screen-xl mx-auto py-12">
      {gigs && gigs.length === 0 && <p>No gigs found</p>}
      {gigs && gigs.length > 0 && <GigSection title="Gigs" gigs={gigs} />}
    </main>
  );
}

export default Home;
