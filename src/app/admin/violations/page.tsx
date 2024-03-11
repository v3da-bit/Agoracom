'use client';
import { Pagination, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import './style.css'
import Link from 'next/link';
import { ViolationPagination } from '@/requests/Profile';
import moment from 'moment';

function ViolationPage() {
    const [pageSize, setPageSize] = useState(10)
    const [globalLoader, setGlobalLoader] = useState(false);
    const [total, setTotal] = useState(0)
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        fetchData(pageSize, 1)
    }, [])
    const fetchData = async (item: any, page: any) => {
        setGlobalLoader(true);
        const response = await ViolationPagination(item, page)
        setGlobalLoader(false);
        if (response.status === 200) {
            let dynamicData: any = []
            setTotal(JSON.parse(response.headers.pagy).count)
            // setData(response.data)
            response.data.map((value: any) => {
                let id = value?.id
                dynamicData.push({
                    key: value?.id,
                    decision: value?.status_label,
                    company: value?.message.company_stock_symbol,
                    message: value?.message.title,
                    author: value?.message.username,
                    createdDate: moment(value?.message.created_at).format('lll'),
                    reported: value?.reporter.username,
                    reportedDate: moment(value?.created_at).format('lll'),
                    process: value?.status_label === 'Pending' ? <Link href={`/admin/violations/${id}/edit`} className='pr-2 font-semibold text-secondary-400'>Process</Link> : <Link href={`/admin/violations/${id}`} className='pr-2 font-semibold text-secondary-400'>View</Link>,
                    companyId: value?.message?.company_id,
                    messageId: value?.message?.id,
                    userId: value?.message?.user_id,
                    reporterId: value?.reporter?.id
                })

            })
            setData(dynamicData)
        }

    }
    const columns = [
        {
            title: 'Decision',
            dataIndex: 'decision',
            sorter: (a: any, b: any) => a.decision?.length - b.decision?.length,
        }, {
            title: 'Company',
            dataIndex: 'company',
            sorter: (a: any, b: any) => a.company?.length - b.company?.length,
            render: (record: any, _: any) => <Link href={`/company/${_.companyId}`} className='text-secondary-400'>{record}</Link>
        }, {
            title: 'Message',
            dataIndex: 'message',
            sorter: (a: any, b: any) => a.message?.length - b.message?.length,
            render: (record: any, _: any) => <Link href={`/company/${_.companyId}/discussion/${_.messageId}`} className='text-secondary-400'>{record}</Link>
        }, {
            title: 'Posted By',
            dataIndex: 'author',
            sorter: (a: any, b: any) => a.author?.length - b.author?.length,
            render: (record: any, _: any) => <Link href={`/members/${_.userId}`} className='text-secondary-400'>{record}</Link>
        }, {
            title: 'Reported By',
            dataIndex: 'reported',
            sorter: (a: any, b: any) => a.reported?.length - b.reported?.length,
            render: (record: any, _: any) => <Link href={`/members/${_.reporterId}`} className='text-secondary-400'>{record}</Link>
        }, {
            title: 'Created Date',
            dataIndex: 'createdDate',
            sorter: (a: any, b: any) => a.createdDate?.length - b.createdDate?.length,
        }, {
            title: 'Reported Date',
            dataIndex: 'reportedDate',
            sorter: (a: any, b: any) => a.reportedDate?.length - b.reportedDate?.length,
        }, {
            title: '',
            dataIndex: 'process',
        }];

    function onChange(pagination: any, filters: any, sorter: any) {
        if (pageSize != pagination.pageSize || currentPage != pagination.current) {
        setPageSize(pagination.pageSize)
        setCurrentPage(pagination.current);
        fetchData(pagination.pageSize, pagination.current)
        }
    }

    return <div className='w-full p-6 bg-white'>
        <h3 className='mt-2 mb-6 text-2xl font-bold'>Violations</h3>
        {globalLoader ?
            <div className='flex items-center justify-center '>
                <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
            </div>
            : (
                <Table columns={columns} pagination={{ pageSizeOptions: ["10", "20", "25", "50"], total: total, pageSize: pageSize, showSizeChanger: true, current: currentPage }} dataSource={data} onChange={onChange} />
            )}
    </div>
}

export default ViolationPage