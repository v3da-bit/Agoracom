'use client';
import Image from 'next/image'
import DefaultAvatar from '@/images/default-image.jpg'
import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import { useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { getLoggedInProfileDetails, getMemberFollowedHub, getMemberFollower, getMemberLeadingHub, getMemberProfile } from '@/requests/Profile';
import Nav from '@/components/Nav/Nav';
import NavItem from '@/components/NavItem/NavItem';
import ProfileForm from './profileForm';
import OverView from './OverView';
import Inbox from './inbox/page';
import Ignore from './Ignore';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import MemberItem from '../members/[id]/memberItem';
import CompanyCard from '@/components/CompanyCard/CompanyCard';
import WidgetAuthors from '@/components/WidgetAuthors/WidgetAuthors';
// import checkAuthentication from '@/utils/checkAuthentication';

function UserProfile() {
  const style = 'mt-3 font-semibold text-lg max-md:text-md text-dark line-clamp-5'
  const style1 = 'mt-1 font-semibold text-base text-gray-600 dark:text-gray-200'
  const style2 = 'mt-1 font-semibold text-sm text-gray-600 dark:text-gray-200'
  const style5 = 'mt-3 font-semibold text-sm text-gray-600 dark:text-gray-200'
  const style6 = 'mt-3 font-semibold text-right text-sm text-dark'
  const [loading, setLoading] = useState({
    posts: false,
    members: false,
    followedHub: false,
    leadingHub: false
  })
  const router = useRouter();
  const queryParams = useSearchParams();
  const [followedHub, setFollowedHub] = useState([]);

  const [pageInfo, setPageInfo] = useState({
    posts: {
      showMore: false,
      page: 1
    },
    members: {
      showMore: false,
      page: 1
    },
    followedHub: {
      showMore: false,
      page: 1
    },
    leadingHub: {
      showMore: false,
      page: 1
    }
  })
  const { currentUser, loggedIn } = useSelector((state: any) => {
    return {
      currentUser: state.auth.currentUser,
      loggedIn: state.auth.loggedIn
    };
  });
  const loadFollowedHub = async () => {
    setLoading({
      ...loading,
      followedHub: true
    })
    const newPage = pageInfo.followedHub.page + 1;
    let payload = { page: newPage };
    let result: any = await getMemberFollowedHub(userData.id, payload);
    let newData: any = [...followedHub, ...result.data];
    let page = JSON.parse(result?.headers.toJSON()?.pagy);
    let pagePayload: any = { ...pageInfo };
    pagePayload["followedHub"] = {
      showMore: page.next != null,
      page: newPage
    }
    setLoading({
      ...loading,
      followedHub: false
    })
    setPageInfo(pagePayload);
    setFollowedHub(newData);
  }
  const getUrl = (url: any) => {
    if (url.toString().includes("s3.amazonaws.com")) {
      return url;
    } else {
      return DefaultAvatar;
    }
  }
  const tabs: any = [
    {
      id: 1,
      title: 'General'
    },
    {
      id: 2,
      title: 'Overview'
    },
    {
      id: 3,
      title: 'Inbox'
    },
    {
      id: 4,
      title: 'Ingore List'
    }
  ]

  const [tab, setTab] = useState(1);
  const [userData, setUserData]: any = useState(null);
  const [data, setData] = useState({})
  const [data1, setData1] = useState({})
  const [globalLoader, setGlobalLoader] = useState(false)
  const [members, setMembers] = useState([]);
  const [leadingHub, setLeadingHub] = useState([]);

  useEffect(() => {
    fetchData();
    const item: any = sessionStorage.getItem('private-chat');
    const parsedData = JSON.parse(item);
    if (parsedData) {
      setTab(3);
    }
    if (queryParams.get("compose")) {
      setTab(3);
    };
  }, [])

  const fetchData = async () => {
    try {
      setGlobalLoader(true)
      const response: any = await getMemberProfile(currentUser.id);

      const result: any = await getLoggedInProfileDetails(currentUser.id);
      setGlobalLoader(false)

      if (result.status == 200) {
        setData(result.data)
      }
      if (response.status === 200) {
        const { info, followed_hubs, followed_members, leading_hub } = response.data;
        setData1(response.data)
        setFollowedHub(followed_hubs.filter((i: any, index: number) => index < 6))
        setMembers(followed_members.filter((i: any, index: number) => index < 6))
        setUserData(info);
        setLeadingHub(leading_hub.filter((i: any, index: number) => index < 6));

      }
    } catch (e: any) {
      console.log(e);
    }
  }
  const loadLeadingHub = async () => {
    setLoading({
      ...loading,
      leadingHub: true
    })
    const newPage = pageInfo.leadingHub.page + 1;
    let payload = { page: newPage };
    let result: any = await getMemberLeadingHub(userData.id, payload);
    let newData: any = [...leadingHub, ...result.data];
    let page = JSON.parse(result?.headers.toJSON()?.pagy);
    let pagePayload: any = { ...pageInfo };
    pagePayload["leadingHub"] = {
      showMore: page.next != null,
      page: newPage
    }
    setLoading({
      ...loading,
      leadingHub: false
    })
    setPageInfo(pagePayload);
    setLeadingHub(newData);
  }


  const loadMembers = async () => {
    setLoading({
      ...loading,
      members: true
    })
    const newPage = pageInfo.members.page + 1;
    let payload = { page: newPage };
    let result: any = await getMemberFollower(userData.id, payload);
    let newData: any = [...members, ...result.data];
    let page = JSON.parse(result?.headers.toJSON()?.pagy);
    let pagePayload: any = { ...pageInfo };
    pagePayload["members"] = {
      showMore: page.next != null,
      page: newPage
    }
    setLoading({
      ...loading,
      members: false
    })
    setPageInfo(pagePayload);
    setMembers(newData);
  }
  const handleClickTab = (id: any) => {
    setTab(id);
  }

  return (
    <div className='container'>
      {globalLoader ?
        <div className='flex items-center justify-center py-10'>
          <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
        </div>
        :
        <div>
          <div className='block lg:flex grid-cols-2 gap-4 max-lg:grid-cols-1 py-12'>
            <div className='w-full lg:w-3/4 gap-3 px-0 lg:pl-3 lg:pr-8'>
              <div className='w-full mb-6'>
                <Nav
                  className="sm:space-x-2 rtl:space-x-reverse"
                  containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base"
                >
                  {tabs.map((item: any, index: number) => (
                    <NavItem
                      key={item.id}
                      isActive={tab === item.id}
                      onClick={() => handleClickTab(item.id)}
                    >
                      {item.title}
                    </NavItem>
                  ))}
                </Nav>
              </div>
              {
                tab == 1 ?
                  <ProfileForm data={data} /> :
                  tab == 2 ? <OverView data1={data1} /> :
                    tab == 3 ? <Inbox userId={currentUser.id} /> :
                      <Ignore userId={currentUser.id} />
              }
            </div>
            <div className='w-full grid grid-flow-row lg:w-1/4 gap-5 h-fit'>
              <div className='flex max-lg:mt-3 flex-col px-6 py-6 border-gray-300 border  rounded-xl bg-white dark:bg-neutral-900 dark:border-gray-800'>
                <div className=" flex flex-row">
                  <div className="w-full h-full flex justify-center">
                    <Image
                      src={getUrl(userData?.avatar || DefaultAvatar)}
                      alt="GFG logo served with static path of public directory"
                      className='rounded-[50%] object-cover my-4'
                      height="120"
                      width="120"
                    />
                  </div>
                  {/* <div className="w-1/2 flex items-center justify-center">
                                      <h1 className=" text-2xl max-md:text-lg  text-dark"><b>Success stories</b></h1>

                                  </div> */}
                </div>
                <div className='grid grid-flow-row gap-3 mb-4'>
                  <h1 className="text-xl font-bold text-center">{userData?.username}</h1>
                  <div className="grid grid-flow-col text-left">
                    <h1 className={style5}>City</h1>
                    <h1 className={style6}>{userData?.city}</h1>
                  </div>
                  <div className="grid grid-flow-col text-left">
                    <h1 className={style5}>Rank</h1>
                    <h1 className={style6}>{userData?.authority_group_name}</h1>
                  </div>
                  <div className="grid grid-flow-col text-left">
                    <h1 className={style5}>Activity Points</h1>
                    <h1 className={style6}>{userData?.ranking_points}</h1>
                  </div>
                  <div className="grid grid-flow-col text-left">
                    <h1 className={style5}>Rating</h1>
                    <h1 className={style6 + ' star-parent-end'}>
                      <ReactStars
                        count={5}
                        // onChange={ratingChanged}
                        value={parseFloat(userData?.rating)}
                        edit={false}
                        size={24}
                        activeColor="#ffd700"
                      /></h1>
                  </div>
                  {/* <div className="grid grid-flow-col text-left">
                    <h1 className={style5}>Your Rating</h1>
                    <h1 className={style6}><a href="/">Please Log In to Vote</a></h1>
                  </div> */}
                  <div className="grid grid-flow-col text-left">
                    <h1 className={style5}>Date Joined</h1>
                    <h1 className={style6}>{userData?.date_joined}</h1>
                  </div>
                  <div className="grid grid-flow-col text-left">
                    <h1 className={style5}>Social Links</h1>
                    <h1 className={style6}></h1>
                  </div>
                  {/* <div className="flex mt-3 justify-center items-center">
                <ButtonPrimary className='w-full' fontSize='text-sm font-semibold' sizeClass="py-3 px-4 lg:py-3 lg:px-4">Private Message</ButtonPrimary>
              </div>
              <div className="flex justify-center items-center">
                <ButtonPrimary className='w-full' fontSize='text-sm font-semibold' sizeClass="py-3 px-4 lg:py-3 lg:px-4"><PlusIcon className="w-5 mr-1 h-5 font-semibold " /><span className=''> Follow</span></ButtonPrimary>
              </div> */}

                </div>
              </div>
              {tab == 2 ?
                <div className='w-full h-fit mt-8'>
                  <WidgetAuthors
                    headingClass='bg-neutral-100'
                    className="w-full bg-white border dark:bg-neutral-800"
                    isCompany={true}
                    loader={loading.leadingHub}
                    getData={loadLeadingHub}
                    showMore={pageInfo?.leadingHub?.showMore}
                    title={"Leading Hubs"}
                    topCompanies={leadingHub}
                  />
                </div> : <></>

              }
            </div>

          </div>
          {tab == 2 ?
            <>
              {(members.length > 0 || followedHub.length > 0) ? (
                <div className='w-full mt-8 h-fit bg-[#f9f9f9] dark:bg-gray-800'>
                  <div className=" container py-16 w-full flex flex-col gap-3 justify-center">
                    {
                      members.length > 0 ? (
                        <div className='w-full h-fit mb-12'>
                          <h1 className="text-lg mb-4 lg:text-2xl text-dark font-bold">Followed Members</h1>
                          <div className="grid grid-cols-1 py-3 lg:grid-cols-3 gap-5">
                            {
                              members.map((item: any, index: number) => {
                                return (
                                  <MemberItem item={item} key={index} getUrl={getUrl} loggedIn={loggedIn} style1={style1} />
                                )
                              })
                            }
                          </div>
                          {
                            pageInfo?.members?.showMore ? (
                              <div className="flex mt-12 justify-center items-center">
                                <ButtonPrimary loading={loading.members} onClick={loadMembers}>Show more</ButtonPrimary>
                              </div>
                            ) : <></>
                          }
                        </div>
                      ) : <></>
                    }
                    {
                      followedHub.length > 0 ? (
                        <div className='w-full h-fit mb-12'>
                          <h1 className="text-lg mb-4 lg:text-2xl text-dark font-bold">Followed Hubs</h1>
                          <div className={`grid gap-5 md:gap-5 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 lg:gap-5`}>
                            {followedHub.map((post, index) => <CompanyCard key={index} post={post} loggedIn={loggedIn} />)}
                          </div>
                          {
                            pageInfo?.followedHub?.showMore ? (
                              <div className="flex mt-12 justify-center items-center">
                                <ButtonPrimary loading={loading.followedHub} onClick={loadFollowedHub}>Show more</ButtonPrimary>
                              </div>
                            ) : <></>
                          }
                        </div>
                      ) : <></>
                    }
                  </div>
                </div>
              ) : <></>}
            </> : <></>
          }
        </div>
      }
    </div>

  )
}

export default
  // checkAuthentication(
  UserProfile
// )