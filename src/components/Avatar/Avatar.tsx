"use client";

import { avatarColors } from "@/contains/contants";
import { _getAvatarRd } from "@/contains/fakeData";
import Image, { StaticImageData } from "next/image";
import React, { FC, useEffect, useState } from "react";
import DefaultAvatar from "../../images/Icons/avatar.png";

export interface AvatarProps {
  containerClassName?: string;
  sizeClass?: string;
  radius?: string;
  imgUrl?: any | StaticImageData;
  userName?: string;
}

const _setBgColor = (name: string) => {
  const backgroundIndex = Math.floor(name.charCodeAt(0) % avatarColors.length);
  return avatarColors[backgroundIndex];
};

const Avatar: FC<AvatarProps> = ({
  containerClassName = "ring-1 ring-white dark:ring-neutral-900",
  sizeClass = "h-6 w-6 text-sm",
  radius = "rounded-full",
  imgUrl = "",
  userName,
}) => {
  const name = userName || "John Doe";

  const [url, setUrl]: any = useState(imgUrl);

  useEffect(() => {
    // FOR DEMO
    // if (!url) {
    //   setUrl(_getAvatarRd());
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner ${radius} ${sizeClass} ${containerClassName}`}
    // style={{ backgroundColor: url ? undefined : _setBgColor(name) }}
    >
      {/* {url && url.toString().includes("amazonaws.com") ? (
        <Image
          fill
          onError={(e) => setUrl(DefaultAvatar)}
          sizes="100px"
          className="absolute inset-0 w-full h-full object-cover"
          src={url}
          alt={name}
        />
      ) : ( */}
      <Image
        fill
        sizes="100px"
        onError={(e) => setUrl(DefaultAvatar)}
        className="absolute inset-0 w-full h-full object-cover"
        src={url}
        alt=""
      />
      {/* )} */}
      {/* <span className="wil-avatar__name">{name}</span> */}
    </div>
  );
};

export default Avatar;
