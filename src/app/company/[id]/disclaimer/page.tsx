'use client';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import ButtonSecondary from '@/components/Button/ButtonSecondary';
import Heading from '@/components/Heading/Heading'
import { addFavouriteCompany, getCompanies, removeFavouriteCompany } from '@/requests/Home';
import Image from 'next/image'
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function DisclaimerPage() {
    const style = 'mt-3 font-semibold text-md max-md:text-sm text-gray-600 dark:text-gray-200 '
    const style1 = 'mt-3 font-semibold text-sm text-gray-600 dark:text-gray-200'
    const style2 = 'mt-3 font-semibold text-right text-sm text-dark'
    const params = useParams();
    const searchParams = useSearchParams();
    const router: any = useRouter();
    const [discussion, setDiscussion] = useState([]);
    const [bulletins, setBulletins]: any = useState([]);
    const [followed, setFollowed]: any = useState(false);
    const [followLoader, setFollowLoader]: any = useState(false);
    const [info, setInfo]: any = useState({});
    const [topMembers, setTopMembers] = useState([]);
    const [FeaturedPosts, setFeaturedPosts] = useState([]);
    const [userData, setUserData]: any = useState({});
    const [appliedFilters, setAppliedFilters] = useState([]);
    const [discussionDetails, setDiscussionDetails]: any = useState({});
    const [globalLoader, setGlobalLoader] = useState(false)
    const [selectedDiscussion, setSelectedDiscussion] = useState("discussions");
    const [loader, setLoader] = useState({
        discussion: false,
        recentDiscussion: false
    })
    useEffect(() => {
        if (params.id) {
            fetchData(params.id);

        } else {
            router.back();
        }
    }, [])
    const fetchData = async (id: any) => {
        try {
            setGlobalLoader(true)
            const response: any = await getCompanies(id);
            setGlobalLoader(false)
            if (response.status === 200) {
                const { bulletins, discussions, info, featured_posts, top_members } = response.data;



                setUserData(info)
                setBulletins(bulletins.filter((i: any, index: number) => index < 4))
                setDiscussion(discussions.filter((i: any, index: number) => index < 5))
                setTopMembers(top_members.filter((i: any, index: number) => index < 6))
                setInfo(info)
                setFeaturedPosts(featured_posts)

                setFollowed(response.data.followed ? true : false);


            }
        } catch (e: any) {
            console.log(e);
        }
    }
    const { currentUser, loggedIn } = useSelector((state: any) => {
        return {
            currentUser: state.auth.currentUser,
            loggedIn: state.auth.loggedIn
        };
    });
    let id = params.id
    const followHub = async () => {
        if (loggedIn) {
            setFollowLoader(true)
            let response = null;
            if (followed) {
                response = await removeFavouriteCompany(info?.id)
            } else {
                response = await addFavouriteCompany(info?.id)
            }
            setFollowLoader(false)
            if (response.status === 200 || response.status === 201) {
                setFollowed(!followed)
            }
        } else {
            router.push('/auth/login');
        }
    }
    return (


        <div className='relative py-8'>

            <div className='container'>
                <div className='flex flex-row  max-xl:justify-center max-xl:flex-col max-xl:items-center gap-5 xl:gap-8 py-8 px-4'>
                    <div className='flex flex-col w-3/4 gap-3 max-xl:w-full'>
                        {/* <Heading desc={""} isCenter className="text-defaultBlue-100 mb-4">
                                {info.name}
                            </Heading> */}
                        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3">
                            <div className="w-full flex items-center">
                                <Heading desc={""} className="text-defaultBlue-100">
                                    Disclaimer
                                </Heading>
                            </div>
                           
                        </div>
                        <div className="mt-6">
                            <div className="flex flex-col gap-2">
                                <h1 className={style}><p className="MsoNormal">AGORACOM.com (AGORACOM) is an online community for small cap companies and investors to discover and discuss small cap stocks. Small Cap Companies represented by AGORACOM Investor Relations Corp. (Investor Relations Services) and AGORA Internet Relations Corp. (Advertising, Marketing and Awareness Services) pay consideration, which may include a monthly cash fee, and/or restricted stock, which will be intermittently sold. None of AGORACOM, AGORACOM Investor Relations and AGORA Internet Relations is a registered investment advisor or a broker dealer.</p></h1>
                                <h1 className={style}><p><b>The following companies are advertising clients of AGORA Internet Relations</b></p></h1>
                                <h1 className={style}><p>American Creek Resources</p></h1>
                                <h1 className={style}><p>BetterU Education Corp.</p></h1>
                                <h1 className={style}><p>CardioComm Solutions</p></h1>
                                <h1 className={style}><p>Explor Resources</p></h1>
                                <h1 className={style}><p>FanLogic Interactive</p></h1>
                                <h1 className={style}><p>GGX Gold Corp.</p></h1>
                                <h1 className={style}><p>Glacier Lake Resources</p></h1>
                                <h1 className={style}><p>Good Life Networks</p></h1>
                                <h1 className={style}><p>Gratamic Inc.</p></h1>
                                <h1 className={style}><p>Great Atlantic Resources</p></h1>
                                <h1 className={style}><p>Grizzly Discoveries</p></h1>
                                <h1 className={style}><p>HPQ Silicon Resources Inc.</p></h1>
                                <h1 className={style}><p>IntellaEquity Inc.</p></h1>
                                <h1 className={style}><p>Monarques Gold Corp.</p></h1>
                                <h1 className={style}><p>Namaste Technologies Inc.</p></h1>
                                <h1 className={style}><p>New Age Metals</p></h1>
                                <h1 className={style}><p>Northern Sphere</p></h1>
                                <h1 className={style}><p>Peeks Social Ltd.</p></h1>
                                <h1 className={style}><p>PyroGenesis Canada Inc.</p></h1>
                                <h1 className={style}><p>St Georges Eco-Mining Technologies</p></h1>
                                <h1 className={style}><p>Star Navigations Systems</p></h1>
                                <h1 className={style}><p>Tartisan Nickel Corp.</p></h1>
                                <h1 className={style}><p>Tetra Bio-Pharma</p></h1>
                                <h1 className={style}><p>ThreeD Capital</p></h1>
                                <h1 className={style}><p><b>The following companies are investor relations clients of AGORACOM Investor Relations</b></p></h1>
                                <h1 className={style}><p>Applied Biosciences Corp.</p></h1>
                                <h1 className={style}><p>Esports Entertainment Group</p></h1>
                                <h1 className={style}><p>Liberty Star Uranium & Metals</p></h1>
                                <h1 className={style}><p>Marijuana Company of America, Inc.</p></h1>
                                <h1 className={style}><p>The information contained within the AGORACOM.com website in general, and more specifically, the client HUBS, Corporate Profile and Broker Fact Sheet were approved by the company presented and are reproduced with its authorization. The accuracy and completeness of that information are the sole responsibility of the said company. At times, the most current and up to date information may not be reflected in the aforementioned material.</p></h1>
                                <h1 className={style}><p>The above mentioned sources of information are published for general information only and it should not be interpreted as an investment recommendation nor an offer or a solicitation to buy or sell securities issued by the said company. The information is subject to change without notice. AGORACOM does not accept any responsibility or liability for investment decisions made on the basis of the information herein contained.</p></h1>
                                <h1 className={style}><p>The information contained in this Internet Site may contain forward-looking statements relating to the developments of the featured company’s products, services and future operating results. Statements contained in writing or in interviews are subject to certain risks and uncertainties that could cause actual results to differ materially from those projected.</p></h1>
                                <h1 className={style}><p>The words “believe,”,”expect,” “intend,” “anticipate,”, variations of such words, and similar expressions identify forward-looking statements, but their absence does not mean that the statement is not forward-looking. These statements are not guarantees of future performance and are subject to certain risks, uncertainties and assumptions that are difficult to predict. Factors that could affect performance include, but are not limited to, those factors that are discussed in each Company’s most recent reports and/or registration statements filed with applicable securities regulators. Visitors to this Internet Site are cautioned not to place undue reliance on these forward-looking statements. These statements have not been independently verified by AGORACOM</p></h1>
                                <h1 className={style}><p>Information on this Internet Site has been provided by the companies contained herein or other sources believed to be reliable. AGORACOM has not independently verified the information provided to it by third parties. Each individual should perform his or her own independent analysis before investing. The information contained herein is neither an offer nor a solicitation to buy any of the securities of the companies contained herein. Investing in securities is speculative and contains a high element of risk.</p></h1>

                            </div>

                        </div>
                    </div>
                    <div className='flex flex-col w-1/4 max-xl:w-1/2 max-lg:w-full   h-fit px-7 py-7 shadow-md border-gray-300 border  rounded-xl bg-white dark:bg-neutral-900 dark:border-gray-800'>
                        <div className=" flex flex-row justify-center items-center">
                            <div className="w-40  h-40 overflow-hidden  rounded-full  flex ">
                                <Image
                                    src={info.small_logo_url}
                                    alt="GFG logo served with static path of public directory"
                                    width="100"
                                    className='w-full h-full'
                                    height="100"
                                />
                            </div>

                        </div>
                        <div className=' text-center flex flex-col gap-3 mt-3'>
                            <h1 className="text-2xl max-md:text-lg  text-dark"><b>{info.name}</b></h1>
                            <h1 className="text-blue-500 "><b>Stock Quotes</b></h1>
                            {/* <div className="flex-shrink-0 w-full  lg:mb-0 grow lg:grow-0 lg:!w-[260px] sm:!w-full">
                                <form className="relative">
                                    <Input
                                        required
                                        aria-required
                                        placeholder="Search Keyword"
                                        type="text"
                                        value={""}
                                        // onChange={(e) => setKeyword(e.target.value)}
                                        className="text-neutral-800 px-6 dark:text-neutral-200"
                                    />
                                    <ButtonCircle
                                        type="submit"
                                        // disabled={!keyword.length}
                                        // onClick={searchKeyword}
                                        className={`absolute transform top-1/2 -translate-y-1/2 end-1 !bg-defaultGreen-100 hover:!bg-primary-500 dark:bg-neutral-300 dark:text-black`}
                                    >
                                        <MagnifyingGlassIcon className="w-5 h-5" />
                                    </ButtonCircle>
                                </form>
                            </div> */}
                            <div className='grid grid-flow-row gap-3 '>
                                <div className="grid grid-flow-col text-left">
                                    <h1 className={style1}>Symbol</h1>
                                    <h1 className={style2}>{info.tidy_ticker}</h1>
                                </div>
                                <div className="grid grid-flow-col text-left">
                                    <h1 className={style1}>Exchange</h1>
                                    <h1 className={style2}>{info.stock_exchange}</h1>
                                </div>
                                <div className="grid grid-flow-col text-left">
                                    <h1 className={style1}>Shares</h1>
                                    <h1 className={style2}>{info.outstanding_shares}</h1>
                                </div>

                                <div className="grid grid-flow-col text-left">
                                    <h1 className={style1}>Industry</h1>
                                    <h1 className={style2}><a href="/">{info.industry}</a></h1>
                                </div>
                                <div className="grid grid-flow-col text-left">
                                    <h1 className={style1}>Website</h1>
                                    <h1 className={style2}><a href={info.external_website}>Click Here</a></h1>
                                </div>

                                <Link href={loggedIn ? `/company/${id}/create` : '/auth/login'}>
                                    <div className="flex mt-3 justify-center items-center">
                                        <ButtonSecondary className='w-full' sizeClass="py-2.5 px-4 sm:py-3 sm:px-6"><span className='text-sm'>Create a Post</span></ButtonSecondary>
                                    </div>
                                </Link>
                                <div className="flex justify-center items-center">
                                    <ButtonPrimary className='w-full' sizeClass="py-2.5 px-4 sm:py-3 sm:px-6" loading={followLoader} onClick={followHub}><span className='text-sm'>{followed ? 'Followed' : 'Follow Hub'}</span></ButtonPrimary>
                                </div>


                            </div>


                        </div>

                    </div>
                </div>


            </div>



        </div>
    )
}


export default DisclaimerPage
