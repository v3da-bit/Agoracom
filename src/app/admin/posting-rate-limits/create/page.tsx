'use client'
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import ButtonSecondary from '@/components/Button/ButtonSecondary'
import Input from '@/components/Input/Input'
import Select from '@/components/Select/Select'
import useValidator from '@/hooks/useValidator'
import moment from 'moment'
import Link from 'next/link'
import React, { useState } from 'react'

function PostingLimit() {
    const style = 'mt-2 font-semibold text-base max-md:text-md text-dark line-clamp-5'
    const style2 = 'mt-1 font-semibold text-sm text-gray-600 dark:text-gray-200'
    const initialData={
        rank:'posts',
        postingLimit:'',
        periods:'',
        start:'',
        stop:'',
        enabled:false

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
        rank: {
            message: 'Title must be filled',
            rule: (val: any, params: any, validator: any) => {
                return  data.rank=== val;
            },
            required: true
        },
        PostingLimit:{
            rule: (val: any, params: any, validator: any) => {
                return  data.postingLimit=== val;
            },
            required: true
        },
        start:{
            rule: (val: any, params: any, validator: any) => {
                return  data.start=== val;
            },
            required: true
        },
        stop:{
            rule: (val: any, params: any, validator: any) => {
                return  data.stop=== val;
            },
            required: true
        },
        
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
    const menuDropdown: any = {
        'posts': "Newest",
        'top_rated_posts': "Top Rated",
        'oldest_posts': "Oldest"
    };
    const [discussion, setDiscussion] = useState('posts');
    const handleFilterChange = (val: any) => {
        setDiscussion(val);

    }
    return (
        <div className="p-6 bg-white dark:bg-neutral-900 my-3">
            <div className='flex justify-between mt-2 mb-6'>
                <h3 className='text-2xl font-bold my-auto'>Create Posting Rate Limits</h3>
                <Link href={'/admin/posting-rate-limits'}><ButtonSecondary sizeClass='py-2.5 px-5'>Back</ButtonSecondary></Link>
            </div>
            <div className=' grid grid-flow-row gap-2'>
                <div className=" w-full flex items-center justify-start">
                    <h1 className={style}>Rank (equal or less than)*</h1>
                </div>
                <div className="flex justify-start w-full">
                    <Select className='lg:w-full' rounded='rounded-md' menuDropdown={menuDropdown} selectedValue={data.rank} setMenu={(e:any)=>handleChange('rank',e)} />
                </div>

            </div>
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-3 mt-2">
                <div className='py-1 grid grid-flow-row gap-2'>
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style}>Posting limit for period*</h1>
                    </div>
                    <div className="flex-shrink-0  w-full">
                        <form className="relative">
                            <Input
                                required
                                aria-required
                                placeholder=""
                                type="number"
                                value={data.postingLimit}
                                onChange={(e) =>handleChange('postingLimit',e.target.value)}
                                className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md "
                            />
                             <div className="w-full mt-1 text-red-500 text-sm">{validator.message('postingLimit', data.postingLimit, 'required|numeric')}</div>
                    
                        </form>
                    </div>

                </div>
                <div className='grid grid-flow-row gap-2'>
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style}>Period in seconds*</h1>
                    </div>
                    <div className="flex-shrink-0  w-full">
                        <form className="relative">
                            <Input
                                required
                                aria-required
                                placeholder=""
                                type="number"
                                value={data.periods}
                                onChange={(e) => handleChange('periods',e.target.value)}
                                className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md "
                            />
                             <div className="w-full mt-1 text-red-500 text-sm">{validator.message('periods', data.periods, 'required|numeric')}</div>
                    
                        </form>
                    </div>

                </div>

            </div>
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-3 mt-2">
                <div className='py-1 grid grid-flow-row gap-2'>
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style}>Start (seconds after midnight)*</h1>
                    </div>
                    <div className="flex-shrink-0  w-full">
                        <form className="relative">
                            <Input
                                required
                                aria-required
                                placeholder=""
                                type="number"
                                value={data.start}
                                onChange={(e) => handleChange('start',e.target.value)}
                                className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md "
                            />
                             <div className="w-full mt-1 text-red-500 text-sm">{validator.message('start', data.start, 'required|numeric')}</div>
                    
                        </form>
                    </div>

                </div>
                <div className='grid grid-flow-row gap-2'>
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style}>Stop (seconds after midnight)*</h1>
                    </div>
                    <div className="flex-shrink-0  w-full">
                        <form className="relative">
                            <Input
                                required
                                aria-required
                                placeholder=""
                                type="number"
                                value={data.stop}
                                onChange={(e) => handleChange('stop',e.target.value)}
                                className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md "
                            />
                             <div className="w-full mt-1 text-red-500 text-sm">{validator.message('stop', data.stop, 'required|numeric')}</div>
                    
                        </form>
                    </div>

                </div>

            </div>
            <div className="flex flex-row max-sm:flex-col gap-3 mb-2 mt-2">
                <div className="flex items-center justify-center mt-2">
                    <input checked={data.enabled} onChange={()=>data.enabled?handleChange('enabled',false):handleChange('enabled',true)} id="checked-checkbox3" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="checked-checkbox3" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Enabled</label>
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

export default PostingLimit