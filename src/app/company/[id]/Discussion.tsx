import ButtonCircle from '@/components/Button/ButtonCircle';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import Card23 from '@/components/Card23/Card23';
import Input from '@/components/Input/Input';
import Nav from '@/components/Nav/Nav';
import NavItem from '@/components/NavItem/NavItem';
import Select from '@/components/Select/Select';
import { fetchDicussionThread, getDiscussion } from '@/requests/Companies';
import { getCompanies } from '@/requests/Home';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Table } from 'antd';
import moment from 'moment';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Like from '@/images/like.png';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';


function Discussion() {
    const [discussion, setDiscussion] = useState([]);
    const params = useParams();
    const router = useRouter();
    const [pageSize, setPageSize] = useState(5)
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0)
    const [info, setInfo]: any = useState({});
    const [discussion1, setDiscussion1] = useState([])
    const [userData, setUserData]: any = useState({});
    const [keyword, setKeyword]: any = useState('');
    const [globalLoader, setGlobalLoader] = useState(false)
    const [currentTab, setCurrentTab] = useState(2);
    const [loader, setLoader] = useState(false)
    const tabs = [
        { id: 1, title: "Threads" },
        { id: 2, title: "Posts" },
    ]

    const [selectedDiscussion, setSelectedDiscussion] = useState("discussions");

    const [pageInfo, setPageInfo] = useState({

        discussions: {
            showMore: false,
            page: 0
        },
    })
    const [loading, setLoading] = useState({

        followedHub: false,

    })
    const onTypeChange = (val: any) => {
        discussionPosts(val)
        setSelectedDiscussion(val);
    }
    const fetchData = async (id: any) => {
        discussionPosts();
    }

    const searchKeyword = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        discussionPosts();
    }

    const changeTab = (id: any) => {
        setCurrentTab(id);
        if (id === 1) {
            discussionThreads('', currentPage);
        } else {
            discussionPosts()
        }
    }

    const discussionPosts = async (newType: string = '', loadMore = false) => {
        if (loadMore) {
            setLoading({
                ...loading,
                followedHub: true
            })
        } else {
            setGlobalLoader(true)
        }
        const newPage = loadMore ? pageInfo.discussions.page + 1 : 1;
        let payload: any = { page: newPage };
        if (keyword) {
            payload["q"] = keyword
        }
        const type = newType ? newType : selectedDiscussion;
        let result: any = await getDiscussion(params.id, payload, type);
        let newData: any = loadMore ? [...discussion, ...result.data] : result.data;
        let page = JSON.parse(result?.headers.toJSON()?.pagy);

        let pagePayload: any = { ...pageInfo };
        pagePayload["discussions"] = {
            showMore: page.next != null,
            page: newPage
        }
        if (loadMore) {
            setLoading({
                ...loading,
                followedHub: false
            })
        } else {
            setGlobalLoader(false)
        }
        setPageInfo(pagePayload);
        setDiscussion(newData);
    }
    const columns = [
        {
            title: "Message Title",
            dataIndex: 'user',
            sorter: (a: any, b: any) => a.user.length - b.user.length,
        }, {
            title: 'Rating',
            dataIndex: 'rating',
            sorter: (a: any, b: any) => a.author.length - b.author.length,
        }, {
            title: 'RE',
            dataIndex: 'count',
            sorter: (a: any, b: any) => a.author.length - b.author.length,
        }, {
            title: 'Author',
            dataIndex: 'author',
            sorter: (a: any, b: any) => a.author.length - b.author.length,
        }, {
            title: 'Date',
            dataIndex: 'createdDate',
            sorter: (a: any, b: any) => a.createdDate.length - b.createdDate.length,
        }];
    const discussionThreads = async (newType: string = '', newPage: any) => {
        let payload: any = { page: newPage, items: pageSize };
        if (keyword) {
            payload["q"] = keyword
        }
        const type = newType ? newType : selectedDiscussion;
        setLoader(true)
        let result: any = await fetchDicussionThread(params.id, payload);
        setLoader(false)
        let newData: any = []

        setTotal(JSON.parse(result?.headers.toJSON()?.pagy).count)
        result.data.map((value: any) => {
            newData.push({
                key: value?.id,
                user: <Link href={`/company/${params.id}/discussion/${value?.id}`}>{value?.title}</Link>,
                rating: <div className='flex'><Image src={Like} width="20" alt="" height="15" className="mr-1" />{value?.rating}</div>,
                count: value?.responses,
                author: value?.username,
                createdDate: moment(value?.created_at).format('lll'),

            })

        })
        let page = JSON.parse(result?.headers.toJSON()?.pagy);

        let pagePayload: any = { ...pageInfo };
        pagePayload["discussions"] = {
            showMore: page.next != null,
            page: newPage
        }

        setPageInfo(pagePayload);
        setDiscussion(newData);
    }
    useEffect(() => {
        if (params.id) {
            fetchData(params.id);

        } else {
            router.back();
        }
    }, [])
    const menuDropdown: any = {
        'discussions': "Newest",
        'discussions_featured': "Featured",
        'discussions_top_rated': "Top Rated",
        'discussions_off_topic': "Off-Topic"
    };
    function onChange(pagination: any, filters: any, sorter: any) {
        if (pageSize != pagination.pageSize || currentPage != pagination.current) {
            setPageSize(pagination.pageSize)
            setCurrentPage(pagination.current);
            console.log(pagination.current);
            discussionThreads('', pagination.current)


        }
    }
    return (
        <div className="mt-3 px-3 py-3 border-t-2 w-full border-black grid grid-flow-row gap-5">
            <div className='flex !justify-between'>
                <h1 className='text-md mt-5 md:text-xl text-dark xl:text-3xl '>
                    <b>Discussion</b>
                </h1>
                <Nav
                    className="sm:space-x-2 rtl:space-x-reverse !w-fit mt-1"
                    containerClassName="relative flex overflow-x-auto text-sm md:text-base"
                >
                    {tabs.map((item: any, index: number) => (
                        <NavItem
                            className='px-4 py-3 text-sm'
                            key={item.id}
                            isActive={currentTab === item.id}
                            onClick={() => changeTab(item.id)}
                        >
                            {item.title}
                        </NavItem>
                    ))}
                </Nav>
            </div>
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
                                    <Select menuDropdown={menuDropdown} selectedValue={discussion1} setMenu={onTypeChange} />
                                </div>

                                <ButtonPrimary className=' bg-white text-md hover:bg-slate-300 border border-slate-300' sizeClass=' py-3 px-5'>
                                    {/* <PlusIcon className="w-4 mr-1 h-4 font-semibold text-blue-600" /> */}
                                    <span className='text-sm text-blue-600'> Create a Post</span>
                                </ButtonPrimary>
                            </div>
                        </div>
                        <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
                            {currentTab == 1 ?
                                (loader ?
                                    <div className='flex items-center justify-center '>
                                        <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                    </div>
                                    :
                                    <Table columns={columns} pagination={{ pageSizeOptions: [], total: total, current: currentPage, pageSize: pageSize, showSizeChanger: true }} dataSource={discussion} onChange={onChange} />
                                )
                                :
                                discussion?.map((post: any, index: number) => {

                                    post.href = '/';
                                    console.log(currentTab);


                                    // if(index <= 4) {
                                    return (
                                        <Card23
                                            className="p-4 xl:px-5 xl:py-6 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                                            key={post.id}
                                            post={post}
                                            avatar={post.avatar_url}
                                        />
                                    )
                                }
                                    // }
                                )
                            }



                        </div>
                        {pageInfo.discussions.showMore && currentTab == 2 ?
                            <div className="flex mt-10 justify-center items-center">
                                <ButtonPrimary loading={loading.followedHub} onClick={() => discussionPosts('', true)}>Show more</ButtonPrimary>
                            </div> : <></>}
                    </>
            }
        </div>
    )
}

export default Discussion