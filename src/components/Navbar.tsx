'use client'
import { ArrowRightStartOnRectangleIcon, Bars3CenterLeftIcon, ClipboardDocumentListIcon, Cog6ToothIcon } from '@heroicons/react/24/solid'
import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react'
import NewChat from './NewChat';
import SideBar from './resSidebar';

function Navbar() {
  const {data: session}=useSession();
  const [logout, setLogout]=useState(false);
  const [sidebar, setSidebar]=useState(false)
  const logoutRef = useRef(null);

  function handlelogoutbtn(e:any){
      setLogout(!logout)
    }
    

    useEffect(() => {
      function handleClickOutside(e:any) {
        if (logoutRef.current && !logoutRef.current.contains(e.target)) {
          setLogout(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
     
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [logoutRef]);
  
  const showSidebar=()=>{
      setSidebar(()=>!sidebar)

  }

  const showSidebarprop=()=>{
      setSidebar(false)
  }

  return (
<>
      <div className={`${sidebar? "block":"hidden"}`}>

      <SideBar showSidebar={showSidebarprop}/>
      </div>
      <div 
      ref={logoutRef}
      className=' border border-slate-300/50 box-border z-40 absolute w-52 h-[150px] bg-[#212121] rounded-lg top-16 right-4 flex flex-col' style={{display: logout? "block": "none"}}>
      <div className='w-full h-2/3 p-2 '>
      <button className=' flex items-center w-full h-1/2 rounded-lg hover:bg-slate-700/50 text-left' >
        <span>
          <ClipboardDocumentListIcon className='h-6 w-6 mr-3'/>
        </span>
        Customize ChatGPT
        </button>
       <button className='flex items-center w-full h-1/2 rounded-lg hover:bg-slate-700/50  text-left'>
        <span>
          <Cog6ToothIcon className='w-6 h-6 mr-3'/>
          </span>
        Settings
        </button>
      </div>
      <div className='w-full h-1/3 px-2 pb-2'>

       <button className='flex items-center w-full h-full rounded-lg  hover:bg-slate-700/50  text-left'
       onClick={()=>signOut()}>
        <span>
           <ArrowRightStartOnRectangleIcon className='w-6 h-6 mr-3' />
           </span>
           Logout
           </button>
      </div>
      </div>



    <div className='px-3 absolute w-full flex items-center justify-between h-[60px] bg-[#171717] md:hidden'>
      <Bars3CenterLeftIcon width={28} onClick={showSidebar} />
      <h1 className='font-semibold text-2xl'>ChatGPT 3.5</h1>
      
      {/* {session && (
            <div
            onClick={handlelogoutbtn}
            className=' p-1 w-[40px] flex items-center justify-start cursor-pointer rounded-lg hover:bg-slate-700/50 transition-all duration-200 ease-in-out'>
        <img src={session.user?.image} alt=''
        className='h-8 w-8 rounded-full  mr-3'/>
        <h2 className='text-xl hidden md:flex'>{session.user?.name}</h2>
        </div>
      )} */}

      <NewChat />
    </div>
</>
  )
}

export default Navbar