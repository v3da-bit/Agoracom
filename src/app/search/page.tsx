'use client';

import React, { useEffect, useState } from 'react';
import Card23 from '@/components/Card23/Card23';
import Card28 from '@/components/Card28/Card28';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { getSearch } from '@/requests/Search';
import "./search.css";

function SearchPage() {

    const style = ' font-semibold text-lg max-md:text-sm text-dark'
    const style1 = ' font-semibold text-white text-xl max-md:text-sm text-dark'
    const [value, setValues] = useState('Georgia');
    const router = useRouter()
    const [companies, setCompanies] = useState([])
    const [member, setMembers] = useState([])
    const searchParams = useSearchParams()
    let params = searchParams.get('value')
    const [globalLoader, setGlobalLoader] = useState(false);
    useEffect(() => {

        if (params) {
            setValues(params);
            fetchData(params);

        } else {
            router.back()
        }
    }, [params])

    useEffect(() => {
        if (value == params) {
            const element: any = document.getElementById("gcse-searchresults-only");
            if (element) {
                element.innerHTML = '';
            }
            const windows: any = window;
            const cx = "73e607a2a5eeb4d79";
            const gcse = document.createElement("script");
            gcse.type = "text/javascript";
            gcse.async = true;
            gcse.src = `https://cse.google.com/cse.js?cx=${cx}`;
            const s: any = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(gcse, s);
            var renderSearchForms = function () {
                if (document.readyState === "complete") {
                    windows.google.search.cse.element.render({
                        div: "gcse-searchresults-only",
                        tag: "search",
                        gname: "gsearch",
                    });
                    const element = windows.google.search.cse.element.getElement("gsearch");
                    element.execute(value);
                } else {
                    windows.google.setOnLoadCallback(function () {
                        windows.google.search.cse.element.render({
                            div: "gcse-searchresults-only",
                            tag: "search",
                            gname: "gsearch",
                        });
                        const element = windows.google.search.cse.element.getElement("gsearch");
                        element.execute(value);
                    }, true);
                }
            };

            windows.__gcse = {
                parsetags: "explicit",
                callback: renderSearchForms,
            };
            console.log(element)
        }
    }, [value]);


    const fetchData = async (value: any) => {
        try {
            setGlobalLoader(true);
            const response: any = await getSearch(value);
            setGlobalLoader(false);
            if (response.status === 200) {

                const { companies, members } = response.data
                setCompanies(companies)
                setMembers(members)


            }
        } catch (e: any) {
            console.log(e);
        }
    }



    return (
        <div className='container grid grid-flow-row gap-3 py-12'>
            <div className="bg-secondary-500 text-start px-4 py-3">
                <h1 className={style1}>Search</h1>
            </div>
            {globalLoader ?
                <div className='flex items-center justify-center mb-14 mt-6'>
                    <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                </div>
                : <>
                    {
                        companies.length > 0 ? (
                            <div className="grid grid-flow-row gap-4 mt-5">

                                <div className=" text-start pb-3">
                                    <h1 className={style}>Companies</h1>
                                </div>
                                <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5 !-mt-2">
                                    {companies.map((value: any) => {
                                        return (
                                            <Card23
                                                className="p-4 xl:px-5 xl:py-6 bg-white hover:bg-neutral-200 dark:hover:bg-neutral-700"
                                                key={value.id}
                                                post={value}
                                                bigImage={true}
                                                avatar={value.avatar_url ? value.avatar_url : value.small_logo_url}
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                        ) : <></>
                    }
                    {
                        member.length > 0 ? (
                            <div className={`grid grid-flow-row gap-4 ${companies.length === 0 ? 'mt-5' : 'mt-12'}`}>
                                <div className=" text-start pb-3">
                                    <h1 className={style}>Members</h1>
                                </div>
                                <div className="grid grid-cols-4 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5 !-mt-2">
                                    {member.map((value: any) => {
                                        return (
                                            <Card28
                                                className="p-4 xl:px-5 xl:py-6 !bg-white hover:bg-neutral-200 dark:hover:bg-neutral-700"
                                                key={value.id}
                                                post={value}

                                            />
                                        )
                                    })}
                                </div>
                            </div>
                        ) : <></>
                    }
                </>
            }

            <div className="grid grid-flow-row gap-4 mt-12">

                <div className=" text-start pb-3">
                    <h1 className={style}>Keyword Search</h1>
                </div>

                <div id="search-container" className="w-full h-fit !-mt-2">
                    <div id="gcse-searchresults-only"></div>
                </div>

            </div>
        </div>
    )
}

export default SearchPage