'use client'
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import ButtonSecondary from '@/components/Button/ButtonSecondary'
import Heading from '@/components/Heading/Heading'
import Input from '@/components/Input/Input'
import Select from '@/components/Select/Select'
import useValidator from '@/hooks/useValidator'
import { companyInfo, updateCompany } from '@/requests/Companies'
import alertMessage from '@/utils/swalAlert'
import { XMarkIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux'
// import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { CreateCompany } from '@/requests/Profile'

const DynamicComponentWithNoSSR = dynamic(
    () => import('@/components/TextEditor/TextEditor'),
    { ssr: false }
)

function AdminCompanyPage() {
    const style = 'font-semibold text-xl text-white max-md:text-md'
    const style2 = ' font-semibold text-right text-base text-dark'
    const { currentUser, loggedIn } = useSelector((state: any) => {
        return {
            currentUser: state.auth.currentUser,
            loggedIn: state.auth.loggedIn
        };
    });


    const initialData = {
        name: '',
        ticker: '',
        secondary_ticker: '',
        industry_id: '',
        stock_exchange_id: '',
        secondary_stock_exchange_id: '',
        outstanding_shares: '',
        edgar_sedar_link: '',
        transfer_agent_name: '',
        transfer_agent_url: '',
        external_website: '',
        banner_text: '',
        sub_banner_text: '',
        overview: '',
        logo: '',
        delete_logo: false,
        small_logo: '',
        delete_small_logo: '',
        username: '',
        hub_type: '',
        hub_path: '',
        broker_fact_sheet: '',
        stock_symbol: '',
        secondary_stock_symbol: '',
        youtube_channel: '',
        is_active: false,
        is_listed: false,
        seo_title: '',
        seo_keywords: '',
        seo_description: '',
        summary: '',
        sponsored: false,
        is_featured: false,
        is_top: false
    }
    const menuDropdown: any = {
        'posts': "Newest",
        'top_rated_posts': "Top Rated",
        'oldest_posts': "Oldest"
    };
    const industryOptions = {
        "": '',
        "0": 'Not Assigned',
        "1": "Metals & Minerals",
        "2": "Energy & Environment",
        "3": "Technology & Medical",
        "4": "Bricks & Mortar",
        "5": "Financial Services",
        "6": "E - commerce",
        "7": "Psychedelics",
        "8": "Fintech",
        "9": "Cannabis",
        "10": "Internet of Things",
        "11": "Proptech",
        "12": "Technology",
    }
    const exchangeOptions = {
        "": '',
        "0": "PINK",
        "1": "NAZ",
        "2": "OTCBB",
        "3": "TSX",
        "4": "TSX-V",
        "5": "AMEX",
        "6": "NYSE",
        "7": "CSE",
        "8": "OTCQB",
        "9": "OTCQX",
        "10": "Equity Token",
        "11": "Proposed RTO",
        "12": "Private",
    }
    const hubOption = {
        "": '',
        "0": 'IR Hub',
        "1": 'Marketing Hub',
        "2": 'Free Hub',
        "3": 'Moderate Hub',
        "4": 'Special Hub'
    }
    const params = useParams();
    const router = useRouter();
    const [industry, setIndustry] = useState('0');
    const [exchange, setExchange] = useState('0');
    const [validator, showValidationMessage]: any = useValidator();
    const [selectedLogoFile, setSelectedLogoFile]: any = useState(null);
    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState([])
    const [selectedSmallLogoFile, setSelectedSmallLogoFile]: any = useState(null);
    const [data, setData]: any = useState(initialData);
    const [profile, setProfile] = useState('')

    const handleFilterChange = (val: any) => {
        setIndustry(val);
    }
    const handleFilterChange2 = (val: any) => {
        setExchange(val)
    }

    // useEffect(() => {
    //     companyDetails(params.id);
    // }, [])

    // const companyDetails = async (id: any) => {
    //     try {
    //         const headers = {
    //             'access-token': currentUser?.accessToken,
    //             'client': currentUser?.client,
    //             'uid': currentUser?.uid
    //         }
    //         const response: any = await companyInfo(id, headers);
    //         if (response.status === 200) {
    //             console.log(response.data);
    //             if (response?.status === 200) {
    //                 const {
    //                     banner_text,
    //                     company_overview,
    //                     edgar_sedar_link,
    //                     external_website,
    //                     industry_id,
    //                     logo,
    //                     outstanding_shares,
    //                     overview,
    //                     small_logo,
    //                     stock_exchange_id,
    //                     sub_banner_text,
    //                     ticker,
    //                     transfer_agent_name,
    //                     transfer_agent_url
    //                 } = response.data;
    //                 setData({
    //                     ...data,
    //                     outShares: outstanding_shares,
    //                     overview: company_overview,
    //                     smallLogo: small_logo,
    //                     logo: logo,
    //                     bannerText: banner_text,
    //                     subBannerText: sub_banner_text,
    //                     ticker: ticker,
    //                     agentName: transfer_agent_name,
    //                     agentUrl: transfer_agent_url,
    //                     sedarLink: edgar_sedar_link,
    //                     websiteUrl: external_website,
    //                 })
    //                 setExchange(stock_exchange_id)
    //                 setIndustry(industry_id)
    //                 setProfile(overview);
    //             }
    //         }
    //     } catch (e: any) {
    //         console.log(e);

    //     }
    // }

    const handleChange = (key: any, value: any) => {
        setData({
            ...data,
            [key]: value
        })
    }

    const reset = () => {
        setData(initialData);
        setSelectedLogoFile(null);
        setSelectedSmallLogoFile(null)
        setProfile('');
        setErrors([]);
    }

    const submit = async () => {
        setErrors([]);
        const payload: any = data
        const fd: any = new FormData
        delete payload.delete_logo;
        delete payload.delete_small_logo
        fd.append('delete_logo', false);
        fd.append('delete_small_logo', false)
        Object.keys(payload).forEach((key: any) => {
            // console.log(key,payload[key]);
            fd.append(`company[${key}]`, payload[key])
        })
        try {
            setLoader(true)
            const response = await CreateCompany(fd)
            setLoader(false)
            console.log(response);
            if (response.status === 201 || response.status === 200) {
                alertMessage({
                    title: "Company Added successfully",
                    text: "",
                    icon: "success",
                    timer: 3000
                });
                router.push(`/admin/companies`);
                reset();
            }

        } catch (e: any) {
            setLoader(false)
            if (e?.response?.data?.errors?.length > 0) {
                setErrors(e?.response?.data?.errors);
            }
        }
        // if (validator.allValid()) {
        //     const { outShares,
        //         overview,
        //         smallLogo,
        //         logo,
        //         bannerText,
        //         subBannerText,
        //         ticker,
        //         agentName,
        //         agentUrl,
        //         sedarLink,
        //         websiteUrl } = data;
        //     // params: {
        //     //     :ticker, :industry_id, :stock_exchange_id, :outstanding_shares, :edgar_sedar_link,
        //     //     :transfer_agent_name, :transfer_agent_url, :external_website, :company_overview,
        //     //     :banner_text, :sub_banner_text, :overview, :logo, :small_logo
        //     //    }
        //     const fd: any = new FormData();
        //     const company: any = {
        //         'ticker': ticker,
        //         'industry_id': industry,
        //         'stock_exchange_id': exchange,
        //         'outstanding_shares': outShares,
        //         'edgar_sedar_link': sedarLink,
        //         'transfer_agent_name': agentName,
        //         'transfer_agent_url': agentUrl,
        //         'external_website': websiteUrl,
        //         'company_overview': overview || '',
        //         'banner_text': bannerText,
        //         'sub_banner_text': subBannerText,
        //         'overview': profile,
        //     }
        //     if (selectedLogoFile) {
        //         company['logo'] = selectedLogoFile
        //     }
        //     if (selectedSmallLogoFile) {
        //         company['small_logo'] = selectedSmallLogoFile
        //     }
        //     Object.keys(company).forEach((key) => {
        //         fd.append(`company[${key}]`, company[key]);
        //     });
        //     try {
        //         setLoader(true);
        //         const headers = {
        //             'access-token': currentUser?.accessToken,
        //             'client': currentUser?.client,
        //             'uid': currentUser?.uid,
        //             "Content-Type": "multipart/form-data"
        //         }
        //         const response: any = await updateCompany(params?.id, fd, headers);
        //         setLoader(false)
        // if (response.status === 201 || response.status === 200) {
        //     alertMessage({
        //         title: "Company updated successfully",
        //         text: "",
        //         icon: "success",
        //         timer: 3000
        //     });
        //     reset();
        //     router.push(`/company/${params.id}`);
        // }
        //     } catch (e: any) {
        //         setLoader(false)
        //         if (e?.response?.data?.errors?.length > 0) {
        //             setErrors(e?.response?.data?.errors);
        //         }
        //     }
        // } else {
        //     showValidationMessage(true);
        //     // rerender to show messages for the first time
        //     // you can use the autoForceUpdate option to do this automatically`
        //     // forceUpdate();
        // }
    }
    return (
        <div className='w-full bg-white  grid grid-flow-row gap-2'>
            <div className='py-6 px-4'>
                <div className='flex justify-between mt-2 mb-6'>
                    <h3 className='text-2xl font-bold my-auto'>Add New Company</h3>
                    <Link href={'/admin/companies'}><ButtonSecondary sizeClass='py-2.5 px-5'>Back</ButtonSecondary></Link>
                </div>
                <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">

                    <div className='py-1 px-3 grid grid-flow-row gap-2'>
                        <div className=" w-full flex items-center justify-start">
                            <h1 className={style2}>Company Name:</h1>
                        </div>
                        <div className="flex-shrink-0 w-full">
                            <form className="relative">
                                <Input
                                    required
                                    aria-required
                                    placeholder="Enter Company Name"
                                    type="text"
                                    value={data?.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                                />
                            </form>
                        </div>

                    </div>

                    <div className='py-1 px-3 grid grid-flow-row gap-2'>
                        <div className=" w-full flex items-center justify-start">
                            <h1 className={style2}>Hub Path:</h1>
                        </div>
                        <div className="flex-shrink-0 w-full">
                            <form className="relative">
                                <Input
                                    required
                                    aria-required
                                    placeholder="Enter Hub Path"
                                    type="text"
                                    value={data?.hub_path}
                                    onChange={(e) => handleChange('hub_path', e.target.value)}
                                    className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                                />
                            </form>
                        </div>

                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">

                    <div className='py-1 px-3 grid grid-flow-row gap-2'>
                        <div className=" w-full flex items-center justify-start">
                            <h1 className={style2}>Stock Symbol:</h1>
                        </div>
                        <div className="flex-shrink-0 w-full">
                            <form className="relative">
                                <Input
                                    required
                                    aria-required
                                    placeholder="Enter Stock Symbol"
                                    type="text"
                                    value={data?.stock_symbol}
                                    onChange={(e) => handleChange('stock_symbol', e.target.value)}
                                    className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                                />
                            </form>
                        </div>

                    </div>

                    <div className='py-1 px-3 grid grid-flow-row gap-2'>
                        <div className=" w-full flex items-center justify-start">
                            <h1 className={style2}>Ticker:</h1>
                        </div>
                        <div className="flex-shrink-0 w-full">
                            <form className="relative">
                                <Input
                                    required
                                    aria-required
                                    placeholder="Enter Ticker"
                                    type="text"
                                    value={data?.ticker}
                                    onChange={(e) => handleChange('ticker', e.target.value)}
                                    className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                                />
                            </form>
                        </div>

                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
                    <div className='py-1 px-3 grid grid-cols-1 gap-1 w-full max-sm:border-b-2'>
                        <div className=" flex items-center justify-start">
                            <h1 className={style2}>Industry:*</h1>
                        </div>
                        <div className="flex w-full ">
                            <Select className='lg:w-full' rounded='rounded-md' menuDropdown={industryOptions} selectedValue={data?.industry_id} setMenu={(e: any) => handleChange('industry_id', e)} />
                        </div>

                    </div>
                    <div className='py-1 px-3 grid grid-cols-1 gap-1'>
                        <div className="w-full flex items-center justify-start">
                            <h1 className={style2}>Exchange:*</h1>
                        </div>
                        <div className="flex justify-start w-full ">
                            <Select className='lg:w-full' rounded='rounded-md' menuDropdown={exchangeOptions} selectedValue={data?.stock_exchange_id} setMenu={(e: any) => handleChange('stock_exchange_id', e)} />
                        </div>

                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">

                    <div className='py-1 px-3 grid grid-flow-row gap-2'>
                        <div className=" w-full flex items-center justify-start">
                            <h1 className={style2}>Secondary Stock Symbol:</h1>
                        </div>
                        <div className="flex-shrink-0 w-full">
                            <form className="relative">
                                <Input
                                    required
                                    aria-required
                                    placeholder="Enter Secondary Stock Symbol"
                                    type="text"
                                    value={data?.secondary_stock_symbol}
                                    onChange={(e) => handleChange('secondary_stock_symbol', e.target.value)}
                                    className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                                />
                            </form>
                        </div>

                    </div>

                    <div className='py-1 px-3 grid grid-flow-row gap-2'>
                        <div className=" w-full flex items-center justify-start">
                            <h1 className={style2}>Secondary Ticker:</h1>
                        </div>
                        <div className="flex-shrink-0 w-full">
                            <form className="relative">
                                <Input
                                    required
                                    aria-required
                                    placeholder="Enter Secondary Ticker"
                                    type="text"
                                    value={data?.secondary_ticker}
                                    onChange={(e) => handleChange('secondary_ticker', e.target.value)}
                                    className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                                />
                            </form>
                        </div>

                    </div>
                </div>
                <div className='py-1 px-3 grid grid-flow-row gap-2'>
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style2}>Secondary Exchange:</h1>
                    </div>
                    <div className="flex justify-start w-full ">
                        <Select className='lg:w-full' rounded='rounded-md' menuDropdown={exchangeOptions} selectedValue={data?.secondary_stock_exchange_id} setMenu={(e: any) => handleChange('secondary_stock_exchange_id', e)} />
                    </div>

                </div>
                <div className="px-3 grid grid-cols-1 gap-2 mt-2">
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style2}>Logo:</h1>
                    </div>


                    {
                        data?.logo ? (
                            <div className="p-4 mb-4 text-sm text-blue-800 flex justify-between rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                                <span>Selected File:<span className="font-medium"> {data?.logo?.name}</span> </span>
                                <span><XMarkIcon className='w-5 h-5 cursor-pointer' onClick={() => handleChange('logo', '')} /></span>
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
                                    onChange={(e: any) => handleChange('logo', e.target.files[0])}
                                    className="text-neutral-800 px-4 text-lg  border-[1px] border-neutral-300 dark:text-neutral-200 rounded-md"
                                />
                            </div>
                            {/* <Image alt="Company Logo" className='my-2' src={data?.logo} width="100" height="100" /> */}
                        </>
                    }
                </div>
                <div className="px-3 grid grid-cols-1 gap-2 mt-2">
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style2}>Small Logo:</h1>
                    </div>

                    {
                        data?.small_logo ? (
                            <div className="p-4 mb-4 text-sm text-blue-800 flex justify-between rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                                <span>Selected File:<span className="font-medium"> {data?.small_logo?.name}</span> </span>
                                <span><XMarkIcon className='w-5 h-5 cursor-pointer' onClick={() => handleChange('small_logo', '')} /></span>
                            </div>
                        ) : <>
                            <div className="flex-shrink-0  lg:mb-0 grow lg:grow-0 w-full ">
                                <Input
                                    required
                                    aria-required
                                    type="file"
                                    accept='image/*'
                                    // value={data?.smallLogo}
                                    // onChange={(e) => handleChange('smallLogo', e.target.value)}
                                    onChange={(e: any) => handleChange('small_logo', e.target.files[0])}
                                    className="text-neutral-800 px-4 text-lg border-[1px] border-neutral-300 dark:text-neutral-200 rounded-md mb-4"
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-3 py-3 px-3">
                                <div className="flex items-center ">
                                    <input id="default-checkbox2" checked={data?.delete_logo} onChange={(e: any) => handleChange('delete_logo', e.target.checked)} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Check to remove current small logo</label>
                                </div>
                            </div>
                            {/* <Image alt="Company Small Logo" className='my-2 text-md' src={data?.small_logo} width="100" height="100" /> */}
                        </>
                    }
                </div>
                {/* <hr /> */}
                <h4 className='text-2xl font-bold mt-4 mb-3 text-secondary-500 px-3'>Hub Profile Information</h4>
                <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-2">
                    <div className='py-1 px-3 grid grid-cols-1 gap-2 max-sm:border-b-2'>
                        <div className=" w-full flex items-center justify-start ">
                            <h1 className={style2}>Outstanding Shares:</h1>
                        </div>
                        <div className="flex-shrink-0   lg:mb-0 grow lg:grow-0 w-full">
                            <form className="relative">
                                <Input
                                    required
                                    aria-required
                                    placeholder="Enter Outstanding Shares"
                                    type="text"
                                    value={data?.outstanding_shares}
                                    onChange={(e) => handleChange('outstanding_shares', e.target.value)}
                                    className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                                />
                            </form>
                        </div>
                    </div>
                    <div className='py-1 px-3 grid grid-cols-1 gap-2  '>
                        <div className=" w-full flex items-center justify-start">
                            <h1 className={style2}>Transfer Agent Name:</h1>
                        </div>
                        <div className="flex-shrink-0   lg:mb-0 grow lg:grow-0 w-full">
                            <form className="relative">
                                <Input
                                    required
                                    aria-required
                                    placeholder="Enter Agent Name"
                                    type="text"
                                    value={data?.transfer_agent_name}
                                    onChange={(e) => handleChange('transfer_agent_name', e.target.value)}
                                    className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                                />
                            </form>
                        </div>

                    </div>
                </div>
                <div className="px-3 grid grid-cols-1 gap-2 mt-2">
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style2}>Broker Fact Sheet:</h1>
                    </div>


                    {
                        data?.broker_fact_sheet ? (
                            <div className="p-4 mb-4 text-sm text-blue-800 flex justify-between rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                                <span>Selected File:<span className="font-medium"> {data?.broker_fact_sheet?.name}</span> </span>
                                <span><XMarkIcon className='w-5 h-5 cursor-pointer' onClick={() => handleChange('broker_fact_sheet', '')} /></span>
                            </div>
                        ) : <>
                            <div className="flex-shrink-0  lg:mb-0 grow lg:grow-0 w-full ">
                                <Input
                                    required
                                    aria-required
                                    type="file"
                                    accept='.pdf'
                                    // value={data.logo}
                                    // onChange={(e) => handleChange('logo', e.target.value)}
                                    onChange={(e: any) => handleChange('broker_fact_sheet', e.target.files[0])}
                                    className="text-neutral-800 px-4 text-lg  border-[1px] border-neutral-300 dark:text-neutral-200 rounded-md"
                                />
                            </div>
                            {/* <Image alt="Company Broker Fact Sheet" className='my-2' src={data?.broker_fact_sheet} width="100" height="100" /> */}
                        </>
                    }
                </div>
                <div className='px-3 grid grid-cols-1 gap-2 max-md:grid-cols-1 mt-2'>
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style2}>EDGAR/SEDAR Link:</h1>
                    </div>
                    <div className="flex-shrink-0   lg:mb-0 grow w-full">
                        <form className="relative">
                            <Input
                                required
                                aria-required
                                placeholder="Enter EDGAR/SEDAR Link"
                                type="text"
                                value={data?.edgar_sedar_link}
                                onChange={(e) => handleChange('edgar_sedar_link', e.target.value)}
                                className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                            />
                        </form>
                    </div>

                </div>
                <div className='px-3 grid grid-cols-1 gap-2 mt-2'>
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style2}>Transfer Agent URL:</h1>
                    </div>
                    <div className="flex-shrink-0   lg:mb-0 grow w-full">
                        <form className="relative">
                            <Input
                                required
                                aria-required
                                placeholder="Enter Transfer Agent URL"
                                type="text"
                                value={data?.transfer_agent_url}
                                onChange={(e) => handleChange('transfer_agent_url', e.target.value)}
                                className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                            />
                        </form>
                    </div>

                </div>
                <div className='py-1 px-3 grid grid-cols-1 gap-2 mt-2 mb-6'>
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style2}>External Website URL:</h1>
                    </div>
                    <div className="flex-shrink-0   lg:mb-0 grow w-full">
                        <form className="relative">
                            <Input
                                required
                                aria-required
                                placeholder="Enter External Website URL"
                                type="text"
                                value={data?.external_website}
                                onChange={(e) => handleChange('external_website', e.target.value)}
                                className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                            />
                        </form>
                    </div>

                </div>
                <div className='px-3 grid grid-cols-1 gap-2 mt-2'>
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style2}>Youtube Channel URL:</h1>
                    </div>
                    <div className="flex-shrink-0   lg:mb-0 grow w-full">
                        <form className="relative">
                            <Input
                                required
                                aria-required
                                placeholder="Enter Youtube Channel URL"
                                type="text"
                                value={data?.youtube_channel}
                                onChange={(e) => handleChange('youtube_channel', e.target.value)}
                                className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                            />
                        </form>
                    </div>

                </div>
                {/* <hr /> */}
                <h4 className='text-2xl font-bold mt-4 mb-3 text-secondary-500 px-3'>Client / Hub Information</h4>


                <div className='py-1 px-3 grid grid-flow-row gap-2'>
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style2}>Hub Type:</h1>
                    </div>
                    <div className="flex justify-start w-full ">
                        <Select className='lg:w-full' rounded='rounded-md' menuDropdown={hubOption} selectedValue={data?.hub_type} setMenu={(e: any) => handleChange('hub_type', e)} />
                    </div>

                </div>
                <div className="grid grid-cols-1 gap-3 py-3 px-3">
                    <div className="flex items-center ">
                        <input id="default-checkbox" checked={data?.is_active} onChange={(e: any) => handleChange('is_active', e.target.checked)} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Active</label>
                    </div>
                </div>
                {/* <hr /> */}
                {/* <h4 className='text-2xl font-bold mt-4 mb-3 text-secondary-500 px-3'>Campaigner</h4>
                <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
                    <div className='px-3 grid grid-cols-1 gap-2 mt-2'>
                        <div className=" w-full flex items-center justify-start">
                            <h1 className={style2}>Campaigner ID:</h1>
                        </div>
                        <div className="flex-shrink-0   lg:mb-0 grow w-full">
                            <form className="relative">
                                <Input
                                    required
                                    aria-required
                                    placeholder="Enter Campaigner ID"
                                    type="text"
                                    value={data?.campaigner_id}
                                    onChange={(e) => handleChange('campaigner_id', e.target.value)}
                                    className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                                />
                            </form>
                        </div>

                    </div>
                    <div className='py-1 px-3 grid grid-flow-row gap-2'>
                        <div className=" w-full flex items-center justify-start">
                            <h1 className={style2}>Campaigner ID:</h1>
                        </div>
                        <div className="flex justify-start w-full ">
                            <Select className='lg:w-full' rounded='rounded-md' menuDropdown={campaignerOption} selectedValue={data?.campaign_type} setMenu={(e: any) => handleChange('campaign_type', e)} />
                        </div>

                    </div>
                </div> */}
                {/* <hr /> */}
                <h4 className='text-2xl font-bold mt-4 mb-3 text-secondary-500 px-3'>SEO</h4>
                <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">

                    <div className='py-1 px-3 grid grid-flow-row gap-2'>
                        <div className=" w-full flex items-center justify-start">
                            <h1 className={style2}>Title:</h1>
                        </div>
                        <div className="flex-shrink-0 w-full">
                            <form className="relative">
                                <Input
                                    required
                                    aria-required
                                    placeholder="Enter Title"
                                    type="text"
                                    value={data?.seo_title}
                                    onChange={(e) => handleChange('seo_title', e.target.value)}
                                    className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                                />
                            </form>
                        </div>

                    </div>

                    <div className='py-1 px-3 grid grid-flow-row gap-2'>
                        <div className=" w-full flex items-center justify-start">
                            <h1 className={style2}>Keywords:</h1>
                        </div>
                        <div className="flex-shrink-0 w-full">
                            <form className="relative">
                                <Input
                                    required
                                    aria-required
                                    placeholder="Enter Keywords"
                                    type="text"
                                    value={data?.seo_keywords}
                                    onChange={(e) => handleChange('seo_keywords', e.target.value)}
                                    className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                                />
                            </form>
                        </div>

                    </div>
                </div>
                <div className='px-3 grid grid-cols-1 gap-2'>
                    <div className=" w-full flex items-start justify-start">
                        <h1 className={style2}>Description:</h1>
                    </div>
                    <div className="flex-shrink-0   lg:mb-0 grow lg:grow-0 w-full">
                        <form className="relative">
                            <textarea
                                required
                                aria-required
                                value={data?.seo_description}
                                onChange={(e) => handleChange('seo_description', e.target.value)}
                                className="text-neutral-800 border-neutral-300 h-44 w-full px-4 dark:text-neutral-200 max-md:w-full dark:bg-neutral-800"
                            />
                        </form>
                    </div>

                </div>
                {/* <hr /> */}
                <h4 className='text-2xl font-bold mt-4 mb-3 text-secondary-500 px-3'>Text Content</h4>
                <div className='px-3 grid grid-cols-1 gap-2'>
                    <div className=" w-full flex items-start justify-start">
                        <h1 className={style2}>Company Overview:</h1>
                    </div>
                    <div className="flex-shrink-0   lg:mb-0 grow lg:grow-0 w-full">
                        <form className="relative">
                            <textarea
                                required
                                aria-required
                                value={data?.overview}
                                onChange={(e) => handleChange('overview', e.target.value)}
                                className="text-neutral-800 border-neutral-300 h-44 w-full px-4 dark:text-neutral-200 max-md:w-full dark:bg-neutral-800"
                            />
                        </form>
                    </div>

                </div>
                <div className='px-3 grid grid-cols-1 gap-2 mt-2'>
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style2}>Banner Text:</h1>
                    </div>
                    <div className="flex-shrink-0   lg:mb-0 grow w-full">
                        <form className="relative">
                            <Input
                                required
                                aria-required
                                placeholder="Enter Banner Text"
                                type="text"
                                value={data?.banner_text}
                                onChange={(e) => handleChange('banner_text', e.target.value)}
                                className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                            />
                        </form>
                    </div>

                </div>
                <div className='px-3 grid grid-cols-1 gap-2 mt-2'>
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style2}>Sub Banner Text:</h1>
                    </div>
                    <div className="flex-shrink-0   lg:mb-0 grow w-full">
                        <form className="relative">
                            <Input
                                required
                                aria-required
                                placeholder="Enter Sub Banner Text"
                                type="text"
                                value={data?.sub_banner_text}
                                onChange={(e) => handleChange('sub_banner_text', e.target.value)}
                                className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                            />
                        </form>
                    </div>

                </div>
                <div className="px-3 grid grid-cols-1 gap-2 mt-2">
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style2}>Profile:</h1>
                    </div>
                    <div className="w-full">
                        {/* <ReactQuill value={data?.username} onChange={(e: any) => handleChange('username', e)} /> */}
                        <DynamicComponentWithNoSSR data={data?.username} setData={(e: any) => handleChange('username', e)} />
                    </div>
                </div>
                <div className='px-3 py-1 grid grid-cols-1 gap-2'>
                    <div className=" w-full flex items-start justify-start">
                        <h1 className={style2}>Marketplace Summary:</h1>
                    </div>
                    <div className="flex-shrink-0   lg:mb-0 grow lg:grow-0 w-full">
                        <form className="relative">
                            <textarea
                                required
                                aria-required
                                value={data?.summary}
                                onChange={(e) => handleChange('summary', e.target.value)}
                                className="text-neutral-800 border-neutral-300 h-44 w-full px-4 dark:text-neutral-200 max-md:w-full dark:bg-neutral-800"
                            />
                        </form>
                    </div>

                </div>
                {/* <hr /> */}
                <h4 className='text-2xl font-bold mt-4 mb-3 text-secondary-500 px-3'>Company Promotion</h4>
                <div className="grid grid-cols-1 gap-3 py-3 px-3">
                    <div className="flex items-center ">
                        <input id="default-checkbox3" checked={data?.sponsored} onChange={(e: any) => handleChange('sponsored', e.target.checked)} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sponsored</label>
                    </div>
                    <div className="flex items-center ">
                        <input id="default-checkbox4" checked={data?.is_featured} onChange={(e: any) => handleChange('is_featured', e.target.checked)} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Popular Hub</label>
                    </div>
                    <div className="flex items-center ">
                        <input id="default-checkbox5" checked={data?.is_top} onChange={(e: any) => handleChange('is_top', e.target.checked)} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="default-checkbox7" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Top company</label>
                    </div>
                </div>


                {
                    errors.length > 0 && errors.map((item: any, index: number) => {
                        return (
                            <div key={index} className={`p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 mb-2`} role="alert">
                                {item}
                            </div>
                        )
                    })
                }
                <div className="py-4 px-3 flex flex-row items-center justify-center gap-4 ">
                    <ButtonPrimary loading={loader} onClick={submit}>Save</ButtonPrimary>
                    <h2 className={style2}>or</h2>
                    <ButtonPrimary className=' bg-white hover:bg-slate-300' onClick={reset}><span className='text-red-600'>Clear</span></ButtonPrimary>
                </div>
            </div>
        </div>
    )
}

export default AdminCompanyPage