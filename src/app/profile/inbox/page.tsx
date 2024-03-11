'use client'
import ButtonCircle from '@/components/Button/ButtonCircle'
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import Card23 from '@/components/Card23/Card23'
import Card30 from '@/components/Card30/page'
import Input from '@/components/Input/Input'
import Select from '@/components/Select/Select'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Heading from '@/components/Heading/Heading'
import { getInboxData, getSentData, deleteMsg } from '@/requests/Companies'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { createPrivateMsg, getUserInboxData } from '@/requests/Profile'
import { getSearch } from '@/requests/Search'
import alertMessage from '@/utils/swalAlert'
import dynamic from 'next/dynamic'
import Avatar from '@/components/Avatar/Avatar'
import DefaultAvatar from '@/images/Icons/avatar.png';
import ButtonSecondary from '@/components/Button/ButtonSecondary'
import ButtonThird from '@/components/Button/ButtonThird'
import moment from 'moment'


const DynamicComponentWithNoSSR = dynamic(
    () => import('@/components/TextEditor/TextEditor'),
    { ssr: false }
)

function InboxPage({ userId }: any) {

    const [create, setCreate] = useState(false)
    const [data, setData] = useState([])
    const router = useRouter()
    const queryParams = useSearchParams()
    const [type, setType] = useState(1);
    const [globalLoader, setGlobalLoader] = useState(false)
    const [userid, setUserId] = useState('')
    const [subject, setSubject] = useState('')
    const [content, setContent] = useState('')
    const [Uid, setUid] = useState(0)
    const [deleteLoader, setDeleteLoader] = useState(false);
    const [errors, setErrors] = useState([]);
    const onTypeChange = (val: any) => {
        setType(val);
        setCreate(false);
        fetchData(val);
    }
    const style = 'mt-2 font-semibold text-base max-md:text-md text-dark line-clamp-5'
    const style2 = 'mt-1 font-semibold text-sm text-gray-600 dark:text-gray-200'
    const menuDropdown = {
        1: 'Inbox',
        2: 'Sent Messages'
    }

    useEffect(() => {
        if (!create) {
            reset()
        }
    }, [create]);

    useEffect(() => {
        fetchData();
        const item: any = sessionStorage.getItem('private-chat');
        const parsedData = JSON.parse(item);
        if (parsedData?.userId && parsedData?.userName) {
            setCreate(true);
            setItem([{ id: parsedData?.userId, name: parsedData?.userName }])
            setUserId(parsedData?.userId);
            setUsername(parsedData?.userName)
            sessionStorage.removeItem('private-chat');
        }
    }, [])

    const reset = () => {
        setUserId("");
        setSubject("")
        setContent("");
        setUid(0)
    }

    const [username, setUsername] = useState('')
    const [violationLoader, setViolationLoader] = useState(false);
    const [items, setItem]: any = useState([])
    const [userData, setUserData]: any = useState({})
    const [userClick, setUserClick] = useState(false)
    const getUrl = (url: any) => {
        if (url?.toString().includes("s3.amazonaws.com")) {
            return url;
        } else {
            return DefaultAvatar;
        }
    }

    const handleOnSearch = async (string: any, results: any) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.

        if (string.length > 1) {
            const response = await getSearch(string)
            const { members } = response.data
            // setItem(members)
            let id, name, array: any = []
            await members.map((value: any) => {
                id = value.id
                name = value.username
                array.push({ id: id, name: value.username })
            })
            setItem(array)
        }
    }

    const handleOnHover = (result: any) => {
        // the item hovered
        console.log(result)
    }

    const handleOnSelect = (item: any) => {
        // the item selected
        setUserId(item.id)
        // console.log(item.name)
    }

    const handleOnFocus = () => {
        console.log('Focused')
    }

    const formatResult = (item: any) => {
        return (
            <>

                <span className='' style={{ display: 'block', textAlign: 'left' }}>{item?.name}</span>
            </>
        )
    }
    const sendPrivateMsg = async () => {
        setViolationLoader(true)
        setErrors([]);
        try {
            const payload = {
                other_user_id: userid,
                subject: subject,
                content: content

            }

            const response: any = await createPrivateMsg(payload)
            if (response.status === 200 || response.status === 201) {
                alertMessage({
                    title: "Message Sent Successfully",
                    text: "",
                    icon: "success",
                    timer: 3000
                });
                setCreate(false);
                fetchData();
            } else {
                alertMessage({
                    title: "User Not Found",
                    text: "",
                    icon: "error",
                    timer: 3000
                });
            }

        } catch (e: any) {
            console.log(e);
            setErrors(e?.response?.data?.errors)
        } finally {
            setViolationLoader(false)
        }
    }

    const getUserData = async (id: any) => {
        try {
            setGlobalLoader(true);
            const response = await getUserInboxData(id)
            setGlobalLoader(false);
            if (response.status === 200) {
                setUserData(response.data)

            }
        } catch (e: any) {
            console.log(e);
            setGlobalLoader(false);
        }
    }

    const deleteMessage = async (id: any) => {
        try {
            setDeleteLoader(true);
            const response = await deleteMsg(id);
            setDeleteLoader(false);
            if (response.status === 200) {
                alertMessage({
                    title: "Message deleted Successfully",
                    text: "",
                    icon: "success",
                    timer: 3000
                });
                setCreate(false);
                setUserClick(false);
                fetchData();
            }
        } catch (e: any) {
            console.log(e)
            setDeleteLoader(false);
        }
    }

    useEffect(() => {
        if (Uid) {
            getUserData(Uid)
        }
    }, [Uid])

    const fetchData = async (currentType = type) => {
        try {
            let response: any = null;
            setGlobalLoader(true)
            if (currentType === 1) {
                response = await getInboxData(userId);
                if (response.status === 200) {
                    setData(response.data)
                } else {
                    setData([])
                }
            } else {
                response = await getSentData(userId);
                if (response.status === 200) {
                    setData(response.data)
                } else {
                    setData([])
                }
            }
            setGlobalLoader(false)
        } catch (e: any) {
            console.log(e);
            setData([])
        }
    }

    const setReply = (data: any) => {
        setCreate(true);
        setUserClick(false);
        setItem([{ id: data.user_id, name: data.username }])
        setUserId(data.user_id);
        setUsername(data.username)
    }

    return (
        <div className="grid grid-flow-row gap-3">
            {globalLoader ?
                <div className='flex items-center justify-center py-10'>
                    <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                </div>
                :
                <>
                    <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3">
                        <div className="w-full">
                            <div className="flex-shrink-0  lg:mb-0 grow lg:grow-0 lg:!w-[260px] sm:!w-full">
                                <Select menuDropdown={menuDropdown} selectedValue={type} setMenu={onTypeChange} />
                            </div>
                        </div>
                        {
                            create ? <></> : (
                                <div className="w-full block lg:flex lg:justify-end">
                                    {
                                        userClick ? (
                                            <div className='w-fit mr-2'>
                                                <ButtonSecondary onClick={() => setUserClick(false)}>Back</ButtonSecondary>
                                            </div>
                                        ) : <></>
                                    }
                                    <ButtonPrimary onClick={() => setCreate(true)} className=' bg-white text-md hover:bg-slate-300 border border-slate-300' sizeClass=' py-3 px-5'>
                                        {/* <PlusIcon className="w-4 mr-1 h-4 font-semibold text-blue-600" /> */}
                                        <span className='text-sm text-blue-600'> Compose Message</span>
                                    </ButtonPrimary>
                                </div>
                            )
                        }

                    </div>
                    {create ?
                        <div className='grid grid-flow-row gap-3 py-5 px-5 bg-white'>
                            <h1 className='text-2xl max-md:text-lg  font-bold text-left'>Compose Message</h1>
                            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-3 mt-2">
                                <div className='py-1 grid grid-flow-row gap-1'>
                                    <div className=" w-full flex items-center justify-start">
                                        <h1 className={style}>To:</h1>
                                    </div>
                                    <div className="flex-shrink-0 z-50 relative w-full">
                                        <ReactSearchAutocomplete
                                            items={items}
                                            styling={{
                                                borderRadius: '8px',

                                            }}

                                            placeholder='Search User Id'
                                            inputSearchString={username}
                                            onSearch={handleOnSearch}
                                            onHover={handleOnHover}
                                            onSelect={handleOnSelect}
                                            onFocus={handleOnFocus}
                                            autoFocus={false}
                                            formatResult={formatResult}
                                        />
                                    </div>

                                </div>
                                <div className='py-1 px-3 grid grid-flow-row gap-1'>
                                    <div className=" w-full flex items-center justify-start">
                                        <h1 className={style}>Subject:</h1>
                                    </div>
                                    <div className="flex-shrink-0  w-full">
                                        <form className="relative">
                                            <Input
                                                required
                                                aria-required
                                                placeholder="Enter Subject"
                                                type="text"
                                                value={subject}
                                                onChange={(e) => setSubject(e.target.value)}
                                                className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                                            />

                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="px-2 py-3 grid grid-cols-1 gap-2 mt-2">
                                <div className=" w-full flex items-center justify-start">
                                    <h1 className={style}>Message:</h1>
                                </div>
                                <div className="w-full">
                                    <DynamicComponentWithNoSSR data={content} setData={(e: any) => setContent(e)} />
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
                            <div className="py-3 mt-3 flex flex-row items-center gap-4 max-sm:flex-col">
                                <ButtonPrimary sizeClass='py-2.5 px-5' loading={violationLoader} onClick={sendPrivateMsg}>Create</ButtonPrimary>
                                <h2 className={style2}>or</h2>
                                <ButtonPrimary onClick={() => setCreate(false)} className=' bg-white hover:bg-slate-300 !border-[1px] !border-neutral-200' sizeClass='py-2.5 px-5'><span className='text-red-600'>Cancel</span></ButtonPrimary>
                            </div>
                        </div>
                        :
                        userClick ?
                            (
                                <div className="flex flex-col mt-2">
                                    <div className='font-semibold text-xl py-5'>{userData?.subject}</div>
                                    <p className=' text-md py-3 mx-2 mb-3' dangerouslySetInnerHTML={{ __html: userData?.content || '' }}></p>
                                    <div
                                        className={`nc-Card3Small relative flex flex-row items-center`}
                                    >
                                        <Link
                                            href={`/members/${userData.user_id}`}
                                            // href={href ? href : '#'}
                                            className={`block w-16 flex-shrink-0 relative rounded-lg overflow-hidden z-0 group my-auto`}
                                        >
                                            <div className={`w-full h-fit`}>
                                                <Avatar
                                                    sizeClass="h-10 w-10 text-base"
                                                    containerClassName="flex-shrink-0 me-3"
                                                    radius="rounded-full"
                                                    imgUrl={userData?.avatar ? getUrl(userData?.avatar) : getUrl(userData?.small_logo_url)}
                                                    userName={username}
                                                />
                                            </div>
                                        </Link>
                                        <div className="relative">
                                            <h2 className="nc-card-title block text-base sm:text-lg font-medium sm:font-semibold text-neutral-900 dark:text-neutral-100">
                                                <Link href={`/`} className="line-clamp-2" >
                                                    <span className='text-blue-700'>
                                                        {userData?.username}
                                                    </span>
                                                </Link>
                                            </h2>
                                            <span className='text-sm'>sent on {moment(userData?.created_at).format('lll')}</span>
                                            {/* <PostCard5 meta={{ ...post }} avatar={avatar_url} hiddenAvatar={true} /> */}
                                        </div>


                                    </div>
                                    <div className="w-full flex justify-between mt-6 border-0">
                                        {
                                            userData?.previous ? (
                                                <div className='w-fit'>
                                                    <ButtonSecondary onClick={() => setUid(userData?.previous)}>Previous</ButtonSecondary>
                                                </div>

                                            ) : <></>
                                        }
                                        <div className='flex'>
                                            {
                                                userData?.next ? (
                                                    <div className='w-fit mr-2'>
                                                        <ButtonSecondary onClick={() => setUid(userData?.next)}>Next</ButtonSecondary>
                                                    </div>

                                                ) : <></>
                                            }
                                            <div className='w-fit mr-2'>
                                                <ButtonPrimary onClick={() => setReply(userData)}>Reply</ButtonPrimary>
                                            </div>
                                            <div className="w-fit">
                                                <ButtonThird loading={deleteLoader} onClick={(e: any) => deleteMessage(Uid)}>Delete</ButtonThird>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                            :
                            <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
                                {data?.map((post: any, index: number) => {
                                    post.href = '/';
                                    // if(index <= 4) {
                                    return (
                                        <Card30
                                            className="p-4 xl:px-5 xl:py-6 hover:bg-neutral-200 dark:hover:bg-neutral-700 border-b-[1px]"
                                            key={post.id}
                                            post={post}
                                            avatar={post.avatar}
                                            setUserClick={setUserClick}
                                            setUid={setUid}
                                            screen={"inbox"}
                                        />
                                    )
                                    // }
                                })}



                            </div>
                    }
                </>
            }
        </div>
    )
}

export default InboxPage