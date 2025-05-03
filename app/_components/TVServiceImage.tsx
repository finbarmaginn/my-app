"use client";
import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";

export default function TVServiceImage({
  service,
}: {
  service: {
    name: string;
    url: string;
    img: string;
    size: { w: number; h: number };
  };
}) {
  const [imgLoading, setImgLoading] = useState(true);
  return (
    <>
      <Image
        className={classNames(imgLoading && "animate-pulse blur-md", "mx-auto")}
        src={service.img}
        alt={service.name}
        width={service.size.w}
        height={service.size.h}
        unoptimized
        priority
        onLoad={() => {
          setImgLoading(false);
        }}
      />
    </>
  );
}
