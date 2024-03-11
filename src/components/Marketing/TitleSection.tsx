import React from "react";
import Logo from "../../images/Agoracom-Logo.png";
import Image from "next/image";
// import SiteHeader from "@/app/SiteHeader";

const TitleSection: React.FC<any> = ({className}) => {
  return (
    <>
        {/* <SiteHeader /> */}
        <div className={`relative container-fluid w-full h-[90vh] bg-marketingBlue-100 ${className}`}>
            <div className="absolute z-10 top-[50%] w-full left-[50%] translate-y-[-50%] text-center translate-x-[-50%]">
                <h1 className="text-white relative text-5xl lg:text-8xl font-marketBold">AGORACOM</h1>
                <h3 className="text-primary-400 relative mt-2 text-[2.6vh] lg:text-[5.7vh] h-[5vh] font-marketBold">CASHLESS & COMPLIANT</h3>
                <h3 className="text-[6.2vh] lg:text-[107px] relative font-marketBold mt-1 lg:mt-8 h-[65px] stokeClass">AI ONLINE</h3>
                <h3 className="text-white relative -mt-6 lg:mt-2 text-2xl lg:text-[6.3vh] font-marketBold">MARKETING PROGRAM</h3>
                <div className="h-full w-full flex justify-center mt-20">
                    <Image 
                        // fill 
                        src={Logo} 
                        width={280}
                        alt="Agoracom" 
                        className="relative w-60" 
                    />
                </div>
            </div>
        </div> 
    </>
  );
};

export default TitleSection;
