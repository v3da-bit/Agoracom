'use client';

import Heading from '@/components/Heading/Heading'
import Nav from '@/components/Nav/Nav'
import NavItem from '@/components/NavItem/NavItem'
import React, { useEffect, useState } from 'react'
import View from './View';
import { DEMO_POSTS } from '@/data/posts'
import HomeFeatured from './HomeFeatured';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import Image from 'next/image';
import DefaulImage from '@/images/default-image.jpg'
import Input from '@/components/Input/Input';
import ButtonCircle from '@/components/Button/ButtonCircle';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/solid';
import FooterHomeBsm from './FooterHomeBsm';
import Discussion from './Discussion';
import PressRelease from './PressRelease';
import Qna from './Qna';
import ButtonSecondary from '@/components/Button/ButtonSecondary';
import Research from './Research';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { addFavouriteCompany, followMember, getCompanies, getCompanyMessages, getMoreCompanies, removeFavouriteCompany, unfollowMember } from '@/requests/Home';
import { companyInfo, followMessage, getBulletins, getDiscussion, getMembers } from '@/requests/Companies';
import Link from 'next/link';
import Photos from './Photos';
import Videos from './Videos';
import NewsCompany from './News';
import Edit from './Edit';
import { useSelector } from 'react-redux';
import Post from './discussion/[type]/Post';
import { title } from 'process';
import Violations from './Violations';
import ViolationPage from './violations/page';
import DefaultAvatar from "@/images/Icons/avatar.png";
import { Avatar } from 'antd';
import WidgetHeading1 from '@/components/WidgetHeading1/WidgetHeading1';



export let discuss = []
function CompanyScreen({ }: any) {
    const { currentUser, loggedIn } = useSelector((state: any) => {
        return {
            currentUser: state.auth.currentUser,
            loggedIn: state.auth.loggedIn
        };
    });

    const params = useParams();
    const searchParams = useSearchParams();
    const router: any = useRouter();
    const [discussion, setDiscussion] = useState([]);
    const [bulletins, setBulletins]: any = useState([]);
    const [followed, setFollowed]: any = useState(false);
    const [followLoader, setFollowLoader]: any = useState(false);
    const [info, setInfo]: any = useState({});
    const [topMembers, setTopMembers] = useState([]);
    const [FeaturedPosts, setFeaturedPosts] = useState([]);
    const [userData, setUserData]: any = useState({});
    const [appliedFilters, setAppliedFilters] = useState([]);
    const [discussionDetails, setDiscussionDetails]: any = useState({});
    const [globalLoader, setGlobalLoader] = useState(false)
    const [selectedDiscussion, setSelectedDiscussion] = useState("discussions");
    const [hubLeaders, setHubLeaders] = useState([]);
    const [loader, setLoader] = useState({
        discussion: false,
        recentDiscussion: false
    })
    let id = params.id
    const getList = (list: any) => {
        if (list.length > 0) {
            let stringData = list.toString();
            let dataList: any = stringData.replaceAll(',', '","');
            return `["${dataList}"]`;
        } else {
            return null;
        }
    }
    // const [postData, setPosts] = useState([]);
    const [loading, setLoading] = useState({
        posts: false,
        members: false,
        followedHub: false,
        leadingHub: false
    })
    const [pageInfo, setPageInfo] = useState({
        bulletin: {
            showMore: false,
            page: 1
        },
        discussions: {
            showMore: false,
            page: 1
        },
        members: {
            showMore: false,
            page: 1
        },

    })
    const menuDropdown: any = {
        'discussions': "Newest",
        'discussions_featured': "Featured",
        'discussions_top_rated': "Top Rated",
        'discussions_off_topic': "Off-Topic"
    };
    const [keyword, setKeyword] = useState("");
    const [topMemberKeyword, setTopMemberKeyword] = useState("");
    const [messageError, setMessageError] = useState([]);
    const [hubLeader, setHubLeader] = useState(false)
   
    useEffect(() => {
        if (params.id) {
            fetchData(params.id);
            if (params.type) {
                fetchMessageData(params.type);
                setTabActive(101);
            } else {
                const newTab: any = searchParams.get('tab');
                if (newTab) {
                    setTabActive(parseInt(newTab));
                }
            }
        } else {
            router.back();
        }
    }, [])

    const fetchMessageData = async (id: any) => {
        try {
            const response: any = await getCompanyMessages(id);
            if (response.status === 200) {
                setDiscussionDetails(response.data);
                setMessageError([]);
            }
        } catch (err: any) {
            if (err?.response?.data?.errors?.length > 0) {
                setMessageError(err?.response?.data?.errors);
            }
            console.log("Something went wrong", err)
        }
    }

    const searchKeyword = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        discussionPosts();
    }

    const topMemberSearch = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        loadMembers();
    }

    const fetchData = async (id: any) => {
        try {
            setGlobalLoader(true)
            const response: any = await getCompanies(id);
            setGlobalLoader(false)
            if (response.status === 200) {
                const { bulletins, discussions, info, featured_posts, top_members, hub_leaders } = response.data;

                setUserData(info)
                setBulletins(bulletins.filter((i: any, index: number) => index < 4))
                setDiscussion(discussions.filter((i: any, index: number) => index < 5))
                setTopMembers(top_members.filter((i: any, index: number) => index < 6))
                setInfo(info)
                setFeaturedPosts(featured_posts)
                setHubLeaders(info?.hub_type === 2 ? hub_leaders : [])
                setPageInfo({
                    bulletin: {
                        ...pageInfo.bulletin,
                        showMore: bulletins.length > 4 ? true : false
                    },
                    members: {
                        ...pageInfo.members,
                        showMore: topMembers.length > 6 ? true : false
                    },
                    discussions: {
                        ...pageInfo.discussions,
                        showMore: discussions.length > 5 ? true : false
                    },

                })
                setFollowed(response.data.followed ? true : false);
                if (info.current_user_hub_leader) {
                    setHubLeader(true)
                }

            }
        } catch (e: any) {
            console.log(e);
        }
    }

    const bulletinsPosts = async (newType: string = '') => {
        setLoading({
            ...loading,
            posts: true
        })
        const newPage = newType ? 1 : pageInfo.bulletin.page + 1;
        let payload = { page: newPage };

        // const type = newType ? newType : discussion;
        let result: any = await getBulletins(userData.id, payload);
        let newData: any = [...bulletins, ...result.data];;
        let page = JSON.parse(result?.headers.toJSON()?.pagy);
        let pagePayload: any = { ...pageInfo };
        pagePayload["bulletin"] = {
            showMore: page.next != null,
            page: newPage
        }
        setLoading({
            ...loading,
            posts: false
        })
        setPageInfo(pagePayload);
        setBulletins(newData);
    }

    const discussionPosts = async (newType: string = '', loadMore = false) => {
        setLoading({
            ...loading,
            followedHub: true
        })
        const type = newType ? newType : selectedDiscussion;
        const newPage = loadMore ? pageInfo.discussions.page + 1 : 1;
        let payload = { page: newPage, q: keyword };
        let result: any = await getDiscussion(userData.id, payload, type);
        let newData: any = loadMore ? [...discussion, ...result.data] : result.data;
        let page = JSON.parse(result?.headers.toJSON()?.pagy);

        let pagePayload: any = { ...pageInfo };
        pagePayload["discussions"] = {
            showMore: page.next != null,
            page: newPage
        }
        setLoading({
            ...loading,
            followedHub: false
        })
        setPageInfo(pagePayload);
        setDiscussion(newData);
    }

    const loadMembers = async (loadMore = false) => {
        setLoading({
            ...loading,
            members: true
        })
        const newPage = loadMore ? pageInfo.members.page + 1 : 1;
        let payload = { page: newPage, q: topMemberKeyword };
        let result: any = await getMembers(userData.id, payload);
        let newData: any = loadMore ? [...topMembers, ...result.data] : result.data;
        let page = JSON.parse(result?.headers.toJSON()?.pagy);
        let pagePayload: any = { ...pageInfo };
        pagePayload["members"] = {
            showMore: page.next != null,
            page: newPage
        }
        setLoading({
            ...loading,
            members: false
        })
        setPageInfo(pagePayload);
        setTopMembers(newData);
    }
    // useEffect(() => {

    //     if (params.id) {
    //         fetchData(params.id);
    //         // companyDetails(params.id)
    //     } else {
    //         router.back();
    //     }
    // }, [])

    const style = 'mt-3 font-semibold text-md max-md:text-sm text-gray-600 dark:text-gray-200 line-clamp-5'
    const style1 = 'mt-3 font-semibold text-sm text-gray-600 dark:text-gray-200'

    const style2 = 'mt-3 font-semibold text-right text-sm text-dark'
    const [tabs, setTabs]: any = useState([])
    useEffect(() => {
        setTabs(loggedIn && (currentUser?.userRole === 'admin' || hubLeader) ? [
            { id: 1, title: "Home" },
            { id: 3, title: "Profile" },
            { id: 6, title: "Videos" },
            { id: 2, title: "Discussion" },
            { id: 8, title: "Q&A" },
            { id: 9, title: "News" },
            { id: 11, title: "Violations" },
            { id: 10, title: "Edit" }
        ] : [
            { id: 1, title: "Home" },
            { id: 3, title: "Profile" },
            { id: 6, title: "Videos" },
            { id: 2, title: "Discussion" },
            { id: 8, title: "Q&A" },
            { id: 9, title: "News" },
        ])
    }, [hubLeader, currentUser])


    useEffect(() => {
        if (userData?.violation) {
            let t = [...tabs]
            let filteredData = t.filter((item: any) => item.id === 11);
            if (!filteredData.length) {
                t.push({ id: 11, title: "Violations" });
                setTabs(t);
            }
        }
    }, [userData])

    const [tabActive, setTabActive] = useState<number>(1);

    // tabs[0]?.id
    const handleClickTab = (item: number) => {
        if (item === tabActive) {
            return;
        }
        setTabActive(item);
    };

    const followHub = async () => {
        if (loggedIn) {
            setFollowLoader(true)
            let response = null;
            if (followed) {
                response = await removeFavouriteCompany(info?.id)
            } else {
                response = await addFavouriteCompany(info?.id)
            }
            setFollowLoader(false)
            if (response.status === 200 || response.status === 201) {
                setFollowed(!followed)
            }
        } else {
            router.push('/auth/login');
        }
    }

    
    const posts = DEMO_POSTS.filter(
        (_, i) => i > 2 && i < 7
    );

    const getUrl = (url: any) => {
        if (url.toString().includes("s3.amazonaws.com")) {
            return url;
        } else {
            return DefaultAvatar;
        }
    }
    return (
        <div className='relative py-8'>
            {globalLoader ?
                <div className='flex items-center justify-center py-10'>
                    <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                </div>
                :
                <div className='container'>
                    <div className='flex flex-row  max-xl:justify-center max-xl:flex-col max-xl:items-center gap-5 xl:gap-8 py-8 px-4'>
                        <div className='flex flex-col w-3/4 gap-3 max-xl:w-full'>
                            <Heading desc={""} isCenter className="text-defaultBlue-100 mb-4">
                                {info.name}
                            </Heading>
                            {/* <h1 className={style}><p className="MsoNormal text-3-line" dangerouslySetInnerHTML={{ __html: info?.summary }}></p></h1> */}
                            <h1 className="mt-3 font-bold text-2xl text-gray-600 dark:text-gray-200 line-clamp-5"><p className="MsoNormal text-3-line text-center">{userData?.banner_text}</p></h1>
                            <h1 className="font-semibold text-md text-gray-600 dark:text-gray-200 line-clamp-5 -mt-2"><p className="MsoNormal text-3-line text-center">{userData?.sub_banner_text}</p></h1>
                            <div className="mt-6">
                                <div className="flex-none lg:flex gap-6">
                                    <div className="grow">
                                        <div className="flex-none lg:flex justify-between mb-7">
                                            <Nav
                                                className="sm:space-x-2 rtl:space-x-reverse"
                                                containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base"
                                            >
                                                {tabs.map((item: any, index: number) => (
                                                    <NavItem
                                                        className='px-4 py-3 text-sm'
                                                        key={item.id}
                                                        isActive={tabActive === item.id}
                                                        onClick={() => handleClickTab(item.id)}
                                                    >
                                                        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-1">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                                    </svg> */}
                                                        {item.title}
                                                    </NavItem>
                                                ))}
                                            </Nav>

                                        </div>
                                        <div className=" mb-7 px-0 lg:px-4">
                                            {
                                                tabActive == 1 ?
                                                    <HomeFeatured post={FeaturedPosts} menuDropdown={menuDropdown} setSelectedDiscussion={setSelectedDiscussion} selectedDiscussion={selectedDiscussion} pageInfo={pageInfo?.discussions?.showMore} loader={loading.followedHub} onclick={discussionPosts} keyword={keyword} setKeyword={setKeyword} searchKeyword={searchKeyword} discussions={discussion} />
                                                    : tabActive == 2 ?
                                                        <Discussion />
                                                        : tabActive == 3 ?
                                                            <Research userData={userData} />
                                                            : tabActive == 4 ?
                                                                <PressRelease userData={userData} />
                                                                : tabActive == 5 ?
                                                                    <Photos userData={userData} />
                                                                    : tabActive == 6 ?
                                                                        <Videos userData={userData} />
                                                                        : tabActive == 7 ?
                                                                            <View userData={userData} />
                                                                            : tabActive == 8 ?
                                                                                <Qna userData={info} />
                                                                                : tabActive == 9 ?
                                                                                    <NewsCompany userData={info} />
                                                                                    : tabActive == 101 ?
                                                                                        <Post errors={messageError} fetchMessageData={fetchMessageData} data={discussionDetails} setTab={setTabActive} />
                                                                                        : tabActive == 10 ? <Edit info={userData} setTabActive={setTabActive} />
                                                                                            : tabActive == 11 ? <ViolationPage /> :
                                                                                                <></>
                                            }
                                        </div>



                                    </div>

                                </div>

                            </div>
                        </div>
                        <div className='flex flex-col w-1/4 max-xl:w-1/2 max-lg:w-full'>
                            <div className='h-fit px-7 py-7 shadow-md border-gray-300 border  rounded-xl bg-white dark:bg-neutral-900 dark:border-gray-800'>
                                <div className=" flex flex-row justify-center items-center">
                                    <div className="w-48  h-48 overflow-hidden  rounded-lg  flex ">
                                        <Image
                                            src={info.small_logo_url}
                                            alt="GFG logo served with static path of public directory"
                                            width="700"
                                            className='w-full h-full'
                                            height="700"
                                        />
                                    </div>

                                </div>
                                <div className=' text-center flex flex-col gap-3 mt-3'>
                                    <h1 className="text-2xl max-md:text-lg  text-dark"><b>{info.name}</b></h1>
                                    <h1 className="text-blue-500 "><b>Stock Quotes</b></h1>
                                    {/* <div className="flex-shrink-0 w-full  lg:mb-0 grow lg:grow-0 lg:!w-[260px] sm:!w-full">
                                <form className="relative">
                                    <Input
                                        required
                                        aria-required
                                        placeholder="Search Keyword"
                                        type="text"
                                        value={""}
                                        // onChange={(e) => setKeyword(e.target.value)}
                                        className="text-neutral-800 px-6 dark:text-neutral-200"
                                    />
                                    <ButtonCircle
                                        type="submit"
                                        // disabled={!keyword.length}
                                        // onClick={searchKeyword}
                                        className={`absolute transform top-1/2 -translate-y-1/2 end-1 !bg-defaultGreen-100 hover:!bg-primary-500 dark:bg-neutral-300 dark:text-black`}
                                    >
                                        <MagnifyingGlassIcon className="w-5 h-5" />
                                    </ButtonCircle>
                                </form>
                            </div> */}
                                    <div className='grid grid-flow-row gap-3 '>
                                        <div className="grid grid-flow-col text-left">
                                            <h1 className={style1}>Symbol</h1>
                                            <h1 className={style2}>{info.tidy_ticker}</h1>
                                        </div>
                                        <div className="grid grid-flow-col text-left">
                                            <h1 className={style1}>Exchange</h1>
                                            <h1 className={style2}>{info.stock_exchange}</h1>
                                        </div>
                                        <div className="grid grid-flow-col text-left">
                                            <h1 className={style1}>Shares</h1>
                                            <h1 className={style2}>{info.outstanding_shares}</h1>
                                        </div>

                                        <div className="grid grid-flow-col text-left">
                                            <h1 className={style1}>Industry</h1>
                                            <h1 className={style2}><a href="/">{info.industry}</a></h1>
                                        </div>
                                        <div className="grid grid-flow-col text-left">
                                            <h1 className={style1}>Website</h1>
                                            <h1 className={style2}><a href={info.external_website}>Click Here</a></h1>
                                        </div>

                                        <Link href={loggedIn ? `/company/${id}/create` : '/auth/login'}>
                                            <div className="flex mt-3 justify-center items-center">
                                                <ButtonSecondary className='w-full' sizeClass="py-2.5 px-4 sm:py-3 sm:px-6"><span className='text-sm'>Create a Post</span></ButtonSecondary>
                                            </div>
                                        </Link>
                                        <div className="flex justify-center items-center">
                                            <ButtonPrimary className='w-full' sizeClass="py-2.5 px-4 sm:py-3 sm:px-6" loading={followLoader} onClick={followHub}><span className='text-sm'>{followed ? 'Followed' : 'Follow Hub'}</span></ButtonPrimary>
                                        </div>
                                        <Link href={`/company/${id}/disclaimer`}>
                                            <div className="flex justify-center items-center">
                                                <ButtonPrimary className='w-full bg-white hover:bg-slate-200' sizeClass="py-2.5 px-4 sm:py-3 sm:px-6"><span className='text-sm text-black'>DISCLAIMER</span></ButtonPrimary>
                                            </div>
                                        </Link>

                                    </div>


                                </div>
                            </div>
                            <div
                                className={`nc-WidgetAuthors rounded-xl overflow-hidden w-full mt-8`}
                            >
                                <WidgetHeading1
                                    title={"Hub Leaders"}
                                    viewAll={null}
                                    className={"!p-4 !bg-white"}
                                />
                                <div className="flow-root">
                                    <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
                                        {
                                            hubLeaders.length > 0 && hubLeaders.map((item: any, index: any) => {
                                                return (
                                                    <div
                                                        className={`nc-CardAuthor flex items-center py-2.5 px-4 bg-white`} key={index}
                                                    >
                                                        <Link href={`/members/${item.user.id}`}>
                                                            <Avatar
                                                                sizeClass="h-10 w-10 text-base"
                                                                containerClassName="flex-shrink-0 me-3"
                                                                radius="rounded-full"
                                                                imgUrl={getUrl(item.user.avatar)}
                                                            />
                                                        </Link>
                                                        <div className="flex justify-between flex-auto ml-3">
                                                            <div className="pr-6">
                                                                <Link href={`/members/${item.user.id}`}
                                                                    className={`!text-sm sm:text-base text-neutral-900 dark:text-neutral-100 font-medium sm:font-semibold`}
                                                                >
                                                                    {item?.user?.username}
                                                                </Link>
                                                            </div>

                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                        tabActive == 1 ?
                            <FooterHomeBsm keyword={topMemberKeyword} setKeyword={setTopMemberKeyword} searchKeyword={topMemberSearch} loader={loading.posts} loader2={loading.members} pageInfo={pageInfo?.bulletin?.showMore} pageInfo2={pageInfo?.members?.showMore} onclick={bulletinsPosts} onclick2={loadMembers} name={info.name} data={bulletins} topMembers={topMembers} />
                            : <></>
                    }
                </div>
            }


        </div>
    )
}

export default CompanyScreen

