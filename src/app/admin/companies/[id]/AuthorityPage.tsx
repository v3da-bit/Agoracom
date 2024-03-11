'use client';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import ButtonSecondary from '@/components/Button/ButtonSecondary';
import Heading from '@/components/Heading/Heading';
import Input from '@/components/Input/Input';
import Nav from '@/components/Nav/Nav';
import NavItem from '@/components/NavItem/NavItem';
import { CompanyAuthoritiesPagination, UserAddAuthority } from '@/requests/Profile';
import { getSearch } from '@/requests/Search';
import alertMessage from '@/utils/swalAlert';
import { Table } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

function AuthorityPage() {
    const style = 'font-semibold text-xl text-white max-md:text-md'
    const style2 = ' font-semibold text-right text-base text-dark'
    const columns = [
        {
            title: "User",
            dataIndex: 'User',
            sorter: (a: any, b: any) => a?.User?.length - b?.User?.length,
        }, {
            title: 'Visible',
            dataIndex: 'Visible',
            sorter: (a: any, b: any) => a?.Visible?.length - b?.Visible?.length,
        }, {
            title: 'Authority',
            dataIndex: 'Authority',
            sorter: (a: any, b: any) => a.Authority?.length - b.Authority?.length,
        }, {
            title: 'Granted',
            dataIndex: 'Granted',
            sorter: (a: any, b: any) => a?.Granted?.length - b?.Granted?.length,
        },];
        const [loader, setLoader] = useState(false);
    
    const [industry, setIndustry] = useState('posts');
    const router = useRouter()
    const [data, setData] = useState([])
    const [pageSize, setPageSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0)
    const [globalLoader, setGlobalLoader] = useState(false);
    const [authorityClick, setAuthorityClick] = useState(false)
    const [userid, setUserId] = useState('')

    // const [visible,setVisible]=useState(false)
    const [items, setItem] = useState([])


    const params = useParams()
    useEffect(() => {
        fetchData(pageSize, currentPage)
    }, [])
    const fetchData = async (item: any, page: any) => {
        setGlobalLoader(true)
        const response = await CompanyAuthoritiesPagination(params.id, item, page)
        setGlobalLoader(false)

        if (response.status === 200) {
            let dynamicData: any = []
            setTotal(JSON.parse(response.headers.pagy).count)
            // setData(response.data)
            response.data.map((value: any) => {
                dynamicData.push({
                    key: value?.id,
                    User: value?.company?.name,
                    Visible: value?.hidden ? 'No' : 'Yes',
                    Authority: value?.authority_group_name,
                    Granted: value?.earned ? 'Yes' : 'No'

                })

            })
            setData(dynamicData)
        }
    }
    const authorityAdd = async () => {
        setLoader(true)
        try {
            let payload = {
                authority: {
                    user_id: userid, // user
                    company_id: parseInt(params.id), // from dropdown
                }
            }
            const response = await UserAddAuthority(payload)
            if (response?.status === 201) {
                alertMessage({
                    title: "Authority created Successfully",
                    text: "",
                    icon: "success",
                    timer: 3000
                });
                setAuthorityClick(false)
                fetchData(pageSize, 1)
            }

        } catch (e: any) {
            console.log(e);

        } finally {
            setLoader(false)
        }
    }
    console.log(userid);
    
    const handleOnSearch = async (string: any, results: any) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        if (string.length > 1) {
            const response = await getSearch(string)
            const { members } = response.data
            console.log(members)
            // setItem(members)
            let id, name, array: any = []
            await members.map((value: any) => {
                id = value.id
                name = value.username
                array.push({ id: id, name: value.username })
            })
            console.log(array);

            setItem(array)

        }
        // setUserId(string)
        // console.log(string, results)
    }
    const handleOnHover = (result: any) => {
        // the item hovered
        console.log(result)
    }

    const handleOnSelect = (item: any) => {
        // the item selected

        setUserId(item.id)
        // console.log(item.name)
    }

    const handleOnFocus = () => {
        console.log('Focused')
    }

    const formatResult = (item: any) => {
        return (
            <>

                <span className='' style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
            </>
        )
    }
    function onChange(pagination: any, filters: any, sorter: any) {
        if (pageSize != pagination.pageSize || currentPage != pagination.current) {
            setPageSize(pagination.pageSize)
            setCurrentPage(pagination.current);
            fetchData(pagination.pageSize, pagination.current)
        }
    }
    return (
        <div className='w-full p-6 bg-white'>
            {authorityClick == false ? <div className="flex justify-end  items-start mb-4">
                <ButtonPrimary sizeClass='py-2.5 px-5' onClick={() => setAuthorityClick(true)}>Add Leader</ButtonPrimary>
            </div> :
                <div className=" container w-auto flex flex-row  gap-3 mb-4">
                    <div className='px-3 grid grid-cols-3 gap-2'>
                        <div className=" w-full flex justify-end items-center">
                            <h1 className={style2}>User Name:</h1>
                        </div>
                        <div className=" w-full flex justify-end items-center">
                        <div className="flex-shrink-0 w-full">
                            <ReactSearchAutocomplete
                                items={items}
                                styling={{
                                    borderRadius: '8px',

                                }}

                                placeholder='Search User Id'
                                onSearch={handleOnSearch}
                                onHover={handleOnHover}
                                onSelect={handleOnSelect}
                                onFocus={handleOnFocus}
                                autoFocus
                                formatResult={formatResult}
                            />
                        </div>
                        </div>
                        <div className='py-3 px-3 flex flex-row items-center justify-center  gap-4 max-sm:flex-col'>
                            <ButtonPrimary loading={loader} onClick={authorityAdd}>Add</ButtonPrimary>
                            <h2 className={style2}>or</h2>
                            <ButtonPrimary onClick={() => setAuthorityClick(false)} className='bg-slate-100 hover:bg-slate-300'><span className='text-red-600'>Cancel</span></ButtonPrimary>
                        </div>

                    </div>
                </div>}
            {globalLoader ?
                <div className='flex items-center justify-center '>
                    <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                </div>
                : (authorityClick == false ?
                    <Table columns={columns} pagination={{ pageSizeOptions: ["10", "20", "25", "50"], total: total, current: currentPage, pageSize: pageSize, showSizeChanger: true }} dataSource={data} onChange={onChange} />
                    : <></>)}</div>
    )
}

export default AuthorityPage