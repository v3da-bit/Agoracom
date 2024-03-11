'use client';
import ButtonCircle from '@/components/Button/ButtonCircle';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import ButtonSecondary from '@/components/Button/ButtonSecondary';
import Heading from '@/components/Heading/Heading';
import Input from '@/components/Input/Input';
import Select from '@/components/Select/Select';
import { addFavouriteCompany, getCompanies, removeFavouriteCompany } from '@/requests/Home';
import { ArrowUpTrayIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';
import moment from 'moment';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import DefaulImage from '@/images/favicon.png'
import { createPost, getCatalogs, getPostById, updatePost } from '@/requests/Companies';
import Link from 'next/link';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import ButtonClose from '@/components/ButtonClose/ButtonClose';
import ButtonThird from '@/components/Button/ButtonThird';
import alertMessage from '@/utils/swalAlert';
import useValidator from '@/hooks/useValidator';
import VideoRecord from '@/components/VideoRecord/VideoRecord';
import DateTimePicker from 'react-datetime-picker';
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import './style.css'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSR = dynamic(
  () => import('@/components/TextEditor/TextEditor'),
  { ssr: false }
)

function CreatePost() {

  const { currentUser, loggedIn } = useSelector((state: any) => {
    return {
      currentUser: state.auth.currentUser,
      loggedIn: state.auth.loggedIn
    };
  });
  const initialData = {
    title: '',
    type: 'Message',
    posted: Date.now(),
    videoLink: '',
    coverPhoto: '',
    content: '',
    isFeatured: false,
    // displayOnBulletin: false,
    followThread: false,
    photoId: ''
  }
  const params = useParams()
  const router = useRouter();
  const searchParams: any = useSearchParams()
  const [loader, setLoader] = useState(false);
  const [userData, setUserData]: any = useState({});
  const [categories, setCategories]: any = useState([]);
  const [validator, showValidationMessage]: any = useValidator();
  const [content, setContent] = useState('');
  const [removePhoto, setRemovePhoto] = useState(false);
  const [data, setData]: any = useState(initialData)
  const [selectedImageFile, setSelectedImageFile]: any = useState(null);
  const [selectedVideoFile, setSelectedVideoFile]: any = useState(null);
  const videoInput: any = useRef(null)
  const [isEdit, setIsEdit] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [followLoader, setFollowLoader] = useState(false);
  const [errors, setErrors] = useState([])
  const [preview, setPreview] = useState(false)
  const [globalLoader, setGlobalLoader] = useState(false)
  // console.log(currentUser.userRole);

  const menuDropdown: any =

    (currentUser.userRole == 'level1' || currentUser.userRole == 'level2') ? {
      "Message": "Message",
      "Question": "Question",
    } : (
      currentUser.userRole == 'level3' || currentUser.userRole == 'level4'
    )
      ? {
        "Message": "Message",
        "Question": "Question",
        "Press Release": "Press Release"
      }
      : {
        "Message": "Message",
        "Question": "Question",
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

  const style = 'mt-3 font-semibold text-sm text-gray-600 dark:text-gray-200'
  const style1 = 'mt-1.5 font-semibold text-base text-gray-600 dark:text-gray-200'
  const style2 = 'mt-3'
  const style3 = 'mt-3 font-semibold text-right text-sm text-dark'
  const style4 = 'mt-1.5 font-bold text-4xl text-dark'
  const style5 = ' font-bold text-lg text-gray-600 dark:text-gray-200'

  const fetchPostData = async (id: any) => {
    try {
      const headers = {
        'access-token': currentUser?.accessToken,
        'client': currentUser?.client,
        'uid': currentUser?.uid
      }
      setGlobalLoader(true)
      const response: any = await getPostById(id, headers);
      setGlobalLoader(false)
      if (response.status === 200) {
        const {
          content,
          cover_photo,
          created_at,
          is_featured,
          is_shown_on_homepage,
          message_type,
          title,
          video_link
        } = response.data;
        setData({
          ...data,
          title: title,
          isFeatured: is_featured,
          videoLink: video_link,
          type: message_type,
          content: content,
          posted: created_at,
          coverPhoto: cover_photo,
          // displayOnBulletin: is_shown_on_homepage
        })
        setContent(content);
      }
    } catch (e: any) {
      console.log(e);
    }
  }

  useEffect(() => {
    const parameter = searchParams.get("type");
    if (parameter && parameter === 'question') {
      setData({
        ...data,
        type: 'Question'
      })
    };
  }, [])

  const fetchData = async (id: any) => {
    try {

      const response: any = await getCompanies(id);

      if (response.status === 200) {
        const { info } = response.data;
        setFollowed(response?.data?.followed ? true : false);
        setUserData(info)
      }
    } catch (e: any) {
      console.log(e);
    }
  }

  const fetchCatalogs = async (id: any) => {
    try {
      const response: any = await getCatalogs(id);
      if (response.status === 200) {

        const { categories } = response.data
        setCategories(categories)
      }
    } catch (e: any) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (params.id) {
      fetchData(params.id);
      fetchCatalogs(params.id)
    } else {
      router.back();
    }
    if (params?.post_id) {
      fetchPostData(params?.post_id);
      setIsEdit(true);
    }
  }, [])

  const handleFilterChange = (val: any) => {
    handleChange('type', val);
  }

  const handleChange = (key: any, value: any) => {
    setData({
      ...data,
      [key]: value
    })
  }

  const reset = () => {
    setData(initialData);
    setContent('');
    setSelectedImageFile(null);
    setSelectedVideoFile(null);
    setRemovePhoto(false);
    setErrors([]);
    showValidationMessage(false);
  }

  const followHub = async () => {
    if (loggedIn) {
      setFollowLoader(true)
      let response = null;
      if (followed) {
        response = await removeFavouriteCompany(userData?.id)
      } else {
        response = await addFavouriteCompany(userData?.id)
      }
      setFollowLoader(false)
      if (response.status === 200 || response.status === 201) {
        setFollowed(!followed)
      }
    } else {
      router.push('/auth/login');
    }
  }

  const putCall = async () => {
    setErrors([]);
    if (validator.allValid()) {
      const {
        title,
        type,
        // posted,
        videoLink,
        // coverPhoto,
        isFeatured,
        // displayOnBulletin,
        followThread,
        photoId,
        posted
      } = data;
      const message: any = {
        "company_id": params.id,
        "message_type": type,
        "title": title,
        "video_link": videoLink,
        // "cover_photo": selectedImageFile,
        "content": content,
        "is_featured": isFeatured,
        // "is_shown_on_homepage": displayOnBulletin,

      }
      if (currentUser.userRole === 'admin') {
        message["created_at"] = posted;
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
        const response: any = await updatePost(params?.post_id, fd, headers);
        setLoader(false)
        if (response.status === 200) {
          alertMessage({
            title: "Message updated successfully",
            text: "",
            icon: "success",
            timer: 3000
          });
          reset();
          router.push(`/company/${params.id}/discussion/${params?.post_id}`);
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
        type,
        // posted,
        videoLink,
        // coverPhoto,
        // content,
        isFeatured,
        // displayOnBulletin,
        followThread,
        photoId,
        posted
      } = data;
      const message: any = {
        "company_id": params.id,
        "message_type": type,
        "title": title,
        "video_link": videoLink,
        "content": content,
        "is_featured": isFeatured,
        // "is_shown_on_homepage": displayOnBulletin
      }
      if (currentUser.userRole === 'admin') {
        message["created_at"] = posted;
      }
      if (selectedImageFile) {
        message["cover_photo"] = selectedImageFile;
      }
      const fd: any = new FormData();
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
        const response: any = await createPost(fd, headers);
        setLoader(false)
        if (response.status === 201) {
          alertMessage({
            title: "Message has been successfully created",
            text: "",
            icon: "success",
            timer: 3000
          });
          reset();
          router.push(`/company/${params.id}`);
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
  console.log(data?.posted);

  return (
    <div className='relative container py-8'>
      <div className='flex flex-row  max-xl:justify-center max-xl:flex-col max-xl:items-center gap-5 xl:gap-8 py-8 px-4'>
        <div className='flex flex-col w-3/4 border-b gap-3 max-xl:w-full'>
          <Heading desc={""} isCenter className="text-defaultBlue-100 mb-4">
            {userData.name}
          </Heading>
          {preview ?
            <>
              <div className="flex px-3 py-3 bg-yellow-400">
                <h1 className={style5} id='preview'>Message Preview</h1>
              </div>
              <p className='mb-3 text-sm'>You are currently previewing the message you are about to post. Please make sure that it looks the way you intended and make corrections if necessary.</p>
              {Object.keys(data).map((key: any) => {
                console.log(key);
                return data[key] ? <h1 className={key == 'title' ? style4 : style2} dangerouslySetInnerHTML={{ __html: data[key] }}></h1> : <></>
              })}

            </> : <></>}
          <div className="mt-3 grid grid-flow-row gap-1 w-full bg-white p-5 rounded">
            <h4 className='text-secondary-500 px-3 py-2 font-bold text-xl'>{isEdit ? 'Edit' : 'Create'} Message</h4>
            {globalLoader ?
              <div className='flex items-center justify-center '>
                <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
              </div>
              :
              <>
                <div className="grid grid-flow-row gap-2 px-3 py-1">
                  <h1 className={style1}>Title*</h1>
                  <div className="flex-shrink-0   lg:mb-0 grow lg:grow-0  w-full">
                    <form className="relative">
                      <Input
                        required
                        aria-required
                        placeholder="Enter Title"
                        type="text"
                        value={data?.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                      />
                    </form>
                  </div>
                  <div className="w-full mt-0.5 text-red-500 text-sm">
                    {validator.message('title', data.title, 'required')}
                  </div>
                </div>
                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
                  <div className="grid grid-flow-row gap-2 px-3 py-1">
                    <h1 className={style1}>Type*</h1>
                    <div className="flex lg:mt-0 lg:mb-0  max-sm:justify-center rounded-md">
                      <Select className='lg:w-full' rounded='rounded-md' menuDropdown={menuDropdown} selectedValue={data?.type} setMenu={handleFilterChange} />
                    </div>
                  </div>

                  <div className="grid grid-flow-row gap-2 px-3 py-1">
                    <h1 className={style1}>Posted at*</h1>
                    <div className="relative">
                      {currentUser.userRole == 'admin' ?

                        <DateTimePicker value={data?.posted}
                          //   className={buildClassNames(touched, !!errors)}
                          //   customInput={
                          //     <input
                          //     type="text"
                          //     id={name}
                          //     placeholder={label} />
                          // }
                          onInvalidChange={() => console.log('incalid')}
                          className={'datePicker text-neutral-800 h-full dark:text-neutral-200 rounded-md border border-gray-400 w-full'}
                          onChange={(e: any) => {
                            // console.log(e);

                            if (e == null) {
                              handleChange('posted', data?.posted);
                            }
                            handleChange('posted', e);
                          }}
                        />
                        :
                        <Input required type="text" value={data?.posted} disabled className="text-neutral-800 bg-slate-200 dark:text-neutral-200 rounded-md" placeholder={moment(Date.now()).format('llll')} />
                      }
                    </div>
                  </div>
                </div>

                {currentUser.userRole == 'level1' || currentUser.userRole == 'level2' ? <></>
                  : <>
                    <div className="grid grid-flow-row gap-2 px-3 py-1">
                      <h1 className={style1}>Video Link</h1>
                      <div className="flex-shrink-0 w-full  lg:mb-0 grow lg:grow-0 ">
                        <form className="relative">
                          <Input
                            required
                            aria-required
                            placeholder="Enter Video Link"
                            type="text"
                            value={data?.videoLink}
                            onChange={(e) => handleChange('videoLink', e.target.value)}
                            className="text-neutral-800 px-4 dark:text-neutral-200 w-full rounded-md"
                          />
                        </form>
                      </div>

                    </div>
                    <div className="grid grid-flow-row gap-2 px-3 py-1 text-center">
                      <h1 className={style1}>Or Record Video</h1>
                      <div className="flex items-center justify-center w-full">
                        <div className="parent-video-container flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                          <VideoRecord record={currentUser.userRole === 'level4' || currentUser.is_ceo_verified} />
                          {/* <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ButtonSecondary sizeClass='py-2.5 px-4 !text-sm flex'>
                      Record Video
                    </ButtonSecondary>
                    <ButtonThird sizeClass='py-2.5 px-4 !text-sm mt-3' onClick={() => videoInput.current.click()}>
                      Upload Video
                      <ArrowUpTrayIcon className='w-5 h-5 ml-2' />
                    </ButtonThird>
                  </div> */}
                          {/* <input id="dropzone-file" type="file" ref={videoInput} accept=".mp4,.mp3,video/*" onChange={(e: any) => setSelectedVideoFile(e.target.files[0])} className="hidden" /> */}
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
                  </>
                }


                <>
                  <div className="grid grid-flow-row gap-2 px-3 py-1">
                    <h1 className={style1}>Choose Cover Photo:</h1>
                    {
                      isEdit && data?.coverPhoto ? (
                        <>
                          <Image src={data?.coverPhoto} alt="" className='w-full h-fit object-cover' width="500" height="300" />
                          <div className="flex items-center">
                            <input id="checked-checkbox1" type="checkbox" checked={removePhoto} onChange={(e: any) => setRemovePhoto(e.target.checked)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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
                              <input id="dropzone-file2" type="file" accept="image/*" onChange={(e: any) => {
                                console.log(e.target.files[0].size)
                                if (e.target.files[0].size < 1000000) {
                                  setSelectedImageFile(e.target.files[0])
                                  document.getElementById('imgAlert').style.display = 'none'
                                } else {
                                  document.getElementById('imgAlert').style.display = 'block'
                                }
                              }} className="hidden" />
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
                          <div className="py-3">
                            <h1 id='imgAlert' className=' text-red-500 text-md hidden'>Please Upload image less than 1MB</h1>
                          </div>
                        </>
                      )
                    }

                  </div>
                  {categories.length > 0 ?
                    <div className="grid grid-flow-row gap-2 px-3 py-1 text-center">
                      <h1 className={style1}>Or Choose From Existing Photos</h1>
                      <div className='py-1 px-3 flex flex-row gap-3 items-center justify-center'>
                        <h1 className={style2}>Category:</h1>
                        <Select className='' rounded='rounded-md' menuDropdown={menuDropdown} selectedValue={discussion} setMenu={handleFilterChange} />
                      </div>
                      <div className="flex py-3">
                        <div className="flex items-center justify-start">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                          </svg>
                        </div>
                        <div className="flex flex-row gap-3 w-full justify-center items-center ">
                          <div className="w-30  h-30 overflow-hidden  rounded-sm  flex ">
                            <Image
                              src={DefaulImage}
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




                <div className="grid grid-flow-row gap-2 px-3 py-1 mb-6">
                  <h1 className={style1}>Content*</h1>
                  <div className="w-full">
                    <DynamicComponentWithNoSSR className='bg-white h-[200px]' data={content} setData={(e: any) => setContent(e)} />
                  </div>
                  <div className="w-full mt-10 text-red-500 text-sm">
                    {validator.message('content', content, 'required')}
                  </div>
                </div>
                <div className="grid grid-flow-row gap-2 px-3 py-3">


                  {currentUser?.userRole === 'admin' ?
                    <>
                      <div className="flex items-center mt-1">
                        <input id="default-checkbox1" type="checkbox" checked={data?.isFeatured} onChange={(e: any) => handleChange('isFeatured', e.target.checked)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Featured</label>
                      </div>
                      {/* <div className="flex items-center ">
                        <input id="default-checkbox" type="checkbox" checked={data?.displayOnBulletin} onChange={(e: any) => handleChange('displayOnBulletin', e.target.checked)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Display on Industry Bulletin</label>
                      </div> */}
                    </> : <></>}
                  <div className="flex items-center">
                    <input id="checked-checkbox" type="checkbox" checked={data?.followThread} onChange={(e: any) => handleChange('followThread', e.target.checked)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Follow this message/thread</label>
                  </div>
                </div>
                {
                  errors.length > 0 && errors.map((item: any, index: number) => {
                    return (
                      <div key={index} className={`p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400`} role="alert">
                        {item}
                      </div>
                    )
                  })
                }
                <div className="flex flex-row mb-4 gap-3 px-3 max-md:justify-center items-center mt-2">
                  <Link href={'#preview'}><ButtonSecondary onClick={() => setPreview(true)} sizeClass='py-2 px-4 sm:py-2.5 sm:px-6'>Preview</ButtonSecondary></Link>
                  <ButtonPrimary sizeClass="py-2 px-4 sm:py-2.5 sm:px-6" loading={loader} onClick={submit}>Post</ButtonPrimary>
                  {/* <ButtonSecondary sizeClass="py-2.5 px-4 sm:py-3 sm:px-6">Preview</ButtonSecondary> */}
                  <h1 className=' text-center'>Or</h1>
                  <ButtonThird onClick={() => {
                    setPreview(false)
                  }} sizeClass="py-2 px-4 sm:py-2.5 sm:px-6">Reset</ButtonThird>
                </div>

              </>}
          </div>

        </div>
        <div className='flex flex-col w-1/4 max-xl:w-1/2 max-lg:w-full   h-fit px-7 py-7 shadow-md border-gray-300 border  rounded-xl bg-white dark:bg-neutral-900 dark:border-gray-800'>
          <div className=" flex flex-row justify-center items-center">
            <div className="w-40  h-40 overflow-hidden  rounded-full  flex ">
              <Image
                src={userData.small_logo_url}
                alt="GFG logo served with static path of public directory"
                width="100"
                className='w-full h-full'
                height="100"
              />
            </div>

          </div>
          <div className='text-center flex flex-col gap-3 mt-3'>
            <h1 className="text-2xl max-md:text-lg  text-dark"><b>{userData.name}</b></h1>
            <h1 className="text-blue-500 "><b>Stock Quotes</b></h1>
            <div className='grid grid-flow-row gap-3 '>
              <div className="grid grid-flow-col text-left">
                <h1 className={style}>Symbol</h1>
                <h1 className={style3}>{userData.tidy_ticker}</h1>
              </div>
              <div className="grid grid-flow-col text-left">
                <h1 className={style}>Exchange</h1>
                <h1 className={style3}>{userData.stock_exchange}</h1>
              </div>
              <div className="grid grid-flow-col text-left">
                <h1 className={style}>Shares</h1>
                <h1 className={style3}>{userData.outstanding_shares}</h1>
              </div>

              <div className="grid grid-flow-col text-left">
                <h1 className={style}>Industry</h1>
                <h1 className={style3}><a href="/">{userData.industry}</a></h1>
              </div>
              <div className="grid grid-flow-col text-left">
                <h1 className={style}>Website</h1>
                <h1 className={style3}><a href={userData.external_website}>Click Here</a></h1>
              </div>

              {/* <Link href={`/company/${id}/CreatePost`}>
                <div className="flex mt-3 justify-center items-center">
                  <ButtonSecondary className='w-full' sizeClass="py-2.5 px-4 sm:py-3 sm:px-6"><span className='text-sm'>Create a Post</span></ButtonSecondary>
                </div>
              </Link> */}
              <div className="flex justify-center items-center mt-3">
                <ButtonPrimary className='w-full' sizeClass="py-2.5 px-4 sm:py-3 sm:px-6" loading={followLoader} onClick={followHub}><span className='text-sm'>{followed ? 'Followed' : 'Follow Hub'}</span></ButtonPrimary>
                {/* <ButtonPrimary className='w-full' sizeClass="py-2.5 px-4 sm:py-3 sm:px-6"><span className='text-sm'> Follow Hub</span></ButtonPrimary> */}
              </div>
              <div className="flex justify-center items-center">
                <ButtonPrimary className='w-full bg-white hover:bg-slate-200' sizeClass="py-2.5 px-4 sm:py-3 sm:px-6"><span className='text-sm text-black'>DISCLAIMER</span></ButtonPrimary>
              </div>

            </div>


          </div>

        </div>

      </div >
    </div>
  )
}

export default CreatePost;