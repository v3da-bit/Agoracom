import React from "react";
import Logo from "../../images/Agoracom-Logo.png";
import Image from "next/image";
import LineLayer from "../../images/Marketing/Line-icon-layer.png";
import LineLayerMobile from "../../images/Marketing/Line-icon-layer-mobile.png";
import YoutubeVideo from "../../images/Marketing/Youtube-video-2.png";
import Fairy from "../../images/Marketing/avatar_rotate.png";
import Link from "next/link";

const FairySection: React.FC<any> = ({className}) => {
  return (
    <>
        <div className={`relative container-fluid w-full h-fit lg:h-[100vh] py-16 lg:py-0 bg-marketingBlue-100 ${className}`}>
            <div className="h-fit lg:h-[25vh] w-full p-5 lg:p-0 lg:pl-20 block lg:flex lg:flex-col lg:justify-end">
                <h4 className="text-2xl lg:text-4xl text-white w-full lg:w-[55%]">
                    But don’t take our word for it, <span className="font-semibold">watch this video. <span className="italic"> Be sure to buckle up first and turn up the volume!</span></span>
                </h4>
            </div>
            <div className="block lg:flex w-full h-fit lg:h-[75vh]">
                <div className="hidden lg:block w-[50%] relative">
                    <Image 
                        src={Fairy} 
                        alt="" 
                        className="absolute bottom-0 !max-w-[120%] -ml-40" 
                    />
                </div>
                <div className="w-full lg:w-[50%] h-fit lg:h-full relative p-5 lg:p-0">
                    <div className="hidden lg:block absolute w-[80%] lg:w-[22vw] bg-primary-400 bottom-0 z-10 right-0 rounded-ss-[50px] h-[33vw]"></div>
                    <div className="hidden lg:block absolute w-full lg:w-[44.7vw] bg-white bottom-16 z-20 left-0 rounded-[50px] h-[23vw]"></div>
                    <Image 
                        src={YoutubeVideo} 
                        className="relative lg:absolute w-full lg:w-[81%] ml-0 lg:ml-[9%] bottom-0 lg:bottom-24 itemShadow z-30" 
                        alt="" 
                    />
                </div>
            </div>
        </div> 
    </>
  );
};

export default FairySection;
