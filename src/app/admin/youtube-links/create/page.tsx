"use client";
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import ButtonSecondary from '@/components/Button/ButtonSecondary'
import Input from '@/components/Input/Input'
import useValidator from '@/hooks/useValidator';
import moment from 'moment'
import Link from 'next/link'
import { title } from 'process';
import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function YoutubePage() {
    const style = 'mt-2 font-semibold text-base max-md:text-md text-dark line-clamp-5'
    const style2 = 'mt-1 font-semibold text-sm text-gray-600 dark:text-gray-200'
    const initialData={
        title:'',
        videoId:'',
        publishedAt:Date.now(),
        hubPath:'',
        
    }
    const [data,setData]=useState(initialData)
    const [errors, setErrors] = useState([]);
    const [validator, showValidationMessage]: any = useValidator({}, {
        title: {
            message: 'Title must be filled',
            rule: (val: any, params: any, validator: any) => {
                return  data.title=== val;
            },
            required: true
        },
        videoId:{
            rule: (val: any, params: any, validator: any) => {
                return  data.videoId=== val;
            },
            required: true
        },
        publishedAt:{
            rule: (val: any, params: any, validator: any) => {
                return  data.publishedAt=== val;
            },
            required: true
        },
        hubPath:{
            rule: (val: any, params: any, validator: any) => {
                return  data.hubPath=== val;
            },
            required: true
        }
    });
    const submitHandler = async (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (validator.allValid()) {
            setErrors([]);
            
            
        } else {
            showValidationMessage(true);
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            // forceUpdate();
        }
    }
    const resert=async(e:any)=>{
        setData(initialData)
    }
    const handleChange = (key: string, value: string) => {
        setData({
            ...data,
            [key]: value
        })
    }
    return (
        <div className="p-6 bg-white dark:bg-neutral-900 my-3">
            <div className='flex justify-between mt-2 mb-6'>
                <h3 className='text-2xl font-bold my-auto'>Create New Link</h3>
                <Link href={'/admin/youtube-links'}><ButtonSecondary sizeClass='py-2.5 px-5'>Back</ButtonSecondary></Link>
            </div>
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5">
                <div className='grid grid-flow-row gap-1'>
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style}>Title*</h1>
                    </div>
                    <div className="flex-shrink-0  w-full">
                        <form className="relative">
                            <Input
                                required
                                aria-required
                                placeholder=""
                                type="text"
                                value={data.title}
                                onChange={(e) => handleChange('title',e.target.value)}
                                className="text-neutral-800 px-6 dark:text-neutral-200 rounded-md "
                            />
                            <div className="w-full mt-1 text-red-500 text-sm">{validator.message('title', data.title, 'required')}</div>
                    
                        </form>
                    </div>
                </div>
                <div className='grid grid-flow-row gap-1'>
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style}>Youtube Video ID*</h1>
                    </div>
                    <div className="flex-shrink-0  w-full">
                        <form className="relative">
                            <Input
                                required
                                aria-required
                                placeholder=""
                                type="number"
                                value={data.videoId}
                                onChange={(e) => handleChange('videoId',e.target.value)}
                                className="text-neutral-800 px-6 dark:text-neutral-200 rounded-md "
                            />
                            <div className="w-full mt-1 text-red-500 text-sm">{validator.message('Video Id', data.videoId, 'required')}</div>
                    
                        </form>
                    </div>

                </div>

            </div>
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5 mt-2">
                <div className='grid grid-flow-row gap-1'>
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style}>Published At*</h1>
                        
                    </div>
                    
                    <DatePicker className="w-full border-[1px] dark:bg-neutral-900 border-neutral-200 rounded-md"  selected={data.publishedAt} onChange={(date: any) => handleChange('publishedAt',date)} />
                    <div className="w-full mt-1 text-red-500 text-sm">{validator.message('published At', data.publishedAt, 'required')}</div>
                    
                </div>
                <div className='grid grid-flow-row gap-1'>
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style}>Hub Path:</h1>
                    </div>
                    <div className="flex-shrink-0  w-full">
                        <form className="relative">
                            <Input
                                required
                                aria-required
                                placeholder=""
                                type="text"
                                value={data.hubPath}
                                onChange={(e) => handleChange('hubPath',e.target.value)}
                                className="text-neutral-800 px-6 dark:text-neutral-200 rounded-md "
                            />
                           
                        </form>
                    </div>

                </div>

            </div>
            <div className="py-3 mt-3 flex flex-row items-center gap-4 max-sm:flex-col">
                <ButtonPrimary sizeClass='py-2.5 px-5' onClick={submitHandler}>Create</ButtonPrimary>
                <h2 className={style2}>or</h2>
                <ButtonPrimary onClick={resert} className=' bg-white hover:bg-slate-300 !border-[1px] !border-neutral-200' sizeClass='py-2.5 px-5'><span className='text-red-600'>Reset</span></ButtonPrimary>
            </div>
        </div>
    )
}

export default YoutubePage