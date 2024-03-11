import React from 'react'

function Ranks() {
    const style = 'mt-3 text-md max-md:text-sm text-gray-600 dark:text-gray-200'
    const style1 = 'mt-3 mx-3 text-md max-md:text-sm text-gray-600 dark:text-gray-200'

    return (
        <div className=''>
            <h1 className='text-xl max-md:text-md  text-dark mt-2'>
                <b>About Ranks</b>
            </h1>
            <h1 className={style}>The AGORACOM community is based upon a ranking system which rewards our most active and valuable members with increasing levels of authority to perform a multitude of administrative functions in order to create the best small cap community on the planet. AGORACOM members are classified according to the following 4
                ranks of authority:
                <div className="container mt-3">
                <ul className="list-disc mx-3 2xl:mx-0">
                    <li>President</li>
                    <li>Vice President</li>
                    <li>Treasurer</li>
                    <li>Mail Room - Everyone has to start somewhere</li>
                </ul>
            </div>
            </h1>
            
            <h1 className={style}>Each rank is associated with increasing levels of authority and administrative control within the AGORACOM community.
            </h1>
            <div className="grid mt-5 max-md:mt-3 grid-flow-col max-lg:grid-flow-row gap-20 py-4 px-4 max-lg:gap-4 ">
                
                <div className="grid grid-flow-row  gap-10 max-lg:gap-4">
                    <div className="w-full">
                        <h1 className='text-xl max-md:text-md  text-dark mt-2'>
                            <b>President (Rating: 3.3 Total Points: 1500+)</b>
                        </h1>
                        <h1 className={style1}>
                            <ol className="list-decimal">
                                <li>Ability to Edit/Upload to All Sections of the Stock Hub:
                                    <div className="container mt-3">
                                        <ul className="list-disc mx-3 2xl:mx-0">
                                            <li>Fast Facts</li>
                                            <li>Corporate Profile</li>
                                            <li>Photos</li>
                                            <li>Management Bios</li>
                                            <li>Links Library</li>
                                        </ul>
                                    </div>


                                </li>

                                <li>Support Via Private HUB</li>
                                <li>Delete Messages that Contravene AGORACOM's 6 Rules of Use</li>
                                <li>Terminate Members that Contravene AGORACOM's 6 Rules of Use</li>
                                <li>Upload President's Video</li>
                                <li>Upload Front Page Editorial (Coming Soon)</li>
                                <li>Unlimited Posting</li>
                                <li>Unlimited Member Rating </li>
                                <li>Unlimited Private Messaging</li>
                                <li>Level II Access (OTCBB only)</li>
                                <li>Post Press Releases</li>
                                <li>Unlimited Post Recommendations</li>

                            </ol>
                        </h1>
                    </div>
                    
                    <div className="w-full">
                        <h1 className='text-xl max-md:text-md  text-dark mt-2'>
                            <b>Treasurer (Total Points: 250+)</b>
                        </h1>
                        <h1 className={style1}>
                            <ol className="list-decimal">
                                <li>Ability to Edit/Upload to All Sections of the Stock Hub:
                                    <div className="container mt-3">
                                        <ul className="list-disc mx-3 2xl:mx-0">
                                            <li>Photos</li>
                                            <li>Management Bios</li>
                                            <li>Links Library</li>
                                        </ul>
                                    </div>


                                </li>
                                
                                <li>Unlimited Posting
                                </li>
                                <li>Unlimited Member Rating
                                </li>
                                <li>10 Private Messages Per Day
                                </li>
                                <li>Unlimited Report Violation
                                </li>

                            </ol>
                        </h1>
                    </div>

                </div>
                

                <div className="grid grid-flow-row w-full max-lg:grid-flow-row gap-36 max-lg:gap-4">
                <div className="w-full">
                        <h1 className='text-xl max-md:text-md  text-dark mt-2'>
                            <b>Vice President (Rating: 3.0 Total Points: 750+)</b>
                        </h1>
                        <h1 className={style1}>
                            <ol className="list-decimal">
                                <li>Ability to Edit/Upload to All Sections of the Stock Hub:
                                    <div className="container mt-3">
                                        <ul className="list-disc mx-3 2xl:mx-0">
                                            <li>Fast Facts</li>
                                            <li>Corporate Profile</li>
                                            <li>Photos</li>
                                            <li>Management Bios</li>
                                            <li>Links Library</li>
                                        </ul>
                                    </div>


                                </li>
                                <li>Delete Messages that Contravene AGORACOM's 6 Rules of Use
                                </li>
                                <li>Unlimited Posting
                                </li>
                                <li>Unlimited Member Rating
                                </li>
                                <li>Unlimited Private Messaging
                                </li>
                                <li>Level II Access (OTCBB only)
                                </li>
                                <li>Post Press Releases
                                </li>
                            </ol>
                        </h1>
                    </div>
                    <div className="w-full">
                        <h1 className='text-xl max-md:text-md  text-dark mt-2'>
                            <b>Mail Room</b>
                        </h1>
                        <h1 className={style1}>
                        <ol className="list-decimal">
                                <li>Limited Posting
                                    <div className="container mt-3">
                                        <ul className="list-disc mx-3 2xl:mx-0">
                                            <li>Unlimited Member Rating</li>
                                            <li>Unlimited Post Recommendations</li>
                                            
                                        </ul>
                                    </div>


                                </li>
                                <li>Limited Report Violation
                                    <div className="container mt-3">
                                        <ul className="list-disc mx-3 2xl:mx-0">
                                            <li>In order to Delete Messages and Terminate Members certain other criteria must be met-For security reasons, we cannot divulge those criteria</li>
                                            
                                            
                                        </ul>
                                    </div>


                                </li>
                               
                            </ol>
                        </h1>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Ranks