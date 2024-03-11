
import Image from 'next/image'
import React, { FC } from 'react'
import PostCard3 from '../Card23/PostCard3'
import { Card3SmallProps } from '../Card3Small/Card3Small'
import DefaultAvatar from '../../images/default-image.jpg';
import moment from 'moment';
import Link from 'next/link';

const Card24: FC<Card3SmallProps> = ({ post, avatar }) => {
    const style = 'mt-3 font-semibold !text-sm max-md:text-sm text-gray-600 dark:text-gray-200 text-left line-clamp-6'
    const { title, subTitle, content, href, featuredImage, avatar_url, username, company, company_name, created_at } = post;
    const getUrl = (url: any) => {
        if (url?.toString().includes("s3.amazonaws.com")) {
            return url;
        } else {
            return DefaultAvatar;
        }
    }

    return (
        <div className="border overflow-hidden  border-gray-400 rounded-lg dark:bg-neutral-900 dark:border-gray-800  bg-white h-fit">
            <div className='w-full h-auto flex justify-center lg:block '>
                <Image
                    className=' w-full h-56 object-cover'
                    src={getUrl(post?.cover_photo_url)}
                    // src={getUrl(avatar_url)}
                    alt="GFG logo served with static path of public directory"
                    height="300"
                    width="200"
                />
            </div>
            <div className="w-full h-full py-5 px-6 flex flex-col justify-between">
                <div>
                    <div className="w-full">
                        <Link href={`/company/${post?.company_id}/discussion/${post?.id}`}>
                            <h1 className='text-md max-md:text-md mt-3'>
                                <b className='text-3-line'>{post.title}</b>
                            </h1>
                        </Link>
                    </div>


                    <h1 className={style + ' text-3-line'} dangerouslySetInnerHTML={{ __html: post.content }}></h1>
                </div>
                <div>
                    <div className="w-full flex  mt-8">
                        <Link href={`/members/${post?.user_id}`} className="block !text-sm text-blue-500 hover:text-black dark:text-neutral-300 dark:hover:text-white font-semibold">
                            {username || post.author?.displayName}
                        </Link>
                        <span className="text-neutral-500 !text-sm dark:text-neutral-400 mx-[6px] font-semibold">
                            ·
                        </span>
                        <span className="text-neutral-500 !text-sm dark:text-neutral-400 font-normal">
                            {created_at ? moment(created_at).fromNow() : post.date}
                        </span>
                    </div>
                    <Link href={`/company/${post?.company_id}`} className="text-sm font-semibold max-md:text-sm text-dark">{company_name}</Link>
                </div>
            </div>


        </div>
    )
}

export default Card24