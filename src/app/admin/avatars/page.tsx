'use client';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import img from '@/images/Icons/avatar.png'
import './style.css'
import Image from 'next/image';

function AvatarScreenPage() {
    const columns = [
        {

            dataIndex: 'image',

        }];


    const data = [{
        image: <div className=" flex flex-col gap-3 justify-center items-left">
            <div className="w-40  h-40 overflow-hidden  rounded-full  flex ">
                <Image
                    src={img}
                    alt="GFG logo served with static path of public directory"
                    width="100"
                    className='w-full h-full'
                    height="100"
                />
            </div>
            <div className="flex justify-left items-center px-12"><span>Remove</span></div>
        </div>
    }, {
        image: <div className=" flex flex-col gap-3 justify-center items-left">
            <div className="w-40  h-40 overflow-hidden  rounded-full  flex ">
                <Image
                    src={img}
                    alt="GFG logo served with static path of public directory"
                    width="100"
                    className='w-full h-full'
                    height="100"
                />
            </div>
            <div className="flex justify-left items-center px-12"><span>Remove</span></div>
        </div>
    }, {
        image: <div className=" flex flex-col gap-3 justify-center items-left">
            <div className="w-40  h-40 overflow-hidden  rounded-full  flex ">
                <Image
                    src={img}
                    alt="GFG logo served with static path of public directory"
                    width="100"
                    className='w-full h-full'
                    height="100"
                />
            </div>
            <div className="flex justify-left items-center px-12"><span>Remove</span></div>
        </div>
    }, {
        image: <div className=" flex flex-col gap-3 justify-center items-left">
            <div className="w-40  h-40 overflow-hidden  rounded-full  flex ">
                <Image
                    src={img}
                    alt="GFG logo served with static path of public directory"
                    width="100"
                    className='w-full h-full'
                    height="100"
                />
            </div>
            <div className="flex justify-left items-center px-12"><span>Remove</span></div>
        </div>
    }];

    function onChange(pagination: any, filters: any, sorter: any) {
        console.log('params', pagination, filters, sorter);
    }
    return <div className='w-full p-6 bg-white'>
        <h3 className='mt-2 mb-6 text-2xl font-bold'>Avatars</h3>
        <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
}

export default AvatarScreenPage