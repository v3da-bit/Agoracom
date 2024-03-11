'use client'
import ButtonCircle from '@/components/Button/ButtonCircle'
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import Card23 from '@/components/Card23/Card23'
import Card30 from '@/components/Card30/page'
import Input from '@/components/Input/Input'
import Select from '@/components/Select/Select'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Heading from '@/components/Heading/Heading'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getIgnoreData } from '@/requests/Companies'

function Ignore({ userId }: any) {
    const [searchKeyword, setSearchKeyword] = useState([]);
    const [data, setData] = useState([])
    const router = useRouter()
    const [globalLoader, setGlobalLoader] = useState(false)

    const style = 'mt-2 font-semibold text-base max-md:text-md text-dark line-clamp-5'
    const style2 = 'mt-1 font-semibold text-sm text-gray-600 dark:text-gray-200'

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            setGlobalLoader(true)
            const response: any = await getIgnoreData(userId, { page: 1 });
            setGlobalLoader(false)

            console.log(response);
            if (response.status === 200) {
                setData(response.data);
            }
        } catch (e: any) {
            console.log(e);
        }
    }

    return (
        <div className="grid grid-flow-row gap-3">
            {globalLoader ?
                <div className='flex items-center justify-center py-10'>
                    <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                </div>
                :
                <>
                    <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3">
                        <div className="w-full">
                            <div className="flex-shrink-0  lg:mb-0 grow lg:grow-0 lg:!w-[260px] sm:!w-full">
                                <form className="relative">
                                    <Input
                                        required
                                        aria-required
                                        placeholder="Search Keyword"
                                        type="text"
                                        value={searchKeyword}
                                        onChange={(e: any) => setSearchKeyword(e.target.value)}
                                        className="text-neutral-800 px-6 dark:text-neutral-200"
                                    />
                                    <ButtonCircle
                                        type="submit"
                                        // disabled={!keyword.length}
                                        // onClick={searchKeyword}
                                        className={`absolute transform top-1/2 -translate-y-1/2 end-1 !bg-defaultGreen-100 hover:!bg-primary-500 dark:bg-neutral-300 dark:text-black`}
                                    >
                                        <MagnifyingGlassIcon className="w-5 h-5" />
                                    </ButtonCircle>
                                </form>
                            </div>
                        </div>


                    </div>

                    <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
                        {data?.map((post: any, index: number) => {
                            post.href = '/';
                            // if(index <= 4) {
                            return (
                                <Card30
                                    className="p-4 xl:px-5 xl:py-6 hover:bg-neutral-200 dark:hover:bg-neutral-700 border-b-[1px]"
                                    key={post.id}
                                    post={post}
                                    avatar={post.avatar}

                                />
                            )
                            // }
                        })}



                    </div>
                </>
            }
        </div>
    )
}

export default Ignore