import React, { FC, useEffect, useState } from "react";
import { PostAuthorType } from "@/data/types";
import Avatar from "@/components/Avatar/Avatar";
import Link from "next/link";
import ButtonCircle from "../Button/ButtonCircle";
import { PlusIcon } from "@heroicons/react/24/solid";
import DefaultAvatar from "../../images/Icons/avatar.png";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { addFavouriteCompany, checkFollowMember, followMember, removeFavouriteCompany, unfollowMember } from "@/requests/Home";
import Loading from "../Button/Loading";

export interface CardAuthorProps {
  className?: string;
  author: any;
  isMember?: boolean;
  isCompany?: boolean;
  hideAddIcon?: boolean;
  parent_textClass?: string;
}

const CardAuthor: FC<CardAuthorProps> = ({ className = "", author, isMember = false, isCompany = false, hideAddIcon = false, parent_textClass = "" }) => {
  const { displayName, href = "/", avatar, jobName, authority_group_name, username, name, small_logo_url, stock_exchange, tidy_ticker, id } = author;
  const router = useRouter();
  const [follow, setFollow] = useState(author.followed)
  const [favourite, setFavourite] = useState(author.followed)
  const [loader, setLoader] = useState(false);
  const getUrl = (url: any) => {
    if (url.toString().includes("s3.amazonaws.com")) {
      return url;
    } else {
      return DefaultAvatar;
    }
  }
  const { currentUser, loggedIn } = useSelector((state: any) => {
    return {
      currentUser: state.auth.currentUser,
      loggedIn: state.auth.loggedIn
    };
  });
  const checkFollow = async () => {

    const response = await unfollowMember(id)
    if (response.status === 200) {
      setFollow(false)
    } else {
      setFollow(true)
    }

  }
  // useEffect(()=>{
  //   checkFollow()
  // },[])
  const favouriteFollow = async () => {
    if (loggedIn) {
      try {
        if (isMember) {
          if (follow) {
            setLoader(true);
            const response = await unfollowMember(id)
            setLoader(false);
            if (response.status == 200) {
              setFollow(false)
            }
          } else {
            setLoader(true);
            const response = await followMember(id)
            setLoader(false);
            if (response.status == 201) {
              setFollow(true)
            }
          }
        } else if (isCompany) {
          if (favourite) {
            setLoader(true);
            const response = await removeFavouriteCompany(id)
            setLoader(false);
            if (response.status == 200) {
              setFollow(false)
            }
          } else {
            setLoader(true);
            const response = await addFavouriteCompany(id)
            setLoader(false);
            if (response.status == 201) {
              setFollow(true)
            }
          }
        }



      } catch (e: any) {
        console.log(e);
      }
    } else {
      router.push('/auth/login')

    }
  }
  return (
    <div
      className={`nc-CardAuthor flex items-center ${className}`}
    >
      <Link href={isMember ? `/members/${id}` : `/company/${id}`}>
        <Avatar
          sizeClass="h-10 w-10 text-base"
          containerClassName="flex-shrink-0 me-3"
          radius="rounded-full"
          imgUrl={getUrl(avatar || small_logo_url)}
          userName={isMember ? username : (isCompany ? name : displayName)}
        />
      </Link>
      <div className="flex justify-between flex-auto">
        <div className="pr-6">
          <Link href={isMember ? `/members/${id}` : `/company/${id}`}
            className={`!text-sm sm:text-base text-neutral-900 dark:text-neutral-100 font-medium sm:font-semibold ${parent_textClass}`}
          >
            {isMember ? username : (isCompany ? name : displayName)}
            {
              isMember ? (
                <span
                  className={`block mt-[2px] text-xs text-neutral-500 dark:text-neutral-400`}
                >
                  {isMember ? authority_group_name : "President, e.Digital"}
                </span>
              ) : <></>
            }
            {
              isCompany ? (
                <span
                  className={`block mt-[2px] text-xs text-neutral-500 dark:text-neutral-400`}
                >
                  {stock_exchange}{stock_exchange ? ", " : ""} {tidy_ticker}
                </span>
              ) : <></>
            }
          </Link>
        </div>
        {
          !hideAddIcon ? (
            <ButtonCircle
              type="submit"
              onClick={favouriteFollow}
              disabled={loader}
              className={`end-1 bg-transparent ${loader ? 'hover:!bg-transparent' : 'hover:!bg-primary-100'} dark:bg-neutral-300 dark:text-black px-auto`}
            >
              {
                loader ? (
                  <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                ) : (
                  <>
                    {follow ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-6 text-green-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                      : <PlusIcon className="w-5 h-5 text-black hover:!text-primary-6000" />}
                  </>
                )
              }
            </ButtonCircle>
          ) : <></>
        }
      </div>
    </div>
  );
};

export default CardAuthor;
