import React from 'react'
import DefaultAvatar from '../../images/default-image.jpg';
import Image from 'next/image';


const Card26 = ({ post }: any) => {
  const style1 = 'font-semibold text-sm text-gray-600 dark:text-gray-200'
  const getUrl = (url: any) => {
    if (url.toString().includes("s3.amazonaws.com")) {
      return url;
    } else {
      return DefaultAvatar;
    }
  }
  return (
    <div className='border shadow-md rounded-md'>
      <div className='w-full h-60 p-5 flex justify-center lg:block '>
        <Image
          className=' w-full h-full object-cover'
          src={getUrl(post.image_url)}
          alt="Image"
          height="100"
          width="100"
        />
      </div>
      <div className="w-full pb-5 px-5">
        <h1 className={style1}>{post.title}</h1>
      </div>
    </div>
  )
}

export default Card26