import { GigDoc } from "@/types/gig";
import GigCard from "./GigCard";

interface Props {
  title: string;
  gigs: GigDoc[];
}

const GigSection = ({ title, gigs }: Props) => {
  return (
    <section className="">
      <h2>{title}</h2>
      <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {gigs.map(gig => (
          <>
            {/* Usando server components com async functions voce pode precisar disso */}
            {/* @ts-expect-error Server Component */}
            <GigCard key={gig.title} gig={gig} />
          </>
        ))}
      </div>
    </section>
  );
};

export default GigSection;
