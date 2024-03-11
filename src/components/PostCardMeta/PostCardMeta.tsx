import React, { FC } from "react";
import Avatar from "@/components/Avatar/Avatar";
import { PostDataType } from "@/data/types";
import Link from "next/link";
import moment from "moment";
import DefaultAvatar from "../../images/Icons/avatar.png";

export interface PostCardMetaProps {
  className?: string;
  meta: any;
  hiddenAvatar?: boolean;
  avatarSize?: string;
  avatar: string;
  showSubInfo?: boolean;
  grid?: number;
  screen?: string;
  href?: any;
  logoHref?: any;
}

const PostCardMeta: FC<PostCardMetaProps> = ({
  className = "leading-none text-xs",
  meta,
  hiddenAvatar = false,
  avatarSize = "h-7 w-7 text-sm",
  avatar,
  showSubInfo = false,
  grid = 4,
  screen = '',
  href = '',
  logoHref = ''
}) => {
  const { date, author, username, created_at } = meta;
  const getUrl = (url: any) => {
    if (url?.toString().includes("s3.amazonaws.com")) {
      return url;
    } else {
      return DefaultAvatar;
    }
  }

  return (
    <div
      className={`nc-PostCardMeta inline-flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 ${className}`}
    >
      <div
        className="relative flex items-center space-x-2 rtl:space-x-reverse"
      >
        {!hiddenAvatar && (
          <Link href={logoHref}>
            <Avatar
              radius="rounded-full"
              sizeClass="h-7 w-7 text-sm"
              imgUrl={getUrl(avatar || author?.avatar)}
              userName={username || author?.displayName}
            />
          </Link>
        )}
        {
          showSubInfo ? (
            <span className="hidden text-sm sm:block text-neutral-500 dark:text-neutral-400 ">
              {
                grid <= 3 ? (
                  <>
                    <span className="line-clamp-2 flex">
                      {/* <Link href="/"> */}
                      <b className="text-defaultBlue-100 mr-0.5">{screen === 'Broadcast' ? meta?.company?.name : username}</b>
                      {/* </Link> */}
                      <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
                        ·
                      </span>
                      <span>{moment(screen === 'Broadcast' ? meta.publish_at : created_at).format("ll")}</span>
                    </span>
                  </>
                ) : <>
                  <span className="line-clamp-2"> <Link href={href}><b className="text-defaultBlue-100 mr-0.5">{username}</b> </Link></span>
                  <span>{moment(screen === 'Broadcast' ? meta.publish_at : created_at).format("ll")}</span>
                </>
              }
              {
                screen === 'Broadcast' ? (
                  <span className="line-clamp-2 font-semibold text-xs  mt-1"> {meta?.company?.stock_exchange}: {meta?.company?.tidy_ticker} </span>
                ) : <>
                  <Link href={`/company/${meta?.company_id}`} className="line-clamp-2 font-semibold text-xs  mt-1"> {meta?.company_name} </Link>
                </>
              }
            </span>
          ) : (
            <Link href={href} className="block text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
              {username || author?.displayName}
            </Link>
          )
        }
      </div>
      {
        !showSubInfo ? (
          <>
            <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
              ·
            </span>
            <span className="text-neutral-500 dark:text-neutral-400 font-normal">
              {created_at ? moment(created_at).format("ll") : date}
            </span>
          </>
        ) : <></>
      }
    </div>
  );
};

export default PostCardMeta;
