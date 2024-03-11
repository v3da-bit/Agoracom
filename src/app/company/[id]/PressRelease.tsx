
import page from '@/app/services/page';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import Card24 from '@/components/Card24/Card24';
import Card25 from '@/components/Card25/Card25';
import { getPressRelease } from '@/requests/Companies';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const PressRelease = ({ userData }: any) => {
    const [pressRelease, setPressRelease] = useState([])
    const params = useParams();
    const router = useRouter();
    const [globalLoader, setGlobalLoader] = useState(false)
    
    const [pageInfo, setPageInfo] = useState({

        pressReleases: {
            showMore: false,
            page: 1
        },
    })
    const [loading, setLoading] = useState({

        press: false,

    })
    const fetchData = async (id: any) => {
        try {
            let payload = { page: pageInfo.pressReleases.page };
            setGlobalLoader(true)
            const response: any = await getPressRelease(id, payload);
            setGlobalLoader(false)
            if (response.status === 200) {

                setPressRelease(response.data)
                let page = JSON.parse(response?.headers.toJSON()?.pagy);

                setPageInfo({
                    pressReleases: {
                        ...pageInfo.pressReleases,
                        showMore: page.next != null ? true : false
                    },
                })
            }

        } catch (e: any) {
            console.log(e);
        }
    }
    const pressPosts = async (newType: string = '') => {
        setLoading({
            ...loading,
            press: true
        })
        const newPage = newType ? 1 : pageInfo.pressReleases.page + 1;
        let payload = { page: newPage };
        // const type = newType ? newType : discussion;
        let result: any = await getPressRelease(userData.id, payload);
        let newData: any = [...pressRelease, ...result.data];;
        let page = JSON.parse(result?.headers.toJSON()?.pagy);
        let pagePayload: any = { ...pageInfo };
        pagePayload["pressReleases"] = {
            showMore: page.next != null,
            page: newPage
        }
        setLoading({
            ...loading,
            press: false
        })
        setPageInfo(pagePayload);
        setPressRelease(newData);
    }
    useEffect(() => {
        if (params.id) {
            fetchData(params.id);

        } else {
            router.back();
        }
    }, [])

    const data = [
        {
            title: "Empower Clinics Inc. - Planned Corporate Updates",
            subTitle: "Empower Clinics Inc",
            content: "We have been receving a number of messgaes in the past few days, so rather than attempting to respond to each message, I can offer the following.",
            href: "",
            company: "BSM Technologies",
            date: Date.now(),
            author: "vedant khamar",
            created_at: "1 january 2021",
            featuredImage: "",
            avatar_url: "",
            username: "vedant"
        },
        {
            title: "Empower Clinics Inc. - Planned Corporate Updates",
            subTitle: "Empower Clinics Inc",
            content: "We have been receving a number of messgaes in the past few days, so rather than attempting to respond to each message, I can offer the following.",
            href: "",
            company: "BSM Technologies",
            date: Date.now(),
            author: "vedant khamar",
            created_at: "1 january 2021",
            featuredImage: "",
            avatar_url: "",
            username: "vedant"
        },
        {
            title: "Empower Clinics Inc. - Planned Corporate Updates",
            subTitle: "Empower Clinics Inc",
            content: "We have been receving a number of messgaes in the past few days, so rather than attempting to respond to each message, I can offer the following.",
            href: "",
            company: "BSM Technologies",
            date: Date.now(),
            author: "vedant khamar",
            created_at: "1 january 2021",
            featuredImage: "",
            avatar_url: "",
            username: "vedant"
        },

        {
            title: "hello world ",
            subTitle: "hello world2",
            content: "hello world3",
            company: "BSM Technologies",
            href: "",
            date: Date.now(),
            author: "vedant khamar",
            created_at: "1 january 2001",
            featuredImage: "",
            avatar_url: "",
            username: "vedant"
        }
    ]
    return (
        <div className='w-full px-3 py-3 border-t-2 border-black'>
            <div className=" mb-4 mt-4 w-full flex flex-col gap-3 py-3  justify-center">
                <h1 className="text-lg lg:text-2xl text-dark font-bold">Press Release</h1>
                {
                globalLoader ?
                    <div className='flex items-center justify-center py-10'>
                        <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>
                    :
                <div className="mt-4 flex relative flex-col gap-4">
                    {pressRelease?.map((post: any, index: number) => {
                        post.href = '/';
                        return (
                            <Card25
                                key={index}
                                data={post}
                            />
                        )
                        // }
                    })}

                    {pageInfo.pressReleases.showMore ? <div className="flex mt-5 justify-center items-center">
                        <ButtonPrimary loading={loading.press} onClick={() => pressPosts()} className=''><span className=''>Show More</span></ButtonPrimary>
                    </div> : <></>}
                </div>
}
            </div>
        </div>
    )
}

export default PressRelease