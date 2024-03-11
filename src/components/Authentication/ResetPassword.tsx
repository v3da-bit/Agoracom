"use client";

import React, { useState } from "react";
import Input from "@/components/Input/Input";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import NcLink from "@/components/NcLink/NcLink";
import Heading2 from "@/components/Heading/Heading2";
import useValidator from "@/hooks/useValidator";
import alertMessage from "@/utils/swalAlert";
import { resetPassword } from "@/requests/Auth";
import { useRouter } from "next/navigation";

const PageResetPass = ({ }) => {

    const initialData = {
        password: "",
        confirm_password: ""
    }
    const router = useRouter();
    const [data, setData] = useState(initialData);
    const [validator, showValidationMessage]: any = useValidator({}, {
        confirm_password: {
            message: 'Confirm Password does not match.',
            rule: (val: any, params: any, validator: any) => {
                return data.password === val;
            },
            required: true
        }
    });
    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState([]);

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
                password: data.password,
                password_confirmation: data.confirm_password
            }
            try {
                setLoader(true);
                let response = await resetPassword(payload);
                setLoader(false);
                console.log(response);
                if (response.status === 200 && response.data.success) {
                    // alertMessage({
                    //     title: "Reset password link sent!",
                    //     text: `An email has been sent to ${email} containing instructions for resetting your password.`,
                    //     icon: "success",
                    //     timer: 3000
                    // });
                    // resetForm();
                    // router.push("/auth/login");
                }
            } catch (e: any) {
                setLoader(false);
                setData(initialData);
                console.log(e.response.data);
                // if (e?.response?.data?.errors?.length > 0) {
                //     setErrors(e?.response?.data?.errors);
                // } else {
                //     const error: any = ["Something went wrong. Try again"];
                //     setErrors(error);
                // }
            }
        } else {
            showValidationMessage(true);
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            // forceUpdate();
        }
    }

    const handleChange = (key: string, value: string) => {
        setData({
            ...data,
            [key]: value
        })
    }

    return (
        <>
            <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-12 lg:mb-12">
                <Heading2>Reset password</Heading2>
                <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
                    Please selected a new password
                </span>
            </header>

            <div className="max-w-md mx-auto space-y-6">
                {/* FORM */}
                <form className="grid grid-cols-1 gap-6" onSubmit={submitHandler}>
                    <label className="block">
                        <span className="text-neutral-800 dark:text-neutral-200">
                            Password
                        </span>
                        <Input
                            type="password"
                            placeholder="Enter Password"
                            className="mt-1"
                            value={data.password}
                            // rounded={"rounded"}
                            onBlur={() => validator.showMessageFor('password')}
                            onChange={(e) => handleChange("password", e.target.value)}
                        />
                        <div className="w-full mt-1 text-red-500 text-sm">
                            {validator.message('password', data.password, 'required|alpha_num_dash')}
                        </div>
                    </label>
                    <label className="block">
                        <span className="text-neutral-800 dark:text-neutral-200">
                            Confirm Password
                        </span>
                        <Input
                            type="password"
                            placeholder="Enter Confirm Password"
                            className="mt-1"
                            value={data.confirm_password}
                            // rounded={"rounded"}
                            onBlur={() => validator.showMessageFor('confirm_password')}
                            onChange={(e) => handleChange("confirm_password", e.target.value)}
                        />
                        <div className="w-full mt-1 text-red-500 text-sm">
                            {validator.message('confirm_password', data.confirm_password, 'required|confirm_password')}
                        </div>
                    </label>
                    {
                        errors.length > 0 && errors.map((item: any, index: number) => {
                            return (
                                <div key={index} className="p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    {item}
                                </div>
                            )
                        })
                    }
                    <ButtonPrimary loading={loader} type="submit">Submit</ButtonPrimary>
                </form>

                {/* ==== */}
                <span className="block text-center text-neutral-700 dark:text-neutral-300">
                    Go back for {` `}
                    <NcLink href="/auth/login">Sign in</NcLink>
                    {` / `}
                    <NcLink href="/auth/register">Sign up</NcLink>
                </span>
            </div>
        </>
    );
};

export default PageResetPass;
