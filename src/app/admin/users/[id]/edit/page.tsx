'use client'
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import ButtonSecondary from '@/components/Button/ButtonSecondary'
import Input from '@/components/Input/Input'
import Select from '@/components/Select/Select'
import { UserGetEdit, UserSubmitEdit } from '@/requests/Profile'
import DatePicker from "react-datepicker";
import Password from 'antd/es/input/Password'
import Image from 'next/image'
import Link from 'next/link'
import DefaultImg from '@/images/Icons/avatar.png'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import moment from 'moment'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useSelector } from 'react-redux'
import alertMessage from '@/utils/swalAlert'
import "react-datepicker/dist/react-datepicker.css";
import NavItem from '@/components/NavItem/NavItem'
import Nav from '@/components/Nav/Nav'
import Profile from './Profile'
import Authorities from './Authorities'
import Activities from './Activities'
import Messages from './Messages'
import Ratings from './Ratings'
import Bans from './Bans'


function EditAdminUserPage() {
    const style1 = 'mt-1 font-semibold text-base text-gray-600 dark:text-gray-200'
    const style2 = 'mt-1 font-semibold text-sm text-gray-600 dark:text-gray-200'
    const tabs: any = [
        { id: 1, title: "Profile" },
        { id: 2, title: "Authorities" },
        { id: 3, title: "Activities" },
        { id: 4, title: "Messages" },
        { id: 5, title: "Ratings" },
        { id: 6, title: "Bans" },
    ]
    const params = useParams();
    const queryParams = useSearchParams();
    const [tabActive, setTabActive]: any = useState<any>(tabs[0].id);
    const [isIp, setIsIp] = useState(0)
    useEffect(() => {
        let tab: any = queryParams.get('tab');
        if (tab) {
            setTabActive(parseInt(tab));
        };
        fetchData(params.id)
    }, [])
    const fetchData = async (id: any) => {
        setGlobalLoader(true)
        const response = await UserGetEdit(id)
        setGlobalLoader(false)

        if (response.status === 200) {
            setData(response.data)
        }
    }
    const { currentUser, loggedIn } = useSelector((state: any) => {
        return {
            currentUser: state.auth.currentUser,
            loggedIn: state.auth.loggedIn
        };
    });
    const initialData: any = {
        username: '',
        email: '',
        bio: '',
        ip_address: '',
        profile_video_code: '',
        date_of_birth: null,
        education_id: 0,
        job_title: '',
        city: '',
        country: 0,
        is_pm_notifiable: '',
        password: '',
        cpassword: '',
        avatar: '',
        phone: '',
        gender_id: 0,
        violation_count: '',
        subscribed: false,
        daily_digest_subscribed: false,
        weekly_digest_subscribed: false,
        is_top: false,
        is_ceo_verified: false,
        is_verified: false,
    }
    const menuDropdown: any = {
        'posts': "Newest",
        'top_rated_posts': "Top Rated",
        'oldest_posts': "Oldest"
    };
    const router: any = useRouter();
    const [loader, setLoader] = useState(false);
    const [data1, setData] = useState(initialData)
    const [gender, setGender] = useState('')
    const [selectedLogoFile, setSelectedLogoFile]: any = useState(null);
    const [ban, setBan] = useState(false)
    const genderDropDown = {

        0: 'Male',
        1: 'Female',
        3: 'Not Specified'

    }
    // if(selectedLogoFile){
    //     setData({
    //         ...data1,
    //         'avatar':selectedLogoFile

    //     })
    // }
    const [education, setEducation] = useState('')
    const [globalLoader, setGlobalLoader] = useState(false);
    const [errors, setErrors]: any = useState([]);
    const EducationDropDown = {

        0: 'College',
        1: 'Doctorate',
        3: 'Graduate School',
        4: 'High School',
        5: 'UnderGraduate'
    }
    const [country, setCountry] = useState('')
    const CountryDropDown = {

        'AU': "Australia",
        'AT': "Austria",
        'BE': 'Belgium',
        'CA': 'Canada',
        'DK': 'Denmark',
        'FI': 'Finland',
        'FR': 'France',
        'DE': 'Germany',
        'IE': 'Ireland',
        'IT': 'Italy',
        'NL': 'Netherlands',
        'NZ': 'New Zealand',
        'NO': 'Norway',
        'ES': 'Spain',
        'SE': 'Sweden',
        'CH': 'Switzerland',
        'UK': 'United Kingdom',
        'US': 'United States'
    }
    useEffect(() => {
        setGender(data1?.gender_id ? data1?.gender_id : 0)
        setEducation(data1?.education_id ? data1?.education_id : 0)
        setCountry(data1?.country ? data1?.country : 0)
        if (data1.ban_id) {
            setBan(true)
        }
        if (data1?.ip_address || data1?.current_sign_in_ip) {
            data1?.current_sign_in_ip ? setIsIp(data1?.current_sign_in_ip) : setIsIp(data1?.ip_address)
        }
    }, [data1])
    const handleClickTab = (item: number) => {
        if (item === tabActive) {
            return;
        }
        setTabActive(item);
    };
    const [discussion, setDiscussion] = useState('posts');
    const handleFilter = (key: any, val: any) => {
        setData({
            ...data1,
            [key]: val
        })
    }
    const handleGenderChange = (val: any) => {
        setGender(parseInt(val));
    }
    const handleEducationChange = (val: any) => {
        setEducation(parseInt(val));
    }
    const handleCountryChange = (val: any) => {
        setCountry(parseInt(val));
    }
    const reset = () => {
        setData(initialData);
        setGender(data1?.gender_id ? data1?.gender_id : 0)
        setEducation(data1?.education_id ? data1?.education_id : 0)
        setCountry(data1?.country ? data1?.country : 0)
    }


    const getUrl = (url: any) => {
        if (url?.toString().includes("s3.amazonaws.com") || url?.toString().includes(".com")) {
            return url;
        } else {
            return DefaultImg;
        }
    }


    return (

        <div className="bg-white py-6 px-6 rounded">
            <div className='flex justify-between mt-2 mb-6'>
                <h3 className='text-2xl font-bold my-auto'>Edit User Details</h3>
                <Link href={'/admin/users'}><ButtonSecondary sizeClass='py-2.5 px-5'>Back</ButtonSecondary></Link>
            </div>
            {globalLoader ?
                <div className='flex items-center justify-center '>
                    <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                </div>
                : <>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="grid grid-flow-row gap-1 px-3">
                            <div className="relative flex flex-row justify-start items-center">
                                {ban ? <div className="absolute flex justify-center items-end">
                                    <h1 className=' text-[38px] text-red-500 font-bold' style={{
                                        transform: 'rotate(-30deg)'
                                    }}>BANNED</h1>
                                </div> : <></>}
                                <div className="w-40 h-40 overflow-hidden  rounded-md  flex ">

                                    <Image
                                        src={getUrl(data1?.avatar)}
                                        alt="GFG logo served with static path of public directory"
                                        width="100"
                                        className='w-full h-full '
                                        height="100"
                                    />
                                </div>

                            </div>
                            <div className='flex flex-row gap-3 justify-start'>
                                <h1 className={style2}>UserName:</h1>
                                <h1>{data1?.username}</h1>
                            </div>
                            <div className='flex flex-row gap-3 justify-start'>
                                <h1 className={style2}>Activity Points:</h1>
                                <h1>{data1?.your_rating}</h1>
                            </div>
                            <div className='flex flex-row gap-3 justify-start'>
                                <h1 className={style2}>Ranking Points:</h1>
                                <h1>{data1?.ranking_points}</h1>
                            </div>
                            <div className='flex flex-row gap-3 justify-start'>
                                <h1 className={style2}>Rating:</h1>
                                <h1> <ReactStars
                                    count={5}
                                    value={data1?.rating}
                                    edit={false}
                                    size={24}
                                    activeColor="#ffd700"
                                /></h1>
                            </div>
                            <div className='flex flex-row gap-3 justify-start'>
                                <h1 className={style2}>User Group:</h1>
                                <h1>{data1?.authority_group_name}</h1>
                            </div>
                            <div className='flex flex-row gap-3 justify-start'>
                                <h1 className={style2}>User Rank:</h1>
                                <h1>{data1?.ranking_points + '/' + data1?.authority_group_name}</h1>
                            </div>
                            <div className='flex flex-row gap-3 justify-start'>
                                <h1 className={style2}>Last IP Address:</h1>
                                <h1>{data1?.current_sign_in_ip || data1?.ip_address}</h1>
                            </div>
                            <div className='flex flex-row gap-3 justify-start'>
                                <h1 className={style2}>Member Since:</h1>
                                <h1>{moment(data1?.date_joined).format('ll')}</h1>
                            </div>
                            <div className='flex flex-row gap-3 justify-start'>
                                <h1 className={style2}>Account Status:</h1>
                                <h1></h1>
                            </div>
                        </div>

                    </div>
                    <div className="mt-6">
                        <div className="flex-none lg:flex gap-6">
                            <div className="grow">
                                <div className="flex-none lg:flex justify-between mb-7">
                                    <Nav
                                        className="sm:space-x-2 rtl:space-x-reverse"
                                        containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base"
                                    >
                                        {tabs.map((item: any, index: number) => (
                                            <NavItem
                                                className='px-4 py-3 text-sm'
                                                key={item.id}
                                                isActive={tabActive === item.id}
                                                onClick={() => handleClickTab(item.id)}
                                            >
                                                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                    </svg> */}
                                                {item.title}
                                            </NavItem>
                                        ))}
                                    </Nav>

                                </div>


                                <div className=" mb-7 px-0 lg:px-4">
                                    {
                                        tabActive == 1 ?
                                            <Profile data1={data1} setData={setData} /> :
                                            tabActive == 2 ? <Authorities id={params.id} /> :
                                                tabActive == 3 ? <Activities id={params.id} /> :
                                                    tabActive == 4 ? <Messages id={params.id} /> :
                                                        tabActive == 5 ? <Ratings id={params.id} name={data1?.username} /> :
                                                            tabActive == 6 ? <Bans id={params.id} ip_address={data1?.ip_address} ban={data1?.ban_id} setBan={setBan} isIp={isIp} /> :
                                                                <></>
                                    }
                                </div>



                            </div>

                        </div>

                    </div>
                </>
            }
        </div>


    )
}


export default EditAdminUserPage