import React from "react";
import Logo from "../../images/Agoracom-Logo.png";
import Image from "next/image";
import LineLayer from "../../images/Marketing/Line-icon-layer.png";
import LineLayerMobile from "../../images/Marketing/Line-icon-layer-mobile.png";
import YoutubeVideo from "../../images/Marketing/Youtube-video-2.png";
import BgLayer from "../../images/Marketing/Bg_Green_Layer.png";
import BgLayerMobile from "../../images/Marketing/Bg_Green_Layer_Mobile.png";
import Link from "next/link";

const DeliverableSection: React.FC<any> = ({className}) => {
  return (
    <>
        <div className={`relative container-fluid w-full h-fit lg:h-[100vh] py-16 lg:py-0 bg-marketingBlue-100 ${className}`}>
            <div className="h-full w-full flex flex-col justify-center">
                <div className="w-full h-fit">
                    <div className="w-full h-fit px-5 lg:px-0 lg:pl-24">
                        <h4 className="text-2xl lg:text-5xl text-white font-marketBold">PROGRAM DETAILS</h4>
                        <h3 className="text-4xl lg:text-6xl text-white font-marketBold"><span className="stokeClass"> MINIMUM</span> 
                        <span className="text-primary-400"> DELIVERABLES</span></h3>
                    </div>
                    <div className="mt-6 lg:mt-8 px-5 lg:px-0 lg:pl-24">
                        <div className="w-full h-fit block lg:flex">
                            <div className="w-full lg:w-[70%] h-fit pr-0 lg:pr-8">
                                <div className="w-full h-fit">
                                    <div className="flex">
                                        <span className="w-[45%] lg:w-[30%] py-1 pl-2 rounded-ss-xl font-semibold text-sm text-marketingBlue-100 bg-primary-400">
                                            4 Zoom Interviews
                                        </span>
                                        <span className="w-[55%] lg:w-fit py-1 pl-2 pr-5 rounded-r-2xl ml-1 font-semibold text-sm text-marketingBlue-100 bg-white">
                                            Full Length 20-30 Minutes
                                        </span>
                                    </div>
                                    <div className="flex mt-1">
                                        <span className="w-[45%] lg:w-[30%] py-1 pl-2 font-semibold text-sm text-marketingBlue-100 bg-primary-400">
                                            20 Mini-Clip Videos
                                        </span>
                                        <span className="w-[55%] lg:w-fit py-1 pl-2 pr-5 rounded-r-2xl ml-1 font-semibold text-sm text-marketingBlue-100 bg-white">
                                            1-2 Minute Clips Taken From Full Interviews
                                        </span>
                                    </div>
                                    <div className="flex mt-1">
                                        <span className="w-[45%] lg:w-[30%] py-1 pl-2 font-semibold text-sm text-marketingBlue-100 bg-primary-400">
                                            3 Multilingual AI Videos
                                        </span>
                                        <span className="w-[55%] lg:w-fit py-1 pl-2 pr-5 rounded-r-2xl ml-1 font-semibold text-sm text-marketingBlue-100 bg-white">
                                            German, Chinese, French
                                        </span>
                                    </div>
                                    <div className="flex mt-1">
                                        <span className="w-[45%] lg:w-[30%] py-1 pl-2 font-semibold text-sm text-marketingBlue-100 bg-primary-400">
                                            20 Social Media Reels
                                        </span>
                                        <span className="w-[55%] lg:w-fit py-1 pl-2 pr-5 rounded-r-2xl ml-1 font-semibold text-sm text-marketingBlue-100 bg-white">
                                            60-90s Reels & Shorts Created Specifically For Instagram, YouTube & Tik Tok 
                                        </span>
                                    </div>
                                    <div className="flex mt-1">
                                        <span className="w-[45%] lg:w-[30%] py-1 pl-2 rounded-es-xl font-semibold text-sm text-marketingBlue-100 bg-primary-400">
                                            1 Custom AI Cinema Kit
                                        </span>
                                        <span className="w-[55%] lg:w-fit py-1 pl-2 pr-5 rounded-r-2xl ml-1 font-semibold text-sm text-marketingBlue-100 bg-white">
                                            Your Fully Customized Movie Poster And Trailer 
                                        </span>
                                    </div>
                                </div>

                                <div className="w-full h-fit mt-6">
                                    <div className="flex mt-1">
                                        <span className="w-[45%] lg:w-[30%] py-1 pl-2 rounded-ss-xl font-semibold text-sm text-marketingBlue-100 bg-primary-400">
                                            12 Month Social Media Marketing
                                        </span>
                                        <span className="w-[55%] lg:w-fit py-1 pl-2 pr-5 rounded-r-2xl ml-1 font-semibold text-sm text-marketingBlue-100 bg-white">
                                            Every Major Social Media Platform
                                        </span>
                                    </div>
                                    <div className="flex mt-1">
                                        <span className="w-[45%] lg:w-[30%] py-1 pl-2 font-semibold text-sm text-marketingBlue-100 bg-primary-400">
                                            12 Month Content Creation   
                                        </span>
                                        <span className="w-[55%] lg:w-fit py-1 pl-2 pr-5 rounded-r-2xl ml-1 font-semibold text-sm text-marketingBlue-100 bg-white">
                                            Text, Video, Audio, Reels, GIFs, Graphics
                                        </span>
                                    </div>
                                    <div className="flex mt-1">
                                        <span className="w-[45%] lg:w-[30%] py-1 pl-2 font-semibold text-sm text-marketingBlue-100 bg-primary-400">
                                            12 Month Search Engine Program
                                        </span>
                                        <span className="w-[55%] lg:w-fit py-1 pl-2 pr-5 rounded-r-2xl ml-1 font-semibold text-sm text-marketingBlue-100 bg-white">
                                            Target Online Investors Interested In Your Peers and Industry
                                        </span>
                                    </div>
                                    <div className="flex mt-1">
                                        <span className="w-[45%] lg:w-[30%] py-1 rounded-es-xl pl-2 font-semibold text-sm text-marketingBlue-100 bg-primary-400">
                                            12 Months Branding
                                        </span>
                                        <span className="w-[55%] lg:w-fit py-1 pl-2 pr-5 rounded-r-2xl ml-1 font-semibold text-sm text-marketingBlue-100 bg-white">
                                            Embedded Within AGORACOM.com 
                                        </span>
                                    </div>
                                </div>

                                <div className="w-full h-fit mt-6">
                                    <div className="flex mt-1">
                                        <span className="w-[45%] lg:w-[30%] rounded-l-xl py-1 pl-2 flex flex-col justify-center font-semibold text-sm text-marketingBlue-100 bg-primary-400">
                                            1 Week Exclusive Sponsorship
                                        </span>
                                        <div className="w-[55%] lg:w-fit h-fit ml-1">
                                            <p className="w-fit py-1 pl-2 mb-1 pr-5 rounded-r-2xl font-semibold text-sm text-marketingBlue-100 bg-white">
                                                AGORACOM.com Front Page
                                            </p>
                                            <p className="w-fit py-1 pl-2 mb-1 pr-5 rounded-r-2xl font-semibold text-sm text-marketingBlue-100 bg-white">
                                                AGORACOM / YouTube Small-Cap TV
                                            </p>
                                            <p className="w-fit py-1 pl-2 pr-5 rounded-r-2xl font-semibold text-sm text-marketingBlue-100 bg-white">
                                                AGORACOM X (Twitter) Account
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full h-fit mt-6">
                                    <div className="flex mt-1">
                                        <span className="w-[45%] lg:w-[30%] py-1 pl-2 rounded-ss-xl font-semibold text-sm text-marketingBlue-100 bg-primary-400">
                                            Customized HUB
                                        </span>
                                        <span className="w-[55%] lg:w-fit py-1 pl-2 pr-5 rounded-r-2xl ml-1 font-semibold text-sm text-marketingBlue-100 bg-white">
                                            Amalgamates Information, Shareholder Discussion, All Content
                                        </span>
                                    </div>
                                    <div className="flex mt-1">
                                        <span className="w-[45%] lg:w-[30%] py-1 pl-2 rounded-es-xl font-semibold text-sm text-marketingBlue-100 bg-primary-400">
                                            Verified Forum   
                                        </span>
                                        <span className="w-[55%] lg:w-fit py-1 pl-2 pr-5 rounded-r-2xl ml-1 font-semibold text-sm text-marketingBlue-100 bg-white">
                                            The Only Moderated Forum & Verified Company Officials = Unparalleled Investor Engagement
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-[30%] h-full flex flex-col justify-center mt-6 lg:mt-0">
                                <div className="w-full h-fit flex justify-end">
                                    <div className="w-full lg:w-[80%] h-fit p-10 lg:pr-12 border-[1px] border-primary-400 rounded-2xl lg:rounded-none lg:rounded-s-2xl">
                                        <h6 className="text-2xl text-white font-semibold">Unlimited</h6>
                                        <p className="text-white text-base mt-4 font-semibold"><span className="text-primary-400">Front Page Featured News </span> For All Material News, Updates, Events, etc.</p>
                                        <p className="text-white text-base mt-4 font-semibold"><span className="text-primary-400">News Flash </span> For All Material News, Updates, Events, etc.</p>
                                        <p className="text-white text-base mt-4 font-semibold"><span className="text-primary-400">AGORACOM TV </span> For All Material News, Updates, Events, etc.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </>
  );
};

export default DeliverableSection;
