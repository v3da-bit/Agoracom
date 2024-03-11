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
import MySlider from "../MySlider";
import DefaultImage from '../../images/default-image.jpg';

export interface VideoType {
  id: string;
  title: string;
  thumbnail: string;
}

export interface SmallCapProps {
  videos?: any[];
  className?: string;
  pageInfo?: any;
  getData?: any;
  loader?: any;
}

const SmallCap: FC<SmallCapProps> = ({
  videos = [],
  className = "",
  pageInfo = null,
  getData,
  loader
}) => {

  const [isRendered, setIsRendered] = useState(false);
  const [isPlay, setIsPlay] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  const getUrl = (url: any) => {
    if (url.toString().includes("s3.amazonaws.com") || url.toString().includes(".com")) {
      return url;
    } else {
      return DefaultImage;
    }
  }

  const renderMainVideo = (video: any) => {
    if (video.video_image?.includes('maxresdefault.jpg')) {
      video.video_image = video.video_image.replace('maxresdefault.jpg', 'hqdefault.jpg')
    }

    const getUrl = (url: any) => {
      if (url.toString().includes("s3.amazonaws.com") || url.toString().includes(".com")) {
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
                  onClick={() => setIsPlay(video.id)}
                  className="cursor-pointer absolute inset-0 flex items-center justify-center z-10"
                >
                  <NcPlayIcon className="lg:!w-20 lg:!h-20 lg:!p-4" />
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
              onClick={() => setIsPlay(video.id)}
              className="cursor-pointer absolute inset-0 flex items-center justify-center z-10"
            >
              <NcPlayIcon className="lg:!w-20 lg:!h-20 lg:!p-4" />
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
        Small Cap 60 Clips
      </Heading>

      {/* <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 md:gap-7"> */}

      <MySlider
        data={videos}
        showMore={pageInfo?.small_cap60Info?.showMore}
        loader={loader}
        loadData={getData}
        renderItem={(item, index) => {
          return <Card12 key={index} post={item} isRendered={isRendered} screen="Small-60" hideDiscussion={true} isVideo={true} isPlay={isPlay === item.id}
            setIsPlay={setIsPlay} renderMainVideo={renderMainVideo} />
        }}
        itemPerRow={4} />
      {/* {
            videos
            .map((item, index) => {
                return 
            })
        } */}

      {/* <div className="flex-1 flex-col">
          {videos
            .map((item, index) => (
              <Card13 className={`flex-1 ${index === currentVideo ? "bg-sky-200" : ""}`} isVideo={true} key={index} index={index} setIsPlay={setIsPlay} setCurrentVideo={setCurrentVideo} post={item} />
            ))}
            {
              pageInfo?.newsInfo?.showMore ? (
                <div className="flex mt-10 justify-center items-center">
                  <ButtonPrimary loading={loader?.news} onClick={getNews}>Show more</ButtonPrimary>
                </div>
              ) : <></>
            }
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default SmallCap;
