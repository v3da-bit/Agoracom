import React from "react";
// import Logo from "../../images/Agoracom-Logo.png";
// import Image from "next/image";
// import LineLayer from "../../images/Marketing/Line-icon-layer.png";
// import LineLayerMobile from "../../images/Marketing/Line-icon-layer-mobile.png";
// import GreenLine from "../../images/Marketing/Green-Line.png";
// import YoutubeVideo from "../../images/Marketing/Youtube-video-1.png";
// import Link from "next/link";

const ComplaintSection: React.FC<any> = ({className}) => {
  return (
    <>
        <div className={`relative container-fluid w-full h-fit lg:h-[100vh] bg-marketingBlue-100 ${className}`}>
            <div className="container w-full h-full flex flex-col justify-center">
                <div className="w-full h-fit text-white text-center mt-16 lg:mt-0">
                    <h3 className="text-xl lg:text-4xl">
                        PUTTING OUR MONEY WHERE OUR MOUTH IS
                    </h3>
                    <h3 className="text-3xl lg:text-5xl">
                        <span className="font-marketBold">CASHLESS AND <span className="text-primary-400">100%</span></span>
                        <span className="stokeClass font-marketBold"> COMPLIANT</span>
                    </h3>
                    <div className="flex justify-center">
                        <h5 className="mt-7 text-xl lg:text-2xl w-full lg:w-[60%]">
                            In another industry first, we have structured our compensation model on a 
                            <span className="text-primary-400"> cashless basis</span> as follows:
                        </h5>
                    </div>
                    <div className="mt-12 block lg:flex lg:justify-between">
                        <div className="relative w-full lg:w-[40%] h-fit pl-5 lg:pl-8 mb-5 lg:mb-0">
                            <div className="absolute w-fit h-full left-0 flex flex-col justify-center">
                                <div className="p-3 lg:p-5 rounded-[50%] bg-white text-marketingBlue-100 text-2xl lg:text-4xl z-10">
                                    <h2 className="w-7 h-7 font-marketBold">1</h2>
                                </div>
                            </div>
                            <div className="w-full h-fit py-5 pl-12 lg:pl-16 pr-6 bg-primary-400 rounded-2xl itemShadow">
                                <h6 className="text-white text-base lg:text-xl text-left">
                                    Fully compliant. All <span className="font-semibold"> North American Exchanges have approved our shares </span> for services contracts since 2012
                                </h6>
                            </div>
                        </div>
                        <div className="relative w-full lg:w-[52%] h-fit pl-5 lg:pl-8 mb-5 lg:mb-0">
                            <div className="absolute w-fit h-full left-0 flex flex-col justify-center">
                                <div className="p-3 lg:p-5 rounded-[50%] bg-white text-marketingBlue-100 text-2xl lg:text-4xl z-10">
                                    <h2 className="w-7 h-7 font-marketBold">2</h2>
                                </div>
                            </div>
                            <div className="w-full h-fit py-5 pl-12 lg:pl-16 pr-6 border-2 border-white rounded-2xl itemShadow">
                                <h6 className="text-white text-base lg:text-xl text-left">
                                    Shares are issued in 5 installments over the twelve month term. (5 x $25,000) <br />Day 1 / Q1 / Q2 / Q3 / Q4
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 block lg:flex lg:justify-between">
                        <div className="relative w-full lg:w-[52%] h-fit pl-5 lg:pl-8 mb-5 lg:mb-0">
                            <div className="absolute w-fit h-full left-0 flex flex-col justify-center">
                                <div className="p-3 lg:p-5 rounded-[50%] bg-white text-marketingBlue-100 text-2xl lg:text-4xl z-10">
                                    <h2 className="w-7 h-7 font-marketBold">3</h2>
                                </div>
                            </div>
                            <div className="w-full h-fit py-5 pl-12 lg:pl-16 pr-6 border-2 border-white rounded-2xl itemShadow">
                                <h6 className="text-white text-base lg:text-xl text-left">
                                    The number of <span className="font-semibold">shares issued </span> at each period is determined by 
                                    <span className="font-semibold"> share price at that time</span>
                                </h6>
                            </div>
                        </div>
                        <div className="relative w-full lg:w-[40%] h-fit pl-5 lg:pl-8 mb-5 lg:mb-0">
                            <div className="absolute w-fit h-full left-0 flex flex-col justify-center">
                                <div className="p-3 lg:p-5 rounded-[50%] bg-white text-marketingBlue-100 text-2xl lg:text-4xl z-10">
                                    <h2 className="w-7 h-7 font-marketBold">4</h2>
                                </div>
                            </div>
                            <div className="w-full h-fit py-5 pl-12 lg:pl-16 pr-6 bg-primary-400 rounded-2xl itemShadow">
                                <h6 className="text-white text-base lg:text-xl text-left">
                                    Each issuance comes with a <span className="font-semibold"> 4-month hold period </span>
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center w-full h-fit mt-8 lg:mt-12 mb-16 lg:mb-0">
                        <div className="w-full lg:w-[60%]">
                            <h6 className="text-base lg:text-xl">
                                This is the friendliest compensation structure in the industry.
                                <span className="font-semibold"> AGORACOM becomes a <span className="text-primary-400"> long-term shareholder </span> </span> and fully aligns with you
                            </h6>
                            <h6 className="text-xs lg:text-sm italic mt-5">Compare this to cheque swap deals that are predatory and 100% NON-COMPLIANT</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </>
  );
};

export default ComplaintSection;
