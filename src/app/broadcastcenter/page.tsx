"use client";

import ButtonCircle from "@/components/Button/ButtonCircle";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import CardAuthor from "@/components/CardAuthor/CardAuthor";
import CompanyCard from "@/components/CompanyCard/CompanyCard";
import Heading from "@/components/Heading/Heading";
import Input from "@/components/Input/Input";
import SectionGridPosts from "@/components/Sections/SectionGridPosts";
import SectionVideos from "@/components/Sections/VideoSection";
import Select from "@/components/Select/Select";
import { DEMO_POSTS } from "@/data/posts";
import { broadcastDetails, getMoreRecentVideos, getMoreVideos } from "@/requests/Broadcast";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Fragment, useEffect, useState } from "react";

export default function Broadcast() {

    const [recentVideos, setRecentVideos] = useState([]);
    const [videos, setVideos] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [appliedFilters, setAppliedFilters] = useState([]);
    const [loader, setLoader] = useState({
        videos: false,
        recentVideos: false
    })
    const [pageInfo, setPageInfo] = useState({
        videos: {
            showMore: false,
            page: 1
        },
        recentVideos: {
            showMore: false,
            page: 1
        }
    })
    
    const [filters, setFilters]: any = useState([]);
    const [globalLoader, setGlobalLoader] = useState(false)
    
    const broadCastVideos: any = [
        {
            avatar_url: "avatars/generic_profile.jpg",
            company_name: "Lexington Energy Services Inc.",
            created_at: "2007-04-25 06:30:00 UTC",
            id: 561801,
            title: "NEWS - Lexington Energy announces over $1,100,000 in revenues and corporate restructuring",
            username: "AGORACOM-PAULN",
            video_image: "https://img.youtube.com/vi/gE8mTKD7ypw/maxresdefault.jpg",
            video_link: "https://www.youtube.com/embed/gE8mTKD7ypw?autoplay=1",
        },
        {
            avatar_url: "avatars/generic_profile.jpg",
            company_name: "Lexington Energy Services Inc.",
            created_at: "2007-04-25 06:30:00 UTC",
            id: 561802,
            title: "NEWS - Lexington Energy announces over $1,100,000 in revenues and corporate restructuring",
            username: "AGORACOM-PAULN",
            video_image: "https://img.youtube.com/vi/gE8mTKD7ypw/maxresdefault.jpg",
            video_link: "https://www.youtube.com/embed/gE8mTKD7ypw?autoplay=1",
        },
        {
            avatar_url: "avatars/generic_profile.jpg",
            company_name: "Lexington Energy Services Inc.",
            created_at: "2007-04-25 06:30:00 UTC",
            id: 561803,
            title: "NEWS - Lexington Energy announces over $1,100,000 in revenues and corporate restructuring",
            username: "AGORACOM-PAULN",
            video_image: "https://img.youtube.com/vi/gE8mTKD7ypw/maxresdefault.jpg",
            video_link: "https://www.youtube.com/embed/gE8mTKD7ypw?autoplay=1",
        },
        {
            avatar_url: "avatars/generic_profile.jpg",
            company_name: "Lexington Energy Services Inc.",
            created_at: "2007-04-25 06:30:00 UTC",
            id: 561804,
            title: "NEWS - Lexington Energy announces over $1,100,000 in revenues and corporate restructuring",
            username: "AGORACOM-PAULN",
            video_image: "https://img.youtube.com/vi/gE8mTKD7ypw/maxresdefault.jpg",
            video_link: "https://www.youtube.com/embed/gE8mTKD7ypw?autoplay=1",
        }
    ]

    useEffect(() => {
        getBroadcastDetails();
    }, []);

    const getBroadcastDetails = async () => {
        setGlobalLoader(true)
        const response = await broadcastDetails();
        setGlobalLoader(false)
        if(response?.status === 200) {
            const {videos_broadcasts, broadcasts, categories} = response?.data;
            let pageDetails = {
                ...pageInfo,
                videos: {
                    ...pageInfo.videos,
                    showMore: broadcasts.length > 9
                },
                recentVideos: {
                    ...pageInfo.recentVideos,
                    showMore: videos_broadcasts.length > 5
                }
            };
            let f: any = [];
            Object.keys(categories).forEach((key: any) => {
                let payload = {
                    id: key,
                    value: categories[key],
                    selected: false
                }
                f.push(payload);
            });
            setFilters(f);
            setPageInfo(pageDetails);
            setRecentVideos(videos_broadcasts.filter((item: any, indx: any) => indx < 5));
            setVideos(broadcasts.filter((item: any, indx: any) => indx < 9));
        }
    }

    const selectFilter = (id: number, value = false) => {
        const newList: any = [];
        const apiRequest: any = [];
        filters.forEach((item: any) => {
            if(item.id === id) {
                item.selected = value;
            }
            newList.push(item);
        });
        newList.forEach((item: any) => {
            if(item.selected) {
                apiRequest.push(item.id);
            }
        })
        filterData(apiRequest, true);
        setFilters(newList);
    }

    const getMoreV = async () => {
        setLoader({
            ...loader,
            videos: true
        })
        const newPage = pageInfo.videos.page + 1;
        let payload = {page: newPage};
        let result: any = await getMoreVideos(payload);
        let newData: any = [...videos, ...result.data];
        let page = JSON.parse(result?.headers.toJSON()?.pagy);
        let pagePayload: any = {...pageInfo};
        pagePayload["videos"] = {
            showMore: page.next != null,
            page: newPage
        }
        setLoader({
            ...loader,
            videos: false
        })
        setPageInfo(pagePayload);
        setVideos(newData);
    }

    const searchKeyword = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        filterData();
    }

    const getList = (list: any) => {
        if(list.length > 0) {
            let stringData = list.toString();
            let dataList: any = stringData.replaceAll(',', '","');
            return `["${dataList}"]`;
        } else {
            return null;
        }
    }

    const filterData = async (filter: any = [], fromFilter = false) => {
        setLoader({
            ...loader,
            videos: true
        })
        const newPage = 1;
        let payload: any = {page: newPage};
        if(keyword) {
            payload["q"] = keyword;
        }
        let filterList = fromFilter ? getList(filter) : getList(appliedFilters);
        if(filterList) {
            payload["category"] = filterList;
        }
        let result: any = await getMoreVideos(payload);
        let newData: any = [...result.data];
        let page = JSON.parse(result?.headers.toJSON()?.pagy);
        let pagePayload: any = {...pageInfo};
        pagePayload["videos"] = {
            showMore: page.next != null,
            page: newPage
        }
        setLoader({
            ...loader,
            videos: false
        })
        setPageInfo(pagePayload);
        setVideos(newData);
    }

    const getMoreRVideos = async () => {
        setLoader({
            ...loader,
            recentVideos: true
        })
        const newPage = pageInfo.recentVideos.page + 1;
        let payload = {page: newPage};
        let result: any = await getMoreRecentVideos(payload);
        let newData: any = [...recentVideos, ...result.data];
        let page = JSON.parse(result?.headers.toJSON()?.pagy);
        let pagePayload: any = {...pageInfo};
        pagePayload["recentVideos"] = {
            showMore: page.next != null,
            page: newPage
        }
        setLoader({
            ...loader,
            recentVideos: false
        })
        setPageInfo(pagePayload);
        setRecentVideos(newData);
    }

    return (
        <div className="nc-PageHomeDemo4 relative">
            <div className="container mt-16 mb-24">
            {globalLoader ?
                    <div className='flex items-center justify-center'>
                        <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>
                    :
            
                <SectionVideos videos={recentVideos} heading="Recent Videos" screen="Broadcast" getData={getMoreRVideos} loader={loader.recentVideos} pageInfo={pageInfo?.recentVideos} />
}
                </div>
            <hr />
            <div className="container mt-16 mb-20">
                <Heading desc={""} isCenter>
                    Broadcast Center
                </Heading>
                {globalLoader ?
                    <div className='flex items-center justify-center'>
                        <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>
                    :
                <>
                <div className="flex-none justify-between mb-5 lg:flex sm:block">
                    <div className="flex-shrink-0 lg:mb-0 grow lg:grow-0 lg:!w-[260px] sm:!w-full">
                        <form className="relative">
                            <Input
                                required
                                aria-required
                                placeholder="Search Keyword"
                                type="text"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                className="text-neutral-800 px-6 dark:text-neutral-200"
                            />
                            <ButtonCircle
                                type="submit"
                                // disabled={!keyword.length}
                                onClick={searchKeyword}
                                className={`absolute transform top-1/2 -translate-y-1/2 end-1 !bg-defaultGreen-100 hover:!bg-primary-500 dark:bg-neutral-300 dark:text-black`}
                            >
                                <MagnifyingGlassIcon className="w-5 h-5" />
                            </ButtonCircle>
                        </form>
                    </div>
                    {
                        filters.length > 0 ? (
                            <div className="mt-2 lg:mt-0 lg:w-fit flex-none my-auto lg:flex sm:block">
                                <span className="p-2">Filter:</span>
                                {
                                    filters.map((item: any, index: number) => {
                                        return (
                                            <Fragment key={index}>
                                                {
                                                    item.selected ? (
                                                        <div className={`flex justify-center items-center m-1 cursor-pointer font-medium ${item.selected ? "py-1 px-2 text-white bg-defaultBlue-100 border-secondary-100" : "p-2 bg-white border-secondary-100 text-secondary-700"} rounded-full`}>
                                                            <div className="text-xs font-normal leading-none max-w-full flex-initial font-semibold">{item.value}</div>
                                                            {
                                                                item.selected ? (
                                                                    <div className="flex flex-auto flex-row-reverse" onClick={() => selectFilter(item.id, false)}>
                                                                        <div>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x cursor-pointer hover:text-indigo-400 rounded-full w-4 h-4 ml-2">
                                                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                ) : <></>
                                                            }
                                                        </div>
                                                    ) : (
                                                        <div onClick={() => selectFilter(item.id, true)} className={`flex justify-center items-center m-1 cursor-pointer font-medium p-2 bg-white !border-secondary-6000 border-2 text-secondary-700 rounded-full`}>
                                                            <div className="text-xs font-normal leading-none max-w-full flex-initial font-semibold">{item.value}</div>
                                                        </div>
                                                    )
                                                }
                                            </Fragment>
                                        )
                                    })
                                }
                            </div>
                        ) : <></>
                    }

                </div>
                <SectionGridPosts
                    className="py-10"
                    postCardName="card9"
                    heading=""
                    subHeading=""
                    screen="Broadcast"
                    posts={videos}
                    pageInfo={pageInfo.videos}
                    loader={loader?.videos}
                    getData={getMoreV}
                    gridClass="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8"
                />
                </>
}
            </div>
        </div>
    )
}