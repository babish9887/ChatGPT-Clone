import React, { useEffect, useState } from 'react';
import { ClipboardIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface User {
  name: string;
  avatar: string;
}

interface MessageProps {
  message: {
    user: User;
    text: string;
    createdAt: { seconds: number; nanoseconds: number };
  };
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isChatGPT = message.user.name === 'ChatGPT';

  const [typingEffect, setTypingEffect] = useState('');
  const [showTypingEffect, setShowTypingEffect] = useState(false);
  const [formattedText, setFormattedText] = useState('');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.text)
      .then(() => {
        toast.success('Text copied to clipboard');
      })
      .catch((error) => {
        toast.error('Error copying text to clipboard!');
      });
  };

  const formatText = () => {
    let responseArray = message.text.split('**');
    let newArray = '';
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) newArray += responseArray[i];
      else newArray += '<b>' + responseArray[i] + '</b>';
    }
    let newResponse = newArray.split('*').join('</br>');
    setFormattedText(newResponse);
    return newResponse;
  };

  useEffect(() => {
    if (isChatGPT) {
      formatText();

      const now = new Date();
      const timestamp = message.createdAt;
      const timestampDate = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);

      const timeDifferenceSeconds = Math.floor((now.getTime() - timestampDate.getTime()) / 1000);

      if (timeDifferenceSeconds < 10) {
        setShowTypingEffect(true);

        const text = formattedText;
        const typingDelay = 10; // Adjust this value for typing speed
        let currentIndex = 0;

        const typingInterval = setInterval(() => {
          if (currentIndex <= text.length) {
            setTypingEffect(text.substring(0, currentIndex));
            currentIndex++;
          } else {
            clearInterval(typingInterval);
          }
        }, typingDelay);

        return () => clearInterval(typingInterval);
      } else {
        setShowTypingEffect(false);
      }
    }
  }, [isChatGPT, formattedText, message.createdAt]);

  return (
    <div className="py-5 text-white">
      <div className={`flex space-x-5 px-5 max-w-2xl mx-auto items-center ${isChatGPT ? "p-0" : "flex-row-reverse"}`}>
        <img src={message.user.avatar} alt='' className={`h-8 w-8 rounded-full ${message.user.name==="ChatGPT"?"":"ml-3"} `} />
        <span className={`${!isChatGPT ? "bg-[#2f2f2f] p-3 rounded-full" : ""}`}>
          {/* {isChatGPT ? (showTypingEffect ? typingEffect : <span dangerouslySetInnerHTML={{ __html: formattedText }} />) : message.text} */}
          {/* {message.text} */}
          {isChatGPT ? <span dangerouslySetInnerHTML={{ __html: formattedText }} />:message.text}
        </span>
      </div>
      {isChatGPT && (
        <div className='flex items-center justify-center gap-2 mt-3'>
          <ClipboardIcon className='w-4 hover:cursor-pointer' onClick={copyToClipboard} />
        </div>
      )}
    </div>
  );
}

export default Message;
