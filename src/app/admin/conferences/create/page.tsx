'use client'
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import ButtonSecondary from '@/components/Button/ButtonSecondary'
import Input from '@/components/Input/Input'
import moment from 'moment'
import Link from 'next/link'
import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useValidator from '@/hooks/useValidator'
import dynamic from 'next/dynamic'

function ConferencePage() {
    const style = 'mt-2 font-semibold text-base max-md:text-md text-dark line-clamp-5'
    const style2 = 'mt-1 font-semibold text-sm text-gray-600 dark:text-gray-200'
    const initialData = {
        name: '',
        startDate: Date.now(),
        endDate: Date.now(),
        banner: '',
        logo: '',
        Summary: '',
        details: '',
        embededUrl: '',
        companies: '',
        published: false

    }
    const [data, setData] = useState(initialData)
    const [errors, setErrors] = useState([]);
    const handleChange = (key: string, value: string) => {
        setData({
            ...data,
            [key]: value
        })
    }

    const DynamicComponentWithNoSSR = dynamic(
        () => import('@/components/TextEditor/TextEditor'),
        { ssr: false }
    )

    const submitHandler = async (e: any) => {
        e.preventDefault();
        e.stopPropagation();

    }
    const resert = async (e: any) => {
        setData(initialData)
    }
    return (
        <div className="p-6 bg-white dark:bg-neutral-900 my-3">
            <div className='flex justify-between mt-2 mb-6'>
                <h3 className='text-2xl font-bold my-auto'>Create Conference</h3>
                <Link href={'/admin/conferences'}><ButtonSecondary sizeClass='py-2.5 px-5'>Back</ButtonSecondary></Link>
            </div>
            <div className='grid grid-flow-row gap-1'>
                <div className=" w-full flex items-center justify-start">
                    <h1 className={style}>Name</h1>
                </div>
                <div className="flex-shrink-0  w-full">
                    <form className="relative">
                        <Input
                            required
                            aria-required
                            placeholder=""
                            type="text"
                            value={data.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            className="text-neutral-800 px-4 border dark:text-neutral-200 rounded-md "
                        />
                    </form>
                </div>
            </div>
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5 mt-2">
                <div className=' grid grid-flow-row gap-1'>
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style}>Start Date</h1>
                    </div>
                    <DatePicker className="w-full border-[1px] dark:bg-neutral-900 border-neutral-200 rounded-md" selected={data.startDate} onChange={(date: any) => handleChange('startDate', date)} />
                </div>
                <div className=' grid grid-flow-row gap-1'>
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style}>End Date</h1>
                    </div>
                    <DatePicker className="w-full border-[1px] dark:bg-neutral-900 border-neutral-200 rounded-md" selected={data.endDate} onChange={(date: any) => handleChange('endDate', date)} />
                </div>

            </div>
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5 mt-2">
                <div className='py-1 grid grid-flow-row gap-1'>
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style}>Current Banner</h1>
                    </div>
                    <div className="flex-shrink-0  lg:mb-0 grow lg:grow-0 w-full ">
                        <Input
                            required
                            aria-required
                            type="file"
                            accept='image/*'
                            value={data.banner}
                            onChange={(e) => handleChange('banner', e.target.value)}
                            className="text-neutral-800 px-4 text-lg border dark:text-neutral-200 rounded-md"
                        />
                    </div>

                </div>
                <div className=' grid grid-flow-row gap-1'>
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style}>Current Logo</h1>
                    </div>
                    <div className="flex-shrink-0  lg:mb-0 grow lg:grow-0 w-full ">
                        <Input
                            required
                            aria-required
                            type="file"
                            accept='image/*'
                            value={data.logo}
                            onChange={(e) => handleChange('logo', e.target.value)}
                            className="text-neutral-800 px-4 text-lg border dark:text-neutral-200 rounded-md"
                        />
                    </div>

                </div>

            </div>
            <div className='grid grid-flow-row gap-1 mt-2'>
                <div className=" w-full flex items-center justify-start">
                    <h1 className={style}>Summary</h1>
                </div>
                <div className="flex-shrink-0 grow lg:grow-0 w-full">
                    <form className="relative">
                        <textarea
                            required
                            aria-required
                            placeholder='Enter Summary'
                            value={data.Summary}
                            onChange={(e) => handleChange('Summary', e.target.value)}
                            className="text-neutral-800 h-44 w-full px-4 border-[1px] border-neutral-200 rounded-md dark:text-neutral-200 dark:bg-neutral-800"
                        />
                    </form>
                </div>
            </div>
            <div className="grid grid-flow-row gap-1 mt-2">
                <h1 className={style}>Full Details</h1>
                <div className="w-full">
                    <DynamicComponentWithNoSSR data={""} setData={(e: any) => console.log(e)} />
                </div>
            </div>
            <div className='grid grid-flow-row gap-1 mt-2'>
                <div className=" w-full flex items-center justify-start">
                    <h1 className={style}>Video Embed URL</h1>
                </div>
                <div className="flex-shrink-0  w-full">
                    <form className="relative">
                        <Input
                            required
                            aria-required
                            placeholder=""
                            type="text"
                            value={data.embededUrl}
                            onChange={(e) => handleChange('embededUrl', e.target.value)}
                            className="text-neutral-800 px-4 border dark:text-neutral-200 rounded-md "
                        />
                    </form>
                </div>
            </div>
            <div className='grid grid-flow-row gap-1 mt-2'>
                <div className=" w-full flex items-center justify-start">
                    <h1 className={style}>Presenting Companies</h1>
                </div>
                <div className="flex-shrink-0  w-full">
                    <form className="relative">
                        <Input
                            required
                            aria-required
                            placeholder=""
                            type="text"
                            value={data.companies}
                            onChange={(e) => handleChange('companies', e.target.value)}
                            className="text-neutral-800 px-4 border dark:text-neutral-200 rounded-md "
                        />
                    </form>
                    <h1 className={style2}>Enter stock symbols for companies presenting at this conference</h1>
                </div>
            </div>
            <div className="flex flex-row max-sm:flex-col gap-3 mt-3">
                <div className="flex items-center justify-center mt-2">
                    <input checked={data.published} onChange={() => data.published ? handleChange('published', false) : handleChange('published', true)} id="checked-checkbox3" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="checked-checkbox3" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Published</label>
                </div>
            </div>
            <div className="py-3 mt-3 flex flex-row items-center gap-4 max-sm:flex-col">
                <ButtonPrimary onClick={submitHandler} sizeClass='py-2.5 px-5'>Create Conglomerate</ButtonPrimary>
                <h2 className={style2}>or</h2>
                <ButtonPrimary onClick={resert} className=' bg-white hover:bg-slate-300 !border-[1px] !border-neutral-200' sizeClass='py-2.5 px-5'><span className='text-red-600'>Reset</span></ButtonPrimary>
            </div>
        </div>
    )
}

export default ConferencePage