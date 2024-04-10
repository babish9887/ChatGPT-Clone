"use client"

import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import Message from "./Message";
import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

function Chat({id}: {
    id:string;
}) {
      const {data:session}=useSession()
      const [messages]=useCollection(session && query(
            collection(db,'users',session?.user?.email, "chats", id, 'messages' ),
            orderBy('createdAt', 'asc')
      ))
  return (
    <div className="flex-1 flex-col h-screen overflow-y-auto">

      {messages?.empty && (
            <div className=" gap-2 w-full flex items-center justify-center flex-col h-full">
            <div className="bg-white w-14 rounded-full overflow-hidden">
            <Image src={'https://static.vecteezy.com/system/resources/previews/021/059/827/non_2x/chatgpt-logo-chat-gpt-icon-on-white-background-free-vector.jpg'} alt="ChatGPT logog" width={150} height={150}/>
            </div>
            <p className=" text-center text-white text-2xl font-bold">
                  How can I help you today?
            </p>
            </div>
      )}

      {messages?.docs.map((message)=>(
            <Message key={message.id} message={message.data()} />
      ))}
    </div>
  )
}

export default Chat