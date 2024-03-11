"use client";

import React, { FC, useState } from "react";
import PostCardSaveAction from "@/components/PostCardSaveAction/PostCardSaveAction";
import { PostDataType } from "@/data/types";
// import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import PostCardLikeAndComment from "@/components/PostCardLikeAndComment/PostCardLikeAndComment";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import PostFeaturedMedia from "@/components/PostFeaturedMedia/PostFeaturedMedia";
import Link from "next/link";
import moment from "moment";

export interface Card11Props {
  className?: string;
  post: any;
  ratio?: string;
  hiddenAuthor?: boolean;
  showLikeSection?: boolean;
  showDesc?: boolean;
  showCompanyFooter?: boolean;
  setModal?: any;
  industry?: boolean;
  screen?: string;
}

const Card11: FC<Card11Props> = ({
  className = "h-full",
  post,
  hiddenAuthor = false,
  ratio = "aspect-w-4 aspect-h-3",
  showLikeSection = false,
  showDesc = false,
  showCompanyFooter = false,
  industry = false
}) => {
  const { title, href, categories, date, desc, companyName, member, username, created_at, company_name } = post;

  const [isHover, setIsHover] = useState(false);
  console.log("Here");
  return (
    <div
      className={`nc-Card11 dark:bg-neutral-900 relative flex flex-col group rounded-xl overflow-hidden bg-white ${className}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    //
    >
      <div
        className={`block flex-shrink-0 relative w-full rounded-t-xl overflow-hidden z-10 ${ratio}`}
      >
        <div>
          <PostFeaturedMedia post={post} showPhoto={true} isHover={isHover} />
        </div>
      </div>
      {/* <Link href={'/'} className="absolute inset-0"></Link> */}
      {/* <span className="absolute top-3 inset-x-3 z-10">
        <CategoryBadgeList categories={categories} />
      </span> */}

      <div className="p-4 flex flex-col space-y-3">
        {!hiddenAuthor ? (
          <PostCardMeta meta={post} avatar="" />
        ) : <></>}
        <h3 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100">
          <span className="line-clamp-2" title={title}>
            <Link href={`/company/${post?.company_id}/discussion/${post?.id}`}>{title}</Link>
          </span>
        </h3>
        {
          showDesc ? (
            <span className="hidden text-sm sm:block my-3 text-neutral-500 dark:text-neutral-400 ">
              <span className="line-clamp-2"> {desc}</span>
            </span>
          ) : <></>
        }
        {
          showCompanyFooter ? (
            <div>
              <span className="hidden text-sm sm:block mt-12 mb-3 text-neutral-500 dark:text-neutral-400 ">
                <span className="line-clamp-2"> <Link href={`/members/${post?.user_id}`}><b className="text-defaultBlue-100 mr-0.5">{username}</b> </Link> {moment(created_at).format("ll")}</span>
                <span className="line-clamp-2 font-semibold text-xs  mt-1"><Link href={`/company/${post?.company_id}`}> {company_name} </Link></span>
              </span>
            </div>
          ) : <></>
        }
        {
          showLikeSection ? (
            <div className="flex items-end justify-between mt-auto">
              <PostCardLikeAndComment className="relative" />
              <PostCardSaveAction className="relative" />
            </div>
          ) : <></>
        }
      </div>
    </div>
  );
};

export default Card11;
