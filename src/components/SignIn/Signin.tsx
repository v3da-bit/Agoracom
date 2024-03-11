import useValidator from "@/hooks/useValidator";
import Image from "next/image";
import React, { useState } from "react";
import Input from "../Input/Input";
import ButtonPrimary from "../Button/ButtonPrimary";
import Heading from "../Heading/Heading";
import Linkedin from "../../images/Icons/linkedin.png";
import Google from "../../images/Icons/google.png";
import Facebook from "../../images/Icons/facebook.png";
import { signIn } from "@/requests/Auth";
import alertMessage from "@/utils/swalAlert";

export default function SignIn({ closeSignIn }: any) {

    const initialData = {
        username: "",
        password: ""
    }
    const [validator, showValidationMessage]: any = useValidator();
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState([])

    const handleChange = (key: string, value: string) => {
        setData({
            ...data,
            [key]: value
        })
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
                    alertMessage({
                        title: "SignIn successful",
                        text: "",
                        icon: "success",
                        timer: 3000
                    });
                    closeSignIn();
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
        <div className="aspect-w-16 aspect-h-9 py-5 lg:py-6 px-5 lg:px-12">
        <Heading desc={""} isCenter className="mb-0">
          Log in to Agoracom
        </Heading>
        <div className="relative w-full mt-6 grid grid-cols-1 lg:grid-cols-3 gap-2">
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
        </div>
        <div className="relative mt-5 lg:mt-8">
          <div className="w-full h-fit mt-6">
            <h6 className="text-base">Username*</h6>
            <Input
              required
              aria-required
              placeholder="Enter Username"
              type="text"
              value={data.username}
              // rounded={"rounded-2xl"}
              onChange={(e) => handleChange("username", e.target.value)}
              className="text-neutral-800 px-4 mt-1 dark:text-neutral-200"
            />
          </div>
          <div className="w-full mt-1 text-red-500 text-sm">
            {validator.message('username', data.username, 'required|alpha_num_dash')}
          </div>
          {/* {
            error.username ? (
              <span className="text-sm w-full mt-2 text-red-600">{error.username}</span>
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
              // rounded={"rounded-2xl"}
              onChange={(e) => handleChange("password", e.target.value)}
              className="text-neutral-800 px-4 mt-1 dark:text-neutral-200"
            />
          </div>
          <div className="w-full mt-1 text-red-500 text-sm">
            {validator.message('password', data.password, 'required|alpha_num_dash')}
          </div>
          {/* {
            error.password ? (
              <span className="text-sm w-full mt-2 text-red-600">{error.password}</span>
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
          <div className="w-full h-fit mt-6 mb-3 flex justify-between">
            <div className="h-fit my-auto">
              <div className="flex">
                <input 
                  type="checkbox" 
                  value="" 
                  className="w-4 h-4 mt-1 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                />
                <span className="h-fit">
                  Remember Me
                </span>
              </div>
            </div>
            
            <ButtonPrimary loading={loader} className="w-fit text-center"  onClick={submitHandler} sizeClass="py-2 px-7 sm:py-3">Sign In</ButtonPrimary>
          </div>
        </div>
      </div>
    )
}