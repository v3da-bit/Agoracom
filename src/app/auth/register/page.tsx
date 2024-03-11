"use client";

import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Input from "@/components/Input/Input";
import React, { useEffect, useState } from "react";
import Linkedin from "@/images/Icons/linkedin.png";
import Google from "@/images/Icons/google.png";
import Facebook from "@/images/Icons/facebook.png";
import Image from "next/image";
import { signUp } from "@/requests/Auth";
import useValidator from "@/hooks/useValidator";
import alertMessage from "@/utils/swalAlert";
// import checkAuthScreen from "@/utils/checkAuthScreen";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "@/redux/User/Action";

function Signup() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    const [validator, showValidationMessage]: any = useValidator({}, {
        confirm_password: {
            message: 'Confirm Password does not match.',
            rule: (val: any, params: any, validator: any) => {
                return data.password === val;
            },
            required: true
        }
    });
    const initialData = {
        username: "",
        email: "",
        password: "",
        confirm_password: "",
    }
    const [data, setData] = useState(initialData)
    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const email: any = searchParams.get('email');
        if (email) {
            setData({
                ...data,
                email: email
            })
        }
    }, [])

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
                username: data.username,
                email: data.email,
                password: data.password,
                password_confirmation: data.confirm_password
            }
            try {
                setLoader(true);
                let response = await signUp(payload);
                setLoader(false);
                if (response.status === 200 && response.data.status === 'success') {
                    alertMessage({
                        title: "Signup successful",
                        text: "Email confirmation link has been sent to your mail id. Please confirm your email to continue",
                        icon: "success",
                        timer: 3000
                    });
                    resetForm();
                    router.push('/auth/login');
                    // ====================================================>
                    // dispatch(setCurrentUser(response?.data?.data));
                    // alertMessage({
                    //     title: "Signup successful",
                    //     text: "Email confirmation link has been sent to your mail id. Please confirm your email to continue",
                    //     icon: "success",
                    //     timer: 3000
                    // });
                    // resetForm();
                    // router.push('/');
                }
            } catch (e: any) {
                setLoader(false);
                if (e?.response?.data?.errors?.full_messages?.length > 0) {
                    setErrors(e?.response?.data?.errors?.full_messages);
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
        <div className="nc-PageHomeDemo4 relative text-[#6A6A6B]">
            <div className="container grid grid-cols-1 lg:grid-cols-2 gap-4 my-10">
                <div className="bg-white dark:!bg-transparent w-full h-fit px-6 py-10 border-0 dark:border-[1px] border-[#3E3E3E] rounded">
                    <h5 className="text-xl text-[#6A6A6B] dark:text-white font-semibold">
                        AGORACOM Provides You With 4 Easy Ways To Join:
                    </h5>
                    {/* <p className="mt-4 text-base">
                        Join With One Of Your Sign-Up Partners
                    </p>
                    <div className="relative w-full mt-5 grid grid-cols-1 lg:grid-cols-3 gap-2">
                        <button type="button" className="flex justify-center bg-[#4264AA] px-5 w-full py-2 rounded">
                            <div className="flex w-fit h-full flex-col justify-center">
                                <div className="flex">
                                    <Image
                                        src={Facebook}
                                        alt="Facebook"
                                        className="w-5 mr-3 my-auto"
                                    />
                                    <span className="text-white font-semibold my-auto h-full">Facebook</span>
                                </div>
                            </div>
                        </button>
                        <button type="button" className="flex justify-center bg-[#1692D1] px-5 w-full py-2 rounded">
                            <div className="flex w-fit h-full flex-col justify-center">
                                <div className="flex">
                                    <Image
                                        src={Linkedin}
                                        alt="Linkedin"
                                        className="w-5 mr-3 my-auto"
                                    />
                                    <span className="text-white font-semibold my-auto h-full">Linkedin</span>
                                </div>
                            </div>
                        </button>
                        <button type="button" className="flex justify-center bg-[#4375FF] px-5 w-full py-2 rounded">
                            <div className="flex w-fit h-full flex-col justify-center">
                                <div className="flex">
                                    <Image
                                        src={Google}
                                        alt="Google"
                                        className="w-5 mr-3 my-auto"
                                    />
                                    <span className="text-white font-semibold my-auto h-full">Google</span>
                                </div>
                            </div>
                        </button>
                    </div> */}
                    {/* <div className="w-full my-4">
                        <button type="button" className="flex bg-[#4264AA] px-5 py-2 rounded">
                            <Image 
                                src={Facebook} 
                                alt="Facebook" 
                                className="w-5 mr-3 my-auto" 
                            />
                            <span className="text-white font-semibold my-auto h-full">Sign in with Facebook</span>
                        </button>
                        <button type="button" className="flex bg-[#1692D1] px-5 py-2 rounded mt-2">
                            <Image 
                                src={Linkedin} 
                                alt="Linkedin" 
                                className="w-5 mr-3 my-auto" 
                            />
                            <span className="text-white font-semibold my-auto h-full">Sign in with Linkedin</span>
                        </button>
                        <button type="button" className="flex bg-[#4375FF] px-5 py-2 rounded mt-2">
                            <Image 
                                src={Google} 
                                alt="Google" 
                                className="w-5 mr-3 my-auto" 
                            />
                            <span className="text-white font-semibold my-auto h-full">Sign in with Google</span>
                        </button>
                    </div> */}
                    {/* <p className="mt-4 text-base">
                        Or Use Our Fast Form Below To Create A New Unique ID In Under 30 Seconds
                    </p> */}
                    <div className="w-full h-fit mt-6">
                        <h6 className="text-base">Username*</h6>
                        <Input
                            required
                            aria-required
                            placeholder="Enter Username"
                            type="text"
                            name="username"
                            value={data.username}
                            // rounded={"rounded"}
                            onBlur={() => validator.showMessageFor('username')}
                            onChange={(e) => handleChange("username", e.target.value)}
                            className="text-neutral-800 px-4 mt-1 dark:text-neutral-200"
                        />
                    </div>
                    <div className="w-full mt-1 text-red-500 text-sm">
                        {validator.message('username', data.username, 'required|alpha_num_dash')}
                    </div>
                    {/* {
                        error.username ? (
                            <span className="text-sm w-full mt-2 text-red-600">Username is required</span>
                        ) : <></>
                    } */}
                    <div className="w-full h-fit mt-4">
                        <h6 className="text-base">Email*</h6>
                        <Input
                            required
                            aria-required
                            placeholder="Enter Email"
                            type="email"
                            value={data.email}
                            // rounded={"rounded"}
                            onBlur={() => validator.showMessageFor('email')}
                            onChange={(e) => handleChange("email", e.target.value)}
                            className="text-neutral-800 px-4 mt-1 dark:text-neutral-200"
                        />
                    </div>
                    <div className="w-full mt-1 text-red-500 text-sm">
                        {validator.message('email', data.email, 'required|email')}
                    </div>
                    {/* {
                        error.email ? (
                            <span className="text-sm w-full mt-2 text-red-600">Email is required</span>
                        ) : <></>
                    } */}
                    <div className="w-full h-fit mt-4">
                        <h6 className="text-base">Password*</h6>
                        <Input
                            required
                            aria-required
                            placeholder="Enter Password"
                            type="password"
                            value={data.password}
                            // rounded={"rounded"}
                            onBlur={() => validator.showMessageFor('password')}
                            onChange={(e) => handleChange("password", e.target.value)}
                            className="text-neutral-800 px-4 mt-1 dark:text-neutral-200"
                        />
                    </div>
                    <div className="w-full mt-1 text-red-500 text-sm">
                        {validator.message('password', data.password, 'required|alpha_num_dash')}
                    </div>
                    {/* {
                        error.password ? (
                            <span className="text-sm w-full mt-2 text-red-600">Password is required</span>
                        ) : <></>
                    } */}
                    <div className="w-full h-fit mt-4">
                        <h6 className="text-base">Confirm Password*</h6>
                        <Input
                            required
                            aria-required
                            placeholder="Enter Confirm Password"
                            type="password"
                            value={data.confirm_password}
                            // rounded={"rounded"}
                            onBlur={() => validator.showMessageFor('confirm_password')}
                            onChange={(e) => handleChange("confirm_password", e.target.value)}
                            className="text-neutral-800 px-4 mt-1 dark:text-neutral-200"
                        />
                    </div>
                    <div className="w-full mt-1 text-red-500 text-sm">{validator.message('confirm_password', data.confirm_password, 'required|confirm_password')}</div>
                    {/* {
                        error.confirm_password ? (
                            <span className="text-sm w-full mt-2 text-red-600">{data.confirm_password ? (data.password === data.confirm_password ? "" : "Confirm password does not match") : "Confirm Password is required"}</span>
                        ) : <></>
                    } */}
                    {
                        errors.length > 0 && errors.map((item: any, index: number) => {
                            return (
                                <div key={index} className="p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    {item}
                                </div>
                            )
                        })
                    }
                    <div className="w-full h-fit mt-6 mb-3">
                        <ButtonPrimary className="w-full text-center" loading={loader} onClick={submitHandler} sizeClass="py-2 sm:py-3">Sign Up</ButtonPrimary>
                    </div>
                </div>
                <div className="w-full h-fit px-0 lg:px-10 pb-0 lg:pb-10 text-[#6A6A6B] mt-7 lg:mt-0 dark:text-silver">
                    <h5 className="w-full h-fit text-left text-2xl font-semibold dark:text-white">AGORACOM 6 Rules Of Use</h5>
                    <p className="mt-4 text-sm">
                        Participation in AGORACOM’s General Forums is a privilege and not a right. Though we
                        have used a lighter side in getting our point across, contravention of any of the
                        following will lead to automatic termination of forum privileges:
                    </p>
                    <p className="mt-4 text-sm">
                        To ensure your continued participation on AGORACOM, follow these 6 simple rules.
                    </p>
                    <p className="mt-4 text-sm">
                        <span className="text-[#3E3E3E] dark:text-white font-semibold text-base">1. PROFANITY - </span> Swearing or use of foul language is strictly prohibited…
                        in any language (We have 42 interpreters on staff to keep an eye on those
                        International members). For the record, ***** or any combination thereof
                        is considered profanity.
                    </p>
                    <p className="mt-4 text-sm">
                        <span className="text-[#3E3E3E] dark:text-white font-semibold text-base">2. DEROGATORY COMMENTS TOWARDS OTHERS - </span>
                        Calling another member an idiot,
                        clown, stupid, dumb, moron or ##x%x# for brains is strictly prohibited.
                    </p>
                    <p className="mt-4 text-sm">
                        <span className="text-[#3E3E3E] dark:text-white font-semibold text-base"> 3. OFF-TOPIC OR IRRELEVANT COMMENTS - </span>
                        Yep, nobody can believe what Donald Trump said today, or that Monica Lewinsky is more
                        believable than Hillary, or the Dallas Cowboys keep crushing their fans (seriously
                        though, it ***** hurts). However, the main forums are not the place to discuss TV shows,
                        politics or sports. … O.K. maybe a little sports. Please use the Off-Topic Forums
                    </p>
                    <p className="mt-4 text-sm">
                        <span className="text-[#3E3E3E] dark:text-white font-semibold text-base">4. SPAMMING OR CLAIMS OF INSIDER INFORMATION - </span>
                        Enough said… unless your brother in-law really is Jeff Bezo’s chauffeur.
                    </p>
                    <p className="mt-4 text-sm">
                        <span className="text-[#3E3E3E] dark:text-white font-semibold text-base">
                            5. BASHING OR HYPING –
                        </span>
                        Unsubstantiated claims of grandeur or impending doom are best left to
                        Nostradamus as they will cost you some valuable points towards your
                        rating. Also included in this category is repetition of the same question,
                        fact or opinion over and over after a response has been provided or if there
                        is currently no ascertainable answer.
                    </p>
                    <p className="mt-4 text-sm">
                        <span className="text-[#3E3E3E] dark:text-white font-semibold text-base">
                            6. CAPS LOCK AND USE OF !!!!!!! -
                        </span>
                        NOTHING AND WE MEAN NOTHING IS MORE AGGRAVATING AND ANNOYING THAN READING A
                        POST THAT LOOKS LIKE THIS!!!!!! IF YOU HAVE SOMETHING TO SAY, IT DOESN’T
                        BECOME ANYMORE NOTICEABLE WHEN YOU TYPE IT IN CAPS!!!!! IN FACT, MOST PEOPLE
                        TEND TO IGNORE THESE KINDS OF POSTS!!!!... Exceptions will be made for those
                        deserted on a deserted island (with a kick ass internet connection) and sending
                        out a distress signal, or anyone who invested in WorldCom, Enron, Tyco, Nortel,
                        Webvan, Pets.com or Sideware and needs to freak out every year.We trust the gist
                        of our point has been made. Be good to your fellow members, respect their opinions
                        and understand there will be different levels of expertise posting on these boards.
                        Otherwise, kiss our privacy statement goodbye as we hand out your address and phone
                        number to everyone you piss off… oops!
                    </p>
                    <p className="mt-4 text-sm">
                        Sincerely, AGORACOM
                    </p>
                </div>
            </div>
        </div>
    )
}

export default
    // checkAuthScreen(
    Signup
// );