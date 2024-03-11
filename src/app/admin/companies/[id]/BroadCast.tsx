'use client';

import { CompanyBroadcastPagination } from '@/requests/Profile';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function BroadCastPage() {
    const style = 'font-semibold text-xl text-white max-md:text-md'
    const style2 = ' font-semibold text-right text-base text-dark'
    const [industry, setIndustry] = useState('posts');
    const router = useRouter()
    const [data, setData] = useState([])
    const [pageSize, setPageSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0)
    const [globalLoader, setGlobalLoader] = useState(false);
    const params=useParams()
    useEffect(()=>{
        fetchData(params.id,pageSize,currentPage)
    },[])
    const fetchData = async (id: any,item:any,page:any) => {
        // setGlobalLoader(true)
        const response = await CompanyBroadcastPagination(id,item,page)
        // setGlobalLoader(false)

        if (response.status === 200) {
            setData(response.data)
        }
    }
    return (
        <div className='w-full bg-white dark:bg-neutral-900  grid grid-flow-row gap-2 py-3 px-3'>
            <h1>broadcast</h1>
            
        </div>

    )
}

export default BroadCastPage