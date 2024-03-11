'use client';
import React from 'react'
import img from '@/images/hero-right-2.png'
import Image from 'next/image'

function Card20({id, image, title, content, content2}:any) {
    const style = 'mt-3 text-base max-md:text-sm text-gray-600 dark:text-gray-200';

    const getUrl = (url: any) => {
        if(url.toString().includes("amazonaws.com" || "")) {
          return url;
        } else {
          return img;
        }
      }

    return (
        <div className=' w-full h-fit flex flex-col border-gray-300 border rounded-lg bg-white dark:bg-neutral-900 dark:border-gray-800'>
            <div className="w-full h-fit">
                <Image
                    src={getUrl(image || img)}
                    alt="GFG logo served with static path of public directory"
                    className='w-full h-[200px] object-cover'
                    width="100"
                    height="100"
                />
            </div>
            <div className="px-7 py-8 flex flex-col gap-3">
                <h1 className="mt-3 text-xl font-semibold max-md:text-md text-dark">{title}</h1>
                <h1 className={style}>{content}</h1>
                <h1 className={style}>{content2}</h1>
            </div>
        </div>
    )
}

export default Card20