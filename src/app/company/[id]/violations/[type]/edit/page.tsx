'use client'
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import ButtonSecondary from '@/components/Button/ButtonSecondary';
import Card27 from '@/components/Card27/Card27';
import Heading from '@/components/Heading/Heading';
import Select from '@/components/Select/Select';
import { ViolationEdit, processViolation } from '@/requests/Profile';
import alertMessage from '@/utils/swalAlert';
import moment from 'moment';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";

function EditPage({ id, setEdit, fetchListData }: any) {
    const params = useParams()
    const [data1, setData]: any = useState({})
    const [cardData, setCardData] = useState({
        id: '',
        created_at: '',
        avatar_url: '',
        company_name: '',
        title: '',
    })
    const types: any = {
        "1": {
            email_to_poster: 'We have received a violation report regarding your post and have found it in violation of our policy. As such, we have disabled your access to Agoracom.',
            email_to_reporter: 'Thank you for your recent violation report and participating on AGORACOM. The message that you correctly identified as a violation has now been removed. Thank you for your vigilance and helping to keep our forums clean and constructive for the benefit of all AGORACOM members. Keep up the great work! The AGORACOM Team',
        }, // Ban
        "2": {
            email_to_poster: 'We have received a violation report regarding your post, however we don’t believe it is in violation of our policy',
            email_to_reporter: 'Thank you for your recent violation report and participating on AGORACOM. We don’t believe this post is in violation of our policy. Thank you for your vigilance and helping to keep our forums clean and constructive for the benefit of all AGORACOM members. Keep up the great work! The AGORACOM Team',
        }, // Ignore
        "3": {
            email_to_poster: 'We have received a violation report regarding your post and have found it in violation of our policy.',
            email_to_reporter: 'Thank you for your recent violation report and participating on AGORACOM. The message that you correctly identified as a violation has now been removed. Thank you for your vigilance and helping to keep our forums clean and constructive for the benefit of all AGORACOM members. Keep up the great work! The AGORACOM Team',
        } // Warn
    }
    const [globalLoader, setGlobalLoader] = useState(false)
    const router = useRouter()
    const [loader, setLoader] = useState(false);
    const [errors, setErrors]: any = useState([]);
    const [value, setValue] = useState({
        delete_message: false,
        ban_address: false,
        email_to_poster: "",
        email_to_reporter: "",
        reason: '',
        status_id: 1
    })
    const handleChange = (key: any, val: any) => {
        setValue({
            ...value,
            [key]: val
        })
    }
    useEffect(() => {
        const selectedData = types[value.status_id.toString()];
        setValue({
            ...value,
            ...selectedData
        })
    }, [value.status_id])
    useEffect(() => {
        fetchData(id)
    }, [])
    const fetchData = async (id: any) => {
        setGlobalLoader(true)
        const response = await ViolationEdit(id)
        setGlobalLoader(false)
        setData(response.data)
        setCardData({
            ...cardData,
            id: response.data.message.id,
            created_at: response.data.message.created_at,
            avatar_url: response.data.message.avatar_url,
            company_name: response.data.message.company_name,
            title: response.data.message.title
        })
        // console.log(response.data);

    }

    const submitData = async (e: any) => {
        e.stopPropagation();
        e.preventDefault();
        try {
            setLoader(true);
            setErrors([]);
            const response = await processViolation(id, value)
            setLoader(false);
            if (response.status === 200) {
                alertMessage({
                    title: "Violation Updated successfully",
                    text: "",
                    icon: "success",
                    timer: 3000
                });
                setEdit(false)
                fetchListData()
                // router.push(`/company/${params.id}`)
            } else {
                alertMessage({
                    title: "Some Error Occured",
                    text: "",
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (e: any) {
            setLoader(false);
            if (e?.response?.data?.errors?.length > 0) {
                setErrors(e?.response?.data?.errors);
            } else {
                setErrors(["Something went wrong. Try again"]);
            }
        }
    }
    // const data = {


    //     href: '/',
    //     created_at: Date.now(),
    //     company_logo_url: '',
    //     company: {
    //         name: data1?.company_name
    //     },
    //     content: 'hello'

    // }
    const [discussion1, setDiscussion1] = useState([])
    const onTypeChange = (val: any) => {

        setDiscussion1(val);
    }
    const menuDropdown: any = {
        "1": 'Ban User',
        "2": 'Ignore Violation',
        "3": 'Warn User',
    };
    const style = 'font-semibold text-md max-md:text-sm text-gray-600 dark:text-gray-200 line-clamp-5 text-right'
    const style1 = 'mt-3 font-semibold text-sm text-gray-600 dark:text-gray-200'

    const style2 = 'mt-3 font-semibold text-right text-sm text-dark'
    const rating = data1.reporter?.rating_votes.split(' ')
    return (

        <div className='w-full p-6 bg-white dark:bg-neutral-900'>
            {globalLoader ?
                <div className='flex items-center justify-center py-10'>
                    <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                </div>
                : <>
                    <div className="flex justify-between gap-2 mt-2 mb-6">
                        <h3 className=' text-2xl font-bold'>Resolve Violation</h3>
                        <ButtonSecondary sizeClass='py-2.5 px-5' onClick={() => setEdit(false)}>Back</ButtonSecondary>

                    </div>
                    <Card27
                        className="p-3 hover:bg-neutral-200 dark:hover:bg-neutral-700 mb-3"
                        post={cardData}
                    />
                    <h1 className={style1} dangerouslySetInnerHTML={{ __html: data1.message ? data1.message.content : '' }}></h1>
                    {/* <h1 className={style1}>{data1?.comment}</h1> */}

                    <Heading className='py-4' desc=''>Reporter</Heading>
                    <div className="grid grid-cols-1 gap-5 container">
                        <div className="flex flex-row justify-center gap-2">
                            <div className=" w-1/4">
                                <h1 className={style}>Reported By:</h1>
                            </div>
                            <div className="grid grid-flow-row gap-1 w-3/4">
                                <Link className='text-secondary-400' href={`/members/${data1?.reporter?.id}`}><h1>{data1?.reporter?.username}</h1></Link>
                                <ReactStars
                                    count={5}
                                    // onChange={ratingChanged}
                                    value={data1.reporter?.rating}
                                    edit={false}
                                    size={24}
                                    activeColor="#ffd700"
                                />
                                <h1>Rating: {rating ? rating[0] + ' (' + rating[1] + ' Votes)' : ''} </h1>
                                <h1>Ranking Points: {data1.reporter?.ranking_points}</h1>
                                <h1>Role: {data1.reporter?.role}</h1>
                                <h1>Member since: {moment(data1.reporter?.created_at).format('lll')}</h1>
                                <h1>Violations: {data1.reporter?.violation_count}</h1>
                            </div>
                        </div>
                        <div className="flex flex-row justify-center gap-2">
                            <div className="w-1/4">
                                <h1 className={style}>Violation type:</h1>
                            </div>
                            <div className="grid grid-flow-row gap-2 w-3/4">
                                <h1>{data1?.type_name}</h1>

                            </div>
                        </div>
                        <div className="flex flex-row justify-center gap-2">
                            <div className=" w-1/4">
                                <h1 className={style}>Report Comments:</h1>
                            </div>
                            <div className="grid grid-flow-row gap-2 w-3/4">
                                <h1>{data1?.comment}</h1>

                            </div>
                        </div>
                        <div className="flex flex-row justify-center gap-2">
                            <div className=" w-1/4">
                                <h1 className={style}>Date Reported:</h1>
                            </div>
                            <div className="grid grid-flow-row gap-2 w-3/4">
                                <h1>Fri Apr 28 2023, 10:34PM</h1>

                            </div>
                        </div>

                    </div>
                    <div className='py-4 my-4 h-10 flex items-center w-full bg-red-600'>
                        <h1 className='text-white px-4 font-bold'>Action Taken</h1>
                    </div>
                    <div className="grid grid-cols-1 gap-5 ">
                        <div className="flex flex-row justify-center gap-2">
                            <div className="flex items-center justify-end w-1/4">
                                <h1 className={style}>Action:</h1>
                            </div>
                            <div className="flex justify-start w-3/4">
                                <Select menuDropdown={menuDropdown} selectedValue={value.status_id} setMenu={(e: any) => {
                                    handleChange('status_id', parseInt(e))

                                }} />
                            </div>
                        </div>
                        {
                            value?.status_id === 1 ? (
                                <div className="grid grid-cols-1 gap-5 ">
                                    <div className="flex flex-row justify-center gap-2">
                                        <div className="flex items-center justify-end w-1/4">

                                        </div>
                                        <div className="flex flex-col w-3/4">
                                            <div className="flex items-center mb-4">
                                                <input checked={value?.ban_address} onChange={(e: any) => handleChange('ban_address', e.target.checked)} id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ban this IP address (note: 0 other unique users have visited from this IP)</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input checked={value?.delete_message} onChange={(e: any) => handleChange('delete_message', e.target.checked)} id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Delete offending message</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : <></>}
                        <div className="grid grid-cols-1 gap-5 ">
                            <div className="flex flex-row justify-center gap-2">
                                <div className="flex justify-end w-1/4">
                                    <h1 className={style}>To Poster ( ipco ):</h1>
                                </div>
                                <div className="w-[50vw]">
                                    <div className="flex-shrink-0 w-full">
                                        <form className="relative">
                                            <textarea
                                                required
                                                aria-required
                                                disabled
                                                value={value?.email_to_poster}
                                                onChange={(e) => handleChange('email_to_poster', e.target.value)}
                                                className="text-neutral-800 border-neutral-300 h-44 w-full px-4 dark:text-neutral-200 max-md:w-full dark:bg-neutral-800"
                                            />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-5 ">
                            <div className="flex flex-row justify-center gap-2">
                                <div className="flex justify-end w-1/4">
                                    <h1 className={style}>To Reporter ( {data1?.reporter?.username} ):</h1>
                                </div>
                                <div className="w-[50vw]">
                                    <div className="flex-shrink-0 w-full">
                                        <form className="relative">
                                            <textarea
                                                required
                                                aria-required
                                                disabled
                                                value={value?.email_to_reporter}
                                                onChange={(e) => handleChange('email_to_reporter', e.target.value)}
                                                className="text-neutral-800 border-neutral-300 h-44 w-full px-4 dark:text-neutral-200 max-md:w-full dark:bg-neutral-800"
                                            />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-5 ">
                            <div className="flex flex-row justify-center gap-2">
                                <div className="flex justify-end w-1/4">
                                    <h1 className={style}>Ban Reason:</h1>
                                </div>
                                <div className="w-[50vw]">
                                    <div className="flex-shrink-0 w-full">
                                        <form className="relative">
                                            <textarea
                                                required
                                                aria-required
                                                value={value?.reason}
                                                onChange={(e) => handleChange('reason', e.target.value)}
                                                className="text-neutral-800 border-neutral-300 h-44 w-full px-4 dark:text-neutral-200 max-md:w-full dark:bg-neutral-800"
                                            />
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                        {
                            errors.length > 0 && errors.map((item: any, index: number) => {
                                return (
                                    <div key={index} className="p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                        {item}
                                    </div>
                                )
                            })
                        }
                        <div className="py-4 px-3 flex flex-row items-center justify-center gap-4 ">
                            <ButtonPrimary sizeClass='py-2.5 px-4' loading={loader} onClick={submitData}>Save</ButtonPrimary>
                        </div>
                    </div>
                </>}
        </div>

    )
}

export default EditPage