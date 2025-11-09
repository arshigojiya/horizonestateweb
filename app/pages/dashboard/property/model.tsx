'use client';
import React, { useEffect, useRef, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion, useAnimation } from "framer-motion";
import Image from 'next/image';

interface CardModalProps {
  propertymodaltype: string;
  onClose: () => void;
}

const CardModal: React.FC<CardModalProps> = ({ propertymodaltype, onClose }) => {
  const [serviceInputs, setServiceInputs] = useState<string[]>(['']);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const controls = useAnimation();
  const [propertydata, setPropertyData] = useState({
    title: '',
    price: '',
    location: '',
    services: [''],
    description: '',
    agentid: '123',
  });

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

  const handleAddServiceInput = () => {
    setServiceInputs([...serviceInputs, '']);
  };

  const handleRemoveServiceInput = (index: number) => {
    setServiceInputs(serviceInputs.filter((_, i) => i !== index));
    setPropertyData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newUrls = files.map((file) => URL.createObjectURL(file));

    setPreviewUrls((prev) => [...prev, ...newUrls]);
    setImageFiles((prev) => [...prev, ...files]);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = (index: number) => {
    setPreviewUrls(previewUrls.filter((_, i) => i !== index));
    setImageFiles(imageFiles.filter((_, i) => i !== index));
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newServices = [...serviceInputs];
    newServices[index] = e.target.value;
    setServiceInputs(newServices);
    setPropertyData({ ...propertydata, services: newServices });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", propertydata.title);
    formData.append("price", propertydata.price);
    formData.append("location", propertydata.location);
    formData.append("description", propertydata.description);
    formData.append("agentid", propertydata.agentid);

    propertydata.services.forEach((service) => {
      formData.append("services", service);
    });

    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch("http://localhost:3000/api/property/create", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Property created successfully:", data);
        onClose();
      } else {
        console.error("Failed to create property:", await response.json());
      }
    } catch (error) {
      console.error("An error occurred while creating the property:", error);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 overflow-scroll z-20">
      <motion.div
        className="relative w-full bg-white rounded-lg shadow-lg p-6 max-w-[45rem] h-[90%]"
        animate={controls}
        style={{
          overflowX: 'scroll',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <div className="flex justify-between">
          <h3>Property {propertymodaltype}</h3>
          <div onClick={handleClose} className='cursor-pointer'>
            <CancelIcon />
          </div>
        </div>
        <div className="mb-4 mt-6">
          <input
            type="text"
            id="title"
            value={propertydata.title}
            onChange={(e) => setPropertyData({ ...propertydata, title: e.target.value })}
            placeholder="Title"
            className="mt-1 block w-full border-2 rounded-lg py-3 px-4"
            required
          />
          <input
            type="text"
            id="price"
            value={propertydata.price}
            onChange={(e) => setPropertyData({ ...propertydata, price: e.target.value })}
            placeholder="Price"
            className="mt-1 block w-full border-2 rounded-lg py-3 px-4"
            required
          />
          <input
            type="text"
            id="description"
            value={propertydata.description}
            onChange={(e) => setPropertyData({ ...propertydata, description: e.target.value })}
            placeholder="Description"
            className="mt-1 block w-full border-2 rounded-lg py-3 px-4"
            required
          />
          <input
            type="text"
            id="location"
            value={propertydata.location}
            onChange={(e) => setPropertyData({ ...propertydata, location: e.target.value })}
            placeholder="Location"
            className="mt-1 block w-full border-2 rounded-lg py-3 px-4"
            required
          />
          {serviceInputs.map((service, index) => (
            <div className="mb-4 mt-4 flex items-center gap-3" key={index}>
              <input
                type="text"
                value={service}
                onChange={(e) => handleServiceChange(e, index)}
                placeholder="Service"
                className="block w-full border-2 rounded-lg py-3 px-4"
              />
              {index === 0 ? (
                <DataSaverOnIcon className="cursor-pointer" onClick={handleAddServiceInput} />
              ) : (
                <RemoveCircleOutlineIcon className="cursor-pointer" onClick={() => handleRemoveServiceInput(index)} />
              )}
            </div>
          ))}
          <div className="mb-4 mt-4">
            <div className="flex justify-center items-center w-full border-2 rounded-lg h-[117px]">
              <input type="file" multiple className="hidden" ref={fileInputRef} onChange={handleFileChange} />
              <label onClick={handleUpload} className="flex justify-center items-center w-full h-full cursor-pointer">
                Upload Images
              </label>
            </div>
          </div>
          {previewUrls.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mt-2">
              {previewUrls.map((url, index) => (
                <div className="relative" key={index}>
                  <Image 
                   height={100}
                   width={100} src={url} alt="Preview" className="border border-gray-300 rounded w-full h-auto" />
                  <DeleteIcon className="absolute top-0 right-0 text-red-500 cursor-pointer" onClick={() => handleRemoveImage(index)} />
                </div>
              ))}
            </div>
          )}
          <button onClick={handleSubmit} className="bg-red-500 rounded-lg p-3 text-white hover:bg-red-600">
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CardModal;
