import { CSSProperties, ReactNode } from "react";
import { HTMLAttributes } from "react";
import Link from "next/link";
import Image from "next/image";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
  imgSrc?: string;
  imgAlt?: string;
  imgUrl?: string;
};

const imageStyle: CSSProperties = {
  width: "100%",
  objectFit: "cover"
};

export const Card = ({
  children,
  className = "",
  imgSrc = "",
  imgAlt = "",
  imgUrl = "",
  ...props
}: CardProps) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {imgSrc ? (
        imgUrl ? (
          <Link href={imgUrl} className="h-52 overflow-hidden relative flex">
            <Image
              style={imageStyle}
              width={390}
              height={250}
              className="rounded-t-lg w-full"
              src={imgSrc}
              alt={imgAlt}
            />
          </Link>
        ) : (
          <Image
            style={imageStyle}
            width={390}
            height={250}
            className="rounded-t-lg w-full"
            src={imgSrc}
            alt={imgAlt}
          />
        )
      ) : null}

      <div className="p-5">{children}</div>
    </div>
  );
};
