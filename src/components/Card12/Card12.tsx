import React, { FC } from "react";
import NcImage from "@/components/NcImage/NcImage";
import { PostDataType } from "@/data/types";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import PostTypeFeaturedIcon from "@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import Link from "next/link";
import NcModal from "../NcModal/NcModal";
import Image from "next/image";
import NcPlayIcon from "../NcPlayIcon/NcPlayIcon";
import Reels from "./Reels";
import moment from "moment";

export interface Card12Props {
  className?: string;
  post: any;
  isRendered?: any;
  renderMainVideo?: any;
  isPlay?: boolean;
  setIsPlay?: any;
  isPost?: boolean;
  isVideo?: boolean;
  hideDiscussion?: boolean;
  screen?: string;
  grid?: number
}

const Card12: FC<Card12Props> = ({
  className = "h-full",
  post,
  isRendered,
  renderMainVideo,
  isPlay,
  setIsPlay,
  isPost = false,
  grid,
  screen = "",
  hideDiscussion = false,
  isVideo = false
}) => {
  const { title, href, thumbnail, desc, postType } = post;
  if (post.video_link?.toString().includes("www.google.com")) {
    post.video_link = ' https://www.youtube.com/embed/pnTeA07f-yQ?autoplay=1'
  }

  const renderVideoModalContent = () => {
    return (
      <div className="aspect-w-16 aspect-h-9 ">
        <iframe
          src={post.video_link}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="ncblog hero video"
        ></iframe>
      </div>
    );
  };

  return (
    <div className={`nc-Card12 group relative flex flex-col h-fit ${className}`}>
      <div className={`relative pb-2 sm:pb-4 lg:pb-0 lg:pr-5 xl:pr-6 ${isPost ? "h-[340px]" : ""}`}>
        {isVideo && isRendered && renderMainVideo(post)}
        {isPost ? (
          <>
            <Image
              className="transition-transform group-hover:scale-105 duration-300 rounded-3xl"
              src={post.cover_photo_url}
              title={post.title}
              alt={post.title}
              fill
              sizes="(max-width: 600px) 480px, 800px"
            />
          </>
        ) : <></>}
      </div>

      <div className={`mt-2 sm:mt-5 pe-10 pb-5 ${screen === 'Quick-Tips' ? 'px-3' : ''}`}>
        <h2
          className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 mb-2 transition-colors sm:text-lg lg:text-2xl`}
        >
          <Link href={`/company/${post?.company_id}/discussion/${post?.id}`} className="line-clamp-2 text-lg">
            {title}
          </Link>
        </h2>
        {
          isVideo ? (
            <>
              {/* <span className="hidden text-sm mb-3 sm:block mt-4 text-neutral-500 dark:text-neutral-400">
                <span className="line-clamp-2"> {desc}</span>
              </span> */}
              {
                hideDiscussion ? <></> : (
                  <>
                    <span className="text-neutral-500 dark:text-neutral-400 font-normal text-sm mt-2 mb-4">
                      {post.created_at ? moment(post.created_at).format("ll") : ""}
                    </span>
                    {/* <span className="text-sm !mt-5 text-sky-500">
                      <Link href="/" className="font-semibold flex">
                        <span>See Discussion</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="ml-1 mt-0.5 w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>

                      </Link>
                    </span> */}
                  </>
                )
              }
              {
                screen === 'Small-60' || screen === 'Broadcast' ? (
                  <PostCardMeta href={`/members/${post?.user_id}`} logoHref={`/company/${post?.company_id}`} className="mt-0 text-sm" meta={post} screen={screen} avatar={screen === 'Broadcast' ? post?.company?.small_logo_url : post?.avatar_url} showSubInfo={true} grid={grid} />
                ) : <></>
              }
              {
                screen === 'Quick-Tips' ? (
                  <>
                    <p className="text-sm"> {post?.content} </p>
                  </>
                ) : <></>
              }
              {
                screen === 'Company-Detail' ? (
                  <div className="text-neutral-6000 dark:text-neutral-400 font-normal -mt-2 text-sm">{moment(post?.created_at).format("ll")}</div>
                ) : <></>
              }
              <NcModal
                isOpenProp={isPlay}
                onCloseModal={() => setIsPlay(false)}
                contentExtraClass="max-w-screen-lg 2xl:max-w-screen-xl"
                contentPaddingClass=""
                renderContent={renderVideoModalContent}
                renderTrigger={() => <></>}
                modalTitle=""
              />
            </>
          ) : <></>
        }
        {
          isPost ? (
            <>
              <PostCardMeta href={`/members/${post?.user_id}`} logoHref={`/company/${post?.company_id}`} className="mt-0 text-sm" meta={post} avatar={post?.company_logo_url} />
            </>
          ) : <></>
        }
      </div>
    </div>
  );
};

export default Card12;
