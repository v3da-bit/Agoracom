'use client';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import Heading from '@/components/Heading/Heading';
import Input from '@/components/Input/Input';
import Nav from '@/components/Nav/Nav';
import NavItem from '@/components/NavItem/NavItem';
import { AddCompanyManager, CompanyManagersPagination, DeleteManager, UpdateCompanyManager, getCompanyManager } from '@/requests/Profile';
import alertMessage from '@/utils/swalAlert';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Table } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function ManagementPage() {
  const params = useParams()

  const initialData = {
            company_id:params.id,
            name:'',
            role:'',
            bio:'',
            photo:'',
            ordering:'',
            removed_at:''
}
const [data1, setData1] = useState(initialData)
const [internalLoader,setInternalLoader]=useState(false)
const style = 'font-semibold text-xl text-white max-md:text-md'
const style2 = ' font-semibold text-right text-base text-dark'
const [industry, setIndustry] = useState('posts');
const router = useRouter()
const [data, setData] = useState([])
const [pageSize, setPageSize] = useState(10)
const [currentPage, setCurrentPage] = useState(1);
const [total, setTotal] = useState(0)
const [globalLoader, setGlobalLoader] = useState(false);
const [managerClick, setmanagerClick] = useState(false)
const [loader, setLoader] = useState(false)
const [isPatch, setIsPatch] = useState(false)
const [id, setId] = useState(0)

const columns = [
  {
    title: "Manager Name",
    dataIndex: 'name',
    sorter: (a: any, b: any) => a?.name?.length - b?.name?.length,
  },
  {
    title: 'Order',
    dataIndex: 'order',
    sorter: (a: any, b: any) => a?.order - b?.order,
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
  }];
useEffect(() => {
  fetchData(pageSize, currentPage)
}, [])
const fetchData = async (item: any, page: any) => {
  setGlobalLoader(true)
  const response = await CompanyManagersPagination(params.id, item, page)
  setGlobalLoader(false)

  if (response.status === 200) {
    let dynamicData: any = []
    setTotal(JSON.parse(response.headers.pagy).count)
    // setData(response.data)
    response.data.map((value: any) => {
      dynamicData.push({
        key: value?.id,
        name: value?.name,
        order: value?.ordering,
        actions: <span className='flex'>
        <button className='bg-transparent' onClick={async() => {
          setmanagerClick(true)
          setId(value?.id)
          setIsPatch(true)
          try{
            setInternalLoader(true)
            const response=await getCompanyManager(value?.id)
            console.log(response.data);
            setData1(response.data)
            // setData1({
            //     ...data1,
            //     // company_id: value?.id,
            //     name:value?.name,
            //     role:value?.role?value.role:'',
            //     bio:value?.bio?value.bio:'',
            //     photo:value?.photo?value?.photo:'',
            //     ordering:value?.ordering,
            //     removed_at:value?.removed_at?value?.removed_at:''
            // })
          }catch(e:any){
            console.log(e);
            
          }finally{
            setInternalLoader(false)
          }
           
            
        }}><span className='pl-1 text-secondary-400 font-semibold'>Edit </span></button>&nbsp; |
        <button className='bg-transparent' onClick={() => deleteManager(value?.id)}><span className='pl-1 text-secondary-400 font-semibold'>Delete</span></button>
    </span>
      })

    })
    setData(dynamicData)
  }
}
const reset=()=>{
  setData1(initialData);
}
const AddManager = async () => {
  setLoader(true)
  if(data1.role.length==0){
    document.getElementById('alert').style.display='block'
    setLoader(false)
  }else if(data1.bio.length==0){
    document.getElementById('alert2').style.display='block'
    setLoader(false)
  }else{
    document.getElementById('alert').style.display='none'
    document.getElementById('alert2').style.display='none'
  try {
    // company_id:params.id,
    // name:'',
    // role:'',
    // bio:'',
    // photo:'',
    // ordering:'',
    // removed_at:''
     console.log(data1.photo);
      const fd: any = new FormData();
      fd.append("manager[company_id]", params.id);
      fd.append('manager[name]',data1.name)
      fd.append('manager[role]',data1.role)
      fd.append('manager[bio]',data1.bio)
      fd.append('manager[photo]',data1.photo)
      fd.append('manager[ordering]',data1.ordering)
      fd.append('manager[removed_at]',data1.removed_at)
      
      if (isPatch) {
        console.log(fd.get('photo'));
          const response = await UpdateCompanyManager(id!=0?id:data1.company_id, fd)
          console.log(response);
          if (response.status == 200) {
              alertMessage({
                  title: "Manager Updated successfully!",
                  text: "",
                  icon: "success",
                  timer: 3000
              });
              setmanagerClick(false)
              setData1(initialData)
              fetchData(pageSize, 1)
          }
      } else {
        console.log(fd.get('photo'));
        
          const response = await AddCompanyManager(fd)
          console.log(response);
          if (response.status == 201) {
              alertMessage({
                  title: "Manager created successfully!",
                  text: "",
                  icon: "success",
                  timer: 3000
              });
              setmanagerClick(false)
              setData1(initialData)
              fetchData(pageSize, 1)
          }
      }

  } catch (e: any) {
      console.log(e);

  } finally {
      setIsPatch(false)
      setLoader(false)
  }
}
}
const deleteManager = async (id: any) => {
  try {
      const response = await DeleteManager(id)
      console.log(response);
      if (response.status == 200) {
          alertMessage({
              title: "Manager Deleted successfully!",
              text: "",
              icon: "success",
              timer: 3000
          });
          fetchData(pageSize, 1)
      }
  } catch (e: any) {
      console.log(e);
  }
}
const handleChange = (key: any, val: any) => {
  setData1({
      ...data1,
      [key]: val
  })
}
function onChange(pagination: any, filters: any, sorter: any) {
  if (pageSize != pagination.pageSize || currentPage != pagination.current) {
    setPageSize(pagination.pageSize)
    setCurrentPage(pagination.current);
    fetchData(pagination.pageSize, pagination.current)
  }
}
return (
  <div className='w-full bg-white dark:bg-neutral-900  grid grid-flow-row gap-2 py-3 px-3'>
    {
      managerClick == false ?
      
        <div className="flex justify-end  items-start mb-4">
          <ButtonPrimary sizeClass='py-2.5 px-5' onClick={() => {
            setIsPatch(false)
            setmanagerClick(true)}}>Add New Manager</ButtonPrimary>
        </div> :
        (internalLoader?
          <div className='flex items-center justify-center '>
            <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
          </div>
          :
        <div className=" container w-1/2 grid grid-flow-row gap-3 mb-4">
          <div className='px-3 grid grid-cols-1 gap-2 mt-2'>
            <div className=" w-full flex items-center justify-start">
              <h1 className={style2}>Name:</h1>
            </div>
            <div className="flex-shrink-0   lg:mb-0 grow w-full">
              <form className="relative">
                <Input
                  required
                  aria-required
                  placeholder="Enter Name"
                  type="text"
                  value={data1.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                />
              </form>
            </div>

          </div>
          <div className='px-3 grid grid-cols-1 gap-2 mt-2'>
            <div className=" w-full flex items-center justify-start">
              <h1 className={style2}>Role:</h1>
            </div>
            <div className="flex-shrink-0   lg:mb-0 grow w-full">
              <form className="relative">
                <Input
                  required
                  aria-required
                  placeholder="Enter Role"
                  type="text"
                  value={data1.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                />
              </form>
              <h1 className=' text-red-500 hidden' id='alert'>Role Cannnot be Blank</h1>
            </div>

          </div>
          <div className='px-3 grid grid-cols-1 gap-2'>
            <div className=" w-full flex items-start justify-start">
              <h1 className={style2}>Bio:</h1>
            </div>
            <div className="flex-shrink-0   lg:mb-0 grow lg:grow-0 w-full">
              <form className="relative">
                <textarea
                  required
                  aria-required
                  value={data1.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  className="text-neutral-800 border-neutral-300 h-44 w-full px-4 dark:text-neutral-200 max-md:w-full dark:bg-neutral-800"
                />
              </form>
              <h1 className=' text-red-500 hidden' id='alert2'>Bio Cannnot be Blank</h1>
            
            </div>

          </div>
          {
                        data1?.photo ? (
                            <div className="p-4 mb-4 text-sm text-blue-800 flex justify-between rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                                <span>Selected File:<span className="font-medium"> {data1?.photo?.name}</span> </span>
                                <span><XMarkIcon className='w-5 h-5 cursor-pointer' onClick={() => handleChange('photo', '')} /></span>
                            </div>
                        ) : <> <div className="px-3 grid grid-cols-1 gap-2 mt-2">
                        <div className=" w-full flex items-center justify-start">
                          <h1 className={style2}>Image:</h1>
                        </div>
                            <div className="flex-shrink-0  lg:mb-0 grow lg:grow-0 w-full ">
                                <Input
                                    required
                                    aria-required
                                    type="file"
                                    accept='image/*'
                                    // value={data.logo}
                                    // onChange={(e) => handleChange('logo', e.target.value)}
                                    onChange={(e: any) => handleChange('photo', e.target.files[0])}
                                    className="text-neutral-800 px-4 text-lg  border-[1px] border-neutral-300 dark:text-neutral-200 rounded-md"
                                />
                            </div>
                            <Image alt="Company Logo" className='my-2' src={data1?.photo?data1?.photo:data1?.image_url} width="100" height="100" />
                        </div>
                        </>
                    }
          {/* <div className="px-3 grid grid-cols-1 gap-2 mt-2">
            <div className=" w-full flex items-center justify-start">
              <h1 className={style2}>Image:</h1>
            </div>
            <div className="flex-shrink-0  lg:mb-0 grow lg:grow-0 w-full ">
              <Input
                required
                aria-required
                type="file"
                accept='image/*'
                // value={data1.photo}
                onChange={(e: any) => handleChange('photo', e.target.files[0])}
                className="text-neutral-800 px-4 text-lg  border-[1px] border-neutral-300 dark:text-neutral-200 rounded-md"
              />
            </div>


          </div> */}

          <div className='px-3 grid grid-cols-1 gap-2 mt-2'>
            <div className=" w-full flex items-center justify-start">
              <h1 className={style2}>Order:</h1>
            </div>
            <div className="flex-shrink-0   lg:mb-0 grow w-full">
              <form className="relative">
                <Input
                  required
                  aria-required
                  placeholder="Enter Order"
                  type="number"
                  value={data1.ordering}
                  onChange={(e) => handleChange('ordering', e.target.value)}
                  className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                />
              </form>
            </div>

          </div>
          <div className="py-3 px-3 flex flex-row items-center justify-center  gap-4 max-sm:flex-col">
            <ButtonPrimary  loading={loader} onClick={AddManager}>Submit</ButtonPrimary>
            <h2 className={style2}>or</h2>
            <ButtonPrimary onClick={() => {
            setmanagerClick(false)
            reset()
            }} className='bg-slate-100 hover:bg-slate-300'><span className='text-red-600'>Cancel</span></ButtonPrimary>
          </div>
        </div>)
    }
    {globalLoader ?
      <div className='flex items-center justify-center '>
        <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
      </div>
      : (managerClick == false ?
        <Table columns={columns} pagination={{ pageSizeOptions: ["10", "20", "25", "50"], total: total, current: currentPage, pageSize: pageSize, showSizeChanger: true }} dataSource={data} onChange={onChange} />
        : <></>)}
  </div>
)
}

export default ManagementPage