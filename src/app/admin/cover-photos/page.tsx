'use client';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import './style.css'
import { title } from 'process';
import Link from 'next/link';
import ButtonPrimary from '@/components/Button/ButtonPrimary';

function CoverPhotoPage() {
    const columns = [
        {
            title: "ID",
            dataIndex: 'id',
            sorter: (a: any, b: any) => a.id - b.id,
        }, {
            title: "Coverphoto",
            dataIndex: 'coverphoto',

        }, {
            title: "Category",
            dataIndex: 'category',

        }, {

            dataIndex: 'options',
            render: () => <span className='flex'>
                <Link href={'/'} className='pr-2 font-semibold text-secondary-400'>Edit</Link>
                <Link href={'/'} className='pr-2 font-semibold text-secondary-400'>Delete</Link>
            </span>
        }];


    const data = [{
        key: '1',
        id: '1',
        coverphoto: "Vedant",
        category: ".png",

    }, {
        key: '2',
        id: '1',
        coverphoto: "Vedant",
        category: ".png",

    }, {
        key: '3',
        id: '1',
        coverphoto: "Vedant",
        category: ".png",

    }, {
        key: '4',
        id: '1',
        coverphoto: "Vedant",
        category: ".png",

    }];

    function onChange(pagination: any, filters: any, sorter: any) {
        console.log('params', pagination, filters, sorter);
    }
    return <div className='w-full p-6 bg-white'>
        {/* <h3 className='mt-2 mb-6 text-2xl font-bold'>Cover Photos</h3> */}
        <div className='flex justify-between mt-2 mb-6'>
            <h3 className='text-2xl font-bold my-auto'>Cover Photos</h3>
            <Link href={'/admin/cover-photos/create'}><ButtonPrimary sizeClass='py-2.5 px-5'>Create</ButtonPrimary></Link>
        </div>
        <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
}

export default CoverPhotoPage