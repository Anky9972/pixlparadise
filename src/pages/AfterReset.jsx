import React from 'react'
import { useNavigate } from 'react-router-dom'

const AfterReset = () => {
    const navigate = useNavigate();
  return (
    <section className='w-full min-h-screen flex justify-center items-center bg-white'>
        <div className='flex flex-col justify-center items-center gap-10 lg:w-1/3 px-20'>
            <h1 className='text-5xl lg:text-6xl font-bold text-[#ff7f53]'>Password reset successfull.</h1>
            <div>
                <img src="https://res.cloudinary.com/dj0eulqd8/image/upload/v1719759994/Work_6_txhrh6.jpg" alt="reset-done"  />
            </div>
            <div>
                <button className='bg-[#f5221b] flex justify-center items-center gap-5 px-4 py-1 rounded-lg text-white' onClick={()=>navigate('/')}>
                    <img src="https://cdn.prod.website-files.com/639b3e775b326dcf7cea3e70/639b3e775b326d53d1ea3ece_go-to-top.svg" alt="arrow" className='-rotate-90'/>
                    <span className='font-bold text-xl'>Go Back</span>
                </button>

            </div>
        </div>
    </section>
  )
}

export default AfterReset