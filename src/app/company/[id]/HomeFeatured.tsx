import Image from 'next/image'
import React, { useState } from 'react'
import DefaultAvatar from '@/images/Icons/avatar.png'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/solid'
import ButtonCircle from '@/components/Button/ButtonCircle'
import Input from '@/components/Input/Input'
import Select from '@/components/Select/Select'
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import Card23 from '@/components/Card23/Card23'
import moment from 'moment'
// import SearchResult from '../../search/page'
import { useParams } from 'next/navigation'
import defaultImage from '../../../images/default-image.jpg';
import Link from 'next/link'



function HomeFeatured({ post, discussions, onclick, pageInfo, loader, keyword, setKeyword, searchKeyword, menuDropdown, selectedDiscussion, setSelectedDiscussion }: any) {

    const style = ' font-semibold text-sm max-md:text-sm text-dark'
    const onTypeChange = (val: any) => {
        onclick(val)
        setSelectedDiscussion(val);
    }
    const params = useParams()
    // console.log(post);


    let id = params.id
    return (
        <div className='mt-3 px-3 py-3 grid grid-flow-row gap-10 border-t-2 w-full border-black'>

            {
                post.length > 0 ? (
                    <div className="mt-5 mb-3 grid grid-flow-row gap-3">
                        <h1 className='text-md md:text-xl text-dark xl:text-3xl '>
                            <b>Feature Posts</b>
                        </h1>

                        <div className="mt-4 grid grid-cols-2 max-md:grid-cols-1 gap-5 max-md:gap-8">
                            <div className="grid grid-flow-row gap-3">

                                {post.map((value: any, index: any) => {
                                    // console.log(value.cover_photo_url);

                                    return (

                                        index == 0 ?
                                            <>
                                                <div className=" h-52 w-auto bg-slate-500">
                                                    <Image
                                                        src={value.cover_photo_url ? value.cover_photo_url : defaultImage}
                                                        alt="GFG logo served with static path of public directory"
                                                        height="200"
                                                        width="500"
                                                        className='w-full h-full object-cover'
                                                    />
                                                </div>
                                                <Link href={`/company/${value.company_id}/discussion/${value.id}`}><h1 className={style}>{value.title}</h1></Link>
                                                <div className=' flex flex-row gap-2 items-center'>
                                                    <div className=' h-8 w-8 rounded-full bg-white overflow-hidden'>
                                                        <Link href={`/company/${value.company_id}`}>
                                                            <Image
                                                                src={value.company_logo_url}
                                                                alt="GFG logo served with static path of public directory"
                                                                height="100"
                                                                width="400"
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="flex flex-row  max-lg:flex-col gap-2">
                                                        <Link href={`/members/${value.user_id}`}><h1 className="text-blue-500 text-sm"><b>{value.username}</b></h1></Link>
                                                        <h1 className="text-dark text-sm">{moment(value.created_at).format('ll hh:mm a')}</h1>
                                                    </div>
                                                </div>

                                            </>
                                            :
                                            <></>)



                                })}
                            </div>
                            <div className="flex relative flex-col overflow-y-auto max-h-72 ">

                                {post.map((value: any, index: any) => {

                                    return (

                                        index > 0 ?

                                            <div className='p-4 border-b-[1px] hover:bg-neutral-200'>
                                                <div className="w-full">
                                                    <Link href={`/company/${value.company_id}/discussion/${value.id}`}><h1 className={style}>{value.title}</h1></Link>
                                                    <div className=' flex flex-row gap-2 mt-1 items-center'>
                                                        <div className=' h-8 w-8 rounded-full overflow-hidden bg-white'>
                                                            <Link href={`/company/${value.company_id}`}>
                                                                <Image
                                                                    src={value.company_logo_url}
                                                                    alt="GFG logo served with static path of public directory"
                                                                    height="100"
                                                                    width="400"
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="flex flex-row  max-lg:flex-col gap-2">
                                                            <Link href={`/members/${value.user_id}`}><h1 className="text-blue-500 text-sm"><b>{value.username}</b></h1></Link>
                                                            <h1 className="text-dark text-sm">{moment(value.created_at).format('ll hh:mm a')}</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>







                                            : <></>
                                    )
                                })}
                            </div>


                        </div>
                    </div>
                ) : <></>
            }


            <div className="mt-5 grid grid-flow-row gap-5">
                <h1 className='text-md md:text-xl text-dark xl:text-3xl '>
                    <b>Discussion</b>
                </h1>
                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3">
                    <div className="w-full">
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
                    </div>
                    <div className="w-full block lg:flex lg:justify-end">
                        <div className="flex justify-center">
                            <Select menuDropdown={menuDropdown} selectedValue={selectedDiscussion} setMenu={onTypeChange} />
                        </div>
                        <Link href={`/company/${id}/create`}>
                            <ButtonPrimary className=' bg-white text-base hover:bg-slate-300 border border-slate-300' sizeClass=' py-2.5 px-3.5'><span className=' text-blue-600'> Create a Post</span></ButtonPrimary>
                        </Link>
                    </div>
                </div>
                {discussions.length > 0 ? (
                    <>
                        <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
                            {discussions?.map((post: any, index: number) => {
                                post.href = '/';

                                // if(index <= 4) {
                                return (
                                    <Card23
                                        className="p-4 xl:px-5 xl:py-6 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                                        key={post.id}
                                        post={post}
                                        avatar={post.avatar_url}
                                        type={'discussion'}
                                    />
                                )
                                // }
                            })}




                        </div>
                        {pageInfo ?
                            <div className="flex mt-10 justify-center items-center">
                                <ButtonPrimary loading={loader} onClick={() => onclick('', true)}>Show more</ButtonPrimary>
                            </div> : <></>}
                    </>
                ) : <></>}
            </div>



        </div>

    )
}

export default HomeFeatured