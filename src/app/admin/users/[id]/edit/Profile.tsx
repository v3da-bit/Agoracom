import ButtonPrimary from '@/components/Button/ButtonPrimary'
import ButtonSecondary from '@/components/Button/ButtonSecondary'
import Input from '@/components/Input/Input'
import Select from '@/components/Select/Select'
import { UserGetEdit, UserSubmitEdit, updateEmail } from '@/requests/Profile'
import DatePicker from "react-datepicker";
import Password from 'antd/es/input/Password'
import Image from 'next/image'
import Link from 'next/link'
import DefaultImg from '@/images/Icons/avatar.png'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import moment from 'moment'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useSelector } from 'react-redux'
import alertMessage from '@/utils/swalAlert'
import "react-datepicker/dist/react-datepicker.css";

function Profile({ data1, setData }: any) {
    const style1 = 'mt-1 font-semibold text-base text-gray-600 dark:text-gray-200'
    const style2 = 'mt-1 font-semibold text-sm text-gray-600 dark:text-gray-200'
    const params = useParams()

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
        profile_video_code: '',
        date_of_birth: null,
        education_id: 0,
        job_title: '',
        city: '',
        country: 0,
        password: '',
        cpassword: '',
        is_pm_notifiable: '',
        avatar: '',
        phone: '',
        gender_id: 0,
        violation_count: '',
        subscribed: false,
        daily_digest_subscribed: false,
        weekly_digest_subscribed: false,
        is_top: false,
        is_ceo_verified: false,
        is_verified: false
    }
    const menuDropdown: any = {
        'posts': "Newest",
        'top_rated_posts': "Top Rated",
        'oldest_posts': "Oldest"
    };
    const [delete_messages, set_delete_messages] = useState(false)
    const router: any = useRouter();
    const [loader, setLoader] = useState(false);
    const [loader2, setLoader2] = useState(false);

    const [gender, setGender] = useState('')
    const [selectedLogoFile, setSelectedLogoFile]: any = useState(null);
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
    const updateEmailData = async () => {
        setLoader2(true)
        let payload = {
            // email: data1.email,
            password: data1.password,
            password_confirmation: data1.cpassword
        }
        try {
            const response = await updateEmail(payload)
            console.log(response);
            if (response.status === 200 || 201) {
                alertMessage({
                    title: "User updated successfully",
                    text: "",
                    icon: "success",
                    timer: 3000
                });
            }
        } catch (e: any) {
            if (e?.response?.data?.errors?.length > 0) {
                setErrors(e?.response?.data?.errors);
            } else {
                setErrors(["Something went wrong. Try again"]);
            }
        } finally {
            setLoader2(false)
        }
    }

    useEffect(() => {
        setGender(data1?.gender_id ? data1?.gender_id : 0)
        setEducation(data1?.education_id ? data1?.education_id : 0)
        setCountry(data1?.country ? data1?.country : 0)
    }, [data1])
    // console.log(gender);
    const tabs: any = [
        { id: 1, title: "Profile" },
        { id: 2, title: "Authorities" },
        { id: 3, title: "Activities" },
        { id: 4, title: "Messages" },
        { id: 5, title: "Ratings" },
        { id: 6, title: "Bans" },
    ]
    const [tabActive, setTabActive] = useState<number>(tabs[0].id);
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
    const reset1 = () => {
        setData({
            ...data1,
            'email': '',
            'password': '',
            'cpassword': ''
        });

    }
    const submitData = async () => {

        const {
            username,
            bio,
            profile_video_code,
            date_of_birth,
            education_id,
            job_title,
            city,
            country,
            is_pm_notifiable,
            avatar,
            phone,
            gender_id,
            subscribed,
            daily_digest_subscribed,
            weekly_digest_subscribed,
            is_top,
            is_ceo_verified,
            is_verified,
            email,
            password,
            cpassword
        }: any = data1

        const user: any = {
            'username': username || '',
            'bio': bio || '',
            'email': email || '',
            'password_confirmation': cpassword || '',
            'password': password || '',
            "display_contact_form": false,
            "profile_video_code": profile_video_code,
            "date_of_birth": date_of_birth,
            "education_id": education,
            "job_title": job_title || '',
            "city": city || '',
            "country": country || '',
            "is_pm_notifiable": is_pm_notifiable || false,
            "phone": phone || '',
            "gender_id": gender || '',
            "subscribed": subscribed || false,
            "daily_digest_subscribed": daily_digest_subscribed || false,
            "weekly_digest_subscribed": weekly_digest_subscribed || false,
            is_top: is_top || false,
            is_ceo_verified: is_ceo_verified || false,
            is_verified: is_verified || false
        }
        if (selectedLogoFile) {
            user["avatar"] = selectedLogoFile;
        }
        const fd: any = new FormData();
        Object.keys(user).forEach((key) => {
            fd.append(`user[${key}]`, user[key]);
        });
        fd.append("avatar_id", '');
        fd.append('delete_messages', delete_messages);
        setErrors([]);
        try {
            const headers = {
                'access-token': currentUser?.accessToken,
                'client': currentUser?.client,
                'uid': currentUser?.uid,
                "Content-Type": "multipart/form-data"
            }
            setLoader(true)
            const response = await UserSubmitEdit(params.id, fd, headers)
            if (response.status === 200) {
                alertMessage({
                    title: "User updated successfully",
                    text: "",
                    icon: "success",
                    timer: 3000
                });
                router.push(`/admin/users`);
            }
        } catch (e: any) {
            if (e?.response?.data?.errors?.length > 0) {
                setErrors(e?.response?.data?.errors);
            } else {
                setErrors(["Something went wrong. Try again"]);
            }

        } finally {
            setLoader(false)
        }

    }
    const getUrl = (url: any) => {
        if (url?.toString().includes("s3.amazonaws.com") || url?.toString().includes(".com")) {
            return url;
        } else {
            return DefaultImg;
        }
    }

    return (
        <>
            <div className="bg-white my-3">
                <div className="grid grid-flow-row gap-3">
                    <div className='py-1 px-3 grid grid-flow-row gap-2 '>
                        <div className=" w-full flex items-center justify-start">
                            <h1 className={style1}>Email:</h1>
                        </div>
                        <div className="flex-shrink-0  w-full mb-4">
                            <form className="relative">
                                <Input
                                    required
                                    aria-required
                                    placeholder=""
                                    type="text"
                                    value={data1?.email}
                                    onChange={(e) => handleFilter('email', e.target.value)}
                                    className="text-neutral-800 px-6 dark:text-neutral-200 rounded-md "
                                />
                                <h1 className={style2}>Note: Changing your email address will log you out and require re-verification of your account. You will not be able to use member features of AGORACOM.com until you verify your new email address</h1>
                            </form>
                        </div>

                    </div>


                    <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-3">
                        <div className='py-1 px-3 grid grid-flow-row gap-2'>
                            <div className=" w-full flex items-center justify-start">
                                <h1 className={style1}>Password:</h1>
                            </div>
                            <div className="flex-shrink-0  w-full">
                                <form className="relative">
                                    <Input
                                        required
                                        aria-required
                                        placeholder=""
                                        type="password"
                                        value={data1.password}
                                        onChange={(e) => handleFilter('password', e.target.value)}
                                        className="text-neutral-800 px-6 dark:text-neutral-200 rounded-md"
                                    />
                                </form>
                            </div>

                        </div>
                        <div className='py-1 px-3 grid grid-flow-row gap-2'>
                            <div className=" w-full flex items-center justify-start">
                                <h1 className={style1}>Confirm Password:</h1>
                            </div>
                            <div className="flex-shrink-0  w-full">
                                <form className="relative">
                                    <Input
                                        required
                                        aria-required
                                        placeholder=""
                                        type="password"
                                        value={data1.cpassword}
                                        onChange={(e) => handleFilter('cpassword', e.target.value)}
                                        className="text-neutral-800 px-6 dark:text-neutral-200 rounded-md"
                                    />
                                </form>
                            </div>

                        </div>


                    </div>
                    {/* {
                        errors.length > 0 && errors.map((item: any, index: number) => {
                            return (
                                <div key={index} className="p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    {item}
                                </div>
                            )
                        })
                    }
                    <div className="py-3 px-3 flex flex-row items-center justify-start  gap-4 max-sm:flex-col">
                        <ButtonPrimary onClick={updateEmailData} disabled loading={loader2}>Submit</ButtonPrimary>
                        <h2 className={style2}>or</h2>
                        <ButtonPrimary onClick={reset1} disabled className='bg-slate-100 hover:bg-slate-300'><span className='text-red-600'>Reset</span></ButtonPrimary>
                    </div> */}
                </div>

            </div>
            {/* <div className="w-full h-1 bg-black"></div> */}

            <div className="bg-white my-3">
                <div className="mt-3 grid grid-cols-2 max-sm:grid-cols-1 gap-3">
                    <div className='py-1 px-3 grid grid-flow-row gap-2'>
                        <div className=" w-full flex items-center justify-start">
                            <h1 className={style1}>Username:</h1>
                        </div>
                        <div className="flex-shrink-0 w-full">
                            <form className="relative">
                                <Input
                                    required
                                    aria-required
                                    placeholder=""
                                    type="text"
                                    value={data1?.username}
                                    onChange={(e) => handleFilter('username', e.target.value)}
                                    className="text-neutral-800 px-6 dark:text-neutral-200 rounded-md mb-4"
                                />
                            </form>
                        </div>

                    </div>
                    <div className='py-1 px-3 grid grid-flow-row gap-2'>
                        <div className=" w-full flex items-center justify-start">
                            <h1 className={style1}>Phone:</h1>
                        </div>
                        <div className="flex-shrink-0  w-full">
                            <form className="relative">
                                <Input
                                    required
                                    aria-required
                                    placeholder=""
                                    type="number"
                                    value={data1.phone}
                                    onChange={(e) => handleFilter('phone', e.target.value)}
                                    className="text-neutral-800 px-6 dark:text-neutral-200 rounded-md mb-4"
                                />
                            </form>
                        </div>

                    </div>

                </div>

                <div className='px-3 grid grid-cols-1 gap-2 w-full'>
                    <div className=" w-full flex items-start justify-start">
                        <h1 className={style1}>User Avatar:</h1>
                    </div>
                    {
                        selectedLogoFile ? (
                            <div className="p-4 mb-4 text-sm text-blue-800 flex justify-between rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                                <span>Selected File:<span className="font-medium"> {selectedLogoFile?.name}</span> </span>
                                <span><XMarkIcon className='w-5 h-5 cursor-pointer' onClick={() => setSelectedLogoFile(null)} /></span>
                            </div>
                        ) : <>
                            <div className="flex-shrink-0  lg:mb-0 grow lg:grow-0 w-full ">
                                <Input
                                    required
                                    aria-required
                                    type="file"
                                    accept='image/*'
                                    // value={data.logo}
                                    // onChange={(e) => handleChange('logo', e.target.value)}
                                    onChange={(e: any) => {
                                        setSelectedLogoFile(e.target.files[0])
                                        // handleFilter('avatar', e.target.files[0])
                                    }}
                                    className="text-neutral-800 px-4 text-lg  border-[1px] border-neutral-300 dark:text-neutral-200 rounded-md"
                                />
                            </div>
                            <Image alt="User Avatar" className='my-2' src={getUrl(data1?.avatar)} width="100" height="100" />
                        </>
                    }
                </div>

                <div className='px-3 grid grid-cols-1 gap-2 w-full'>
                    <div className=" w-full flex items-start justify-start">
                        <h1 className={style1}>Bio:</h1>
                    </div>
                    <div className="flex-shrink-0 lg:mb-0 grow lg:grow-0 w-full">
                        <form className="relative">
                            <textarea
                                required
                                aria-required
                                value={data1?.bio}
                                onChange={(e) => handleFilter('bio', e.target.value)}
                                className="text-neutral-800 h-44 border-slate-200 rounded w-full px-6 dark:text-neutral-200 dark:bg-neutral-800 mb-4"
                            />
                        </form>
                    </div>

                </div>
                <div className='py-1 px-3 grid grid-flow-row gap-2 '>
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style1}>Video Message Link:</h1>
                    </div>
                    <div className="flex-shrink-0  w-full mb-4">
                        <form className="relative">
                            <Input
                                required
                                aria-required
                                placeholder=""
                                type="text"
                                value={data1.profile_video_code}
                                onChange={(e) => handleFilter('profile_video_code', e.target.value)}
                                className="text-neutral-800 px-6 dark:text-neutral-200 rounded-md "
                            />
                            <h1 className={style2}>Add a YouTube video link here.</h1>
                        </form>
                    </div>

                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                    <div className='py-1 px-3 grid grid-cols-1 gap-2  mb-4'>
                        <div className="w-full flex items-center justify-start">
                            <h1 className={style2}>Gender:</h1>
                        </div>
                        <div className="flex justify-start w-full ">
                            <Select className='lg:w-full' rounded='rounded-md' menuDropdown={genderDropDown} selectedValue={gender} setMenu={handleGenderChange} />
                        </div>

                    </div>
                    <div className="px-3 py-1 grid grid-cols-1 gap-2 mb-4">
                        <div className="w-full flex items-center justify-start ">
                            <h1 className={style2}>Date of birth:</h1>
                        </div>
                        <DatePicker className="w-full border-[1px] dark:bg-neutral-900 border-neutral-200 rounded-md" onChange={(e: any) => handleFilter('date_of_birth', moment(Date.parse(e)).format('YYYY-MM-DD'))} selected={Date.parse(data1?.date_of_birth)} />

                    </div>
                    <div className='py-1 px-3 grid grid-cols-1 gap-2  mb-4'>
                        <div className="w-full flex items-center justify-start">
                            <h1 className={style2}>Education:</h1>
                        </div>
                        <div className="flex justify-start w-full ">
                            <Select className='lg:w-full' rounded='rounded-md' menuDropdown={EducationDropDown} selectedValue={education} setMenu={handleEducationChange} />
                        </div>

                    </div>
                    <div className='py-1 px-3 grid grid-cols-1 gap-2  mb-4'>
                        <div className="w-full flex items-center justify-start">
                            <h1 className={style2}>Job Title:</h1>
                        </div>
                        <div className="flex-shrink-0  w-full ">
                            <form className="relative">
                                <Input
                                    required
                                    aria-required
                                    placeholder=""
                                    type="text"
                                    value={data1.job_title}
                                    onChange={(e) => handleFilter('job_title', e.target.value)}
                                    className="text-neutral-800 px-6 dark:text-neutral-200 rounded-md "
                                />

                            </form>
                        </div>
                    </div>
                    <div className='py-1 px-3 grid grid-cols-1 gap-2  mb-4'>
                        <div className="w-full flex items-center justify-start">
                            <h1 className={style2}>City:</h1>
                        </div>
                        <div className="flex-shrink-0  w-full ">
                            <form className="relative">
                                <Input
                                    required
                                    aria-required
                                    placeholder=""
                                    type="text"
                                    value={data1?.city}
                                    onChange={(e) => handleFilter('city', e.target.value)}
                                    className="text-neutral-800 px-6 dark:text-neutral-200 rounded-md "
                                />

                            </form>
                        </div>

                    </div>
                    <div className='py-1 px-3 grid grid-cols-1 gap-2 mb-4'>
                        <div className="w-full flex items-center justify-start">
                            <h1 className={style2}>Country:</h1>
                        </div>
                        <div className="flex justify-start w-full ">
                            <Select className='lg:w-full ' rounded='rounded-md' menuDropdown={CountryDropDown} selectedValue={country} setMenu={handleCountryChange} />
                        </div>

                    </div>


                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                    <div className='py-1 px-3 grid grid-cols-1 gap-2  mb-4'>
                        <div className="w-full flex items-center justify-start">
                            <h1 className={style2}>Violations:</h1>
                        </div>
                        <div className="flex-shrink-0  w-full mb-4">
                            <form className="relative">
                                <Input
                                    required
                                    aria-required
                                    placeholder=""
                                    type="number"
                                    value={data1?.violation_count}
                                    onChange={(e) => handleFilter('violation_count', e.target.value)}
                                    className="text-neutral-800 px-6 dark:text-neutral-200 rounded-md "
                                />
                            </form>
                        </div>

                    </div>

                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 py-3 px-3">
                    <div className="flex items-center ">
                        <input id="default-checkbox" checked={data1?.subscribed} onChange={(e) => handleFilter('subscribed', e.target.checked)} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subscribe to newsletter</label>
                    </div>
                    <div className="flex items-center">
                        <input id="checked-checkbox" checked={data1?.daily_digest_subscribed} onChange={(e) => handleFilter('daily_digest_subscribed', e.target.checked)} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subscribe to Daily Digest</label>
                    </div>

                    <div className="flex items-center ">
                        <input id="default-checkbox1" checked={data1.weekly_digest_subscribed} onChange={(e) => handleFilter('weekly_digest_subscribed', e.target.checked)} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="default-checkbox1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subscribe to Weekly Digest</label>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 px-3 py-3">
                    <div className="flex items-center">
                        <input id="checked-checkbox2" checked={data1?.is_pm_notifiable} onChange={(e) => handleFilter('is_pm_notifiable', e.target.checked)} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="checked-checkbox2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Receive Email Notification of New Private Messages</label>
                    </div>
                    <div className="flex items-center">
                        <input id="checked-checkbox3" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="checked-checkbox3" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">This User is an Administrator</label>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 py-3 px-2">
                    <div className="flex items-center ">
                        <input id="default-checkbox" checked={data1.is_top} onChange={(e) => handleFilter('is_top', e.target.checked)} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Top Member</label>
                    </div>
                    <div className="flex items-center">
                        <input id="checked-checkbox" checked={data1.is_ceo_verified} onChange={(e) => handleFilter('is_ceo_verified', e.target.checked)} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">CEO Verified</label>
                    </div>

                    <div className="flex items-center ">
                        <input id="default-checkbox1" checked={data1.is_verified} onChange={(e) => handleFilter('is_verified', e.target.checked)} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="default-checkbox1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Is Verified</label>
                    </div>

                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 py-3 px-2">
                    <div className="flex items-center ">
                        <input id="default-checkbox1" checked={delete_messages} onChange={(e) => set_delete_messages(e.target.checked)} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="default-checkbox1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Check this box to remove all messages by this user</label>
                    </div>
                </div>
                {
                    errors.length > 0 && errors.map((item: any, index: number) => {
                        return (
                            <div key={index} className="p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                {item}
                            </div>
                        )
                    })
                }
                <div className="py-3 px-3 flex flex-row items-center justify-center  gap-4 max-sm:flex-col">
                    <ButtonPrimary onClick={submitData} loading={loader}>Submit</ButtonPrimary>
                    <h2 className={style2}>or</h2>
                    <ButtonPrimary onClick={reset} className='bg-slate-100 hover:bg-slate-300'><span className='text-red-600'>Reset</span></ButtonPrimary>
                </div>
            </div>
        </>
    )
}

export default Profile