import { ClipboardIcon, PencilIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function Message({ message }: { message: any }) {
  const isChatGPT = message.user.name === 'ChatGPT';

  const [typingEffect, setTypingEffect] = useState('');
  const [showTypingEffect, setShowTypingEffect] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.text)
      .then(() => {
        toast.success('Text copied to clipboard successfully');
      })
      .catch((error) => {
        toast.error('Error copying text to clipboard!');
      });
  };

  const formatText = () => {
    let responseArray = message?.text.split('**');
    let newArray = '';
    for (let i = 0; i < responseArray?.length; i++) {
      if (i === 0 || i % 2 !== 1) newArray += responseArray[i];
      else newArray += '<b>' + responseArray[i] + '</b>';
    }
    let newResponse = newArray.split('*').join('</br>');
    return newResponse;
  };

  useEffect(() => {
    if (isChatGPT) {
      const now = new Date();
      const timestamp=message.createdAt
     // Convert Firestore Timestamp to JavaScript Date object
const timestampDate = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);

// Calculate the time difference in seconds
const timeDifferenceSeconds = Math.floor((now - timestampDate) / 1000);

// Check if the timestamp is older than 60 seconds
if (timeDifferenceSeconds < 10) {
        setShowTypingEffect(true);

        const text = message.text;
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
  }, [isChatGPT, message.createdAt, message.text]);

  return (
    <div className={`py-5 text-white`}>
      <div className='flex space-x-5 px-10 max-w-2xl mx-auto'>
        <img src={message.user.avatar} alt='' className='h-8 w-8 rounded-full' />
        <p dangerouslySetInnerHTML={{ __html: showTypingEffect ? typingEffect : formatText() }} />
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
