import React from 'react'
import DefaultAvatar from '../../images/Icons/avatar.png';
import Link from 'next/link';
import ReactStars from "react-rating-stars-component";
import Image from 'next/image';


const Card28 = ({ post, className }: any) => {
    const { avatar, authority_group_name, ranking_points, rated_count, rating, score, username } = post
    const getUrl = (url: any) => {
        if (url.toString().includes("s3.amazonaws.com")) {
            return url;
        } else {
            return DefaultAvatar;
        }
    }
    return (
        <div className={`nc-Card28 grid grid-cols-2 gap-3 border border-white dark:border-neutral-700 shadow-md px-3 py-4 ${className}`}>
            <div className={` max-w-[240px] flex items-center justify-center`}>
                <Image
                    src={getUrl(avatar)}
                    alt="GFG logo served with static path of public directory"

                    className=" max-h-36 max-w-30 text-base"
                    height="100"
                    width="100"

                />

            </div>
            <div className=" flex flex-col gap-3 ">
                <div className='w-full '>
                    <Link href={`/members/${post.id}`} className="nc-card-title max-sm:text-lg text-sm line-clamp-2 font-medium sm:font-semibold text-blue-700">
                        {username}

                    </Link>
                </div>
                <h2 className="nc-card-subtitle block text-sm font-medium text-white bg-blue-700 rounded-lg text-center w-fit px-2">
                    {authority_group_name}
                </h2>
                <h2 className="nc-card-subtitle block text-sm sm:text-base font-medium text-neutral-900 dark:text-neutral-100">
                    Votes: {rated_count} <br /> Score: {score == null ? 0 : score}
                </h2>
                <h2 className="nc-card-subtitle block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                    <ReactStars
                        count={5}
                        value={rating}
                        size={24}
                        edit={false}
                        activeColor="#ffd700"
                    />
                </h2>
            </div>

        </div>
    )
}

export default Card28