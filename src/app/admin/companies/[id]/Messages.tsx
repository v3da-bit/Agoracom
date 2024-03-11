'use client';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import Heading from '@/components/Heading/Heading';
import Input from '@/components/Input/Input';
import Nav from '@/components/Nav/Nav';
import NavItem from '@/components/NavItem/NavItem';
import { CompanyMessagePagination } from '@/requests/Profile';
import { Table } from 'antd';
import moment from 'moment';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from '@/components/Select/Select';
import { XMarkIcon } from '@heroicons/react/24/solid';
import VideoRecord from '@/components/VideoRecord/VideoRecord';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import ButtonSecondary from '@/components/Button/ButtonSecondary';
import useValidator from '@/hooks/useValidator';
import { createPost, deletePost, getPostById, restoreCompanyPost, updatePost } from '@/requests/Companies';
import alertMessage from '@/utils/swalAlert';


function MessagePage() {
  const style = 'font-semibold text-xl text-white max-md:text-md'
  const style2 = ' font-semibold text-left text-base text-dark'
  const [industry, setIndustry] = useState('posts');
  const router = useRouter()
  const { currentUser, loggedIn } = useSelector((state: any) => {
    return {
      currentUser: state.auth.currentUser,
      loggedIn: state.auth.loggedIn
    };
  });
  const columns = [
    {
      title: "Message Title",
      dataIndex: 'title',
      sorter: (a: any, b: any) => a.title.length - b.title.length,
    }, {
      title: 'Author/Date',
      dataIndex: 'date',
      sorter: (a: any, b: any) => a.date - b.date,
    }, {
      title: 'Actions',
      dataIndex: 'actions',

    }];
  const initialData = {
    id: '',
    company_id: '',
    content: "",
    cover_photo: "",
    created_at: "",
    is_featured: true,
    is_shown_on_homepage: false,
    message_type: "Message",
    title: "",
    user_id: '',
    video_link: "",
    posted: Date.now(),
    followThread: false,
    photoId: '',
    parent_id: null
  }
  const [data, setData] = useState([])
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0)
  const [globalLoader, setGlobalLoader] = useState(false);
  const [msgClick, setMsgClick] = useState(false)
  const typeDropDown = currentUser.userRole == 'level1' || currentUser.userRole == 'level2' || currentUser.userRole == 'level3' || currentUser.userRole == 'level4' ? {
    "Message": "Message",
    "Question": "Question",
    "Off Topic Message": "Off Topic Message",



  } : {
    "Message": "Message",
    "Question": "Question",
    "Off Topic Message": "Off Topic Message",
    "Press Release": "Press Release",
    "Industry Bulletin": "Industry Bulletin",
    "Corporate Update": "Corporate Update",
    "Interview": "Interview",
    "Q&A": "Q & A",
    "CEO Q&A": "CEO Q & A",
    "Media": "Media",
    "Event": "Event",
    'Reel': "Reel",
    'Short': "Short",
    'Trailer': "Trailer",
    'SmallCap60': "SmallCap60"


  };

  const searchParams: any = useSearchParams()
  const [loader, setLoader] = useState(false);
  const [internalLoader, setInternalLoader] = useState(false)
  const [userData, setUserData]: any = useState({});
  const [categories, setCategories]: any = useState([]);
  const [validator, showValidationMessage]: any = useValidator();
  const [content, setContent] = useState('');
  const [removePhoto, setRemovePhoto] = useState(false);
  const [data1, setData1] = useState(initialData)
  const [selectedImageFile, setSelectedImageFile]: any = useState(null);
  const [selectedVideoFile, setSelectedVideoFile]: any = useState(null);
  const videoInput: any = useRef(null)
  const [isEdit, setIsEdit] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [followLoader, setFollowLoader] = useState(false);
  const [errors, setErrors] = useState([])
  const [isPatch, setIsPatch] = useState(false)
  const [id, setId] = useState(0)
  const [deleteLoader, setDeleteLoader] = useState(0);

  const params = useParams()
  useEffect(() => {
    fetchData(pageSize, currentPage)
  }, [])

  const updateMessage = async (value: any) => {
    setMsgClick(true)
    setId(value?.id)
    setIsEdit(true)

    try {
      const headers = {
        'access-token': currentUser?.accessToken,
        'client': currentUser?.client,
        'uid': currentUser?.uid
      }
      setInternalLoader(true)
      const response = await getPostById(value?.id, headers)
      console.log(response.data);
      setData1(response.data)

    } catch (e: any) {
      console.log(e);

    } finally {
      setInternalLoader(false)
    }
  }

  const undoDeletePost = async (id: any) => {
    // restoreCompanyPost
    try {
      setDeleteLoader(id);
      const response = await restoreCompanyPost(id)
      if (response.status === 201 || response?.status === 200) {
        alertMessage({
          title: "Message restored successfully",
          text: "",
          icon: "success",
          timer: 3000
        });
        fetchData(pageSize, 1)
        // router.push(`/company/${data?.company_id}`)
      }
    } catch (e: any) {
      alertMessage({
        title: e.response.data.errors[0],
        text: "",
        icon: "error",
        timer: 3000
      });
    }
  }

  const fetchData = async (item: any, page: any, is_approved = approved, is_removed = removed, is_featured = featured) => {
    let payload: any = {
      page: page,
      items: item
    }
    if (is_approved) {
      payload['is_approved'] = is_approved;
    }
    if (is_removed) {
      payload['is_removed'] = is_removed;
    }
    if (is_featured) {
      payload['is_featured'] = is_featured;
    }

    setGlobalLoader(true)
    const response = await CompanyMessagePagination(params.id, payload)
    setGlobalLoader(false)

    if (response.status === 200) {
      let dynamicData: any = []
      setTotal(JSON.parse(response.headers.pagy).count)
      // setData(response.data)
      response.data.map((value: any) => {
        dynamicData.push({
          key: value?.id,
          title: <div className="flex-col flex gap-1">
            <h1>{value?.title}</h1>
            <h1 className=' text-secondary-400'><span className=' text-black'>in </span>{value?.forum?.name + " Forum"}</h1>
          </div>,
          date:
            <div className="flex-col flex gap-1">
              <h1>{value?.username}</h1>
              <h1>{moment(value?.created_at).format('lll')}</h1>
            </div>,
          actions: <span className='flex'>
            <button className='bg-transparent' onClick={() => updateMessage(value)}><span className='pl-1 text-secondary-400 font-semibold'>Edit </span></button>
            <span className='ml-2 mr-2'>|</span>
            {
              deleteLoader === value?.id ? (
                <div className='flex items-center justify-center '>
                  <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                </div>
              ) : (
                <>
                  {
                    value?.is_removed ? (
                      <button className='bg-transparent' onClick={() => undoDeletePost(value?.id)}><span className='pl-1 text-secondary-400 font-semibold'>Unremove</span></button>
                    ) : <>
                      <button className='bg-transparent' onClick={() => deleteCompanyPost(value?.id)}><span className='pl-1 text-secondary-400 font-semibold'>Remove</span></button>
                    </>
                  }
                </>
              )
            }
            {/* <button className='bg-transparent' onClick={() => deleteCompanyPost(value?.id)}><span className='pl-1 text-secondary-400 font-semibold'>Delete</span></button> */}
          </span>

        })

      })
      setData(dynamicData)
    }
  }

  const [approved, setApproved] = useState('')
  const approvedDropDown = {

    '': 'All',
    'true': 'Yes',
    'false': 'No',

  }

  const handleApprovedChange = (val: any) => {
    setApproved(val);
    fetchData(pageSize, 1, val, removed, featured)

  }
  const [removed, setRemoved] = useState('')
  const removedDropDown = {
    '': 'All',
    'true': 'Yes',
    'false': 'No',
  }

  const handleRemovedChange = (val: any) => {
    setRemoved(val);
    fetchData(pageSize, 1, approved, val, featured)
  }
  const [featured, setFeatured] = useState('')
  const featuredDropDown = {

    '': 'All',
    'true': 'Yes',
    'false': 'No',


  }
  const putCall = async () => {
    setErrors([]);
    if (validator.allValid()) {
      const {
        title,
        message_type,
        // posted,
        video_link,
        // coverPhoto,
        content,
        is_featured,
        is_shown_on_homepage,
        followThread,
        photoId
      } = data1;
      const message: any = {
        "company_id": params.id,
        "message_type": message_type,
        "title": title,
        "video_link": video_link === 'null' ? null : video_link,
        // "cover_photo": selectedImageFile,
        "content": content,
        "is_featured": is_featured,
        "is_shown_on_homepage": is_shown_on_homepage,
      }
      const fd: any = new FormData();
      fd.append("delete_coverphoto", removePhoto);
      fd.append('follow', followThread);
      fd.append('photo_id', photoId);
      Object.keys(message).forEach((key) => {
        fd.append(`message[${key}]`, message[key]);
      });
      try {
        setLoader(true);
        const headers = {
          'access-token': currentUser?.accessToken,
          'client': currentUser?.client,
          'uid': currentUser?.uid,
          "Content-Type": "multipart/form-data"
        }
        const response: any = await updatePost(id, fd, headers);
        setLoader(false)
        if (response.status === 200) {
          alertMessage({
            title: "Message updated successfully",
            text: "",
            icon: "success",
            timer: 3000
          });
          fetchData(pageSize, 1)
          setMsgClick(false)
          reset();
        }
      } catch (e: any) {
        setLoader(false)
        if (e?.response?.data?.errors?.length > 0) {
          setErrors(e?.response?.data?.errors);
        }
      }
    } else {
      showValidationMessage(true);
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      // forceUpdate();
    }
  }

  const postCall = async () => {
    setErrors([]);

    if (validator.allValid()) {
      const {
        title,
        message_type,
        // posted,
        video_link,
        // coverPhoto,
        content,
        is_featured,
        is_shown_on_homepage,
        followThread,
        photoId
      } = data1;
      const message: any = {
        "company_id": params.id,
        "message_type": message_type,
        "title": title,
        "video_link": video_link,
        // "cover_photo": selectedImageFile,
        "content": content,
        "is_featured": is_featured,
        "is_shown_on_homepage": is_shown_on_homepage,
      }
      if (selectedImageFile) {
        message["cover_photo"] = selectedImageFile;
      }
      const fd: any = new FormData();
      fd.append('follow', followThread);
      if (photoId) { fd.append('photo_id', photoId) }
      Object.keys(message).forEach((key) => {
        fd.append(`message[${key}]`, message[key]);
      });
      try {
        setLoader(true);
        const headers = {
          'access-token': currentUser?.accessToken,
          'client': currentUser?.client,
          'uid': currentUser?.uid,
          "Content-Type": "multipart/form-data"
        }
        const response: any = await createPost(fd, headers);
        setLoader(false)
        if (response.status === 201) {
          alertMessage({
            title: "Message created successfully",
            text: "",
            icon: "success",
            timer: 3000
          });
          fetchData(pageSize, 1)
          setMsgClick(false)
          reset();

        }
      } catch (e: any) {
        setLoader(false)
        if (e?.response?.data?.errors?.length > 0) {
          setErrors(e?.response?.data?.errors);
        }
      }
    } else {
      showValidationMessage(true);
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      // forceUpdate();
    }
  }

  const submit = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    if (isEdit) {
      putCall();
    } else {
      postCall();
    }
  }
  const reset = () => {
    setData1(initialData);
    setContent('');
    setSelectedImageFile(null);
    setSelectedVideoFile(null);
    setRemovePhoto(false);
    setErrors([]);
    setIsEdit(false);
    showValidationMessage(false);
  }
  const handleFeaturedChange = (val: any) => {
    setFeatured(val);
    fetchData(pageSize, 1, approved, removed, val)
  }

  function onChange(pagination: any, filters: any, sorter: any) {
    // console.log('params', pagination, filters, sorter, pageSize);
    if (pageSize != pagination.pageSize || currentPage != pagination.current) {
      setPageSize(pagination.pageSize)
      setCurrentPage(pagination.current);
      fetchData(pagination.pageSize, pagination.current)
    }
  }
  const handleChange = (key: any, value: any) => {
    setData1({
      ...data1,
      [key]: value
    })
  }
  const deleteCompanyPost = async (id: any) => {
    try {
      setDeleteLoader(id);
      const response = await deletePost(id)
      setDeleteLoader(0);
      if (response.status === 201) {
        alertMessage({
          title: "Message deleted successfully",
          text: "",
          icon: "success",
          timer: 3000
        });
        fetchData(pageSize, 1)
      }
    } catch (e: any) {
      console.log(e);
      setDeleteLoader(0);
      alertMessage({
        title: e.response.data.errors[0],
        text: "",
        icon: "error",
        timer: 3000
      });
    }
  }
  return (
    <div className='w-full p-6 bg-white'>
      {
        msgClick == false ? <div className="flex justify-end  items-start mb-4">
          <ButtonPrimary sizeClass='py-2.5 px-5' onClick={() => {
            setIsEdit(false)
            setMsgClick(true)
          }}>Add New Message</ButtonPrimary>
        </div> :
          (internalLoader ?
            <div className='flex items-center justify-center '>
              <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
            </div>
            :
            <div className=" container w-1/2 grid grid-flow-row gap-3 mb-4">
              <div className='py-1 px-3 grid grid-cols-1 gap-1'>
                <div className="w-full flex items-center justify-start">
                  <h1 className={style2}>Type*</h1>
                </div>
                <div className="flex justify-start w-full ">
                  <Select className='lg:w-full' rounded='rounded-md' disabled={data1?.parent_id > 0} menuDropdown={typeDropDown} selectedValue={data1.message_type} setMenu={(e: any) => handleChange('message_type', e)} />
                </div>

              </div>
              <div className="px-3 py-1 grid grid-cols-1 gap-2 mb-4">
                <div className="w-full flex items-center justify-start ">
                  <h1 className={style2}>Posted At*</h1>
                </div>
                <DatePicker className="w-full border-[1px] dark:bg-neutral-900 border-neutral-200 rounded-md" disabled={true} selected={data1?.created_at ? Date.parse(data1?.created_at) : data1?.posted} onChange={(e: any) => handleChange('posted', Date.parse(e))} />

              </div>
              <div className='px-3 grid grid-cols-1 gap-2 mt-2'>
                <div className=" w-full flex items-center justify-start">
                  <h1 className={style2}>Title*</h1>
                </div>
                <div className="flex-shrink-0   lg:mb-0 grow w-full">
                  <form className="relative">
                    <Input
                      required
                      aria-required
                      placeholder="Enter Title"
                      type="text"
                      disabled={data1?.parent_id > 0}
                      value={data1.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                    />
                  </form>
                </div>

              </div>
              <div className='px-3 grid grid-cols-1 gap-2 mt-2'>
                <div className=" w-full flex items-center justify-start">
                  <h1 className={style2}>Video Link</h1>
                </div>
                <div className="flex-shrink-0   lg:mb-0 grow w-full">
                  <form className="relative">
                    <Input
                      required
                      aria-required
                      placeholder="Enter Video Link"
                      type="text"
                      disabled={data1?.parent_id > 0}
                      value={data1.video_link}
                      onChange={(e) => handleChange('video_link', e.target.value)}
                      className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                    />
                  </form>
                </div>

              </div>
              <div className="grid grid-flow-row gap-2 px-3 py-1 text-center">
                <h1 className='text-center font-semibold text-base text-dark'>Or Record Video</h1>

                <div className="flex items-center justify-center w-full">
                  <div className="parent-video-container flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <VideoRecord />
                  </div>
                </div>
                {
                  selectedVideoFile ? (
                    <div className="p-4 mb-4 text-sm text-blue-800 flex justify-between rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                      <span>Selected File:<span className="font-medium"> {selectedVideoFile?.name}</span> </span>
                      <span><XMarkIcon className='w-5 h-5 cursor-pointer' onClick={() => setSelectedVideoFile(null)} /></span>
                    </div>
                  ) : <></>
                }
              </div>
              {
                currentUser?.userRole === 'admin' ? (
                  <>
                    <div className="grid grid-flow-row gap-2 px-3 py-1">
                      <h1 className={style2}>Choose Cover Photo:</h1>
                      {
                        isEdit && data1?.cover_photo ? (
                          <>
                            <Image src={data1?.cover_photo} alt="" className='w-full h-fit object-cover' width="500" height="300" />
                            <div className="flex items-center">
                              <input id="checked-checkbox3" type="checkbox" checked={removePhoto} disabled={data1?.parent_id > 0} onChange={(e: any) => setRemovePhoto(e.target.checked)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                              <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remove Photo</label>
                            </div>
                          </>
                        ) : (
                          <>
                            <h1 className='font-semibold text-left text-sm text-dark'>Accepted file formats: gif, png, jpg, jpeg</h1>

                            <div className="flex items-center justify-center w-full">
                              <label htmlFor="dropzone-file2" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                  </svg>
                                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input id="dropzone-file2" type="file" accept="image/*" onChange={(e: any) => setSelectedImageFile(e.target.files[0])} className="hidden" />
                              </label>
                            </div>
                            {
                              selectedImageFile ? (
                                <div className="p-4 mb-4 text-sm text-blue-800 flex justify-between rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                                  <span>Selected File:<span className="font-medium"> {selectedImageFile?.name}</span> </span>
                                  <span><XMarkIcon className='w-5 h-5 cursor-pointer' onClick={() => setSelectedImageFile(null)} /></span>
                                </div>
                              ) : <></>
                            }
                          </>
                        )
                      }


                    </div>
                    {categories.length > 0 ?
                      <div className="grid grid-flow-row gap-2 px-3 py-1 text-center">
                        <h1 className={style2}>Or Choose From Existing Photos</h1>

                        <div className="flex py-3">
                          <div className="flex items-center justify-start">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                          </div>
                          <div className="flex flex-row gap-3 w-full justify-center items-center ">
                            <div className="w-30  h-30 overflow-hidden  rounded-sm  flex ">
                              <Image
                                src={''}
                                alt="GFG logo served with static path of public directory"
                                width="100"
                                className='w-full h-full'
                                height="100"
                              />
                            </div>

                          </div>
                          <div className="flex items-center justify-end">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>

                          </div>
                        </div>
                      </div> :
                      <></>
                    }
                  </>
                ) : <></>
              }
              <div className="grid grid-flow-row gap-2 px-3 py-1">
                <h1 className={style2}>Content*</h1>
                <div className='w-full'>
                  <ReactQuill theme="snow" className='bg-white' value={data1?.content} onChange={(e: any) => handleChange('content', e)} />
                </div>

              </div>

              <div className="flex items-center ">
                <input id="default-checkbox" type="checkbox" checked={data1?.is_featured} onChange={(e: any) => handleChange('isFeatured', e.target.checked)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Featured</label>
              </div>
              <div className="flex items-center">
                <input id="default-checkbox2" type="checkbox" checked={data1?.is_shown_on_homepage} onChange={(e: any) => handleChange('displayOnBulletin', e.target.checked)} value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Display on Industry Bulletin</label>
              </div>
              <div className="flex items-center">
                <input id="checked-checkbox" checked={data1?.followThread} onChange={(e: any) => handleChange('followThread', e.target.checked)} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Follow this message/thread</label>
              </div>
              {
                errors.length > 0 && errors.map((item: any, index: number) => {
                  return (
                    <div key={index} className={`p-4 text-sm mt-2 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400`} role="alert">
                      {item}
                    </div>
                  )
                })
              }
              <div className="py-3 px-3 flex flex-row items-center justify-center  gap-4 max-sm:flex-col">
                <ButtonSecondary>Preview</ButtonSecondary>
                <ButtonPrimary loading={loader} onClick={submit}>Submit</ButtonPrimary>
                <h2 className={style2}>or</h2>
                <ButtonPrimary onClick={() => {
                  reset()
                  setMsgClick(false)
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
        : (msgClick == false ? <div className="grid grid-flow-row gap-3">
          <div className="flex flex-row gap-3 justify-end w-full ">
            <div className="flex justify-start w-auto flex-col gap-1">
              <label className='text-sm'>Approved</label>
              <Select className='' rounded='rounded-full' menuDropdown={approvedDropDown} selectedValue={approved} setMenu={handleApprovedChange} />
            </div>
            <div className="flex justify-start w-auto flex-col gap-1">
              <label className='text-sm'>Removed</label>
              <Select className='' rounded='rounded-full' menuDropdown={removedDropDown} selectedValue={removed} setMenu={handleRemovedChange} />
            </div>
            <div className="flex justify-start w-auto flex-col gap-1">
              <label className='text-sm'>Featured</label>
              <Select className='' rounded='rounded-full' menuDropdown={featuredDropDown} selectedValue={featured} setMenu={handleFeaturedChange} />
            </div>
          </div>
          <Table columns={columns} pagination={{ pageSizeOptions: ["10", "20", "25", "50"], total: total, current: currentPage, pageSize: pageSize, showSizeChanger: true }} dataSource={data} onChange={onChange} />
        </div> : <></>)}</div>
  )
}

export default MessagePage