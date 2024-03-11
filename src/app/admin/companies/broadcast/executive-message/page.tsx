'use client';
import Heading from '@/components/Heading/Heading';
import Nav from '@/components/Nav/Nav';
import NavItem from '@/components/NavItem/NavItem';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function ExecutiveMessage() {
  const style = 'font-semibold text-xl text-white max-md:text-md'
  const style2 = ' font-semibold text-right text-base text-dark'
  const [industry, setIndustry] = useState('posts');
  const router = useRouter()

  const menuDropdown: any = {
    'posts': "Newest",
    'top_rated_posts': "Top Rated",
    'oldest_posts': "Oldest"
  };
  const handleFilterChange = (val: any) => {
    setIndustry(val);
  }
  const tabs: any = [
    { id: 1, title: "Profile" },
    { id: 2, title: "BroadCasts" },
    { id: 3, title: "Executive Addresses" },
    { id: 4, title: "Messages" },
    { id: 5, title: "Management" },
    { id: 6, title: "Authorities" },

  ]
  const [tabActive, setTabActive] = useState<number>(tabs[2].id);
  const handleClickTab = (item: number) => {
    if (item === tabActive) {
      return;
    }
    setTabActive(item);
  };
  return (
    <div className='w-full bg-white dark:bg-neutral-900  grid grid-flow-row gap-2 py-3 px-3'>
      <Heading desc={""} className="text-defaultBlue-100 mb-3">Company_Name</Heading>
      <div className="flex flex-col gap-3 px-4">
        <div className="flex flex-row gap-3">
          <h1>Company Name:</h1>
          <h1>Company_Name</h1>
        </div>
        <div className="flex flex-row gap-3">
          <h1>Hub Type:</h1>
          <h1>Hub_Type</h1>
        </div>
        <div className="flex flex-row gap-3">
          <h1>Hub Page:</h1>
          <h1>Hub_Page</h1>
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
                  router.push('/admin/companies/broadcast/profile') :
                  tabActive == 2 ?
                    router.push('/admin/companies/broadcast') :
                    tabActive == 3 ?
                      router.push('/admin/companies/broadcast/executive-message') :
                      tabActive == 4 ?
                        router.push('/admin/companies/broadcast/messages') :
                        tabActive == 5 ?
                          router.push('/admin/companies/broadcast/management') :
                          tabActive == 6 ?
                            router.push('/admin/companies/broadcast/authorities') :
                            <></>
              }
            </div>



          </div>

        </div>

      </div>
    </div>
  )
}

export default ExecutiveMessage