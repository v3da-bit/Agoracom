import React from 'react'

function RulesPage() {
  const style = 'text-md max-md:text-sm text-gray-600 dark:text-gray-200'
  return (
    <div className="flex">
      <div className='grid grid-flow-row'>
        <div className=' w-screen h-auto bg-secondary-6000 grid grid-flow-col max-lg:p-4'>

          <div className='py-8 lg:py-16 max-lg:w-full container '>
            <div className="w-full lg:w-1/2">
              <h1 className=' text-3xl text-white lg:text-5xl '>
                <b>Six Rules of use</b>
              </h1>
              <br />
              <h1 className='text-lg max-md:text-sm  text-white'>
                Participation on the AGORACOM website, which includes, but is not limited to, blogs, discussion forums, stock hubs, "private messaging system, and any other electronic medium used for communication with others on AGORACOM, is a privilege and not a right. As such, all the aforementioned communication features are governed by the AGORACOM Six Rules of Use. Though we have used a lighter side in getting our point across, contravention of any of the following, on any of the aforementioned mediums, will lead to automatic termination of your AGORACOM membership.
              </h1>
            </div>

          </div>


        </div>
        <div className="container py-12 lg:py-20 ">
          <div className='grid grid-flow-row  gap-2 max-md:gap-1'>
            <h1 className='text-lg max-md:text-sm  text-dark'>To ansure your continued participation on ACORACOM, please follow than i simple rulent</h1>
            <h1 className='mt-5 text-2xl max-md:text-lg  text-dark'><b>1. PROFANITY</b></h1>
            <h1 className={style}>Sevening or use of foul language is strictly prohibited in any language (We have 42 interpreters on stuff to keep an eye on those international member). For the record, #$% or any cortination thereof is considered profanity</h1>

            <h1 className='mt-5 text-2xl max-md:text-lg  text-dark'><b>2. DEROGATORY COMMENTS TOWARDS OTHERS</b></h1>
            <h1 className={style}>Calling another member an idiot, clown, stupid, dumb moron or for brains is strictly prohibited</h1>
            <h1 className='mt-5 text-2xl max-md:text-lg  text-dark'><b>3. OFF-TOPIC OR IRRELEVANT COMMENTS</b></h1>
            <h1 className={style}>Yep, nobody can believe what Donald Trump said today, or that Monica Lewinsky is more believable than Hillary, at the Dallas Cowboys keep crushing then fanu (seriously though it hurts). However, the main forums and not the place to discuss TV shows, politics or sports. OK maybe a little soorts. Please use the Off-Topic Forums</h1>
            <h1 className='mt-5 text-2xl max-md:text-lg  text-dark'><b>4. SPAMMING OR CLAIMS OF INSIDER INFORMATION</b></h1>
            <h1 className={style}>No, your browser is all you need. While we are on the topic, we always recommend updating your browser to get the most out of any website you wat</h1>

            <h1 className='mt-5 text-2xl max-md:text-lg  text-dark'><b>5. BASHING OR HYPING</b></h1>
            <h1 className={style}>Unsubstantiated claims of grandeur or impending door are best leht to Nostradamus as they will cost you some valuable points towards your rating. Also included in this category is repention of the same question: fact or opinion over and over after a response has been invadat or if there is currently no ascertainable answer</h1>
            <h1 className='mt-5 text-2xl max-md:text-lg  text-dark'><b>6. Caps lock and use of!!!!!</b></h1>
            <h1 className={style}>NOTHING AND WE MEAN NOTHING IS MORE AGGRAVATING AND ANNOYING THAN REACHING A POST THAT LOOKS LIKE THIS! YOU HAVE SOMETHING TO SAY IT DOESN'T BECOME ANYMORE NOTICEABLE WHEN YOU TYPE IT IN CAP IN FACT, MOST PEOPLE TEND TO IGNORE THESE KINDS OF POSTS Exceptions will be made for those deserted on a deserted island (with a kick ass internet connection and sending out a distress signal or anyone who invested in WorldCom Enron, Tyco, Norte Webvan Pets.com or Sideware and needs to freak out every year.</h1>
            <h1 className={style}>We trust the glit of our point has been mode. Be good to your fellow members, respect their opinions and understand there will be different levels of expertise posting on these boards. Otherwise kiss our privacy statement goodbye as we hand out your address and phone number to everyone you piss off. Just kidding)</h1>
            <h1 className="text-md max-md:text-sm text-gray-600 dark:text-gray-200 mt-5">Sincerely,</h1>
            <h1 className={style}>The AGORACOM Team</h1>

          </div>
        </div>
      </div>
    </div>
  )
}

export default RulesPage