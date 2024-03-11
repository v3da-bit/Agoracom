import ButtonPrimary from '@/components/Button/ButtonPrimary'
import ButtonSecondary from '@/components/Button/ButtonSecondary';
import ButtonThird from '@/components/Button/ButtonThird';
import Card27 from '@/components/Card27/Card27';
import Nav from '@/components/Nav/Nav';
import NavItem from '@/components/NavItem/NavItem';
import Image from 'next/image';
import React, { Fragment, useEffect, useState } from 'react'
import DefaultAvatar from '@/images/default-image.jpg';
import { ArrowLeftIcon, ArrowLongLeftIcon, Bars3BottomLeftIcon, Bars3Icon, BookmarkIcon, HandThumbUpIcon } from '@heroicons/react/24/solid';
import * as Icons from '@heroicons/react/24/outline';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import ShareButton from '../../Share';
import { useSelector } from 'react-redux';
import MoreButton from '../../More';
import { addCommentMsg, followMessage, likeMessage, restoreCompanyPost, fetchDicussionThread } from '@/requests/Companies';
import Select from '@/components/Select/Select';
import { companyViolations, deletePost } from '@/requests/Companies';
import alertMessage from '@/utils/swalAlert';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import NcPlayIcon from '@/components/NcPlayIcon/NcPlayIcon';
import dynamic from 'next/dynamic';
import { Table } from 'antd';
import ReactStars from "react-rating-stars-component";
import moment from 'moment';
import LikeImage from '@/images/like.png';

const DynamicComponentWithNoSSR = dynamic(
    () => import('@/components/TextEditor/TextEditor'),
    { ssr: false }
)


function Post({ data, setTab, errors, fetchMessageData }: any) {
    const params: any = useParams()
    const menuDropdown: any = {
        1: 'Bashing or Hyping',
        2: 'Insults or Shouting',
        3: 'Profanity',
        4: 'Spam or Off-topic',
        'nil': 'Other'
    };
    const initial = {
        message_id: parseInt(params.type),
        type_id: 1,
        comment: ''
    }
    const style2 = ' font-semibold text-right text-base text-dark'
    const router = useRouter();
    const [violationLoader, setViolationLoader] = useState(false);
    const [pageSize, setPageSize] = useState(5)
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0)

    const [isPlay, setIsPlay] = useState(false);
    const [url, setUrl]: any = useState('');
    const [follow, setFollow] = useState(data?.followed);
    const [like, setLike] = useState(false);
    const [loader, setLoader] = useState(false);
    const [contentLoader, setContentLoader] = useState(false)
    const [likeLoader, setLikeLoader] = useState(false);
    const [violations, setViolations] = useState(initial);
    const [displayViolation, setDisplayViolation] = useState(false);
    const [content, setContent] = useState("");
    const [data1, setData] = useState([])
    const [formData, setFormData] = useState({
        displayOnBulletin: false,
        isFeatured: false,
        followThread: false
    })
    const { currentUser, loggedIn } = useSelector((state: any) => {
        return {
            currentUser: state.auth.currentUser,
            loggedIn: state.auth.loggedIn
        };
    });

    const handleFilterChange = (key: any, val: any) => {
        setViolations({
            ...violations,
            [key]: val
        });
    }
    const buttonClick = (companyId = null, id = null) => {
        if (id) {
            router.push(`/company/${companyId}/discussion/${id}`)
        }
    }

    useEffect(() => {
        setLike(data?.like);
        if (data?.children?.length > 0) {
            let newList: any = [];
            data?.children?.forEach((value: any) => {
                newList.push({
                    key: value?.id,
                    user: <Link href={`/company/${params.id}/discussion/${value?.id}`}>{value?.title}</Link>,
                    rating: <div className='flex'><Image src={LikeImage} width="20" alt="" height="15" className="mr-1" />{value?.rating}</div>,
                    author: value?.username,
                    createdDate: moment(value?.created_at).format('lll'),
                })
            })
            setData(newList);
        }
    }, [data])

    const handleChange = (key: any, value: any) => {
        setFormData({
            ...formData,
            [key]: value
        })
    }

    const deleteCompanyPost = async () => {
        document.getElementById('popUp').style.display = 'none'
        const response = await deletePost(data?.id)
        if (response.status === 201) {
            alertMessage({
                title: "Message deleted successfully",
                text: "",
                icon: "success",
                timer: 3000
            });
            router.push(`/company/${data?.company_id}`)
        }
    }
    const saveMsg = async () => {
        setContentLoader(true)
        try {
            if (content.length > 0) {
                const fd: any = new FormData();
                const payload: any = {
                    parent_id: parseInt(params.type),
                    content: content,
                    company_id: data.company_id,
                    is_featured: formData?.isFeatured,
                    is_shown_on_homepage: formData?.displayOnBulletin
                }
                Object.keys(payload).forEach((key) => {
                    fd.append(`message[${key}]`, payload[key]);
                });
                fd.append('follow', formData.followThread);
                const response: any = await addCommentMsg(fd)
                if (response.status === 200 || response.status === 201) {
                    alertMessage({
                        title: "Message created successfully",
                        text: "",
                        icon: "success",
                        timer: 3000
                    });
                    setContent("");
                    setFormData({
                        followThread: false,
                        isFeatured: false,
                        displayOnBulletin: false
                    })
                    if (response?.data?.id) {
                        router.push(`/company/${data.company_id}/discussion/${response.data.id}`)
                    }
                }
            } else {
                document.getElementById('alertComment').style.display = 'block'
            }
        } catch (e: any) {
            console.log(e);
        } finally {
            setContentLoader(false)
        }
    }
    const saveViolation = async () => {
        setViolationLoader(true);
        try {
            const response = await companyViolations(violations)
            if (response.status === 201) {
                alertMessage({
                    title: "Violation created successfully",
                    text: "",
                    icon: "success",
                    timer: 3000
                });
                router.push(`/company/${data?.company_id}`)
            }
            hideViolation();
        } catch (e: any) {
            console.log(e);
        } finally {
            setViolationLoader(false);
        }
    }

    const navigateDiscussion = () => {
        setTab(2)
    }

    useEffect(() => {

        if (data?.id) {
            const image = data.cover_photo_url || DefaultAvatar
            setUrl(image);
        }
        if (data?.followed) {
            setFollow(data?.followed)
        }
    }, [data])

    const followUnfollow = async () => {
        if (loggedIn) {
            setLoader(true)
            const response = await followMessage(data?.id, !follow)
            setLoader(false)
            if (response.status === 200 || response.status === 201) {
                setFollow(!follow)
            }
        } else {
            router.push('/auth/login');
        }
    }

    const likeUnlike = async () => {
        if (loggedIn) {
            setLikeLoader(true);
            const response = await likeMessage(data?.id, !like)
            setLikeLoader(false);
            if (response.status === 200 || response.status === 201) {
                setLike(!like)
            }
        } else {
            router.push('/auth/login');
        }
    }

    const showViolation = () => {
        setDisplayViolation(true);
        // document.getElementById('popUp').style.display = 'block';
    }

    const hideViolation = () => {
        setDisplayViolation(false);
        // document.getElementById('popUp').style.display = 'block';
    }

    const showDeletePost = () => {
        document.getElementById('popUp').style.display = 'block';
    }

    const hideDeletePost = () => {
        document.getElementById('popUp').style.display = 'none';
    }

    const restorePost = async () => {
        const response = await restoreCompanyPost(data?.id)
        if (response.status === 200) {
            alertMessage({
                title: "Message restored successfully",
                text: "",
                icon: "success",
                timer: 3000
            });
            fetchMessageData(data?.id);
        }
    }
    const columns = [
        {
            title: "Message Title",
            dataIndex: 'user',
            sorter: (a: any, b: any) => a.user.length - b.user.length,
        }, {
            title: 'Rating',
            dataIndex: 'rating',
            sorter: (a: any, b: any) => a.author.length - b.author.length,
        }, {
            title: 'Author',
            dataIndex: 'author',
            sorter: (a: any, b: any) => a.author.length - b.author.length,
        }, {
            title: 'Date',
            dataIndex: 'createdDate',
            sorter: (a: any, b: any) => a.createdDate.length - b.createdDate.length,
        }];
    function onChange(pagination: any, filters: any, sorter: any) {
        if (pageSize != pagination.pageSize || currentPage != pagination.current) {
            setPageSize(pagination.pageSize)
            setCurrentPage(pagination.current);
            // discussionThreads('', pagination.currentPage)

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
                className="group aspect-w-16 aspect-h-9 sm:aspect-h-9 bg-neutral-800 rounded-3xl overflow-hidden mt-3
            sm:rounded-[20px] sm:z-0"
                title={video.title}
            >
                {<>
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
                        width="1200"
                        height="600"
                    // fill
                    // sizes="(max-width: 600px) 480px, 800px"
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
                }
            </div>
        );
    };

    return (
        <div className='w-full border-t-2 border-black'>
            <div id='popUp' className="relative z-10 hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">

                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        {/* <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">You Want to Save IT!</h3> */}
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">Are you sure you want to delete the Message?</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button type="button" onClick={() => hideDeletePost()} className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">No</button>
                                <button type="button" onClick={() => deleteCompanyPost()} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Yes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-4 mt-6 w-full flex flex-col gap-3 max-sm:gap-5 justify-center">
                <div className="flex flex-row max-md:flex-col gap-3 max-sm:gap-5">
                    <div className="w-full flex max-md:justify-center max-sm:flex-col max-sm:gap-5 items-center flex-row gap-3 justify-between">
                        <div className="flex">
                            <ButtonPrimary sizeClass="py-2.5 px-4 sm:py-3 sm:px-4 mr-3" onClick={navigateDiscussion}
                                fontSize="text-sm lg:text-base font-medium">
                                <ArrowLeftIcon className="w-5 h-6 mr-2" />
                                Discussion
                            </ButtonPrimary>
                            {
                                data?.parent_id ? (
                                    <Link href={`/company/${data.company_id}/discussion/${data.parent_id}`}>
                                        <ButtonSecondary sizeClass="py-3 px-4 sm:py-3 sm:px-6 mr-2"
                                            fontSize="text-sm lg:text-base font-medium">
                                            Parent
                                        </ButtonSecondary>
                                    </Link>
                                ) : <></>
                            }

                        </div>
                        {/* <div className="flex ml-3"> */}
                        <div className="flex-none lg:flex justify-between mb-7">

                            <ButtonSecondary className={data.back_id ? '' : 'opacity-50'} sizeClass="py-3 px-4 sm:py-3 sm:px-6 mr-2"
                                disabled={!data.back_id} onClick={() => buttonClick(data?.company_id, data?.back_id)}
                                fontSize="text-sm lg:text-base font-medium">
                                Previous
                            </ButtonSecondary>
                            <ButtonSecondary className={data.next_id ? '' : 'opacity-50'} sizeClass="py-3 px-4 sm:py-3 sm:px-6"
                                disabled={!data.next_id} onClick={() => buttonClick(data?.company_id, data?.next_id)}
                                fontSize="text-sm lg:text-base font-medium">
                                Next
                            </ButtonSecondary>

                        </div>
                        {/* </div> */}
                    </div>
                </div>
                <div className='mt-4'>
                    {
                        errors.length > 0 ? <>
                            {
                                errors.map((err: any, index: number) => {
                                    return <Fragment key={index}>
                                        <div className="p-4 mb-4 text-sm text-red-800 font-semibold rounded-lg border-2 !border-red-100 bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                            {err}
                                        </div>
                                    </Fragment>
                                })
                            }
                        </> : <>
                            <div className="flex flex-col gap-3 w-full mt-3">
                                <Card27
                                    className="p-3 hover:bg-neutral-200 dark:hover:bg-neutral-700 mb-3"
                                    post={data}
                                    screen='discussion'
                                />
                                {
                                    loggedIn && (currentUser?.userRole === 'admin' || data.owner == true) ? (
                                        <div className='w-full py-1 px-2 flex border-[1px] font-semibold text-secondary-400 border-neutral-200 rounded'>
                                            <Link className='pr-1' href={`/company/${data?.company_id}/edit/${data?.id}`}>Edit</Link>
                                            {data?.is_removed ? <></> : <>
                                                / <button className='bg-transparent' onClick={showDeletePost}><span className='pl-1'>Remove</span></button></>}
                                        </div>
                                    ) : <></>
                                }
                                <div className="flex flex-col gap-2">
                                    {
                                        data?.cover_photo_url ? (
                                            <div className='w-full h-fit flex justify-center lg:block overflow-hidden rounded-lg'>
                                                <Image
                                                    className=' w-full max-h-[456px] h-fit object-cover'
                                                    src={url}
                                                    onError={() => {
                                                        setUrl(DefaultAvatar)
                                                    }}
                                                    width='500'
                                                    height='300'
                                                    alt="GFG logo served with static path of public directory"
                                                /> </div>
                                        ) : <></>
                                    }
                                    {
                                        data?.video_link ? (
                                            <>
                                                {
                                                    isPlay ? (
                                                        <div className="aspect-w-16 aspect-h-9 mt-3">
                                                            <iframe
                                                                src={data.video_link}
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                allowFullScreen
                                                                title="ncblog hero video"
                                                            ></iframe>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            {renderMainVideo(data)}
                                                        </>
                                                    )
                                                }
                                            </>
                                        ) : <></>
                                    }
                                    <div className="mt-5">
                                        <h1 className='!text-base' dangerouslySetInnerHTML={{ __html: data?.content }}></h1>
                                        {loader ?
                                            <div className='flex items-center justify-center '>
                                                <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>
                                            </div>
                                            :
                                            <>{data1?.length > 0 ? <Table className='mt-4 border-[1px]' columns={columns} pagination={{ pageSizeOptions: [], total: data1.length, current: currentPage, pageSize: pageSize, showSizeChanger: true }} dataSource={data1} onChange={onChange} /> : <></>}</>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="w-full pt-3 mt-5 flex justify-between flex-row max-sm:flex-col gap-3 max-sm:gap-5">
                                <div className='flex'>
                                    <ButtonThird sizeClass="mr-2 py-2.5 px-4 sm:py-3 !text-md sm:px-6" onClick={likeUnlike}
                                        fontSize="text-sm lg:text-md font-medium" disabled={likeLoader} loading={likeLoader}>
                                        {
                                            !likeLoader ? (
                                                <>
                                                    {
                                                        like ? (
                                                            <>
                                                                <HandThumbUpIcon className='w-6 h-6' />
                                                                <span className='ml-1'>
                                                                    Unlike
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Icons.HandThumbUpIcon className='w-6 h-6' />
                                                                <span className='ml-1'>
                                                                    Like
                                                                </span>
                                                            </>
                                                        )
                                                    }
                                                </>
                                            ) : <></>
                                        }
                                    </ButtonThird>
                                    <ButtonThird sizeClass="mr-2 py-2.5 px-4 sm:py-3 !text-md sm:px-6 ml-2" onClick={followUnfollow}
                                        fontSize="text-sm lg:text-md font-medium" disabled={loader} loading={loader}>
                                        {
                                            !loader ? (
                                                <>
                                                    {
                                                        follow ? (
                                                            <>
                                                                <BookmarkIcon className='w-6 h-6' />
                                                                <span className='ml-1'>
                                                                    Unfollow
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Icons.BookmarkIcon className='w-6 h-6' />
                                                                <span className='ml-1'>
                                                                    Follow
                                                                </span>
                                                            </>
                                                        )
                                                    }
                                                </>
                                            ) : <></>
                                        }
                                    </ButtonThird>
                                    <ShareButton title={data?.title} />
                                    {
                                        loggedIn ? (
                                            <>
                                                <MoreButton post={data} showViolation={showViolation} restorePost={restorePost} isRemoved={data?.is_removed} showDeletePost={showDeletePost} />
                                            </>
                                        ) : <></>
                                    }
                                </div>
                                <div className="flex ml-3">
                                    <ButtonSecondary className={data.back_id ? '' : 'opacity-50'} sizeClass="py-3 px-4 sm:py-3 sm:px-6 mr-2" disabled={!data.back_id} onClick={() => buttonClick(data?.company_id, data?.back_id)}
                                        fontSize="text-sm lg:text-md font-medium">
                                        Previous
                                    </ButtonSecondary>
                                    <ButtonSecondary className={data.next_id ? '' : 'opacity-50'} sizeClass="py-3 px-4 sm:py-3 sm:px-6" disabled={!data.next_id} onClick={() => buttonClick(data?.company_id, data?.next_id)}
                                        fontSize="text-sm lg:text-md font-medium">
                                        Next
                                    </ButtonSecondary>
                                </div>
                            </div >
                            {
                                displayViolation ? (
                                    <>
                                        <hr className='mt-6' />
                                        <div className="flex-col justify-center gap-3 mt-6">
                                            <div className='flex w-1/2 flex-row items-center gap-3'>
                                                <h1 className=''><b>Type a Violation:</b></h1>
                                                <Select className='' rounded='rounded-full' menuDropdown={menuDropdown} selectedValue={violations.type_id} setMenu={(e: any) => handleFilterChange('type_id', e != 'nil' ? parseInt(e) : e)}></Select>
                                            </div>
                                            <div className='flex justify-center flex-col gap-3'>
                                                <h1><b>Comment:</b></h1>
                                                <div className="flex-shrink-0   lg:mb-0 grow lg:grow-0 w-full">
                                                    <form className="relative">
                                                        <textarea
                                                            required
                                                            aria-required
                                                            value={violations.comment}
                                                            onChange={(e) => handleFilterChange('comment', e.target.value)}
                                                            className="text-neutral-800 border-neutral-200 rounded-md h-44 w-full px-4 dark:text-neutral-200 max-md:w-full dark:bg-neutral-800"
                                                        />
                                                    </form>

                                                </div>
                                                <h1 className='m-0 p-0'>Please describe the nature of this report (does it violate AGORACOM's 6 Rules Of Use?)</h1>
                                            </div>
                                            <div className="py-3 px-3 mt-3 flex flex-row items-center gap-4 max-sm:flex-col">
                                                <ButtonPrimary sizeClass='py-2.5 px-5' loading={violationLoader} onClick={saveViolation}>Save</ButtonPrimary>
                                                <h2 className={style2}>or</h2>
                                                <ButtonPrimary onClick={hideViolation} className=' bg-white hover:bg-slate-300 !border-[1px] !border-neutral-200' sizeClass='py-2.5 px-5'><span className='text-red-600'>Cancel</span></ButtonPrimary>
                                            </div>
                                        </div>
                                    </>
                                ) : <></>
                            }
                            {
                                loggedIn ? <>
                                    <div className='w-full mt-5'>
                                        <DynamicComponentWithNoSSR className='bg-white' data={content} setData={(e: any) => setContent(e)} />
                                        <h1 id='alertComment' className='text-red-600 hidden'>Please Write the Comment in it</h1>
                                        {currentUser?.userRole === 'admin' ?
                                            <>
                                                <div className="flex items-center mt-1">
                                                    <input id="default-checkbox1" type="checkbox" checked={formData?.isFeatured} onChange={(e: any) => handleChange('isFeatured', e.target.checked)}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Featured</label>
                                                </div>
                                                <div className="flex items-center mt-1">
                                                    <input id="default-checkbox" type="checkbox" checked={formData?.displayOnBulletin} onChange={(e: any) => handleChange('displayOnBulletin', e.target.checked)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Display on Industry Bulletin</label>
                                                </div>
                                            </> : <></>}
                                        <div className={"flex items-center " + (currentUser?.userRole === 'admin' ? 'mt-1' : 'mt-3')}>
                                            <input id="checked-checkbox" type="checkbox" checked={formData?.followThread} onChange={(e: any) => handleChange('followThread', e.target.checked)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Follow this message/thread</label>
                                        </div>
                                    </div>
                                    <ButtonPrimary sizeClass='py-2.5 px-5 mt-5' loading={contentLoader} onClick={saveMsg}>Save</ButtonPrimary>
                                </> : (
                                    <h1 className='mt-2 font-semibold text-sm text-gray-600 dark:text-gray-200'>Please <Link href='/auth/login' className=' text-blue-700'>login</Link> to post a reply</h1>
                                )
                            }
                        </>
                    }
                </div>
            </div >
        </div >
    )
}

export default Post