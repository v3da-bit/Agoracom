'use client';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import './style.css'
import { title } from 'process';
import Link from 'next/link';
import ButtonSecondary from '@/components/Button/ButtonSecondary';
import ButtonPrimary from '@/components/Button/ButtonPrimary';

function CategoryScreenPage() {
    const columns = [
        {
            title: "Name",
            dataIndex: 'name',
            sorter: (a: any, b: any) => a.name.length - b.name.length,

        }, {
            title: "Companies",
            dataIndex: 'companies',
            sorter: (a: any, b: any) => a.companies.length - b.companies.length,
        }, {

            dataIndex: 'options',
            render: () => <span className='flex'>
                <Link href={'/'} className='pr-2 font-semibold text-secondary-400'>Edit</Link> |
                <Link href={'/'} className='pl-2 font-semibold text-secondary-400'>Delete</Link>
            </span>
        }];


    const data = [{
        key: '1',
        name: "Vedant",
        companies: ".png",

    }, {
        key: '2',
        name: "Vedant",
        companies: ".png",

    }, {
        key: '3',
        name: "Vedant",
        companies: ".png",

    }, {
        key: '4',
        name: "Vedant",
        companies: ".png",

    }];

    function onChange(pagination: any, filters: any, sorter: any) {
        console.log('params', pagination, filters, sorter);
    }
    return <div className='w-full p-6 bg-white'>
        {/* <h3 className='mt-2 mb-6 text-2xl font-bold'>Categories</h3> */}
        <div className='flex justify-between mt-2 mb-6'>
            <h3 className='text-2xl font-bold my-auto'>Categories</h3>
            <Link href={'/admin/categories/create'}><ButtonPrimary sizeClass='py-2.5 px-5'>Create</ButtonPrimary></Link>
        </div>
        <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
}

export default CategoryScreenPage