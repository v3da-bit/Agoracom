import PageEmailConfirmation from "@/components/Authentication/EmailConfirmation";
// import checkAuthScreen from "@/utils/checkAuthScreen";
import React from "react";

function ResendConfirmation() {
    return (
        <div className="p-6 container-fluid w-full h-fit">
            <div className="w-full rounded-3xl bg-white p-16">
                <PageEmailConfirmation />
            </div>
        </div>
    )
}

export default
    // checkAuthScreen(
    ResendConfirmation
// )