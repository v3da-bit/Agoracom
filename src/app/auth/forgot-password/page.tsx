import PageForgotPass from "@/components/Authentication/ForgotPassword";
// import checkAuthScreen from "@/utils/checkAuthScreen";
import React from "react";

function ForgotPassword() {
    return (
        <div className="p-6 container-fluid w-full h-fit">
            <div className="w-full rounded-3xl bg-white p-16">
                <PageForgotPass />
            </div>
        </div>
    )
}

export default
    // checkAuthScreen(
    ForgotPassword
// )