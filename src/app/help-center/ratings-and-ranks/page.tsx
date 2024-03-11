"use client"
import Image from 'next/image'
import React, { FC, useState } from 'react'
import DisplayImage from '@/images/help-center-image.png';
import Nav from '@/components/Nav/Nav';
import NavItem from '@/components/NavItem/NavItem';
import View from '@/components/HelpCenter/view';
import Rating from '@/components/HelpCenter/Rating';
import Ranks from '@/components/HelpCenter/Ranks';

const RatingRanking: FC<any> = ({}) => {
    const style = 'mt-3 text-md max-md:text-sm text-gray-600 dark:text-gray-200'
    const tabs: any = [
        { id: 1, title: "Ranks", icon: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" },
        { id: 2, title: "Rating & Activity Points", icon: "M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" },
        { id: 3, title: "Your Vote", icon: "M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" }

    ]
    const [tabActive, setTabActive] = useState<number>(tabs[0].id);
    
    const handleClickTab = (item: number) => {
        if (item === tabActive) {
            return;
        }
        setTabActive(item);
    };

    return (
        <div className="flex">
            <div className='grid grid-flow-row'>
                <div className=' w-screen h-auto bg-secondary-6000 grid grid-flow-col max-lg:p-4'>

                    <div className='py-8 lg:py-16 max-lg:w-full container '>
                        <div className="w-full lg:w-1/2">
                            <h1 className='text-2xl md:text-3xl text-white xl:text-5xl '>
                                <b>Agoracom Knowledge and Support Center</b>
                            </h1>
                            <br />
                            <h1 className=' text-lg max-md:text-sm  text-white'>
                                Where the small cap investor community comes from ansers</h1>
                        </div>

                    </div>


                </div>
                <div className="container py-12 lg:py-20 ">
                    <div className='grid grid-flow-row  gap-2 max-md:gap-1'>
                        <h1 className='text-2xl max-md:text-lg  text-dark'><b>What is the purpose of all this?</b></h1>
                        <h1 className={style}>Great question. In order to build a massive small-cap community without losing control and sacrificing quality on hundreds of discussion forums, we are going to put control in the hands of those who are best able to utilize it You! To do this in a fair and democratic fashion, members will be given different levels of responsibility based on authority levels achieved within the community.</h1>
                        <div className="mt-6">
                            <div className="flex-none lg:flex gap-6">
                             <div className="grow">
                                       <div className="flex-none lg:flex justify-between mb-7">
                                        <Nav
                                            className="sm:space-x-2 rtl:space-x-reverse"
                                            containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base"
                                        >
                                            {tabs.map((item: any, index: number) => (
                                                <NavItem
                                                    key={item.id}
                                                    isActive={tabActive === item.id}
                                                    onClick={() => handleClickTab(item.id)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-1">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                                    </svg>
                                                    {item.title}
                                                </NavItem>
                                            ))}
                                        </Nav>
                                        
                                    </div>
                                    <div className="flex-none lg:flex justify-between mb-7 pt-5 px-0 lg:px-4">
                                        {tabActive==1?<Ranks/>:(tabActive==2?<Rating/>:<View/>)}
                                    </div>
                                    


                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                <div className=" bg-gray-100 py-4 lg:py-16 dark:bg-inherit dark:border-t-[1px]">
                    <div className='container grid grid-flow-col gap-20 max-xl:gap-4 max-xl:grid-flow-row'>
                        <div className=' max-xl:w-full '>
                            <div className="w-full ">
                                <h1 className='text-2xl max-md:text-lg  text-dark'>
                                    <b>About the IP Check Tool</b>
                                </h1>
                                <br />
                                <h1 className={style}>The IP Check tool lists all users who have last logged in from the same IP address as the message poster.</h1>
                                <h1 className={style}>Two usernames who consistently show up together in the IP check tool could be one person with two users in the system, it could be two different people sharing a computer or office network. It does not constitute a violation but is simply additional information that members can use in assessing the credibility of a post.</h1>
                                <h1 className={style}>A user's IP address represents how they have connected to the internet and may change from time to time if they log in from different locations such as home, work, or a cafe. A notebook computer typically changes IP addresses as it connects to different WI-FI networks. Many DSL and cable service providers also choose to rotate the IP addresses used by their customers from time to time for various reasons.</h1>
                                <h1 className={style}>It is also common for IP addresses are shared between multiple computers such as on an office network, a Wi-Fi enabled cafe or hotel, and most smart-phones. As such, an IP address by itself cannot be used to positively identify a specific user.</h1>
                                <h1 className={style}>In order to preserve the privacy of our users, the IP address is not being displayed, however AGORACOM is running a query which will identify all users who's last login IP matches that of the message poster.</h1>

                            </div>
                        </div>
                        <div className="flex items-center justify-center max-xl:w-full ">
                            <div className='w-full flex justify-center lg:block'>
                                <Image
                                    src={DisplayImage}
                                    alt="GFG logo served with static path of public directory"
                                    height="300"
                                    width="450"
                                /> </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default RatingRanking;