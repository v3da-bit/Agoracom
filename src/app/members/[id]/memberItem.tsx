import ButtonPrimary from "@/components/Button/ButtonPrimary";
import { followMember, unfollowMember } from "@/requests/Home";
import { PlusIcon } from "@heroicons/react/24/solid";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReactStars from "react-rating-stars-component";

function MemberItem({ item, getUrl, style1, loggedIn }: any) {

    const router = useRouter();
    const [follow, setFollow] = useState(item.followed);
    const [followLoader, setFollowLoader] = useState(false);
    const favouriteFollow = async () => {
        if (loggedIn) {
            try {
                if (follow) {
                    setFollowLoader(true);
                    const response = await unfollowMember(item.id)
                    setFollowLoader(false);
                    if (response.status == 200) {
                        setFollow(false)
                    }
                } else {
                    setFollowLoader(true);
                    const response = await followMember(item.id)
                    setFollowLoader(false);
                    if (response.status == 201) {
                        setFollow(true)
                    }
                }



            } catch (e: any) {
                console.log(e);
            }
        } else {
            router.push('/auth/login')

        }
    }

    return (
        <div className='w-full  h-fit px-6 py-8 border-gray-200 border rounded-xl bg-white dark:bg-neutral-900 dark:border-gray-800'>
            <div className=" flex flex-row gap-3">
                <div className="w-1/3 h-full  flex justify-center">
                    <Image
                        src={getUrl(item.avatar)}
                        alt="GFG logo served with static path of public directory"
                        height="100"
                        width="100"
                        className='h-20 w-20 rounded-[50%]  object-cover'
                    />
                </div>
                <div className="w-2/3 flex flex-col items-left justify-center">
                    <h1 className=" text-xl max-md:text-lg text-dark"><b>{item.username}</b></h1>
                    {/* <h1 className=" text-lg max-md:text-sm  text-dark"><b>{item.authority_group_name}</b></h1> */}
                    <div className={`font-medium px-3 mt-1 py-1 bg-white w-fit !bg-secondary-100 border-0 text-secondary-500 rounded-full`}>
                        <div className="text-xs font-normal leading-none !w-fit flex-initial font-semibold">{item.authority_group_name}</div>
                    </div>

                </div>
            </div>
            <div className='mt-3 grid grid-cols-3 gap-3 '>
                <div className="text-center">
                    <h1 className={style1}>Last posted</h1>
                    <h1 className={style1}>
                        {
                            item.last_posted ?
                                moment(item.last_posted).format('MM/DD/YYYY') :
                                'N.A'
                        }
                    </h1>
                </div>
                <div className=" text-center">
                    <h1 className={style1}>Rating</h1>
                    <h1 className={style1 + ' star-parent-center'}>
                        <ReactStars
                            count={5}
                            // onChange={ratingChanged}
                            value={parseFloat(item.rating || 0)}
                            edit={false}
                            size={24}
                            activeColor="#ffd700"
                        /></h1>

                </div>
                <div className="text-center">
                    <h1 className={style1}>Messages</h1>
                    <h1 className={style1}>{item.total_messages}</h1>

                </div>

            </div>
            <div className=" mt-6 grid grid-cols-2 max-sm:grid-cols-1 gap-3">
                <div className="flex  justify-center items-center">
                    <ButtonPrimary className='w-full' fontSize="text-sm font-semibold" sizeClass="py-2 px-3 lg:py-3 lg:px-4">Private Message</ButtonPrimary>
                </div>
                <div className="flex justify-center items-center">
                    <ButtonPrimary className='w-full' sizeClass="py-2 px-3 lg:py-3 lg:px-4" loading={followLoader} onClick={favouriteFollow} fontSize="text-sm font-semibold">{follow ? <>Followed</> : <><PlusIcon className="w-5 mr-1 h-5 font-semibold " /><span className=''> Follow</span></>}</ButtonPrimary>
                </div>
            </div>

        </div>
    )
}

export default MemberItem;