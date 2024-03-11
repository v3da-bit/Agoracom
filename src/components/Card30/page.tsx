import Link from 'next/link'
import React, { FC } from 'react'
import Avatar from '../Avatar/Avatar'
import { Card3SmallProps } from '../Card3Small/Card3Small'
import DefaultAvatar from '../../images/Icons/avatar.png';
import PostCard5 from './PostCard5';
import moment from 'moment';


export interface Card30SmallProps {
  className?: string;
  post: any;
  avatar?: any;
  href?: any;
  type?: any;
  bigImage?: any;
  userClick?: any;
  setUserClick?: any;
  setUid?: any;
  screen?: any
}

const Card30: FC<Card30SmallProps> = ({ className = "h-full", post, avatar, setUserClick, setUid, screen }) => {
  const { id, subject, subTitle, company_name, content, href, featuredImage, avatar_url, name, small_logo_url, stock_exchange, authority_group_name, summary, tidy_ticker, hub_path, username } = post;
  const getUrl = (url: any) => {
    if (url.toString().includes("s3.amazonaws.com")) {
      return url;
    } else {
      return DefaultAvatar;
    }
  }
  console.log(post);
  return (
    <div
      className={`nc-Card3Small relative flex flex-row items-center ${className}`}
    >
      <Link
        href={`/members/${post.user_id}`}
        // href={href ? href : '#'}
        className={`block w-16 flex-shrink-0 relative rounded-lg overflow-hidden z-0 ms-4 group mr-8`}
      >
        <div className={`w-full h-0 aspect-w-1 aspect-h-1`}>
          {avatar ? <Avatar
            sizeClass="h-10 w-10 text-base"
            containerClassName="flex-shrink-0 me-3"
            radius="rounded-full"
            imgUrl={avatar ? getUrl(avatar) : getUrl(small_logo_url)}
            userName={username}
          /> : <></>}
          {/* <Image
            alt="featured"
            sizes="100px"
            className="object-cover w-full h-full group-hover:scale-110 transform transition-transform duration-300"
            src={featuredImage || DefaultImage}
            fill
            title={title}
          /> */}
        </div>
      </Link>
      <div className="relative space-y-2">
        <h2 onClick={() => {
          setUid(id)
          setUserClick(true)
        }} className="nc-card-title block text-base sm:text-lg font-medium sm:font-semibold text-neutral-900 dark:text-neutral-100" >
          <Link href={`#`} className="line-clamp-2" >
            <span className='text-blue-700'>{subject || authority_group_name}</span>
          </Link>
        </h2>
        <h2 className="nc-card-subtitle block text-sm font-medium text-neutral-900 dark:text-neutral-100">
          {
            screen === 'inbox' ? <div className="line-clamp-2">{subTitle}</div> : (
              <Link href={`/`} className="line-clamp-2" >
                {subTitle}
              </Link>
            )
          }
        </h2>
        <h2 className="nc-card-subtitle block text-sm sm:text-base font-medium text-neutral-900 dark:text-neutral-100">
          <Link href={`/company/${post.company_id}`} className="line-clamp-2">
            {company_name}
          </Link>
        </h2>
        {
          screen === 'inbox' ?
            <div className="line-clamp-2">
              <h2 className="nc-card-subtitle block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: content ? content : summary }}>
                {/* {content ? content : summary} */}
              </h2>
            </div> : (
              <Link href={href || '/'} className="line-clamp-2" >
                <h2 className="nc-card-subtitle block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: content ? content : summary }}>
                  {/* {content ? content : summary} */}
                </h2>
              </Link>
            )
        }
        {
          post.username ?
            <div className='flex'>
              <span className="block text-neutral-700 text-sm hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
                <Link href={`/members/${post.user_id}`} className='ml-1'>
                  {post?.username}
                </Link>
              </span>
              <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
                ·
              </span>
              <span className="text-neutral-500 !text-sm dark:text-neutral-400 font-normal">
                {post?.created_at ? moment(post?.created_at).format('llll') : ''}
              </span>
            </div> : <></>
        }
        {/* <PostCard5 meta={{ ...post }} avatar={avatar_url} hiddenAvatar={true} /> */}
      </div>


    </div>
  )
}

export default Card30