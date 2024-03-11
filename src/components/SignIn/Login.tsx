"use client";

import React, { useEffect, useState } from "react";
// import facebookSvg from "@/images/Facebook.svg";
// import twitterSvg from "@/images/Twitter.svg";
// import googleSvg from "@/images/Google.svg";
import Linkedin from "@/images/Icons/linkedin.png";
import Google from "@/images/Icons/google.png";
import Facebook from "@/images/Icons/facebook.png";
import Input from "@/components/Input/Input";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import NcLink from "@/components/NcLink/NcLink";
import Heading2 from "@/components/Heading/Heading2";
import Image from "next/image";
import useValidator from "@/hooks/useValidator";
import alertMessage from "@/utils/swalAlert";
import { signIn } from "@/requests/Auth";
import CryptoJS from "crypto-js";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "@/redux/User/Action";
import { useRouter, useSearchParams } from "next/navigation";

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: Facebook,
    bg: "#4264AA"
  },
  {
    name: "Continue with LinkedIn",
    href: "#",
    icon: Linkedin,
    bg: "#1692D1"
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: Google,
    bg: "#4375FF"
  },
];

const PageLogin = ({ }) => {

  const initialData = {
    username: "",
    password: "",
    rememberMe: false
  }
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useSearchParams();
  const [validator, showValidationMessage]: any = useValidator();
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState([])

  useEffect(() => {
    validateSession();
  }, [])

  const validateSession = () => {
    const session: any = localStorage.getItem('remember_me');
    if (session) {
      const payload: any = decrypt(session);
      payload['rememberMe'] = true;
      setData(payload);
    }
  }

  const handleChange = (key: string, value: string) => {
    setData({
      ...data,
      [key]: value
    })
  }

  const encrypt = (payload: any) => {
    const secretPass = "@g0r@COM";
    const data = CryptoJS.AES.encrypt(
      JSON.stringify(payload),
      secretPass
    ).toString();

    localStorage.setItem('remember_me', data);
  }

  const decrypt = (value: any) => {
    const secretPass = "@g0r@COM";
    const bytes = CryptoJS.AES.decrypt(value, secretPass);
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    return data;
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
      let payload: any = {
        "username": data.username,
        "password": data.password
      }
      try {
        setLoader(true);
        const response = await signIn(payload);
        setLoader(false);
        if (response.status === 200 && response?.data?.data) {
          if (data?.rememberMe) {
            encrypt(payload);
          }
          const details = {
            ...response?.data?.data,
            userRole: response?.data?.role,
            avatar: response?.data?.avatar_url,
            accessToken: response?.headers['access-token'],
            client: response?.headers?.client
          }
          dispatch(setCurrentUser(details));
          alertMessage({
            title: "SignIn successful",
            text: "",
            icon: "success",
            timer: 3000
          });
          resetForm();
          const callback: any = params.get('callback') || null;
          if (callback) {
            router.push(callback);
          } else {
            router.push('/');
          }
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
    <>
      <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-12 lg:mb-12 ">
        <Heading2>Login</Heading2>
        <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
          Welcome to Agoracom (The small cap epicenter)
        </span>
      </header>

      <div className="max-w-md mx-auto space-y-6">
        {/* <div className="grid gap-3">
          {loginSocials.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={`flex w-full rounded-lg bg-[${item.bg}] dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]`}
            >
              <Image
                className="flex-shrink-0 w-6"
                src={item.icon}
                alt={item.name}
              />
              <h3 className={`flex-grow text-center text-sm font-semibold text-neutral-100 dark:text-neutral-300 sm:text-sm`}>
                {item.name}
              </h3>
            </a>
          ))}
        </div> */}
        {/* OR */}
        {/* <div className="relative text-center">
          <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
            OR
          </span>
          <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
        </div> */}
        {/* FORM */}
        <form className="grid grid-cols-1 gap-6" onSubmit={submitHandler}>
          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              Username
            </span>
            <Input
              type="text"
              className="mt-1"
              placeholder="Enter Username"
              value={data.username}
              // rounded={"rounded-2xl"}
              onChange={(e) => handleChange("username", e.target.value)}
            />
            <div className="w-full mt-1 text-red-500 text-sm">
              {validator.message('username', data.username, 'required|alpha_num_dash')}
            </div>
          </label>
          <label className="block">
            <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
              Password
              <NcLink href="/auth/forgot-password" className="text-sm underline">
                Forgot password?
              </NcLink>
            </span>
            <Input
              type="password"
              className="mt-1"
              placeholder="Enter Password"
              value={data.password}
              // rounded={"rounded-2xl"}
              onChange={(e) => handleChange("password", e.target.value)}
            />
            <div className="w-full mt-1 text-red-500 text-sm">
              {validator.message('password', data.password, 'required|alpha_num_dash')}
            </div>
          </label>
          <div className="w-full h-fit flex justify-between">
            <div className="h-fit my-auto">
              <div className="flex">
                <input
                  type="checkbox"
                  onChange={(e: any) => handleChange('rememberMe', e.target.checked)}
                  checked={data.rememberMe}
                  className="w-4 h-4 mt-1 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="h-fit">
                  Remember Me
                </span>
              </div>
            </div>
            <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
              <NcLink href="/auth/resend-confirmation" className="text-sm underline">
                Resend confirmation
              </NcLink>
            </span>
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
          <ButtonPrimary loading={loader} type="submit">Sign In</ButtonPrimary>
        </form>

        {/* ==== */}
        <span className="block text-center text-neutral-700 dark:text-neutral-300">
          New user? {` `}
          <NcLink href="/auth/register">Create an account</NcLink>
        </span>
      </div>
    </>
  );
};

export default PageLogin;
