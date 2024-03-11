import ButtonPrimary from '@/components/Button/ButtonPrimary';
import Card26 from '@/components/Card26/Card26'
import { getComapnyPhotos } from '@/requests/Companies';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function Photos({ userData }: any) {
    const style = 'font-semibold text-xl text-white max-md:text-md'
    const params = useParams();
    const router = useRouter();
    const [imgData, setImgData] = useState([])
    const [globalLoader, setGlobalLoader] = useState(false)

    const [pageInfo, setPageInfo] = useState({


        photo: {
            showMore: false,
            page: 1
        },
    })
    const [loading, setLoading] = useState({

        photo: false,

    })
    const fetchData = async (id: any) => {
        try {
            let payload = { page: pageInfo.photo.page };
            setGlobalLoader(true)
            const response: any = await getComapnyPhotos(id, payload);
            setGlobalLoader(false)
            setImgData(response.data)
            let page = JSON.parse(response?.headers.toJSON()?.pagy);

            // console.log(researchInfo);


            setPageInfo({


                photo: {
                    ...pageInfo.photo,
                    showMore: page.next != null ? true : false
                },
            })



        } catch (e: any) {
            console.log(e);

        }
    }
    const photoPosts = async (newType: string = '') => {
        setLoading({
            ...loading,
            photo: true
        })
        const newPage = newType ? 1 : pageInfo.photo.page + 1;
        let payload = { page: newPage };
        // const type = newType ? newType : discussion;
        let result: any = await getComapnyPhotos(userData.id, payload);
        let newData: any = [...imgData, ...result.data];;
        let page = JSON.parse(result?.headers.toJSON()?.pagy);
        let pagePayload: any = { ...pageInfo };
        pagePayload["photo"] = {
            showMore: page.next != null,
            page: newPage
        }
        setLoading({
            ...loading,
            photo: false
        })
        setPageInfo(pagePayload);
        setImgData(newData);
    }
    useEffect(() => {
        if (params.id) {
            fetchData(params.id);

        } else {
            router.back();
        }
    }, [])
    const dynamicData = [
        {
            id: 1,
            img: "",
            title: "Nick Cirella",
            created_at: Date.now(),
            content: "President and CED",
            content1: `Mr. Cirella is an extremely dedicated and insighthul entrepreneurial businessman, Mr, Cirella has been involved in the commodity business for over 30 years, 15 of which has been in the computer industry Under his guidance and vision, AIG has grown into a $233,000,000 international conglomerate with offices in Canada, the United States and Europe.`,
            content2: `His hard driving and demanding management style, coupled with his understanding and vision have enabled AIG to map out a strategic and tactical course that has positioned AIG as an industry leader in the supply of computer information technology products and brought it to the leading edge of e commerce in both the business and consumer markets. His strategy of blending the synergies of a leading supplier of computer information technology equipment with the best internet sales channel technology will ensure that. AIG not only prospers in the new Millenium but sets the new benchmark in Internet commerce.`,
            content3: `Mr. Cirella has strong community involvement, supporting numerous charitable organizations through the provision of his time and donations. His business and community achievements have been recently recognized with the investiture by the Governor General of Canada, of Mr. Cirella as a Serving Brother of St. John ('SBSJ)`

        },
        {
            id: 2,
            img: "",
            title: "Dr. Andrew Nellestyn",
            created_at: Date.now(),
            content: "Chainman",
            content1: `Dr. Nellestyn is Chairman &amp; CEO of Andel Inc. Ite has held senior executive positions in leading software engineering and sales companies that develop robust spatial enterprise asset management solutions for telecommunications and utility clients as well as productivity tools for a variety of enterprises world-wide. He has also held a number of executive positions, including CEO, president, CFO, COO, and EVP marketing and sales at companies such as Corel Corporation, Enghouse Systems Limited,
          Bull HN, Atomic Energy of Canada Limited and SSI.`,
            content2: `Dr. Nellestyn is a business leader, academic, volunteer and retred military officer. He retired from the Canadian Armed Forces in 1985, attaining rank of colonel after having served in a variety of command. staff, engineering research and development, export sales and technology development assignments
          Dr. Nellestyn serves on several boards of directors including audit committees`,
            content3: ``
        },
        {
            id: 3,
            img: "",
            title: "Dr.Lloyd Atkinson",
            created_at: Date.now(),
            content: "Board Meniber",
            content1: `Lloyd Atkinson is an independent economic and financial consultant. For nine years, until June 2003, he served as Vice Chairman, Chief Investment Officer, and Chief Strategist at Perigee Investment Counsel Inc. Prior to joining the investment management industry in 1994, Dr. Atlunson was, for 12 years, Executive Vice President and Chief Economist at the Bank of Montreal where he also served as the head
          of the bank's Investment Committee of the Pension Fund Society. Previously, he spent four years working
          for the United States government in Washington, DC. first as Senior Advisor at the Joint Economic
          Committee of the LI.S. Congress, and then as Deputy Assistant Director of the US. Congressional Budget
          Office. He has taught economics and finance at a number of American universities, including the
          University of Michigan and the University of Maryland, and has also served as a consultant to the US
          delegations at the International Monetary Fund and the World Bank. Dr. Ationson holds a Ph.D. in
          economics from The University of Michigan and an Honours Bachelor of Arts degree in economics and
          political science from the University of Windsor. He is a member of the Monetary Policy Council of the
          CD. Howe Institute and a member of the investment Operations Committee, Alberta Revenue. As well he
          is a member of the School of Business and Economics Dean's Advisory Board of Wilfrid Laurier
          University. He serves on the board of the Homewood Corporation.`,
            content2: ``,
            content3: ``
        },
        {
            id: 4,
            img: "",
            title: "Dr.Lloyd Atkinson",
            created_at: Date.now(),
            content: "Board Meniber",
            content1: `Lloyd Atkinson is an independent economic and financial consultant. For nine years, until June 2003, he served as Vice Chairman, Chief Investment Officer, and Chief Strategist at Perigee Investment Counsel Inc. Prior to joining the investment management industry in 1994, Dr. Atlunson was, for 12 years, Executive Vice President and Chief Economist at the Bank of Montreal where he also served as the head
          of the bank's Investment Committee of the Pension Fund Society. Previously, he spent four years working
          for the United States government in Washington, DC. first as Senior Advisor at the Joint Economic
          Committee of the LI.S. Congress, and then as Deputy Assistant Director of the US. Congressional Budget
          Office. He has taught economics and finance at a number of American universities, including the
          University of Michigan and the University of Maryland, and has also served as a consultant to the US
          delegations at the International Monetary Fund and the World Bank. Dr. Ationson holds a Ph.D. in
          economics from The University of Michigan and an Honours Bachelor of Arts degree in economics and
          political science from the University of Windsor. He is a member of the Monetary Policy Council of the
          CD. Howe Institute and a member of the investment Operations Committee, Alberta Revenue. As well he
          is a member of the School of Business and Economics Dean's Advisory Board of Wilfrid Laurier
          University. He serves on the board of the Homewood Corporation.`,
            content2: ``,
            content3: ``
        },
        {
            id: 5,
            img: "",
            title: "Dr.Lloyd Atkinson",
            created_at: Date.now(),
            content: "Board Meniber",
            content1: `Lloyd Atkinson is an independent economic and financial consultant. For nine years, until June 2003, he served as Vice Chairman, Chief Investment Officer, and Chief Strategist at Perigee Investment Counsel Inc. Prior to joining the investment management industry in 1994, Dr. Atlunson was, for 12 years, Executive Vice President and Chief Economist at the Bank of Montreal where he also served as the head
          of the bank's Investment Committee of the Pension Fund Society. Previously, he spent four years working
          for the United States government in Washington, DC. first as Senior Advisor at the Joint Economic
          Committee of the LI.S. Congress, and then as Deputy Assistant Director of the US. Congressional Budget
          Office. He has taught economics and finance at a number of American universities, including the
          University of Michigan and the University of Maryland, and has also served as a consultant to the US
          delegations at the International Monetary Fund and the World Bank. Dr. Ationson holds a Ph.D. in
          economics from The University of Michigan and an Honours Bachelor of Arts degree in economics and
          political science from the University of Windsor. He is a member of the Monetary Policy Council of the
          CD. Howe Institute and a member of the investment Operations Committee, Alberta Revenue. As well he
          is a member of the School of Business and Economics Dean's Advisory Board of Wilfrid Laurier
          University. He serves on the board of the Homewood Corporation.`,
            content2: ``,
            content3: ``
        }
    ]
    return (
        <div className='w-full px-3 py-3 border-t-2 border-black'>

            <div className="mt-3 bg-blue-600 py-3 px-3">
                <h1 className={style}>{userData.name} Photo Gallery</h1>
            </div>

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
                        <div className="mb-3 mt-3 w-full grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-5 py-3">
                            {
                                imgData.map((value: any, index: number) => {
                                    return <Card26 key={index} post={value} />
                                })
                            }

                        </div>
                        {pageInfo.photo.showMore ? <div className="flex mt-5 justify-center items-center">
                            <ButtonPrimary loading={loading.photo} onClick={() => photoPosts()} className=''><span className=''>Show More</span></ButtonPrimary>
                        </div> : <></>}
                    </>
            }
        </div>
    )
}

export default Photos