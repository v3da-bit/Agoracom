import React from "react";
import Logo from "../../images/Agoracom-Logo.png";
import Image from "next/image";
import George from "../../images/Marketing/george.png";
import CloudBox from "../../images/Marketing/Cloud-box.png";
import Quote from "../../images/Marketing/quote.png";

const PartnerSection: React.FC<any> = ({className}) => {
  return (
    <div className={`relative container-fluid bg-[#EEE] w-full h-[115vh] lg:h-[100vh] ${className}`}>
        <Image 
            alt="" 
            src={CloudBox} 
            className="hidden lg:block w-[73%] h-[75.5%] absolute top-36 left-0"
        />
        <Image 
            className="absolute right-0 z-20 max-w-none w-[170%] lg:w-[80%] bottom-0"
            src={George} 
            alt="George" 
        />
        <Image 
            src={Quote} 
            alt="" 
            className="absolute hidden lg:block left-20 w-40 top-12"
        />
        <Image 
            src={Quote} 
            alt="" 
            className="absolute hidden lg:block left-[45%] rotate-180 w-40 top-[78%]"
        />
        <div className="relative p-7 sm:text-justify lg:p-0 lg:absolute lg:w-[45%] left-0 lg:!left-56 top-8 lg:top-60">
            <h5 className="text-xl sm:text-justify md:text-xl lg:text-[1.5vw]">
                “For <b>26 years Agoracom has pioneered</b> and delivered insanely great <b>digital marketing programs to small cap companies</b> for one reason. I love the little guy and I want them to win …
            </h5>
            <h5 className="text-xl sm:text-justify lg:text-[1.5vw] mt-8 w-[94%]">
                I don’t wake up in the morning to make money. <b>I wake up thinking that today is the day I will discover the next great company</b> - and that <b>Agoracom</b> is the vehicle that will help bring that story to investors who are looking for the exact same thing”
            </h5>
        </div>
        <div className="absolute w-fit bg-marketingBlue-100 right-0 z-30 bottom-12 lg:bottom-16 py-3 px-8 pr-20">
            <h3 className="text-white text-xl lg:text-2xl font-semibold">George Tsiolis LL.B.</h3>
            <h5 className="text-white text-base lg:text-xl font-semibold">Founder & Chief Executive</h5>
        </div>
    </div> 
  );
};

export default PartnerSection;
