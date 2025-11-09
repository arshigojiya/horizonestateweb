'use client'
import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from "framer-motion";
import CancelIcon from '@mui/icons-material/Cancel';

function Add({ onclose }: { onclose: () => void }) {
  const controls = useAnimation();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

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
      onclose();
    });
  };

  const handleSubmit = async () => {
    if (!name) {
      setMessage('Please enter a category name.');
      return;
    }

    try {
      const response = await fetch('/api/categories/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Category saved successfully!');
        setName(''); // Clear input field
      } else {
        setMessage(data.message || 'Error saving category');
      }
    } catch (error) {
      console.error('Error adding category:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 overflow-scroll z-20">
      <motion.div
        className="relative w-full bg-white rounded-lg shadow-lg p-6 max-w-[35rem]"
        animate={controls}
      >
        <div className="flex justify-between">
          <h3>Add Category</h3>
          <div className="cursor-pointer" onClick={handleClose}>
            <CancelIcon />
          </div>
        </div>
        <div className="mb-4 mt-4">
          <input
            type="text"
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border-2 border-[#babcbf] rounded-lg shadow-sm focus:border-[#E74D3C] focus:ring focus:ring-[#E74D3C] focus:ring-opacity-50 py-3 px-4"
            required
          />
        </div>
        {message && <p className="text-sm text-red-500 mb-4">{message}</p>}
        <div className="flex justify-end">
          <button onClick={handleSubmit} className="bg-red-500 p-2 rounded-lg text-white">
            Create
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default Add;
