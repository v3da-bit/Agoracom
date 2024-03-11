import ButtonCircle from '@/components/Button/ButtonCircle';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import Card24 from '@/components/Card24/Card24';
import Input from '@/components/Input/Input';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import React, { useState } from 'react'
import ReactStars from "react-rating-stars-component";
import DefaultImage from '@/images/default-image.jpg'
import moment from 'moment';
import { useParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { followMember, unfollowMember } from '@/requests/Home';


function FooterHomeBsm({ name, data, topMembers, loader, loader2, onclick, onclick2, pageInfo, pageInfo2, keyword, setKeyword, searchKeyword }: any) {
    // console.log(data);
    
    const style1 = 'mt-3 font-semibold text-sm text-gray-600 dark:text-gray-200'
    const url = "https://s3.amazonaws.com/s3-staging.agoracom.com/public/users/"
    const style2 = 'mt-3 font-semibold text-right text-sm text-dark'
    const { currentUser, loggedIn } = useSelector((state: any) => {
        return {
            currentUser: state.auth.currentUser,
            loggedIn: state.auth.loggedIn
        };
    });
    const [loader1, setLoader1] = useState(0);
    const [follow, setFollow] = useState(false);
    
    const params = useParams();
    const router = useRouter();
    const getUrl = (url: any) => {
        if (url.toString().includes("s3.amazonaws.com")) {
            return url;
        } else {
            return DefaultImage;
        }
    }
//    console.log(topMembers);
   
    const followUnfollowHub = async (id:any) => {
        if (loggedIn) {
            if (follow) {
                setLoader1(id);
                const response = await unfollowMember(id)
                setLoader1(id);
                if (response.status == 200) {
                    setFollow(false)
                }
            } else {
                setLoader1(id);
                const response = await followMember(id)
                setLoader1(id);
                if (response.status == 201) {
                    setFollow(true)
                }
            }
        } else {
            router.push('/auth/login');
        }
    }
    const privateChat = (username:any) => {
        if (loggedIn) {
            sessionStorage.setItem('private-chat', JSON.stringify({ userId: params.id, userName: username }));
            router.push('/profile')
        } else {
            router.push('/auth/login');
        }
    }
    return (
        <div>
            <div className='w-full h-fit bg-[#f9f9f9] dark:bg-gray-800'>
                <div className="pb-8 w-full flex flex-col gap-3 justify-center">
                    {
                        topMembers.length > 0 ? (
                            <div className='w-full h-fit mb-8'>
                                <h1 className="text-lg mb-4 lg:text-2xl text-dark font-bold">Top Members</h1>
                                <div className="flex-shrink-0  lg:mb-2 lg:mt-6 grow lg:grow-0 lg:!w-[260px] sm:!w-full">
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
                                <div className="grid grid-cols-1 py-3 lg:grid-cols-3 gap-5">
                                    {
                                        topMembers.map((item: any, index: number) => {
                                            return (
                                                <div key={index} className='w-full  h-fit px-6 py-8 border-gray-200 border rounded-xl bg-white dark:bg-neutral-900 dark:border-gray-800'>
                                                    <div className=" flex flex-row gap-3">
                                                        <div className="w-1/3 h-full  flex justify-center">
                                                            <Image
                                                                src={getUrl(item.avatar)}
                                                                alt="GFG logo served with static path of public directory"
                                                                height="100"
                                                                width="100"
                                                                className='h-20 w-20 rounded-[50%]  object-cover'
                                                            />
                                                        </div>
                                                        <div className="w-2/3 flex flex-col items-left justify-center">
                                                            <h1 className=" text-xl max-md:text-lg text-dark"><b>{item.username}</b></h1>
                                                            {/* <h1 className=" text-lg max-md:text-sm  text-dark"><b>{item.authority_group_name}</b></h1> */}
                                                            <div className={`font-medium px-3 mt-1 py-1 bg-white w-fit !bg-secondary-100 border-0 text-secondary-500 rounded-full`}>
                                                                <div className="text-xs font-normal leading-none !w-fit flex-initial font-semibold">{item.authority_group_name}</div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className='mt-3 grid grid-cols-3 gap-3 '>
                                                        <div className="text-center">
                                                            <h1 className={style1}>Last posted</h1>
                                                            <h1 className={style1}>
                                                                {
                                                                    item.last_posted ?
                                                                        moment(item.last_posted).format('MM/DD/YYYY') :
                                                                        'N.A'
                                                                }
                                                            </h1>
                                                        </div>
                                                        <div className=" text-center">
                                                            <h1 className={style1}>Rating</h1>
                                                            <h1 className={style1 + ' star-parent-center'}>
                                                                <ReactStars
                                                                    count={5}
                                                                    // onChange={ratingChanged}
                                                                    value={parseFloat(item.rating || 0)}
                                                                    edit={false}
                                                                    size={24}
                                                                    activeColor="#ffd700"
                                                                /></h1>

                                                        </div>
                                                        <div className="text-center">
                                                            <h1 className={style1}>Messages</h1>
                                                            <h1 className={style1}>{item.total_messages}</h1>

                                                        </div>

                                                    </div>
                                                    <div className=" mt-6 grid grid-cols-2 max-sm:grid-cols-1 gap-3">
                                                        <div className="flex  justify-center items-center">
                                                            <ButtonPrimary onClick={()=>privateChat(item.username)} className='w-full' fontSize="text-sm font-semibold" sizeClass="py-2 px-3 lg:py-3 lg:px-4">Private Message</ButtonPrimary>
                                                        </div>
                                                        <div className="flex justify-center items-center">
                                                            <ButtonPrimary loading={loader1===item.id} onClick={()=>followUnfollowHub(item.id)} className='w-full' sizeClass="py-2 px-3 lg:py-3 lg:px-4" fontSize="text-sm font-semibold">{loader1===item.id?'':<PlusIcon className="w-5 mr-1 h-5 font-semibold " />}<span className=''> Follow</span></ButtonPrimary>
                                                        </div>
                                                    </div>

                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                {
                                    pageInfo2 ? (
                                        <div className="flex mt-12 justify-center items-center">
                                            <ButtonPrimary loading={loader2} onClick={() => onclick2(true)}>Show more</ButtonPrimary>
                                        </div>
                                    ) : <></>
                                }
                            </div>
                        ) : <></>
                    }
                </div>
            </div>

            {
                data.length > 0 ?
                    <div className="mb-8 w-full flex flex-col gap-4 justify-center">
                        <h1 className="mt-3 mb-4 text-lg lg:text-2xl text-dark font-bold">Industry Bulletins</h1>
                        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
                            {data?.map((post: any, index: number) => {
                                post.href = '/';
                                // if(index <= 4) {
                                return (
                                    <Card24
                                        className="p-4 xl:px-5 xl:py-6 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                                        key={post.id}
                                        post={post}
                                    // avatar={post.avatar_url}
                                    />
                                )
                                // }
                            })}
                        </div>
                        {pageInfo ? <div className="flex justify-center items-center mt-6">
                            <ButtonPrimary loading={loader} onClick={() => onclick()} className=''>Show more</ButtonPrimary>
                        </div> : <></>}

                    </div> : <></>
            }

        </div >
    )
}

export default FooterHomeBsm