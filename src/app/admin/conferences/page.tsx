'use client';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import './style.css'
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import Link from 'next/link';

function ConferencePage() {
    const columns = [
        {
            title: "Is published",
            dataIndex: 'user',
            sorter: (a: any, b: any) => a.user.length - b.user.length,
        }, {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a: any, b: any) => a.name.length - b.name.length,
        }, {
            title: 'Conference users count',
            dataIndex: 'count',
            sorter: (a: any, b: any) => a.count - b.count,
        }, {
            title: 'Duration',
            dataIndex: 'duration',
            sorter: (a: any, b: any) => a.duration - b.duration,
        }];


    const data = [{
        key: '1',
        user: "Vedant",
        name: "Active Sponsored",
        count: 10,
        duration: 12
    }, {
        key: '2',
        user: "antid",
        name: "DActive Sponsored",
        count: 10,
        duration: 12
    }, {
        key: '3',
        user: "Vedant",
        name: "Active Sponsored",
        count: 10,
        duration: 12
    }, {
        key: '4',
        user: "Vedant",
        name: "Active Sponsored",
        count: 10,
        duration: 12
    }];

    function onChange(pagination: any, filters: any, sorter: any) {
        console.log('params', pagination, filters, sorter);
    }
    return <div className='w-full p-6 bg-white'>
        {/* <h3 className='mt-2 mb-6 text-2xl font-bold'>Conference Administration</h3> */}
        <div className='flex justify-between mt-2 mb-6'>
            <h3 className='text-2xl font-bold my-auto'>Conference Administration</h3>
            <Link href={'/admin/conferences/create'}><ButtonPrimary sizeClass='py-2.5 px-5'>Create</ButtonPrimary></Link>
        </div>
        <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
}

export default ConferencePage