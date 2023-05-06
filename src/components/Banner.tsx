"use client";
import React, { ReactNode, useState } from "react";
import { Button } from "./Button";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

type BannerProps = {
  children: ReactNode;
  variant?: "default" | "info" | "error" | "success" | "warn";
  buttonLink?: string;
  bannerText?: string;
  buttonText?: string;
  buttonIcon?: JSX.Element;
  close?: boolean;
};

const variants = {
  default: "!bg-indigo-600",
  info: "!bg-blue-600",
  error: "!bg-red-600",
  success: "!bg-green-600",
  warn: "!bg-orange-600",
};

const Banner: React.FC<BannerProps> = ({
  children,
  variant = "default",
  buttonLink,
  bannerText,
  buttonText,
  buttonIcon,
  close = true,
}) => {
  const [bannerClosed, setBannerClosed] = useState(false);
  const variantClass = variants[variant];

  const handleBannerClose = () => {
    setBannerClosed(true);
  };

  return (
    <>
      {!bannerClosed ? (
        <div className={variantClass}>
          <div className="max-w-screen-xl mx-auto px-4 py-2 flex items-start justify-between text-white sm:items-center md:px-8">
            <div className="flex-1 justify-center flex items-start gap-x-4 sm:items-center">
              <p className="font-medium p-2">{children}</p>
            </div>
            {close && (
              <Button
                onClick={() => handleBannerClose()}
                className={`!p-2 rounded-lg duration-150 ${variantClass} ring-offset-2 focus:ring`}
              >
                <XMarkIcon className="w-6 h-6" />
              </Button>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Banner;
