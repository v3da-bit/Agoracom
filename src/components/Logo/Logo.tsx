import React from "react";
import logoImg from "@/images/logo.png";
import logoWhite from "@/images/White-agoracom.svg";
import LogoSvg from "./LogoSvg";
import Link from "next/link";
import Image from "next/image";

export interface LogoProps {
  img?: string;
  className? : string;
  isFooter?: boolean;
}

const styles = {
  width: "80%"
};

const Logo: React.FC<LogoProps> = ({
  isFooter = false,
  img = isFooter ? logoWhite : logoImg,
  className = "",
}) => {
  return (
    <Link
      href="/"
      className={`ttnc-logo lg:inline-block text-primary-6000 flex-shrink-0 ${className}`}
    >
      {/* THIS USE FOR MY MULTI DEMO */}
      {/* IF YOU ARE MY CLIENT. PLESE DELETE THIS CODE AND YOU YOUR IMAGE PNG BY BELLOW CODE */}
      {/* <LogoSvg /> */}
      <Image alt="Agoracom" style={styles} src={img} width={130} />
    </Link>
  );
};

export default Logo;
