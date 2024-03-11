"use client";

import { url } from 'inspector'
import React, { useState } from 'react'
import Image from "next/image";
import Input from '@/components/Input/Input';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import Heading from '@/components/Heading/Heading';
import DefaultAvatar from '@/images/Icons/avatar.png'
import Select from '@/components/Select/Select';
import ContactRelationFrom from '@/components/Contact-RelationForm/Contact-RelationForm';

export default function ServicePage() {

    return (
        <div className='container my-6 lg:my-12'>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
                <div className='pr-0 lg:pr-6'>
                    {/* <h1 className="my-3 text-dark text-5xl"><b>Contact Agoracom</b></h1> */}
                    <Heading desc={""} isCenter className="text-defaultBlue-100 mb-9">
                        Contact Agoracom
                    </Heading>
                    <h1 className="my-3 text-gray-600">Thank you for your interest in Agoracom. Please fill out the following form to receive a guranteed response from one of our IR and marketing specialists within the next 2 business hours.</h1>
                    <h1 className="my-5 text-2xl text-dark"><b>Thank you for your interest in Agoracom</b></h1>
                    <h1 className="my-3 text-gray-600">We look forward to speaking with you, listening to your needs and commencing the IR program that is most appropriate for you.</h1>
                    <h1 className="my-3 text-gray-600">Please fill out the following form to receive a guaranteed response within the next 2 business hours.</h1>
                    <div className="grid grid-flow-row px-7 my-8 py-4 bg-blue-200">
                        <h1 className=" text-blue-800 text-5xl italic"><b>''</b></h1>
                        <h1 className=" text-blue-800 lg:text-start "><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Agoracom was an easy recommendation for us to make to our client. They have a huge pool of investors that span a vast variety of industry interests. For our client, they provided the largest and most diverse panel of mining investors which made informing them the most focussed and effective. Overall, they are an excellent resource to have."</b></h1>
                        <div className='mt-4 flex gap-2'>
                            <Image
                                src={DefaultAvatar}
                                alt="GFG logo served with static path of public directory"
                                className='w-10 h-10'
                            />
                            <div>
                                <h1 className="text-dark text-base"><b>Torque Customer Strategy </b></h1>
                                <h1 className="text-blue-500 text-sm -mt-1">Torquecustomerstrategy.com</h1>
                            </div>
                            {/* flex flex-row gap-2 max-md:flex-col */}

                        </div>

                    </div>
                </div>
                <ContactRelationFrom />
            </div>
        </div>
    )
}