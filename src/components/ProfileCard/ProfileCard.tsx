'use client';
import React from 'react'
import Card20 from './Card20'
import SmallCap from '../Sections/SmallCap';
import Card12 from '../Card12/Card12';

function ProfileCard({ post, isPlay, setIsPlay, isRendered, renderMainVideo }: any) {


        const style = 'mt-3 text-md max-md:text-sm text-gray-600 dark:text-gray-200'

        return (

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 py-3'>
                        {post.map((value: any, index: number) => {
                                //    return <Card20 key={value.id} id={value.id} image={value.image_url} title={value.title} content={value.description} content2={value.content2}/>
                                return <Card12 key={index} post={value} isRendered={isRendered} screen="Quick-Tips" hideDiscussion={true} isVideo={true} isPlay={isPlay}
                                        setIsPlay={setIsPlay} renderMainVideo={renderMainVideo} />
                        })}
                </div>


        )
}

export default ProfileCard