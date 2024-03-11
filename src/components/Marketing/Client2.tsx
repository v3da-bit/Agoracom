import React from "react";
import Logo from "../../images/Agoracom-Logo.png";
import Image from "next/image";
// import SiteHeader from "@/app/SiteHeader";
import Pattern from "../../images/Marketing/Corner-Pattern.png";
import fourth from "../../images/Marketing/fourth.png";
// import second from "../../images/Marketing/second.jpg";
import fifth from "../../images/Marketing/fifth.png";
import PopoverSection from "../Popover/Popover";

const Client2Section: React.FC<any> = ({className}) => {
  return (
    <>
        {/* <SiteHeader /> */}
        <div className={`relative container-fluid w-full h-fit lg:h-[100vh] bg-[#E5E5E5] ${className}`}>
        <Image 
                alt="" 
                src={Pattern} 
                className="absolute left-0 top-0 w-24 lg:w-28" 
            />
            <div className="h-fit lg:min-h-[50vh] text-center z-20">
                <h2 className="font-marketBold text-3xl lg:text-[4.8vw] lg:leading-[3.2rem] min-h-[30vh] lg:min-h-[50vh] flex flex-col justify-center"><span className="h-fit">WHAT OUR <span className="stokeClassBlack">CLIENTS</span> SAY</span></h2>
            </div>
            <div className="pt-12 pb-12 lg:pb-0 lg:pt-0 h-fit lg:min-h-[50vh] bg-marketLightBlue-100">
                <div className="container h-fit grid grid-cols-1 lg:grid-cols-2">
                    <div className="w-fit h-fit mx-auto mt-10 lg:mt-[25vh] relative">
                        <PopoverSection className="top-0 lg:-top-[20.5vw]" content={[
                            <span key="9" className="font-semibold italic">AGORACOM is not a vendor, they are a partner. </span>, 
                            'They take the time to truly understand our business, our story and our value proposition to investors. ', 
                            <span key="10" className="font-semibold italic">AGORACOM is invested in our success </span>, 
                            'and is committed to not just sharing our story but actually helping create value for shareholders. There is no other service available to public companies that is directly comparable or of similar value.'
                        ]} />
                        <div className="flex relative mt-7 lg:mt-0">
                            <Image 
                                alt="" 
                                src={fourth}
                                className="w-20 h-20 rounded-[50%] itemShadow object-cover" 
                            />
                            <div className="relative w-fit h-fit my-auto ml-4 text-white">
                                <div>
                                    <h4 className="font-marketBold font-semibold text-2xl">Cameron Chell</h4>
                                    <h5 className="font-semibold text-base">Draganfly Innovations Inc</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-fit h-fit mx-auto mt-10 lg:mt-[25vh] relative">
                        <PopoverSection className="top-0 lg:-top-[23vw]" content={[
                            <span key="7" className="font-semibold italic">Working with Agoracom for the past few years has been a game-changer for ImagineAR. </span>, 
                            'Their expert guidance and strategic insights have not only increased our investor confidence but also significantly ', 
                            <span key="8" className="font-semibold italic">improved our market exposure. </span>, 
                            'Their dedication, professionalism, and commitment to our success have made them an invaluable partner in our journey towards becoming a leading augmented reality solution for sports and entertainment around the world.'
                        ]} />
                        <div className="flex relative mt-7 lg:mt-0">
                            <Image 
                                alt="" 
                                src={fifth}
                                className="w-20 h-20 rounded-[50%] itemShadow object-cover" 
                            />
                            <div className="relative w-fit h-fit my-auto ml-4 text-white">
                                <div>
                                    <h4 className="font-marketBold font-semibold text-2xl">Robert Anson</h4>
                                    <h5 className="font-semibold text-base">FOBI AI Inc.</h5>
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

export default Client2Section;
