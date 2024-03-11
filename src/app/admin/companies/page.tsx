'use client';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import './style.css'
import Link from 'next/link';
import Select from '@/components/Select/Select';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import ButtonCircle from '@/components/Button/ButtonCircle';
import Input from '@/components/Input/Input';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import { CompanyPagination } from '@/requests/Profile';
import Image from 'next/image';

function AdminCompanyPage() {
    const columns = [
        {
            title: "",
            dataIndex: 'logo',
        }, {
            title: "Name",
            dataIndex: 'name',
            sorter: (a: any, b: any) => a.name.length - b.name.length,
        }, {
            title: 'Is Active',
            dataIndex: 'isActive',
            sorter: (a: any, b: any) => a.isActive - b.isActive,
        }, {
            title: 'Hub type',
            dataIndex: 'hubType',
            sorter: (a: any, b: any) => a.hubType.length - b.hubType.length,
        }, {
            title: 'Actions',
            dataIndex: 'actions',

        }];


    // const data = [{
    //     key: '1',
    //     name: <div className=' flex flex-col gap-2'>
    //         <h1 className='text-center'>John Brown</h1>
    //     </div>,
    //     isActive: "Active Sponsored",
    //     hubType: 'Sponsored Hub',
    // }, {
    //     key: '2',
    //     name: <div className=' flex flex-col gap-2'>
    //         <h1 className='text-center'>Jim Green</h1>

    //     </div>,
    //     isActive: "Active Sponsored",
    //     hubType: 'Sponsored Hub',
    // }, {
    //     key: '3',
    //     name: <div className=' flex flex-col gap-2'>
    //         <h1 className='text-center'>Joe Black</h1>

    //     </div>,
    //     isActive: "Active Sponsored",
    //     hubType: 'Free Hub',
    // }, {
    //     key: '4',
    //     name: <div className=' flex flex-col gap-2'>
    //         <h1 className='text-center'>Jim Red</h1>

    //     </div>,
    //     isActive: "Active Sponsored",
    //     hubType: 'Free Hub',
    // }];
    const menuDropdown: any = {
        "": "All",
        '2': "Free Hub",
        '3': "Moderated Hub",
        '4': "Special Hub",
        '5': 'Marketing Hub',
        '6': 'IR Hub'
    };
    const menuDropdown2: any = {
        '': "All",
        "true": "Active",
        "false": "InActive",

    };
    const getUrl = (url: any) => {
        if (url?.toString().includes("s3.amazonaws.com") || url?.toString().includes(".com")) {
            return url;
        } else {
            return '';
        }
    }

    const [pageSize, setPageSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0)
    const [globalLoader, setGlobalLoader] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [data, setData] = useState([])
    const [hubType, setHubType] = useState('');
    const [status, setStatus] = useState('');

    const onTypeChange = (val: any) => {
        setHubType(val);
        fetchData(pageSize, 1, val, status)

    }
    const onTypeChange1 = (val: any) => {
        setStatus(val);
        fetchData(pageSize, 1, hubType, val)

    }
    // console.log(JSON.parse(status));
    useEffect(() => {
        fetchData(pageSize, 1)
    }, [])
    const fetchData = async (item: any = pageSize, page: any = currentPage, hub_type = hubType, is_active = status) => {
        setGlobalLoader(true);
        let payload: any = {
            items: item,
            page: page
        }
        if (keyword) {
            payload["q"] = keyword
        }
        if (hub_type) {
            payload['hub_type'] = hub_type;
        }

        if (is_active) {
            payload['is_active'] = is_active;
        }
        const response = await CompanyPagination(payload)
        setGlobalLoader(false);

        if (response.status === 200) {
            console.log(response.data);

            let dynamicData: any = []
            setTotal(JSON.parse(response.headers.pagy).count)
            // setData(response.data)
            response.data.map((value: any) => {
                dynamicData.push({
                    key: value?.id,
                    logo: <div className='w-16 h-16 rounded-[50%]'><Image alt="Company Logo" className='my-2 rounded-[50%] object-fill' src={getUrl(value?.small_logo)} width="200" height="200" /></div>,

                    name: value?.name,
                    isActive: <div className='flex flex-col gap-1'>
                        <h1 className='text-center'>{value?.is_active ? 'Active' : 'InActive'}</h1>
                        <h1 className='text-center'>{value?.is_listed ? '' : value?.is_active ? 'Unlisted' : ''}</h1>
                        <h1 className='text-center'>{value?.sponsored ? 'Sponsored' : ''}</h1>
                    </div>

                    ,
                    hubType: <h1 className='text-center'>{value?.named_hub_type}</h1>,
                    actions: <span className='flex'>
                        <Link href={`/company/${value?.id}`} className='pr-2 font-semibold text-secondary-400'>View</Link> |
                        <Link href={`/admin/companies/${value?.id}?tab=1`} className='pr-2 pl-2 font-semibold text-secondary-400'>Edit</Link> |
                        {/* <Link href={`/admin/companies/${value?.id}?tab=1`} className='pr-2 pl-2 font-semibold text-secondary-400'>Broadcasts</Link> | */}
                        <Link href={`/admin/companies/${value?.id}?tab=4`} className='pr-2 pl-2 font-semibold text-secondary-400'>Messages</Link> |
                        {/* <Link href={`/admin/companies/${value?.id}?tab=3`} className='pr-2 pl-2 font-semibold text-secondary-400'>Executive-Addresses</Link> | */}
                        <Link href={`/admin/companies/${value?.id}?tab=5`} className='pr-2 pl-2 font-semibold text-secondary-400'>Management</Link>
                    </span>
                })

            })
            setData(dynamicData)
        }
    }

    function onChange(pagination: any, filters: any, sorter: any) {
        if (pageSize != pagination.pageSize || currentPage != pagination.current) {
            setPageSize(pagination.pageSize)
            setCurrentPage(pagination.current)
            fetchData(pagination.pageSize, pagination.current)
        }
    }
    return <div className='w-full p-6 bg-white'>
        <div className='flex justify-between mt-2 mb-6'>
            <h3 className='mt-2 mb-6 text-2xl font-bold'>Companies</h3>
            <Link href={'/admin/companies/create'}><ButtonPrimary sizeClass='py-2.5 px-5'>Create</ButtonPrimary></Link>
        </div>
        <div className="flex flex-row max-md:flex-col gap-3 py-4">
            <div className="w-full">
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
                                e.stopPropagation()
                                fetchData(pageSize, 1, hubType, status)
                            }}
                            className={`absolute transform top-1/2 -translate-y-1/2 end-1 !bg-defaultGreen-100 hover:!bg-primary-500 dark:bg-neutral-300 dark:text-black`}
                        >
                            <MagnifyingGlassIcon className="w-5 h-5" />
                        </ButtonCircle>
                    </form>
                </div>
            </div>
            <div className="w-full block lg:flex lg:justify-end">
                <div className="flex flex-row gap-2 justify-center">

                    <Select menuDropdown={menuDropdown} selectedValue={hubType} setMenu={onTypeChange} />
                </div>
                <div className="flex flex-row gap-2 justify-center">

                    <Select menuDropdown={menuDropdown2} selectedValue={status} setMenu={onTypeChange1} />
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
                <Table columns={columns} pagination={{ pageSizeOptions: ["10", "20", "25", "50"], current: currentPage, total: total, pageSize: pageSize, showSizeChanger: true }} dataSource={data} onChange={onChange} />
            )}
    </div>
}

export default AdminCompanyPage