"use client";

import Heading from "@/components/Heading/Heading";
import NcPlayIcon from "@/components/NcPlayIcon/NcPlayIcon";
import NcPlayIcon2 from "@/components/NcPlayIcon2/NcPlayIcon2";
import React, { FC, Fragment, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import isSafariBrowser from "@/utils/isSafariBrowser";
import Image from "next/image";
import Card12 from "../Card12/Card12";
import Card13 from "../Card13/Card13";
import { PostDataType } from "@/data/types";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import ButtonPrimary from "../Button/ButtonPrimary";

export interface FeaturedPostProps {
  className?: string;
  posts: PostDataType[];
  showMore?: boolean;
  getData?: any;
  loader?: any;
}

const FeaturedPost: FC<FeaturedPostProps> = ({
  className = "",
  posts = [],
  showMore,
  getData,
  loader
}) => {

  return (
    <div className={`nc-SectionVideos ${className}`}>
      <Heading desc={""} isCenter>
        Breaking News
      </Heading>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-7">
        {posts[0] && (
          <Card12 isPost={true} post={posts[0]} />
        )}
        <div className="flex flex-col gap-5 md:gap-7">
          {posts
            .filter((_, i) => i < 4 && i > 0)
            .map((item, index) => (
              <Card13 className="flex-1" key={index} isPost={true} post={item} />
            ))}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8 mt-5">
        {
          posts
            .filter((_, i) => i > 3)
            .map((item, index) => (
              <Card12 isPost={true} key={index} post={item} />
            ))
        }
      </div>
      {
        showMore ? (
          <div className="relative w-full flex mt-10 justify-center items-center">
            <ButtonPrimary loading={loader} onClick={getData}>Show more</ButtonPrimary>
          </div>
          // <div
          //   className={`nc-CardAuthor relative mt-4 w-full bg-neutral-300 hover:bg-neutral-300 border flex items-center cursor-pointer`}
          // >
          //   <h2
          //   className={`!text-sm p-4 w-full flex justify-center !text-center sm:text-base text-neutral-900 dark:text-neutral-900 font-medium sm:font-semibold`}
          //   >
          //   Load more
          //   <ChevronDownIcon className="w-5 h-5 ml-1 text-black" />
          //   </h2>
          // </div>
        ) : <></>
      }
    </div>
  );
};

export default FeaturedPost;
