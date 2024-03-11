; 'use client';
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import Heading from '@/components/Heading/Heading'
import ProfileCard from '@/components/ProfileCard/ProfileCard'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react'
import DefaulAvatar from '@/images/default-image.jpg'
import dynamic from 'next/dynamic';
import success from '@/images/success_stories.jpg'
import isSafariBrowser from '@/utils/isSafariBrowser';
import ReactPlayer from 'react-player';
import NcPlayIcon from '@/components/NcPlayIcon/NcPlayIcon';

function QuickTips() {
    const params = useParams();
    const router = useRouter();
    const [count, setCount] = useState(0)
    const [isRendered, setIsRendered] = useState(false);
    const [isPlay, setIsPlay] = useState(false);
    const [pageInfo, setPageInfo] = useState({


        photo: {
            showMore: false,
            page: 1
        },
    })
    const [loading, setLoading] = useState({
        photo: false,
    })
    const [data, setData] = useState([])
    const staticData = [
        {
            id: 1,
            image_url: { DefaulAvatar },
            video_link: 'https://www.youtube.com/embed/b_DaztCGiv4?autoplay=1',
            title: "How To Customize Our Home Page With Your News",
            content: "The most powerful tool ever introduced to online finance. Our front page is now YOUR front page. Populate it with company news, members and threads that are customized and important to you! This is especially true when surfing AGORACOM on the fly from your smartphone and you dont have time to hop from HUB to HUB to find out whats new. Finance efficiency at its finest!",

        },
        {
            id: 2,
            image_url: { DefaulAvatar },
            title: "How HUBS Work",
            content: "Coming Soon.",
            // video_link: 'https://www.youtube.com/embed/',
        },
        {
            id: 3,
            image_url: { DefaulAvatar },
            title: "How To Post, Reply To And Share Messages",
            content: "Messages posted in our discussion forums are the engine that drive AGORACOM. Replying to and sharing those messages is what brings them to life. Watch this video to learn all about it.",
            video_link: 'https://www.youtube.com/embed/MRk4iz3vFFA?autoplay=1',
        },
        {
            id: 4,
            image_url: { DefaulAvatar },
            title: "How To Rate Members and Check Your Ranking",
            content: "AGORACOM is the cleanest finance community in the world because of our powerful army of member moderators. To maintain our troll, spam and profanity free environment, all we need you to do is rate fellow members to help our algorithms appoint super user moderators ... one of them might even be you!",
            video_link: 'https://www.youtube.com/embed/fS6HNBplEbQ?autoplay=1',
        },
        {
            id: 5,
            image_url: { DefaulAvatar },
            title: "How & Why To Update Your Profile",
            content: "More than just an avatar, your AGORACOM profile is important because it is the best way to connect with companies, other shareholders and even generate business opportunities. All it takes is 5 minutes to update it.",
            video_link: 'https://www.youtube.com/embed/VIi-TJg5PGA?autoplay=1',
        },
        {
            id: 6,
            image_url: { DefaulAvatar },
            title: "How To Send & Receive Private Messages",
            content: "Learn how to use this powerful tool that provides personal and private communication between members.",
            video_link: 'https://www.youtube.com/embed/cx-XGPfc_tQ?autoplay=1',
        },
        {
            id: 7,
            image_url: { DefaulAvatar },
            title: "Updating Photos and Link Library",
            content: "AGORACOM provides users with powerful information beyond the post. The Link Library and Photos sections, not available on any other finance site, provide powerful due diligence for all investors both current and future. Use them and contribute to them.",
            video_link: 'https://www.youtube.com/embed/b8-orIyTdc8?autoplay=1',
        },
        {
            id: 8,
            image_url: { DefaulAvatar },
            title: "Discover Great Companies In The Marketplace and Broadcast Centre",
            content: "Learn how to use our Small Cap Marketplace and Broadcast Centre to discover your next great small cap company. These are rich discovery tools that should be used by investors every week.",
            video_link: 'https://www.youtube.com/embed/Rc_JDHfDoqc?autoplay=1',
        },
        {
            id: 9,
            image_url: { DefaulAvatar },
            title: "How & Why To Request A New Hub",
            content: "Ensure that your company is part of the top small cap community in N. America. If you can’t find your company on AGORACOM, request a new hub and we’ll have one up within 48 hours if it qualifies.",
            video_link: 'https://www.youtube.com/embed/0LW0paCSgWw?autoplay=1',
        },
    ]

    useEffect(() => {
        fetchData();
        setIsRendered(true);
    }, [])

    const fetchData = () => {
        try {
            let payload = { page: pageInfo.photo.page };
            const response: any = staticData
            setData(response.filter((id: any, index: number) => index < 4))
            setPageInfo({
                photo: {
                    ...pageInfo.photo,
                    showMore: response.length > 4 ? true : false
                },
            })
        } catch (e: any) {
            console.log(e);

        }
    }
    const tipsPosts = async (newType: string = '') => {
        setLoading({
            ...loading,
            photo: true
        })
        const len = data.length
        const newPage = pageInfo.photo.page + 1;
        let payload = { page: newPage };
        let result: any = await staticData.filter((id: any, index: any) => index >= data.length && index < len + 2)
        let newData: any = [...data, ...result];
        setCount(count + 1)

        let pagePayload: any = { ...pageInfo };
        pagePayload["photo"] = {
            showMore: count != 2,
            page: newPage
        }
        setLoading({
            ...loading,
            photo: false
        })
        setPageInfo(pagePayload);
        setData(newData);
    }

    const renderMainVideo = (video: any) => {
        // const video: any = videos[currentVideo];

        return (
            <div
                className="group aspect-w-16 aspect-h-9 sm:aspect-h-9 bg-neutral-800 rounded-3xl overflow-hidden 
            sm:rounded-[20px] sm:z-0"
                title={video.title}
            >
                {isSafariBrowser() ? (
                    <Fragment>
                        <ReactPlayer
                            url={video.video_link}
                            style={{
                                opacity: isPlay ? 1 : 0,
                                display: isPlay ? "block" : "none",
                            }}
                            playing={false}
                            controls
                            width="100%"
                            height="100%"
                        />
                        {!isPlay && (
                            <Fragment>
                                <div
                                    onClick={() => setIsPlay(true)}
                                    className="cursor-pointer absolute inset-0 flex items-center justify-center z-10"
                                >
                                    <NcPlayIcon className="lg:!w-20 lg:!h-20 lg:!p-8" />
                                </div>
                                <Image
                                    className="object-cover transition-transform group-hover:scale-105 duration-300"
                                    src={video.video_image}
                                    title={video.title}
                                    alt={video.title}
                                    fill
                                    sizes="(max-width: 600px) 480px, 800px"
                                />
                            </Fragment>
                        )}
                    </Fragment>
                ) : (
                    <>
                        <div
                            onClick={() => setIsPlay(true)}
                            className="cursor-pointer absolute inset-0 flex items-center justify-center z-10"
                        >
                            <NcPlayIcon className="lg:!w-20 lg:!h-20 lg:!p-4" />
                        </div>
                        <Image
                            className="object-cover transition-transform group-hover:scale-105 duration-300"
                            src={video.video_image}
                            title={video.title}
                            alt={video.title}
                            fill
                            sizes="(max-width: 600px) 480px, 800px"
                        />
                    </>
                    // <ReactPlayer
                    //   url={`https://www.youtube.com/embed/${video.id}`}
                    //   playing={false}
                    //   controls
                    //   width="100%"
                    //   height="100%"
                    //   light={video.thumbnail}
                    //   playIcon={<NcPlayIcon />}
                    // />
                )}
            </div>
        );
    };

    return (
        <div className="w-full">
            <div className='container block lg:flex py-10 lg:py-16'>
                <div className='flex flex-col w-full lg:w-3/4'>
                    <Heading desc={""} isCenter className="text-defaultBlue-100 mb-3 lg:mb-6">
                        Agoracom Knowledge and Support Center
                    </Heading>
                    <h1 className="mt-3 text-base max-md:text-sm text-gray-600 dark:text-gray-200">Where the small cap invester community comes for answers</h1>
                    <h1 className="mt-3 text-2xl max-md:text-lg  text-dark"><b>The most popular activities on Agoracom</b></h1>
                    <div className="mt-3 flex flex-col gap-3 pr-0 lg:pr-10">
                        <ProfileCard post={data} isPlay={isPlay} setIsPlay={setIsPlay} isRendered={isRendered} renderMainVideo={renderMainVideo} />
                    </div>
                    {
                        pageInfo.photo.showMore ? (
                            <div className="w-full h-fit mt-3 mb-6 lg:mt-6 py-3 px-3 flex justify-center">
                                <ButtonPrimary className=" px-3 py-3 text-center" onClick={() => tipsPosts()} loading={loading.photo} sizeClass="py-3 px-6 lg:py-4">Show More</ButtonPrimary>
                            </div>
                        ) : <></>
                    }
                </div>
                <div className='flex flex-col w-full lg:w-1/4 h-fit px-8 py-7 border-gray-300 border text-justify rounded-xl bg-white dark:bg-neutral-900 dark:border-gray-800'>
                    <div className=" flex flex-row">
                        <div className="w-full h-full">
                            <Image
                                src={success}
                                alt="GFG logo served with static path of public directory"
                                className='w-full'
                            />
                        </div>
                    </div>
                    <div className='text-left my-3'>
                        <h1 className="mt-3 text-md max-md:text-sm text-gray-600 dark:text-gray-200">AGORACOM is one of North America's largest outsourced Investor Relations and Advertising firms for small cap companies. We have represented over 300 small cap companies across all industries including but not limited to technology, resources, cannabis, medical, renewable energy, oil & gas, 3D printing, esports and many more. Our clients trade on all exchanges including the NYSE and NASDAQ but we primarily focus on the TSX, TSX-V, CSE and OTCQB. The following is just a sample of the success stories that our clients have experienced over the years.</h1>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default QuickTips