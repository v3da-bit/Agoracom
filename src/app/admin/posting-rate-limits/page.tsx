'use client';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import './style.css'
import Link from 'next/link';
import ButtonPrimary from '@/components/Button/ButtonPrimary';

function PostingLimitPage() {
    const columns = [
        {
            title: "Enabled",
            dataIndex: 'enabled',

        }, {
            title: 'Rank (equal or less than)',
            dataIndex: 'rank',
            sorter: (a: any, b: any) => a.rank.length - b.rank.length,
        }, {
            title: 'Posting limit for period',
            dataIndex: 'publish',
            sorter: (a: any, b: any) => a.publish - b.publish,
        }, {
            title: 'Period in seconds',
            dataIndex: 'period',
            sorter: (a: any, b: any) => a.period - b.period,
        }, {
            title: 'Enable at',
            dataIndex: 'enable',
            sorter: (a: any, b: any) => a.enable - b.enable,
        }, {
            title: 'Disable at',
            dataIndex: 'disable',
            sorter: (a: any, b: any) => a.disable - b.disable,
        }, {
            title: 'Actions',
            dataIndex: 'options',
            render: () => <span className='flex'>
                <Link href={'/'} className='pr-2 font-semibold text-secondary-400'>Edit</Link> |
                <Link href={'/'} className='pr-2 pl-2 font-semibold text-secondary-400'>Remove</Link>
            </span>
        }];


    const data = [{
        key: '1',
        enabled: "Vedant",
        rank: "Active Sponsored",
        publish: 15,
        period: 15,
        enable: 15,
        disable: 15,

    }, {
        key: '2',
        enabled: "antid",
        rank: "DActive Sponsored",
        publish: 10,
        period: 10,
        enable: 10,
        disable: 10,

    }, {
        key: '3',
        enabled: "Vedant",
        rank: "Active Sponsored",
        publish: 12,
        period: 12,
        enable: 12,
        disable: 12,

    }, {
        key: '4',
        enabled: "Vedant",
        rank: "Active Sponsored",
        publish: 15,
        period: 15,
        enable: 15,
        disable: 15,

    }];

    function onChange(pagination: any, filters: any, sorter: any) {
        console.log('params', pagination, filters, sorter);
    }
    return <div className='w-full p-6 bg-white'>
        {/* <h3 className='mt-2 mb-6 text-2xl font-bold'>Posting Rate Limit Triggers</h3> */}
        <div className='flex justify-between mt-2 mb-6'>
            <h3 className='text-2xl font-bold my-auto'>Posting Rate Limit Triggers</h3>
            <Link href={'/admin/posting-rate-limits/create'}><ButtonPrimary sizeClass='py-2.5 px-5'>Create</ButtonPrimary></Link>
        </div>
        <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
}

export default PostingLimitPage