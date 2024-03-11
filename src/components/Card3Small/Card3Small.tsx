import React, { FC } from "react";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import { PostDataType } from "@/data/types";
import Link from "next/link";
import Image from "next/image";
import DefaultAvatar from '../../images/Icons/avatar.png';
import Avatar from "../Avatar/Avatar";

export interface Card3SmallProps {
  className?: string;
  post: any;
  avatar?: any;
  href?: any;
  type?: any;
  bigImage?: any;
  
}

const Card3Small: FC<Card3SmallProps> = ({ className = "h-full", post, avatar, href }) => {
  const { title, featuredImage, avatar_url, username } = post;
  const getUrl = (url: any) => {
    if (url.toString().includes("s3.amazonaws.com")) {
      return url;
    } else {
      return DefaultAvatar;
    }
  }

  return (
    <div
      className={`nc-Card3Small relative flex flex-row items-center ${className}`}
    >
      <div
        title={title}
        className={`block w-16 flex-shrink-0 relative rounded-lg overflow-hidden z-0 ms-4 group mr-8`}
      >
        <div className={`w-full h-0 aspect-w-1 aspect-h-1`}>
          <Link href={`/members/${post?.user_id}`}>
            <Avatar
              sizeClass="h-10 w-10 text-base"
              containerClassName="flex-shrink-0 me-3"
              radius="rounded-full"
              imgUrl={getUrl(avatar_url)}
              userName={username}
            />
          </Link>
          {/* <Image
            alt="featured"
            sizes="100px"
            className="object-cover w-full h-full group-hover:scale-110 transform transition-transform duration-300"
            src={featuredImage || DefaultImage}
            fill
            title={title}
          /> */}
        </div>
      </div>
      {/* <Link href={href} className="absolute inset-0" title={title}></Link> */}
      <div className="relative space-y-2">
        <h2 className="nc-card-title block text-sm sm:text-base font-medium sm:font-semibold text-neutral-900 dark:text-neutral-100">
          <Link href={href} className="line-clamp-2" title={title}>
            {title}
          </Link>
        </h2>
        <PostCardMeta meta={{ ...post, username: post?.company_name }} href={`/company/${post?.company_id}`} avatar={avatar_url} hiddenAvatar={true} />
      </div>


    </div>
  );
};

export default Card3Small;
