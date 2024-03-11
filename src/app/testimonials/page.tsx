import Heading from '@/components/Heading/Heading'
import React from 'react'
import DefaultAvatar from '@/images/Icons/avatar.png'
import Image from 'next/image'
import ButtonPrimary from '@/components/Button/ButtonPrimary'


function TestimonialPage() {
    const style = 'mt-3 font-semibold text-md max-md:text-sm text-gray-600 dark:text-gray-200'

    const testimonialData: any = [
        {
            content: 'Initiative and commitment are AGORACOM’s hallmarks and their team of professionals has become an integral component of our business. They work diligently to deliver timely and accurate information to Omagine’s shareholders and the investment community. We are grateful for the opportunity to work with them.”',
            name: 'Charley Kuczynski',
            subText: 'Omagine (OTCBB: OMAG)'
        },
        {
            content: 'I highly recommend George and Agoracom for shareholder outreach and market communications. George spends the time to understand in detail the technology of the Company making himself an informed partner with the Company. Being informed about the details of the Company makes George more effective with the overall communication strategy of the Company. Additionally, George is then able to help the Company with business development as well, as he has ably demonstrated for Neah.”',
            name: "Chris D'Couto",
            subText: 'Neah Power Systems'
        },
        {
            content: 'George is a professional in every facet of his activities. His energy and creativity are inspirational and, for many, contagious - which is great for the people around him. More than anything, he is a true gentleman who I feel honoured to know.”',
            name: 'Peter Traynor',
            subText: 'Canadian Securities Exchange'
        },
        {
            content: 'George was an early mover and an innovator in offering a low-cost, comprehensive Internet IR solution for emerging small cap public companies. Agoracom remains a good alternative for companies looking to raise their profile with investors on the web at a reasonable cost.”',
            name: 'Donald Bubar',
            subText: 'Avalon Advanced Materials Inc.'
        },
        {
            content: 'George understands how to create "magic" in online marketing better than anyone I know. He always puts the best interests of his clients at the forefront of all of his efforts. George is a pleasure to collaborate with.”',
            name: 'John Carlesso',
            subText: 'Cervello Capital Inc.'
        },
        {
            content: `Make no mistake; George Tsiolis is hands down, one of the most enthusiastic people I have ever had the pleasure to work with. George helped transform my our Company's investor relations, and the results we fantastic. Smart, savvy and a CEO of a unique firm sums up the tremendous assets George possesses and will lend to any organization.”`,
            name: 'Matthew Schissler',
            subText: 'Pyrenees Investments, LLC'
        },
        {
            content: 'I have had the pleasure of knowing and working with George for almost 10 years now. His knowledge of the investor relations space is very strong and he knows what it takes to get a firms message out to both a targeted audience and the masses. Most impressive in my eyes is that he keeps up with communication and marketing trends and advancements so with Agora you are not getting the standard tired IR routine. He is ahead of the curve as far as his techniques, using social media, and new technologies to get a firms message across as well as communicating what is going on in the markets in general. A straight shooter type who will do what it takes for you.”',
            name: 'Michael Michalakis',
            subText: 'Shindig, Inc.'
        },
        {
            content: 'Agoracom was an easy recommendation for us to make to our client. They have a huge pool of investors that span a vast variety of industry interests. For our client, they provided the largest and most diverse panel of mining investors which made informing them the most focussed and effective. Overall, they are an excellent resource to have.”',
            name: 'Torque Customer Strategy',
            subText: 'Torque Customer Strategy'
        }
    ]

    return (
        <div className='relative container'>
            <div className='flex flex-row max-lg:items-center max-lg:flex-col max-lg:gap-5 gap-8 py-10 lg:py-16'>
                <div className='flex flex-col w-3/4 max-xl:w-full'>
                    <Heading desc={""} isCenter className="text-defaultBlue-100 mb-4 lg:mb-9">
                        Agoracom Testimonials
                    </Heading>
                    <h1 className={style}>While any firm can tell you how great they are. The real acid test is what their clients have to say about them</h1>
                    <div className="mt-3 grid grid-flow-row gap-4 py-3">
                        {
                            testimonialData.map((item: any, index: number) => {
                                const isOdd = index % 2 ? true : false;
                                return (
                                    <div key={index} className={`grid grid-flow-row p-8 shadow-lg ${isOdd ? "bg-white dark:bg-neutral-900" : "bg-blue-200"} `}>
                                        <h1 className=" text-blue-800 text-5xl  italic"><b>''</b></h1>
                                        <h1 className=" text-black lg:text-start "><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.content}</b></h1>
                                        <div className='mt-4 flex flex-row gap-2 items-center '>

                                            <div className=' h-8 w-8 rounded-full bg-white'><Image
                                                src={DefaultAvatar}
                                                alt="GFG logo served with static path of public directory"
                                                height="100"
                                                width="400"
                                            /> </div>
                                            <div className="flex flex-row  max-lg:flex-col gap-2">
                                                <h1 className={isOdd ? "text-dark" : "text-black"}><b>{item.name} </b></h1>
                                                <h1 className="text-blue-500">{item.subText}</h1>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })
                        }
                        {/* <div className="flex mt-5 lg:mt-10 justify-center items-center">
                            <ButtonPrimary>Show more</ButtonPrimary>
                        </div> */}

                    </div>
                </div>
                <div className='flex flex-col gap-4 lg:mt-4 w-1/4 max-xl:w-1/2 max-lg:w-full max-lg:flex-row max-sm:flex-col  h-fit py-4 px-4'>
                    <div className={`nc-Card12 group relative flex flex-col h-fit `}>
                        <div className={` w-full aspect-w-16 aspect-h-9 relative pb-2 rounded-md overflow-hidden sm:pb-4 lg:pb-0 lg:pr-5 xl:pr-6 h-[140px] max-lg:h-[200px] `}>

                            <iframe
                                src={'https://www.youtube.com/embed/GZa5VHD7rEQ'}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="ncblog hero video"
                            ></iframe>

                        </div>
                        <div className="mt-2 sm:mt-5 pb-5">
                            <h2
                                className={`block font-bold text-dark sm:text-lg lg:text-2xl`}
                            >
                                <span className="text-lg leading-none">
                                    Richard Nemis, President and CEO of Noront Resources
                                </span>
                            </h2>
                            <h2
                                className={style}
                            >
                                <span className="">
                                    (TSX-V: NOT) gives AGORACOM a glowing review at their latest Annual General Meeting in Toronto
                                </span>
                            </h2>
                        </div>
                    </div>
                    <div className={`nc-Card12 group relative flex flex-col h-fit `}>
                        <div className={` w-full aspect-w-16 aspect-h-9 relative pb-2 rounded-md overflow-hidden sm:pb-4 lg:pb-0 lg:pr-5 xl:pr-6 h-[140px] max-lg:h-[200px] `}>

                            <iframe
                                src={'https://www.youtube.com/embed/f8ATNjZIymk'}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="ncblog hero video"
                            ></iframe>

                        </div>

                        <div className="mt-2 sm:mt-5 pe-10 pb-5">
                            <h2
                                className={` nc-card-title block font-bold text-dark sm:text-lg lg:text-2xl`}
                            >
                                <span className="text-lg leading-none">
                                    Nigel Lees, President and CEO of Sage Gold
                                </span>
                            </h2>
                            <h2
                                className={style}
                            >
                                <span className="">
                                    (TSX-V: SGX) discusses how AGORACOM has helped Sage and what he likes most about the AGORACOM program
                                </span>
                            </h2>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default TestimonialPage