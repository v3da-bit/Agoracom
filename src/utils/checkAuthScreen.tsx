// "use client";

import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const checkAuthScreen = (WrappedComponent: any) => {
    const Auth = (props: any) => {
        //     const router = useRouter();
        //     const { loggedIn } = useSelector((state) => {
        //         return {
        //             loggedIn: state.auth.loggedIn
        //         };
        //     });
        //     if (!loggedIn) {
        return <WrappedComponent {...props} />;
        //     } else {
        //         router.push("/");
        //         return false;
        //     }
    };
    // return Auth;
}

export default checkAuthScreen;
