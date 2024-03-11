"use client";

import Footer from "@/components/Footer/Footer";
import SiteHeader from "./SiteHeader";
import { Provider } from "react-redux";
import { store, persistor } from "../redux/ConfigureStore";
import { PersistGate } from "redux-persist/integration/react";

export default function WrapperClass({ children }: any) {
    return (
        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <SiteHeader />
                    {children}
                    <Footer />
                </PersistGate>
            </Provider>
        </>
    )
}