import Link from 'next/link'
import React, { FC, useState } from 'react'
import Avatar from '../Avatar/Avatar'
import { Card3SmallProps } from '../Card3Small/Card3Small'
import DefaultAvatar from '../../images/Icons/avatar.png';
import PostCard3 from './PostCard3';
import Image from 'next/image';
import flag_yellow from '@/images/Icons/flag_yellow.gif'
import flag_red from '@/images/Icons/flag_red.gif'
import flag_green from '@/images/Icons/flag_green.gif'
import accept from '@/images/Icons/accept.gif'
import cross from '@/images/Icons/cross.gif'
import icon_agoracom from '@/images/Icons/icon_agoracom.gif'
import icon_president from '@/images/Icons/icon_president.gif'
import icon_question from '@/images/Icons/icon_question.gif'
import ceo_verified from '@/images/Icons/ceo-verified.png'




const Card23: FC<Card3SmallProps> = ({ className = "h-full", post, avatar, type = '', bigImage }) => {
  const { id, title, subTitle, company_name, content, href, featuredImage, avatar_url, name, small_logo_url, stock_exchange, summary, tidy_ticker, hub_path, username } = post;
  const getUrl = (url: any) => {
    if (url.toString().includes("s3.amazonaws.com")) {
      return url;
    } else {
      return DefaultAvatar;
    }
  }
  return (
    <div
      className={`nc-Card3Small relative flex flex-row items-center ${className}`}
    >
      <Link
        href={`/members/${post.user_id}`}
        // href={href ? href : '#'}
        title={title}
        className={`block w-32 flex-shrink-0 relative rounded-lg overflow-hidden z-0 ms-4 group mr-8`}
      >
        <div className={`w-full h-0 aspect-w-2 aspect-h-2`}>
          {avatar_url || avatar ? <Avatar
            sizeClass={`${bigImage ? 'h-32 w-32' : 'h-12 w-12'} text-base`}
            containerClassName="flex-shrink-0 me-3"
            radius="rounded-full"
            imgUrl={avatar_url ? getUrl(avatar_url) : getUrl(small_logo_url)}
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
        {title ? <h2 className="nc-card-title block text-base sm:text-lg font-medium sm:font-semibold text-neutral-900 dark:text-neutral-100">
          <Link href={`/company/${post.company_id}/discussion/${post.id}`} className="line-clamp-2" title={title}>
            {type === 'discussion' && post?.image_icon ?
              <div className='flex flex-row gap-2 items-center'>
                <Image alt="Company Logo" className='' src={
                  post?.image_icon === 'flag_yellow.gif' ?
                    flag_yellow
                    : post?.image_icon === 'flag_red.gif' ?
                      flag_red
                      : post?.image_icon === 'flag_green.gif' ?
                        flag_green
                        : post?.image_icon === 'accept.gif' ?
                          accept
                          : post?.image_icon === 'cross.gif' ?
                            cross
                            : post?.image_icon === 'icon_agoracom.gif' ?
                              icon_agoracom
                              : post?.image_icon === 'icon_president.gif' ?
                                icon_president
                                : post?.image_icon === 'icon_question.gif' ?
                                  icon_question
                                  : post?.image_icon === 'ceo-verified.png' ? ceo_verified : ''
                } width="15" height="15" />{title}</div>
              : title}
          </Link>
        </h2> :
          <h2 className="nc-card-title block text-base sm:text-lg font-medium sm:font-semibold text-neutral-900 dark:text-neutral-100">
            <Link href={`/company/${post.id}`} className="line-clamp-2" title={title}>
              <span className='text-blue-700'>{name + " "}</span>
              <span className='font-normal'>({stock_exchange}:{tidy_ticker})</span>
            </Link>
          </h2>
        }
        <h2 className="nc-card-subtitle block text-sm font-medium text-neutral-900 dark:text-neutral-100">
          <Link href={`/`} className="line-clamp-2" title={title}>
            {subTitle}
          </Link>
        </h2>
        <h2 className="nc-card-subtitle block text-sm sm:text-base font-medium text-neutral-900 dark:text-neutral-100">
          <Link href={`/company/${post.company_id}`} className="line-clamp-2" title={title}>
            {company_name}
          </Link>
        </h2>
        <h2 className="nc-card-subtitle block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
          <Link href={href || '/'} className="line-clamp-2" title={title}>
            <p dangerouslySetInnerHTML={{ __html: content ? content : summary }}></p>
          </Link>
        </h2>
        <PostCard3 meta={{ ...post }} avatar={avatar_url} hiddenAvatar={true} />
      </div>


    </div>
  )
}

export default Card23