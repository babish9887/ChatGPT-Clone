"use client"
import { PencilSquareIcon } from '@heroicons/react/24/solid'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { db } from '../../firebase';
import Image from 'next/image';


function NewChat() {
  const {data:session}=useSession();
  const router=useRouter()

  const createNewChat = async()=>{
    const doc=await addDoc(collection(db, "users", session?.user?.email, 'chats' ),{
      userId: session?.user?.email,
      createdAt: serverTimestamp()
    });

    router.push(`/chat/${doc.id}`);

  }
  return (
    <div 
    onClick={createNewChat}
    className='sm:mb-2  border-none sm:border-gray-700 border chatRow flex items-center justify-between '>
            {/* <PlusIcon className='h-4 w-4' /> */}
            <div className='flex gap-2'>

            <div className="bg-white w-7 hidden md:flex p-[2px] rounded-full overflow-hidden">
            <Image src={'https://static.vecteezy.com/system/resources/previews/021/059/827/non_2x/chatgpt-logo-chat-gpt-icon-on-white-background-free-vector.jpg'} alt="ChatGPT logog" width={26} height={26}/>
            </div>
            <p  className='flex items-center justify-between font-semibold hidden sm:flex '>New chat </p>
            </div>
            <span ><PencilSquareIcon className='h-6 w-6 sm:h-4 sm:w-4'/></span>

    </div>
  )
}

export default NewChat