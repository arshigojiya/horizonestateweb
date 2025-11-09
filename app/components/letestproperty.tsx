'use client'
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import ChecklistIcon from '@mui/icons-material/Checklist';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import Image from 'next/image';
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

const LatestProperty: React.FC = () => {
  const properties = useMemo(() => [
    {
      title: "Luxury Penthouse",
      price: 1200000,
      location: "Los Angeles, USA",
      images: [
        "/upload/672373273dbf3b23c86e1c50-home4.jpg",
        "/upload/672a349be4f0ed3390e25ae9-home1.jpg"
      ],
      services: ["3 Bathrooms", "4 Bedrooms", "Private Pool", "Rooftop Access"]
    },
    {
      title: "Modern Family House",
      price: 650000,
      location: "Dallas, USA",
      images: [
        "/upload/672372bce178cb23c871777a-home4.jpg"
      ],
      services: ["3 Bathrooms", "5 Bedrooms", "Garage", "Backyard"]
    },
    {
      title: "Beach House",
      price: 980000,
      location: "Malibu, USA",
      images: [
        "/upload/672b9ad87a18d7397cb9f6cd-home1.jpg"
      ],
      services: ["3 Bathrooms", "3 rooms"]
    },
    {
      title: "City Apartment",
      price: 500000,
      location: "New York, USA",
      images: [
        "/upload/672b9b759199ba397c95327f-home8.jpg"
      ],
      services: ["Gym Access"]
    },
    {
      title: "Suburban Home",
      price: 400000,
      location: "Houston, USA",
      images: [
        "/upload/672b9c829199ba397c953281-estate.jpg"
      ],
      services: ["2 Bathrooms", "Garden"]
    },
    {
      title: "Historic Villa",
      price: 1500000,
      location: "Savannah, USA",
      images: [
        "/upload/672b9cc19199ba397c953283-estate3.jpg"
      ],
      services: ["6 Bedrooms", "4 Bathrooms"]
    }
  ], []);

  const [currentIndices, setCurrentIndices] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    setCurrentIndices(properties.map(() => 0));
  }, [properties]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndices((prevIndices) =>
        prevIndices.map((currentIndex, idx) => {
          const property = properties[idx];
          return property && property.images.length > 0
            ? (currentIndex + 1) % property.images.length
            : currentIndex;
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [properties]);

  const handleNextImage = (index: number) => {
    setCurrentIndices((prevIndices) => {
      const property = properties[index];
      const newIndices = [...prevIndices];
      newIndices[index] = property && property.images.length > 0
        ? (prevIndices[index] + 1) % property.images.length
        : prevIndices[index];
      return newIndices;
    });
  };

  const handlePrevImage = (index: number) => {
    setCurrentIndices((prevIndices) => {
      const property = properties[index];
      const newIndices = [...prevIndices];
      newIndices[index] = property && property.images.length > 0
        ? (prevIndices[index] - 1 + property.images.length) % property.images.length
        : prevIndices[index];
      return newIndices;
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mx-10 mt-10">
      {properties.map((property, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="relative h-72 w-full">
            <Image
              src={property.images[currentIndices[index]] || '/default.jpg'}
              alt="Property"
              layout="fill"
              objectFit="cover"
              className="w-full"
            />
          </div>
          <div className="p-4">
            <div className="flex justify-between">
              <h2 className="text-lg font-bold">{property.title}</h2>
              <div className="flex gap-3">
                <KeyboardDoubleArrowLeftIcon
                  onClick={() => handlePrevImage(index)}
                  className="cursor-pointer"
                />
                <KeyboardDoubleArrowRightIcon
                  onClick={() => handleNextImage(index)}
                  className="cursor-pointer"
                />
              </div>
            </div>
            <div className="flex items-center">
              <FmdGoodIcon style={{ color: 'blue' }} />
              <p className="text-gray-700 ml-2">{property.location}</p>
            </div>
            <div className="flex gap-2 mt-2 items-center">
              <ChecklistIcon style={{ color: 'blue' }} />
              <span className="text-gray-700">
                {property.services.join(' | ')}
              </span>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-xl font-semibold text-green-600">
                ${property.price.toLocaleString()}
              </span>
              <button
                onClick={() => router.push('/pages/property/details')}
                className="px-4 py-2 bg-red-500 hover:bg-blue-500 text-white rounded transition-transform duration-300 ease-in-out transform hover:scale-105"
              >
                Explore
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LatestProperty;
