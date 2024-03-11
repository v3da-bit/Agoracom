'use client'

import HeroSection from '@/components/Sections/HeroSection'
import BackgroundSection from '@/components/BackgroundSection/BackgroundSection'
import SectionSliderPosts from '@/components/Sections/SliderSection'
import SectionVideos from '@/components/Sections/VideoSection'
import SectionGridPosts from '@/components/Sections/SectionGridPosts'
import { DEMO_POSTS } from '@/data/posts'
import NewsLetter from '@/components/NewsLetter/Newsletter'
import NewsLetterBg from '@/components/NewsLetter/NewsletterBg'
import ThreadSection from '@/components/Sections/ThreadSection'
import FeaturedPost from '@/components/Sections/FeaturedPosts'
import { useEffect, useState } from 'react'
import { getMoreCompanies, getMoreDiscussions, getMoreIndustries, getMoreMembers, getMoreNews, getMorePosts, getMoreSmallCap, homeDetails } from '@/requests/Home'
import TrailerSection from '@/components/Sections/TrailerSection'
import SmallCap from '@/components/Sections/SmallCap'
import { getMoreSponsor } from '@/requests/Companies'
import { useSelector } from 'react-redux'

export default function HomeContainer() {
    const { loggedIn } = useSelector((state: any) => {
        return {
            loggedIn: state.auth.loggedIn
        };
    });
    const [discussion, setDiscussion] = useState([]);
    const [posts, setPosts] = useState([]);
    const [industryData, setIndustryData] = useState([]);
    const [members, setMembers] = useState([]);
    const [tab, setTab] = useState("posts");
    const [topic, setTopic] = useState("my_feed");
    const [globalLoader, setGlobalLoader] = useState(false)
    const [reels_shorts, setReels] = useState([])
    const [pageInfo, setPageInfo] = useState({
        companyInfo: {
            showMore: false,
            page: 1
        },
        memberInfo: {
            showMore: false,
            page: 1
        },
        newsInfo: {
            showMore: false,
            page: 1
        },
        industryInfo: {
            showMore: false,
            page: 0,
            offset: 12
        },
        postInfo: {
            showMore: false,
            page: 0,
            offset: 10
        },
        discussionInfo: {
            showMore: false,
            page: 1
        },
        small_cap60Info: {
            showMore: false,
            page: 1
        },
        sponsoredInfo: {
            showMore: false,
            used_id: []
        }
    })
    const [companies, setCompanies] = useState([]);
    const [news, setNews] = useState([]);
    const [smallCap60, setSmallCap60] = useState([]);
    const [sponsored, setSponsored] = useState([]);
    const [loader, setLoader] = useState({
        member: false,
        company: false,
        discussion: false,
        news: false,
        posts: false,
        industry: false,
        small_cap60: false,
        sponsored: false
    })

    useEffect(() => {
        loadData();
    }, []);

    const getCompanies = async () => {
        setLoader({
            ...loader,
            company: true
        })
        const newPage = pageInfo.companyInfo.page + 1;
        let payload = { page: newPage };
        let result: any = await getMoreCompanies(payload);
        let newData: any = [...companies, ...result.data];
        let page = JSON.parse(result?.headers.toJSON()?.pagy);
        let pagePayload: any = { ...pageInfo };
        pagePayload["companyInfo"] = {
            showMore: page.next != null,
            page: newPage
        }
        setLoader({
            ...loader,
            company: false
        })
        setPageInfo(pagePayload);
        setCompanies(newData)
    }

    const getMembers = async () => {
        setLoader({
            ...loader,
            member: true
        })
        const newPage = pageInfo.memberInfo.page + 1;
        let payload = { page: newPage };
        let result: any = await getMoreMembers(payload);
        let newData: any = [...members, ...result.data];
        let page = JSON.parse(result?.headers.toJSON()?.pagy);
        let pagePayload: any = { ...pageInfo };
        pagePayload["memberInfo"] = {
            showMore: page.next != null,
            page: newPage
        }
        setLoader({
            ...loader,
            member: false
        })
        setPageInfo(pagePayload);
        setMembers(newData);
    }

    const getIndustry = async () => {
        setLoader({
            ...loader,
            industry: true
        })
        const newPage = pageInfo.industryInfo.page + 1;
        let payload = { page: newPage, offset: pageInfo.industryInfo.offset };
        let result: any = await getMoreIndustries(payload);
        let newData: any = [...industryData, ...result.data];
        let page = JSON.parse(result?.headers.toJSON()?.pagy);
        let pagePayload: any = { ...pageInfo };
        pagePayload["industryInfo"] = {
            showMore: page.next != null,
            page: newPage,
            offset: pageInfo.industryInfo.offset
        }
        setLoader({
            ...loader,
            industry: false
        })
        setPageInfo(pagePayload);
        setIndustryData(newData);
    }

    const getDiscussion = async (tabValue: any = tab, topicValue: any = topic, loadMore = false) => {
        setLoader({
            ...loader,
            discussion: true
        })
        const newPage = loadMore ? (pageInfo.discussionInfo.page + 1) : 1;
        let payload = {
            page: newPage,
            tab: tabValue,
            topic: topicValue,
            items: 5
        };
        let result: any = await getMoreDiscussions(payload);
        let newData: any = [...discussion, ...result.data];
        let page = JSON.parse(result?.headers.toJSON()?.pagy);
        let pagePayload: any = { ...pageInfo };
        pagePayload["discussionInfo"] = {
            showMore: page.next != null,
            page: newPage
        }
        setLoader({
            ...loader,
            discussion: false
        })
        setPageInfo(pagePayload);
        setDiscussion(newData);
    }

    const getPosts = async () => {
        setLoader({
            ...loader,
            posts: true
        })
        const newPage = pageInfo.postInfo.page + 1;
        let payload = { page: newPage, offset: pageInfo.postInfo.offset };
        let result: any = await getMorePosts(payload);
        let newData: any = [...posts, ...result.data];
        let page = JSON.parse(result?.headers.toJSON()?.pagy);
        let pagePayload: any = { ...pageInfo };
        pagePayload["postInfo"] = {
            showMore: page.next != null,
            page: newPage,
            offset: pageInfo.postInfo.offset
        }
        setLoader({
            ...loader,
            posts: false
        })
        setPageInfo(pagePayload);
        setPosts(newData);
    }

    const getNews = async () => {
        setLoader({
            ...loader,
            news: true
        })
        const newPage = pageInfo.newsInfo.page + 1;
        let payload = { page: newPage };
        let result: any = await getMoreNews(payload);
        let newData: any = [...news, ...result.data];
        let page = JSON.parse(result?.headers.toJSON()?.pagy);
        let pagePayload: any = { ...pageInfo };
        pagePayload["newsInfo"] = {
            showMore: page.next != null,
            page: newPage
        }
        setLoader({
            ...loader,
            news: false
        })
        setPageInfo(pagePayload);
        setNews(newData);
    }

    const getSmallCap = async () => {
        setLoader({
            ...loader,
            small_cap60: true
        })
        const newPage = pageInfo.small_cap60Info.page + 1;
        let payload = { page: newPage };
        let result: any = await getMoreSmallCap(payload);
        let newData: any = [...smallCap60, ...result.data];
        let page = JSON.parse(result?.headers.toJSON()?.pagy);
        let pagePayload: any = { ...pageInfo };
        pagePayload["small_cap60Info"] = {
            showMore: page.next != null,
            page: newPage
        }
        setLoader({
            ...loader,
            small_cap60: false
        })
        setPageInfo(pagePayload);
        setSmallCap60(newData);
    }

    const getSponsor = async () => {
        setLoader({
            ...loader,
            sponsored: true
        })
        const result: any = await getMoreSponsor(pageInfo?.sponsoredInfo?.used_id);
        setLoader({
            ...loader,
            sponsored: false
        })
        if (result.status === 200) {
            let used: any = [...pageInfo?.sponsoredInfo?.used_id];
            let newData: any = [...sponsored, ...result.data];
            let page = JSON.parse(result?.headers.toJSON()?.pagy);
            let pagePayload: any = { ...pageInfo };
            result.data.forEach((item: any) => {
                used.push(item.id);
            });
            pagePayload["sponsoredInfo"] = {
                showMore: page.next != null,
                used_id: used
            }
            setSponsored(newData);
            setPageInfo(pagePayload);
        }
    }

    const loadData = async () => {
        setGlobalLoader(true)
        let response = await homeDetails();
        setGlobalLoader(false)
        if (response.status == 200) {
            const { discussions, featured_posts, industry_bulletin, small_cap_news_tv, top_companies, top_members, small_cap60, trailers, reels_shorts } = response.data;
            const { discussionInfo, postInfo, newsInfo, companyInfo, industryInfo, memberInfo, small_cap60Info, sponsoredInfo } = pageInfo;
            let used_sponsored_items: any = [];
            top_companies.forEach((val: any, index: number) => {
                if (index < 12) {
                    used_sponsored_items.push(val.id);
                }
            })
            let payload = {
                ...pageInfo,
                postInfo: {
                    ...postInfo,
                    showMore: featured_posts.length > 10
                },
                newsInfo: {
                    ...newsInfo,
                    showMore: small_cap_news_tv.length > 5
                },
                discussionInfo: {
                    ...discussionInfo,
                    showMore: discussions.length > 5
                },
                companyInfo: {
                    ...companyInfo,
                    showMore: top_companies.length > 5
                },
                memberInfo: {
                    ...memberInfo,
                    showMore: top_members.length > 5
                },
                industryInfo: {
                    ...industryInfo,
                    showMore: industry_bulletin.length > 12
                },
                small_cap60Info: {
                    ...small_cap60Info,
                    showMore: small_cap60.length > 12
                },
                sponsoredInfo: {
                    ...sponsoredInfo,
                    showMore: top_companies.length > 12,
                    used_id: used_sponsored_items
                }
            }
            setPageInfo(payload);
            setDiscussion(discussions.filter((i: any, index: number) => index < 5));
            setPosts(featured_posts.filter((i: any, index: number) => index < 10));
            setCompanies(top_companies.filter((i: any, index: number) => index < 5));
            setMembers(top_members.filter((i: any, index: number) => index < 5));
            setIndustryData(industry_bulletin.filter((i: any, index: number) => index < 12));
            setNews(small_cap_news_tv);
            setSmallCap60(small_cap60.filter((i: any, index: number) => index < 12));
            setSponsored(trailers.filter((i: any, index: number) => index < 5));
            setReels(reels_shorts.filter((i: any, index: number) => index < 5))
        }

    }

    return (
        <div className="nc-PageHomeDemo4 relative">
            <HeroSection />
            <div className="container mt-20 mb-24">
                {globalLoader ?
                    <div className='flex items-center justify-center '>
                        <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>
                    : <SectionSliderPosts
                        postCardName="card9"
                        heading="Reels and Shorts"
                        subHeading=""
                        perView={4}
                        screen="Reels"
                        posts={reels_shorts} />}
            </div>
            <hr />
            <div className="text-neutral-100 ">
                {globalLoader ?
                    <div className='flex items-center justify-center my-20'>
                        <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>
                    :
                    <div className="relative container my-20">
                        <SectionSliderPosts
                            postCardName="card9"
                            heading="Trailers"
                            subHeading=""
                            screen="Trailer"
                            perView={4}
                            loader={loader.sponsored}
                            getData={getSponsor}
                            showMore={pageInfo.sponsoredInfo.showMore}
                            posts={sponsored}
                        // pageInfo={pageInfo}
                        // posts={POSTS.filter((item: any) => (item.postType != "video" && item.postType != "audio"))} 
                        />
                        {/* <TrailerSection heading={"Trailers"} /> */}
                    </div>}
            </div>
            <div className="container mt-8 mb-8">
                {globalLoader ?
                    <div className='flex items-center justify-center my-8 py-10'>
                        <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>
                    :
                    <div className="relative pt-16 pb-20 w-full">
                        <BackgroundSection />
                        <FeaturedPost posts={posts} showMore={pageInfo?.postInfo?.showMore} getData={getPosts} loader={loader?.posts} />
                    </div>}
            </div>
            {/* bg-neutral-800  */}
            <div className="bg-slate-100 dark:bg-black dark:bg-opacity-20 text-neutral-100">
                {globalLoader ?
                    <div className='flex items-center justify-center my-20 py-10'>
                        <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>
                    :
                    <div className="relative container">
                        <SectionGridPosts
                            className="py-16 lg:py-20"
                            postCardName="card11"
                            heading="Feature Articles"
                            subHeading=""
                            screen="Industry"
                            loader={loader}
                            pageInfo={pageInfo}
                            posts={industryData}
                            getData={getIndustry}
                            // posts={DEMO_POSTS.filter((_, i) => i > 5 && i < 18)}
                            gridClass="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
                        />
                    </div>}
            </div>
            {
                loggedIn ? <></> : (
                    <div className="relative dark:bg-transparent text-neutral-100 mb-24">
                        <NewsLetterBg />
                        <NewsLetter className='relative' />
                    </div>
                )
            }
            {globalLoader ?
                <div className='flex items-center justify-center mb-14'>
                    <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                </div>
                :
                <div className="container mt-20 mb-28">
                    <SectionVideos videos={news} pageInfo={pageInfo?.newsInfo} heading="Feature Videos" getData={getNews} loader={loader?.news} />
                </div>}

            <hr />
            {globalLoader ?
                <div className='flex items-center justify-center my-14'>
                    <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                </div>
                :
                <div className="container mt-20 mb-20">
                    <SmallCap videos={smallCap60} pageInfo={pageInfo} getData={getSmallCap} loader={loader.small_cap60} />
                </div>
            }
            <hr />
            <div className="dark:bg-black dark:bg-transparent text-neutral-100 mb-20 mt-20">
                {globalLoader ?
                    <div className='flex items-center justify-center'>
                        <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>
                    :
                    <div className="relative container">
                        <ThreadSection
                            heading={'Community Buzz'}
                            loader={loader}
                            topMembers={members}
                            getMembers={getMembers}
                            getCompanies={getCompanies}
                            getDiscussion={getDiscussion}
                            pageInfo={pageInfo}
                            discussions={discussion}
                            topCompanies={companies}
                            topic={topic}
                            setTopic={setTopic}
                            tab={tab}
                            setTab={setTab}
                        />
                    </div>
                }
            </div>


        </div>
    )
}