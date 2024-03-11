import ButtonPrimary from '@/components/Button/ButtonPrimary';
import ButtonSecondary from '@/components/Button/ButtonSecondary';
import Select from '@/components/Select/Select';
import { UserAddAuthority, UserAuthoritiesPagination, UserAuthorityVisible, deleteAuthority } from '@/requests/Profile';
import alertMessage from '@/utils/swalAlert';
import { Table } from 'antd';
import moment from 'moment';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function Authorities({ id }: any) {
    // console.log(id);
    const [loader, setLoader] = useState(false);
    const params: any = useParams()
    const [pageSize, setPageSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0)
    const [globalLoader, setGlobalLoader] = useState(false);
    const [data, setData] = useState([])
    const [authorityClick, setAuthorityClick] = useState(false)
    const [authority, setAuthority] = useState('')
    const [deleteLoader, setDeleteLoader] = useState(false)
    const [visibleLoader, setVisibleLoader] = useState(0)
    const [selected, setSelected]: any = useState([]);
    const [authorityDropDown, setAuthorityDropDown] = useState({

        0: 'Male',
        1: 'Female',
        3: 'Not Specified'

    })
    useEffect(() => {
        fetchData(pageSize, 1)
    }, [])
    const fetchData = async (item: any, page: any) => {
        setGlobalLoader(true);
        const response = await UserAuthoritiesPagination(id, item, page)
        setGlobalLoader(false);
        // console.log(response.data);

        if (response.status === 200) {
            let dynamicData: any = []
            setTotal(response.headers.pagy ? JSON.parse(response.headers.pagy).count : response.data.authorities?.length)
            // setData(response.data)
            response.data.authorities?.map((value: any) => {
                dynamicData.push({
                    key: value?.id,
                    hidden: value?.hidden,
                    authority: value?.authority_group_name,
                    hub: value.company?.name,
                    company: value.company?.hub_type,
                    granted: value?.earned ? 'Yes' : 'No'

                })

            })
            setData(dynamicData)
            let dropDown: any = {}
            response.data.company_list?.map((val: any, index: any) => {
                if (index === 0) {
                    setAuthority(val?.id)
                }
                dropDown[val?.id] = val?.name;
            })
            setAuthorityDropDown(dropDown)
        }
    }

    const authorityAdd = async () => {
        setLoader(true)
        try {
            let payload = {
                authority: {
                    user_id: parseInt(params?.id), // user
                    company_id: authority, // from dropdown
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

    const deleteSelectedAuthority = async () => {
        setDeleteLoader(true)
        try {
            const response = await deleteAuthority(selected)
            if (response?.status === 200) {
                alertMessage({
                    title: "Authority deleted Successfully",
                    text: "",
                    icon: "success",
                    timer: 3000
                });
                setSelected([])
                fetchData(pageSize, 1)
            }

        } catch (e: any) {
            console.log(e);

        } finally {
            setDeleteLoader(false)
        }
    }

    const authorityVisible = async (visible: boolean, id: any) => {
        setVisibleLoader(id)
        try {
            const payload = {
                authority: {
                    hidden: visible
                }

            }

            const response = await UserAuthorityVisible(id, payload)
            if (response.status === 200) {
                alertMessage({
                    title: "Visibility updated Successfully",
                    text: "",
                    icon: "success",
                    timer: 3000
                });
                // setBanClick(false)
                fetchData(pageSize, 1)
            }
        } catch (e: any) {
            console.log(e);

        } finally {
            setVisibleLoader(0)
        }
    }

    const columns = [
        {
            title: '',
            dataIndex: 'check',
            render: (text: any, record: any) => {
                // console.log(record);

                let preCheck = selected.includes(record?.key);
                return <input type='checkbox' checked={preCheck} onChange={(e: any) => {
                    const checked = e.target.checked;
                    if (checked) {
                        let selectedValues = [...selected]
                        selectedValues.push(record.key);
                        setSelected(selectedValues)
                    } else {
                        let selectedValues = selected.filter((item: any) => item != record.key);
                        setSelected(selectedValues)
                    }
                }} />
            }
            // sorter: (a: any, b: any) => a.authority.length - b.authority.length,
        }, {
            title: "Visible",
            dataIndex: 'hidden',
            sorter: (a: any, b: any) => a.visible.length - b.visible.length,
            render: (text: any, record: any) => {
                return record?.hidden ? <ButtonPrimary loading={visibleLoader === record?.key} onClick={() => authorityVisible(false, record?.key)} sizeClass='py-3 px-4' >Yes</ButtonPrimary> : <ButtonSecondary className=' bg-slate-100  hover:bg-slate-300' sizeClass='py-3 px-4' loading={visibleLoader === record?.key} onClick={() => authorityVisible(true, record?.key)}><span className=' text-red-500'>No</span></ButtonSecondary>
            }
        }, {
            title: 'Authority',
            dataIndex: 'authority',
            sorter: (a: any, b: any) => a.authority.length - b.authority.length,
        }, {
            title: 'Hub',
            dataIndex: 'hub',
            sorter: (a: any, b: any) => a.hub.length - b.hub.length,
        }, {
            title: 'Company Type',
            dataIndex: 'company',
            sorter: (a: any, b: any) => a.company.length - b.company.length,
        }, {
            title: 'Granted',
            dataIndex: 'granted',
            sorter: (a: any, b: any) => a.granted.length - b.granted.length,
        },];

    const handleAuthorityChange = (val: any) => {
        setAuthority(val);
    }
    function onChange(pagination: any, filters: any, sorter: any) {
        // console.log('params', pagination, filters, sorter, pageSize);
        if (pageSize != pagination.pageSize || currentPage != pagination.current) {
            setPageSize(pagination.pageSize)
            setCurrentPage(pagination.current);
            fetchData(pagination.pageSize, pagination.current)
        }
    }
    return <div className='w-full p-6 bg-white'>
        {authorityClick == false ?
            <div className="flex justify-end  items-start mb-4">
                <ButtonPrimary sizeClass='py-2.5 px-5' onClick={() => setAuthorityClick(true)}>Add Authority</ButtonPrimary>
                <ButtonSecondary sizeClass='py-3 px-5' loading={deleteLoader} onClick={deleteSelectedAuthority} disabled={!selected.length} className='ml-2'>Delete {selected?.length > 0 ? `(${selected?.length})` : ''}</ButtonSecondary>
            </div> :
            <div className="flex flex-row gap-2 justify-start items-center w-full mb-4">
                <Select className='lg:w-fit' rounded='rounded-full' menuDropdown={authorityDropDown} selectedValue={authority} setMenu={handleAuthorityChange} />
                <div className="py-3 px-3 flex flex-row items-center justify-center  gap-4 max-sm:flex-col">
                    <ButtonPrimary onClick={authorityAdd} loading={loader}>Add</ButtonPrimary>
                    <h2>or</h2>
                    <ButtonPrimary className='bg-slate-100 hover:bg-slate-300' onClick={() => setAuthorityClick(false)}><span className='text-red-600'>Cancel</span></ButtonPrimary>
                </div>
            </div>}
        {globalLoader ?
            <div className='flex items-center justify-center '>
                <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
            </div>
            :
            // (authorityClick == false ?
            <Table columns={columns} pagination={{ pageSizeOptions: ["10", "20", "25", "50"], total: total, current: currentPage, pageSize: pageSize, showSizeChanger: true }} dataSource={data} onChange={onChange} />
            // : <></>)
        }
    </div>
}

export default Authorities