'use client';
import Heading from '@/components/Heading/Heading';
import Nav from '@/components/Nav/Nav';
import NavItem from '@/components/NavItem/NavItem';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
// import BroadCasts from './BroadCast';
import ExecutiveMessage from './ExecutiveMsg';
import MessagePage from './Messages';
import ManagementPage from './Management';
import AuthorityPage from './AuthorityPage';
import ProfilePage from './edit/page';
import { useSelector } from 'react-redux';
import { CompanyBroadcastPagination, CompanyData } from '@/requests/Profile';
import { useLocation } from 'react-router-dom'
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import Input from '@/components/Input/Input';


function EditPage() {
    const style = 'font-semibold text-xl text-white max-md:text-md'
    const style2 = ' font-semibold text-right text-base text-dark'
    const [industry, setIndustry] = useState('posts');
    const router = useRouter()
    const params = useParams()
    const [globalLoader, setGlobalLoader] = useState(false)

    const initialData = {
        name: '',
        ticker: '',
        secondary_ticker: '',
        symbol: '',
        secondary_symbol: '',
        industry_id: '',
        stock_exchange_id: '',
        secondary_stock_exchange_id: '',
        outstanding_shares: '',
        edgar_sedar_link: '',
        transfer_agent_name: '',
        transfer_agent_url: '',
        external_website: '',
        company_overview: '',
        banner_text: '',
        sub_banner_text: '',
        overview: '',
        logo: '',
        delete_logo: false,
        small_logo: '',
        delete_small_logo: '',
        username: '',
        hub_type: '',
        hub_path: '',
        broker_fact_sheet: '',
        stock_symbol: '',
        secondary_stock_symbol: '',
        youtube_channel: '',
        is_active: false,
        is_listed: false,
        campaigner_id: '',
        campaign_type: '',
        seo_title: '',
        seo_keywords: '',
        seo_description: '',
        summary: '',
        sponsored: false,
        is_featured: false,
        is_top: false
    }
    const [companyInfo, setCompanyInfo]: any = useState({});
    const menuDropdown: any = {
        'posts': "Newest",
        'top_rated_posts': "Top Rated",
        'oldest_posts': "Oldest"
    };
    const typeDropDown = {
        0: 'Message',
        1: 'Question',
        3: 'Off Topic Message',
        4: 'Press Release',
        5: 'Industry Bulletin',
        6: 'Corporate Update',
        7: 'Interview',
        8: 'Q&A',
        9: 'CEO Q&A',
        10: 'Media',
        11: 'Event'
    }
    const searchParams: any = useSearchParams()
    const [type, setType] = useState(0)
    const [selectedVideoFile, setSelectedVideoFile]: any = useState(null);
    const [categories, setCategories]: any = useState([]);
    const [selectedImageFile, setSelectedImageFile]: any = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [data, setData] = useState(initialData)

    // const location=useLocation()
    // const {name} = location?.state
    // console.log(name);

    useEffect(() => {
        let tab: any = searchParams.get('tab');
        if (tab) {
            setTabActive(parseInt(tab));
        };
        companyDetails(params.id);
        // fetchData(params.id)

    }, [])

    // const fetchData = async (id: any) => {
    //     const response = await CompanyData(id)
    //     console.log(response.data);

    // }
    const { currentUser, loggedIn } = useSelector((state: any) => {
        return {
            currentUser: state.auth.currentUser,
            loggedIn: state.auth.loggedIn
        };
    });
    const companyDetails = async (id: any) => {
        try {
            const headers = {
                'access-token': currentUser?.accessToken,
                'client': currentUser?.client,
                'uid': currentUser?.uid
            }
            setGlobalLoader(true)
            const response: any = await CompanyData(id);
            setGlobalLoader(false)
            if (response.status === 200) {
                console.log(response.data);
                if (response?.status === 200) {
                    // const {
                    //     banner_text,
                    //     company_overview,
                    //     edgar_sedar_link,
                    //     external_website,
                    //     industry_id,
                    //     logo,
                    //     outstanding_shares,
                    //     overview,
                    //     small_logo,
                    //     stock_exchange_id,
                    //     sub_banner_text,
                    //     ticker,
                    //     transfer_agent_name,
                    //     transfer_agent_url,
                    //     name,
                    //     hub_path,
                    //     stock_symbol,
                    //     secondary_stock_symbol,
                    //     secondary_ticker,
                    //     hub_type
                    // } = response.data;
                    setData(response.data)

                }
            }
        } catch (e: any) {
            console.log(e);

        }
    }


    const handleFilterChange = (val: any) => {
        setIndustry(val);
    }
    const tabs: any = [
        { id: 1, title: "Profile" },
        // { id: 2, title: "BroadCasts" },
        // { id: 3, title: "Executive Addresses" },
        { id: 4, title: "Messages" },
        { id: 5, title: "Management" },
        { id: 6, title: "Authorities" },

    ]
    const [tabActive, setTabActive] = useState<number>(tabs[0].id);
    const handleClickTab = (item: number) => {
        if (item === tabActive) {
            return;
        }
        setTabActive(item);
    };
    const checkHubType=(id:any)=>{
        return id=="0"? 'IR Hub':
        id=="1"? 'Marketing Hub':
        id=="2"? 'Free Hub':
        id=="3"? 'Moderate Hub':
        id=="4"? 'Special Hub':''
    }

    return (

        <div className='w-full bg-white dark:bg-neutral-900  grid grid-flow-row gap-2 py-3 px-3'>
            {globalLoader ?
                <div className='flex items-center justify-center py-3'>
                    <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                </div>
                :<div className="grid grid-flow-row gap-2">
                <Heading desc={""} className="text-defaultBlue-100 m-4">{data?.name}</Heading>
                <div className="grid grid-cols-2 gap2">

                    <div className="flex flex-col gap-1 px-4">
                        <div className="flex flex-row gap-3">
                            <h1>Company Name:</h1>
                            <h1>{data?.name}</h1>
                        </div>
                        <div className="flex flex-row gap-3">
                            <h1>Hub Type:</h1>
                            <h1>{checkHubType(data?.hub_type)}</h1>
                        </div>
                        <div className="flex flex-row gap-3">
                            <h1>Hub Page:</h1>
                            <h1>{data?.hub_type}</h1>
                        </div>
                    </div>
                </div>
                <div className="mt-6 px-4">
                    <div className="flex-none lg:flex gap-6">
                        <div className="grow">
                            <div className="flex-none lg:flex justify-between mb-7">
                                <Nav
                                    className="sm:space-x-2 rtl:space-x-reverse"
                                    containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base"
                                >
                                    {tabs.map((item: any, index: number) => (
                                        <NavItem
                                            className='px-4 py-3 text-sm'
                                            key={item.id}
                                            isActive={tabActive === item.id}
                                            onClick={() => handleClickTab(item.id)}
                                        >
                                            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-1">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                                    </svg> */}
                                            {item.title}
                                        </NavItem>
                                    ))}
                                </Nav>

                            </div>

                            <div className=" mb-4 px-0 lg:px-4">
                                {
                                    tabActive == 1 ?
                                        <ProfilePage data={data} setData={setData} /> :
                                        // tabActive == 2 ?
                                        //     <BroadCasts /> :
                                        // tabActive == 3 ?
                                        //     <ExecutiveMessage /> :
                                            tabActive == 4 ?
                                                <MessagePage /> :
                                                tabActive == 5 ?
                                                    <ManagementPage /> :
                                                    tabActive == 6 ?
                                                        <AuthorityPage /> :
                                                        <></>
                                }
                            </div>



                        </div>

                    </div>

                </div>
            </div>}
        </div>
    )
}

export default EditPage