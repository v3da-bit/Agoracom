'use client';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import './style.css'
import { title } from 'process';
import Link from 'next/link';
import Select from '@/components/Select/Select';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import ButtonCircle from '@/components/Button/ButtonCircle';
import Input from '@/components/Input/Input';
import moment from 'moment';
import { ModerateMsgPagination, ViolationPagination, getModerateMsgBtn, updateModerateMsgApproved, updateModerateMsgBtn } from '@/requests/Profile';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import ButtonSecondary from '@/components/Button/ButtonSecondary';
import flag_yellow from '@/images/Icons/flag_yellow.gif'
import flag_red from '@/images/Icons/flag_red.gif'
import flag_green from '@/images/Icons/flag_green.gif'
import accept from '@/images/Icons/accept.gif'
import cross from '@/images/Icons/cross.gif'
import icon_agoracom from '@/images/Icons/icon_agoracom.gif'
import icon_president from '@/images/Icons/icon_president.gif'
import icon_question from '@/images/Icons/icon_question.gif'
import ceoVerified from '@/images/Icons/agoracom_icon.png';
import Image from 'next/image';
import alertMessage from '@/utils/swalAlert';


function ModerateMessagePage() {
    const [keyword, setKeyword] = useState('');
    const [total, setTotal] = useState(0)
    const [data, setData] = useState([])
    const [rejectedValue, setRejectedValue] = useState("");
    const [approvedValue, setApprovedValue] = useState("");
    const [globalLoader, setGlobalLoader] = useState(false);
    const [modeBtn, setModebtn] = useState(true)
    const [loader, setLoader] = useState(false)
    const [loader2, setLoader2] = useState(0)
    const [is_approved, setApproved] = useState(false)
    useEffect(() => {
        fetchData()
        getModeBtn()
    }, [])
    const getModeBtn = async () => {
        const response = await getModerateMsgBtn()
        setModebtn(response.data?.value)

    }
    const changeModeBtn = async (mode: boolean) => {
        setLoader(true)
        try {
            let payload: any = {
                global_setting: { value: mode }
            }
            const response = await updateModerateMsgBtn(payload)
            if (response.status == 200 || 201) {
                setModebtn(response.data?.value)
            }
        } catch (e: any) {
            console.log(e);

        } finally {
            setLoader(false)
        }
    }
    const changeApproved = async (is_approved: any, id: any) => {
        try {
            let payload: any = {
                is_approved: is_approved
            }
            setLoader2(id)
            const response = await updateModerateMsgApproved(id, payload)
            if (response.status == 200) {
                alertMessage({
                    title: "Message approved successfully",
                    text: "",
                    icon: "success",
                    timer: 3000
                });
                fetchData();
            }
        } catch (e: any) {
            console.log(e);

        } finally {
            setLoader2(0)
        }

    }
    const fetchData = async (approved = approvedValue, rejected = rejectedValue) => {
        let payload: any = {}
        if (keyword) {
            payload["q"] = keyword;
        }
        if (approved) {
            payload["is_approved"] = approved;
        }
        if (rejected) {
            payload["is_removed"] = rejected;
        }

        setGlobalLoader(true);
        const response = await ModerateMsgPagination(payload)
        setGlobalLoader(false);
        let dynamicData: any = []
        // value?.title
        response.data.map((value: any) => {
            let id = value?.id
            dynamicData.push({
                key: value?.id,
                title: value?.image ? <div className='flex flex-row gap-2 items-center'>
                    <Image alt="Company Logo" className='' src={
                        value?.image === 'flag_yellow.gif' ?
                            flag_yellow
                            : value?.image === 'flag_red.gif' ?
                                flag_red
                                : value?.image === 'flag_green.gif' ?
                                    flag_green
                                    : value?.image === 'accept.gif' ?
                                        accept
                                        : value?.image === 'cross.gif' ?
                                            cross
                                            : value?.image === 'icon_agoracom.gif' ?
                                                icon_agoracom
                                                : value?.image === 'icon_president.gif' ?
                                                    icon_president
                                                    : value?.image === 'icon_question.gif' ?
                                                        icon_question
                                                        : value?.image === 'ceo-verified.png' ? ceoVerified : ''
                    } width="20" height="20" />{value?.title}</div>
                    : value?.title,
                rating: <><ReactStars
                    count={5}
                    value={value?.rating_total}
                    edit={false}
                    size={24}
                    activeColor="#ffd700"
                /></>,
                company: value?.company_name,
                author: <div className=' flex flex-col justify-center gap-1'>
                    <h3>{value.username}</h3>
                    <h3>{moment(value?.created_at).format('lll')}</h3>
                </div>,
                approved: value?.is_approved ? <></> : <div className="flex justify-center items-center">
                    <ButtonPrimary loading={loader2 === value?.id} sizeClass=' py-3 px-3 ' onClick={() => {
                        changeApproved(true, value?.id)
                    }}>Approved</ButtonPrimary>
                </div>

            })

        })
        setData(dynamicData)

    }
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            sorter: (a: any, b: any) => a.title.length - b.title.length,
        }, {
            title: 'Rating',
            dataIndex: 'rating',

        }, {
            title: 'Company',
            dataIndex: 'company',
            sorter: (a: any, b: any) => a.company.length - b.company.length,
        }, {
            title: 'Author / Posted on',
            dataIndex: 'author',

        }, {
            title: '',
            dataIndex: 'approved',
        }];

    const menuDropdown: any = {
        "": "All",
        "true": "Yes",
        "false": "No",
    };
    const menuDropdown2: any = {
        "": "All",
        "true": "Yes",
        "false": "No",
    };

    return <div className='w-full p-6 bg-white'>
        <div className="flex justify-between mt-2 mb-6">
            <h3 className='mt-2 mb-2 text-2xl font-bold'>Moderate Messages</h3>

            {
                modeBtn ? <ButtonPrimary sizeClass='px-5' loading={loader} className=' bg-red-600 hover:bg-red-800' onClick={() => {
                    changeModeBtn(false)
                }}>Mode: Moderate</ButtonPrimary>
                    : <ButtonSecondary sizeClass='px-5' loading={loader} onClick={() => {
                        changeModeBtn(true)
                    }}>Mode: Normal</ButtonSecondary>
            }
        </div>
        <div className="flex flex-row max-md:flex-col gap-3 mb-8">
            <div className="w-full my-auto">
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
                            onClick={(e: any) => {
                                e.preventDefault();
                                e.stopPropagation();
                                fetchData(approvedValue, rejectedValue);
                            }}
                            className={`absolute transform top-1/2 -translate-y-1/2 end-1 !bg-defaultGreen-100 hover:!bg-primary-500 dark:bg-neutral-300 dark:text-black`}
                        >
                            <MagnifyingGlassIcon className="w-5 h-5" />
                        </ButtonCircle>
                    </form>
                </div>
            </div>
            <div className="w-full block lg:flex lg:justify-end">
                <div className="">
                    <div className='w-full'>
                        <label className='text-sm'>Removed</label>
                    </div>
                    <Select menuDropdown={menuDropdown} selectedValue={rejectedValue} setMenu={(val: any) => {
                        setRejectedValue(val);
                        fetchData(approvedValue, val)
                    }} />
                </div>
                <div className="">
                    <div className='w-full'>
                        <label className='text-sm'>Approved</label>
                    </div>
                    <Select menuDropdown={menuDropdown2} selectedValue={approvedValue} setMenu={(val: any) => {
                        setApprovedValue(val);
                        fetchData(val, rejectedValue)
                    }} />
                </div>


            </div>
        </div>
        {globalLoader ?
            <div className='flex items-center justify-center '>
                <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
            </div>
            : (
                <Table columns={columns} dataSource={data} />
            )
        }
    </div>
}

export default ModerateMessagePage