'use client';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import './style.css'
import moment from 'moment';
import Link from 'next/link';

function NotificationPage() {
    const columns = [
        {
            title: "Notification",
            dataIndex: 'notification',
            sorter: (a: any, b: any) => a.notification.length - b.notification.length,
        }, {
            title: 'Date',
            dataIndex: 'date',
            sorter: (a: any, b: any) => a.date - b.date,
        }, {
            title: 'Actions',
            dataIndex: 'actions',
            render: () => <Link href={'/'} className='pr-2 font-semibold text-secondary-400'>Remove</Link>
        }];


    const data = [{
        key: '1',
        notification: "Vedant",
        date: moment('jan 12').format('ll'),
        actions: <a href='#'>Remove</a>,
    }, {
        key: '2',
        notification: "antid",
        date: moment('jan 13').format('ll'),
        actions: <a href='#'>Remove</a>,
    }, {
        key: '3',
        notification: "Vedant",
        date: moment(Date.now()).format('ll'),
        actions: <a href='#'>Remove</a>,
    }, {
        key: '4',
        notification: "Vedant",
        date: moment('jan 15').format('ll'),
        actions: <a href='#'>Remove</a>,
    }];

    function onChange(pagination: any, filters: any, sorter: any) {
        console.log('params', pagination, filters, sorter);
    }
    return <div className='w-full p-6 bg-white'>
        <h3 className='mt-2 mb-6 text-2xl font-bold'>Notifications</h3>
        <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
}

export default NotificationPage