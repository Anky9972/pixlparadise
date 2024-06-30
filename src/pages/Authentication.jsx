import React, { useContext } from 'react'
import Login from '../components/Login'
import { Auth } from '../context/Auth'
import Signup from '../components/Signup'

function Authentication() {
    const {signin,setSignin,signup,setSignup,setAuthPage} = useContext(Auth);
    function handleClose(){
        setSignin(false);
        setSignup(false);
        setAuthPage(false);
    }
  return (
    <div className='w-full h-screen flex justify-center items-center fixed top-0 z-20 bg-slate-800 bg-opacity-40 flex-col'>
        {/* <span className='hover:cursor-pointer absolute top-14 left-[38%]' onClick={()=>{setSignin(false); setSignup(false);setAuthPage(false)}}><IoMdCloseCircle className='text-2xl text-slate-400'/></span> */}
        <div >
            {
                signin &&
                (
                    <Login handleClose={handleClose}/>
                )
            }
            {
                signup &&
                (
                    <Signup handleClose={handleClose}/>
                )
            }
        </div>
    </div>
  )
}

export default Authentication