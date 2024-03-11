"use client";

import ButtonCircle from "@/components/Button/ButtonCircle";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import CardAuthor from "@/components/CardAuthor/CardAuthor";
import CompanyCard from "@/components/CompanyCard/CompanyCard";
import Heading from "@/components/Heading/Heading";
import Input from "@/components/Input/Input";
import SectionGridPosts from "@/components/Sections/SectionGridPosts";
import Select from "@/components/Select/Select";
import { DEMO_POSTS } from "@/data/posts";
import { companyDetails, getMoreSponsor, getMoreUnsponsor } from "@/requests/Companies";
import { MagnifyingGlassIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Banner from "@/images/Banner/Marketplace.png";
import Image from "next/image";

export default function Companies() {
    const [filter, setFilter] = useState({
        industry: 0,
        exchange: 0,
        searchText: ""
    })
    const [loader, setLoader] = useState({
        sponsored: false,
        unsponsored: false
    });
    const [globalLoader, setGlobalLoader] = useState(false)
    const [sponsoredData, setSponsoredData] = useState([]);
    const [usedSponsored, setUsedSponsored] = useState([]);
    const [unsponsoredData, setUnsponsoredData] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        sponsored: {
            showMore: false
        },
        unsponsored: {
            showMore: false,
            offset: 12,
            page: 0
        }
    })
    const industryMenu = {
        0: "Industry",
        1: "Metals & Minerals",
        2: "Energy & Environment",
        3: "Technology & Medical",
        4: "Technology",
        5: "Bricks & Mortar",
        6: "Financial Services",
        7: "E-commerce",
        8: "Psychedelics",
        9: "Fintech",
        10: "Cannabis",
        11: "Internet of Things",
        12: "Proptech",
    };
    const exchangeMenu = {
        0: "Exchanges",
        1: "PINK",
        2: "NAZ",
        3: "TSX",
        4: "CSE"
    };

    useEffect(() => {
        getAllCompanies();
    }, []);

    const getAllCompanies = async () => {
        setGlobalLoader(true)
        const response = await companyDetails();
        setGlobalLoader(false)
        const used: any = [];
        if (response?.status === 200) {
            const { sponsored, unsponsored } = response?.data;
            let pageDetails = {
                ...pageInfo,
                sponsored: {
                    showMore: sponsored.length > 12
                },
                unsponsored: {
                    ...pageInfo.unsponsored,
                    showMore: unsponsored.length > 12
                }
            };
            sponsored.forEach((val: any, index: number) => {
                if (index < 12) {
                    used.push(val.id);
                }
            });
            setPageInfo(pageDetails);
            setUsedSponsored(used);
            setSponsoredData(sponsored.filter((item: any, indx: any) => indx < 12));
            setUnsponsoredData(unsponsored.filter((item: any, indx: any) => indx < 12));
        }
    }

    const getSponsor = async () => {
        setLoader({
            ...loader,
            sponsored: true
        })
       
        const usedData=[]
        usedData.push(usedSponsored)
        const data={
            ignore_ids:JSON.stringify(usedSponsored),
            name:filter.searchText,
            stock_exchange_id:filter.exchange,
            industry_id:filter.industry
        }
        const result: any = await getMoreSponsor(data);
        setLoader({
            ...loader,
            sponsored: false
        })
        if (result.status === 200) {
            let used: any = [...usedSponsored];
            let newData: any = [...sponsoredData, ...result.data];
            let page = JSON.parse(result?.headers.toJSON()?.pagy);
            let pagePayload: any = { ...pageInfo };
            pagePayload["sponsored"] = {
                showMore: page.next != null,
            }
            result.data.forEach((item: any) => {
                used.push(item.id);
            });
            setUsedSponsored(used);
            setSponsoredData(newData);
            setPageInfo(pagePayload);
        }
    }

    const getUnsponsor = async () => {
        setLoader({
            ...loader,
            unsponsored: true
        })
        let currentPage = pageInfo?.unsponsored?.page + 1;
        const result: any = await getMoreUnsponsor({ page: currentPage, offset: pageInfo?.unsponsored?.offset });
        if (result.status === 200) {
            let newData: any = [...unsponsoredData, ...result.data];
            let page = JSON.parse(result?.headers.toJSON()?.pagy);
            let pagePayload: any = { ...pageInfo };
            pagePayload["unsponsored"] = {
                showMore: page.next != null,
                page: currentPage,
                offset: pageInfo?.unsponsored?.offset
            }
            setUnsponsoredData(newData);
            setPageInfo(pagePayload);
        }
        setLoader({
            ...loader,
            unsponsored: false
        })
    }

    const filterChange = async(key: string, value: number) => {
        setFilter({
            ...filter,
            [key]: value
        })

        const data={
            ignore_ids:'[]',
            ...filter,
            [key]:value,
            // stock_exchange_id:filter.exchange,
            // industry_id:filter.industry,
            // name:filter.searchText
        }
        const result: any = await getMoreSponsor(data);
        if (result.status === 200) {
            let used: any = [];
            let newData: any = [...result.data];
            let page = JSON.parse(result?.headers.toJSON()?.pagy);
            let pagePayload: any = { ...pageInfo };
            pagePayload["sponsored"] = {
                showMore: page.next != null,
            }
            result.data.forEach((item: any) => {
                used.push(item.id);
            });
            setUsedSponsored(used);
            setSponsoredData(newData);
            setPageInfo(pagePayload);
        }
        

    }
    const handleSearch=async(e:any)=>{
        e.preventDefault()
        e.stopPropagation()
        const data={
            ignore_ids:"[]",
            
            stock_exchange_id:filter.exchange,
            industry_id:filter.industry,
            name:filter.searchText
        }
        const result: any = await getMoreSponsor(data);
        setLoader({
            ...loader,
            sponsored: false
        })
        if (result.status === 200) {
            let used: any = [];
            let newData: any = [ ...result.data];
            let page = JSON.parse(result?.headers.toJSON()?.pagy);
            let pagePayload: any = { ...pageInfo };
            pagePayload["sponsored"] = {
                showMore: page.next != null,
            }
            result.data.forEach((item: any) => {
                used.push(item.id);
            });
            setUsedSponsored(used);
            setSponsoredData(newData);
            setPageInfo(pagePayload);
        }
    }
    const searchChange=(key: string, e: any)=>{
        e.preventDefault()
        e.stopPropagation()
        setFilter({
            ...filter,
            [key]: e.target.value
        })
        
    }

    const POSTS = DEMO_POSTS;

    return (
        <div className="nc-PageHomeDemo4 relative">
            <div className="w-full relative container-fluid h-[70vh]">
                <Image
                    fill
                    className="relative w-full h-full object-cover"
                    src={Banner}
                    alt="Company Marketplace"
                />
            </div>
            <div className="container my-14">
                <Heading desc={""} isCenter className="mb-14">
                    Company Marketplace
                </Heading>
                {
                    globalLoader ?
                        <div className='flex items-center justify-center py-10'>
                            <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </div>
                        : <>
                            <div className="flex-none justify-between mb-5 lg:flex sm:block">
                                <div className="lg:w-fit flex-none lg:flex sm:block">
                                    <Select placeholder="Industry" selectedValue={filter.industry} setMenu={(val: number) => filterChange('industry', val)} menuDropdown={industryMenu} />
                                    <Select placeholder="Exchanges" selectedValue={filter.exchange} setMenu={(val: number) => filterChange('exchange', val)} menuDropdown={exchangeMenu} />
                                </div>
                                <div className="flex-shrink-0 lg:mb-0 grow lg:grow-0 lg:!w-[240px] sm:!w-full">
                                    <form className="relative">
                                        <Input
                                            required
                                            aria-required
                                            placeholder="Company Name"
                                            type="text"
                                            value={filter.searchText}
                                            onChange={(e:any)=>searchChange('searchText',e)}
                                            
                                            className="text-neutral-800 px-6 dark:text-neutral-200"
                                        />
                                        <ButtonCircle
                                        onClick={handleSearch}
                                            type="submit"
                                            className="absolute transform top-1/2 -translate-y-1/2 end-1 !bg-defaultGreen-100 hover:!bg-primary-500 dark:bg-neutral-300 dark:text-black"
                                        >
                                            <MagnifyingGlassIcon className="w-5 h-5" />
                                        </ButtonCircle>
                                    </form>
                                </div>

                            </div>
                            <SectionGridPosts
                                className="py-10"
                                postCardName="card9"
                                heading=""
                                subHeading=""
                                screen="Company"
                                posts={sponsoredData}
                                pageInfo={pageInfo}
                                loader={loader}
                                getData={getSponsor}
                                gridClass="sm:grid-cols-2 grid lg:grid-cols-5 xl:grid-cols-5 gap-6 lg:gap-8"
                            />
                        </>
                }
            </div>
            <hr />
            <div className="container my-14">
                <Heading desc={""} isCenter className="mb-14 mt-20">
                    Investor Controlled Hubs
                </Heading>
                {
                    globalLoader ?
                        <div className='flex items-center justify-center py-10'>
                            <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </div>
                        :
                        <>
                            <div className="grid sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8">
                                {
                                    unsponsoredData.map((val: any) => {
                                        return (
                                            <CardAuthor
                                                className="!p-3 !pl-4 pr-20 xl:p-5 dark:hover:bg-neutral-700"
                                                key={val.id}
                                                author={val}
                                                hideAddIcon={true}
                                                isMember={false}
                                                isCompany={true}
                                            />
                                        )
                                    })
                                }
                            </div>
                            {
                                pageInfo?.unsponsored?.showMore ? (
                                    <div className="flex mt-20 mb-20 justify-center items-center">
                                        <ButtonPrimary loading={loader.unsponsored} onClick={getUnsponsor}>Show more</ButtonPrimary>
                                    </div>
                                ) : <></>
                            }
                        </>
                }
            </div>
        </div>
    )
}