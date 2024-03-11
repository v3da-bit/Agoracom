import React from "react";
import Logo from "../../images/Agoracom-Logo.png";
import Image from "next/image";
import George from "../../images/Marketing/george.png";
import CloudBox from "../../images/Marketing/Cloud-box.png";
import Quote from "../../images/Marketing/quote.png";
import Button from "../Button/Button";
import Progress from "../../images/Marketing/Progress.png";

const PresentationSection: React.FC<any> = ({className}) => {
  return (
    <div className={`relative container-fluid w-full h-fit lg:h-[100vh] bg-marketingBlue-100 grid pb-12 lg:pb-0 grid-cols-1 lg:grid-cols-2`}>
        <div className="w-full text-white flex flex-col p-0 pt-12 mb-10 lg:mb-0 lg:p-36 lg:pl-0 lg:pr-0 justify-end">
            <div className="flex justify-end">
                <div className="w-full lg:w-fit h-fit text-center">
                    <h2 className="font-marketBold text-3xl lg:text-6xl">
                        <span className="stokeClass">BEYOND</span> A MERE
                    </h2>
                    <h2 className="font-marketBold text-primary-400 tracking-wider text-3xl lg:text-6xl">
                        PRESENTATION
                    </h2>
                </div>
            </div>
            <div className="w-[95%] lg:w-full h-fit border-[1px] border-l-0 mt-7 sm:mr-7 p-4 lg:pr-8 text-right flex justify-end rounded-e-2xl border-primary-400">
                <h3 className="font-marketBold text-left text-white text-right lg:text-left text-2xl lg:text-4xl w-full lg:w-[70%]">
                    Today, you're not just seeing a vendor proposal
                </h3>
            </div>
            <div className="w-[95%] lg:w-full h-fit mt-2 lg:mt-3 p-4 lg:pr-8 text-right flex justify-end border-primary-400">
                <h3 className="font-marketBold text-left text-white text-right lg:text-left text-xl lg:text-3xl w-full lg:w-[70%]">
                    You are discovering what you once thought was impossible
                </h3>
            </div>
        </div>
        <div className="w-full text-white flex justify-center">
            <div className="w-[90%] lg:w-[60%] h-fit flex">
                <Image 
                    alt="" 
                    src={Progress} 
                    className="w-10 h-fit"
                />
                <div className="grow mt-28 pl-4">
                    <h3 className="font-marketBold text-left text-white text-xl leading-0 lg:text-[2vw] lg:leading-9">
                        A <span className="text-primary-400">digital marketing program</span> for your company that you always dreamed of
                    </h3>
                    <h3 className="font-marketBold text-left text-white  text-xl leading-0 lg:text-[2vw] lg:leading-9 mt-12 lg:mt-8">
                        With a partner who puts their <span className="text-primary-400">money</span> where their mouth is
                    </h3>
                    <Button
                        sizeClass="py-3 px-4 sm:px-6"
                        pattern="primary"
                        className="mt-8"
                    >
                        Let's Begin
                    </Button>
                </div>
            </div>
        </div>
    </div> 
  );
};

export default PresentationSection;
