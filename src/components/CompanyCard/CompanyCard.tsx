"use client";

import React, { FC, useState } from "react";
import PostCardSaveAction from "@/components/PostCardSaveAction/PostCardSaveAction";
import { PostDataType } from "@/data/types";
// import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import PostCardLikeAndComment from "@/components/PostCardLikeAndComment/PostCardLikeAndComment";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import PostFeaturedMedia from "@/components/PostFeaturedMedia/PostFeaturedMedia";
import Link from "next/link";
import Image from "next/image";
import Button from "../Button/Button";
import DefaultAvatar from '@/images/default-image.jpg';
import { useRouter } from "next/navigation";
import { addFavouriteCompany, removeFavouriteCompany } from "@/requests/Home";

export interface Card11Props {
    className?: string;
    post: any;
    ratio?: string;
    hiddenAuthor?: boolean;
    showLikeSection?: boolean;
    showDesc?: boolean;
    showCompanyFooter?: boolean;
    loggedIn?: any;
}

const CompanyCard: FC<Card11Props> = ({
    className = "h-full",
    ratio = "aspect-w-4 aspect-h-3",
    post,
    loggedIn
}) => {

    const router = useRouter();
    const [follow, setFollow] = useState(post.followed);
    const [followLoader, setFollowLoader] = useState(false);
    const { external_website, industry, name, outstanding_shares, small_logo_url, stock_exchange, summary, tidy_ticker } = post;

    const getLink = (url: string) => {
        if (url?.includes('www.')) {
            return url.split('www.')[1];
        } else {
            return url;
        }
    }

    const getUrl = (url: any) => {
        if (url.toString().includes("s3.amazonaws.com")) {
            return url;
        } else {
            return DefaultAvatar;
        }
    }

    const favouriteFollow = async () => {
        if (loggedIn) {
            try {
                if (follow) {
                    setFollowLoader(true);
                    const response = await removeFavouriteCompany(post?.id)
                    setFollowLoader(false);
                    if (response.status == 200) {
                        setFollow(false)
                    }
                } else {
                    setFollowLoader(true);
                    const response = await addFavouriteCompany(post?.id)
                    setFollowLoader(false);
                    if (response.status == 201) {
                        setFollow(true)
                    }
                }
            } catch (e: any) {
                console.log(e);
            }
        } else {
            router.push('/auth/login')
        }
    }

    return (
        <div
            className={`nc-Card11 dark:bg-neutral-900 relative flex flex-col group rounded-l overflow-hidden bg-white p-7 ${className}`}
        >
            <div className="flex mb-5">
                <div
                    title={name}
                    className={`w-20 flex-shrink-0 relative rounded-lg overflow-hidden z-0 mr-4 group`}
                >
                    <div className={`w-full h-0 aspect-w-1 aspect-h-1`}>
                        <Image
                            alt="featured"
                            sizes="100px"
                            className="object-cover w-full h-full group-hover:scale-110 transform transition-transform duration-300"
                            src={getUrl(small_logo_url)}
                            fill
                            title={name}
                        />
                    </div>
                </div>
                <div className="pt-2 flex flex-col space-y-3">
                    <h3 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100">
                        <span className="line-clamp-2" title={name}>
                            {name}
                        </span>
                    </h3>
                </div>
            </div>
            <div className="w-full flex justify-between mb-5">
                <div className="w-fit">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 font-normal">
                        Symbol:
                    </span>
                    <span className="text-sm block text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
                        {tidy_ticker}
                    </span>
                </div>
                <div className="w-fit">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 font-normal">
                        Exchange:
                    </span>
                    <span className="text-sm block text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
                        {stock_exchange}
                    </span>
                </div>
                <div className="w-fit">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 font-normal">
                        Shares:
                    </span>
                    <span className="text-sm block text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
                        {outstanding_shares}
                    </span>
                </div>
            </div>
            <div className="w-full py-5 flex border-y-[1px] justify-between mb-5">
                <div className="w-fit">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 font-normal">
                        Industry:
                    </span>
                    <span className="text-xs block font-semibold cursor-pointer text-defaultBlue-100 dark:text-defaultBlue-100 dark:hover:text-white font-medium">
                        {industry}
                    </span>
                </div>
                <div className="w-fit">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 font-normal">
                        Website:
                    </span>
                    <span className="text-xs block font-semibold cursor-pointer text-defaultBlue-100 dark:text-defaultBlue-100 dark:hover:text-white font-medium">
                        <Link href={external_website || ''}>{getLink(external_website)}</Link>
                    </span>
                </div>
            </div>
            <div className="text-justify h-28 mb-6">
                <span className="text-neutral-600 text-sm line-clamp-6">
                    {summary || ''}
                </span>
            </div>
            <Button pattern="primary" className="w-full !border-0" loading={followLoader} onClick={favouriteFollow} sizeClass="!py-2 !px-3 sm:!py-3 sm:!px-6">
                {follow ? 'Followed' : 'Follow Hub'}
            </Button>
        </div>
    );
};

export default CompanyCard;
