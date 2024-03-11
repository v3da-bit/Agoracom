"use client";

import React, { FC, useEffect, useState } from "react";
import Heading from "@/components/Heading/Heading";
import Card4 from "@/components/Card4/Card4";
import Card7 from "@/components/Card7/Card7";
import { PostDataType } from "@/data/types";
import Card9 from "@/components/Card9/Card9";
import Card10 from "@/components/Card10/Card10";
import Card11 from "@/components/Card11/Card11";
import Card10V2 from "@/components/Card10/Card10V2";
import MySlider from "@/components/MySlider";
import Reels from "../Card12/Reels";
import TrailerImage from "../../images/trailer.jpg";

export interface SectionSliderPostsProps {
  className?: string;
  heading: string;
  subHeading?: string;
  posts: PostDataType[];
  postCardName?: "card4" | "card7" | "card9" | "card10" | "card10V2" | "card11";
  perView?: 2 | 3 | 4 | 6;
  // isReel?: boolean;
  screen?: string;
  loader?: boolean;
  showMore?: boolean;
  getData?: any;
}

const SectionSliderPosts: FC<SectionSliderPostsProps> = ({
  heading,
  subHeading,
  className = "",
  posts,
  postCardName = "card4",
  perView = 4,
  screen = "",
  loader = false,
  showMore = false,
  getData
}) => {
  let CardComponent = Card11;
  const [modal, setModal] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(-1);
  const [reelsContent, setReelsContent] = useState([]);

  switch (postCardName) {
    case "card4":
      CardComponent = Card4;
      break;
    case "card7":
      CardComponent = Card7;
      break;
    case "card9":
      CardComponent = Card9;
      break;
    case "card10":
      CardComponent = Card10;
      break;
    case "card10V2":
      CardComponent = Card10V2;
      break;
    case "card11":
      CardComponent = Card11;
      break;

    default:
      break;
  }

  // useEffect(() => {
  //   if (screen === "Reels" && posts.length > 0) {
  //     let previewContent: any = [];
  //     posts.forEach((item: any) => {
  //       let obj: any = {
  //         url: item.videoUrl,
  //         type: "video",
  //         duration: item.duration,
  //         header: {
  //           heading: 'Mohit Karekar',
  //           subheading: 'Posted 30m ago',
  //           profileImage: 'https://picsum.photos/100/100',
  //         },
  //       }
  //       previewContent.push(obj);
  //     });
  //     setReelsContent(previewContent);
  //   }
  // }, [posts]);

  const previewReels = (item: any) => {
    // let index = -1;
    // posts.forEach((val: any, indx: number) => {
    //   if(val.id === item.id) {
    //     index = indx;
    //   }
    // })
    // if(index >= 0) {
    //   setPreviewIndex(index);
    //   setModal(true);
    // }
  }

  return (
    <div className={`nc-SectionSliderPosts ${className}`}>
      <Heading desc={""} isCenter>
        {heading}
      </Heading>
      {
        modal ? (
          <Reels setModal={setModal} stories={reelsContent} currentReel={previewIndex} setPreviewIndex={setPreviewIndex} />
        ) : <></>
      }
      <MySlider
        data={posts}
        showMore={showMore}
        loader={loader}
        loadData={getData}
        renderItem={(item, indx) => {
          if (screen === "Reels") {
            item['postType']='video';
            return <Card9 setModal={setModal} screen={screen} previewReels={previewReels} key={item.id} post={item} />
          }
          if (screen === 'Trailer') {
            item["featuredImage"] = TrailerImage;
          }
          return <CardComponent showLikeSection={true} setModal={setModal} screen={screen} key={item.id} post={item} />
        }}
        itemPerRow={perView}
      />
    </div>
  );
};

export default SectionSliderPosts;
