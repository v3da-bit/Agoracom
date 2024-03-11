'use client';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import './style.css'
import ButtonSecondary from '@/components/Button/ButtonSecondary';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import Link from 'next/link';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import ButtonCircle from '@/components/Button/ButtonCircle';
import Input from '@/components/Input/Input';

function ConglomeratesPage() {
    const columns = [
        {

            dataIndex: 'content',
        }, {
            title: 'Status',
            dataIndex: 'decision',
            sorter: (a: any, b: any) => a.name.length - b.name.length,
        }, {
            title: 'Actions',
            dataIndex: 'options',
            render: () => <span className='flex'>
                <Link href={'/'} className='pr-2 font-semibold text-secondary-400'>View</Link> |
                <Link href={'/'} className='px-2 pl-2 font-semibold text-secondary-400'>Edit</Link>
            </span>
        }];


    const data = [{
        key: '1',
        content: "hello world",
        decision: 'John Brown',


    }, {
        key: '2',
        content: "hello world",
        decision: 'Jim Green',

    }, {
        key: '3',
        content: "hello world",
        decision: 'Joe Black',

    }, {
        key: '4',
        content: "hello world",
        decision: 'Jim Red',

    }];
    const style1 = 'mt-1 font-semibold text-lg text-gray-600 dark:text-gray-200'


    function onChange(pagination: any, filters: any, sorter: any) {
        console.log('params', pagination, filters, sorter);
    }
    return <div className='w-full p-6 bg-white'>
        {/* <h3 className='mt-2 mb-6 text-2xl font-bold'>Conglomerates Administration</h3> */}
        <div className='flex justify-between mt-2 mb-6'>
            <h3 className='text-2xl font-bold my-auto'>Conglomerates Administration</h3>
            <Link href={'/admin/conglomerates/create'}><ButtonPrimary sizeClass='py-2.5 px-5'>Create</ButtonPrimary></Link>
        </div>
        {/* <div className="flex flex-row gap-3 justify-center py-3">
            <h1 className={style1}>Conglomerate Name</h1>
            <div className="flex-shrink-0   lg:mb-0 grow lg:grow-0">
                <form className="relative">
                    <Input
                        required
                        aria-required
                        placeholder=""
                        type="text"
                        value={""}
                        // onChange={(e) => setKeyword(e.target.value)}
                        className="text-neutral-800 px-6 dark:text-neutral-200 rounded-md"
                    />
                </form>
            </div>
        </div>
        <div className="flex flex-row mb-4 gap-3 px-3 justify-center items-center">
            <ButtonSecondary className='rounded-md'>Search</ButtonSecondary>
            <h1 className=''>Or</h1>
            <ButtonPrimary className='rounded-md bg-slate-50 hover:bg-slate-200'><span className=' text-blue-600'>Reset</span></ButtonPrimary>
          </div> */}
        <div className="flex flex-row max-md:flex-col gap-3 py-4">
            <div className="w-full">
                <div className="flex-shrink-0  lg:mb-0 grow lg:grow-0 lg:!w-[260px] sm:!w-full">
                    <form className="relative">
                        <Input
                            required
                            aria-required
                            placeholder="Search Keyword"
                            type="text"
                            value={""}
                            // onChange={(e) => setKeyword(e.target.value)}
                            className="text-neutral-800 px-6 dark:text-neutral-200"
                        />
                        <ButtonCircle
                            type="submit"
                            // disabled={!keyword.length}
                            // onClick={searchKeyword}
                            className={`absolute transform top-1/2 -translate-y-1/2 end-1 !bg-defaultGreen-100 hover:!bg-primary-500 dark:bg-neutral-300 dark:text-black`}
                        >
                            <MagnifyingGlassIcon className="w-5 h-5" />
                        </ButtonCircle>
                    </form>
                </div>
            </div>

        </div>
        <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
}

export default ConglomeratesPage