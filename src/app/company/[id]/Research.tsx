import ButtonPrimary from '@/components/Button/ButtonPrimary'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import img from '@/images/Icons/avatar.png'
import { useParams, useRouter } from 'next/navigation'
import { getCompanyLinksResearch, getManagersResearch, getResearch } from '@/requests/Companies'
import moment from 'moment'
import Card25 from '@/components/Card25/Card25'
import DefaultImg from '@/images/Icons/avatar.png'



const Research = ({ userData }: any) => {
    const style = 'font-semibold text-md max-md:text-sm text-gray-600 dark:text-gray-200'
    const style1 = 'mt-5 font-semibold text-sm text-gray-600 dark:text-gray-200'

    const style2 = 'font-semibold text-sm text-gray-600 dark:text-gray-200'
    const [researchInfo, setResearchInfo]: any = useState({})
    const [managers, setManagers] = useState([])
    const [companyLinks, setlinks] = useState([])
    const [globalLoader, setGlobalLoader] = useState(false)
    const params = useParams();
    const router = useRouter();
    const [pageInfo, setPageInfo] = useState({


        managers: {
            showMore: false,
            page: 1
        },
        links: {
            showMore: false,
            page: 1
        }
    })
    const [loading, setLoading] = useState({


        managers: false,
        links: false

    })
    const fetchData = async (id: any) => {
        try {
            // let payload = { page: pageInfo.research.page };
            setGlobalLoader(true)
            const response: any = await getResearch(id);
            setGlobalLoader(false)
            const { info, links, managers } = response.data
            setResearchInfo(info)
            setManagers(managers.filter((i: any, index: number) => index < 3))
            setlinks(links.filter((i: any, index: number) => index < 3))
            // console.log(researchInfo);


            setPageInfo({

                managers: {
                    ...pageInfo.managers,
                    showMore: links.length > 3 ? true : false
                },
                links: {
                    ...pageInfo.links,
                    showMore: managers.length > 3 ? true : false
                },
            })



        } catch (e: any) {
            console.log(e);

        }
    }
    const managersPosts = async (newType: string = '') => {
        setLoading({
            ...loading,
            managers: true
        })
        const newPage = pageInfo.managers.page + 1;
        let payload = { page: newPage };
        let result: any = await getManagersResearch(userData.id, payload);
        let newData: any = [...managers, ...result.data];

        let page = JSON.parse(result?.headers.toJSON()?.pagy);

        let pagePayload: any = { ...pageInfo };
        pagePayload["managers"] = {
            showMore: page.next != null,
            page: newPage
        }
        setLoading({
            ...loading,
            managers: false
        })
        setPageInfo(pagePayload);
        setManagers(newData);
    }
    const linkPosts = async (newType: string = '') => {
        setLoading({
            ...loading,
            links: true
        })
        const newPage = pageInfo.managers.page + 1;
        let payload = { page: newPage };
        let result: any = await getCompanyLinksResearch(userData.id, payload);
        let newData: any = [...companyLinks, ...result.data];

        let page = JSON.parse(result?.headers.toJSON()?.pagy);

        let pagePayload: any = { ...pageInfo };
        pagePayload["links"] = {
            showMore: page.next != null,
            page: newPage
        }
        setLoading({
            ...loading,
            links: false
        })
        setPageInfo(pagePayload);
        setlinks(newData);
    }
    useEffect(() => {
        if (params.id) {
            fetchData(params.id);

        } else {
            router.back();
        }
    }, [])

    const getUrl = (url: any) => {
        if (url?.toString().includes("s3.amazonaws.com")) {
            return url;
        } else {
            return DefaultImg;
        }
    }
    // const dynamicData = [
    //     {
    //         id: 1,
    //         img: "",
    //         title: "Nick Cirella",
    //         created_at: Date.now(),
    //         content: "President and CED",
    //         content1: `Mr. Cirella is an extremely dedicated and insighthul entrepreneurial businessman, Mr, Cirella has been involved in the commodity business for over 30 years, 15 of which has been in the computer industry Under his guidance and vision, AIG has grown into a $233,000,000 international conglomerate with offices in Canada, the United States and Europe.`,
    //         content2: `His hard driving and demanding management style, coupled with his understanding and vision have enabled AIG to map out a strategic and tactical course that has positioned AIG as an industry leader in the supply of computer information technology products and brought it to the leading edge of e commerce in both the business and consumer markets. His strategy of blending the synergies of a leading supplier of computer information technology equipment with the best internet sales channel technology will ensure that. AIG not only prospers in the new Millenium but sets the new benchmark in Internet commerce.`,
    //         content3: `Mr. Cirella has strong community involvement, supporting numerous charitable organizations through the provision of his time and donations. His business and community achievements have been recently recognized with the investiture by the Governor General of Canada, of Mr. Cirella as a Serving Brother of St. John ('SBSJ)`

    //     },
    //     {
    //         id: 2,
    //         img: "",
    //         title: "Dr. Andrew Nellestyn",
    //         created_at: Date.now(),
    //         content: "Chainman",
    //         content1: `Dr. Nellestyn is Chairman &amp; CEO of Andel Inc. Ite has held senior executive positions in leading software engineering and sales companies that develop robust spatial enterprise asset management solutions for telecommunications and utility clients as well as productivity tools for a variety of enterprises world-wide. He has also held a number of executive positions, including CEO, president, CFO, COO, and EVP marketing and sales at companies such as Corel Corporation, Enghouse Systems Limited,
    //         Bull HN, Atomic Energy of Canada Limited and SSI.`,
    //         content2: `Dr. Nellestyn is a business leader, academic, volunteer and retred military officer. He retired from the Canadian Armed Forces in 1985, attaining rank of colonel after having served in a variety of command. staff, engineering research and development, export sales and technology development assignments
    //         Dr. Nellestyn serves on several boards of directors including audit committees`,
    //         content3: ``
    //     },
    //     {
    //         id: 3,
    //         img: "",
    //         title: "Dr.Lloyd Atkinson",
    //         created_at: Date.now(),
    //         content: "Board Meniber",
    //         content1: `Lloyd Atkinson is an independent economic and financial consultant. For nine years, until June 2003, he served as Vice Chairman, Chief Investment Officer, and Chief Strategist at Perigee Investment Counsel Inc. Prior to joining the investment management industry in 1994, Dr. Atlunson was, for 12 years, Executive Vice President and Chief Economist at the Bank of Montreal where he also served as the head
    //         of the bank's Investment Committee of the Pension Fund Society. Previously, he spent four years working
    //         for the United States government in Washington, DC. first as Senior Advisor at the Joint Economic
    //         Committee of the LI.S. Congress, and then as Deputy Assistant Director of the US. Congressional Budget
    //         Office. He has taught economics and finance at a number of American universities, including the
    //         University of Michigan and the University of Maryland, and has also served as a consultant to the US
    //         delegations at the International Monetary Fund and the World Bank. Dr. Ationson holds a Ph.D. in
    //         economics from The University of Michigan and an Honours Bachelor of Arts degree in economics and
    //         political science from the University of Windsor. He is a member of the Monetary Policy Council of the
    //         CD. Howe Institute and a member of the investment Operations Committee, Alberta Revenue. As well he
    //         is a member of the School of Business and Economics Dean's Advisory Board of Wilfrid Laurier
    //         University. He serves on the board of the Homewood Corporation.`,
    //         content2: ``,
    //         content3: ``
    //     },
    //     {
    //         id: 4,
    //         img: "",
    //         title: "Dr.Lloyd Atkinson",
    //         created_at: Date.now(),
    //         content: "Board Meniber",
    //         content1: `Lloyd Atkinson is an independent economic and financial consultant. For nine years, until June 2003, he served as Vice Chairman, Chief Investment Officer, and Chief Strategist at Perigee Investment Counsel Inc. Prior to joining the investment management industry in 1994, Dr. Atlunson was, for 12 years, Executive Vice President and Chief Economist at the Bank of Montreal where he also served as the head
    //         of the bank's Investment Committee of the Pension Fund Society. Previously, he spent four years working
    //         for the United States government in Washington, DC. first as Senior Advisor at the Joint Economic
    //         Committee of the LI.S. Congress, and then as Deputy Assistant Director of the US. Congressional Budget
    //         Office. He has taught economics and finance at a number of American universities, including the
    //         University of Michigan and the University of Maryland, and has also served as a consultant to the US
    //         delegations at the International Monetary Fund and the World Bank. Dr. Ationson holds a Ph.D. in
    //         economics from The University of Michigan and an Honours Bachelor of Arts degree in economics and
    //         political science from the University of Windsor. He is a member of the Monetary Policy Council of the
    //         CD. Howe Institute and a member of the investment Operations Committee, Alberta Revenue. As well he
    //         is a member of the School of Business and Economics Dean's Advisory Board of Wilfrid Laurier
    //         University. He serves on the board of the Homewood Corporation.`,
    //         content2: ``,
    //         content3: ``
    //     },
    //     {
    //         id: 5,
    //         img: "",
    //         title: "Dr.Lloyd Atkinson",
    //         created_at: Date.now(),
    //         content: "Board Meniber",
    //         content1: `Lloyd Atkinson is an independent economic and financial consultant. For nine years, until June 2003, he served as Vice Chairman, Chief Investment Officer, and Chief Strategist at Perigee Investment Counsel Inc. Prior to joining the investment management industry in 1994, Dr. Atlunson was, for 12 years, Executive Vice President and Chief Economist at the Bank of Montreal where he also served as the head
    //         of the bank's Investment Committee of the Pension Fund Society. Previously, he spent four years working
    //         for the United States government in Washington, DC. first as Senior Advisor at the Joint Economic
    //         Committee of the LI.S. Congress, and then as Deputy Assistant Director of the US. Congressional Budget
    //         Office. He has taught economics and finance at a number of American universities, including the
    //         University of Michigan and the University of Maryland, and has also served as a consultant to the US
    //         delegations at the International Monetary Fund and the World Bank. Dr. Ationson holds a Ph.D. in
    //         economics from The University of Michigan and an Honours Bachelor of Arts degree in economics and
    //         political science from the University of Windsor. He is a member of the Monetary Policy Council of the
    //         CD. Howe Institute and a member of the investment Operations Committee, Alberta Revenue. As well he
    //         is a member of the School of Business and Economics Dean's Advisory Board of Wilfrid Laurier
    //         University. He serves on the board of the Homewood Corporation.`,
    //         content2: ``,
    //         content3: ``
    //     }
    // ]

    return (
        <div className='w-full px-3 py-3 border-t-2 border-black'>
            {
                globalLoader ?
                    <div className='flex items-center justify-center py-10'>
                        <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>
                    :
                    <div className=" mb-4 mt-4 w-full flex flex-col gap-3 py-3  justify-center">
                        <h1 className="text-md lg:text-lg text-dark font-bold">{moment(researchInfo.updated_at).format('llll')}</h1>
                        <h1 className=" text-md lg:text-lg text-dark font-bold">{researchInfo.tidy_ticker}</h1>
                        <h1 className="text-blue-500"><a href='#'>{researchInfo.username}</a></h1>
                        <div className="flex flex-col gap-3">
                            <h1 className={style} dangerouslySetInnerHTML={{ __html: researchInfo.overview }}></h1>

                        </div>
                        {managers.length > 0 ?
                            <div className="flex flex-col gap-3">
                                <h1 className="mt-3 text-lg lg:text-2xl text-dark font-bold">Management & Directors</h1>
                                {managers.map((value: any, index: number) => {
                                    return (
                                        <div key={index} className=' w-full px-4 py-4 flex flex-row gap-3 border-gray-300 border rounded-lg bg-gray-200 dark:bg-neutral-900 dark:border-gray-800'>
                                            <div className="w-1/4 flex justify-center items-start">
                                                <Image
                                                    src={getUrl(value.logo)}
                                                    alt="GFG logo served with static path of public directory"
                                                    height="100"
                                                    width="100"
                                                />
                                            </div>
                                            <div className="w-3/4 flex flex-col gap-3">
                                                <h1 className="text-xl font-bold max-md:text-md  text-dark">{value.name}</h1>
                                                <div>
                                                    <h1 className={style}>{value.role}</h1>
                                                    <h1 className={style1}>{value.bio}</h1>
                                                   
                                                </div>
                                            </div>


                                        </div>

                                    )
                                })}
                                {pageInfo.managers.showMore ? <div className="flex mt-5 justify-center items-center">
                                    <ButtonPrimary loading={loading.managers} onClick={() => managersPosts()} className=''><span className=''>Show More</span></ButtonPrimary>
                                </div> : <></>}

                            </div>
                            : <></>}
                        {companyLinks.length > 0 ?
                            <div className="flex flex-col gap-3">
                                <h1 className="mt-3 text-lg lg:text-3xl text-dark font-bold">Company Links</h1>
                                {companyLinks?.map((post: any, index: number) => {
                                    post.href = '/';
                                    return (
                                        <Card25
                                            data={post}
                                            key={index}
                                        />
                                    )
                                    // }
                                })}
                                {pageInfo.links.showMore ? <div className="flex mt-5 justify-center items-center">
                                    <ButtonPrimary loading={loading.links} onClick={() => linkPosts()} className=''><span className=''>Show More</span></ButtonPrimary>
                                </div> : <></>}
                            </div>
                            : <></>}

                    </div>
            }
        </div>
    )
}

export default Research