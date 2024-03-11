"use client";

import React, { useState } from "react";
import Input from "@/components/Input/Input";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import NcLink from "@/components/NcLink/NcLink";
import Heading2 from "@/components/Heading/Heading2";
import useValidator from "@/hooks/useValidator";
import alertMessage from "@/utils/swalAlert";
import { resendConfirmation } from "@/requests/Auth";
import { useRouter } from "next/navigation";

const PageEmailConfirmation = ({ }) => {

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [validator, showValidationMessage]: any = useValidator();
    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState([]);

    const resetForm = () => {
        setEmail("");
        setErrors([]);
        showValidationMessage(false);
    }

    const submitHandler = async (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (validator.allValid()) {
            setErrors([]);
            let payload = {
                email,
            }
            try {
                setLoader(true);
                let response = await resendConfirmation(payload);
                setLoader(false);
                console.log(response)
                if (response.status === 200 && response.data.success) {
                    alertMessage({
                        title: "Confirmation mail sent!",
                        text: "",
                        icon: "success",
                        timer: 3000
                    });
                    resetForm();
                    router.push("/auth/login");
                }
            } catch (e: any) {
                setLoader(false);
                setEmail("");
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
            <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-12 lg:mb-12">
                <Heading2>Resend Confirmation</Heading2>
                <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
                    Welcome to Agoracom (The small cap epicenter)
                </span>
            </header>

            <div className="max-w-md mx-auto space-y-6">
                {/* FORM */}
                <form className="grid grid-cols-1 gap-6" onSubmit={submitHandler}>
                    <label className="block">
                        <span className="text-neutral-800 dark:text-neutral-200">
                            Email address
                        </span>
                        <Input
                            type="email"
                            placeholder="Enter Email"
                            className="mt-1"
                            value={email}
                            // rounded={"rounded"}
                            onBlur={() => validator.showMessageFor('email')}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="w-full mt-1 text-red-500 text-sm">
                            {validator.message('email', email, 'required|email')}
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
                    <ButtonPrimary loading={loader} type="submit">Resend</ButtonPrimary>
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

export default PageEmailConfirmation;
