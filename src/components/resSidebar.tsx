"use client"
import React, { useState, useRef, useEffect } from 'react'
import NewChat from './NewChat'
import {useCollection} from 'react-firebase-hooks/firestore'
import { signOut, useSession } from 'next-auth/react'
import {
  ArrowRightStartOnRectangleIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/outline";
import { ClipboardDocumentListIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { collection, orderBy, query } from 'firebase/firestore'
import { db } from '../../firebase'
import ChatRow from './ChatRow'


function SideBar({showSidebar}:any) {
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
  const sidebarRef=useRef(null)
    
    function handlelogoutbtn(e:any){
      setLogout(!logout)
    }
    
    
    useEffect(() => {
      function handleClickOutside(e: any) {
        if (logoutRef.current && !logoutRef.current.contains(e.target)) {
          setLogout(false);
        }
  
        if (sidebarRef.current && !sidebarRef.current.contains(e.target) && showSidebar) {
          showSidebar(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
     
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [logoutRef, showSidebar]);
  


  return (
    <div className={`p-2 flex-col w-[280px] justify-between h-screen absolute md:hidden z-30 bg-[#171717] transition-all duration-200 ease-in-out transform`}>
      <div 
      ref={logoutRef}
      className='border border-slate-300/50 box-border z-40 absolute w-11/12 h-[150px] bg-[#212121] rounded-lg bottom-16 flex flex-col' style={{display: logout? "block": "none"}}>
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
      <div className='flex-1' ref={sidebarRef}>
        {/* <NewChat /> */}
      <h2 className='h-[50px] text-2xl font-semibold text-center mt-1'>Your Chats</h2>
        <div>
          {fileterdChat?.map(id=>[
            <ChatRow key={id} id={id} />
          ])}
        </div>
      </div>

      {session && (
        <div
        onClick={handlelogoutbtn}
        className='absolute bottom-0 px-3 py-3 w-11/12 flex  items-center justify-start cursor-pointer rounded-lg hover:bg-slate-700/50 transition-all duration-200 ease-in-out'>
        <img src={session.user?.image} alt=''
        className='h-8 w-8 rounded-full  mr-3'/>
        <h2 className='text-xl'>{session.user?.name}</h2>
        </div>
      )}
      <XMarkIcon className='absolute top-0 p-2 w-12 h-12 right-0 hover:cursor-pointer hover:bg-gray-700/50 border border-gray-600/80 mr-2 mt-2 rounded-md' onClick={showSidebar}/>
    </div>
  )
}

export default SideBar