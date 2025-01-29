import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
        
        <div className='text-center text-2xl pt-10 text-gray-500'>
          <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
        </div>

        <div className='my-10 flex flex-col md:flex-row gap-12'>
          <img className='w-full md:max-w-[360px] ' src={assets.about_image} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
            <p>Welcome To Prescripto, Your Trusted Partner In Managing Your Healthcare Needs Conveniently And Effciently, 
              At Prescripto, We Understand The Challenges Individuals Face When It Comes To Scheduling Doctor
              Appointments And Managing Their Health Records.</p>
            <p>Prescripto Is Committed To Excellence In Healthcare Technology. We Continuously Strive TO Enhance Our
              Platform, Integrating The Latest Advancements To Improve user Experience And Deliver Superior Service.
              Whether You're Booking Your First Appointment Or Manoging Ongoing Care. Prescripto Is Here To Support You
              Every Step Of The Way.</p>
            <p className='text-gray-900'>Our Vision</p>
            <p>Our Vision At Is To Create A Seamless Healthcare Experience For Every User. We Aim To Bridge The
                Gap Between Patients And Healthcare Providers, Making It Easier For You To Access The Care You Need, When
                You Need It.</p>
          </div>
        </div>

        <div className='text-xl my-4'>
          <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span> </p>
        </div>

        <div className='flex flex-col md:flex-row mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py flex flex-col gap-5 text-[15px'>
            <b>EFFICIENCY:</b>
            <p>Streamlined Appointment Scheduling That Fits into Your Busy Lifestyle. </p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py flex flex-col gap-5 text-[15px'>
          <b>CONVENIENCE:</b>
          <p>Access To a Network of Trusted Healthcare Professions In your Area</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py flex flex-col gap-5 text-[15px'>
          <b>PERSONALIZATION:</b>
          <p>Tailored Recommendation and Reminder to HELP you stay on top of your Health.</p>
          </div>
        </div>

    </div>
  )
}

export default About