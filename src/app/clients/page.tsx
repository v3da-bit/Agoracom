'use client';

import Heading from '@/components/Heading/Heading'
import React, { FC, useEffect, useState } from 'react'
import DefaultAvatar from '@/images/favicon.png'
import Image from 'next/image'
import ProudCard from '@/components/ProudCard/ProudCard'
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import { getAllClients } from '@/requests/Extras';


const ClientScreen: FC<any> = ({ }) => {
    const [data, setData] = useState([]);
    const style = 'mt-3 font-semibold text-md max-md:text-sm text-gray-600 dark:text-gray-200'
    // const data = [
    //     {
    //         id: 1,
    //         img: DefaultAvatar,
    //         title: "Affinity Metals Corp.",
    //         subTitle: "(TSX-V:AFF)",
    //         content: "It is also common for IP addresses are shared between multiple computers such as on an office network, a Wi-Fi enabled cafe or hotel, and most smart-phones. As such, an IP address by itself cannot be used to positively identify a specific user."
    //     },
    //     {
    //         id: 2,
    //         img: DefaultAvatar,
    //         title: "Affinity Metals Corp.",
    //         subTitle: "(TSX-V:AFF)",
    //         content: "It is also common for IP addresses are shared between multiple computers such as on an office network, a Wi-Fi enabled cafe or hotel, and most smart-phones. As such, an IP address by itself cannot be used to positively identify a specific user."
    //     },
    //     {
    //         id: 3,
    //         img: DefaultAvatar,
    //         title: "Affinity Metals Corp.",
    //         subTitle: "(TSX-V:AFF)",
    //         content: "It is also common for IP addresses are shared between multiple computers such as on an office network, a Wi-Fi enabled cafe or hotel, and most smart-phones. As such, an IP address by itself cannot be used to positively identify a specific user."
    //     }
    // ]

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        const response = await getAllClients();
        if (response?.status === 200) {
            setData(response.data);
        }
    }

    return (
        <div className='relative py-3'>
            <div className='container'>
                <div className="">
                    <Heading desc={""} isCenter className="text-defaultBlue-100 mb-9">
                        Agoracom is Proud
                    </Heading>
                    <h1 className={style}>To represent the following companies</h1>
                    <h1 className='text-3xl max-md:text-xl  text-dark mt-5'>
                        <b>Clients</b>
                    </h1>
                </div>
                <div className="mt-3 py-3">
                    <ProudCard data={data} />
                    {/* <div className="flex mt-10 justify-center items-center">
                        <ButtonPrimary>Show more</ButtonPrimary>
                    </div> */}
                </div>
            </div>

        </div>

    )
}

export default ClientScreen;