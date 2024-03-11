import { useState } from "react";
import ButtonPrimary from "../Button/ButtonPrimary";
import Input from "../Input/Input";
import Select from "../Select/Select";
import useValidator from "@/hooks/useValidator";
import alertMessage from "@/utils/swalAlert";
import { contactRelation } from "@/requests/Contact";

export default function ContactRelationFrom() {

    const initialData = {
        firstName: "",
        lastName: "",
        company: "",
        symbol: "",
        exchange: "",
        phone: "",
        email: "",
        hearUs: "google",
        other: ""
    }

    const menuOptions: any = {
        "google": "Google",
        "yahoo": "Yahoo",
        "other_search_engine": "Other Search Engine",
        "blackberry": "Blackberry",
        "current_client": "Current Client",
        "press_release": "Press Release",
        "other": "Other"
    }

    const [validator, showValidationMessage]: any = useValidator();
    const [data, setData] = useState(initialData);
    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState([]);
    
    const handleChange = (key: string, value: string) => {
        setData({
            ...data,
            [key]: value
        })
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
            let payload = {
                name: data.firstName,
                last_name: data.lastName,
                company: data.company,
                symbol: data.symbol,
                exchange: data.exchange,
                phone_number: data.phone,
                email: data.email,
                how: data.hearUs
            }
            try {
                setLoader(true);
                let res: any = await contactRelation(payload);
                setLoader(false);
                if(res.status === 201) {
                    alertMessage({
                        title: "Sent successfully",
                        text: "",
                        icon: "success",
                        timer: 3000
                    });
                    resetForm();
                }
            } catch (e) {
                let err: any = ["Something went wrong!"];
                setErrors(err);
                setLoader(false);
            }
        } else {
            showValidationMessage(true);
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            // forceUpdate();
        }
    }

    return (
        <div className="bg-white dark:!bg-transparent w-full h-fit px-6 py-10 border-0 dark:border-[1px] border-[#3E3E3E] rounded">
            <div className=" grid grid-flow-row gap-1">
                <h1 className='text-lg text-dark'>Speak with an Agoracom representative today</h1>
                <div className="w-full h-fit mt-6">
                    <h6 className="text-base">First Name*</h6>
                    <Input
                        required
                        aria-required
                        placeholder="Enter First Name"
                        type="text"
                        name="firstName"
                        value={data.firstName}
                        rounded={"rounded"}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        className="text-neutral-800 px-4 mt-1 dark:text-neutral-200"
                    />
                </div>
                <div className="w-full mt-1 text-red-500 text-sm">
                    {validator.message('firstName', data.firstName, 'required')}
                </div>
                <div className="w-full h-fit mt-4">
                    <h6 className="text-base">Last Name*</h6>
                    <Input
                        required
                        aria-required
                        placeholder="Enter LastName"
                        type="text"
                        value={data.lastName}
                        rounded={"rounded"}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                        className="text-neutral-800 px-4 mt-1 dark:text-neutral-200"
                    />
                </div>
                <div className="w-full mt-1 text-red-500 text-sm">
                    {validator.message('lastName', data.lastName, 'required')}
                </div>
                <div className="w-full h-fit mt-4">
                    <h6 className="text-base">Company*</h6>
                    <Input
                        required
                        aria-required
                        placeholder="Enter Company"
                        type="text"
                        value={data.company}
                        rounded={"rounded"}
                        onChange={(e) => handleChange("company", e.target.value)}
                        className="text-neutral-800 px-4 mt-1 dark:text-neutral-200"
                    />
                </div>
                <div className="w-full mt-1 text-red-500 text-sm">
                    {validator.message('company', data.company, 'required')}
                </div>
                <div className="w-full grid grid-flow-col gap-5 max-lg:gap-3 h-fit mt-4">
                    <div className="w-full">
                        <h6 className="text-base">Symbol*</h6>
                        <Input
                            required
                            aria-required
                            placeholder="Enter Symbol"
                            type="text"
                            value={data.symbol}
                            rounded={"rounded"}
                            onChange={(e) => handleChange("symbol", e.target.value)}
                            className="text-neutral-800 px-4 mt-1 dark:text-neutral-200"
                        />
                        <div className="w-full mt-1 text-red-500 text-sm">
                            {validator.message('symbol', data.symbol, 'required')}
                        </div>
                    </div>
                    <div className="w-full">
                        <h6 className="text-base">Exchange*</h6>
                        <Input
                            required
                            aria-required
                            placeholder="Enter Exchange"
                            type="text"
                            value={data.exchange}
                            rounded={"rounded"}
                            onChange={(e) => handleChange("exchange", e.target.value)}
                            className="text-neutral-800 px-4 mt-1 dark:text-neutral-200"
                        />
                        <div className="w-full mt-1 text-red-500 text-sm">
                            {validator.message('exchange', data.exchange, 'required')}
                        </div>
                    </div>
                </div>
                <div className="w-full h-fit mt-4">
                    <h6 className="text-base">Phone Number*</h6>
                    <Input
                        required
                        aria-required
                        placeholder="Enter Phone Number"
                        type="number"
                        value={data.phone}
                        rounded={"rounded"}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="text-neutral-800 px-4 mt-1 dark:text-neutral-200"
                    />
                </div>
                <div className="w-full mt-1 text-red-500 text-sm">
                    {validator.message('phone', data.phone, 'required|phone')}
                </div>
                <div className="w-full h-fit mt-4">
                    <h6 className="text-base">Email*</h6>
                    <Input
                        required
                        aria-required
                        placeholder="Enter Email"
                        type="email"
                        value={data.email}
                        rounded={"rounded"}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="text-neutral-800 px-4 mt-1 dark:text-neutral-200"
                    />
                </div>
                <div className="w-full mt-1 text-red-500 text-sm">
                    {validator.message('email', data.email, 'required|email')}
                </div>
                <div className="w-full h-fit mt-4">
                    <h6 className="text-base">How did you hear about us?*</h6>
                    <Select 
                        menuDropdown={menuOptions} 
                        rounded="!rounded" 
                        className="!w-full" 
                        selectedValue={data.hearUs} 
                        setMenu={(val: any) => handleChange('hearUs', val)} />
                </div>
                <div className="w-full mt-1 text-red-500 text-sm">
                    {validator.message('hearUs', data.hearUs, 'required')}
                </div>
                <div className="w-full h-fit mt-4">
                    <h6 className="text-base">Other</h6>
                    <Input
                        required
                        aria-required
                        placeholder="Type something here..."
                        type="text"
                        value={data.other}
                        rounded={"rounded"}
                        onChange={(e) => handleChange("other", e.target.value)}
                        className="text-neutral-800 px-4 mt-1 dark:text-neutral-200"
                    />
                </div>
                {
                    errors.length > 0 && errors.map((item: any, index: number) => {
                        return (
                            <div key={index} className="p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                {item}
                            </div>
                        )
                    })
                }
                <div className="w-full h-fit mt-6 mb-3">
                    <ButtonPrimary className="w-full text-center" loading={loader} onClick={submitHandler} sizeClass="py-2 sm:py-3">Submit</ButtonPrimary>
                </div>
            </div>
        </div>
    )
}