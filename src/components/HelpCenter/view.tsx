import React from 'react'

function View() {
    const style = 'mt-3 text-md max-md:text-sm text-gray-600 dark:text-gray-200'

    return (
        <div className=''>
            <h1 className='text-xl max-md:text-md  text-dark mt-2'>
                <b>About Your Vote</b>
            </h1>
            <h1 className={style}>Your vote is the rating you have given to a specific member. It is combined with all votes from the community to determine a member's average rating. You can change
                your vote at any given time if you feel the member has become more or less valuable to the community. Ail votes are anonymous, so be responsible with your votes as it
                will impact the quality of your community in the future. Cast your vote based on quality of information, not the buddy system. You can not vote for yourself</h1>
        </div>
    )
}

export default View