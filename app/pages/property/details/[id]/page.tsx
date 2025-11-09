'use client';
import React, { useEffect, useState } from 'react';
import PropertySlider from '../PropertySlider';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Image from 'next/image';
import agentimg from '../../../../../public/user.jpg';
import { useRouter, useParams } from 'next/navigation';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

interface Property {
  services?: string[];
  description?: string;
  title?: string;
  price?: number;
  location?: string;
}

function PropertyPage() {
  const [property, setProperty] = useState<Property | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // To handle loading state
  const router = useRouter();
  const { id } = useParams();

  // Static property data to use when the id is available
  const staticProperty = {
    title: "Modern Villa in Downtown",
    price: 950000,
    location: "Downtown, Los Angeles, USA",
    services: ["4 Bedrooms", "3 Bathrooms", "Private Pool", "Garden"],
    description: "A luxurious modern villa with great amenities, located in the heart of Downtown Los Angeles. This spacious home features an open-plan living area, state-of-the-art appliances, and a beautiful garden with a private pool. Perfect for families and entertaining guests.",
  };

  useEffect(() => {
    // Using static property data if id is present
    if (!id) {
      setFetchError('Property ID is missing.');
      setIsLoading(false);
      return;
    }

    // Set the static property when id is available
    setProperty(staticProperty);

    setIsLoading(false); // End loading
  }, [id]);

  // Handler for going back to the previous page
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row p-5 gap-5">
      <div>
        <button className="flex items-center text-blue-500 hover:text-blue-600" onClick={handleBack}>
          <KeyboardDoubleArrowLeftIcon />
          <span className="ml-2">Back</span>
        </button>
      </div>

      <PropertySlider />

      <div className="flex flex-col justify-between w-full md:w-1/2">
        {isLoading ? (
          <p>Loading property details...</p>
        ) : fetchError ? (
          <p className="text-red-500 mt-4">{fetchError}</p>
        ) : (
          <>
            <div>
              <h3 className="text-3xl font-bold">{property?.title}</h3>

              <div className="flex items-center mt-3">
                <AccountBalanceWalletIcon className="text-green-500" />
                <span className="ml-2 text-xl font-semibold">
                  ${property?.price?.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center mt-2">
                <AddLocationAltIcon className="text-blue-500" />
                <span className="ml-2 text-lg">{property?.location}</span>
              </div>

              <div className="mt-5">
                <h4 className="text-lg font-semibold">Features:</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {property?.services?.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <h4 className="text-lg font-semibold">Description:</h4>
                <p className="mt-2 text-gray-700 leading-relaxed">
                  {property?.description || 'No description available'}
                </p>
              </div>

              <div className="mt-5">
                <h4 className="text-lg font-semibold">Agent:</h4>
                <div className="flex items-center mt-3 gap-4">
                  <Image 
                    height={100}
                    width={100} 
                    src={agentimg} 
                    className="h-20 w-20 rounded-full" 
                    alt="Agent photo" 
                  />
                  <div>
                    <p className="font-semibold">ArshiGojiya</p>
                    <p className="text-gray-600">ArshiGojiya526@gmail.com</p>
                    <p className="text-gray-600">+91 8200376537</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="bg-red-500 p-3 rounded-lg text-white hover:bg-red-400 transition-transform w-full md:w-auto">
                  Book now
                </button>
              </div>
            </div>

            <div className="flex w-full justify-between gap-2 mt-3">
              <input
                type="text"
                id="message"
                placeholder="Send message to agent"
                className="mt-1 block w-full border-2 border-[#babcbf] rounded-lg shadow-sm focus:border-[#E74D3C] focus:ring focus:ring-[#E74D3C] focus:ring-opacity-50 py-3 px-4"
                required
              />
              <button className="bg-blue-500 p-2 rounded-lg text-white hover:bg-blue-400 transition-transform w-100 h-12 m-1">
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PropertyPage;
