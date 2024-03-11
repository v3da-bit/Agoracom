'use client';

import ButtonPrimary from '@/components/Button/ButtonPrimary'
import ButtonSecondary from '@/components/Button/ButtonSecondary';
import ContactRelationFrom from '@/components/Contact-RelationForm/Contact-RelationForm'
import Heading from '@/components/Heading/Heading'
import Input from '@/components/Input/Input'
import Image from 'next/image'
import React from 'react'

function InvestorPage() {
    return (
        <div className='container my-6 lg:my-12'>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
                <div className='pr-0 lg:pr-6'>
                    <Heading desc={""} isCenter className="text-defaultBlue-100 mb-9">
                        Agoracom Investor Relations
                    </Heading>
                    <h1 className="mt-3 text-gray-600 text-base">Over 300 small-cap companies have trusted AGORACOM's solutions to professionally manage their investor relations. From daily management to generating new shareholder leads, AGORACOM is the leading provider of outsourced Investor Relations for Small-Cap Budgets.</h1>
                    <ButtonPrimary className="w-fit text-center rounded-3xl mt-5" loading={false} sizeClass="py-2 px-6 sm:py-3">Start today</ButtonPrimary>

                    <h1 className="mt-5 text-gray-600 text-base">
                        Founded in 1997, AGORACOM is the pioneer and leading online investor relations firm that caters
                        to the IR and Marketing needs of small and mid cap public companies trading on the TSX, TSX Venture,
                        NYSE Alternext, AMEX, NASDAQ, OTCBB, OTCQX, AIM and Frankfurt.
                    </h1>

                    <h1 className="mt-3 text-gray-600 text-base">
                        More than just lip service, AGORACOM is the home of more than 1.3 million
                        investors that visited 8 million times and read almost 100 million pages
                        of information over the past 12 months. Our traffic results are independently
                        tracked and verified by Google analytics, so please take a minute to view our
                        audience statistics. AGORACOM Record Traffic
                    </h1>
                    <h1 className="mt-4 text-gray-600 text-base">
                        AGORACOM Founder, George Tsiolis, publishes the leading blog on small to mid
                        cap investor relations. His 50 Small-CEO Lessons are a must read for CEO's looking
                        to increase their education and knowledge about online investor relations.
                    </h1>
                    <h1 className="mt-4 text-2xl text-dark text-base">
                        <b>Take an 8 Minute Tour Of Our Solution</b>
                    </h1>
                    <h1 className="mt-4 text-gray-600 text-base">
                        The easiest and fastest way to learn about how AGORACOM will deliver incredible
                        results for your company is to watch our 8-minute webcast. Please be sure to turn
                        on your speakers
                    </h1>
                    <div className="grid grid-flow-col gap-4">
                        <div className="w-full h-fit mt-6 mb-3">
                            <ButtonSecondary className="w-full text-center rounded-md" loading={false} sizeClass="py-2 sm:py-3">Canadian Companies</ButtonSecondary>
                        </div><div className="w-full h-fit mt-6 mb-3">
                            <ButtonSecondary className="w-full text-center rounded-md" loading={false} sizeClass="py-2 sm:py-3">American Companies</ButtonSecondary>
                        </div>
                    </div>
                    <h1 className="my-3 text-2xl text-dark"><b>Samples of our Success</b></h1>
                    <h1 className="my-3 text-gray-600 text-base">View a sample of AGORACOM'S successful Investor Relations campaigns that have generated significant shareholder value. Every public company is different and requires a specific IR program tailored to its specific needs. AGORACOM has the experience, personnel and reputation to help your company deliver a successful IR program. AGORACOM Success Stories Submit</h1>


                </div>
                <ContactRelationFrom />
            </div>
        </div>
    )
}

export default InvestorPage