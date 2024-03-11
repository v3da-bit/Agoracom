
import Image from 'next/image'
import React, { useState } from 'react'

function Card21({id,img,title,subTitle,content}:any) {

    const [showImage, setShowImage] = useState(true);
    const style = 'mt-3 font-semibold text-md max-md:text-sm text-gray-600 dark:text-gray-200'

  return (
    <div className="w-auto border border-gray-100 rounded-lg dark:bg-neutral-900 dark:border-gray-800  bg-white h-auto px-7 py-7">
                <div className="grid grid-flow-col gap-3">
                    <div className='w-full flex justify-center lg:block'>
                        <Image
                            src={img}
                            alt=""
                            height="100"
                            width="100"
                            onError={(e) => setShowImage(false)}
                        /> </div>
                    <div className="w-full">
                        <h1 className='text-lg max-md:text-md  text-dark mt-3'>
                            <b>{title}</b>
                        </h1>
                    </div>
                </div>
                <div className="grid grid-flow-row gap-4 text-start mt-3">
                    <h1 className={style}>{subTitle}</h1>
                    <hr />
                    <h1 className={style}>{content}</h1>
                </div>

            </div>
  )
}

export default Card21