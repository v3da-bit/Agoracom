"use client";

import { FC, Fragment, ReactNode, useEffect, useRef, useState } from "react";
import { Combobox, Dialog } from "@headlessui/react";
import { Popover, Transition } from "@/app/headlessui";
import Avatar from "@/components/Avatar/Avatar";
import DefaultAvatar from '@/images/Icons/avatar.png'
import { useDispatch, useSelector } from "react-redux";
import {
  ExclamationTriangleIcon,
  HashtagIcon,
  LifebuoyIcon,
  ClockIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { DEMO_AUTHORS } from "@/data/authors";
import { DEMO_CATEGORIES } from "@/data/taxonomies";
import { DEMO_POSTS } from "@/data/posts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Input from "../Input/Input";
import { getSearchCompanies } from "@/requests/Search";

const categories = DEMO_CATEGORIES.filter((_, i) => i < 9);
const posts = DEMO_POSTS.filter((_, i) => i < 5);
const authors = DEMO_AUTHORS.filter((_, i) => i < 9);

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  renderTrigger?: () => ReactNode;
  open?: any;
  setOpen?: any;
}

const SearchModal: FC<Props> = (props: any) => {
  let { open, setOpen, renderTrigger } = props;
  const [rawQuery, setRawQuery] = useState("a");
  const [value, setValue] = useState("")
  const [data, setData]: any = useState([])
  const id = "global_search_box";
  const [open1, setOpen1] = useState(false)
  const router = useRouter();

  const query = rawQuery.toLowerCase().replace(/^[#>]/, "");

  const wrapperRef: any = useRef(null);
  const { currentUser, loggedIn } = useSelector((state: any) => {
    return {
      currentUser: state.auth.currentUser,
      loggedIn: state.auth.loggedIn
    };
  });
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      console.log(event);
      if (wrapperRef.current && !wrapperRef.current.contains(event.target) && event.srcElement.id !== id) {
        if (open) {
          setOpen(false);
        }
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, open]);
  const searchCompany = async (value: any) => {
    const response = await getSearchCompanies(value)
    setData(response.data)
    if (response.data.length > 0) {
      setOpen1(true)
    } else {
      setOpen1(false)
    }

  }

  const itemClicked = (item: any) => {
    router.push(`/company/${item.id}`)
    setOpen1(false)
  }
  // const filteredPosts =
  //   rawQuery === "#"
  //     ? posts
  //     : query === "" || rawQuery.startsWith(">")
  //     ? []
  //     : posts.filter((project) => project.title.toLowerCase().includes(query));

  // const filteredProjects =
  //   rawQuery === "#"
  //     ? categories
  //     : query === "" || rawQuery.startsWith(">")
  //     ? []
  //     : categories.filter((project) =>
  //         project.name.toLowerCase().includes(query)
  //       );

  // const filteredUsers =
  //   rawQuery === ">"
  //     ? authors
  //     : query === "" || rawQuery.startsWith("#")
  //     ? []
  //     : authors.filter((user) =>
  //         user.displayName.toLowerCase().includes(query)
  //       );

  return (
    <>
      <div
        //  onClick={() => setOpen(true)} 
        className="cursor-pointer">
        {renderTrigger ? (
          renderTrigger()
        ) : (
          <>
            {
              open ? (
                <Popover className="relative">

                  {({ close }: any) =>

                  (
                    <>
                      {/* <Popover.Button
                          className={`h-12 w-full  pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm`}
                        > */}
                      <div className="relative">
                        <MagnifyingGlassIcon
                          ref={wrapperRef}
                          className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <Input
                          id={id}
                          className="h-12 w-full border-[1px] bg-transparent pl-11 pr-4 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                          placeholder="Search..."
                          value={value}

                          onKeyUp={(event: any) => {

                            if (event.key === 'Enter') {
                              // data.length ? data.length > 1 ? uncomment this code to start search drop down feature
                              router.push(`/search?value=${value}`)
                              setOpen(false);
                              // :
                              // router.push(`/company/${data[0]?.id}`) : router.push(`/search?value=${value}`)
                            };
                          }}

                          onChange={(event: any) => {
                            setValue(event.target.value);
                            // if (event.target.value.length > 2) { uncomment this code to start search drop down feature

                            //   searchCompany(event.target.value)
                            // } else {
                            setOpen1(false)
                            // }
                          }}
                        />

                      </div>
                      {/* </Popover.Button> */}
                      <Transition
                        as={Fragment}
                        // show={open1} if want to open search bar
                        onClick={() => {
                          console.log('touch');

                        }}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-10 w-screen max-w-[460px] px-4 mt-3.5 -end-2 sm:end-0 sm:px-0 company-search-panel" >
                          <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 company-search-panel">
                            <div className="relative grid grid-cols-1 gap-6 bg-white dark:bg-neutral-800 py-5 lg:py-7 px-5 company-search-panel">
                              {/*===Companies===*/}
                              <div className="text-left company-search-panel">
                                <h1 className="text-xl font-bold company-search-panel">Companies</h1>
                              </div>

                              <div className="w-full border-b border-neutral-200 dark:border-neutral-700 company-search-panel" />
                              <div className="flex flex-col gap-3 company-search-panel">


                                {data.length > 0 ? data.map((value: any) => {
                                  return (<div key={value.id} onClick={() => itemClicked(value)}> <div className="company-search-panel flex-grow ms-3 px-4 py-3 border-l-2 hover:border-black border-neutral-200 dark:border-neutral-700">
                                    <h4 className="text-lg font-semibold company-search-panel">{value?.name}</h4>
                                    <p className="text-sm mt-2 company-search-panel">{value?.summary}</p>
                                  </div></div>)
                                }) : <></>}
                              </div>

                              {/* ------------------ 1 --------------------- */}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>

              ) : (
                <button onClick={() => setOpen(true)} className="flex w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none items-center justify-center">
                  <svg
                    width={22}
                    height={22}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 22L20 20"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )
            }
          </>
        )
        }
      </div >

      {/* <Transition.Root
        show={open}
        as={Fragment}
        afterLeave={() => setRawQuery("a")}
        appear
      >
        <Dialog
          as="div"
          className="relative z-[99]"
          onClose={() => setOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-100"
            >
              <Dialog.Panel
                className="block mx-auto max-w-2xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
                as="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  router.push("/search");
                  setOpen(false);
                }}
              >
                <Combobox
                  onChange={(item: any) => {
                    router.push(item.href);
                    setOpen(false);
                  }}
                  name="searchpallet"
                >
                  <div className="relative">
                    <MagnifyingGlassIcon
                      className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <Combobox.Input
                      className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                      placeholder="Search..."
                      onChange={(event) => setRawQuery(event.target.value)}
                    />
                  </div>

                  {(filteredProjects.length > 0 ||
                    filteredUsers.length > 0 ||
                    filteredPosts.length > 0) && (
                    <Combobox.Options
                      static
                      className="max-h-80 scroll-py-10 scroll-pb-2 space-y-4 overflow-y-auto p-4 pb-2"
                    >
                      {filteredPosts.length > 0 && (
                        <li>
                          <h2 className="text-xs font-semibold text-gray-900">
                            Posts
                          </h2>
                          <ul className="-mx-4 mt-2 text-sm text-gray-700">
                            {filteredPosts.map((post) => (
                              <Combobox.Option
                                key={post.id}
                                value={post}
                                className={({ active }) =>
                                  classNames(
                                    "flex select-none items-center px-4 py-2",
                                    active && "bg-indigo-600 text-white"
                                  )
                                }
                              >
                                {({ active }) => (
                                  <>
                                    <ClockIcon
                                      className={classNames(
                                        "h-6 w-6 flex-none",
                                        active ? "text-white" : "text-gray-400"
                                      )}
                                      aria-hidden="true"
                                    />
                                    <span className="ms-3 flex-auto truncate">
                                      {post.title}
                                    </span>
                                  </>
                                )}
                              </Combobox.Option>
                            ))}
                          </ul>
                        </li>
                      )}

                      {filteredProjects.length > 0 && (
                        <li>
                          <h2 className="text-xs font-semibold text-gray-900">
                            Categories
                          </h2>
                          <ul className="-mx-4 mt-2 text-sm text-gray-700">
                            {filteredProjects.map((project) => (
                              <Combobox.Option
                                key={project.id}
                                value={project}
                                className={({ active }) =>
                                  classNames(
                                    "flex select-none items-center px-4 py-2",
                                    active && "bg-indigo-600 text-white"
                                  )
                                }
                              >
                                {({ active }) => (
                                  <>
                                    <HashtagIcon
                                      className={classNames(
                                        "h-6 w-6 flex-none",
                                        active ? "text-white" : "text-gray-400"
                                      )}
                                      aria-hidden="true"
                                    />
                                    <span className="ms-3 flex-auto truncate">
                                      {project.name}
                                    </span>
                                  </>
                                )}
                              </Combobox.Option>
                            ))}
                          </ul>
                        </li>
                      )}

                      {filteredUsers.length > 0 && (
                        <li>
                          <h2 className="text-xs font-semibold text-gray-900">
                            Authors
                          </h2>
                          <ul className="-mx-4 mt-2 text-sm text-gray-700">
                            {filteredUsers.map((user) => (
                              <Combobox.Option
                                key={user.id}
                                value={user}
                                className={({ active }) =>
                                  classNames(
                                    "flex select-none items-center px-4 py-2",
                                    active && "bg-indigo-600 text-white"
                                  )
                                }
                              >
                                <Image
                                  src={user.avatar}
                                  alt="author"
                                  className="h-6 w-6 flex-none rounded-full"
                                  sizes="30px"
                                />
                                <span className="ms-3 flex-auto truncate">
                                  {user.displayName}
                                </span>
                              </Combobox.Option>
                            ))}
                          </ul>
                        </li>
                      )}
                    </Combobox.Options>
                  )}

                  {rawQuery === "?" && (
                    <div className="py-14 px-6 text-center text-sm sm:px-14">
                      <LifebuoyIcon
                        className="mx-auto h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                      <p className="mt-4 font-semibold text-gray-900">
                        Help with searching
                      </p>
                      <p className="mt-2 text-gray-500">
                        Use this tool to quickly search for users and projects
                        across our entire platform. You can also use the search
                        modifiers found in the footer below to limit the results
                        to just users or projects.
                      </p>
                    </div>
                  )}

                  {query !== "" &&
                    rawQuery !== "?" &&
                    filteredProjects.length === 0 &&
                    filteredUsers.length === 0 && (
                      <div className="py-14 px-6 text-center text-sm sm:px-14">
                        <ExclamationTriangleIcon
                          className="mx-auto h-6 w-6 text-gray-400"
                          aria-hidden="true"
                        />
                        <p className="mt-4 font-semibold text-gray-900">
                          No results found
                        </p>
                        <p className="mt-2 text-gray-500">
                          We couldn’t find anything with that term. Please try
                          again.
                        </p>
                      </div>
                    )}

                  <div className="flex flex-wrap items-center bg-gray-50 py-2.5 px-4 text-xs text-gray-700">
                    Type{" "}
                    <kbd
                      className={classNames(
                        "mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2",
                        rawQuery.startsWith("#")
                          ? "border-indigo-600 text-indigo-600"
                          : "border-gray-400 text-gray-900"
                      )}
                    >
                      #
                    </kbd>{" "}
                    <span className="sm:hidden">for projects,</span>
                    <span className="hidden sm:inline">
                      to access projects,
                    </span>
                    <kbd
                      className={classNames(
                        "mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2",
                        rawQuery.startsWith(">")
                          ? "border-indigo-600 text-indigo-600"
                          : "border-gray-400 text-gray-900"
                      )}
                    >
                      &gt;
                    </kbd>{" "}
                    for users,{" "}
                    <kbd
                      className={classNames(
                        "mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2",
                        rawQuery === "?"
                          ? "border-indigo-600 text-indigo-600"
                          : "border-gray-400 text-gray-900"
                      )}
                    >
                      ?
                    </kbd>{" "}
                    for help, or{" "}
                    <Link
                      href={"/search"}
                      className="mx-1 flex h-5 px-1.5 items-center justify-center rounded border bg-white sm:mx-2 border-primary-6000 text-neutral-900"
                      onClick={() => setOpen(false)}
                    >
                      Go to search page
                    </Link>{" "}
                  </div>
                </Combobox>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root> */}
    </>
  );
};

export default SearchModal;
