'use client'
import ButtonCircle from '@/components/Button/ButtonCircle'
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import Card23 from '@/components/Card23/Card23'
import Heading from '@/components/Heading/Heading'
import Input from '@/components/Input/Input'
import Select from '@/components/Select/Select'
import { getMemberFollowedHub, getMemberFollower, getMemberLeadingHub, getMemberPosts, getMemberProfile } from '@/requests/Profile'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DefaultAvatar from '@/images/default-image.jpg'
import ReactStars from 'react-rating-stars-component'
import WidgetAuthors from '@/components/WidgetAuthors/WidgetAuthors'
import { followMember, unfollowMember } from '@/requests/Home'
import Card30 from '@/components/Card30/page'
import MemberItem from '../members/[id]/memberItem'
import CompanyCard from '@/components/CompanyCard/CompanyCard'


function OverView({ data1 }: any) {
    const [discussion, setDiscussion] = useState([]);
    console.log(data1);
    const [disscussion1, setDiscussion1] = useState('posts')

    const style = 'mt-3 font-semibold text-md max-md:text-sm text-gray-600 dark:text-gray-200'
    const style1 = 'mt-3 font-semibold text-sm text-gray-600 dark:text-gray-200'

    const style2 = 'mt-3 font-semibold text-right text-sm text-dark'

    const [keyword, setKeyword] = useState('');
    const [leadingHub, setLeadingHub] = useState([]);
    const [followedHub, setFollowedHub] = useState([]);
    const [postData, setPosts] = useState([]);
    const [members, setMembers] = useState([]);
    const [userData, setUserData]: any = useState({});
    const [globalLoader, setGlobalLoader] = useState(false)
    const [loader, setLoader] = useState(false);
    const [follow, setFollow] = useState(false);
    const [loading, setLoading] = useState({
        posts: false,
        members: false,
        followedHub: false,
        leadingHub: false
    })
    const params = useParams();

    const router = useRouter();
    const { currentUser, loggedIn } = useSelector((state: any) => {
        return {
            currentUser: state.auth.currentUser,
            loggedIn: state.auth.loggedIn
        };
    });


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

    useEffect(() => {
        const { followed_hubs, followed_members, info, leading_hub, posts, followed } = data1;
        setUserData(info);
        console.log(posts);

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

    }, [])
    

    console.log(postData);
    
    const loadPosts = async (newType: string = '', loadMore = false) => {
        setLoading({
            ...loading,
            posts: true
        })
        const newPage = loadMore ? pageInfo.posts.page + 1 : 1;
        let payload = { page: newPage, q: keyword };

        const type = newType ? newType : disscussion1;
        console.log(type);
        let result: any = await getMemberPosts(type, currentUser.id, payload);
        console.log(result)
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
    
    const data = [
        {
            id: 1,
            title: 'Re: Now Featured Dom test',
            company_name: 'Green River Gold Corp.',
            content: 'jdaksjdajsd',
            created_at: Date.now(),
            username: 'vedant'

        }
    ]
    
    const menuDropdown: any = {
        'discussions': "Newest",
        'discussions_featured': "Featured",
        'discussions_top_rated': "Top Rated",
        'discussions_off_topic': "Off-Topic"
    };
    const handleFilterChange = (val: any) => {
        setDiscussion(val);
    }
    

    return (
        <div className="grid grid-flow-row gap-3">
            <Heading desc={""} isCenter className="text-defaultBlue-100 mt-4 mb-9">
                {userData?.username}'s Profile
            </Heading>
            <h1 className="mt-3 text-lg lg:text-2xl text-dark font-bold">{userData?.username}'s Post</h1>
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3">
                <div className="flex-shrink-0  lg:mb-0 grow lg:grow-0 lg:!w-[260px] sm:!w-full">
                    <form className="relative">
                        <Input
                            required
                            aria-required
                            placeholder="Search Keyword"
                            type="text"
                            value={''}
                            // onChange={(e: any) => setSearchKeyword(e.target.value)}
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
                </div>
                <div className="flex justify-end mt-3 -mb-3 lg:mt-0 lg:mb-0">
                    <Select menuDropdown={menuDropdown} selectedValue={discussion} setMenu={handleFilterChange} />
                </div>
            </div>
            <div className="grid grid-flow-row divide-y divide-neutral-200 dark:divide-neutral-700">
                {postData?.map((post: any, index: number) => {
                    post.href = '/';
                    // if(index <= 4) {
                    return (
                        <Card30
                            className="py-6 hover:bg-neutral-200 dark:hover:bg-neutral-700"
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
    )
}

export default OverView