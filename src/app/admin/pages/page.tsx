'use client';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import './style.css'
import Link from 'next/link';
import ButtonPrimary from '@/components/Button/ButtonPrimary';

function PageListScreen() {
    const columns = [
        {
            title: "Page Title",
            dataIndex: 'user',
            sorter: (a: any, b: any) => a.user.length - b.user.length,
        }, {
            title: 'Page URL',
            dataIndex: 'reason',
            sorter: (a: any, b: any) => a.reason.length - b.reason.length,
        }, {
            title: 'Actions',
            dataIndex: 'action',
            render: () => <span>
                <Link href={'/'} className='pr-2 font-semibold text-secondary-400'>Edit</Link> |
                <Link href={'/'} className='pr-2 pl-2 font-semibold text-secondary-400'>Delete</Link>
            </span>
        }];


    const data = [{
        key: '1',
        user: "Vedant",
        reason: "Active Sponsored",
        timestamp: 'Sponsored Hub',
    }, {
        key: '2',
        user: "antid",
        reason: "DActive Sponsored",
        timestamp: 'Sponsored Hub',
    }, {
        key: '3',
        user: "Vedant",
        reason: "Active Sponsored",
        timestamp: 'Free Hub',
    }, {
        key: '4',
        user: "Vedant",
        reason: "Active Sponsored",
        timestamp: 'Free Hub',
    }];

    function onChange(pagination: any, filters: any, sorter: any) {
        console.log('params', pagination, filters, sorter);
    }
    return <div className='w-full p-6 bg-white'>
        {/* <h3 className='mt-2 mb-6 text-2xl font-bold'>Pages</h3> */}
        <div className='flex justify-between mt-2 mb-6'>
            <h3 className='text-2xl font-bold my-auto'>Pages</h3>
            <Link href={'/admin/pages/create'}><ButtonPrimary sizeClass='py-2.5 px-5'>Create</ButtonPrimary></Link>
        </div>
        <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
}

export default PageListScreen