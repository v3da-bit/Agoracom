"use client";

import { Popover, Transition } from "@/app/headlessui";
import { avatarImgs } from "@/contains/fakeData";
import { Fragment } from "react";
import Avatar from "@/components/Avatar/Avatar";
import SwitchDarkMode2 from "@/components/SwitchDarkMode/SwitchDarkMode2";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/User/Action";
import { useRouter } from "next/navigation";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import { useLocation } from "react-use";
import { ArrowLeftOnRectangleIcon, Bars3Icon, FlagIcon, PencilIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import ButtonThird from "@/components/Button/ButtonThird";

export default function MoreButton({ post, showViolation, showDeletePost, isRemoved, restorePost }: any) {
    const { currentUser, loggedIn } = useSelector((state: any) => {
        return {
            currentUser: state.auth.currentUser,
            loggedIn: state.auth.loggedIn
        };
    });
    return (
        <div className="AvatarDropdown ">
            <Popover className="relative">
                {({ open, close }) => (
                    <>
                        <Popover.Button
                            className={`w-fit h-fit sm:w-fit sm:h-fit rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none flex items-center justify-center`}
                        >
                            <ButtonThird sizeClass="py-2.5 px-4 sm:py-3 !text-md sm:px-6 ml-2"
                                fontSize="text-sm lg:text-md font-medium">
                                <Bars3Icon className='w-6 h-6' />
                                <span className='ml-1'>
                                    More
                                </span>
                            </ButtonThird>
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute z-10 w-screen max-w-[160px] px-3 mt-2 -end-2 sm:end-0 sm:px-0">
                                <div className="overflow-hidden rounded-xl shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="relative grid grid-cols-1 gap-6 bg-white dark:bg-neutral-800 py-5 lg:py-5 px-5">
                                        <div
                                            className="flex items-center p-2 cursor-pointer -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                            onClick={() => {
                                                close();
                                                showViolation()
                                            }}
                                        >
                                            <FlagIcon className="w-5 h-5" />
                                            <div className="ms-3">
                                                <p className="text-sm font-medium ">{"Report"}</p>
                                            </div>
                                        </div>
                                        {loggedIn && (currentUser?.userRole==='admin'||post.owner==true) ?<>
                                            <Link
                                                href={`/company/${post?.company_id}/edit/${post?.id}`}
                                                className="flex items-center p-2 cursor-pointer -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                                onClick={() => close()}
                                            >
                                                <PencilSquareIcon className="w-5 h-5" />
                                                <div className="ms-3">
                                                    <p className="text-sm font-medium ">{"Edit"}</p>
                                                </div>
                                            </Link>
                                            {
                                                isRemoved ? (
                                                    <div
                                                        className="flex items-center p-2 cursor-pointer -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                                        onClick={() => {
                                                            close();
                                                            restorePost()
                                                        }}
                                                    >
                                                        <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                                                        <div className="ms-3">
                                                            <p className="text-sm font-medium ">{"Restore"}</p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div
                                                        className="flex items-center p-2 cursor-pointer -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                                        onClick={() => {
                                                            close();
                                                            showDeletePost()
                                                        }}
                                                    >
                                                        <TrashIcon className="w-5 h-5" />
                                                        <div className="ms-3">
                                                            <p className="text-sm font-medium ">{"Delete"}</p>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </>:<></>}
                                    </div>
                                </div>
                            </Popover.Panel >
                        </Transition >
                    </>
                )
                }
            </Popover >
        </div >
    );
}
