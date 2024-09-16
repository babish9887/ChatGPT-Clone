"use client"
import React, { useState, useRef, useEffect } from 'react'
import NewChat from './NewChat'
import {useCollection} from 'react-firebase-hooks/firestore'
import { signOut, useSession } from 'next-auth/react'
import {
  ArrowRightStartOnRectangleIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/outline";
import { ClipboardDocumentListIcon } from '@heroicons/react/24/solid';
import { collection, orderBy, query } from 'firebase/firestore'
import { db } from '../../firebase'
import ChatRow from './ChatRow'


function SideBar() {
  const {data: session}=useSession();

  const [chats, loading, error]=useCollection(
    session && query(collection(db, "users", session?.user?.email,"chats"),
    orderBy('createdAt', 'asc'))
  )

  const fileterdChat:string[]=[];

  chats?.docs?.forEach((chat)=>{
    fileterdChat.push(chat.id)
  })
  const [logout, setLogout]=useState(false);

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



  return (
    <div className='p-2  sm:overflow-visible hidden flex-col h-screen relative md:flex  md:w-full'>
      <div 
      ref={logoutRef}
      className='border  border-slate-300/50 box-border z-50 absolute w-11/12 h-[150px] bg-[#212121] rounded-lg bottom-16 flex flex-col' style={{display: logout? "block": "none"}}>
      <div className='w-full h-2/3 p-2 '>
      <button className=' flex items-center px-2 w-full h-1/2 rounded-lg hover:bg-[#313131] text-left' >
        <span>
          <ClipboardDocumentListIcon className='h-6 w-6 mr-3'/>
        </span>
        Customize ChatGPT
        </button>
       <button className='flex items-center  px-2 w-full h-1/2 rounded-lg hover:bg-[#313131]  text-left'>
        <span>
          <Cog6ToothIcon className='w-6 h-6 mr-3'/>
          </span>
        Settings
        </button>
      </div>
      <div className='w-full h-1/3 px-2 pb-2'>

       <button className='flex items-center  px-2 w-full h-full rounded-lg  hover:bg-[#313131]  text-left'
       onClick={()=>signOut()}>
        <span>
           <ArrowRightStartOnRectangleIcon className='w-6 h-6 mr-3' />
           </span>
           Logout
           </button>
      </div>

      </div>
      <div className='flex-1'>
        <NewChat />

        <div>
          {fileterdChat?.map(id=>[
            <ChatRow key={id} id={id} />
          ])}
        </div>
      </div>

      {session && (
        <div
        onClick={handlelogoutbtn}
        className=' py-2 px-3 w-full flex items-center justify-start cursor-pointer rounded-lg hover:bg-[#313131] transition-all duration-200 ease-in-out'>
        <img src={session.user?.image} alt=''
        className='h-8 w-8 rounded-full  mr-3'/>
        <h2 className='text-xl hidden md:flex'>{session.user?.name}</h2>
        </div>
      )}
    </div>
  )
}

export default SideBar