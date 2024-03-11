import ButtonPrimary from '@/components/Button/ButtonPrimary';
import Input from '@/components/Input/Input';
import { UserActivitiesPagination, UserAddAdjustment } from '@/requests/Profile';
import alertMessage from '@/utils/swalAlert';
import { Table } from 'antd';
import moment from 'moment';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function Activities({ id }: any) {

    const [pageSize, setPageSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0)
    const [globalLoader, setGlobalLoader] = useState(false);
    const [data, setData] = useState([])
    const [loader, setLoader] = useState(false);
    const [adjustment,setAdjustment]=useState('')
    const [activityClick, setActivityClick] = useState(false)
    const params=useParams()
    useEffect(() => {
        fetchData(pageSize, 1)
    }, [])
    const fetchData = async (item: any, page: any) => {
        setGlobalLoader(true);
        const response = await UserActivitiesPagination(id, item, page)
        setGlobalLoader(false);
        // console.log(response.data);

        if (response.status === 200) {
            let dynamicData: any = []
            setTotal(JSON.parse(response.headers.pagy).count)
            // setData(response.data)
            response.data.map((value: any) => {
                dynamicData.push({
                    key: value?.id,
                    action: value?.activity_name,
                    company_id: value?.company?.id,
                    hub: value?.company?.name,
                    date: moment(value?.created_at).format('lll'),
                    points: value?.points

                })

            })
            setData(dynamicData)
        }
    }
    const columns = [
        {
            title: "Action",
            dataIndex: 'action',
            sorter: (a: any, b: any) => a?.action?.length - b?.action?.length,
        }, {
            title: 'Hub',
            dataIndex: 'hub',
            sorter: (a: any, b: any) => a?.hub?.length - b?.hub?.length,
            render: (text: any, record: any) => <Link className='text-secondary-400' href={`/company/${record?.company_id}`}>{text}</Link>
        }, {
            title: 'Date',
            dataIndex: 'date',
            sorter: (a: any, b: any) => a.date - b.date,
        }, {
            title: 'Points',
            dataIndex: 'points',
            sorter: (a: any, b: any) => a?.points?.length - b?.points?.length,
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
        const submitAdjustment=async()=>{
            setLoader(true)
            try{
                let payload={
                    adjustment:adjustment
                }
                const response=await UserAddAdjustment(params.id,payload)
                console.log(response);
                if (response.status===201) {
                    alertMessage({
                        title: "Adjustment Added Successfully",
                        text: "",
                        icon: "success",
                        timer: 3000
                    });
                    setActivityClick(false)
                    fetchData(pageSize,1)
                }
                
            }catch(e:any){
                console.log(e);
                
            }finally{
                setLoader(false)
            }
        }
    function onChange(pagination: any, filters: any, sorter: any) {
        if (pageSize != pagination.pageSize || currentPage != pagination.current) {
            setPageSize(pagination.pageSize)
            setCurrentPage(pagination.current);
            fetchData(pagination.pageSize, pagination.current)
        }
    }
    return <div className='w-full p-6 bg-white'>
        {activityClick == false ? <div className="flex justify-end  items-start mb-4">
            <ButtonPrimary sizeClass='py-2.5 px-5' onClick={() => setActivityClick(true)}>Add Ajustment</ButtonPrimary>
        </div> : <div className="grid grid-flow-col gap-2 px-3 py-1 mb-4">
            <div className='flex justify-end items-center'>
                <h1>Points Adjustment (+/-):</h1>
            </div>
            <div className="flex-shrink-0 flex items-center   lg:mb-0 grow lg:grow-0  w-full">
                <form className="relative">
                    <Input
                        required
                        aria-required
                        placeholder=""
                        type="number"
                        value={adjustment}
                        onChange={(e) =>setAdjustment(parseInt(e.target.value))}
                        sizeClass='w-full'
                        className="text-neutral-800  px-6 dark:text-neutral-200 rounded-md"
                    />
                </form>
            </div>
            <div className="py-3 px-3 flex flex-row items-center justify-start  gap-4 max-sm:flex-col">
                <ButtonPrimary onClick={submitAdjustment} loading={loader}>Commit</ButtonPrimary>
                <h2>or</h2>
                <ButtonPrimary className='bg-slate-100 hover:bg-slate-300' onClick={() => setActivityClick(false)}><span className='text-red-600'>Cancel</span></ButtonPrimary>
            </div>
        </div> }
        {globalLoader ?
            <div className='flex items-center justify-center '>
                <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
            </div>
            : (activityClick == false ?
                <Table columns={columns} pagination={{ pageSizeOptions: ["10", "20", "25", "50"], total: total, current: currentPage, pageSize: pageSize, showSizeChanger: true }} dataSource={data} onChange={onChange} />
            :<></>)}</div>
}

export default Activities