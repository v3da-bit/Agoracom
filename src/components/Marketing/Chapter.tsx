import React from "react";
import Logo from "../../images/Agoracom-Logo.png";
import Image from "next/image";
import LineLayer from "../../images/Marketing/Line-icon-layer.png";
import LineLayerMobile from "../../images/Marketing/Line-icon-layer-mobile.png";
import GreenLine from "../../images/Marketing/Green-Line.png";
import Logo_HD from "../../images/Marketing/Agoracom_hd.png";
import Link from "next/link";

const ChapterSection: React.FC<any> = ({className}) => {
  return (
    <>
        <div className={`relative container-fluid w-full h-fit lg:h-[100vh] bg-secondary-500 ${className}`}>
            <div className="container w-full h-full flex flex-col justify-center py-16 lg:py-0">
                <div className="w-full h-fit flex justify-center text-center">
                    {/* <div className="w-fit h-fit"> */}
                        <h2 className="text-white bg-primary-500 itemShadow text-3xl lg:text-6xl w-fit h-fit font-marketBold rounded-2xl py-2 lg:py-3 px-5 lg:px-7">
                            BEGIN YOUR NEXT
                        </h2>
                    {/* </div> */}
                </div>
                <div className="w-full h-fit flex justify-center text-center">
                    <h2 className="text-white text-3xl lg:text-6xl w-fit h-fit font-marketBold">
                        <span className="stokeClass">CHAPTER </span>WITH
                    </h2>
                </div>
                <div className="w-full h-fit flex justify-center text-center my-5">
                    <Image src={Logo_HD} alt="" className="w-[80%] lg:w-[30%]" />
                </div>
                <div className="w-full h-fit flex justify-center text-center">
                    <h5 className="text-xl lg:text-3xl py-2 rounded-xl px-5 bg-marketingBlue-100 text-white">We don't just offer services. <span className="text-primary-400 font-marketBold"> We craft legacies</span></h5>
                </div>
                <div className="w-full h-fit grid grid-cols-1 lg:grid-cols-3 gap-5 mt-8">
                    <div className="border-[2px] border-primary-400 rounded-2xl w-full h-fit text-white text-base lg:text-xl p-5">
                        From pioneering digital marketing to revolutionizing it with AI, <span className="font-semibold"> we've been leading for <span className="text-primary-400"> 25 years.</span></span>
                    </div>
                    <div className="border-[2px] border-primary-400 rounded-2xl w-full h-fit text-white text-base lg:text-xl p-5">
                        We're now inviting you to <span className="font-semibold"> lead with us</span>.
                    </div>
                    <div className="border-[2px] border-primary-400 rounded-2xl w-full h-fit text-white text-base lg:text-xl p-5">
                        If you are ready to redefine your image, digital narrative and captivate audiences, <span className="font-semibold italic"> let's embark on this journey.</span>
                    </div>
                </div>
                <div className="w-full h-fit flex justify-center text-center mt-7 lg:mt-10">
                    <h4 className="text-white text-base lg:text-2xl h-fit w-full lg:w-[65%]">
                        Let <span className="font-semibold text-primary-400"> AGORACOM </span> be your partner and <span className="font-semibold"> tell your story like it’s always deserved to be told</span>
                    </h4>
                </div>
            </div>
        </div> 
    </>
  );
};

export default ChapterSection;
