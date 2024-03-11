'use client'
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Input from "@/components/Input/Input";
import Nav from "@/components/Nav/Nav";
import NavItem from "@/components/NavItem/NavItem";
import Select from "@/components/Select/Select";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { CreateUser, UserSubmitEdit } from "@/requests/Profile";
import alertMessage from "@/utils/swalAlert";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/solid";
import DefaultImg from '@/images/Icons/avatar.png'
import ButtonSecondary from "@/components/Button/ButtonSecondary";
import Link from "next/link";

function AdminUserPage() {

    const { currentUser, loggedIn } = useSelector((state: any) => {
        return {
            currentUser: state.auth.currentUser,
            loggedIn: state.auth.loggedIn
        };
    });
    const style1 = 'mt-1 font-semibold text-base text-gray-600 dark:text-gray-200'
    const style2 = 'mt-1 font-semibold text-sm text-gray-600 dark:text-gray-200'
    const menuDropdown: any = {
        'posts': "Newest",
        'top_rated_posts': "Top Rated",
        'oldest_posts': "Oldest"
    };
    const initialData: any = {
        username: '',
        bio: '',
        email: '',
        password: '',
        cpassword: '',
        // display_contact_form: true,
        profile_video_code: '',
        date_of_birth: '',
        education_id: '',
        job_title: '',
        city: '',
        country: '',
        is_pm_notifiable: false,
        avatar: '',
        phone: '',
        gender_id: '',
        subscribed: false,
        daily_digest_subscribed: false,
        weekly_digest_subscribed: false,
        is_top: false,
        is_ceo_verified: false,
        is_verified: false
    }
    const [data1, setData] = useState(initialData)
    const [gender, setGender] = useState('')

    const genderDropDown = {
        '': "",
        0: 'Male',
        1: 'Female',
        3: 'Not Specified'

    }
    const [education, setEducation] = useState('')
    const EducationDropDown = {
        '': "",
        0: 'College',
        1: 'Doctorate',
        3: 'Graduate School',
        4: 'High School',
        5: 'UnderGraduate'
    }

    const [country, setCountry] = useState('')
    const CountryDropDown = {
        '': "",
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
        setGender(initialData.gender_id)
        setEducation(initialData.education_id)
        setCountry(initialData.country)
    }, [])
    const router: any = useRouter();
    const [loader, setLoader] = useState(false);
    const [selectedLogoFile, setSelectedLogoFile]: any = useState(null);
    const [errors, setErrors]: any = useState([]);

    const [discussion, setDiscussion] = useState('posts');
    const handleFilter = (key: any, val: any) => {
        setData({
            ...data1,
            [key]: val
        })
    }
    const handleGenderChange = (val: any) => {
        setGender(val);
    }
    const handleEducationChange = (val: any) => {
        setEducation(val);
    }
    const handleCountryChange = (val: any) => {
        setCountry(val);
    }
    const handleFilterChange = (val: any) => {
        setDiscussion(val);
    }
    const reset = () => {
        setData(initialData);
        setGender(data1?.gender_id ? data1?.gender_id : 0)
        setEducation(data1?.education_id ? data1?.education_id : 0)
        setCountry(data1?.country ? data1?.country : 0)
    }
    const submitData = async () => {

        const fd: any = new FormData()
        // Remove during update scenario
        // delete data1.password;
        // delete data1.cpassword;
        // delete data1.email;
        Object.keys(data1).forEach((key: any) => {
            fd.append(`user[${key}]`, data1[key])
        })
        setErrors([]);
        try {
            const headers = {
                'access-token': currentUser?.accessToken,
                'client': currentUser?.client,
                'uid': currentUser?.uid,
                "Content-Type": "multipart/form-data"
            }
            setLoader(true)
            const response = await CreateUser(fd)
            if (response.status === 201) {
                alertMessage({
                    title: "User Created successfully",
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
            <div className="bg-white py-6 px-4 rounded">
                <div className='flex justify-between mt-2 mb-6'>
                    <h3 className='text-2xl font-bold my-auto'>Add New User</h3>
                    <Link href={'/admin/users'}><ButtonSecondary sizeClass='py-2.5 px-5'>Back</ButtonSecondary></Link>
                </div>
                <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-3">
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
                                    value={data1.username}
                                    onChange={(e) => handleFilter('username', e.target.value)}
                                    className="text-neutral-800 px-6 dark:text-neutral-200 rounded-md mb-4"
                                />
                            </form>
                        </div>

                    </div>
                    <div className='py-1 px-3 grid grid-flow-row gap-2'>
                        <div className=" w-full flex items-center justify-start mt-6">
                            <h1 className={style1}>Phone:</h1>
                        </div>
                        <div className="flex-shrink-0  w-full ">
                            <form className="relative">
                                <Input
                                    required
                                    aria-required
                                    placeholder=""
                                    type="number"
                                    value={data1.phone}
                                    onChange={(e) => handleFilter('phone', e.target.value)}
                                    className="text-neutral-800 px-6 dark:text-neutral-200 rounded-md "
                                />
                                <h1 className={style2}>If you wish to be contacted by AGORACOM by phone, otherwise this field is optional</h1>
                            </form>
                        </div>

                    </div>

                </div>
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
                                value={data1.email}
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
                                    className="text-neutral-800 px-6 dark:text-neutral-200 rounded-md mb-4"
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
                                    className="text-neutral-800 px-6 dark:text-neutral-200 rounded-md mb-4"
                                />
                            </form>
                        </div>

                    </div>


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
                                value={data1.bio}
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
                        <div className="w-full flex items-center justify-start">
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
                                    value={data1.city}
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
                <div className="grid grid-cols-3 gap-3">
                    <div className='py-1 px-3 grid grid-flow-row gap-2 '>
                        <div className=" w-full flex items-center justify-start">
                            <h1 className={style1}>Violations:</h1>
                        </div>
                        <div className="flex-shrink-0  w-full mb-4">
                            <form className="relative">
                                <Input
                                    required
                                    aria-required
                                    placeholder=""
                                    type="number"
                                    value={data1.violation_count}
                                    onChange={(e) => handleFilter('violation_count', e.target.value)}
                                    className="text-neutral-800 px-6 dark:text-neutral-200 rounded-md "
                                />

                            </form>
                        </div>

                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 py-3 px-3">
                    <div className="flex items-center ">
                        <input id="default-checkbox" checked={data1.subscribed} onChange={(e) => handleFilter('subscribed', e.target.checked)} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subscribe to newsletter</label>
                    </div>
                    <div className="flex items-center">
                        <input id="checked-checkbox" checked={data1.daily_digest_subscribed} onChange={(e) => handleFilter('daily_digest_subscribed', e.target.checked)} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subscribe to Daily Digest</label>
                    </div>

                    <div className="flex items-center ">
                        <input id="default-checkbox1" checked={data1.weekly_digest_subscribed} onChange={(e) => handleFilter('weekly_digest_subscribed', e.target.checked)} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="default-checkbox1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subscribe to Weekly Digest</label>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 px-3 py-2">
                    <div className="flex items-center">
                        <input id="checked-checkbox2" checked={data1.is_pm_notifiable} onChange={(e) => handleFilter('is_pm_notifiable', e.target.checked)} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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

export default AdminUserPage;