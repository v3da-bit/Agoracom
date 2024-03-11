"use client";

import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Heading from "@/components/Heading/Heading";
import Input from "@/components/Input/Input";
import Select from "@/components/Select/Select";
import useValidator from "@/hooks/useValidator";
import { contact } from "@/requests/Contact";
import alertMessage from "@/utils/swalAlert";
import Link from "next/link";
import { useState } from "react";
import { InlineWidget } from "react-calendly";

export default function AboutUs() {

    const menuDropdown = {
        "general": "General Inquiries",
        "bugs": "Bug or Error Report",
        "retaining": "Retaining Agoracom",
        "vc_inquiry": "VC Inquiry",
        "media_inquiry": "Media Inquiry"
    }
    const [validator, showValidationMessage]: any = useValidator()
    const initialData = {
        name: "",
        email: "",
        subject: "general",
        message: "",
    }
    const [data, setData] = useState(initialData)
    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState([]);

    const handleChange = (key: string, value: string) => {
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
                name: data.name,
                email: data.email,
                subject: data.subject,
                body: data.message
            }
            try {
                setLoader(true);
                let res: any = await contact(payload);
                setLoader(false);
                if(res.status === 201) {
                    alertMessage({
                        title: "Sent successfully",
                        text: "",
                        icon: "success",
                        timer: 3000
                    });
                    resetForm();
                }
            } catch (e) {
                console.log("Something went wrong", e)
                setLoader(false);
            }
        } else {
            showValidationMessage(true);
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            // forceUpdate();
        }
    }

    return (
        <div className="nc-PageHomeDemo4 relative">
            <div className="container mt-10 lg:mt-16 mb-12 lg:mb-20">
                <div className="w-full h-fit block lg:flex">
                    <div className="w-full lg:w-[68%] h-fit pr-0 lg:pr-16 text-[#6A6A6B]">
                        <Heading desc={""} isCenter className="text-defaultBlue-100 mb-9">
                            About us 
                        </Heading>
                        <p className="text-base mt-9">
                            AGORA – translatable as marketplace, was an essential part of Athens in ancient Greece and acted as a marketplace and a forum to its citizens.
                        </p>
                        <p className="text-base mt-4">
                            AGORACOM is the Web 2.0 online marketplace and forum for citizens of the small-cap investment community. Public companies, shareholders and prospective shareholders amalgamate for the purposes of communicating in a monitored and secure environment free of trolling, profanity, bashing, spam and general nonsense that have plagued finance communities for far too long.
                        </p>
                        <p className="text-base mt-4">
                            More than just lip service, AGORACOM averages
                        </p>
                        <p className="text-base mt-4 mb-10">
                            <li>5.2 Million Visits Per Year</li>
                            <li>55 Million Page Views Per Year</li>
                            <li>Has Provided Online Investor Relations and Marketing To Over 300 Small Cap Companies</li>
                        </p>
                        <Heading desc={""} isCenter className="text-defaultBlue-100 mb-9">
                            How do we do it?
                        </Heading>
                        
                        <ol type="1" className="list-decimal pl-5 lg:pl-0">
                            
                            <li className="text-black text-2xl font-bold dark:text-white">
                                We choose quality over quantity
                            </li>
                            <p className="text-[15px] mt-4">
                                The downfall of every online media community has been the sacrifice of quality in order to achieve quantity. More page views equals more money. Ask Twitter had that philosophy is working out for them.
                            </p>
                            <p className="text-[15px] mt-4">
                                We created a different business philosophy by choosing quality over quantity. We believed that focusing on high quality users and content would bring forth millions of investors that had otherwise given up on trying to find a finance home.
                            </p>
                            <p className="text-[15px] mt-4">
                                Many called us crazy. They told us it wouldn’t work without all the crazies. We proved them wrong.
                            </p>
                            
                            <li className="text-black text-2xl font-bold mt-6 dark:text-white">
                                We keep it clean to help public companies meet real investors
                            </li>
                            <p className="text-[15px] mt-4">
                                A philosophy of Quality over Quantity doesn’t work, if you don’t back it up with a real system.
                            </p>
                            <p className="text-[15px] mt-4">
                                AGORACOM has implemented a three-step monitoring system comprised of scanning technology, activity algorithms 
                                and the first ever user reputation system that gives over 2,500 super users of AGORACOM the exact same 
                                moderating abilities as our own staff. We combine all of that with our very simple but strict 
                                <Link className="text-defaultBlue-100" href={{pathname: '/rules'}}> 6 Rules of Use.</Link>
                            </p>
                            <p className="text-[15px] mt-4">
                                As a result, we deliver custom investor relations communities that connect management with shareholders 
                                in a clean, smart, constructive environment. If you believe we can help your company, 
                                <Link className="text-defaultBlue-100" href={{pathname: '/services/contact'}}> click here 
                                to speak with us.</Link>
                            </p>

                            <li className="text-black text-2xl font-bold mt-6 dark:text-white">
                                We think outside the box to help smart investors get together
                            </li>
                            <p className="text-[15px] mt-4">
                                Shockingly, we discovered that not every small cap company was ready to be a client of AGORACOM 
                                today. So we had to come up with a solution for shareholders of non-clients to build and maintain 
                                communities for them to amalgamate and communicate. The result was the launch of 
                                <Link className="text-defaultBlue-100" href={{pathname: '/'}}> "Investor Controlled 
                                Stock Discussion Forums" </Link> which provide social media influencers with an ability to set 
                                up and self-monitor discussion forums for the companies they love.
                            </p>
                            <p className="text-[15px] mt-4">
                                It has been a big hit for investors and a big hit for AGORACOM clients that are now 
                                exposed to an even larger audience. If this appeals to you, 
                                <Link className="text-defaultBlue-100" href={{pathname: '/hub_requests/new'}}> 
                                click here to Request A HUB now </Link> and be live within 24 hours.
                            </p>

                            <li className="text-black text-2xl font-bold mt-6 dark:text-white">
                                Conclusion
                            </li>
                            <p className="text-[15px] mt-4">
                                We believe in small cap entrepreneurs and investors. They need each other to 
                                grow and prosper. Our job is to amalgamate them as easily and smartly as possible.
                            </p>
                            <p className="text-[15px] mt-3">This is AGORACOM</p>
                            <p className="text-[15px] mt-3">An online marketplace and forum for small-cap citizens.</p>
                            <p className="text-[15px] mt-3">The ancient Greeks would have been proud.</p>
                        </ol>
                    </div>
                    <div className="w-full lg:w-[32%] h-fit mt-10 lg:mt-0">
                        <div className="w-full h-fit border-[1px] border-[#E5E5E6] rounded">
                            <div className="w-full h-fit p-5 text-white bg-primary-500 font-semibold text-2xl text-center">
                                Inquire about our investor relations and marketing services
                            </div>
                            <div className="w-full h-fit p-5 bg-white dark:bg-transparent">
                                <div className="w-full h-fit">
                                    <h6>Name*</h6>
                                    <Input
                                        required
                                        aria-required
                                        placeholder="Enter Name"
                                        type="text"
                                        value={data.name}
                                        rounded={"rounded"}
                                        onChange={(e) => handleChange("name", e.target.value)}
                                        className="text-neutral-800 px-4 mt-2 dark:text-neutral-200"
                                    />
                                </div>
                                <div className="w-full mt-1 text-red-500 text-sm">
                                    {validator.message('name', data.name, 'required')}
                                </div>
                                <div className="w-full h-fit mt-5">
                                    <h6>Email*</h6>
                                    <Input
                                        required
                                        aria-required
                                        placeholder="Enter Email"
                                        type="email"
                                        value={data.email}
                                        rounded={"rounded"}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                        className="text-neutral-800 px-4 mt-2 dark:text-neutral-200"
                                    />
                                </div>
                                <div className="w-full mt-1 text-red-500 text-sm">
                                    {validator.message('email', data.email, 'required|email')}
                                </div>
                                <div className="w-full h-fit mt-5">
                                    <h6>Subject*</h6>
                                    <div className="w-full mt-2">
                                        <Select menuDropdown={menuDropdown} rounded="!rounded" className="!w-full" selectedValue={data.subject} setMenu={(val: any) => handleChange('subject', val)} />
                                    </div>
                                </div>
                                <div className="w-full mt-1 text-red-500 text-sm">
                                    {validator.message('subject', data.subject, 'required')}
                                </div>
                                <div className="w-full h-fit mt-5">
                                    <h6>Message*</h6>
                                    <textarea
                                        value={data.message}
                                        onChange={(e) => handleChange("message", e.target.value)}
                                        placeholder="Describe why do you think your nominee is a good candidate to lead the hub"
                                        className={`text-neutral-800 px-4 mt-2 dark:text-neutral-200 block w-full h-36
                                            border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200/50 
                                            bg-white dark:border-neutral-500 dark:focus:ring-primary-500/30 dark:bg-neutral-900 
                                            text-sm font-normal`}
                                    ></textarea>
                                </div>
                                <div className="w-full mt-1 text-red-500 text-sm">
                                    {validator.message('message', data.message, 'required')}
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
                                <div className="w-full h-fit my-5">
                                    <ButtonPrimary className="w-full text-center" loading={loader} onClick={submitHandler} sizeClass="py-2 sm:py-3">Send Message</ButtonPrimary>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-fit mt-12 flex justify-center">
                            <InlineWidget url="https://calendly.com/meet_agoracom" />
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}