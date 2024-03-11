import ButtonSecondary from '@/components/Button/ButtonSecondary';
import { DeleteRating, UserRatingsPagination } from '@/requests/Profile';
import alertMessage from '@/utils/swalAlert';
import { Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'

function Ratings({ id, name }: any) {

    const [pageSize, setPageSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0)
    const [globalLoader, setGlobalLoader] = useState(false);
    const [selected, setSelected]: any = useState([]);
    const [selectedBy, setSelectedBy]: any = useState([]);
    const [data, setData] = useState([])
    const [byData, setByData] = useState([])
    const [deleteLoader, setDeleteLoader] = useState(false);
    useEffect(() => {
        fetchData(pageSize, 1)
    }, [])
    const fetchData = async (item: any, page: any) => {
        setGlobalLoader(true);
        const response = await UserRatingsPagination(id, item, page)
        setGlobalLoader(false);
        // console.log(response.data);

        if (response.status === 200) {
            let dynamicData: any = []
            let byValues: any = []
            response.headers.pagy ? setTotal(JSON.parse(response.headers.pagy).count) : setTotal(response.data.ratings_for_user?.length)
            setData(response.data)
            response?.data?.ratings_for_user?.map((value: any) => {

                dynamicData.push({
                    key: value?.id,
                    id: value?.id,
                    ratings: value.rater?.username,
                    created_at: value?.rater?.created_at,
                    rank: value.rater?.authority_name,
                    avg: value.rater?.rating_avg,
                    points: value?.rating
                })

            })
            response?.data?.ratings_by_user?.forEach((value: any) => {
                byValues.push({
                    key: value?.id,
                    id: value?.id,
                    ratings: value.rated?.username,
                    created_at: value?.rated?.created_at,
                    rank: value.rated?.authority_name,
                    avg: value.rated?.rating_avg,
                    points: value?.rating
                })
            });
            setData(dynamicData)
            setByData(byValues);
        }
    }
    const deleteRatingData = async () => {
        try {
            setDeleteLoader(true);
            let ids = selected.toString();
            const result: any = await DeleteRating(ids);
            if (result?.status === 200) {
                alertMessage({
                    title: "Rating deleted successfully",
                    text: "",
                    icon: "success",
                    timer: 3000
                });
                setSelected([]);
                setSelectedBy([]);
                fetchData(pageSize, 1)
            }
        }
        catch (e: any) {
            alertMessage({
                title: "Something went wrong. Try again",
                text: "",
                icon: "error",
                timer: 2500
            });
        } finally {
            setDeleteLoader(false)
        }
    }
    const columns = [
        {
            title: `Recent Ratings of ${name} by:`,
            dataIndex: 'ratings',
            sorter: (a: any, b: any) => a.ratings.length - b.ratings.length,
        }, {
            title: `Member Since`,
            dataIndex: 'created_at',
            sorter: (a: any, b: any) => a.created_at.length - b.created_at.length,
            render: (text: any, record: any) => {
                return <a>{moment(text).format('MM-DD-YYYY HH:mm')}</a>
            },
        }, {
            title: 'Rank',
            dataIndex: 'rank',
            sorter: (a: any, b: any) => a.rank.length - b.rank.length,
        }, {
            title: 'Average',
            dataIndex: 'avg',
            sorter: (a: any, b: any) => a.avg - b.avg,
        }, {
            title: 'Rating',
            dataIndex: 'points',
            sorter: (a: any, b: any) => a.points.length - b.points.length,
        }, {
            title: '',
            dataIndex: 'select',
            render: (text: any, record: any) => {
                let preCheck = selected.includes(record?.id);
                return <input type='checkbox' checked={preCheck} onChange={(e: any) => {
                    const checked = e.target.checked;
                    if (checked) {
                        let selectedValues = [...selected]
                        selectedValues.push(record.id);
                        setSelected(selectedValues)
                    } else {
                        let selectedValues = selected.filter((item: any) => item != record.id);
                        setSelected(selectedValues)
                    }
                }} />
            }
            // sorter: (a: any, b: any) => a.points.length - b.points.length,
        }];

    const byColumns = [
        {
            title: `Recent Ratings by ${name}:`,
            dataIndex: 'ratings',
            sorter: (a: any, b: any) => a.ratings.length - b.ratings.length,
        }, {
            title: `Member Since`,
            dataIndex: 'created_at',
            sorter: (a: any, b: any) => a.created_at.length - b.created_at.length,
            render: (text: any, record: any) => {
                return <a>{moment(text).format('MM-DD-YYYY HH:mm')}</a>
            },
        }, {
            title: 'Rank',
            dataIndex: 'rank',
            sorter: (a: any, b: any) => a.rank.length - b.rank.length,
        }, {
            title: 'Average',
            dataIndex: 'avg',
            sorter: (a: any, b: any) => a.avg - b.avg,
        }, {
            title: 'Rating',
            dataIndex: 'points',
            sorter: (a: any, b: any) => a.points.length - b.points.length,
        }, {
            title: '',
            dataIndex: 'select',
            render: (text: any, record: any) => {
                let preCheck = selectedBy.includes(record?.id);
                return <input type='checkbox' checked={preCheck} onChange={(e: any) => {
                    const checked = e.target.checked;
                    if (checked) {
                        let selectedValues = [...selectedBy]
                        selectedValues.push(record.id);
                        setSelectedBy(selectedValues)
                    } else {
                        let selectedValues = selectedBy.filter((item: any) => item != record.id);
                        setSelectedBy(selectedValues)
                    }
                }} />
            }
            // sorter: (a: any, b: any) => a.points.length - b.points.length,
        }];


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
            </div>
            : (
                <>
                    <div className='flex justify-end'>
                        <ButtonSecondary loading={deleteLoader} className='mb-3' onClick={deleteRatingData} disabled={!selectedBy.length || deleteLoader}>Delete {selectedBy.length > 0 ? `(${selectedBy.length})` : ''}</ButtonSecondary>
                    </div>
                    <Table columns={byColumns} pagination={{ pageSizeOptions: ["10", "20", "25", "50"], total: total, current: currentPage, pageSize: pageSize, showSizeChanger: true }} dataSource={byData} onChange={onChange} />
                    <hr className='my-6' />
                    <div className='flex justify-end'>
                        <ButtonSecondary loading={deleteLoader} className='mb-3' onClick={deleteRatingData} disabled={!selected.length || deleteLoader}>Delete {selected.length > 0 ? `(${selected.length})` : ''}</ButtonSecondary>
                    </div>
                    <Table columns={columns} pagination={{ pageSizeOptions: ["10", "20", "25", "50"], total: total, current: currentPage, pageSize: pageSize, showSizeChanger: true }} dataSource={data} onChange={onChange} />
                </>
            )}</div>
}

export default Ratings