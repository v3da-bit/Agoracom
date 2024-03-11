import React from "react";
// import Logo from "../../images/Agoracom-Logo.png";
// import Image from "next/image";
// import LineLayer from "../../images/Marketing/Line-icon-layer.png";
// import LineLayerMobile from "../../images/Marketing/Line-icon-layer-mobile.png";
// import GreenLine from "../../images/Marketing/Green-Line.png";
// import YoutubeVideo from "../../images/Marketing/Youtube-video-1.png";
// import Link from "next/link";

const AISection: React.FC<any> = ({className}) => {
  return (
    <>
        <div className={`relative container-fluid w-full h-fit lg:h-[100vh] bg-[#EDEDED] ${className}`}>
            <div className="container w-full h-full flex flex-col justify-center">
                <div className="w-full h-fit mt-16 mb-16 lg:mt-0 lg:mb-0">
                    <h2 className="text-3xl lg:text-6xl font-marketBold text-marketingBlue-100">
                        OUR <span className="text-primary-400"> ARTIFICIAL <br /> INTELLIGENCE </span> LEADERSHIP
                    </h2>
                    <h4 className="text-2xl lg:text-4xl font-marketBold text-marketingBlue-100 mt-5">AI is exciting and full of endless possibilities</h4>
                    <h5 className="text-xl lg:text-2xl text-marketingBlue-100">
                        But companies lack the expertise to utilize it 
                        <span className="font-marketBold"> beyond ChatGPT.</span>
                    </h5>
                    <h5 className="text-xl lg:text-2xl text-marketingBlue-100 mt-5">
                        Incorporating AI isn't just a feature for AGORACOM.
                    </h5>
                    <h5 className="text-xl lg:text-2xl text-marketingBlue-100">
                        It is fully <span className="font-marketBold italic"> integrated into our processes on your behalf.</span>
                    </h5>
                    <div className="mt-6 block lg:flex">
                        <div className="rounded-3xl w-full lg:w-[16%] bg-white h-fit pl-7 pb-5 mr-12 mb-5 lg:mb-0">
                            <div className="rounded-3xl w-full h-fit bg-marketLightBlue-100 text-white py-3 px-7">
                                We have a Chief Artificial Intelligence Officer
                            </div>
                        </div>
                        <div className="rounded-3xl w-full lg:w-[19%] bg-white h-fit pl-7 pb-5 mr-12 mb-5 lg:mb-0">
                            <div className="rounded-3xl w-full h-fit bg-primary-500 text-white py-3 px-7">
                                We have created and fully trained AI Agents for every single client
                            </div>
                        </div>
                        <div className="rounded-3xl w-full lg:w-[20%] bg-white h-fit pl-7 pb-5 mb-5 lg:mb-0">
                            <div className="rounded-3xl w-fit h-fit bg-marketLightBlue-100 text-white py-3 px-7">
                                Our Prompt Engineering is light years ahead of the industry
                            </div>
                        </div>
                    </div>
                    <h5 className="mt-5 text-xl lg:text-2xl text-marketingBlue-100 w-full lg:w-[80%]">
                        All of this translates into transforming graphics, refining messaging and <span className="font-marketBold"> 
                        creating new types of content that was never before imagined, </span> let alone possible for small cap companies before now.
                    </h5>
                    <h6 className="py-1 px-3 w-fit border-[1px] rounded-xl border-primary-400 text-base lg:text-xl text-marketingBlue-100 mt-5">
                        We have your AI needs covered here, so 
                        <span className="font-marketBold"> you don’t have to worry about it there.</span>
                    </h6>
                </div>
            </div>
        </div> 
    </>
  );
};

export default AISection;
