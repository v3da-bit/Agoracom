'use client';
import Heading from '@/components/Heading/Heading'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import DefaulAvatar from '@/images/success_stories.jpg'
import ProfileCard from '@/components/ProfileCard/ProfileCard';
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import { successStories } from '@/requests/Extras';

function SuccessStories() {

    const [pageInfo, setPageInfo] = useState({
        page: 0,
        showMore: false
    });
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const newPage = pageInfo.page + 1;
        let payload = { page: newPage };
        setLoading(true);
        const result: any = await successStories(payload);
        setLoading(false);
        if (result.status === 200) {
            let newData: any = [...data, ...result.data];
            let page = JSON.parse(result?.headers.toJSON()?.pagy);
            let pagePayload = {
                showMore: page.next != null,
                page: newPage
            }
            setData(newData);
            setPageInfo(pagePayload);
        }
    }

    return (
        <div className="w-full">
            <div className='container block lg:flex py-10 lg:py-16'>
                <div className='flex flex-col w-full lg:w-3/4'>
                    {/* <Heading desc={""} isCenter className="text-defaultBlue-100 mb-3 lg:mb-6">
                        Advance Gold Corp.'s Profile
                    </Heading>
                    <h1 className="mt-3 text-base max-md:text-sm text-gray-600 dark:text-gray-200">More than just words, Agoracom delivers quantifiable and verifiable results which support the effectiveness of our investor relations and marketing campaigns</h1>
                    <h1 className="mt-3 text-2xl max-md:text-lg  text-dark"><b>Success stories</b></h1>
                    <div className="mt-3 flex flex-col gap-3 pr-0 lg:pr-10">
                        <ProfileCard post={data} />
                    </div>
                    {
                        pageInfo.showMore ? (
                            <div className="w-full h-fit mt-3 mb-6 lg:mt-6 py-3 px-3 flex justify-center">
                                <ButtonPrimary className=" px-3 py-3 text-center" onClick={fetchData} loading={loading} sizeClass="py-3 px-6 lg:py-4">Show More</ButtonPrimary>
                            </div>
                        ) : <></>
                    } */}
                </div>
                <div className='flex flex-col w-full lg:w-1/4 h-fit px-8 py-7 border-gray-300 border text-justify rounded-xl bg-white dark:bg-neutral-900 dark:border-gray-800'>
                    <div className=" flex flex-row">
                        <div className="w-full h-full">
                            <Image
                                src={DefaulAvatar}
                                alt="GFG logo served with static path of public directory"
                                className='w-full'
                            />
                        </div>
                    </div>
                    <div className='text-left my-3'>
                        <h1 className="mt-3 text-md max-md:text-sm text-gray-600 dark:text-gray-200">AGORACOM is one of North America's largest outsourced Investor Relations and Advertising firms for small cap companies. We have represented over 300 small cap companies across all industries including but not limited to technology, resources, cannabis, medical, renewable energy, oil & gas, 3D printing, esports and many more. Our clients trade on all exchanges including the NYSE and NASDAQ but we primarily focus on the TSX, TSX-V, CSE and OTCQB. The following is just a sample of the success stories that our clients have experienced over the years.</h1>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default SuccessStories