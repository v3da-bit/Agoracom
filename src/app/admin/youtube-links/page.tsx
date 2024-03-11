'use client';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import './style.css'
import Link from 'next/link';
import ButtonPrimary from '@/components/Button/ButtonPrimary';

function YoutubeLinkPage() {
    const columns = [
        {
            title: "Title",
            dataIndex: 'name',
            sorter: (a: any, b: any) => a.name.length - b.name.length,
        }, {
            title: 'Company',
            dataIndex: 'stock',
            sorter: (a: any, b: any) => a.stock.length - b.stock.length,
        }, {
            title: 'Published At',
            dataIndex: 'publish',
            sorter: (a: any, b: any) => a.publish.length - b.publish.length,
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
        name: "Vedant",
        stock: "Active Sponsored",
        publish: 'Sponsored Hub',

    }, {
        key: '2',
        name: "antid",
        stock: "DActive Sponsored",
        publish: 'Sponsored Hub',

    }, {
        key: '3',
        name: "Vedant",
        stock: "Active Sponsored",
        publish: 'Free Hub',

    }, {
        key: '4',
        name: "Vedant",
        stock: "Active Sponsored",
        publish: 'Free Hub',

    }];

    function onChange(pagination: any, filters: any, sorter: any) {
        console.log('params', pagination, filters, sorter);
    }
    return <div className='w-full p-6 bg-white'>
        {/* <h3 className='mt-2 mb-6 text-2xl font-bold'>YouTube Links</h3> */}
        <div className='flex justify-between mt-2 mb-6'>
            <h3 className='text-2xl font-bold my-auto'>YouTube Links</h3>
            <Link href={'/admin/youtube-links/create'}><ButtonPrimary sizeClass='py-2.5 px-5'>Create</ButtonPrimary></Link>
        </div>
        <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
}

export default YoutubeLinkPage