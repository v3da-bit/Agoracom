import React, { FC } from "react";
import NcImage from "@/components/NcImage/NcImage";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import { PostDataType } from "@/data/types";
import Link from "next/link";
import NcPlayIcon2 from "../NcPlayIcon2/NcPlayIcon2";
import Image from "next/image";
import moment from "moment";
import CardAuthor from "../CardAuthor/CardAuthor";
import DefaultAvatar from "../../images/Icons/avatar.png";
import DefaultImage from "../../images/default-image.jpg";

export interface Card13Props {
  className?: string;
  post: any;
  setCurrentVideo?: any;
  index?: number;
  setIsPlay?: any;
  isVideo?: boolean;
  isPost?: boolean;
  cardAuthor?: boolean;
}

const Card13: FC<Card13Props> = ({ className = "", post, setCurrentVideo, index, setIsPlay, isVideo = false, isPost = false, cardAuthor = false }) => {
  const { title, href, desc, thumbnail, date, id, featuredImage, cover_photo_url, created_at, video_image } = post;
  const metaData = {
    stock_exchange: "TSX-V",
    tidy_ticker: "HRP",
    name: "Crystallex International",
    avatar: "xyz"
  }

  const getUrl = (url: any) => {
    if (url.toString().includes("s3.amazonaws.com")||url.toString().includes(".com")) {
      return url;
    } else {
      return DefaultImage;
    }
  }
  return (
    <div key={index} onClick={() => {
      if (isVideo) {
        setCurrentVideo(index)
        setIsPlay(false);
      }
    }} className={`nc-Card13 relative flex justify-between gap-3 ${isVideo ? "p-3" : "pl-3 pb-3"} cursor-pointer rounded-lg ${className}`}>
      <div className={`flex-shrink-0 grid gap-2 ${isVideo ? "pt-2" : ""} grid-cols-4 sm:gap-6 lg:grid-cols-1 lg:w-36 xl:w-40`}>
        <div
          className="group relative !h-24 max-h-28 rounded-2xl overflow-hidden sm:rounded-xl lg:z-0"
          title={title ?? ""}
        >
          {
            isVideo ? (
              <>
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <NcPlayIcon2 />
                </div>
              </>
            ) : <></>
          }
          <Image
            sizes="(max-width: 600px) 480px, 800px"
            className="transition-transform group-hover:scale-110 duration-300"
            src={isVideo ? getUrl(video_image) : cover_photo_url}
            fill
            title={title}
            alt={title}
          />
        </div>
      </div>

      <div className="flex w-full flex-col h-full py-2">
        <h2
          className={`nc-card-title block font-semibold text-sm sm:text-base`}
        >
          <Link href={`/company/${post?.company_id}/discussion/${post?.id}`} className="text-base line-clamp-2 text-left" title={title}>
            {title}
          </Link>
        </h2>
        {
          isVideo ? (
            <>
              <span className="text-neutral-500 dark:text-neutral-400 font-normal text-xs block mt-3">
                {post.created_at ? moment(post?.created_at).format("MMM DD, YYYY") : ""}
              </span>
            </>
          ) : <></>
        }
        {
          isPost ? (
            <>
              <div className="mt-5 hidden sm:block">
                <PostCardMeta meta={{ ...post }} href={`/members/${post?.user_id}`} logoHref={`/company/${post?.company_id}`} avatar={post.company_logo_url} />
              </div>
            </>
          ) : <></>
        }
        {
          cardAuthor ? (
            <CardAuthor
              className="!p-2 !pl-2 pr-20 xl:p-2 dark:hover:bg-neutral-700"
              parent_textClass="!text-defaultBlue-100"
              key={post.id}
              author={metaData}
              hideAddIcon={true}
              isMember={false}
              isCompany={true}
            />
          ) : <></>
        }
        {/* <span className="mt-4 block sm:hidden text-xs text-neutral-500 ">
          {date}
        </span> */}
      </div>
    </div>
  );
};

export default Card13;
