'use client';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import './style.css'
import Link from 'next/link';
import ButtonPrimary from '@/components/Button/ButtonPrimary';

function FilesPage() {
    const columns = [
        {

            dataIndex: 'imgName',
            sorter: (a: any, b: any) => a.imgName.length - b.imgName.length,
        }, {

            dataIndex: 'type',

        }, {

            dataIndex: 'image',

        }, {

            dataIndex: 'size',
            sorter: (a: any, b: any) => a.size - b.size,
        }, {
            title: 'Actions',
            dataIndex: 'options',
            render: () => <span className='flex'>
                <Link href={'/'} className='pr-2 font-semibold text-secondary-400'>Edit</Link> |
                <Link href={'/'} className='pr-2 pl-2 font-semibold text-secondary-400'>Delete</Link>
            </span>
        }];


    const data = [{
        key: '1',
        imgName: "Vedant",
        type: ".png",
        image: "image/png",
        size: '120Kb'
    }];

    function onChange(pagination: any, filters: any, sorter: any) {
        console.log('params', pagination, filters, sorter);
    }
    return <div className='w-full p-6 bg-white'>
        {/* <h3 className='mt-2 mb-6 text-2xl font-bold'>File Administration</h3> */}
        <div className='flex justify-between mt-2 mb-6'>
            <h3 className='text-2xl font-bold my-auto'>File Administration</h3>
            <Link href={'/admin/files/create'}><ButtonPrimary sizeClass='py-2.5 px-5'>Create</ButtonPrimary></Link>
        </div>
        <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
}

export default FilesPage