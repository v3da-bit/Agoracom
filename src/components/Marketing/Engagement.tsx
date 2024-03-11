import React from "react";
import Image from "next/image";
import CornerPattern from "../../images/Marketing/Corner-Pattern.png";
import GreenDotLine from "../../images/Marketing/Green-dot-line.png";
import Logo from "../../images/Agoracom-Logo.png";

const EngagementSection: React.FC<any> = ({className}) => {
  return (
    <>
        <div className={`relative container-fluid w-full h-fit lg:h-[100vh] bg-marketingBlue-100 ${className}`}>
            <Image 
                src={CornerPattern} 
                alt="" 
                className="absolute right-0 top-0 w-24 lg:w-32 rotate-90" 
            />
            <div className="container w-full flex flex-col justify-center h-full">
                <div className="w-full mt-16 lg:mt-0 z-10">
                    <h2 className="text-3xl lg:text-6xl font-marketBold text-center text-white">
                        Engagement Metrics:
                    </h2>
                    <h4 className="text-xl lg:text-3xl italic text-center text-white mt-2">Pages Read per Visit:</h4>
                    <div className="w-full flex justify-center relative mt-8 z-10">
                        <div className="w-full lg:w-[48%] h-fit flex justify-between px-7 lg:px-12 py-4 bg-[#384376] text-white rounded-xl itemShadow">
                            <Image 
                                src={Logo} 
                                alt="" 
                                className="w-36 lg:w-56" 
                            />
                            <h3 className="text-base lg:text-3xl font-marketBold text-white h-fit my-auto">9.28 pages</h3>
                        </div>
                    </div>
                    <div className="w-full flex justify-center -mt-6 pt-3">
                        <div className="h-fit w-[90%] lg:w-[44%] flex justify-between px-4 lg:px-8 pt-8 lg:pt-8 pb-4 border-[1px] border-white rounded-xl text-white">
                            <h4 className="font-bold text-base lg:text-2xl">Industry Standard:</h4>
                            <h4 className="font-bold text-base lg:text-2xl text-primary-400">2.0 pages</h4>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 mt-10 pb-10 lg:pb-0 text-white">
                        <div className="w-full h-full text-center py-3">
                            <h4 className="text-primary-400 font-bold text-2xl lg:text-3xl">
                                PERFORMANCE:
                            </h4>
                            <h2 className="text-4xl lg:text-6xl mt-7 font-marketBold">
                                <span className="text-primary-400">+</span>364%
                            </h2>
                            <h5 className="text-xl lg:text-2xl font-semibold">higher than the <br /> industry standard.</h5>
                        </div>
                        <hr className="block my-10 lg:hidden" />
                        <div className="border-0 lg:border-l-2 lg:border-r-2 border-white w-full h-full text-center pb-4">
                            <h4 className="border-2 rounded-2xl w-fit py-2 px-5 text-2xl mx-auto">
                                TIME SPENT PER VISIT:
                            </h4>
                            <h5 className="text-2xl font-semibold mt-7"><span className="text-primary-400">AGORACOM</span> <br /> 
                                8 mins 23 secs 
                            </h5>
                            <Image 
                                alt="" 
                                src={GreenDotLine} 
                                className="w-[80%] mx-auto my-5" 
                            />
                            <h6 className="text-xl w-full text-center">
                                Financial Services Sites Average: <br /> <span className="font-semibold">3 mins 13 secs</span>
                            </h6>
                        </div>
                        <hr className="block my-10 lg:hidden" />
                        <div className="w-full h-full text-center py-3">
                            <h4 className="text-primary-400 font-bold text-2xl lg:text-3xl">
                                PERFORMANCE:
                            </h4>
                            <h5 className="text-xl lg:text-2xl font-semibold mt-7">AGORACOM's <br /> engagement is <br /> 
                                <span className="text-4xl lg:text-6xl mt-7 font-marketBold">161%</span><br />
                                higher.
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </>
  );
};

export default EngagementSection;
