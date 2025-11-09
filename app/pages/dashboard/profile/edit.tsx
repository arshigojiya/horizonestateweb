import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from "framer-motion";
import CancelIcon from '@mui/icons-material/Cancel';
import Image from 'next/image';

function Edit({ onClose }: { onClose: () => void }) {
  const controls = useAnimation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [Profileimg, setProfileImg] = useState<string | null>(null);

  useEffect(() => {
    controls.start({
      scale: [0.5, 1.1, 1],
      rotate: [15, -5, 0],
      transition: { duration: 0.8, ease: "easeInOut" }
    });
  }, [controls]);

  const handleClose = () => {
    controls.start({
      scale: [1, 0.8, 0],
      opacity: [1, 0.5, 0],
      transition: { duration: 0.5, ease: 'easeInOut' },
    }).then(() => {
      onClose();
    });
  };

  const handleProfileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setProfileImg(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 overflow-scroll z-20">
      <motion.div
        className="relative w-full bg-white rounded-lg shadow-lg p-6 max-w-[35rem] h-[90%]"
        animate={controls}
        style={{
          overflowX: 'scroll',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <div className="flex justify-between">
          <h3>Edit Profile</h3>
          <div onClick={handleClose} className='cursor-pointer'>
            <CancelIcon />
          </div>
        </div>
        <div className="mb-4 mt-4 flex justify-center">
          <input type='file' onChange={handleProfileImg} ref={fileInputRef} className='hidden' />
          <div onClick={handleUpload} style={{ position: 'relative', height: 130, width: 130, overflow: 'hidden', borderRadius: '50%', cursor: 'pointer' }}>
            <Image
              style={{ objectFit: 'cover' }}
              className='rounded-full'
              src={Profileimg || 'https://png.pngtree.com/png-vector/20240913/ourlarge/pngtree-cartoon-user-avatar-vector-png-image_13572227.png'}
              alt="User Avatar"
              layout="fill"
            />
          </div>
        </div>
        <div className="mb-4 mt-4">
          <input
            type="text"
            id="username"
            placeholder="user name"
            className="mt-1 block w-full border-2 border-[#babcbf] rounded-lg shadow-sm focus:border-[#E74D3C] focus:ring focus:ring-[#E74D3C] focus:ring-opacity-50 py-3 px-4"
            required
          />
        </div>
        <div className="mb-4 mt-4">
          <input
            type="email"
            id="email"
            placeholder="email"
            className="mt-1 block w-full border-2 border-[#babcbf] rounded-lg shadow-sm focus:border-[#E74D3C] focus:ring focus:ring-[#E74D3C] focus:ring-opacity-50 py-3 px-4"
            required
          />
        </div>
        <div className="mb-4 mt-4">
          <input
            type="number"
            id="number"
            placeholder="phone number"
            className="mt-1 block w-full border-2 border-[#babcbf] rounded-lg shadow-sm focus:border-[#E74D3C] focus:ring focus:ring-[#E74D3C] focus:ring-opacity-50 py-3 px-4"
            required
          />
        </div>
        <div className="mb-4 mt-4">
          <input
            type="text"
            id="instagram"
            placeholder="instagram url"
            className="mt-1 block w-full border-2 border-[#babcbf] rounded-lg shadow-sm focus:border-[#E74D3C] focus:ring focus:ring-[#E74D3C] focus:ring-opacity-50 py-3 px-4"
            required
          />
        </div>
        <div className="mb-4 mt-4">
          <input
            type="text"
            id="facebookurl"
            placeholder="facebook url"
            className="mt-1 block w-full border-2 border-[#babcbf] rounded-lg shadow-sm focus:border-[#E74D3C] focus:ring focus:ring-[#E74D3C] focus:ring-opacity-50 py-3 px-4"
            required
          />
        </div>
        <div className="mb-4 mt-4">
          <input
            type="text"
            id="linkdinurl"
            placeholder="linkdin url"
            className="mt-1 block w-full border-2 border-[#babcbf] rounded-lg shadow-sm focus:border-[#E74D3C] focus:ring focus:ring-[#E74D3C] focus:ring-opacity-50 py-3 px-4"
            required
          />
        </div>
        <div className="sticky bottom-0 bg-transparent shadow-top mt-4 flex justify-end items-center z-50">
          <button className="bg-red-500 rounded-lg p-3 text-white hover:bg-red-600 transition-colors duration-200">
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default Edit;
