import React from "react";
import Logo from "../../images/Agoracom-Logo.png";
import Image from "next/image";
import LineItem from "../../images/Marketing/Line-item.png";

const Proof2Section: React.FC<any> = ({className}) => {
  return (
    <>
        <div className={`relative container-fluid w-full h-fit lg:h-[100vh] bg-primary-400 ${className}`}>
            <div className="grid grid-cols-1 h-full lg:grid-cols-2">
                <div className="w-full h-full">
                    <div className="w-full h-fit mt-10 lg:mt-24">
                        <h2 className="text-3xl lg:text-6xl font-marketBold text-white p-5 lg:p-0 lg:pl-[10vw]">
                            THE <span className="stokeClass">PROOF</span> IS <br /> IN THE NUMBERS
                        </h2>
                        <div className="bg-marketingBlue-100 w-[90%] lg:w-full mt-2 lg:mt-3 text-3xl lg:text-5xl text-white itemShadow rounded-r-2xl p-3 pl-5 lg:pl-[10vw]">
                            INDUSTRY SHATTERING
                            <span className="font-marketBold"> ENGAGEMENT</span>
                        </div>
                        <div className="pl-5 lg:pl-[10vw] mt-6 lg:mt-10">
                            <h4 className="mt-3 pr-5 lg:pr-0 text-xl lg:text-3xl text-white text-left lg:text-right">
                                Having <span className="font-marketBold"> massive traffic </span> is a good start
                            </h4>
                            <h4 className="pr-5 lg:pr-0 text-xl lg:text-3xl text-white text-left lg:text-right">
                                but  <span className="italic font-marketBold"> that is only half the story. </span>
                                {/* <span className="italic font-marketBold"> platform for investors.</span> */}
                            </h4>
                        </div>
                        {/* <div className="pl-5 lg:pl-[10vw] mt-10">
                            <h4 className="mt-3 pr-5 lg:pr-0 text-xl lg:text-3xl text-white">
                                <span className="font-marketBold">AGORACOM massive traffic results</span> serve as proof that we are a primary discovery 
                                <span className="italic font-marketBold"> platform for investors.</span>
                            </h4>
                            <h4 className="mt-8 pr-5 lg:pr-0 text-xl lg:text-3xl text-white">
                                Every visitor and view is a testament to the <span className="font-marketBold">compelling content we produce </span> 
                                and the 
                                <span className="font-marketBold"> audience we've cultivated</span>
                            </h4>
                        </div> */}
                    </div>
                </div>
                <div className="text-white w-full h-full relative mb-16 lg:mb-0">
                    <div className="relative lg:absolute w-full lg:w-[70%] mt-16 lg:mt-0 h-fit right-0 bottom-0 lg:bottom-28">
                        <div className="flex mt-6">
                            <h4 className="grow text-right text-xl lg:text-2xl pr-3 pl-3 lg:pl-0">
                                To truly be effective, investors have to actually be spending time <span className="font-marketBold">engaging with content we create</span> for you.
                            </h4>
                            <Image 
                                src={LineItem} 
                                alt="" 
                                className="w-20 lg:w-28 h-3 lg:h-4 mt-3" />
                        </div>
                        <div className="flex mt-6">
                            <h4 className="grow text-right text-xl lg:text-2xl pr-3 pl-3 lg:pl-0">
                                You’ll be happy to know we don’t just beat the competition, <span className="font-marketBold"> we shatter the metrics.</span>
                            </h4>
                            <Image 
                                src={LineItem} 
                                alt="" 
                                className="w-20 lg:w-28 h-3 lg:h-4 mt-3" />
                        </div>
                        <div className="flex mt-6">
                            <h4 className="grow text-right text-xl lg:text-2xl pr-3 pl-3 lg:pl-0">
                            This can only mean one thing. <span className="font-marketBold"> We create insanely great content for you.</span>
                            </h4>
                            <Image 
                                src={LineItem} 
                                alt="" 
                                className="w-20 lg:w-28 h-3 lg:h-4 mt-3" />
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </>
  );
};

export default Proof2Section;
