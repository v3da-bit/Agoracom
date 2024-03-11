import ButtonPrimary from '@/components/Button/ButtonPrimary';
import { DeleteBans, UserBan, UserBansPagination } from '@/requests/Profile';
import alertMessage from '@/utils/swalAlert';
import { Table } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function Bans({ id, ban, setBan, isIp }: any) {
    const style1 = 'mt-1 font-semibold text-base text-gray-600 dark:text-gray-200'
    const params = useParams()
    const [loader, setLoader] = useState(false);
    const [banClick, setBanClick] = useState(false);
    const [userBanned, setUserBanned] = useState(ban);
    const [pageSize, setPageSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0)
    const [globalLoader, setGlobalLoader] = useState(false);
    const [ip, setIp] = useState('')
    const [ipCheck, setIpCheck] = useState(false)
    const [reason, setReason] = useState('')
    const [data, setData] = useState([])
    useEffect(() => {
        fetchData(pageSize, 1)
        // fetchIP();
    }, [])

    const fetchIP = async () => {
        try {
            setGlobalLoader(true);
            let response: any = await axios.get('https://api.db-ip.com/v2/free/self');
            setGlobalLoader(false);
            console.log(response);
            // if (response.status === 200) {
            //     setIp(response?.data?.geoplugin_request)
            // }
        } catch (e: any) {
            console.log(e);
            setGlobalLoader(false);
        }
    }
    const fetchData = async (item: any, page: any) => {
        setGlobalLoader(true);
        const response = await UserBansPagination(id, item, page)
        setGlobalLoader(false);
        if (response.status === 200) {
            let dynamicData: any = []
            response.headers.pagy ? setTotal(JSON.parse(response.headers.pagy).count) : setTotal(response.data.length)
            response.data.map((value: any) => {
                dynamicData.push({
                    key: value?.id,
                    reason: value?.reason,
                    ip: value?.ip_address,
                    violation: value?.violation?.created_at ? moment(value?.violation?.created_at).format('DD-MM-YYYY  HH:MM ') : '',
                    time: moment(value?.created_at).format('lll'),
                })

            })
            setData(dynamicData)
        }
    }

    const deleteBans = async () => {
        try {
            setLoader(true)
            const response = await DeleteBans(params?.id, userBanned);
            if (response.status === 200) {
                alertMessage({
                    title: "Ban Removed Successfully",
                    text: "",
                    icon: "success",
                    timer: 3000
                });
                setUserBanned(0);
                setBan(false)
                fetchData(pageSize, 1)
            }
        } catch (e: any) {
            console.log(e);

        } finally {
            setLoader(false)
        }
    }

    const BanUser = async () => {
        setLoader(true)
        try {
            let payload = {
                ban: {
                    ip_address: ipCheck ? isIp : '',
                    reason: reason
                }
            }
            const response = await UserBan(params.id, payload)
            if (response.status === 201 || response.status === 200) {
                alertMessage({
                    title: "User Banned Successfully",
                    text: "",
                    icon: "success",
                    timer: 3000
                });
                setBanClick(false)
                fetchData(pageSize, 1)
                setUserBanned(response?.data?.ban_id)
                setBan(true)
            }
        } catch (e: any) {
            console.log(e);

        } finally {
            setLoader(false)
        }
    }
    const columns = [
        {
            title: "Reason",
            dataIndex: 'reason',
            sorter: (a: any, b: any) => a.reason.length - b.reason.length,
        }, {
            title: 'IP Address',
            dataIndex: 'ip',
            sorter: (a: any, b: any) => a.ip.length - b.ip.length,
        }, {
            title: 'Violation',
            dataIndex: 'violation',
            sorter: (a: any, b: any) => a.violation - b.violation,
        }, {
            title: 'Ban Timestamp',
            dataIndex: 'time',
            sorter: (a: any, b: any) => a.time.length - b.time.length,
        },];


    // const data = [{
    //     key: '1',
    //     user: "Vedant",
    //     reason: "Active Sponsored",
    //     timestamp: 'Sponsored Hub',
    // }, {
    //     key: '2',
    //     user: "antid",
    //     reason: "DActive Sponsored",
    //     timestamp: 'Sponsored Hub',
    // }, {
    //     key: '3',
    //     user: "Vedant",
    //     reason: "Active Sponsored",
    //     timestamp: 'Free Hub',
    // }, {
    //     key: '4',
    //     user: "Vedant",
    //     reason: "Active Sponsored",
    //     timestamp: 'Free Hub',
    // }];

    function onChange(pagination: any, filters: any, sorter: any) {
        // console.log('params', pagination, filters, sorter, pageSize);
        if (pageSize != pagination.pageSize || currentPage != pagination.current) {
            setPageSize(pagination.pageSize)
            setCurrentPage(pagination.current);
            fetchData(pagination.pageSize, pagination.current)
        }
    }
    return <div className='w-full p-6 bg-white'>
        {globalLoader ?
            <div className='flex items-center justify-center '>
                <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
            </div> : (
                <>
                    {banClick == false ?
                        <>
                            <div className="flex justify-end  items-start mb-4">
                                {
                                    userBanned > 0 ? (
                                        <ButtonPrimary sizeClass='py-2.5 px-5' loading={loader} onClick={() => deleteBans()}>Remove Ban</ButtonPrimary>
                                    ) : <>
                                        <ButtonPrimary sizeClass='py-2.5 px-5' onClick={() => setBanClick(true)}>Ban This User</ButtonPrimary>
                                    </>
                                }
                            </div>
                            <Table columns={columns} pagination={{ pageSizeOptions: ["10", "20", "25", "50"], total: total, current: currentPage, pageSize: pageSize, showSizeChanger: true }} dataSource={data} onChange={onChange} />
                        </> :
                        <div className="grid grid-flow-row gap-3 mb-4">
                            <div className='px-3 grid grid-cols-1 gap-2 w-full'>
                                <div className=" w-full flex items-start justify-start">
                                    <h1 className={style1}>Reason for ban:</h1>
                                </div>
                                <div className="flex-shrink-0 lg:mb-0 grow lg:grow-0 w-full">
                                    <form className="relative">
                                        <textarea
                                            required
                                            aria-required
                                            value={reason}
                                            onChange={(e: any) => setReason(e.target.value)}
                                            className="text-neutral-800 h-44 border-slate-200 rounded w-full px-6 dark:text-neutral-200 dark:bg-neutral-800 mb-4"
                                        />
                                    </form>
                                </div>

                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 py-3 px-3">
                                {isIp != 0 ? <div className="flex items-center ">
                                    <input id="default-checkbox" checked={ipCheck} onChange={(e: any) => setIpCheck(e.target.checked)} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">IP Address Ban {isIp} 0 users found using this IP</label>
                                </div> : <></>}
                            </div>
                            <div className="py-3 px-3 flex flex-row items-center justify-center  gap-4 max-sm:flex-col">
                                <ButtonPrimary loading={loader} onClick={BanUser}>Ban</ButtonPrimary>
                                <h2 >or</h2>
                                <ButtonPrimary className='bg-slate-100 hover:bg-slate-300' onClick={() => setBanClick(false)}><span className='text-red-600'>Cancel</span></ButtonPrimary>
                            </div>
                        </div>
                    }
                </>
            )}
    </div>
}

export default Bans