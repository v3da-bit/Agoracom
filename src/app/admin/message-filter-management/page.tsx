'use client';

import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import './style.css'
import Link from 'next/link';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import Select from '@/components/Select/Select';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import ButtonCircle from '@/components/Button/ButtonCircle';
import Input from '@/components/Input/Input';

function MessageFilterPage() {
    const columns = [
        {
            title: "Value",
            dataIndex: 'name',
            sorter: (a: any, b: any) => a.name.length - b.name.length,
        }, {
            title: 'Created At',
            dataIndex: 'status',
            sorter: (a: any, b: any) => a.status.length - b.status.length,
        }, {
            title: 'Options',
            dataIndex: 'options',
            render: () => <span className='flex'>
                <Link href={'/'} className='pr-2 font-semibold text-secondary-400'>Edit</Link> |
                <Link href={'/'} className='pr-2 pl-2 font-semibold text-secondary-400'>Remove</Link>
            </span>
        }];


    const data = [{
        key: '1',
        name: "Vedant",
        status: 'Sponsored Hub',

    }, {
        key: '2',
        name: "antid",
        status: 'Sponsored Hub',

    }, {
        key: '3',
        name: "Vedant",
        status: 'Free Hub',

    }, {
        key: '4',
        name: "Vedant",
        status: 'Free Hub',

    }];
    const menuDropdown: any = {
        'discussions': "Newest",
        'discussions_featured': "Featured",
        'discussions_top_rated': "Top Rated",
        'discussions_off_topic': "Off-Topic"
    };
    const [selectedDiscussion, setSelectedDiscussion] = useState("discussions");

    const onTypeChange = (val: any) => {
        setSelectedDiscussion(val);
    }

    function onChange(pagination: any, filters: any, sorter: any) {
        console.log('params', pagination, filters, sorter);
    }

    return <div className='w-full p-6 bg-white'>
        {/* <h3 className='mt-2 mb-6 text-2xl font-bold'>Message Filter Management</h3> */}
        <div className='flex justify-between mt-2 mb-6'>
            <h3 className='text-2xl font-bold my-auto'>Message Filter Management</h3>
            <Link href={'/admin/message-filter-management/create'}><ButtonPrimary sizeClass='py-2.5 px-5'>Create</ButtonPrimary></Link>
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
                            value={""}
                            // onChange={(e) => setKeyword(e.target.value)}
                            className="text-neutral-800 px-6 dark:text-neutral-200"
                        />
                        <ButtonCircle
                            type="submit"
                            // disabled={!keyword.length}
                            // onClick={searchKeyword}
                            className={`absolute transform top-1/2 -translate-y-1/2 end-1 !bg-defaultGreen-100 hover:!bg-primary-500 dark:bg-neutral-300 dark:text-black`}
                        >
                            <MagnifyingGlassIcon className="w-5 h-5" />
                        </ButtonCircle>
                    </form>
                </div>
            </div>

        </div>
        <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
}

export default MessageFilterPage