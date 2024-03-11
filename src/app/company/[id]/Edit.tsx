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
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux'

function Edit({ info, user, setTabActive }: any) {

    const { currentUser, loggedIn } = useSelector((state: any) => {
        return {
            currentUser: state.auth.currentUser,
            loggedIn: state.auth.loggedIn
        };
    });

    const style = 'font-semibold text-xl text-white max-md:text-md'
    const style2 = ' font-semibold text-right text-base text-dark'
    const menuDropdown: any = {
        'posts': "Newest",
        'top_rated_posts': "Top Rated",
        'oldest_posts': "Oldest"
    };
    const initialData = {
        ticker: '',
        industry: '',
        exchange: '',
        outShares: '',
        agentName: '',
        sedarLink: '',
        agentUrl: '',
        websiteUrl: '',
        overview: '',
        bannerText: '',
        subBannerText: '',
        logo: '',
        smallLogo: ''
    }
    const industryOptions = {
        "0": "Metals & Minerals",
        "1": "Energy & Environment",
        "2": "Technology & Medical",
        "3": "Bricks & Mortar",
        "4": "Financial Services",
        "5": "E - commerce",
        "6": "Psychedelics",
        "7": "Fintech",
        "8": "Cannabis",
        "9": "Internet of Things",
        "10": "Proptech",
        "11": "Technology",
    }
    const exchangeOptions = {
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

    useEffect(() => {
        companyDetails(params.id);
    }, [])

    const companyDetails = async (id: any) => {
        try {
            const headers = {
                'access-token': currentUser?.accessToken,
                'client': currentUser?.client,
                'uid': currentUser?.uid
            }
            const response: any = await companyInfo(id, headers);
            if (response.status === 200) {
                console.log(response.data);
                if (response?.status === 200) {
                    const {
                        banner_text,
                        company_overview,
                        edgar_sedar_link,
                        external_website,
                        industry_id,
                        logo,
                        outstanding_shares,
                        overview,
                        small_logo,
                        stock_exchange_id,
                        sub_banner_text,
                        ticker,
                        transfer_agent_name,
                        transfer_agent_url
                    } = response.data;
                    setData({
                        ...data,
                        outShares: outstanding_shares,
                        overview: company_overview,
                        smallLogo: small_logo,
                        logo: logo,
                        bannerText: banner_text,
                        subBannerText: sub_banner_text,
                        ticker: ticker,
                        agentName: transfer_agent_name,
                        agentUrl: transfer_agent_url,
                        sedarLink: edgar_sedar_link,
                        websiteUrl: external_website,
                    })
                    setExchange(stock_exchange_id)
                    setIndustry(industry_id)
                    setProfile(overview);
                }
            }
        } catch (e: any) {
            console.log(e);

        }
    }

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
        if (validator.allValid()) {
            const { outShares,
                overview,
                smallLogo,
                logo,
                bannerText,
                subBannerText,
                ticker,
                agentName,
                agentUrl,
                sedarLink,
                websiteUrl } = data;
            // params: {
            //     :ticker, :industry_id, :stock_exchange_id, :outstanding_shares, :edgar_sedar_link,
            //     :transfer_agent_name, :transfer_agent_url, :external_website, :company_overview,
            //     :banner_text, :sub_banner_text, :overview, :logo, :small_logo
            //    }
            const fd: any = new FormData();
            const company: any = {
                'ticker': ticker,
                'industry_id': industry,
                'stock_exchange_id': exchange,
                'outstanding_shares': outShares,
                'edgar_sedar_link': sedarLink,
                'transfer_agent_name': agentName,
                'transfer_agent_url': agentUrl,
                'external_website': websiteUrl,
                'company_overview': overview || '',
                'banner_text': bannerText,
                'sub_banner_text': subBannerText,
                'overview': profile,
            }
            if (selectedLogoFile) {
                company['logo'] = selectedLogoFile
            }
            if (selectedSmallLogoFile) {
                company['small_logo'] = selectedSmallLogoFile
            }
            Object.keys(company).forEach((key) => {
                fd.append(`company[${key}]`, company[key]);
            });
            try {
                setLoader(true);
                const headers = {
                    'access-token': currentUser?.accessToken,
                    'client': currentUser?.client,
                    'uid': currentUser?.uid,
                    "Content-Type": "multipart/form-data"
                }
                const response: any = await updateCompany(params?.id, fd, headers);
                setLoader(false)
                if (response.status === 201 || response.status === 200) {
                    alertMessage({
                        title: "Company updated successfully",
                        text: "",
                        icon: "success",
                        timer: 3000
                    });
                    router.push(`/company/${params.id}`)
                    setTabActive(1);
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

    return (
        <div className='border-t-2 border-black py-5'>
            <div className='w-full bg-white  grid grid-flow-row gap-2'>
                <div className="bg-blue-600 py-3 px-3">
                    <h1 className={style}>Editing {info.name}</h1>
                </div>
                <div className='py-4 px-4'>
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
                    <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1 mb-6 mt-2">
                        <div className='py-1 px-3 grid grid-cols-1 gap-1 w-full max-sm:border-b-2'>
                            <div className=" flex items-center justify-start">
                                <h1 className={style2}>Industry:*</h1>
                            </div>
                            <div className="flex w-full ">
                                <Select className='lg:w-full' rounded='rounded-md' menuDropdown={industryOptions} selectedValue={industry} setMenu={handleFilterChange} />
                            </div>

                        </div>
                        <div className='py-1 px-3 grid grid-cols-1 gap-1'>
                            <div className="w-full flex items-center justify-start">
                                <h1 className={style2}>Exchange:*</h1>
                            </div>
                            <div className="flex justify-start w-full ">
                                <Select className='lg:w-full' rounded='rounded-md' menuDropdown={exchangeOptions} selectedValue={exchange} setMenu={handleFilterChange2} />
                            </div>

                        </div>
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
                                        value={data?.outShares}
                                        onChange={(e) => handleChange('outShares', e.target.value)}
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
                                        value={data?.agentName}
                                        onChange={(e) => handleChange('agentName', e.target.value)}
                                        className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                                    />
                                </form>
                            </div>

                        </div>
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
                                    value={data?.sedarLink}
                                    onChange={(e) => handleChange('sedarLink', e.target.value)}
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
                                    value={data?.agentUrl}
                                    onChange={(e) => handleChange('agentUrl', e.target.value)}
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
                                    value={data?.websiteUrl}
                                    onChange={(e) => handleChange('websiteUrl', e.target.value)}
                                    className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
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
                                    value={data?.bannerText}
                                    onChange={(e) => handleChange('bannerText', e.target.value)}
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
                                    value={data?.subBannerText}
                                    onChange={(e) => handleChange('subBannerText', e.target.value)}
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
                            <ReactQuill theme="snow" className='bg-white' value={profile} onChange={(e: any) => setProfile(e)} />
                        </div>
                    </div>
                    <div className="px-3 grid grid-cols-1 gap-2 mt-2">
                        <div className=" w-full flex items-center justify-start">
                            <h1 className={style2}>Logo:</h1>
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
                                        onChange={(e: any) => setSelectedLogoFile(e.target.files[0])}
                                        className="text-neutral-800 px-4 text-lg  border-[1px] border-neutral-300 dark:text-neutral-200 rounded-md"
                                    />
                                </div>
                                <Image alt="Company Logo" className='my-2' src={data?.logo} width="100" height="100" />
                            </>
                        }
                    </div>
                    <div className="px-3 grid grid-cols-1 gap-2 mt-2">
                        <div className=" w-full flex items-center justify-start">
                            <h1 className={style2}>Small Logo:</h1>
                        </div>

                        {
                            selectedSmallLogoFile ? (
                                <div className="p-4 mb-4 text-sm text-blue-800 flex justify-between rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                                    <span>Selected File:<span className="font-medium"> {selectedSmallLogoFile?.name}</span> </span>
                                    <span><XMarkIcon className='w-5 h-5 cursor-pointer' onClick={() => setSelectedSmallLogoFile(null)} /></span>
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
                                        onChange={(e: any) => setSelectedSmallLogoFile(e.target.files[0])}
                                        className="text-neutral-800 px-4 text-lg border-[1px] border-neutral-300 dark:text-neutral-200 rounded-md mb-4"
                                    />
                                </div>
                                <Image alt="Company Small Logo" className='my-2 text-md' src={data?.smallLogo} width="100" height="100" />
                            </>
                        }
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
                    <div className="py-4 px-3 flex flex-row items-center justify-center gap-4 ">
                        <ButtonPrimary sizeClass='py-2.5 px-4' loading={loader} onClick={submit}>Save</ButtonPrimary>
                        <h2 className={style2}>or</h2>
                        <ButtonPrimary className=' bg-white bg-slate-200 hover:bg-slate-300' onClick={reset}><span className='text-red-600'>Clear</span></ButtonPrimary>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edit