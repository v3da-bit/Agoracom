'use client'

import ButtonPrimary from '@/components/Button/ButtonPrimary'
import ButtonSecondary from '@/components/Button/ButtonSecondary'
import Input from '@/components/Input/Input'
import Select from '@/components/Select/Select'
import moment from 'moment'
import Link from 'next/link'
import React, { useState } from 'react'

function CoverPhotoPage() {
    const style = 'mt-2 font-semibold text-base max-md:text-md text-dark line-clamp-5'
    const style2 = 'mt-1 font-semibold text-sm text-gray-600 dark:text-gray-200'
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
                <h3 className='text-2xl font-bold my-auto'>Create Cover Photo</h3>
                <Link href={'/admin/cover-photos'}><ButtonSecondary sizeClass='py-2.5 px-5'>Back</ButtonSecondary></Link>
            </div>
            <div className='grid grid-flow-row gap-1'>
                <div className=" w-full flex items-center justify-start">
                    <h1 className={style}>Name</h1>
                </div>
                <div className='w-full'>
                    <Select className='lg:w-full' rounded='rounded-md' menuDropdown={menuDropdown} selectedValue={discussion} setMenu={handleFilterChange} />
                </div>
            </div>
            <div className=' grid grid-flow-row gap-1 mt-2'>
                <div className=" w-full flex items-center justify-start">
                    <h1 className={style}>Current Logo</h1>
                </div>
                <div className="flex-shrink-0  lg:mb-0 grow lg:grow-0 w-full">
                    <Input
                        required
                        aria-required
                        type="file"
                        accept='image/*'
                        value={''}
                        // onChange={(e)=>setSmallLogo(e.target.value)}
                        className="text-neutral-800 px-4 text-lg border dark:text-neutral-200 rounded-md "
                    />
                    <h1 className={style2}>Accepted file formats: gif, png, jpg, jpeg</h1>
                </div>
            </div>
            <div className="py-3 mt-3 flex flex-row items-center gap-4 max-sm:flex-col">
                <ButtonPrimary sizeClass='py-2.5 px-5'>Create</ButtonPrimary>
                <h2 className={style2}>or</h2>
                <ButtonPrimary className=' bg-white hover:bg-slate-300 !border-[1px] !border-neutral-200' sizeClass='py-2.5 px-5'><span className='text-red-600'>Reset</span></ButtonPrimary>
            </div>
        </div>
    )
}

export default CoverPhotoPage