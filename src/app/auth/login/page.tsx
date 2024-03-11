"use client";
import PageLogin from "@/components/SignIn/Login";
// import checkAuthScreen from "@/utils/checkAuthScreen";
import React from "react";

function Login() {
    return (
        <div className="p-6 container-fluid w-full h-fit">
            <div className="w-full rounded-3xl bg-white p-16">
                <PageLogin />
            </div>
        </div>
    )
}

export default
    // checkAuthScreen(
    Login
// );