import ButtonPrimary from '@/components/Button/ButtonPrimary';
import { getCompanyLinkLibrary, getMoreLinks } from '@/requests/Companies';
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function View({ userData }: any) {

  const style = 'font-semibold text-xl text-white max-md:text-md';
  const [webLinks, setWebLinks] = useState([]);
  const [ddWebLinks, setDDWebLinks] = useState([]);
  const [loader, setLoader] = useState(false);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    showMore: false
  })
  const [globalLoader, setGlobalLoader] = useState(false)

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    setGlobalLoader(true)
    const response = await getCompanyLinkLibrary(userData.id);
    setGlobalLoader(false)
    if (response.status === 200) {
      const { dd_web_links, web_links } = response.data;
      setWebLinks(web_links.filter((i: any, index: number) => index < 10));
      setDDWebLinks(dd_web_links);
      setPageInfo({
        ...pageInfo,
        showMore: web_links.length > 10
      })
    }
  }

  const getLinks = async () => {
    setLoader(true);
    const newPage = pageInfo.page + 1;
    const payload = {
      page: newPage
    }
    
    const response: any = await getMoreLinks(userData.id, payload);
    
    let newData: any = [...webLinks, ...response.data];
    let page = JSON.parse(response?.headers.toJSON()?.pagy);
    let pagePayload = {
      showMore: page.next != null,
      page: newPage
    }
    setLoader(false);
    setPageInfo(pagePayload);
    setWebLinks(newData);
  }

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
          <>


            <div className="mt-3 bg-secondary-500 py-3 px-5">
              <h1 className={style}>Due Dilligence</h1>
            </div>

            {
              ddWebLinks.map((item: any, index: number) => {
                return (
                  <div key={index} className='bg-white border-b-[1px] py-6 px-6'>
                    <h3 className='text-defaultBlue-100 text-xl font-bold'>{item.title}</h3>
                    <h6 className='text-neutral-6000 text-base mt-3'>{item.description}</h6>
                    <p className='text-neutral-6000 text-sm mt-3'>Posted By: <Link href='/' className='text-secondary-500'>NeelKhamar</Link> on {moment(item?.created_at).format('LLLL')}</p>
                    <p className='text-neutral-6000 text-sm'>URL: <Link href={item.url} className='text-secondary-500'>{item?.url?.split('?')[0]}</Link></p>
                  </div>
                )
              })
            }
            <div className="mt-3 bg-secondary-500 py-3 px-5">
              <h1 className={style}>{userData.name} Links</h1>
            </div>
            {
              webLinks.map((item: any, index: number) => {
                return (
                  <div key={index} className='bg-white border-b-[1px] py-6 px-6'>
                    <h3 className='text-defaultBlue-100 text-xl font-bold'>{item.title}</h3>
                    <h6 className='text-neutral-6000 text-base mt-3'>{item.description}</h6>
                    <p className='text-neutral-6000 text-sm mt-3'>Posted By: <Link href='/' className='text-secondary-500'>NeelKhamar</Link> on {moment(item?.created_at).format('LLLL')}</p>
                    <p className='text-neutral-6000 text-sm'>URL: <Link href={item.url} className='text-secondary-500'>{item?.url?.split('?')[0]}</Link></p>
                  </div>
                )
              })
            }
            {
              pageInfo.showMore ? (
                <div className="flex mt-10 justify-center items-center">
                  <ButtonPrimary loading={loader} onClick={getLinks}>Show more</ButtonPrimary>
                </div>
              ) : <></>
            }
          </>
      }
    </div>
  )
}

export default View