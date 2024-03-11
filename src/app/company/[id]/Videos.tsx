import Image from 'next/image'
import React, { Fragment, useEffect, useState } from 'react'
import DefaultImage from '@/images/default-image.jpg';
import DefaultAvatar from '@/images/Icons/avatar.png';
import { useParams, useRouter } from 'next/navigation';
import { getComapnyVideos } from '@/requests/Companies';
import ReactPlayer from "react-player";
import isSafariBrowser from "@/utils/isSafariBrowser";
import NcPlayIcon from '@/components/NcPlayIcon/NcPlayIcon';
import Card12 from '@/components/Card12/Card12';

const Videos = ({ userData }: any) => {
    const style = 'font-semibold text-xl text-white max-md:text-md'
    const style1 = 'font-semibold text-xl max-md:text-md'
    const style2 = 'font-semibold text-blue-500 text-xl max-md:text-md'
    const params = useParams();
    const router = useRouter();
    const [isRendered, setIsRendered] = useState(false);
    const [isPlay, setIsPlay] = useState(0);
    const [videoData, setVideoData]: any = useState([])
    const [pageInfo, setPageInfo] = useState({
        video: {
            showMore: false,
            page: 1
        },
    })
    const [loading, setLoading] = useState({
        video: false,
    })
    const [globalLoader, setGlobalLoader] = useState(false)

    const fetchData = async (id: any) => {
        try {
            let payload = { page: pageInfo.video.page };

            const response: any = await getComapnyVideos(id, payload);
            setVideoData(response.data)
            let page = JSON.parse(response?.headers.toJSON()?.pagy);

            // console.log(researchInfo);


            setPageInfo({


                video: {
                    ...pageInfo.video,
                    showMore: page.next != null ? true : false
                },
            })



        } catch (e: any) {
            console.log(e);

        }
    }
    const photoPosts = async (newType: string = '') => {
        setLoading({
            ...loading,
            video: true
        })
        const newPage = newType ? 1 : pageInfo.video.page + 1;
        let payload = { page: newPage };
        // const type = newType ? newType : discussion;
        setGlobalLoader(true)
        let result: any = await getComapnyVideos(userData.id, payload);
        setGlobalLoader(false)
        let newData: any = [...videoData, ...result.data];;
        let page = JSON.parse(result?.headers.toJSON()?.pagy);
        let pagePayload: any = { ...pageInfo };
        pagePayload["video"] = {
            showMore: page.next != null,
            page: newPage
        }
        setLoading({
            ...loading,
            video: false
        })
        setPageInfo(pagePayload);
        setVideoData(newData);
    }
    useEffect(() => {
        if (params.id) {
            fetchData(params.id);
            setIsRendered(true);
        } else {
            router.back();
        }
    }, [])

    const getUrl = (url: any) => {
        if (url?.toString().includes("s3.amazonaws.com") || url?.toString().includes(".com")) {
            return url;
        } else {
            return DefaultImage;
        }
    }

    const renderMainVideo = (video: any) => {
        if (video?.video_link?.includes('shorts')) {
            let code: any = video?.video_link?.indexOf('shorts/')
            video.video_image = 'https://img.youtube.com/vi/' + video?.video_link?.slice(code + 7,) + '/hqdefault.jpg'
            video.video_link = video.video_link.replace('shorts', 'embed')
        }
        if (video?.video_link?.includes('embed')) {
            let code: any = video?.video_link?.indexOf('embed/')
            video.video_image = 'https://img.youtube.com/vi/' + video?.video_link.slice(code + 6,) + '/hqdefault.jpg'
        }
        if (video?.video_link?.includes('youtu.be/')) {
            let code: any = video?.video_link?.indexOf('youtu.be/')
            video.video_image = 'https://img.youtube.com/vi/' + video?.video_link.slice(code + 9,) + '/hqdefault.jpg'
        }
        if (video?.video_image.includes('?autoplay=1')) {
            video.video_image = video?.video_image.replace('?autoplay=1', '')
        }

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
                                    onClick={() => setIsPlay(video.id)}
                                    className="cursor-pointer absolute inset-0 flex items-center justify-center z-10"
                                >
                                    <NcPlayIcon className="lg:!w-20 lg:!h-20 lg:!p-8" />
                                </div>
                                <Image
                                    className="object-cover transition-transform group-hover:scale-105 duration-300"
                                    src={getUrl(video.video_image)}
                                    title={video.title}
                                    alt={video.title}
                                    width="500"
                                    height="200"
                                    sizes="(max-width: 600px) 480px, 800px"
                                // fill
                                />
                            </Fragment>
                        )}
                    </Fragment>
                ) : (
                    <>
                        <div
                            onClick={() => setIsPlay(video.id)}
                            className="cursor-pointer absolute inset-0 flex items-center justify-center z-10"
                        >
                            <NcPlayIcon className="lg:!w-20 lg:!h-20 lg:!p-4" />
                        </div>
                        <Image
                            className="object-cover transition-transform group-hover:scale-105 duration-300"
                            src={getUrl(video.video_image)}
                            title={video.title}
                            alt={video.title}
                            width="500"
                            height="200"
                            // fill
                            sizes="(max-width: 600px) 480px, 800px"
                        />
                    </>
                    // <ReactPlayer
                    //   url={`https://www.youtube.com/watch?v=${video.id}`}
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
        <div className='w-full px-3 py-3 border-t-2 grid grid-flow-row gap-5 border-black'>
            {
                globalLoader ?
                    <div className='flex items-center justify-center py-10'>
                        <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>
                    :
                    <>
                        {videoData.length > 0 ?
                            <>
                                <div className="mt-3 grid grid-flow-row gap-2">
                                    <Card12 post={videoData[0]} isRendered={isRendered} screen="Company-Detail" hideDiscussion={true} isVideo={true} isPlay={isPlay === videoData[0]?.id}
                                        setIsPlay={setIsPlay} renderMainVideo={renderMainVideo} />
                                </div>


                                <div className="grid grid-cols-3 gap-3">
                                    {videoData.map((value: any, index: number) => {
                                        if (index != 0) {
                                            return (
                                                <Card12 key={index} post={value} isRendered={isRendered} screen="Company-Detail" hideDiscussion={true} isVideo={true} isPlay={isPlay === value.id}
                                                    setIsPlay={setIsPlay} renderMainVideo={renderMainVideo} />
                                                // <div key={index} className="mt-3 grid grid-flow-row gap-3">
                                                //     <div className='w-full h-fit flex justify-center lg:block '>
                                                //         <Image
                                                //             className=' w-full max-h-[456px] h-fit'
                                                //             src={DefaultImage}
                                                //             alt="GFG logo served with static path of public directory"
                                                //             height="100"
                                                //             width="100"
                                                //         /> </div>
                                                //     <div className="grid grid-flow-row gap-3">
                                                //         <h1 className={style1}>aa</h1>
                                                //         <div className="flex flex-row gap-3">
                                                //             <div className=' h-8 w-8 rounded-full bg-white overflow-hidden'><Image
                                                //                 src={DefaultAvatar}
                                                //                 alt="GFG logo served with static path of public directory"
                                                //                 height="100"
                                                //                 width="400"
                                                //             /> </div>
                                                //             <h1 className={style1}>aa</h1>
                                                //             <h1 className={style2}>aa</h1>
                                                //         </div>
                                                //     </div>
                                                // </div>
                                            )
                                        }
                                    })}
                                </div>
                            </>
                            : <></>
                        }
                    </>
            }
        </div>
    )
}

export default Videos