import React from 'react';
import { motion } from "framer-motion";

const FeatureLinks = () => {
  const chatMessages = [
    {
      id: 1,
      sender: 'user',
      message: 'Hi, where can i pay?',
      time: '11:47 pm',
      avatar: '/mani.jpg'
    },
    {
      id: 2,
      sender: 'agent',
      message: 'Hi, check the invoice here',
      time: '11:48 pm',
      avatar: '/ishita.jpeg'
    },
    {
      id: 3,
      sender: 'agent',
      message: 'https://recurx.cyx/pay/c8c705ef-2035-445c-af70-2bb85badf120',
      time: '11:49 pm',
      avatar: '/ishita.jpeg'
    },
    {
      id: 4,
      sender: 'user',
      message: 'Paid!',
      time: '11:50 pm',
      avatar: '/mani.jpg'
    },
    {
      id: 5,
      sender: 'agent',
      message: 'I see, thanks😊',
      time: '11:51 pm',
      avatar: '/ishita.jpeg'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.7 }}
      className="flex h-full justify-center items-center p-4 md:p-8"
    >
      <div className="w-full max-w-md bg-zinc-900 rounded-xl overflow-hidden shadow-l">
        {/* Chat header */}
        <div className="bg-zinc-800 px-4 py-3 flex justify-center">
          <div className="bg-zinc-700 rounded-full px-4 py-1 text-sm text-zinc-300">
            Today
          </div>
        </div>

        {/* Chat messages */}
        <div className="p-4 space-y-4">
          {chatMessages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}
            >
              {msg.sender === 'user' && (
                <div className="flex-shrink-0 mr-2">
                  <img 
                    src={msg.avatar} 
                    alt="User avatar" 
                    className="w-8 h-8 rounded-full"
                  />
                </div>
              )}
              
              <div className="max-w-xs">
                <div 
                  className={`px-4 py-2 rounded-xl text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-zinc-800 text-white rounded-tl-none' 
                      : 'bg-black text-white rounded-tr-none'
                  }`}
                >
                  {msg.message}
                  <span className="ml-2 text-xs text-zinc-500">{msg.time}</span>
                </div>
              </div>
              
              {msg.sender === 'agent' && (
                <div className="flex-shrink-0 ml-2">
                  <img 
                    src={msg.avatar} 
                    alt="Agent avatar" 
                    className="w-8 h-8 rounded-full"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureLinks;