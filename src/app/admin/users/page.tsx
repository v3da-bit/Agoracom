'use client';
import ButtonSecondary from '@/components/Button/ButtonSecondary';
import ButtonThird from '@/components/Button/ButtonThird';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import './style.css'
import Link from 'next/link';
import ButtonCircle from '@/components/Button/ButtonCircle';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import Input from '@/components/Input/Input';
import Select from '@/components/Select/Select';
import moment from 'moment';
import { UserPagination } from '@/requests/Profile';

function UserPage() {
    const [pageSize, setPageSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0)
    const [globalLoader, setGlobalLoader] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [data, setData] = useState([])
    const menuDropdown: any = {
        "": "All",
        "level1": "Mail Room-level1",
        "level2": "Treasurer-level2",
        "level3": "Vice President-level3",
        "free_hub_president": 'President-free_hub_president',
        "level4": 'President-level4',
        "free_hub_leader": "President Plus - free_hub_leader",
        "community_stock_hub_leader": "President Plus (appointed) - community_stock_hub_leader",
        "moderated_hub_leader": 'President Plus (appointed)-moderated_hub_leader',
        "marketing_hub_leader": 'President Plus (client) - marketing_hub_leader',
        "super_admin": 'Administrator-super_admin',
        "admin": 'Administrator-admin'
    };
    const menuDropdown2: any = {
        "": "All",
        "true": "Yes",
        "false": "No",

    };
    const [userRank, setUserRank] = useState("");
    const [verified, setVerified] = useState("");
    useEffect(() => {
        fetchData(pageSize, 1)
    }, [])
    const fetchData = async (item: any = pageSize, page: any = currentPage, ceo_verified = verified, rank = userRank) => {
        setGlobalLoader(true);
        let payload: any = {
            items: item,
            page: page
        }
        if (keyword) {
            payload["q"] = keyword
        }
        if (ceo_verified) {
            payload['is_ceo_verified'] = ceo_verified;
        }
        if (rank) {
            payload['authority_group_code'] = rank;
        }
        const response = await UserPagination(payload)
        setGlobalLoader(false);

        if (response.status === 200) {
            let dynamicData: any = []
            setTotal(JSON.parse(response.headers.pagy).count)
            response.data.map((value: any) => {
                dynamicData.push({
                    key: value?.id,
                    name: <div className='flex flex-col gap-1'>
                        <h1>{value?.username}</h1>
                        <h1>{value?.current_sign_in_ip || value?.ip_address}</h1>
                    </div>,
                    ranking: <div className='flex flex-col gap-1'>
                        <h1>{value?.authority_name + ' (' + value?.ranking_points + ')'}</h1>
                        <ReactStars
                            count={5}
                            value={value?.rating}
                            edit={false}
                            size={24}
                            activeColor="#ffd700"
                        />
                    </div>,
                    status: value?.is_verified ? 'Active' : 'Not Verified',
                    actions: <span className='flex'>
                        <Link href={`/admin/users/${value?.id}/edit`} className='pr-2 font-semibold text-secondary-400'>Edit</Link> |
                        <Link href={`/admin/users/${value?.id}/edit?tab=4`} className='pr-2 pl-2 font-semibold text-secondary-400'>Messages</Link> |
                        <Link href={`/members/${value?.id}`} className='pr-2 pl-2 font-semibold text-secondary-400'>Profile</Link>
                    </span>
                })

            })
            setData(dynamicData)
        }
    }
    const columns = [
        {
            title: 'Name/IP',
            dataIndex: 'name',
            sorter: (a: any, b: any) => a.name?.length - b.name?.length,
        }, {
            title: 'Ranking',
            dataIndex: 'ranking',
            sorter: (a: any, b: any) => a.address?.length - b.address?.length,

        }, {
            title: 'Status',
            dataIndex: 'status',
            sorter: (a: any, b: any) => a.status?.length - b.status?.length,
        }, {
            title: 'Actions',
            dataIndex: 'actions',

        }];

    // const data = [{
    //     key: '1',
    //     name: 'John Brown',
    //     ip: "121.2.47.1",
    //     status: 'Active',
    // }, {
    //     key: '2',
    //     name: 'Jim Green',
    //     ip: "132.62.17.1",
    //     status: 'Active',
    // }, {
    //     key: '3',
    //     name: 'Joe Black',
    //     ip: "12.111.6.72",
    //     status: 'Inactive',
    // }, {
    //     key: '4',
    //     name: 'Jim Red',
    //     ip: "268.912.21.17",
    //     status: 'Active',
    // }];

    function onChange(pagination: any, filters: any, sorter: any) {
        if (pageSize != pagination.pageSize || currentPage != pagination.current) {
            setPageSize(pagination.pageSize)
            setCurrentPage(pagination.current)
            fetchData(pagination.pageSize, pagination.current)
        }
    }
    return <div className='w-full p-6 bg-white'>
        <div className='flex justify-between mt-2 mb-6'>
            <h3 className=' text-2xl font-bold'>Users</h3>
            <Link href={'/admin/users/create'}><ButtonPrimary sizeClass='py-2.5 px-5'>Create</ButtonPrimary></Link>
        </div>
        <div className="flex flex-row max-md:flex-col gap-3 py-4">
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
                                e.stopPropagation()
                                fetchData(pageSize, 1, verified, userRank)
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
                        <label className='text-sm'>User Rank</label>
                    </div>
                    <Select menuDropdown={menuDropdown} sizeClass='w-auto' selectedValue={userRank} setMenu={(val: any) => {
                        setUserRank(val)
                        fetchData(pageSize, 1, verified, val)
                    }} />
                </div>
                <div className="">
                    <div className='w-full'>
                        <label className='text-sm'>CEO Verified</label>
                    </div>
                    <Select menuDropdown={menuDropdown2} selectedValue={verified} setMenu={(val: any) => {
                        setVerified(val);
                        fetchData(pageSize, 1, val, userRank)
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
                <Table columns={columns} pagination={{ pageSizeOptions: ["10", "20", "25", "50"], current: currentPage, total: total, pageSize: pageSize, showSizeChanger: true }} dataSource={data} onChange={onChange} />
            )}
    </div>
}
export default UserPage