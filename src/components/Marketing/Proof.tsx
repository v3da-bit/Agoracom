import React from "react";
import Logo from "../../images/Agoracom-Logo.png";
import Image from "next/image";
import MobileDevice from "../../images/Marketing/Mobile-Device.png";
import LineDesign from "../../images/Marketing/line-design.png";

const ProofSection: React.FC<any> = ({className}) => {
  return (
    <>
        <div className={`relative container-fluid w-full h-fit lg:h-[100vh] bg-marketingBlue-100 ${className}`}>
            <div className="grid grid-cols-1 h-full lg:grid-cols-2">
                <div className="w-full h-full flex flex-col justify-center">
                    <div className="w-full h-fit mt-10 lg:my-auto">
                        <h2 className="text-3xl lg:text-6xl font-marketBold text-white p-5 lg:p-0 lg:pl-[10vw]">
                            THE <span className="stokeClass">PROOF</span> IS <br /> IN THE NUMBERS
                        </h2>
                        <div className="bg-primary-400 w-[90%] lg:w-full font-marketBold mt-2 lg:mt-3 text-3xl lg:text-6xl text-white itemShadow rounded-r-2xl p-3 pl-5 lg:pl-[10vw]">
                            <span>MASSIVE TRAFFIC</span>
                        </div>
                        <div className="pl-5 lg:pl-[10vw] mt-10">
                            <h4 className="mt-3 pr-5 lg:pr-0 text-xl lg:text-3xl text-white">
                                <span className="font-marketBold">AGORACOM massive traffic results</span> serve as proof that we are a primary discovery 
                                <span className="italic font-marketBold"> platform for investors.</span>
                            </h4>
                            <h4 className="mt-8 pr-5 lg:pr-0 text-xl lg:text-3xl text-white">
                                Every visitor and view is a testament to the <span className="font-marketBold">compelling content we produce </span> 
                                and the 
                                <span className="font-marketBold"> audience we've cultivated</span>
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="text-white flex pl-0 py-10 lg:py-0 lg:pl-[15%]">
                    <div className="w-full lg:w-[55%] flex h-full flex-col justify-center">
                        <Image 
                            alt="Mobile Marketing" 
                            src={MobileDevice} 
                            className="w-full h-auto" 
                        />
                    </div>
                    <div className="hidden lg:flex w-[45%] text-right flex-col justify-center">
                        <div className="w-full flex justify-end">
                            <Image 
                                alt="" 
                                src={LineDesign} 
                                className="w-[70%] h-fit" 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </>
  );
};

export default ProofSection;
