import React, { FC } from "react";
import NcImage from "@/components/NcImage/NcImage";
import { PostDataType } from "@/data/types";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import PostTypeFeaturedIcon from "@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import Link from "next/link";
import NcModal from "../NcModal/NcModal";
import Image from "next/image";
import NcPlayIcon from "../NcPlayIcon/NcPlayIcon";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Stories from 'react-insta-stories';
import PrevBtn from "@/components/NextPrev/PrevBtn";
import NextBtn from "@/components/NextPrev/NextBtn";

export interface ProgressBar {
  className?: string;
  value?: number;
}

const ProgressBar: FC<ProgressBar> = ({className, value}) => {
  
  return (
    <div className={`border-2 rounded border-white w-full ${className}`}>
        
    </div>
  );
};

export default ProgressBar;
