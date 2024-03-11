'use client'
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import ButtonSecondary from '@/components/Button/ButtonSecondary'
import Heading2 from '@/components/Heading/Heading2'
import Input from '@/components/Input/Input'
import useValidator from '@/hooks/useValidator'
import Link from 'next/link'
import React, { useState } from 'react'


function PageScreen() {
    const style = 'mt-2 font-semibold text-base max-md:text-md text-dark line-clamp-5'
    const style2 = 'mt-1 font-semibold text-sm text-gray-600 dark:text-gray-200'
    const initialData={
        title:'',
        pageUrl:'',
        content:'',
        seoTitle:'',
        seoKeyword:'',
        seoDescription:'',
        internalPage:false

    }
    const [data,setData]=useState(initialData)
    const [errors, setErrors] = useState([]);
    const handleChange = (key: string, value: string) => {
        setData({
            ...data,
            [key]: value
        })
    }
    const [validator, showValidationMessage]: any = useValidator({}, {
        title: {
            message: 'Title must be filled',
            rule: (val: any, params: any, validator: any) => {
                return  data.title=== val;
            },
            required: true
        },
        pageUrl:{
            rule: (val: any, params: any, validator: any) => {
                return  data.pageUrl=== val;
            },
            required: true
        },
        content:{
            rule: (val: any, params: any, validator: any) => {
                return  data.content=== val;
            },
            required: true
        },
        seoTitle:{
            rule: (val: any, params: any, validator: any) => {
                return  data.seoTitle=== val;
            },
            required: true
        },
        seoKeyword:{
            rule: (val: any, params: any, validator: any) => {
                return  data.seoKeyword=== val;
            },
            required: true
        },
        seoDescription:{
            rule: (val: any, params: any, validator: any) => {
                return  data.seoDescription=== val;
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
    return (
        <div className="p-6 bg-white dark:bg-neutral-900 my-3">
            <div className='flex justify-between mt-2 mb-6'>
                <h3 className='text-2xl font-bold my-auto'>Create Page</h3>
                <Link href={'/admin/pages'}><ButtonSecondary sizeClass='py-2.5 px-5'>Back</ButtonSecondary></Link>
            </div>
            <div className="grid grid-flow-row gap-1  mt-3">
                <h1 className={style}>Title</h1>
                <div className="flex-shrink-0  w-full">
                    <form className="relative">
                        <Input
                            required
                            aria-required
                            placeholder="Enter Title"
                            type="text"
                            value={data.title}
                            onChange={(e) => handleChange('title',e.target.value)}
                            className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                        />
                        
                        </form>
                </div>
            </div>
            <div className="grid grid-flow-row gap-1 mt-2">
                <h1 className={style}>Page URL</h1>
                <div className="flex-shrink-0  w-full">
                    <form className="relative">
                        <Input
                            required
                            aria-required
                            placeholder="Enter Page URL"
                            type="text"
                            value={data.pageUrl}
                            onChange={(e) =>  handleChange('pageUrl',e.target.value)}
                            className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                        />
                         
                    </form>
                </div>
            </div>
            <div className="grid grid-flow-row gap-1 mt-2">
                <h1 className={style}>Content</h1>
                <div className="flex-shrink-0  lg:mb-0 grow lg:grow-0 w-full">
                    <form className="relative">
                        <textarea
                            required
                            aria-required
                            placeholder='Enter Content'
                            value={data.content}
                            onChange={(e) =>  handleChange("content",e.target.value)}
                            className="text-neutral-800 h-44 w-full border-[1px] border-neutral-200 rounded-md px-4 dark:text-neutral-200 dark:bg-neutral-800"
                        />
                        
                    </form>
                </div>
            </div>
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-3 mt-2">
                <div className='py-1 grid grid-flow-row gap-1'>
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style}>SEO Title</h1>
                    </div>
                    <div className="flex-shrink-0  w-full">
                        <form className="relative">
                            <Input
                                required
                                aria-required
                                placeholder="Enter SEO Title"
                                type="text"
                                value={data.seoTitle}
                                onChange={(e) =>  handleChange("seoTitle",e.target.value)}
                                className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                            />
                             
                        </form>
                    </div>

                </div>
                <div className='py-1 px-3 grid grid-flow-row gap-1'>
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style}>SEO Keywords</h1>
                    </div>
                    <div className="flex-shrink-0  w-full">
                        <form className="relative">
                            <Input
                                required
                                aria-required
                                placeholder="Enter SEO Keywords"
                                type="text"
                                value={data.seoKeyword}
                                onChange={(e) => handleChange("seoKeyword",e.target.value)}
                                className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                            />
                            
                        </form>
                    </div>
                </div>
            </div>
            <div className="grid grid-flow-row gap-1 mt-2">
                <h1 className={style}>SEO Description</h1>
                <div className="flex-shrink-0  lg:mb-0 grow lg:grow-0 w-full">
                    <form className="relative">
                        <textarea
                            required
                            aria-required
                            placeholder='SEO Description'
                            value={data.seoDescription}
                            onChange={(e) => handleChange("seoDescription",e.target.value)}
                            className="text-neutral-800 h-44 border-[1px] border-neutral-200 rounded-md w-full px-4 dark:text-neutral-200 dark:bg-neutral-800"
                        />
                        
                    </form>
                </div>
            </div>
            <div className="flex flex-row max-sm:flex-col gap-3 mt-2">
                <h1 className={style}>Delete offending message</h1>
                <div className="flex items-center justify-center mt-2">
                    <input checked={data.internalPage} onClick={()=>data.internalPage?handleChange("internalPage",false):handleChange("internalPage",true)} id="checked-checkbox3" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="checked-checkbox3" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Internal template page</label>
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

export default PageScreen