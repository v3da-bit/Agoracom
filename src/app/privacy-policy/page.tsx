'use client';

import Heading from '@/components/Heading/Heading'
import React, { FC } from 'react'


const PolicyScreen: FC<any> = ({ }) => {
    return (
        <div className='relative px-3 py-12'>
            <div className='container'>
                <Heading desc={""} isCenter className="text-defaultBlue-100 mb-2">
                    Privacy Policy
                </Heading>
                <div className="mt-3 py-3">
                    <p className='text-base mt-5'>
                        In handling of your information AGORACOM follows a policy of “informed consent”. In using the varied features of this web site, you may provide information (such as name, contact information, or other registration information) to AGORACOM, service providers, or other business you contact. AGORACOM and these entities may use, and you agree that AGORACOM may use, this information and technical information about your use of this web site, or communicate separately with you. AGORACOM will not provide information to companies you have not interacted with, and we prohibit the companies that get such information from selling or redistributing it without your prior notice. AGORACOM will disclose your personal information, as described herein, that would connect your user name with your actual name if AGORACOM is compelled to by law. In our sole discretion AGORACOM reserves the right to make exceptions, whenever we believe an emergency, illegal activity or some other reasonable basis exists for notifying or providing such information to others and the appropriate authorities.
                    </p>
                    <p className='text-base mt-5'>
                        Account Information: Be aware that the identifying information specific to your use of AGORACOM, including your IP address, name, and email address will be delivered when requested by a legal subpoena. If the subpoena is for a civil matter, you will be notified immediately by email and/or a message sent to your AGORACOM account so that you may seek to prevent our delivery of this information or quash the subpoena.
                    </p>
                    <p className='text-base mt-5'>
                        Participation on the AGORACOM website, which includes, but is not limited to, blogs, discussion forums, stock hubs, "private messaging" system, portfolios and any other electronic medium used for communication or otherwise with within AGORACOM, is a privilege and not a right. As such, all the aforementioned communication features are governed by the AGORACOM Six Rules of Use and may be reviewed by AGORACOM staff, at their sole discretion, as required.
                    </p>
                    <p className='text-base mt-5'>
                        Third Party Cookies: In the course of serving advertisements to this site, our third-party advertiser may place or recognize a unique “cookie” on your browser.
                    </p>
                    <p className='text-base mt-5'>
                        By using the AGORACOM site you signify your acceptance of our Privacy Policy and Disclaimer. If you do not agree to this policy or disclaimer please do not use the site. Your continued use of the AGORACOM site following the posting of any subsequent changes to these terms will mean that you have accepted such changes.
                    </p>
                </div>
            </div>

        </div>

    )
}

export default PolicyScreen;