import React, { FC, Fragment, ReactNode, useEffect, useState } from "react";
import Card3 from "@/components/Card3/Card3";
import Heading from "@/components/Heading/Heading";
import { DEMO_POSTS } from "@/data/posts";
import { PostDataType } from "@/data/types";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Card4 from "@/components/Card4/Card4";
import Card7 from "@/components/Card7/Card7";
import Card9 from "@/components/Card9/Card9";
import Card10 from "@/components/Card10/Card10";
import Card11 from "@/components/Card11/Card11";
import Card14 from "@/components/Card14/Card14";
import Card10V2 from "@/components/Card10/Card10V2";
import Card15Podcast from "@/components/Card15Podcast/Card15Podcast";
import TrailerImage from "../../images/trailer.jpg";
import Card12 from "../Card12/Card12";
import NcPlayIcon from "../NcPlayIcon/NcPlayIcon";
import ReactPlayer from "react-player";
import Image from "next/image";
import isSafariBrowser from "@/utils/isSafariBrowser";

// OTHER DEMO WILL PASS PROPS
const postsDemo: PostDataType[] = DEMO_POSTS.filter((_, i) => i > 7 && i < 17);

//
export interface SectionGridPostsProps {
  posts?: PostDataType[];
  className?: string;
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  screen?: string;
  pageInfo?: any;
  getData?: any;
  loader?: any;
  postCardName?:
    | "card3"
    | "card4"
    | "card7"
    | "card9"
    | "card10"
    | "card10V2"
    | "card11"
    | "card14"
    | "card15Podcast";
}

const SectionGridPosts: FC<SectionGridPostsProps> = ({
  posts = postsDemo,
  postCardName = "card3",
  className = "",
  gridClass = "",
  heading,
  subHeading,
  headingIsCenter,
  screen = "",
  pageInfo = null,
  getData,
  loader
}) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  const renderCard = (post: PostDataType) => {
    switch (postCardName) {
    //   case "card3":
    //     return (
    //       <Card3
    //         key={post.id}
    //         className="p-3 sm:p-5 2xl:p-6 [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ]"
    //         post={post}
    //       />
    //     );
    //   case "card4":
    //     return <Card4 key={post.id} post={post} />;
    //   case "card7":
    //     return (
    //       <Card7 key={post.id} post={post} ratio="aspect-w-5 aspect-h-5" />
    //     );
      case "card9":
        return <Card9 key={post.id} post={post} screen={screen}  />;
    //   case "card10":
    //     return <Card10 key={post.id} post={post} />;
    //   case "card10V2":
    //     return <Card10V2 key={post.id} post={post} />;
      case "card11":
        return <Card11 key={post.id} post={post} hiddenAuthor={true} showDesc={true} showCompanyFooter={true} industry={true} />;
    //   case "card14":
    //     return <Card14 key={post.id} post={post} />;
    //   case "card15Podcast":
    //     return <Card15Podcast key={post.id} post={post} />;
      default:
        return null;
    }
  };

  const renderMainVideo = (video: any) => {
    // const video: any = videos[currentVideo];

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
                  <NcPlayIcon className="lg:!w-20 lg:!h-20 lg:!p-8" />
                </div>
                <Image
                  className="transition-transform group-hover:scale-105 duration-300"
                  src={video.video_image}
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
              <NcPlayIcon className="lg:!w-20 lg:!h-20 lg:!p-4" />
            </div>
            <Image
              className="transition-transform group-hover:scale-105 duration-300"
              src={video.video_image}
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
    <div className={`nc-SectionGridPosts relative ${className}`}>
      {
        heading ? (
          <Heading desc={""} isCenter>
            {heading}
          </Heading>
        ) : <></>
      }
      <div className={`grid gap-6 md:gap-8 ${gridClass}`}>
        {
          posts.map((post: any, index) => {
            if(screen ===  "Industry") {
              return renderCard(post)
            } else if(screen ===  "Company") {
              post["featuredImage"] = TrailerImage;
              // post["featuredImage"] = post?.small_logo_url;
              return renderCard(post)
            } else if(screen === "Broadcast") {
              return <Card12 key={post.id} post={post} isRendered={true} screen="Broadcast" grid={3} hideDiscussion={true} isVideo={true} isPlay={isPlay} 
              setIsPlay={setIsPlay} renderMainVideo={renderMainVideo} />
            }
          })
        }
      </div>
      {
        screen === "Industry" && pageInfo?.industryInfo?.showMore ? (
          <div className="flex mt-20 justify-center items-center">
            <ButtonPrimary loading={loader.industry} onClick={getData}>Show more</ButtonPrimary>
          </div>
        ) : <></>
      }
      {
        (screen === "Company" && pageInfo?.sponsored?.showMore) ? (
          <div className="flex mt-20 justify-center items-center">
            <ButtonPrimary loading={loader.sponsored} onClick={getData}>Show more</ButtonPrimary>
          </div>
        ) : <></>
      }
      {
        screen === "Broadcast" && pageInfo.showMore ? (
          <div className="flex mt-20 justify-center items-center">
            <ButtonPrimary loading={loader} onClick={getData}>Show more</ButtonPrimary>
          </div>
        ) : <></>
      }
    </div>
  );
};

export default SectionGridPosts;
