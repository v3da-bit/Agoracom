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

export default function ShareButton({ title }: any) {

    const router = useRouter();
    const location = useLocation();
    const dispatch = useDispatch();
    const { currentUser, loggedIn } = useSelector((state: any) => {
        return {
            currentUser: state.auth.currentUser,
            loggedIn: state.auth.loggedIn
        };
    });

    const navigate = (platform: any, close: any) => {
        const url = location.href;
        const social: any = {
            'facebook': 'https://www.facebook.com/sharer/sharer.php?u=' + url,
            'linkedIn': 'https://www.linkedin.com/cws/share?url=' + url,
            'twitter': 'https://twitter.com/intent/tweet?url=' + url,
            'discord': 'https://discord.com/channels/@me'
        }
        window.open(social[platform]);
        close();
    }

    return (
        <div className="AvatarDropdown ">
            <Popover className="relative">
                {({ open, close }) => (
                    <>
                        <Popover.Button
                            className={`w-fit h-fit sm:w-fit sm:h-fit rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none flex items-center justify-center`}
                        >
                            <ButtonPrimary sizeClass="py-2.5 px-4 sm:py-3 !text-md sm:px-6"
                                fontSize="text-sm lg:text-md font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1">
                                    <path fill-rule="evenodd" d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z" clip-rule="evenodd" />
                                </svg>
                                <span className=' ml-1'>
                                    Share
                                </span>
                            </ButtonPrimary>
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
                                            onClick={() => navigate('twitter', close)}
                                        >
                                            <div className="ms-4">
                                                <p className="text-sm font-medium ">{"Twitter"}</p>
                                            </div>
                                        </div>

                                        <div
                                            className="flex items-center p-2 cursor-pointer -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                            onClick={() => navigate('facebook', close)}
                                        >
                                            <div className="ms-4">
                                                <p className="text-sm font-medium ">{"Facebook"}</p>
                                            </div>
                                        </div>

                                        <div
                                            className="flex items-center p-2 cursor-pointer -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                            onClick={() => navigate('linkedIn', close)}
                                        >
                                            <div className="ms-4">
                                                <p className="text-sm font-medium ">{"LinkedIn"}</p>
                                            </div>
                                        </div>

                                        <div
                                            className="flex items-center p-2 cursor-pointer -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                            onClick={() => navigate('discord', close)}
                                        >
                                            <div className="ms-4">
                                                <p className="text-sm font-medium ">{"Discord"}</p>
                                            </div>
                                        </div>

                                        <Link
                                            href={`mailto:?body=${location.href};subject=${title}`}
                                            className="flex items-center p-2 cursor-pointer -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                            onClick={() => close()}
                                        >
                                            <div className="ms-4">
                                                <p className="text-sm font-medium ">{"Email"}</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    );
}
