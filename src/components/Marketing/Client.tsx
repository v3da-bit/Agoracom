import React from "react";
import Logo from "../../images/Agoracom-Logo.png";
import Image from "next/image";
// import SiteHeader from "@/app/SiteHeader";
import Pattern from "../../images/Marketing/Corner-Pattern.png";
import first from "../../images/Marketing/first.jpeg";
import second from "../../images/Marketing/second.jpg";
import third from "../../images/Marketing/third.jpeg";
import PopoverSection from "../Popover/Popover";

const ClientSection: React.FC<any> = ({className}) => {
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
            <div className="pt-12 pb-12 lg:pb-0 lg:pt-0 h-fit lg:min-h-[50vh] bg-primary-500">
                <div className="container h-fit grid grid-cols-1 lg:grid-cols-3">
                    <div className="w-fit h-fit mx-auto mt-10 lg:mt-[25vh] relative">
                        <PopoverSection className="top-0 lg:-top-[19vw]" content={[
                                <span key="1" className="font-semibold italic">“Make no mistake; George Tsiolis is hands down, </span>, 
                                'one of the most enthusiastic people I have ever had the pleasure to work with. ', 
                                <span key="2" className="font-semibold italic">George helped transform our Company's investor relations, </span>, 
                                'and the results were fantastic. Smart, savvy and a CEO of a unique firm sums up the tremendous assets George possesses and will lend to any organization.”'
                            ]} />
                        <div className="flex relative mt-7 lg:mt-0">
                            <Image 
                                alt="" 
                                src={first}
                                className="w-20 h-20 rounded-[50%] itemShadow" 
                            />
                            <div className="relative w-fit h-fit my-auto ml-4 text-marketingBlue-100">
                                <div>
                                    <h4 className="font-marketBold font-semibold text-2xl">Matthew Schissler</h4>
                                    <h5 className="font-semibold text-base">Pyrenees Investments, LLC</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-fit h-fit mx-auto mt-10 lg:mt-[20vh] relative">
                        <PopoverSection className="top-0 lg:-top-[16.5vw]" content={[
                            <span key="3" className="font-semibold italic">“George was an early mover and an innovator </span>, 
                            'in offering a low-cost, comprehensive Internet IR solution for emerging small cap public companies. ', 
                            <span key="4" className="font-semibold italic">Agoracom remains a good alternative for companies looking to raise their profile with investors </span>, 
                            'on the web at a reason- able cost.”'
                        ]} />
                        <div className="flex relative mt-7 lg:mt-0">
                            <Image 
                                alt="" 
                                src={second}
                                className="w-20 h-20 rounded-[50%] itemShadow" 
                            />
                            <div className="relative w-fit h-fit my-auto ml-4 text-marketingBlue-100">
                                <div>
                                    <h4 className="font-marketBold font-semibold text-2xl">Donald Bubar</h4>
                                    <h5 className="font-semibold text-base">Avalon Advanced Materials Inc.</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-fit h-fit mx-auto mt-10 lg:mt-[25vh] relative">
                        <PopoverSection className="top-0 lg:-top-[15.3vw]" content={[
                            <span key="5" className="font-semibold italic">“George is a professional in every facet of his activities. </span>, 
                            'His energy and creativity are inspirational and for many, contagious - which is great for the people around him. More than anything, he is a true gentleman who ', 
                            <span key="6" className="font-semibold italic">I feel honoured to know.” </span>
                        ]} />
                        <div className="flex relative mt-7 lg:mt-0">
                            <Image 
                                alt="" 
                                src={third}
                                className="w-20 h-20 rounded-[50%] itemShadow" 
                            />
                            <div className="relative w-fit h-fit my-auto ml-4 text-marketingBlue-100">
                                <div>
                                    <h4 className="font-marketBold font-semibold text-2xl">Peter Traynor</h4>
                                    <h5 className="font-semibold text-base">Canadian Securities Exchange</h5>
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

export default ClientSection;
