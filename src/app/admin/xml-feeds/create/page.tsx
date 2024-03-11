'use client'
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import ButtonSecondary from '@/components/Button/ButtonSecondary'
import Input from '@/components/Input/Input'
import Select from '@/components/Select/Select'
import useValidator from '@/hooks/useValidator'
import Link from 'next/link'
import path from 'path'
import React, { useState } from 'react'

function XMLPage() {
    const style = 'mt-2 font-semibold text-base max-md:text-md text-dark line-clamp-5'
    const style2 = 'mt-1 font-semibold text-sm text-gray-600 dark:text-gray-200'

    const menuDropdown: any = {
        'posts': "Newest",
        'top_rated_posts': "Top Rated",
        'oldest_posts': "Oldest"
    };
    const [discussion, setDiscussion] = useState('posts');
    
    const initialData={
        name:'',
        path:'',
        dataSrc:'posts',
        typeRestriction:'posts',
        industry:'posts',
        format:'posts',
        itemLimit:'',
        generated:'posts',
        homePage:'posts'

    }
    const [validator, showValidationMessage]: any = useValidator({}, {
        name: {
            rule: (val: any, params: any, validator: any) => {
                return  data.name=== val;
            },
            required: true
        },
        path:{
            rule: (val: any, params: any, validator: any) => {
                return  data.path=== val;
            },
            required: true
        },
        dataSrc:{
            rule: (val: any, params: any, validator: any) => {
                return  data.dataSrc=== val;
            },
            required: true
        },
        typeRestriction:{
            rule: (val: any, params: any, validator: any) => {
                return  data.typeRestriction=== val;
            },
            required: true
        },
        industry:{
            rule: (val: any, params: any, validator: any) => {
                return  data.industry=== val;
            },
            required: true
        },
        format:{
            rule: (val: any, params: any, validator: any) => {
                return  data.format=== val;
            },
            required: true
        },
        itemLimit:{
            rule: (val: any, params: any, validator: any) => {
                return  data.itemLimit=== val;
            },
            required: true
        },
        generated:{
            rule: (val: any, params: any, validator: any) => {
                return  data.generated=== val;
            },
            required: true
        },
        homePage:{
            rule: (val: any, params: any, validator: any) => {
                return  data.homePage=== val;
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
    const [data,setData]=useState(initialData)
    const [errors, setErrors] = useState([]);
    const handleChange = (key: string, value: string) => {
        setData({
            ...data,
            [key]: value
        })
    }
    return (
        <div className="p-6 bg-white dark:bg-neutral-900 my-3">
            <div className='flex justify-between mt-2 mb-6'>
                <h3 className='text-2xl font-bold my-auto'>Create XML Feed</h3>
                <Link href={'/admin/xml-feeds'}><ButtonSecondary sizeClass='py-2.5 px-5'>Back</ButtonSecondary></Link>
            </div>
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5">
                <div className='py-1 grid grid-flow-row gap-1'>
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
                                onChange={(e) => handleChange('name',e.target.value)}
                                className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md "
                            />
                            
                            <h1 className={style2}>Unqiue name for feed (required)</h1>
                        </form>
                    </div>

                </div>
                <div className='py-1 grid grid-flow-row gap-1'>
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style}>Path</h1>
                    </div>
                    <div className="flex-shrink-0  w-full">
                        <form className="relative">
                            <Input
                                required
                                aria-required
                                placeholder=""
                                type="text"
                                value={data.path}
                                onChange={(e) => handleChange('path',e.target.value)}
                                className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md "
                            />
                                                    
                        </form>
                        <h1 className={style2}>Unique path name used to retrieve feed such as "company_news" (required)</h1>
                    </div>

                </div>

            </div>
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5 mt-2">
                <div className=' grid grid-flow-row gap-1'>
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style}>Data Source</h1>
                    </div>
                    <div className="flex justify-start w-full">
                        <Select className='lg:w-full' rounded='rounded-md'  menuDropdown={menuDropdown} selectedValue={data.dataSrc} setMenu={(e:any)=>handleChange('dataSrc',e)} />
                    </div>

                </div>
                <div className=' grid grid-flow-row gap-1'>
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style}>Type Restriction</h1>
                    </div>
                    <div className="flex justify-start w-full">
                        <Select className='lg:w-full' rounded='rounded-md' menuDropdown={menuDropdown} selectedValue={data.typeRestriction} setMenu={(e:any)=>handleChange('typeRestriction',e)} />
                    </div>

                </div>

            </div>
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5 mt-2">
                <div className=' grid grid-flow-row gap-1'>
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style}>Industry</h1>
                    </div>
                    <div className="flex justify-start w-full">
                        <Select className='lg:w-full' rounded='rounded-md' menuDropdown={menuDropdown} selectedValue={data.industry} setMenu={(e:any)=>handleChange('industry',e)} />
                    </div>

                </div>
                <div className=' grid grid-flow-row gap-1'>
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style}>Format</h1>
                    </div>
                    <div className="flex justify-start w-full">
                        <Select className='lg:w-full' rounded='rounded-md' menuDropdown={menuDropdown} selectedValue={data.format} setMenu={(e:any)=>handleChange('format',e)} />
                    </div>

                </div>

            </div>
            <div className="grid grid-flow-row gap-1 mt-3">
                <h1 className={style}>Item Limit</h1>
                <div className="flex-shrink-0  w-full">
                    <form className="relative">
                        <Input
                            required
                            aria-required
                            placeholder=""
                            type="number"
                            value={data.itemLimit}
                            onChange={(e) => handleChange('itemLimit',e.target.value)}
                            className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                        />
                        
                        
                    </form>
                </div>
            </div>
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5 mt-2">
                <div className=' grid grid-flow-row gap-1'>
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style}>Generated</h1>
                    </div>
                    <div className="flex justify-start w-full">
                        <Select className='lg:w-full' rounded='rounded-md' menuDropdown={menuDropdown} selectedValue={data.generated} setMenu={(e:any)=>handleChange('generated',e)} />
                    </div>

                </div>
                <div className=' grid grid-flow-row gap-1'>
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style}>Home Page Flag</h1>
                    </div>
                    <div className="flex justify-start w-full">
                        <Select className='lg:w-full' rounded='rounded-md' menuDropdown={menuDropdown} selectedValue={data.homePage} setMenu={(e:any)=>handleChange('homePage',e)} />
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

export default XMLPage