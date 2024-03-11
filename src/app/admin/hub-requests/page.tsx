'use client';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import './style.css'
import Link from 'next/link';

function HubRequestPage() {
    const columns = [
        {
            title: "Company Name",
            dataIndex: 'name',
            sorter: (a: any, b: any) => a.name.length - b.name.length,
        }, {
            title: 'Stock Symbol',
            dataIndex: 'stock',
            sorter: (a: any, b: any) => a.stock.length - b.stock.length,
        }, {
            title: 'Nominator',
            dataIndex: 'nominator',
            sorter: (a: any, b: any) => a.nominator.length - b.nominator.length,
        }, {
            title: 'Created at',
            dataIndex: 'created',
            sorter: (a: any, b: any) => a.created.length - b.created.length,
        }, {
            title: 'Actions',
            dataIndex: 'actions',
            render: () => <span className='flex'>
                <Link href={'/'} className='pr-2 font-semibold text-secondary-400'>View</Link> |
                <Link href={'/'} className='pr-2 pl-2 font-semibold text-secondary-400'>Process</Link> |
                <Link href={'/'} className='pr-2 pl-2 font-semibold text-secondary-400'>Edit</Link>
            </span>
        }];


    const data = [{
        key: '1',
        name: "Vedant",
        stock: "Active Sponsored",
        nominator: 'Sponsored Hub',
        created: 'Sponsored Hub',
    }, {
        key: '2',
        name: "antid",
        stock: "DActive Sponsored",
        nominator: 'Sponsored Hub',
        created: 'Sponsored Hub',
    }, {
        key: '3',
        name: "Vedant",
        stock: "Active Sponsored",
        nominator: 'Free Hub',
        created: 'Free Hub',
    }, {
        key: '4',
        name: "Vedant",
        stock: "Active Sponsored",
        nominator: 'Free Hub',
        created: 'Free Hub',
    }];

    function onChange(pagination: any, filters: any, sorter: any) {
        console.log('params', pagination, filters, sorter);
    }
    return <div className='w-full p-6 bg-white'>
        <h3 className='mt-2 mb-6 text-2xl font-bold'>Pending Hub Requests</h3>
        <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
}

export default HubRequestPage