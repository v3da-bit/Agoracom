'use client'
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import ButtonSecondary from '@/components/Button/ButtonSecondary'
import Input from '@/components/Input/Input'
import Link from 'next/link'
import React, { useState } from 'react'

function CategoryPage() {
    const style = 'mt-2 font-semibold text-base max-md:text-md text-dark line-clamp-5'
    const style2 = 'mt-1 font-semibold text-sm text-gray-600 dark:text-gray-200'
    const initialData={
        name:'',
        companies:'',
        
    }
    const [data,setData]=useState(initialData)
    const [errors, setErrors] = useState([]);
    const handleChange = (key: string, value: string) => {
        setData({
            ...data,
            [key]: value
        })
    }
    
    const submitHandler = async (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        
    }
    const resert=async(e:any)=>{
        setData(initialData)
    }
    return (
        <div className="p-6 bg-white dark:bg-neutral-900 my-3">
            <div className='flex justify-between mt-2 mb-6'>
                <h3 className='text-2xl font-bold my-auto'>Create Category</h3>
                <Link href={'/admin/categories'}><ButtonSecondary sizeClass='py-2.5 px-5'>Back</ButtonSecondary></Link>
            </div>
            <div className='pb-1 grid grid-flow-row gap-1'>
                <div className=" w-full flex items-center justify-start">
                    <h1 className={style}>Name</h1>
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
                            className="text-neutral-800 px-4 border dark:text-neutral-200 rounded-md "
                        />
                    </form>
                </div>
            </div>
            <div className='grid grid-flow-row gap-1'>
                <div className=" w-full flex items-center justify-start">
                    <h1 className={style}>Companies</h1>
                </div>
                <div className="flex-shrink-0 grow lg:grow-0 w-full">
                    <form className="relative">
                        <textarea
                            required
                            aria-required
                            value={data.companies}
                            placeholder='Enter Companies'
                            onChange={(e) => handleChange('companies',e.target.value)}
                            className="text-neutral-800 border-[1px] border-neutral-200 rounded-md h-44 w-full px-4 dark:text-neutral-200 dark:bg-neutral-800"
                        />
                    </form>
                </div>
            </div>
            <div className="py-3 mt-3 flex flex-row items-center gap-4 max-sm:flex-col">
                <ButtonPrimary onClick={submitHandler} sizeClass='py-2.5 px-5'>Create</ButtonPrimary>
                <h2 className={style2}>or</h2>
                <ButtonPrimary onClick={resert} className=' bg-white hover:bg-slate-300 !border-[1px] !border-neutral-200' sizeClass='py-2.5 px-5'><span className='text-red-600'>Reset</span></ButtonPrimary>
            </div>
        </div>

    )
}

export default CategoryPage