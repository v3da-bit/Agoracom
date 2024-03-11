"use client";

import React, { FC, Fragment, useState } from "react";
import Button from "../Button/Button";
import Heading from "../Heading/Heading";
import Nav from "@/components/Nav/Nav";
import NavItem from "../NavItem/NavItem";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import WidgetAuthors from "../WidgetAuthors/WidgetAuthors";
import { DEMO_POSTS } from "@/data/posts";
import Card3Small from "../Card3Small/Card3Small";
import { ChevronDownIcon, EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import Input from "../Input/Input";
import ButtonCircle from "../Button/ButtonCircle";
import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import Select from "../Select/Select";
import ButtonPrimary from "../Button/ButtonPrimary";

export interface SectionHero2Props {
    className?: string;
    heading: string;
    topMembers: any;
    discussions: any;
    topCompanies?: any;
    pageInfo?: any;
    getMembers?: any;
    getCompanies?: any;
    loader?: any;
    getDiscussion?: any;
    topic?: any;
    setTopic?: any;
    tab?: any;
    setTab?: any
}
const ThreadSection: FC<SectionHero2Props> = ({
    className,
    heading,
    topMembers,
    discussions,
    topCompanies,
    pageInfo = null,
    getMembers,
    getCompanies,
    loader,
    getDiscussion,
    setTopic,
    topic,
    setTab,
    tab
}) => {
    const tabs: any = [
        { id: "posts", title: "Posts", icon: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" },
        { id: "threads", title: "Threads", icon: "M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" }
    ]
    const menuDropdown: any = {
        "my_feed": "My Feed",
        "featured": "Featured",
        "followed_companies": "Followed Companies",
        "followed_posts": "Followed Posts",
        "followed_members": "Followed Members",
        "trending": "Trending",
        "top_rated": "Top Rated",
        "newest": "Newest",
    };

    const handleClickTab = (item: string) => {
        if (item === tab) {
            return;
        }
        setTab(item);
        let current_topic: any = topic;
        if (current_topic === 'my_feed') {
            current_topic = "featured";
            setTopic(current_topic);
        }
        getDiscussion(item, current_topic);
    };

    const handleTopicChange = (val: string) => {
        setTopic(val);
        getDiscussion(tab, val);
    }

    const posts = DEMO_POSTS.filter(
        (_, i) => i > 2 && i < 7
    );

    return (
        <div className={`nc-SectionGridPosts relative ${className}`}>
            <Heading desc={""} isCenter>
                {heading}
            </Heading>
            <div className="flex-none lg:flex gap-6">
                <div className="grow">
                    <div className="flex-none lg:flex justify-between mb-7">
                        <Nav
                            className="sm:space-x-2 rtl:space-x-reverse"
                            containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base"
                        >
                            {tabs.map((item: any, index: number) => (
                                <NavItem
                                    key={item.id}
                                    isActive={tab === item.id}
                                    onClick={() => handleClickTab(item.id)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                    </svg>
                                    {item.title}
                                </NavItem>
                            ))}
                        </Nav>
                        <div className="flex mt-3 -mb-3 lg:mt-0 lg:mb-0">
                            <Select menuDropdown={menuDropdown} selectedValue={topic} setMenu={handleTopicChange} />
                        </div>
                    </div>
                    <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
                        {discussions?.map((post: any, index: number) => {
                            return (
                                <Card3Small
                                    className="p-4 xl:px-5 xl:py-6 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                                    key={post.id}
                                    post={post}
                                    href={`/company/${post?.company_id}/discussion/${post?.id}`}
                                    avatar={post.avatar_url}
                                />
                            )
                        })}
                    </div>
                    {
                        pageInfo?.discussionInfo?.showMore ? (
                            <div className="flex mt-10 justify-center items-center">
                                <ButtonPrimary loading={loader?.discussion} onClick={() => getDiscussion(tab, topic, true)}>Show more</ButtonPrimary>
                            </div>
                            // <div
                            //     className={`nc-CardAuthor mt-2 w-full bg-neutral-100 hover:bg-neutral-200 border flex items-center cursor-pointer`}
                            // >
                            //     <h2
                            //     className={`!text-sm p-4 w-full flex justify-center !text-center sm:text-base text-neutral-900 dark:text-neutral-900 font-medium sm:font-semibold`}
                            //     >
                            //     Load more
                            //     <ChevronDownIcon className="w-5 h-5 ml-1 text-black" />
                            //     </h2>
                            // </div>
                        ) : <></>
                    }
                </div>
                <div className="grow-0 min-w-fit mt-7 lg:mt-0 lg:w-fit !h-fit">
                    <WidgetAuthors className="w-fit bg-neutral-100 border dark:bg-neutral-800 mb-8" isMember={true} loader={loader.member} getData={getMembers} showMore={pageInfo?.memberInfo?.showMore} title={"Top Members"} topMembers={topMembers} />
                    <WidgetAuthors className="w-full bg-neutral-100 border dark:bg-neutral-800" isCompany={true} loader={loader.company} getData={getCompanies} showMore={pageInfo?.companyInfo?.showMore} title={"Top Companies"} topCompanies={topCompanies} />
                </div>
            </div>
        </div>
    );
};

export default ThreadSection;
