import React from 'react'

function Rating() {
    const style = 'mt-3 text-md max-md:text-sm text-gray-600 dark:text-gray-200'

    return (
        <div className='w-full'>
            <h1 className='text-xl max-md:text-md text-dark'>
                <b>About Rating</b>
            </h1>
            <h1 className={style}>A member's rating is the average rating (from 1-5) received from fellow members of the community. It is a good indicator of a member's value to the curtatunity.
            </h1>
            <h1 className='text-xl max-md:text-md text-dark mt-5'>
                <b>About Activity Points</b>
            </h1>
            <h1 className={style}>Members are credited with points related to their activity on AGORACOM Points can be earned and lost for a plethora of activities around the site. The more positive contributions you mate to the AGORACOM community, the more activity points you will earn.
            </h1>
            <h1 className='text-xl max-md:text-md text-dark mt-4'>
                <b>Why are these Important?</b>
            </h1>
            <h1 className={style}>They are important because the combination of these two metrics will determine your rank within the AGORACOM community. Your rank determines which functions you can perform within AGORACOM, which includes the ability to do things such as delete offending messages, delete offending members, update vital company information in real-time and many more cocl things.
            </h1>
        </div>
    )
}

export default Rating