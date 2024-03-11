import PageResetPass from "@/components/Authentication/ResetPassword";
// import checkAuthScreen from "@/utils/checkAuthScreen";
import React from "react";

function ResetPassword() {
    return (
        <div className="p-6 container-fluid w-full h-fit">
            <div className="w-full rounded-3xl bg-white p-16">
                <PageResetPass />
            </div>
        </div>
    )
}

export default
    // checkAuthScreen(
    ResetPassword
// )