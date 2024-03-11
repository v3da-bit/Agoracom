'use client'
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import ButtonSecondary from '@/components/Button/ButtonSecondary'
import Input from '@/components/Input/Input'
import useValidator from '@/hooks/useValidator'
import { Description } from '@headlessui/react/dist/components/description/description'
import Link from 'next/link'
import React, { useState } from 'react'

function CreateConglomerates() {
    const style = 'mt-2 font-semibold text-base max-md:text-md text-dark line-clamp-5'
    const style2 = 'mt-1 font-semibold text-sm text-gray-600 dark:text-gray-200'
    const initialData={
        name:'',
        slug:'',
        logo:'',
        banner:'',
        description:'',
        videoEmbeded:'',
        companies:"",
        pageActive:false

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
        name: {
            message: 'Title must be filled',
            rule: (val: any, params: any, validator: any) => {
                return  data.name=== val;
            },
            required: true
        },
        slug:{
            rule: (val: any, params: any, validator: any) => {
                return  data.slug=== val;
            },
            required: true
        },
        logo:{
            rule: (val: any, params: any, validator: any) => {
                return  data.logo=== val;
            },
            required: true
        },
        banner:{
            rule: (val: any, params: any, validator: any) => {
                return  data.banner=== val;
            },
            required: true
        },
        description:{
            rule: (val: any, params: any, validator: any) => {
                return  data.description=== val;
            },
            required: true
        },
        videoEmbeded:{
            rule: (val: any, params: any, validator: any) => {
                return  data.videoEmbeded=== val;
            },
            required: true
        },
        companies:{
            rule: (val: any, params: any, validator: any) => {
                return  data.companies=== val;
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
                <h3 className='text-2xl font-bold my-auto'>Create Conglomerate</h3>
                <Link href={'/admin/conglomerates'}><ButtonSecondary sizeClass='py-2.5 px-5'>Back</ButtonSecondary></Link>
            </div>
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5">
                <div className='pb-1 grid grid-flow-row gap-1'>
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style}>Name*</h1>
                    </div>
                    <div className="flex-shrink-0  w-full">
                        <form className="relative">
                            <Input
                                required
                                aria-required
                                placeholder="Enter Name"
                                type="text"
                                value={data.name}
                                onChange={(e) => handleChange('name',e.target.value)}
                                className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md "
                            />
                            <div className="w-full mt-1 text-red-500 text-sm">{validator.message('name', data.name, 'required|alpha')}</div>
                    
                        </form>
                    </div>

                </div>
                <div className='pb-1 grid grid-flow-row gap-1'>
                    <div className="w-full flex items-center justify-start">
                        <h1 className={style}>Slug*</h1>
                    </div>
                    <div className="flex-shrink-0  w-full">
                        <form className="relative">
                            <Input
                                required
                                aria-required
                                placeholder="Enter Slug"
                                type="text"
                                value={data.slug}
                                onChange={(e) => handleChange('slug',e.target.value)}
                                className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md "
                            />
                            <div className="w-full mt-1 text-red-500 text-sm">{validator.message('slug', data.slug, 'required|alpha')}</div>
                    
                        </form>
                    </div>

                </div>
            </div>
            <div className="grid grid-cols-1 gap-3 mt-2">
                <div className='pb-1 grid grid-flow-row gap-1'>
                    <div className="w-full flex items-center justify-start">
                        <h1 className={style}>Logo</h1>
                    </div>
                    <div className="flex-shrink-0  lg:mb-0 grow lg:grow-0 w-full ">
                        <Input
                            required
                            aria-required
                            type="file"
                            accept='image/*'
                            value={data.logo}
                            onChange={(e) => handleChange('logo',e.target.value)}
                            className="text-neutral-800 px-4 text-lg  border dark:text-neutral-200 rounded-md"
                        />
                       
                    </div>
                </div>
            </div>
            <div className='grid grid-flow-row gap-1 mt-2'>
                <div className=" w-full flex items-center justify-start">
                    <h1 className={style}>Banner Headline</h1>
                </div>
                <div className="flex-shrink-0 grow lg:grow-0 w-full">
                    <form className="relative">
                        <textarea
                            required
                            aria-required
                            value={data.banner}
                            placeholder='Enter Banner Headline'
                            onChange={(e) => handleChange('banner',e.target.value)}
                            className="text-neutral-800 border-[1px] border-neutral-200 rounded-md h-44 w-full px-4 dark:text-neutral-200 dark:bg-neutral-800"
                        />
                        
                    </form>
                </div>
            </div>
            <div className='grid grid-flow-row gap-1 mt-2'>
                <div className=" w-full flex items-center justify-start">
                    <h1 className={style}>Description</h1>
                </div>
                <div className="flex-shrink-0 grow lg:grow-0 w-full">
                    <form className="relative">
                        <textarea
                            required
                            aria-required
                            placeholder='Enter Description'
                            value={data.description}
                            onChange={(e) => handleChange('description',e.target.value)}
                            className="text-neutral-800 border-[1px] border-neutral-200 rounded-md h-44 w-full px-4 dark:text-neutral-200 dark:bg-neutral-800"
                        />
                        
                    </form>
                </div>
            </div>
            <div className='grid grid-flow-row gap-1 mt-2'>
                <div className=" w-full flex items-center justify-start">
                    <h1 className={style}>Video Embed</h1>
                </div>
                <div className="flex-shrink-0 grow lg:grow-0 w-full">
                    <form className="relative">
                        <textarea
                            required
                            aria-required
                            placeholder='Enter Video Embed'
                            value={data.videoEmbeded}
                            onChange={(e) => handleChange('videoEmbeded',e.target.value)}
                            className="text-neutral-800 border-[1px] border-neutral-200 rounded-md h-44 w-full px-4 dark:text-neutral-200 dark:bg-neutral-800"
                        />
                         
                    </form>
                </div>
            </div>
            <div className="grid grid-flow-row gap-1 mt-2">
                <h1 className={style}>Managed Companies</h1>
                <div className="flex-shrink-0  w-full">
                    <form className="relative">
                        <Input
                            required
                            aria-required
                            placeholder="Enter Managed Companies"
                            type="text"
                            value={data.companies}
                            onChange={(e) => handleChange('companies',e.target.value)}
                            className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md "
                        />
                         
                    </form>
                    <h1 className={style2}>Enter stock symbols for companies in this conglomerate</h1>
                </div>
            </div>
            <div className="flex flex-row max-sm:flex-col gap-3 mt-2">
                <div className="flex items-center justify-center mt-4">
                    <input checked={data.pageActive} onChange={()=>data.pageActive?handleChange('pageActive',false):handleChange('pageActive',true)} id="checked-checkbox3" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="checked-checkbox3" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Public-facing page active</label>
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

export default CreateConglomerates;