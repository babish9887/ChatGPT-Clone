import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/solid'
import { collection, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';
import { remove } from 'firebase/database';

function ChatRow({id}:{
    id: string,
}) {

    const pathname=usePathname();
    const router=useRouter()
    const {data:session}=useSession()
    const [active, setActive]=useState(false);

    useEffect(()=>{
        if(!pathname) return;
        setActive(pathname.includes(id));
    },[pathname])

    const removeChat=async()=>{
        await deleteDoc(doc(db, 'users', session?.user?.email, 'chats', id))
        router.replace('/');
    }


    const [messages] = useCollection(collection(db, 'users', session?.user?.email, 'chats', id, 'messages'));
  return (
    <Link href={`/chat/${id}`} className={`chatRow justify-center ${active? "bg-[#2f2f2f] overflow-hidden": ""} mb-1`}>
        <ChatBubbleLeftIcon className='h-5 w-5'/>
        <p className='flex-1 flex md:inline-flex truncare '>
            {messages?.docs[messages?.docs.length-1]?.data().text.substring(0, 25) || "New Chat"}
        </p>
        <TrashIcon className='h-5 w-5 text-gray-300' onClick={removeChat}/>
    </Link>
  )
}

export default ChatRow