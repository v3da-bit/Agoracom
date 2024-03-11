'use client';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import './style.css'
import Link from 'next/link';
import ButtonPrimary from '@/components/Button/ButtonPrimary';

function NewsFlashPage() {
    const columns = [
        {
            title: <h1 className=' text-center'>Name</h1>,
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
            render: () => <span className='flex'>
                <span className='pr-2'><Link href='/'>View</Link></span> |
                <span className='px-2'><Link href='/'>Edit</Link></span> |
                <span className='px-2'><Link href='/'>Broadcasts</Link></span> |
                <span className='px-2'><Link href='/'>Messages</Link></span> |
                <span className='px-2'><Link href='/'>Executive</Link></span> |
                <span className='px-2'><Link href='/'>Addresses</Link></span> |
                <span className='px-2'><Link href='/'>Management</Link></span>

            </span>
        }];


    const data = [{
        key: '1',
        name: <div className=' flex flex-col gap-2'>
            <h1 className='text-center'>John Brown</h1>
        </div>,
        isActive: "Active Sponsored",
        hubType: 'Sponsored Hub',
    }, {
        key: '2',
        name: <div className=' flex flex-col gap-2'>
            <h1 className='text-center'>Jim Green</h1>

        </div>,
        isActive: "Active Sponsored",
        hubType: 'Sponsored Hub',
    }, {
        key: '3',
        name: <div className=' flex flex-col gap-2'>
            <h1 className='text-center'>Joe Black</h1>

        </div>,
        isActive: "Active Sponsored",
        hubType: 'Free Hub',
    }, {
        key: '4',
        name: <div className=' flex flex-col gap-2'>
            <h1 className='text-center'>Jim Red</h1>

        </div>,
        isActive: "Active Sponsored",
        hubType: 'Free Hub',
    }];

    function onChange(pagination: any, filters: any, sorter: any) {
        console.log('params', pagination, filters, sorter);
    }

    return <div className='w-full p-6 bg-white'>
        {/* <h3 className='mt-2 mb-6 text-2xl font-bold'>News Flash</h3> */}
        <div className='flex justify-between mt-2 mb-6'>
            <h3 className='text-2xl font-bold my-auto'>News Flash</h3>
            <Link href={'/admin/news-flash/create'}><ButtonPrimary sizeClass='py-2.5 px-5'>Create</ButtonPrimary></Link>
        </div>
        <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
}

export default NewsFlashPage