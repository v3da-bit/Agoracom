import moment from 'moment'
import Link from 'next/link'
import React from 'react'

const Card25 = ({ data }: any) => {
    const style = 'mt-3 font-semibold text-md max-md:text-sm text-gray-600 dark:text-gray-200'
    const { title, created_at, date, time } = data
    return (

        <div className="grid grid-flow-row gap-5 px-6 py-5 rounded-md bg-neutral-200 dark:bg-gray-800">
            <Link href={data.href}>
                <h1 className='text-lg max-md:text-md text-dark'>
                    <b>{title}</b>
                </h1>
            </Link>
            <div>

                <span className="text-neutral-500 text-sm dark:text-neutral-400 font-normal">
                    {created_at ? moment(created_at).format('ddd ll') : date}
                </span>
                <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
                    ·
                </span>
                <span className="text-neutral-500 text-sm dark:text-neutral-400 font-normal">
                    {created_at ? moment(created_at).format('hh:mm A') : date}
                </span>

            </div>
        </div>

    )
}

export default Card25