import React from 'react'
import { motion } from "framer-motion";
import Image from 'next/image';

const FeatureQr = () => {
  return (

        <div className="flex items-center justify-center  h-full  p-4">

          <motion.div 
            className=" rounded-lg p-6 shadow-lg max-w-xs w-full text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* <motion.h2 
              className="text-green-500 text-2xl font-semibold mb-1" 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              SCAN AND PAY
            </motion.h2> */}
            
            {/* <motion.p 
              className="text-gray-400 text-xs mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              Scan the QR to PAY 
            </motion.p> */}
            
            <div className="relative mx-auto mb-4">
              {/* Scanner frame */}
              <div className="w-64 h-64 relative mx-auto">
                {/* Corner markers with pulse animation - FIXED positioning */}
                <motion.div 
                  className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2  rounded-tl-lg  border-white"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 rounded-tr-lg border-white"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 rounded-bl-lg border-white"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 1 }}
                />
                <motion.div 
                  className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 rounded-br-lg border-white"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 1.5 }}
                />
                
                {/* Scanning line animation */}
                <motion.div 
                  className="absolute w-56 mx-auto left-0 right-0 h-1 bg-blue-500 opacity-70 z-50"
                  initial={{ top: "10%" }}
                  animate={{ top: ["10%", "90%", "10%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Placeholder QR code area */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <div className="w-40 h-40 bg-gray-700 flex items-center justify-center">
                  <Image src="/qr.png" alt="" className='h-42 w-42 rounded-lg' width={100} height={100} />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      );

}

export default FeatureQr