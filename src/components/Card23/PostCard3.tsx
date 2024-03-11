import React, { FC } from 'react'
import { PostCardMetaProps } from '../PostCardMeta/PostCardMeta'
import Link from 'next/link'
import DefaultAvatar from "../../images/Icons/avatar.png";
import Avatar from '../Avatar/Avatar';
import moment from "moment";


const PostCard3: FC<PostCardMetaProps> = ({
    className = "leading-none text-xs",
    meta,
    hiddenAvatar = false,
    avatarSize = "h-7 w-7 text-sm",
    avatar,
    showSubInfo = false,
    grid = 4,
    screen = ''
}) => {

    const { date, author, username, created_at } = meta;
    const getUrl = (url: any) => {
        if (url?.toString()?.includes("s3.amazonaws.com")) {
            return url;
        } else {
            return DefaultAvatar;
        }
    }
    return (
        <div
            className={`nc-PostCardMeta inline-flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 ${className}`}
        >
            <Link
                href={author?.href || "/"}
                className="relative flex items-center space-x-2 rtl:space-x-reverse"
            >
                {!hiddenAvatar && (
                    <Avatar
                        radius="rounded-full"
                        sizeClass={avatarSize}
                        imgUrl={getUrl(avatar || author?.avatar)}
                        userName={username || author?.displayName}
                    />
                )}
                {
                    showSubInfo ? (
                        <span className="hidden text-sm sm:block text-neutral-500 dark:text-neutral-400 ">
                            {
                                grid <= 3 ? (
                                    <>
                                        <span className="line-clamp-2 flex">
                                            {/* <Link href="/"> */}
                                            <b className="text-defaultBlue-100 mr-0.5"> PostedBy: {screen === 'Broadcast' ? meta?.company?.name : username}</b>
                                            {/* </Link> */}
                                            <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
                                                ·
                                            </span>
                                            <span>{moment(screen === 'Broadcast' ? meta.publish_at : created_at).format("ll")}</span>
                                        </span>
                                    </>
                                ) : <>
                                    <span className="line-clamp-2"> <Link href="/"><b className="text-defaultBlue-100 mr-0.5">{username}</b> </Link></span>
                                    <span>{moment(screen === 'Broadcast' ? meta.publish_at : created_at).format("ll")}</span>
                                </>
                            }
                            {
                                screen === 'Broadcast' ? (
                                    <span className="line-clamp-2 font-semibold text-xs  mt-1"> PostedBy: {meta?.company?.stock_exchange}: {meta?.company?.tidy_ticker} </span>
                                ) : <>
                                    <span className="line-clamp-2 font-semibold text-xs  mt-1"> {meta?.company_name} </span>
                                </>
                            }
                        </span>
                    ) : (
                        username ?
                            <>
                                <span className="block text-neutral-700 text-sm hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
                                    PostedBy:
                                    <Link href={`/members/${meta.user_id}`} className='ml-1'>
                                        {username || author?.displayName}
                                    </Link>
                                </span>
                                <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
                                    ·
                                </span></> : <></>
                    )
                }
            </Link>
            {
                !showSubInfo ? (
                    <>


                        <span className="text-neutral-500 dark:text-neutral-400 font-normal">
                            {created_at ? moment(created_at).fromNow() : date}
                        </span>
                    </>
                ) : <></>
            }
        </div>
    )
}

export default PostCard3