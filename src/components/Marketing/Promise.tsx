import React from "react";
import Logo from "../../images/Agoracom-Logo.png";
import Image from "next/image";
import LineLayer from "../../images/Marketing/Line-icon-layer.png";
import LineLayerMobile from "../../images/Marketing/Line-icon-layer-mobile.png";
import YoutubeVideo from "../../images/Marketing/Youtube-video-2.png";
import BgLayer from "../../images/Marketing/Bg_Green_Layer.png";
import BgLayerMobile from "../../images/Marketing/Bg_Green_Layer_Mobile.png";
import Link from "next/link";

const PromiseSection: React.FC<any> = ({className}) => {
  return (
    <>
        <div className={`relative container-fluid w-full h-fit lg:h-[100vh] py-16 lg:py-0 bg-marketingBlue-100 ${className}`}>
            <Image 
                src={BgLayer} 
                alt="" 
                className="hidden lg:block absolute w-fit h-full" 
            />
            <div className="relative h-full w-full lg:w-[50%] block lg:flex lg:flex-col lg:justify-center z-20">
              <div className="h-fit w-full">
                <div className="w-full h-fit px-4 lg:px-0 lg:pl-20">
                  <h4 className="text-2xl lg:text-5xl text-white font-marketBold">A DREAM REALIZED:</h4>
                  <h3 className="text-4xl lg:text-6xl text-white font-marketBold">CONTENT</h3>
                  <h3 className="text-4xl lg:text-6xl text-white font-marketBold"><span className="stokeClass">BEYOND</span> LIMITS</h3>
                  <h5 className="text-xl lg:text-3xl text-white mt-6 lg:mt-8">Every brand dreams of <span className="font-semibold">unparalleled social media marketing.</span></h5>
                  <h5 className="text-xl lg:text-3xl text-white mt-6 lg:mt-8">With 
                    <span className="font-semibold"> AGORACOM</span>, it's not just a dream. <span className="font-semibold">It's your new reality.</span>
                  </h5>
                </div>
                <div className="bg-primary-400 lg:bg-marketingBlue-100 pl-4 lg:pl-20 py-2 pr-5 rounded-r-xl w-fit mt-6 lg:mt-8">
                  <h5 className="text-2xl lg:text-3xl text-white font-semibold">That's our promise</h5>
                </div>
              </div>
            </div>
            <div className="block lg:hidden p-3 mt-6">
              <Image 
                  src={BgLayerMobile} 
                  alt="" 
                  className="w-full h-fit" 
              />
            </div>
        </div> 
    </>
  );
};

export default PromiseSection;
