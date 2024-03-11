'use client';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import Heading from '@/components/Heading/Heading';
import Input from '@/components/Input/Input';
import Nav from '@/components/Nav/Nav';
import NavItem from '@/components/NavItem/NavItem';
import { AddCompanyExecutiveAddress, CompanyExecutiveMsgPagination, DeleteExecutiveAddress, UpdateCompanyExecutiveAddress } from '@/requests/Profile';
import alertMessage from '@/utils/swalAlert';
import { Table } from 'antd';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



function ExecutiveMessage() {
    const style = 'font-semibold text-xl text-white max-md:text-md'
    const style2 = ' font-semibold text-right text-base text-dark'
    const params = useParams()
    const initialData = {
        company_id: params.id,
        title: '',
        file: '',
        publish_at: '',
        image: '',
        url: '',
        name: '',
        summary: '',
        category: '',
        hub_only: '',
        link_label: '',
        link_url: ''
    }
    const [data1, setData1] = useState(initialData)
    const [industry, setIndustry] = useState('posts');
    const [selectedLogoFile, setSelectedLogoFile]: any = useState(null);
    const router = useRouter()
    const [data, setData] = useState([])
    const [pageSize, setPageSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0)
    const [globalLoader, setGlobalLoader] = useState(false);
    const [executiveClick, setexecutiveClick] = useState(false)
    const [loader, setLoader] = useState(false)
    const [isPatch, setIsPatch] = useState(false)
    const [id,setId]=useState(0)
    const getUrl = (url: any) => {
        if (url?.toString().includes("s3.amazonaws.com") || url?.toString().includes(".com")) {
            return url;
        } else {
            return '';
        }
    }
    const columns = [
        {
            title: "Executive",
            dataIndex: 'executive',
            sorter: (a: any, b: any) => a?.executive?.length - b?.executive?.length,
        },
        {
            title: 'Title',
            dataIndex: 'Title',
            sorter: (a: any, b: any) => a?.Title?.length - b?.Title?.length,
        },
        {
            title: 'Date',
            dataIndex: 'date',
            sorter: (a: any, b: any) => a?.date - b?.date,
        },
        {
            title: 'Actions',
            dataIndex: 'actions',

        }];
    useEffect(() => {
        fetchData(pageSize, currentPage)

    }, [])
    console.log(isPatch);
    
    const fetchData = async (item: any, page: any) => {
        setGlobalLoader(true)
        const response = await CompanyExecutiveMsgPagination(params.id, item, page)
        setGlobalLoader(false)

        if (response.status === 200) {
            let dynamicData: any = []
            setTotal(JSON.parse(response.headers.pagy).count)
            // setData(response.data)
            response.data.map((value: any) => {
                dynamicData.push({
                    key: value?.id,
                    executive: <Image alt="Company Logo" className='' src={getUrl(value?.small_logo)} width="100" height="100" />,
                    Title: value?.title,
                    date: moment(value?.publish_at).format('lll'),
                    actions: <span className='flex'>
                        <button className='bg-transparent' onClick={() => {
                            setData1({
                                ...data1,
                                // company_id: value?.id,
                                title: value?.title,
                                file: '',
                                publish_at: Date.parse(value?.publish_at),
                                image: value?.image ? value.image : '',
                                url: value?.company?.small_logo_url,
                                name: value?.company?.name,
                                summary: value?.summary ? value?.summary : '',
                                category: value?.category_name,
                                hub_only: '',
                                link_label: '',
                                link_url: ''
                            })
                            setId(value?.id)
                            setIsPatch(true)
                            setexecutiveClick(true)
                        }}><span className='pl-1 text-secondary-400 font-semibold'>Edit </span></button>&nbsp; |
                        <button className='bg-transparent' onClick={() => deleteExecutive(value?.id)}><span className='pl-1 text-secondary-400 font-semibold'>Delete</span></button>
                    </span>
                })

            })
            setData(dynamicData)
        }
    }

    const AddExecutiveAddress = async () => {
        setLoader(true)
        try {
            let payload = data1
            console.log(payload);
            if (isPatch) {
                const response = await UpdateCompanyExecutiveAddress(id!=0?id:data1.company_id, payload)
                console.log(response);
                if (response.status == 200) {
                    alertMessage({
                        title: "Executive address Updated successfully!",
                        text: "",
                        icon: "success",
                        timer: 3000
                    });
                    setexecutiveClick(false)
                    setData1(initialData)
                    fetchData(pageSize, 1)
                }
            } else {
                const response = await AddCompanyExecutiveAddress(payload)
                console.log(response);
                if (response.status == 201) {
                    alertMessage({
                        title: "Executive address created successfully!",
                        text: "",
                        icon: "success",
                        timer: 3000
                    });
                    setexecutiveClick(false)
                    setData1(initialData)
                    fetchData(pageSize, 1)
                }
            }

        } catch (e: any) {
            console.log(e);

        } finally {
            setIsPatch(false)
            setLoader(false)
        }
    }
    const deleteExecutive = async (id: any) => {
        try {
            const response = await DeleteExecutiveAddress(id)
            console.log(response);
            if (response.status == 200) {
                alertMessage({
                    title: "Executive address Deleted successfully!",
                    text: "",
                    icon: "success",
                    timer: 3000
                });
                fetchData(pageSize, 1)
            }
        } catch (e: any) {
            console.log(e);
        }
    }
    const handleChange = (key: any, val: any) => {
        setData1({
            ...data1,
            [key]: val
        })
    }

    function onChange(pagination: any, filters: any, sorter: any) {
        if (pageSize != pagination.pageSize || currentPage != pagination.current) {
            setPageSize(pagination.pageSize)
            setCurrentPage(pagination.current);
            fetchData(pagination.pageSize, pagination.current)
        }
    }
    return (
        <div className='w-full bg-white dark:bg-neutral-900  grid grid-flow-row gap-2 py-3 px-3'>
            {executiveClick == false ? <div className="flex justify-end  items-start mb-4">
                <ButtonPrimary sizeClass='py-2.5 px-5' onClick={() => {
                    setIsPatch(false)
                    setexecutiveClick(true)}}>Add New Executive Address</ButtonPrimary>
            </div> :
                <div className=" container w-1/2 grid grid-flow-row gap-3 mb-4">
                    <div className='px-3 grid grid-cols-1 gap-2 mt-2'>
                        <div className=" w-full flex items-center justify-start">
                            <h1 className={style2}>Name:</h1>
                        </div>
                        <div className="flex-shrink-0   lg:mb-0 grow w-full">
                            <form className="relative">
                                <Input
                                    required
                                    aria-required
                                    placeholder="Enter Name"
                                    type="text"
                                    value={data1.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                                />
                            </form>
                        </div>

                    </div>
                    <div className='px-3 grid grid-cols-1 gap-2 mt-2'>
                        <div className=" w-full flex items-center justify-start">
                            <h1 className={style2}>Title:</h1>
                        </div>
                        <div className="flex-shrink-0   lg:mb-0 grow w-full">
                            <form className="relative">
                                <Input
                                    required
                                    aria-required
                                    placeholder="Enter Title"
                                    type="text"
                                    value={data1.title}
                                    onChange={(e) => handleChange('title', e.target.value)}
                                    className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                                />
                            </form>
                        </div>

                    </div>
                    <div className='px-3 grid grid-cols-1 gap-2'>
                        <div className=" w-full flex items-start justify-start">
                            <h1 className={style2}>Summary:</h1>
                        </div>
                        <div className="flex-shrink-0   lg:mb-0 grow lg:grow-0 w-full">
                            <form className="relative">
                                <textarea
                                    required
                                    aria-required
                                    value={data1.summary}
                                    onChange={(e) => handleChange('summary', e.target.value)}
                                    className="text-neutral-800 border-neutral-300 h-44 w-full px-4 dark:text-neutral-200 max-md:w-full dark:bg-neutral-800"
                                />
                            </form>
                        </div>

                    </div>
                    <div className="px-3 grid grid-cols-1 gap-2 mt-2">
                        <div className=" w-full flex items-center justify-start">
                            <h1 className={style2}>Image:</h1>
                        </div>
                        <div className="flex-shrink-0  lg:mb-0 grow lg:grow-0 w-full ">
                            <Input
                                required
                                aria-required
                                type="file"
                                accept='image/*'
                                //  value={data1.image}
                                onChange={(e: any) => handleChange('image', e.target.files[0])}
                                className="text-neutral-800 px-4 text-lg  border-[1px] border-neutral-300 dark:text-neutral-200 rounded-md"
                            />
                        </div>
                        <Image alt="Image" className='my-2' src={data1.image} width="100" height="100" />



                    </div>
                    <div className='px-3 grid grid-cols-1 gap-2 mt-2'>
                        <div className=" w-full flex items-center justify-start">
                            <h1 className={style2}>Broadcast URL:</h1>
                        </div>
                        <div className="flex-shrink-0   lg:mb-0 grow w-full">
                            <form className="relative">
                                <Input
                                    required
                                    aria-required
                                    placeholder="Enter Broadcast URL"
                                    type="text"
                                    value={data1.url}
                                    onChange={(e) => handleChange('url', e.target.value)}
                                    className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                                />
                            </form>
                        </div>

                    </div>
                    <div className="px-3 py-1 grid grid-cols-1 gap-2 mb-4">
                        <div className="w-full flex items-center justify-start ">
                            <h1 className={style2}>Date:</h1>
                        </div>
                        <DatePicker className="w-full border-[1px] dark:bg-neutral-900 border-neutral-200 rounded-md" selected={data1.publish_at} onChange={(e: any) =>{ console.log(Date.parse(e));
                        
                            handleChange('publish_at', Date.parse(e))}} />

                    </div>
                    <div className='px-3 grid grid-cols-1 gap-2 mt-2'>
                        <div className=" w-full flex items-center justify-start">
                            <h1 className={style2}>Link Label:</h1>
                        </div>
                        <div className="flex-shrink-0   lg:mb-0 grow w-full">
                            <form className="relative">
                                <Input
                                    required
                                    aria-required
                                    placeholder="Enter Link Label"
                                    type="text"
                                    value={data1.link_label}
                                    onChange={(e) => handleChange('link_label', e.target.value)}
                                    className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                                />
                            </form>
                        </div>

                    </div>
                    <div className='px-3 grid grid-cols-1 gap-2 mt-2'>
                        <div className=" w-full flex items-center justify-start">
                            <h1 className={style2}>Link URL:</h1>
                        </div>
                        <div className="flex-shrink-0   lg:mb-0 grow w-full">
                            <form className="relative">
                                <Input
                                    required
                                    aria-required
                                    placeholder="Enter Link URL"
                                    type="text"
                                    value={data1.link_url}
                                    onChange={(e) => handleChange('link_url', e.target.value)}
                                    className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                                />
                            </form>
                        </div>

                    </div>
                    <div className="py-3 px-3 flex flex-row items-center justify-center  gap-4 max-sm:flex-col">
                        <ButtonPrimary loading={loader} onClick={AddExecutiveAddress}>Submit</ButtonPrimary>
                        <h2 className={style2}>or</h2>
                        <ButtonPrimary onClick={() => {
                            setexecutiveClick(false)
                            setData1(initialData)
                        }} className='bg-slate-100 hover:bg-slate-300'><span className='text-red-600'>Cancel</span></ButtonPrimary>
                    </div>
                </div>}
            {globalLoader ?
                <div className='flex items-center justify-center '>
                    <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                </div>
                : (executiveClick == false ?
                    <Table columns={columns} pagination={{ pageSizeOptions: ["10", "20", "25", "50"], total: total, current: currentPage, pageSize: pageSize, showSizeChanger: true }} dataSource={data} onChange={onChange} />
                    : <></>)}
        </div>
    )
}

export default ExecutiveMessage