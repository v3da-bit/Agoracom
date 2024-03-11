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
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import ButtonPrimary from "../Button/ButtonPrimary";
import DefaultImage from "../../images/default-image.jpg";

export interface VideoType {
  id: string;
  title: string;
  thumbnail: string;
}

export interface SectionVideosProps {
  videos?: any[];
  className?: string;
  pageInfo?: any;
  getData?: any;
  loader?: any;
  heading?: string;
  screen?: string;
}

const SectionVideos: FC<SectionVideosProps> = ({
  videos = [],
  className = "",
  pageInfo = null,
  getData,
  loader,
  heading = "",
  screen = ""
}) => {

  const [isRendered, setIsRendered] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  const renderMainVideo = (video: any) => {
    // const video: any = videos[currentVideo];
    // if(video.video_image?.includes('maxresdefault.jpg')){
    //   video.video_image=video.video_image.replace('maxresdefault.jpg','hqdefault.jpg')
    // }
    // console.log(video.video_image);
    
    const getUrl = (url: any) => {
      if (url.toString().includes("s3.amazonaws.com")||url.toString().includes(".com")) {
        return url;
      } else {
        return DefaultImage;
      }
    }

    return (
      <div
        className="group aspect-w-16 aspect-h-9 sm:aspect-h-9 bg-neutral-800 rounded-3xl overflow-hidden 
        sm:rounded-[20px] sm:z-0"
        title={video.title}
      >
        {isSafariBrowser() ? (
          <Fragment>
            <ReactPlayer
              url={video.video_link}
              style={{
                opacity: isPlay ? 1 : 0,
                display: isPlay ? "block" : "none",
              }}
              playing={false}
              controls
              width="100%"
              height="100%"
            />
            {!isPlay && (
              <Fragment>
                <div
                  onClick={() => setIsPlay(true)}
                  className="cursor-pointer absolute inset-0 flex items-center justify-center z-10"
                >
                  <NcPlayIcon />
                </div>
                <Image
                  className="object-cover transition-transform group-hover:scale-105 duration-300"
                  src={getUrl(video.video_image)}
                  title={video.title}
                  alt={video.title}
                  fill
                  sizes="(max-width: 600px) 480px, 800px"
                />
              </Fragment>
            )}
          </Fragment>
        ) : (
          <>
            <div
              onClick={() => setIsPlay(true)}
              className="cursor-pointer absolute inset-0 flex items-center justify-center z-10"
            >
              <NcPlayIcon />
            </div>
            <Image
              className="object-cover transition-transform group-hover:scale-105 duration-300"
              src={getUrl(video.video_image)}
              title={video.title}
              alt={video.title}
              fill
              sizes="(max-width: 600px) 480px, 800px"
            />
          </>
          // <ReactPlayer
          //   url={`https://www.youtube.com/watch?v=${video.id}`}
          //   playing={false}
          //   controls
          //   width="100%"
          //   height="100%"
          //   light={video.thumbnail}
          //   playIcon={<NcPlayIcon />}
          // />
        )}
      </div>
    );
  };

  return (
    <div className={`nc-SectionVideos ${className}`}>
      <Heading desc={""} isCenter>
        {heading}
      </Heading>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-7">
        {videos[currentVideo] && <Card12 post={videos[currentVideo]} isRendered={isRendered} isVideo={true} isPlay={isPlay}
          setIsPlay={setIsPlay} renderMainVideo={renderMainVideo} />}
        <div className={`flex-1 flex-col ${screen === 'Broadcast' ? " overflow-y-scroll max-h-[33rem] " : ""}`}>
          {videos
            .map((item, index) => (
              <Card13 className={`flex-1 ${index === currentVideo ? "bg-sky-200" : ""}`} cardAuthor={screen === 'Broadcast'} isVideo={true} key={index} index={index} setIsPlay={setIsPlay} setCurrentVideo={setCurrentVideo} post={item} />
            ))}
          {
            pageInfo?.showMore ? (
              <div className="flex mt-10 justify-center items-center">
                <ButtonPrimary loading={loader} onClick={getData}>Show more</ButtonPrimary>
              </div>
            ) : <></>
          }
          {/* <div
            className={`nc-CardAuthor mt-4 w-full bg-neutral-100 hover:bg-neutral-200 border flex items-center cursor-pointer`}
          >
            <h2
            className={`!text-sm p-4 w-full flex justify-center !text-center sm:text-base text-neutral-900 dark:text-neutral-900 font-medium sm:font-semibold`}
            >
            Load more
            <ChevronDownIcon className="w-5 h-5 ml-1 text-black" />
            </h2>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SectionVideos;
