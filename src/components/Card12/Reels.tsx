import React, { FC } from "react";
import NcImage from "@/components/NcImage/NcImage";
import { PostDataType } from "@/data/types";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import PostTypeFeaturedIcon from "@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import Link from "next/link";
import NcModal from "../NcModal/NcModal";
import Image from "next/image";
import NcPlayIcon from "../NcPlayIcon/NcPlayIcon";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Stories from 'react-insta-stories';
import PrevBtn from "@/components/NextPrev/PrevBtn";
import NextBtn from "@/components/NextPrev/NextBtn";
import ProgressBar from "../ProgressBar/ProgressBar";

export interface ReelsProps {
  stories?: any;
  setModal?: any;
  setPreviewIndex?: any;
  currentReel?: number;
}

const Reels: FC<ReelsProps> = ({setModal, stories, currentReel = -1, setPreviewIndex}) => {

    // const stories: any = [
    //     {
    //         url: "https://images.pexels.com/photos/18147352/pexels-photo-18147352/free-photo-of-colorful-macaw-parrot.jpeg?auto=compress",
    //         // type: "video",
    //         duration: 10000,
    //         header: {
    //             heading: 'Mohit Karekar',
    //             subheading: 'Posted 30m ago',
    //             profileImage: 'https://picsum.photos/100/100',
    //         },
    //     },
    //     {
    //         url: "https://player.vimeo.com/external/394835713.sd.mp4?s=fdc0a162e4eaa040eb84ae539f6a1f9431a42f58&profile_id=164&oauth2_token_id=57447761",
    //         type: "video",
    //         duration: 5000,
    //         header: {
    //             heading: 'Mohit Karekar',
    //             subheading: 'Posted 30m ago',
    //             profileImage: 'https://picsum.photos/100/100',
    //         },
    //     }
    // ]

  const renderVideoModalContent = () => {
    return (
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src={`https://www.youtube.com/embed/?autoplay=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="ncblog hero video"
        ></iframe>
      </div>
    );
  };
  
  return (
    <div className="fixed w-full h-[100vh] z-50 bg-neutral-900 top-0 left-0">
        <div className="w-full flex justify-end lg:p-5 p-2">
            <XMarkIcon className="w-7 h-7 cursor-pointer text-neutral-100" onClick={() => {
              setPreviewIndex(-1);
              setModal(false)
            }} />
        </div>
        <div className="w-full flex justify-center">
            {
              currentReel > 0 ? (
                <PrevBtn
                  onClick={() => setPreviewIndex(currentReel - 1)}
                  className={`w-9 h-9 xl:w-12 xl:h-12 text-lg absolute start-3 xl:start-24 z-[1] top-1/2 -translate-y-1/2`}
                />
              ) : <></>
            }
            {/* <div className="w-">

            </div> */}
            {/* <ProgressBar /> */}
            <Stories
                stories={[...stories[currentReel]]}
                defaultInterval={1500}
                width={432}
                height={"90vh"}
                onAllStoriesEnd={() => {
                  let next: any = (currentReel >= (stories.length - 1)) ? null : (currentReel + 1);
                  if (next) {
                    setPreviewIndex(next);
                  } else {
                    setModal(false);
                    setPreviewIndex(-1);
                  }
                }}
            />
            {
              (currentReel < (stories.length - 1)) ? (
                <NextBtn
                  onClick={() => setPreviewIndex(currentReel + 1)}
                  className={`w-9 h-9 xl:w-12 xl:h-12 text-lg absolute end-3 xl:end-24 z-[1] top-1/2 -translate-y-1/2`}
                />
              ) : <></>
            }
        </div>
    </div>
  );
};

export default Reels;
