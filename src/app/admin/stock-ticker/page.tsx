'use client';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import './style.css'
import Link from 'next/link';
import ButtonPrimary from '@/components/Button/ButtonPrimary';

function StockTickerPage() {
    const columns = [
        {
            title: 'Symbols',
            dataIndex: 'decision',
            sorter: (a: any, b: any) => a.name.length - b.name.length,
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
        decision: 'John Brown',


    }, {
        key: '2',
        decision: 'Jim Green',

    }, {
        key: '3',
        decision: 'Joe Black',

    }, {
        key: '4',
        decision: 'Jim Red',

    }];


    function onChange(pagination: any, filters: any, sorter: any) {
        console.log('params', pagination, filters, sorter);
    }
    return <div className='w-full p-6 bg-white'>
        {/* <h3 className='mt-2 mb-6 text-2xl font-bold'>Stock Tickers</h3> */}
        <div className='flex justify-between mt-2 mb-6'>
            <h3 className='text-2xl font-bold my-auto'>Stock Tickers</h3>
            <Link href={'/admin/stock-ticker/create'}><ButtonPrimary sizeClass='py-2.5 px-5'>Create</ButtonPrimary></Link>
        </div>
        <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
}

export default StockTickerPage