'use client';

import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Heading from "@/components/Heading/Heading";
import Input from "@/components/Input/Input";
import Select from "@/components/Select/Select";
import useValidator from "@/hooks/useValidator";
import { newHub } from "@/requests/Extras";
import alertMessage from "@/utils/swalAlert";
import { useState } from "react";

export default function NewHub () {

    const initialData = {
        industry: '0',
        exchange: '0',
        forum: '0',
        username: "",
        email: "",
        reason: "",
        companyName: "",
        symbol: "",
        example1: "",
        example2: "",
        example3: "",
        hubLeader: 1,
        nomineeEmail: ""
    }
    const [validator, showValidationMessage]: any = useValidator()
    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState([]);
    const [data, setData] = useState(initialData);
    const industryOptions = {
        "0": "Metals & Minerals",
        "1": "Energy & Environment",
        "2": "Technology & Medical",
        "3": "Bricks & Mortar",
        "4": "Financial Services",
        "5": "E-commerce",
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
        "12": "Private"
    }
    const forumOptions = {
        "AOL Finance": "AOL Finance",
        "Investor Village": "Investor Village",
        "Investors Hub": "Investors Hub",
        "Other": "Other",
        "Raging Bull": "Raging Bull",
        "Silicon Investor": "Silicon Investor",
        "StockHouse": "StockHouse",
        "Yahoo! Finance": "Yahoo! Finance"
    }

    const handleChange = (key: string, value: any) => {
        setData({
            ...data,
            [key]: value
        })
    }

    const resetForm = () => {
        setData(initialData);
        setErrors([]);
        showValidationMessage(false);
    }

    const submitHandler = async (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (validator.allValid()) {
            setErrors([]);
            
            let payload = {
                name: data.companyName,
                stock_symbol: data.symbol,
                industry_id: data.industry,
                stock_exchange_id: data.exchange,
                nominator_email: data.email,
                nomination_type: data.hubLeader,
                reason: data.reason,
                post_example_1: data.example1,
                post_example_2: data.example2,
                post_example_3: data.example3,
                forum: data.forum,
                username: data.username,
                email: data.nomineeEmail
            } 
            try {
                setLoader(true);
                let response = await newHub(payload);
                setLoader(false);
                if (response.status === 201) {
                    alertMessage({
                        title: "Request submitted successfully!",
                        text: "",
                        icon: "success",
                        timer: 3000
                    });
                    resetForm();
                }
            } catch (e: any) {
                setLoader(false);
                if (e?.response?.data?.errors?.length > 0) {
                    setErrors(e?.response?.data?.errors);
                } else {
                    const error: any = ["Something went wrong. Try again"];
                    setErrors(error);
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
        <div className="container-fluid">
            <div className='w-full h-fit bg-secondary-6000'>
                <div className="container grid grid-cols-1 lg:grid-cols-2">
                    <div className="w-full h-fit py-16">
                        <h1 className=' text-3xl font-bold text-white lg:text-5xl '>
                            Why start a new HUB on Agoracom?
                        </h1>
                        <div className="text-white text-lg font-semibold mt-6">
                            <h5>Agoracom is the only site that offers all of the following</h5>
                            <div className="mt-5 w-full pl-16 text-base">
                                <ul className="grid grid-cols-1 lg:grid-cols-2 unordered-list-style gap-3">
                                    <li className="pr-6">100% investor controlled discussion forums</li>
                                    <li className="pr-6">1 click ability to terminate and ban unruly posters</li>
                                    <li className="pr-6">1 click ability to edit company profiles, logos, management, stock info and all content</li>
                                    <li className="pr-6">Member ranking system that gives members more controls as the graduate</li>
                                    <li className="pr-6">1 click ability to delete posts</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div>
                        {/* Video */}
                    </div>
                </div>
            </div>
            <div className="w-full bg-gray-100">
                <div className="container py-12 lg:py-20">
                    <div className="bg-white w-full h-fit rounded py-12 px-4 lg:px-16">
                        <Heading desc={""} isCenter className="text-defaultBlue-100 mb-5 lg:mb-9">
                            Request Hub
                        </Heading>
                        <div className="w-full h-fit grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-3 lg:gap-y-4">
                            <div className="w-full h-fit mt-4">
                                <h6 className="text-base">Company Name*</h6>
                                <Input
                                    required
                                    aria-required
                                    placeholder="Enter Company Name"
                                    type="text"
                                    value={data.companyName}
                                    rounded={"rounded"}
                                    // onBlur={() => validator.showMessageFor('email')}
                                    onChange={(e) => handleChange("companyName", e.target.value)}
                                    className="text-neutral-800 px-4 mt-1 dark:text-neutral-200"
                                />
                                <div className="w-full mt-1 text-red-500 text-sm">
                                    {validator.message('companyName', data.companyName, 'required')}
                                </div>
                            </div>
                            <div className="w-full h-fit mt-4">
                                <h6 className="text-base">Industry*</h6>
                                <Select menuDropdown={industryOptions} rounded="!rounded" className="!w-full" selectedValue={data.industry} setMenu={(val: any) => handleChange('industry', val)} />
                                <div className="w-full mt-1 text-red-500 text-sm">
                                    {validator.message('industry', data.industry, 'required')}
                                </div>
                            </div>
                            <div className="w-full h-fit mt-4">
                                <h6 className="text-base">Stock Symbol*</h6>
                                <Input
                                    required
                                    aria-required
                                    placeholder="Enter Stock Symbol"
                                    type="text"
                                    value={data.symbol}
                                    rounded={"rounded"}
                                    // onBlur={() => validator.showMessageFor('email')}
                                    onChange={(e) => handleChange("symbol", e.target.value)}
                                    className="text-neutral-800 px-4 mt-1 dark:text-neutral-200"
                                />
                                <div className="w-full mt-1 text-red-500 text-sm">
                                    {validator.message('symbol', data.symbol, 'required')}
                                </div>
                            </div>
                            <div className="w-full h-fit mt-4">
                                <h6 className="text-base">Exchange*</h6>
                                <Select menuDropdown={exchangeOptions} rounded="!rounded" className="!w-full" selectedValue={data.exchange} setMenu={(val: any) => handleChange('exchange', val)} />
                                <div className="w-full mt-1 text-red-500 text-sm">
                                    {validator.message('exchange', data.exchange, 'required')}
                                </div>
                            </div>
                            <div className="w-full h-fit mt-4">
                                <h6 className="text-base">Your Email Address*</h6>
                                <Input
                                    required
                                    aria-required
                                    placeholder="Enter Email Address"
                                    type="text"
                                    value={data.email}
                                    rounded={"rounded"}
                                    // onBlur={() => validator.showMessageFor('email')}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    className="text-neutral-800 px-4 mt-1 dark:text-neutral-200"
                                />
                                <div className="w-full mt-1 text-red-500 text-sm">
                                    {validator.message('email', data.email, 'required|email')}
                                </div>
                            </div>
                            <div className="w-full h-fit mt-4">
                                <h6 className="text-base">Username*</h6>
                                <Input
                                    required
                                    aria-required
                                    placeholder="Enter Username"
                                    type="text"
                                    value={data.username}
                                    rounded={"rounded"}
                                    // onBlur={() => validator.showMessageFor('email')}
                                    onChange={(e) => handleChange("username", e.target.value)}
                                    className="text-neutral-800 px-4 mt-1 dark:text-neutral-200"
                                />
                                <div className="w-full mt-1 text-red-500 text-sm">
                                    {validator.message('username', data.username, 'required')}
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-fit grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4 lg:gap-y-2">
                            <div className="w-full h-fit mt-4">
                                <h6 className="text-base">Forum*</h6>
                                <Select menuDropdown={forumOptions} rounded="!rounded" className="!w-full" selectedValue={data.forum} setMenu={(val: any) => handleChange('forum', val)} />
                                <div className="w-full mt-1 text-red-500 text-sm">
                                    {validator.message('forum', data.forum, 'required')}
                                </div>
                            </div>
                            {
                                data.hubLeader === 2 && (
                                    <div className="w-full h-fit mt-4">
                                        <h6 className="text-base">Nominee's Email Address*</h6>
                                        <Input
                                            required
                                            aria-required
                                            placeholder="Enter Nominee's Email Address"
                                            type="text"
                                            value={data.nomineeEmail}
                                            rounded={"rounded"}
                                            // onBlur={() => validator.showMessageFor('email')}
                                            onChange={(e) => handleChange("nomineeEmail", e.target.value)}
                                            className="text-neutral-800 px-4 mt-1 dark:text-neutral-200"
                                        />
                                        <div className="w-full mt-1 text-red-500 text-sm">
                                            {validator.message('nomineeEmail', data.nomineeEmail, 'required|email')}
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div className="w-full h-fit mt-6">
                            <h6 className="text-base -mb-1">Nominate a Hub Leader*</h6>
                            <small className="text-xs">Must be a leader for the above noted company on an existing forum</small>
                            <div className="flex mt-1">
                                <div className="w-fit h-fit mr-16">
                                    <input type="checkbox" className="rounded w-4 h-4 mr-2" onChange={(e: any) => handleChange("hubLeader", 1)} checked={data.hubLeader === 1} />
                                    <label className="h-full -mt-1">Myself</label>
                                </div>
                                <div className="w-fit h-fit">
                                    <input type="checkbox" className="rounded w-4 h-4 mr-2" onChange={(e: any) => handleChange("hubLeader", 2)} checked={data.hubLeader === 2} />
                                    <label className="h-full -mt-1">Someone Else</label>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-fit mt-6">
                            <h6>Reason*</h6>
                            <textarea
                                value={data.reason}
                                onChange={(e) => handleChange("reason", e.target.value)}
                                placeholder="Describe why do you think your nominee is a good candidate to lead the hub"
                                className={`text-neutral-800 px-4 mt-2 dark:text-neutral-200 block w-full h-36
                                    border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200/50 
                                    bg-white dark:border-neutral-500 dark:focus:ring-primary-500/30 dark:bg-neutral-900 
                                    text-sm font-normal`}
                            >
                            </textarea>
                            <div className="w-full mt-1 text-red-500 text-sm">
                                {validator.message('reason', data.reason, 'required')}
                            </div>
                        </div>
                        <div className="w-full h-fit mt-4">
                            <h6 className="text-base">Example Posts*</h6>
                            <Input
                                required
                                aria-required
                                placeholder="Provide us with links of quality forum posts or articles"
                                type="text"
                                value={data.example1}
                                rounded={"rounded"}
                                // onBlur={() => validator.showMessageFor('email')}
                                onChange={(e) => handleChange("example1", e.target.value)}
                                className="text-neutral-800 px-4 mt-2 dark:text-neutral-200"
                            />
                            <div className="w-full mt-1 text-red-500 text-sm">
                                {validator.message('example1', data.example1, 'required')}
                            </div>
                            <Input
                                required
                                aria-required
                                placeholder="Provide us with links of quality forum posts or articles"
                                type="text"
                                value={data.example2}
                                rounded={"rounded"}
                                // onBlur={() => validator.showMessageFor('email')}
                                onChange={(e) => handleChange("example2", e.target.value)}
                                className="text-neutral-800 px-4 mt-3 dark:text-neutral-200"
                            />
                            <div className="w-full mt-1 text-red-500 text-sm">
                                {validator.message('example2', data.example2, 'required')}
                            </div>
                            <Input
                                required
                                aria-required
                                placeholder="Provide us with links of quality forum posts or articles"
                                type="text"
                                value={data.example3}
                                rounded={"rounded"}
                                // onBlur={() => validator.showMessageFor('email')}
                                onChange={(e) => handleChange("example3", e.target.value)}
                                className="text-neutral-800 px-4 mt-3 dark:text-neutral-200"
                            />
                            <div className="w-full mt-1 text-red-500 text-sm">
                                {validator.message('example3', data.example3, 'required')}
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
                        <div className="w-full h-fit mt-8 mb-3 flex justify-center">
                            <ButtonPrimary className="w-fit text-center px-7 py-3" loading={loader} onClick={submitHandler} sizeClass="py-2 sm:py-3">Submit</ButtonPrimary>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}