import { GigDoc } from "@/types/gig";
import { Card } from "../Card";
import Link from "next/link";
import Image from "next/image";
import { useGetUserDoc } from "@/hooks/useGetUser";
import { useAuth } from "@/context/Auth";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { StarIcon } from "@heroicons/react/24/solid";

interface GigCardProps {
  gig: GigDoc;
}

const GigCard = ({ gig }: GigCardProps) => {
  const userData = useGetUserDoc(gig.userId);
  const username = userData?.username || "Unknown User";

  return (
    <Card
      key={gig.title}
      imgSrc={gig.images[0]}
      imgAlt={gig.title}
      imgUrl={`/gig/` + gig.slug}
    >
      <div className="flex gap-2 flex-col">
        <div className="flex gap-0 flex-col">
          <Link href={`/gig/` + gig.slug}>
            <small className="text-gray-500">{gig.category}</small>
          </Link>
          <Link href={`/gig/` + gig.slug}>
            <h2 className="text-lg font-medium">{gig.title}</h2>
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          <StarIcon className="w-4 h-4 text-yellow-400" />
          <span className="flex gap-1 items-center">
            <strong>5.0</strong>
            <small>(5 reviews)</small>
          </span>
        </div>
      </div>
      <hr className="my-2" />
      <div>
        <div className="flex gap-2 items-center">
          <Jazzicon diameter={24} seed={0x12012012012} />
          <span className="text-sm">{username}</span>
        </div>
      </div>
    </Card>
  );
};

export default GigCard;
