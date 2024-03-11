import React, { FC } from "react";
import ButtonCircle from "@/components/Button/ButtonCircle";
import rightImg from "@/images/SVG-subcribe2.png";
import Badge from "@/components/Badge/Badge";
import Input from "@/components/Input/Input";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Heading from "../Heading/Heading";

const NewsLetterBg: FC<any> = ({ className = "" }) => {
  return (
    <>
        <div className="bg-secondary-800 h-64 w-[110%] -ml-2 absolute rotate-1">
        </div>
        <div className="bg-defaultBlue-100 h-64 w-[110%] -ml-2 absolute -rotate-1">
        </div>
    </>
  );
};

export default NewsLetterBg;
