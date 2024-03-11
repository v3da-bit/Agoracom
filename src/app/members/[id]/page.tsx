"use client";
import ButtonCircle from '@/components/Button/ButtonCircle'
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import Card23 from '@/components/Card23/Card23';
import Heading from '@/components/Heading/Heading'
import Input from '@/components/Input/Input'
import Select from '@/components/Select/Select'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import DefaultAvatar from '@/images/default-image.jpg'
import Image from 'next/image';
import ReactStars from "react-rating-stars-component";
import { addRating, getMemberFollowedHub, getMemberFollower, getMemberLeadingHub, getMemberPosts, getMemberProfile } from '@/requests/Profile';
import { useParams, useRouter } from 'next/navigation';
import CompanyCard from '@/components/CompanyCard/CompanyCard';
import WidgetAuthors from '@/components/WidgetAuthors/WidgetAuthors';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { followMember, unfollowMember } from '@/requests/Home';
import MemberItem from './memberItem';
import Link from 'next/link';
import agoracom_logo from '@/images/Icons/agoracom_icon.png'
import alertMessage from '@/utils/swalAlert';


function MemberPage() {
    const style = 'mt-3 font-semibold text-md max-md:text-sm text-gray-600 dark:text-gray-200'
    const style1 = 'mt-3 font-semibold text-sm text-gray-600 dark:text-gray-200'

    const style2 = 'mt-3 font-semibold text-right text-sm text-dark'

    const router = useRouter();
    const params = useParams();
    const { currentUser, loggedIn } = useSelector((state: any) => {
        return {
            currentUser: state.auth.currentUser,
            loggedIn: state.auth.loggedIn
        };
    });
    const [discussion, setDiscussion] = useState('posts');
    const [keyword, setKeyword] = useState('');
    const [leadingHub, setLeadingHub] = useState([]);
    const [followedHub, setFollowedHub] = useState([]);
    const [postData, setPosts] = useState([]);
    const [members, setMembers] = useState([]);
    const [userData, setUserData]: any = useState({});
    const [globalLoader, setGlobalLoader] = useState(false)
    const [loader, setLoader] = useState(false);
    const [follow, setFollow] = useState(false);
    const [rating, setRating] = useState(0)
    const [loading, setLoading] = useState({
        posts: false,
        members: false,
        followedHub: false,
        leadingHub: false
    })
    const [pageInfo, setPageInfo] = useState({
        posts: {
            showMore: false,
            page: 1
        },
        members: {
            showMore: false,
            page: 1
        },
        followedHub: {
            showMore: false,
            page: 1
        },
        leadingHub: {
            showMore: false,
            page: 1
        }
    })
    const menuDropdown: any = {
        'posts': "Newest",
        'top_rated_posts': "Top Rated",
        'oldest_posts': "Oldest"
    };

    useEffect(() => {
        if (params.id) {
            fetchData(params.id);

        } else {
            router.back();
        }
    }, [])

    const handleFilterChange = (val: any) => {
        setDiscussion(val);
        loadPosts(val);
    }

    const fetchData = async (id: any) => {
        try {
            setGlobalLoader(true)
            const response: any = await getMemberProfile(id);
            setGlobalLoader(false)
            if (response.status === 200) {
                const { followed_hubs, followed_members, info, leading_hub, posts, followed } = response.data;
                setUserData(info);
                setFollowedHub(followed_hubs.filter((i: any, index: number) => index < 6));
                setLeadingHub(leading_hub.filter((i: any, index: number) => index < 6));
                setPosts(posts.filter((i: any, index: number) => index < 6));
                setMembers(followed_members.filter((i: any, index: number) => index < 6));
                setFollow(followed)
                setPageInfo({
                    posts: {
                        ...pageInfo.posts,
                        showMore: posts.length > 6 ? true : false
                    },
                    members: {
                        ...pageInfo.members,
                        showMore: followed_members.length > 6 ? true : false
                    },
                    followedHub: {
                        ...pageInfo.followedHub,
                        showMore: followed_hubs.length > 6 ? true : false
                    },
                    leadingHub: {
                        ...pageInfo.leadingHub,
                        showMore: leading_hub.length > 6 ? true : false
                    }
                })
            }
        } catch (e: any) {
            console.log(e);
        }
    }
    const addRatings = async (val: number) => {
        try {
            let payload: any = {
                rated_id: userData.id,
                rating: val
            }
            const response = await addRating(payload)
            if (response.status === 200 || response.status === 201) {
                alertMessage({
                    title: "Rating added Successfully",
                    text: "",
                    icon: "success",
                    timer: 3000
                });
            } else {
                console.log('Something went wrong')
            }
        } catch (e: any) {

        }


    }
    const loadPosts = async (newType: string = '', loadMore = false) => {
        setLoading({
            ...loading,
            posts: true
        })
        const newPage = loadMore ? pageInfo.posts.page + 1 : 1;
        let payload = { page: newPage, q: keyword };
        const type = newType ? newType : discussion;
        let result: any = await getMemberPosts(type, userData.id, payload);
        let newData: any;
        if (loadMore) {
            newData = [...postData, ...result.data];
        } else {
            newData = [...result.data];
        }
        let page = JSON.parse(result?.headers.toJSON()?.pagy);
        let pagePayload: any = { ...pageInfo };
        pagePayload["posts"] = {
            showMore: page.next != null,
            page: newPage
        }
        setLoading({
            ...loading,
            posts: false
        })
        setPageInfo(pagePayload);
        setPosts(newData);
    }

    const loadFollowedHub = async () => {
        setLoading({
            ...loading,
            followedHub: true
        })
        const newPage = pageInfo.followedHub.page + 1;
        let payload = { page: newPage };
        let result: any = await getMemberFollowedHub(userData.id, payload);
        let newData: any = [...followedHub, ...result.data];
        let page = JSON.parse(result?.headers.toJSON()?.pagy);
        let pagePayload: any = { ...pageInfo };
        pagePayload["followedHub"] = {
            showMore: page.next != null,
            page: newPage
        }
        setLoading({
            ...loading,
            followedHub: false
        })
        setPageInfo(pagePayload);
        setFollowedHub(newData);
    }

    const loadLeadingHub = async () => {
        setLoading({
            ...loading,
            leadingHub: true
        })
        const newPage = pageInfo.leadingHub.page + 1;
        let payload = { page: newPage };
        let result: any = await getMemberLeadingHub(userData.id, payload);
        let newData: any = [...leadingHub, ...result.data];
        let page = JSON.parse(result?.headers.toJSON()?.pagy);
        let pagePayload: any = { ...pageInfo };
        pagePayload["leadingHub"] = {
            showMore: page.next != null,
            page: newPage
        }
        setLoading({
            ...loading,
            leadingHub: false
        })
        setPageInfo(pagePayload);
        setLeadingHub(newData);
    }

    const loadMembers = async () => {
        setLoading({
            ...loading,
            members: true
        })
        const newPage = pageInfo.members.page + 1;
        let payload = { page: newPage };
        let result: any = await getMemberFollower(userData.id, payload);
        let newData: any = [...members, ...result.data];
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
        setMembers(newData);
    }

    const getUrl = (url: any) => {
        if (url.toString().includes("s3.amazonaws.com")) {
            return url;
        } else {
            return DefaultAvatar;
        }
    }

    const searchKeyword = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        loadPosts();
    }

    const followUnfollowHub = async () => {
        if (loggedIn) {
            if (follow) {
                setLoader(true);
                const response = await unfollowMember(params.id)
                setLoader(false);
                if (response.status == 200) {
                    setFollow(false)
                }
            } else {
                setLoader(true);
                const response = await followMember(params.id)
                setLoader(false);
                if (response.status == 201) {
                    setFollow(true)
                }
            }
        } else {
            router.push('/auth/login');
        }
    }

    const privateChat = () => {
        if (loggedIn) {
            sessionStorage.setItem('private-chat', JSON.stringify({ userId: params.id, userName: userData?.username }));
            router.push('/profile')
        } else {
            router.push('/auth/login');
        }
    }

    return (
        <div className="relative w-full pt-8 bg-white border-t-[1px]">
            {globalLoader ?
                <div className='flex items-center justify-center py-10'>
                    <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                </div>
                :
                <>
                    <div className='container'>


                        <div className='flex flex-row max-lg:items-center max-lg:flex-col max-lg:gap-5 gap-8 py-8 px-3'>
                            <div className='flex flex-col w-3/4 gap-3 max-xl:w-full'>
                                <Heading desc={""} isCenter className="text-defaultBlue-100 mb-9">
                                    {userData?.username}'s Profile
                                </Heading>
                                <h1 className={style}>{userData?.bio}</h1>
                                <h1 className="mt-3 text-lg lg:text-2xl text-dark font-bold">{userData?.username}'s Post</h1>
                                <div className="mt-3 flex flex-col gap-4 px-3 py-3">
                                    <div className="grid grid-flow-col text-left max-lg:grid-flow-row gap-3">
                                        <div className="flex-shrink-0  lg:mb-0 grow lg:grow-0 lg:!w-[260px] sm:!w-full">
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
                                        <div className="flex justify-end mt-3 -mb-3 lg:mt-0 lg:mb-0">
                                            <Select menuDropdown={menuDropdown} selectedValue={discussion} setMenu={handleFilterChange} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
                                        {postData?.map((post: any, index: number) => {
                                            post.href = '/';
                                            // if(index <= 4) {
                                            return (
                                                <Card23
                                                    className="p-4 xl:px-5 xl:py-6 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                                                    key={post.id}
                                                    post={post}
                                                    avatar={post.avatar_url}
                                                />
                                            )
                                            // }
                                        })}

                                    </div>
                                    {
                                        pageInfo?.posts?.showMore ? (
                                            <div className="flex mt-10 justify-center items-center">
                                                <ButtonPrimary loading={loading.posts} onClick={() => loadPosts('', true)}>Show more</ButtonPrimary>
                                            </div>
                                        ) : <></>
                                    }

                                </div>
                            </div>
                            <div className='w-1/4 gap-5 max-xl:w-1/2 max-lg:w-full h-fit'>
                                <div className='flex max-lg:mt-3 flex-col px-6 py-6 border-gray-300 border  rounded-xl bg-white dark:bg-neutral-900 dark:border-gray-800'>

                                    <div className="w-full relative h-full flex justify-center">
                                        {userData.is_ceo_verified ? <div className="absolute flex items-start justify-end  translate-x-16">
                                            <Image
                                                src={agoracom_logo}
                                                alt="GFG logo served with static path of public directory"
                                                className='rounded-[50%] object-cover my-4'
                                                height="45"
                                                width="45"
                                            />
                                        </div> : <></>}
                                        <div className=" flex flex-row">
                                            <Image
                                                src={getUrl(userData?.avatar || DefaultAvatar)}
                                                alt="GFG logo served with static path of public directory"
                                                className='rounded-[50%] object-cover my-4'
                                                height="120"
                                                width="120"
                                            />
                                        </div>
                                        {/* <div className="w-1/2 flex items-center justify-center">
                                            <h1 className=" text-2xl max-md:text-lg  text-dark"><b>Success stories</b></h1>

                                        </div> */}
                                    </div>
                                    <div className='grid grid-flow-row gap-3 '>
                                        <h1 className="text-xl font-bold text-center">{userData?.username}</h1>
                                        <div className="grid grid-flow-col text-left">
                                            <h1 className={style1}>City</h1>
                                            <h1 className={style2}>{userData?.city}</h1>
                                        </div>
                                        <div className="grid grid-flow-col text-left">
                                            <h1 className={style1}>Rank</h1>
                                            <h1 className={style2}>{userData?.authority_group_name}</h1>
                                        </div>
                                        <div className="grid grid-flow-col text-left">
                                            <h1 className={style1}>Activity Points</h1>
                                            <h1 className={style2}>{userData?.ranking_points}</h1>
                                        </div>
                                        <div className="grid grid-flow-col text-left">
                                            <h1 className={style1}>Rating</h1>
                                            <h1 className={style2 + ' star-parent-end'}>
                                                <ReactStars
                                                    count={5}
                                                    // onChange={ratingChanged}
                                                    value={parseFloat(userData?.rating)}
                                                    edit={false}
                                                    size={24}
                                                    activeColor="#ffd700"
                                                /></h1>
                                        </div>
                                        <div className="grid grid-flow-col text-left">
                                            <h1 className={style1}>Your Rating</h1>
                                            <h1 className={style2 + (loggedIn ? ' star-parent-end' : '')}>{loggedIn ? <ReactStars
                                                count={5}
                                                onChange={(e: any) => {
                                                    setRating(e)
                                                    addRatings(e)
                                                }}
                                                value={parseFloat(userData?.your_rating)}
                                                edit={loggedIn ? true : false}
                                                size={24}
                                                activeColor="#ffd700"
                                            /> : <Link href="/auth/login">'Please Log In to Vote'</Link>}</h1>
                                        </div>
                                        <div className="grid grid-flow-col text-left">
                                            <h1 className={style1}>Date Joined</h1>
                                            <h1 className={style2}>{userData?.date_joined}</h1>
                                        </div>
                                        <div className="grid grid-flow-col text-left">
                                            <h1 className={style1}>Social Links</h1>
                                            <h1 className={style2}></h1>
                                        </div>
                                        <div className="flex mt-3 justify-center items-center">
                                            <span className=' w-full'><ButtonPrimary onClick={privateChat} className='w-full' fontSize='text-sm font-semibold' sizeClass="py-3 px-4 lg:py-3 lg:px-4">Private Message</ButtonPrimary></span>
                                        </div>
                                        <div className="flex justify-center items-center">
                                            <ButtonPrimary className='w-full' fontSize='text-sm font-semibold' loading={loader} onClick={followUnfollowHub} sizeClass="py-3 px-4 lg:py-3 lg:px-4">{follow ? <>Followed</> : <><PlusIcon className="w-5 mr-1 h-5 font-semibold " /><span className=''> Follow</span></>}</ButtonPrimary>
                                        </div>

                                    </div>
                                </div>
                                <div className='w-full h-fit mt-8'>
                                    <WidgetAuthors
                                        headingClass='bg-neutral-100'
                                        className="w-full bg-white border dark:bg-neutral-800"
                                        isCompany={true}
                                        loader={loading.leadingHub}
                                        getData={loadLeadingHub}
                                        showMore={pageInfo?.leadingHub?.showMore}
                                        title={"Leading Hubs"}
                                        topCompanies={leadingHub}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                    {
                        (members.length > 0 || followedHub.length > 0) ? (
                            <div className='w-full mt-8 h-fit bg-[#f9f9f9] dark:bg-gray-800'>
                                <div className=" container py-16 w-full flex flex-col gap-3 justify-center">
                                    {
                                        members.length > 0 ? (
                                            <div className='w-full h-fit mb-12'>
                                                <h1 className="text-lg mb-4 lg:text-2xl text-dark font-bold">Followed Members</h1>
                                                <div className="grid grid-cols-1 py-3 lg:grid-cols-3 gap-5">
                                                    {
                                                        members.map((item: any, index: number) => {
                                                            return (
                                                                <MemberItem item={item} key={index} getUrl={getUrl} loggedIn={loggedIn} style1={style1} />
                                                            )
                                                        })
                                                    }
                                                </div>
                                                {
                                                    pageInfo?.members?.showMore ? (
                                                        <div className="flex mt-12 justify-center items-center">
                                                            <ButtonPrimary loading={loading.members} onClick={loadMembers}>Show more</ButtonPrimary>
                                                        </div>
                                                    ) : <></>
                                                }
                                            </div>
                                        ) : <></>
                                    }
                                    {
                                        followedHub.length > 0 ? (
                                            <div className='w-full h-fit mb-12'>
                                                <h1 className="text-lg mb-4 lg:text-2xl text-dark font-bold">Followed Hubs</h1>
                                                <div className={`grid gap-5 md:gap-5 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 lg:gap-5`}>
                                                    {followedHub.map((post, index) => <CompanyCard key={index} post={post} loggedIn={loggedIn} />)}
                                                </div>
                                                {
                                                    pageInfo?.followedHub?.showMore ? (
                                                        <div className="flex mt-12 justify-center items-center">
                                                            <ButtonPrimary loading={loading.followedHub} onClick={loadFollowedHub}>Show more</ButtonPrimary>
                                                        </div>
                                                    ) : <></>
                                                }
                                            </div>
                                        ) : <></>
                                    }
                                </div>
                            </div>
                        ) : <></>
                    }
                </>
            }
        </div>
    )
}

export default MemberPage;