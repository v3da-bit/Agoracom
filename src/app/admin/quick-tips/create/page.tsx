'use client'
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import ButtonSecondary from '@/components/Button/ButtonSecondary'
import useValidator from '@/hooks/useValidator'
import Link from 'next/link'
import React, { useState } from 'react'

function QuickTips() {
    const style = 'mt-2 font-semibold text-base max-md:text-md text-dark line-clamp-5'
    const style2 = 'mt-1 font-semibold text-sm text-gray-600 dark:text-gray-200'
    const [validator, showValidationMessage]: any = useValidator({}, {
        content: {
            rule: (val: any, params: any, validator: any) => {
                return data === val;
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
    
    const [data, setData] = useState('')
    const [errors, setErrors] = useState([]);
    return (
        <div className="p-6 bg-white dark:bg-neutral-900 my-3">
            <div className='flex justify-between mt-2 mb-6'>
                <h3 className='text-2xl font-bold my-auto'>Create Quick Tip</h3>
                <Link href={'/admin/quick-tips'}><ButtonSecondary sizeClass='py-2.5 px-5'>Back</ButtonSecondary></Link>
            </div>
            <div className='grid grid-flow-row gap-2 border-b-2'>
                <div className=" w-full flex items-center justify-start">
                    <h1 className={style}>Content</h1>
                </div>
                <div className="flex-shrink-0 grow lg:grow-0 w-full mb-6">
                    <form className="relative">
                        <textarea
                            required
                            aria-required
                            placeholder='Enter Content'
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            className="text-neutral-800 h-44 w-full px-4 border-[1px] border-neutral-200 rounded-md dark:text-neutral-200 dark:bg-neutral-800"
                        />
                         
                    </form>
                    <h1 className={style2}>Limit to less than 1000 characters of text/html. <br /> Also here's how you create a link: <i>&lt;a href='http://someurl.com'&gt; Link Description &lt;/a&gt;</i></h1>
                </div>
            </div>
            <div className="py-3 mt-3 flex flex-row items-center gap-4 max-sm:flex-col">
                <ButtonPrimary sizeClass='py-2.5 px-5' onClick={submitHandler}>Create</ButtonPrimary>
                <h2 className={style2}>or</h2>
                <ButtonPrimary onClick={()=>setData('')} className=' bg-white hover:bg-slate-300 !border-[1px] !border-neutral-200' sizeClass='py-2.5 px-5'><span className='text-red-600'>Reset</span></ButtonPrimary>
            </div>
        </div>
    )
}

export default QuickTips