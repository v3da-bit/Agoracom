'use client';
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import Heading from '@/components/Heading/Heading';
import Input from '@/components/Input/Input';
import Nav from '@/components/Nav/Nav';
import NavItem from '@/components/NavItem/NavItem';
import Select from '@/components/Select/Select';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function BroadCasts() {
    const style = 'font-semibold text-xl text-white max-md:text-md'
    const style2 = ' font-semibold text-right text-base text-dark'
    const [industry, setIndustry] = useState('posts');
    const router = useRouter()

    const menuDropdown: any = {
        'posts': "Newest",
        'top_rated_posts': "Top Rated",
        'oldest_posts': "Oldest"
    };
    const handleFilterChange = (val: any) => {
        setIndustry(val);
    }
    const tabs: any = [
        { id: 1, title: "Profile" },
        { id: 2, title: "BroadCasts" },
        { id: 3, title: "Executive Addresses" },
        { id: 4, title: "Messages" },
        { id: 5, title: "Management" },
        { id: 6, title: "Authorities" },

    ]
    const [tabActive, setTabActive] = useState<number>(tabs[1].id);
    const handleClickTab = (item: number) => {
        if (item === tabActive) {
            return;
        }
        setTabActive(item);
    };

    const DynamicComponentWithNoSSR = dynamic(
        () => import('@/components/TextEditor/TextEditor'),
        { ssr: false }
    )
    return (
        <div className='w-full bg-white dark:bg-neutral-900  grid grid-flow-row gap-2 py-3 px-3'>
            <Heading desc={""} className="text-defaultBlue-100 mb-3">Company_Name</Heading>
            <div className="flex flex-col gap-3 px-4">
                <div className="flex flex-row gap-3">
                    <h1>Company Name:</h1>
                    <h1>Company_Name</h1>
                </div>
                <div className="flex flex-row gap-3">
                    <h1>Hub Type:</h1>
                    <h1>Hub_Type</h1>
                </div>
                <div className="flex flex-row gap-3">
                    <h1>Hub Page:</h1>
                    <h1>Hub_Page</h1>
                </div>
            </div>
            <div className="mt-6 px-4">
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
                        <div className=" mb-4 px-0 lg:px-4">
                            {
                                tabActive == 1 ?
                                    router.push('/admin/companies/broadcast/profile') :
                                    tabActive == 2 ?
                                        router.push('/admin/companies/broadcast') :
                                        tabActive == 3 ?
                                            router.push('/admin/companies/broadcast/executive-message') :
                                            tabActive == 4 ?
                                                router.push('/admin/companies/broadcast/messages') :
                                                tabActive == 5 ?
                                                    router.push('/admin/companies/broadcast/management') :
                                                    tabActive == 6 ?
                                                        router.push('/admin/companies/broadcast/authorities') :
                                                        <></>
                            }
                        </div>



                    </div>

                </div>

            </div>
            <div className='py-2 px-2'>
                <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1 mb-6 mt-2">
                    <div className='py-1 px-3 grid grid-flow-row gap-2'>
                        <div className=" w-full flex items-center justify-start">
                            <h1 className={style2}>Company Name:*</h1>
                        </div>
                        <div className="flex-shrink-0 w-full">
                            <form className="relative">
                                <Input
                                    required
                                    aria-required
                                    placeholder="Enter Company Name"
                                    type="text"
                                    value={""}
                                    // onChange={(e) => handleChange('ticker', e.target.value)}
                                    className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                                />
                            </form>
                        </div>

                    </div>
                    <div className='py-1 px-3 grid grid-flow-row gap-2'>
                        <div className=" w-full flex items-center justify-start">
                            <h1 className={style2}>Hub Path:*</h1>
                        </div>
                        <div className="flex-shrink-0 w-full">
                            <form className="relative">
                                <Input
                                    required
                                    aria-required
                                    placeholder="Enter Hub Path"
                                    type="text"
                                    value={""}
                                    // onChange={(e) => handleChange('ticker', e.target.value)}
                                    className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                                />
                            </form>
                        </div>

                    </div>

                </div>
                <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1 mb-6 mt-2">
                    <div className='py-1 px-3 grid grid-flow-row gap-2'>
                        <div className=" w-full flex items-center justify-start">
                            <h1 className={style2}>Stock Symbol:*</h1>
                        </div>
                        <div className="flex-shrink-0 w-full">
                            <form className="relative">
                                <Input
                                    required
                                    aria-required
                                    placeholder="Enter Stock Symbol"
                                    type="text"
                                    value={""}
                                    // onChange={(e) => handleChange('ticker', e.target.value)}
                                    className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                                />
                            </form>
                        </div>

                    </div>
                    <div className='py-1 px-3 grid grid-flow-row gap-2'>
                        <div className=" w-full flex items-center justify-start">
                            <h1 className={style2}>Ticker:*</h1>
                        </div>
                        <div className="flex-shrink-0 w-full">
                            <form className="relative">
                                <Input
                                    required
                                    aria-required
                                    placeholder="Enter Ticker"
                                    type="text"
                                    value={""}
                                    // onChange={(e) => handleChange('ticker', e.target.value)}
                                    className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                                />
                            </form>
                        </div>

                    </div>


                </div>
                <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1 mb-6 mt-2">
                    <div className='py-1 px-3 grid grid-cols-1 gap-1 w-full max-sm:border-b-2'>
                        <div className=" flex items-center justify-start">
                            <h1 className={style2}>Industry:*</h1>
                        </div>
                        <div className="flex w-full ">
                            <Select className='lg:w-full' rounded='rounded-md' menuDropdown={menuDropdown} selectedValue={industry} setMenu={handleFilterChange} />
                        </div>

                    </div>
                    <div className='py-1 px-3 grid grid-cols-1 gap-1'>
                        <div className="w-full flex items-center justify-start">
                            <h1 className={style2}>Exchange:*</h1>
                        </div>
                        <div className="flex justify-start w-full ">
                            <Select className='lg:w-full' rounded='rounded-md' menuDropdown={menuDropdown} selectedValue={industry} setMenu={handleFilterChange} />
                        </div>

                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1 mb-6 mt-2">
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
                                    value={""}
                                    // onChange={(e) => handleChange('ticker', e.target.value)}
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
                                    value={""}
                                    // onChange={(e) => handleChange('ticker', e.target.value)}
                                    className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                                />
                            </form>
                        </div>

                    </div>


                </div>
                <div className='py-1 px-3 grid grid-cols-1 gap-2 max-sm:border-b-2'>
                    <div className=" w-full flex items-center justify-start ">
                        <h1 className={style2}>Outstanding Shares:</h1>
                    </div>
                    <div className="flex justify-start w-full ">
                        <Select className='lg:w-full' rounded='rounded-md' menuDropdown={menuDropdown} selectedValue={industry} setMenu={handleFilterChange} />
                    </div>
                </div>
                <div className="px-3 grid grid-cols-1 gap-2 mt-2">
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style2}>Logo:</h1>
                    </div>
                    <div className="flex-shrink-0  lg:mb-0 grow lg:grow-0 w-full ">
                        <Input
                            required
                            aria-required
                            type="file"
                            accept='image/*'
                            value={""}
                            // onChange={(e) => handleChange('logo', e.target.value)}
                            className="text-neutral-800 px-4 text-lg  border-[1px] border-neutral-300 dark:text-neutral-200 rounded-md"
                        />
                    </div>


                </div>
                <div className="px-3 grid grid-cols-1 gap-2 mt-2">
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style2}>Small Logo:</h1>
                    </div>
                    <div className="flex-shrink-0  lg:mb-0 grow lg:grow-0 w-full ">
                        <Input
                            required
                            aria-required
                            type="file"
                            accept='image/*'
                            value={""}
                            // onChange={(e) => handleChange('logo', e.target.value)}
                            className="text-neutral-800 px-4 text-lg  border-[1px] border-neutral-300 dark:text-neutral-200 rounded-md"
                        />
                    </div>


                </div>

                {/* <hr /> */}
                <h4 className='text-2xl font-bold mt-6 mb-3 text-secondary-500 px-3'>Hub Profile Information</h4>
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
                                    value={""}
                                    // onChange={(e) => handleChange('outShares', e.target.value)}
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
                                    value={""}
                                    // onChange={(e) => handleChange('agentName', e.target.value)}
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
                                value={""}
                                // onChange={(e) => handleChange('sedarLink', e.target.value)}
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
                                value={""}
                                // onChange={(e) => handleChange('agentUrl', e.target.value)}
                                className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                            />
                        </form>
                    </div>

                </div>
                <div className="px-3 grid grid-cols-1 gap-2 mt-2">
                    <div className=" w-full flex items-center justify-start">
                        <h1 className={style2}>Broker Fact Sheet:</h1>
                    </div>
                    <div className="flex-shrink-0  lg:mb-0 grow lg:grow-0 w-full ">
                        <Input
                            required
                            aria-required
                            type="file"
                            accept='image/*'
                            value={""}
                            // onChange={(e) => handleChange('logo', e.target.value)}
                            className="text-neutral-800 px-4 text-lg  border-[1px] border-neutral-300 dark:text-neutral-200 rounded-md"
                        />
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
                                value={""}
                                // onChange={(e) => handleChange('websiteUrl', e.target.value)}
                                className="text-neutral-800 px-4 dark:text-neutral-200 rounded-md"
                            />
                        </form>
                    </div>

                </div>
                {/* <hr/> */}
                <h4 className='text-2xl font-bold mt-4 mb-3 text-secondary-500 px-3'>Client / Hub Information</h4>
                <div className='py-1 px-3 grid grid-cols-1 gap-2 max-sm:border-b-2'>
                    <div className=" w-full flex items-center justify-start ">
                        <h1 className={style2}>Hub Type:</h1>
                    </div>
                    <div className="flex justify-start w-full ">
                        <Select className='lg:w-full' rounded='rounded-md' menuDropdown={menuDropdown} selectedValue={industry} setMenu={handleFilterChange} />
                    </div>
                </div>
                <div className="grid grid-flow-row gap-2 px-3 py-3">


                    <div className="flex items-center ">
                        <input id="default-checkbox1" type="checkbox" checked className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Active</label>
                    </div>
                    <div className="flex items-center ">
                        <input id="default-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Listed in marketplace</label>
                    </div>

                </div>
                {/* <hr /> */}
                <h4 className='text-2xl font-bold mt-6 mb-3 text-secondary-500 px-3'>Campaigner</h4>
                <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1 mb-6 mt-2">
                    <div className='py-1 px-3 grid grid-flow-row gap-2'>
                        <div className=" w-full flex items-center justify-start">
                            <h1 className={style2}>Campaigner ID:</h1>
                        </div>
                        <div className="flex-shrink-0 w-full">
                            <form className="relative">
                                <Input
                                    required
                                    aria-required
                                    placeholder="Enter Campaigner ID"
                                    type="text"
                                    value={""}
                                    // onChange={(e) => handleChange('ticker', e.target.value)}
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
                            <Select className='lg:w-full' rounded='rounded-md' menuDropdown={menuDropdown} selectedValue={industry} setMenu={handleFilterChange} />
                        </div>

                    </div>


                </div>
                {/* <hr /> */}
                <h4 className='text-2xl font-bold mt-6 mb-3 text-secondary-500 px-3'>SEO</h4>
                <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1 mb-6 mt-2">
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
                                    value={""}
                                    // onChange={(e) => handleChange('ticker', e.target.value)}
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
                                    value={""}
                                    // onChange={(e) => handleChange('ticker', e.target.value)}
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
                                value={""}
                                // onChange={(e) => handleChange('overview', e.target.value)}
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
                                value={""}
                                // onChange={(e) => handleChange('overview', e.target.value)}
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
                                value={""}
                                // onChange={(e) => handleChange('bannerText', e.target.value)}
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
                                value={""}
                                // onChange={(e) => handleChange('subBannerText', e.target.value)}
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
                        <DynamicComponentWithNoSSR data={""} setData={(e: any) => console.log(e)} />
                    </div>
                </div>
                <div className='px-3 grid grid-cols-1 gap-2'>
                    <div className=" w-full flex items-start justify-start">
                        <h1 className={style2}>Marketplace Summary:</h1>
                    </div>
                    <div className="flex-shrink-0   lg:mb-0 grow lg:grow-0 w-full">
                        <form className="relative">
                            <textarea
                                required
                                aria-required
                                value={""}
                                // onChange={(e) => handleChange('overview', e.target.value)}
                                className="text-neutral-800 border-neutral-300 h-44 w-full px-4 dark:text-neutral-200 max-md:w-full dark:bg-neutral-800"
                            />
                        </form>
                    </div>

                </div>
                {/* <hr /> */}
                <h4 className='text-2xl font-bold mt-6 mb-3 text-secondary-500 px-3'>Company Promotion</h4>
                <div className="grid grid-flow-row gap-2 px-3 py-3">


                    <div className="flex items-center ">
                        <input id="default-checkbox1" type="checkbox" checked className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sponsored</label>
                    </div>
                    <div className="flex items-center ">
                        <input id="default-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Popular Hub</label>
                    </div>
                    <div className="flex items-center ">
                        <input id="default-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Top company</label>
                    </div>

                </div>

                <div className="py-4 px-3 flex flex-row items-center justify-center gap-4 ">
                    <ButtonPrimary sizeClass='py-2.5 px-4'>Save</ButtonPrimary>
                    <h2 className={style2}>or</h2>
                    <ButtonPrimary className=' bg-white hover:bg-slate-300'><span className='text-red-600'>Cancel</span></ButtonPrimary>
                </div>
            </div>
        </div>

    )
}

export default BroadCasts