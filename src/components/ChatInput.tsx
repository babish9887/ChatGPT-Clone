"use client";
import {
  ArrowUpIcon,
} from "@heroicons/react/24/solid";
import { addDoc, collection, query, serverTimestamp, orderBy } from "firebase/firestore";

import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { db } from "../../firebase";
import toast from "react-hot-toast";
import axios from "axios";
import { useCollection } from "react-firebase-hooks/firestore";
// import admin from 'firebase-admin'


function ChatInput({ id }: { id: string }) {
  const [prompt, setPrompt] = useState('');
  const { data: session } = useSession();
  let notification = "";

  //usesWR to get model

  const model = "text-davinci-003";

  const divStyle="group w-auto border border-gray-500/40 rounded-2xl flex justify-between items-center hover:bg-gray-600/20 px-5 h-[70px] hover:cursor-pointer"

  const arrowStyle="w-6 h-6  bg-black rounded-md p-1 hidden group-hover:block hover:cursor-pointer"

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;
    const input = prompt.trim();
    setPrompt("");
    try {
      const message: Message = {
        text: input,
      //   createdAt: serverTimestamp(),
      createdAt:new Date(),
        user: {
          _id: session?.user?.email,
          name: session?.user?.name,
          avatar:
            session?.user?.image ||
            `https://ui-avatars-com/api/?name=${session?.user?.name}`,
        },
      };
      await addDoc(
        collection(db, "users", session?.user?.email, "chats", id, "messages"),
        message
      );

      notification = toast.loading("ChatGPT is thinking....");


      const res = await axios.post(`http://localhost:3000/api/askQuestion`, {
        prompt: input,
        id,
        model,
        session,
      });
      if (res.data.status) {
        toast.success("ChatGPT has responded", { id: notification });
      }
    } catch (e: any) {
      toast.error(e.message, { id: notification });
    }
  };

  const handleQueryClick=async (query:string)=>{
      setPrompt(query)
      if (!query) return;
      const input = query.trim();
      setPrompt("");
      try {
        const message: Message = {
          text: input,
      //     createdAt: admin.firestore.Timestamp.now(),
      createdAt:new Date(),

          user: {
            _id: session?.user?.email,
            name: session?.user?.name,
            avatar:
              session?.user?.image ||
              `https://ui-avatars-com/api/?name=${session?.user?.name}`,
          },
        };
        await addDoc(
          collection(db, "users", session?.user?.email, "chats", id, "messages"),
          message
        );
  
        notification = toast.loading("ChatGPT is thinking....");
  
  
        const res = await axios.post(`http://localhost:3000/api/askQuestion`, {
          prompt: input,
          id,
          model,
          session,
        });
        if (res.data.status) {
          toast.success("ChatGPT has responded", { id: notification });
        }
      } catch (e: any) {
        toast.error(e.message, { id: notification });
      }
  }

  const [messages]=useCollection(session && query(
      collection(db,'users',session?.user?.email, "chats", id, 'messages' ),
      orderBy('createdAt', 'asc')
))
  return (
    <div className="flex items-center justify-center flex-col  sm:w-full px-5">
      {messages?.empty &&(

      <div className="w-full h-auto grid grid-cols-1 sm:grid-cols-2 grid-rows-2 gap-4 relative lg:max-w-[40rem]">

        <div className={`${divStyle} hidden sm:block`} onClick={()=>handleQueryClick("Plan a trip to see the best of New York in 3 days")}>
          <div>
            <h2>Plan a trip</h2>
            <p className="text-gray-400 text-sm">to see the best of New York in 3 days</p>
          </div>
          <ArrowUpIcon className={arrowStyle} />
        </div>

        <div className={`${divStyle} hidden sm:block`} onClick={()=>handleQueryClick("Write an email to request a quote from local plumbers")}>
          <div>
            <h2>Write an email</h2>
            <p className="text-gray-400 text-sm">to request a quote from local plumbers</p>
          </div>
          <ArrowUpIcon className={arrowStyle} />
        </div>

        <div className={divStyle} onClick={()=>handleQueryClick("Write a SQL query to add a 'status' column to an 'orders' table")}>
          <div>
            <h2>Write a SQL query</h2>
            <p className="text-gray-400 text-sm">to adds a "status" column to an "orders" table</p>
          </div>
          <ArrowUpIcon className={arrowStyle} />
        </div>

        <div className={divStyle} onClick={()=>handleQueryClick("Explain nostalgia to a kindergartener")}>
          <div>
            <h2>Explain nostalgia</h2>
            <p className="text-gray-400 text-sm">to a kindergartener</p>
          </div>
          <ArrowUpIcon className={arrowStyle} />
        </div>
      </div>
      )}


      <div className="bg-[#212121] text-gray-400 rounded-lg text-sm flex justify-center items-centerj w-full">
        <form
          onSubmit={sendMessage}
          className="p-5 space-x-5 flex w-full lg:max-w-[45rem] sm:w-full"
        >
          <input
            className="bg-transparent flex-1 border border-slate-400/40 p-3 rounded-lg  focus:outline-none disabled:cursor-not-allowed disabled:text-gray-300"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            type="text"
            placeholder="Message ChatGPT..."
          />
          <button
            disabled={!prompt || !session}
            type="submit"
            className="border border-slate-400/40 p-3 rounded-lg hover:bg-slate-400/50 hover:text-slate-700 disabled:cursor-not-allowed "
          >
            <ArrowUpIcon className="h-4 w-4" />
          </button>
        </form>

        <div></div>
      </div>
      <p className="text-[0.8rem] text-gray-400">ChatGPT can make mistakes. Consider checking important information.</p>
    </div>
  );
}

export default ChatInput;
