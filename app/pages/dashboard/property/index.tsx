'use client'
import React, { useState } from 'react';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import Image from 'next/image';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import PropertyModel from './model';

type Property = {
  id: string;
  title: string;
  price: string;
  location: string;
  images: string[];
  services: string[];
  description: string;
  agentid: string;
};

const properties: Property[] = [
  {
    "id": "1a2b3c4d5e6f7g8h9i0j",
    "title": "Luxury Penthouse",
    "price": "1,200,000",
    "location": "Los Angeles, USA",
    "images": [
      "/upload/672373273dbf3b23c86e1c50-home4.jpg",
      "/upload/672a349be4f0ed3390e25ae9-home1.jpg"
    ],
    "services": [
      "3 Bathrooms",
      "4 Bedrooms",
      "Private Pool",
      "Rooftop Access"
    ],
    "description": "A luxurious penthouse with a stunning view of the city.",
    "agentid": "agent123"
  },
  {
    "id": "1a2b3c4d5e6f7g8h9i1k",
    "title": "Modern Family House",
    "price": "650,000",
    "location": "Dallas, USA",
    "images": [
      "/upload/672372bce178cb23c871777a-home4.jpg"
    ],
    "services": [
      "3 Bathrooms",
      "5 Bedrooms",
      "Garage",
      "Backyard"
    ],
    "description": "Perfect for families, located in a quiet neighborhood.",
    "agentid": "agent124"
  },
  {
    "id": "672b9ad87a18d7397cb9f6ce",
    "title": "Beach House",
    "price": "980000",
    "location": "Malibu, USA",
    "images": [
      "/upload/672b9ad87a18d7397cb9f6cd-home1.jpg"
    ],
    "services": [
      "3 Bathrooms",
      "3 room"
    ],
    "description": "Enjoy the ocean breeze from your private deck.",
    "agentid": "123"
  },
  {
    "id": "672b9b399199ba397c95327e",
    "title": "Mountain Cabin",
    "price": "350,000",
    "location": "Aspen, USA",
    "images": [
      "/upload/672b9b399199ba397c95327c-home5.jpg",
      "/upload/672b9b399199ba397c95327d-home2.jpg"
    ],
    "services": [
      "2 Bathrooms",
      "2 Bedrooms",
      "Fireplace"
    ],
    "description": "A cozy cabin nestled in the mountains.",
    "agentid": "123"
  },
  {
    "id": "672b9b759199ba397c953280",
    "title": "City Apartment",
    "price": "500,000",
    "location": "New York, USA",
    "images": [
      "/upload/672b9b759199ba397c95327f-home8.jpg"
    ],
    "services": [
      "Gym Access"
    ],
    "description": "Modern apartment in the heart of the city.",
    "agentid": "123"
  },
  {
    "id": "672b9c829199ba397c953282",
    "title": "Suburban Home",
    "price": "400,000",
    "location": "Houston, USA",
    "images": [
      "/upload/672b9c829199ba397c953281-estate.jpg"
    ],
    "services": [
      "2 Bathrooms",
      "Garden"
    ],
    "description": "Spacious home in a family-friendly suburb.",
    "agentid": "123"
  },
  {
    "id": "672b9cc19199ba397c953284",
    "title": "Historic Villa",
    "price": "1,500,000",
    "location": "Savannah, USA",
    "images": [
      "/upload/672b9cc19199ba397c953283-estate3.jpg"
    ],
    "services": [
      "6 Bedrooms",
      "4 Bathrooms"
    ],
    "description": "Historic villa with a beautiful garden and pool.",
    "agentid": "123"
  }
];

const PropertyCard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [propertyModalType, setPropertyModalType] = useState<'add' | 'edit' | ''>('');

  const openModal = (type: 'add' | 'edit') => {
    setPropertyModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="flex justify-end mr-10 w-[80%] mt-7 cursor-pointer"
        onClick={() => openModal('add')}
      >
        <AddCircleRoundedIcon className="ml-5" />
        <span className="ml-1">Add</span>
      </div>
      <div className="flex justify-center mt-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white border-2 rounded-lg p-6 text-center h-full"
              style={{ boxShadow: '0 4px 15px rgba(255, 0, 0, 0.5)' }}
            >
              {property.images[0] ? (
                <Image
                  src={property.images[0]}
                  alt={property.title}
                  width={200}
                  height={160}
                  className="w-full h-40 object-cover rounded-md"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 rounded-md" />
              )}
              <h2 className="mt-4 font-bold text-lg">{property.title}</h2>
              <h1 className="mt-2 text-2xl font-bold text-gray-800">
                ${parseFloat(property.price).toLocaleString()}
              </h1>
              <p className="mt-2 text-gray-600">{property.location}</p>
              <div className="mt-2 text-left">
                <ul className="list-disc list-inside text-gray-600 flex gap-3">
                  {property.services.slice(0, 3).map((service, idx) => (
                    <li key={idx} className="inline">
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-end">
                <button
                  className="text-red-600 hover:text-blue-600 rounded transition-transform duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => openModal('edit')}
                >
                  <EditNoteRoundedIcon style={{ fontSize: 30, marginTop: 4 }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <PropertyModel
          propertymodaltype={propertyModalType}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default PropertyCard;
