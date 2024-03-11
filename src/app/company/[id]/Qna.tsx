import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import DefaultAvatar from '@/images/favicon.png'
import ButtonCircle from '@/components/Button/ButtonCircle'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Input from '@/components/Input/Input'
import Select from '@/components/Select/Select'
import ButtonSecondary from '@/components/Button/ButtonSecondary'
import { getQnA } from '@/requests/Companies'
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import moment from 'moment'
import Link from 'next/link'

const Qna = ({ userData }: any) => {
    const style1 = 'mt-1 font-semibold text-sm text-gray-600 dark:text-gray-200'
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [pageInfo, setPageInfo] = useState({
        page: 0,
        showMore: false
    })
    const [globalLoader, setGlobalLoader] = useState(false)


    useEffect(() => {
        fetchData();
    }, [])

    const searchKeyword = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        fetchData();
    }

    const fetchData = async (loadMore = false) => {
        setLoader(true);
        const newPage = loadMore ? pageInfo.page + 1 : 1;
        const payload = { page: newPage, q: keyword }
        setGlobalLoader(true)
        const response: any = await getQnA(userData.id, payload);
        setGlobalLoader(false)
        const newData: any = loadMore ? [...data, response.data] : response.data;
        let page = JSON.parse(response?.headers.toJSON()?.pagy);
        let pagePayload = {
            showMore: page.next != null,
            page: newPage
        }
        setLoader(false);
        setPageInfo(pagePayload);
        setData(newData);
    }

    return (
        <div className='w-full px-3 py-3 border-t-2 border-black'>
            <div className="mb-4 w-full flex flex-col gap-3 py-3  justify-center">
                {
                    globalLoader ?
                        <div className='flex items-center justify-center py-10'>
                            <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </div>
                        :
                        <>
                            <h1 className="text-lg lg:text-2xl text-dark font-bold">{userData?.name}'s Q&A</h1>
                            <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1 mt-3">
                                <div className="flex-shrink-0  lg:mb-0 grow lg:grow-0 lg:!w-[260px] sm:!w-full">
                                    <form className="relative">
                                        <Input
                                            required
                                            aria-required
                                            placeholder="Search Keyword"
                                            type="text"
                                            value={keyword}
                                            onChange={(e) => setKeyword(e.target.value)}
                                            className="text-neutral-800 px-6 dark:text-neutral-200"
                                        />
                                        <ButtonCircle
                                            type="submit"
                                            // disabled={!keyword.length}
                                            onClick={searchKeyword}
                                            className={`absolute transform top-1/2 -translate-y-1/2 end-1 !bg-defaultGreen-100 hover:!bg-primary-500 dark:bg-neutral-300 dark:text-black`}
                                        >
                                            <MagnifyingGlassIcon className="w-5 h-5" />
                                        </ButtonCircle>
                                    </form>
                                </div>
                                <div className="flex justify-end max-md:justify-center">
                                    <Link href={`/company/${userData.id}/create?type=question`}><ButtonSecondary fontSize='text-md' sizeClass='py-2.5 px-5'>Ask a Question ?</ButtonSecondary></Link>
                                </div>
                            </div>
                            {
                                data.map((item: any, index: number) => {
                                    return (
                                        <div key={index} className="mt-6 border-t-2 py-3 border-gray-300">
                                            <div className="grid grid-flow-row gap-5 px-5 py-4 rounded-md bg-gray-100 dark:bg-gray-800">
                                                <h1 className='text-xl max-md:text-md  text-dark mt-3'>
                                                    <b>{item.title}</b>
                                                </h1>
                                                <div>
                                                    <h1 className={style1} dangerouslySetInnerHTML={{ __html: item?.context }}>
                                                    </h1>
                                                </div>
                                                <div className='mt-4 flex flex-row gap-2 items-center'>

                                                    <div className='h-9 w-9 rounded-full bg-white overflow-hidden'><Image
                                                        src={DefaultAvatar}
                                                        alt="GFG logo served with static path of public directory"
                                                        height="100"
                                                        width="400"
                                                    />
                                                    </div>
                                                    <div className="w-fit text-sm">
                                                        <h1 className="text-blue-500 m-0 p-0"><b>{item.username}</b></h1>
                                                        <h1 className="text-dark m-0 p-0 font-normal -mt-1">{item.company_name} <span className='text-secondary-500'>{moment(item.created_at).fromNow()}</span></h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {
                                pageInfo.showMore ? (
                                    <div className="flex mt-10 justify-center items-center">
                                        <ButtonPrimary loading={loader} onClick={() => fetchData(true)}>Show more</ButtonPrimary>
                                    </div>
                                ) : <></>
                            }
                        </>
                }
            </div>
        </div>
    )
}

export default Qna