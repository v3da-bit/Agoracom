import Link from 'next/link'
import React, { FC } from 'react'
import Avatar from '../Avatar/Avatar'
import { Card3SmallProps } from '../Card3Small/Card3Small'
import moment from 'moment';
import DefaultAvatar from "../../images/Icons/avatar.png";
import { HandThumbUpIcon } from '@heroicons/react/24/solid';
export interface Card27SmallProps {
    className?: string;
    post: any;
    avatar?: any;
    href?: any;
    type?: any;
    bigImage?: any;
    screen?:any;
    
  }
const Card27: FC<Card27SmallProps> = ({ className = "h-full", post, avatar,screen='' }) => {
    const {
        title,
        company,
        company_name,
        content,
        cover_photo_url,
        href,
        created_at,
        rating_total,
        company_logo_url
    } = post;
    const getUrl = (url: any) => {
        if (url?.toString().includes("s3.amazonaws.com")) {
            return url;
        } else {
            return DefaultAvatar;
        }
    }
   
    
    return (
        <div
       
            className={`nc-Card3Small  relative flex flex-row justify-between items-center ${className}`}
        >
            <div className='flex w-fit h-fit'>
                <div className='w-fit h-full my-auto mr-6' >
                    <Avatar
                        radius="rounded-full"
                        sizeClass="h-12 w-12 text-sm"
                        imgUrl={getUrl(company_logo_url)}
                    />
                </div>
                <div className="flex flex-row gap-3 pr-8">
                    <Link href={screen=='discussion'?'':href || '/'} className="absolute inset-0" title={title}></Link>
                    <div className="relative">
                        <h2 className="nc-card-title block text-md lg:text-base font-medium sm:font-semibold text-neutral-900 dark:text-neutral-100">
                            <Link href={screen=='discussion'?'':href || '/'} className="line-clamp-2" title={title}>
                                {title}
                            </Link>
                        </h2>

                        <h2 className="nc-card-subtitle block text-sm lg:text-md font-semibold text-gray-700 dark:text-gray-300 mt-3">
                            <Link href={screen=='discussion'?'':href || '/'} className="line-clamp-2"  title={title}>
                                {company?company.name:company_name}
                            </Link>
                        </h2>
                        <h2 className="nc-card-subtitle block text-sm lg:text-md font-semibold text-gray-700 dark:text-gray-300 mt-3">
                            <Link href={screen=='discussion'?'':href || '/'} className="line-clamp-2" title={title} dangerouslySetInnerHTML={{__html:content}}>
                                
                            </Link>
                        </h2>
                        <div className='text-sm text-neutral-500 font-normal'>{moment(created_at).fromNow()}</div>
                    </div>
                </div>
            </div>
            <div className="w-auto flex items-end">

                <button type="button" className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <HandThumbUpIcon className='w-7 h-7' />
                    <span className="sr-only">Notifications</span>
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                        {rating_total}
                    </div>
                </button>

            </div>
        </div>
    )
}

export default Card27