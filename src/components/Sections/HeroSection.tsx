"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import NcModal from "@/components/NcModal/NcModal";
import { PlayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Button from "../Button/Button";
import Banner1 from "../../images/Banner/Web banners_Hero box_AGORACOM.png";
import Banner3 from "../../images/Banner/Web banners_Hero box_ draganfly 2.png";
import Banner2 from "../../images/Banner/Web banners_Hero box_HPQ 2.png";
import Banner5 from "../../images/Banner/Web banners_Hero box_Imagine AR 2.png";
import Banner4 from "../../images/Banner/Web banners_Hero box_fobi 2.png";
import Link from "next/link";
import { useSelector } from "react-redux";
// import Banner3 from "../../images/Banner/Web banners_Hero box_ draganfly.png";
// import Banner2 from "../../images/Banner/Web banners_Hero box_HPQ.png";
// import Banner5 from "../../images/Banner/Web banners_Hero box_Imagine AR.png";
// import Banner4 from "../../images/Banner/Web banners_Hero box_fobi.png";
// import { hasCookie, setCookie } from 'cookies-next';

export interface SectionHero2Props { }
const HeroSection: FC<SectionHero2Props> = ({ }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const { currentUser, loggedIn } = useSelector((state: any) => {
    return {
      currentUser: state.auth.currentUser,
      loggedIn: state.auth.loggedIn
    };
  });
  // const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    // initialiseData();
    // setShowBanner(!hasCookie("agoracom_hide_banner"))
  }, []);

  // const hideBanner = () => {
  //   let date: any = new Date();
  //   // let newDate: any = new Date('09/19/2023 15:19:00');
  //   let newDate: any = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  //   let d: any = Math.abs(newDate - date);
  //   setCookie("agoracom_hide_banner", true, {maxAge: d});
  //   setShowBanner(false);
  // }

  const renderOpenModalVideo = () => {
    return (
      <Button pattern="white" className="block lg:hidden" onClick={() => setShowVideo(!showVideo)}>
        Play video
        <PlayIcon className="w-5 h-5 ms-2 rtl:rotate-180" />
      </Button>
    );
  };

  const bannerItems = [
    "Smart, Moderated Discussion",
    "Latest Company News",
    "Exclusive Insights",
    "And More!"
  ]

  const images = [
    Banner1,
    Banner2,
    Banner3,
    Banner4,
    Banner5
  ]

  const initialiseData = () => {
    let newIndex = 0
    if (imageIndex === (images.length - 1)) {
      newIndex = 0;
    } else {
      newIndex = imageIndex + 1;
    }
    setImageIndex(newIndex);
  }

  useEffect(() => {
    setTimeout(initialiseData, 5000);
  }, [imageIndex]);

  const renderVideoModalContent = () => {
    return (
      <div className="aspect-w-16 aspect-h-9 ">
        <iframe
          src={'https://www.youtube.com/embed/pmi_aD2P-mY?autoplay=1'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="ncblog hero video"
        ></iframe>
      </div>
    );
  };

  return (
    <>
      {/* {
        showBanner ? (
          <> */}
      {/* <XMarkIcon onClick={hideBanner} className="w-8 h-8 absolute z-50 text-neutral-100 right-5 top-5 cursor-pointer" /> */}
      <div className="relative">

        <div className="SectionHero2 relative pb-12 md:py-32 lg:py-40 bg-defaultBlue-100">
          <div className="flex w-full mb-10 md:w-full xl:w-full md:absolute md:end-0 md:top-0 md:bottom-0 md:mb-0">
            <div className="hidden md:block absolute z-[1] top-0 start-0 bottom-0 w-full from-black from-10% bg-gradient-to-r rtl:bg-gradient-to-l to-90%"></div>
            <Image
              fill
              className={`object-cover hidden lg:block md:block lg:animate-fade ${images[imageIndex] === Banner1 ? "" : "object-right-bottom"}`}
              src={images[imageIndex]}
              sizes="1260px"
              alt="hero"
            />
          </div>
          <div className="container relative z-10 text-neutral-100">
            <div className="max-w-xl">
              <h1 className="font-bold text-4xl md:text-5xl xl:text-5xl mt-3 md:!leading-[110%] ">
                The small <br />cap epicenter
              </h1>
              <p className="mt-7 text-base lg:text-xl text-neutral-200 font-semibold">
                Agoracom is the leading Small Cap community connecting over 5 Million Investors and Public Companies.
              </p>
              <div className="mt-6 grid space-y-1 lg:grid-rows-2 lg:grid-flow-col sm:grid-rows-4 sm:grid-flow-row">
                {
                  bannerItems.map((item: string, index: number) => {
                    return (
                      <li key={index} className="flex items-center space-x-3 rtl:space-x-reverse">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#54BB3E"
                          className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <span className="font-medium text-neutral-200 font-semibold dark:text-neutral-300">
                          {item}
                        </span>
                      </li>
                    )
                  })
                }
              </div>
              {
                loggedIn ? <></> : <>
                  <div className="flex space-x-4 rtl:space-x-reverse mt-9">
                    <Link href="/auth/register"><ButtonPrimary >Join Now</ButtonPrimary></Link>

                    {/* <NcModal
                        isOpenProp={showVideo}
                        onCloseModal={() => setShowVideo(false)}
                        contentExtraClass="max-w-screen-lg 2xl:max-w-screen-xl"
                        contentPaddingClass=""
                        renderContent={renderVideoModalContent}
                        renderTrigger={renderOpenModalVideo}
                        modalTitle=""
                      /> */}
                  </div>
                </>
              }
            </div>
          </div>
        </div>
      </div>
      {/* </>
        ) : <></>
      } */}
    </>
  );
};

export default HeroSection;
