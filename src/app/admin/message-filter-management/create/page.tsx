'use client'
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import ButtonSecondary from '@/components/Button/ButtonSecondary'
import useValidator from '@/hooks/useValidator'
import { Input } from 'antd'
import Link from 'next/link'
import React, { useState } from 'react'

function MessageFilter() {
    const style = 'mt-2 font-semibold text-base max-md:text-md text-dark line-clamp-5'
    const style2 = 'mt-1 font-semibold text-sm text-gray-600 dark:text-gray-200'
    const [data,setData]=useState('')
    const [errors, setErrors] = useState([]);
    
    const [validator, showValidationMessage]: any = useValidator({}, {
        value: {
            message: 'Title must be filled',
            rule: (val: any, params: any, validator: any) => {
                return  data=== val;
            },
            required: true
        },
    })
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
    return (
        <div className="p-6 bg-white dark:bg-neutral-900 my-3">
            <div className='flex justify-between mt-2 mb-6'>
                <h3 className='text-2xl font-bold my-auto'>Create Message Filter</h3>
                <Link href={'/admin/message-filter-management'}><ButtonSecondary sizeClass='py-2.5 px-5'>Back</ButtonSecondary></Link>
            </div>
            <div className='grid grid-flow-row gap-3'>
                <div className='pb-1 grid grid-flow-row gap-1'>
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style}>Value*</h1>
                    </div>
                    <div className="flex-shrink-0  w-full">
                        <form className="relative">
                            <Input
                                required
                                aria-required
                                placeholder="Enter Value"
                                type="text"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                                className="text-neutral-800 border-neutral-300 px-4 dark:text-neutral-200 rounded-md "
                            />
                            <div className="w-full mt-1 text-red-500 text-sm">{validator.message('value', data, 'required')}</div>
                    
                        </form>
                    </div>
                </div>
            </div>
            <div className="py-3 mt-3 flex flex-row items-center gap-4 max-sm:flex-col">
                <ButtonPrimary onClick={submitHandler} sizeClass='py-2.5 px-5'>Create</ButtonPrimary>
                <h2 className={style2}>or</h2>
                <ButtonPrimary onClick={()=>setData('')} className=' bg-white hover:bg-slate-300 !border-[1px] !border-neutral-200' sizeClass='py-2.5 px-5'><span className='text-red-600'>Reset</span></ButtonPrimary>
            </div>
        </div>
    )
}

export default MessageFilter;