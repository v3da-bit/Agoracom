import React from "react";
import Logo from "../../images/Agoracom-Logo.png";
import Image from "next/image";
import LineLayer from "../../images/Marketing/Line-icon-layer.png";
import LineLayerMobile from "../../images/Marketing/Line-icon-layer-mobile.png";
import GreenLine from "../../images/Marketing/Green-Line.png";
import YoutubeVideo from "../../images/Marketing/Youtube-video-1.png";
import Link from "next/link";

const BelieveSection: React.FC<any> = ({className}) => {
  return (
    <>
        <div className={`relative container-fluid w-full h-fit lg:h-[100vh] bg-marketingBlue-100 ${className}`}>
            <div className="grid grid-cols-1 h-full lg:grid-cols-2">
                <div className="w-full h-full flex flex-col justify-end">
                    <div className="w-full h-fit">
                        <h2 className="text-3xl lg:text-6xl font-marketBold text-white mt-10 lg:mt-0 p-5 lg:p-0 lg:pl-[10vw]">
                            SEEING IS <br /> <span className="text-primary-400">BELIEVING</span>
                        </h2>
                        <h4 className="text-xl lg:text-3xl text-white mt-0 lg:mt-5 pl-5 lg:pl-[10vw]">
                            <span className="font-marketBold">AGORACOM </span> is the pioneer <br /> of <span className="font-marketBold italic"> online investor relations</span>
                        </h4>
                        <div className="w-full h-fit mt-5 relative">
                            <Image 
                                src={LineLayer} 
                                alt="Green Icon Pattern" 
                                className="w-full hidden lg:block" 
                            />
                            <Image 
                                src={LineLayerMobile} 
                                alt="Green Icon Pattern" 
                                className="w-full block lg:hidden" 
                            />
                        </div>
                    </div>
                </div>
                <div className="block lg:hidden mt-10 w-full">
                    <hr />
                </div>
                <div className="w-full h-full flex justify-end">
                    <div className="w-full lg:w-[70%] text-white">
                        <div className="flex justify-end pr-7 lg:pr-16">
                            <div className="flex">
                                <h4 className="text-2xl text-right pt-16 pr-6">
                                    But rather than telling <br /> you all about it we’d <br /> rather <span className="font-marketBold"> show you in <br /> this 75 second video</span>
                                </h4>
                                <Image 
                                    alt="Green Pattern" 
                                    src={GreenLine} 
                                    className="w-5 h-28" 
                                />
                            </div>
                        </div>
                        <Link href="https://www.youtube.com/watch?v=-wx6OZJGRac" className="w-full flex justify-end mb-10 lg:mb-0">
                            <div className="w-[95%] lg:w-full text-right">
                                <Image 
                                    alt="Youtube.com" 
                                    src={YoutubeVideo} 
                                    className="w-full mt-8 cursor-pointer" 
                                />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div> 
    </>
  );
};

export default BelieveSection;
