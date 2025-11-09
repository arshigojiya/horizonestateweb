'use client';
import { useEffect, useState } from 'react';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import ChecklistIcon from '@mui/icons-material/Checklist';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BounceLoader } from 'react-spinners'; // Import BounceLoader

// Property interface for typescript
interface Property {
    id: string;
    title: string;
    price: string;
    location: string;
    images: string[];
    services: string[];
    description: string;
    agentid: string;
}

const staticProperties: Property[] = [
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

const LetestProperty = () => {
    const [propertyData] = useState<Property[]>(staticProperties); // Use static data
    const [currentIndices, setCurrentIndices] = useState<number[]>([]); // State for current image indices
    const [searchQuery, setSearchQuery] = useState(''); // State for search input
    const [isOpen, setIsOpen] = useState(false); // Dropdown state for sorting
    const [selectedOption, setSelectedOption] = useState('Low to High'); // Sorting option
    const router = useRouter(); // Router hook for navigation

    // Toggle the dropdown for sorting
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Handle dropdown option click (sorting)
    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    // Image carousel logic: automatic change every 5 seconds
    useEffect(() => {
        setCurrentIndices(new Array(propertyData.length).fill(0)); // Initialize indices for image carousel
        const interval = setInterval(() => {
            setCurrentIndices((prev) =>
                prev.map((currentIndex, index) => {
                    const newIndex =
                        currentIndex === propertyData[index]?.images?.length - 1
                            ? 0
                            : currentIndex + 1;
                    return newIndex;
                })
            );
        }, 5000);

        return () => clearInterval(interval); // Clear interval on unmount
    }, [propertyData]);

    // Change to previous image in the carousel
    const handlePrev = (index: number) => {
        setCurrentIndices((prev) => {
            const newIndex =
                prev[index] === 0
                    ? propertyData[index].images.length - 1
                    : prev[index] - 1;
            const newIndices = [...prev];
            newIndices[index] = newIndex;
            return newIndices;
        });
    };

    // Change to next image in the carousel
    const handleNext = (index: number) => {
        setCurrentIndices((prev) => {
            const newIndex =
                prev[index] === propertyData[index].images.length - 1
                    ? 0
                    : prev[index] + 1;
            const newIndices = [...prev];
            newIndices[index] = newIndex;
            return newIndices;
        });
    };

    // Filter properties based on search query
    const filteredProperties = propertyData.filter((property) =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort properties based on the selected option (Low to High / High to Low)
    const sortedProperties = selectedOption === 'Low to High'
        ? filteredProperties.sort((a, b) => parseInt(a.price.replace(/,/g, '')) - parseInt(b.price.replace(/,/g, '')))
        : filteredProperties.sort((a, b) => parseInt(b.price.replace(/,/g, '')) - parseInt(a.price.replace(/,/g, '')));

        return (
            <>
                {/* Search and Filter Section */}
                <div className="flex flex-col sm:flex-row sm:justify-between items-center mx-10 mt-10 gap-6 sm:gap-0">
                    {/* Search Bar with Icon */}
                    <div className="flex items-center border p-2 rounded-lg w-full sm:w-1/3">
                        <SearchIcon className="text-gray-600 mr-2" />
                        <input
                            type="text"
                            placeholder="Search properties..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full border-none focus:ring-0"
                        />
                    </div>
    
                    {/* Dropdown for Sorting */}
                    <div className="relative sm:ml-6 mt-4 sm:mt-0 w-full sm:w-auto z-10">
                        <button
                            onClick={toggleDropdown}
                            className="bg-gray-200 text-black px-4 py-2 rounded-md flex items-center gap-2 w-full sm:w-auto"
                        >
                            Sort By: {selectedOption} <KeyboardDoubleArrowRightIcon />
                        </button>
                        {isOpen && (
                            <div className="absolute bg-white shadow-lg rounded-md mt-2 w-full sm:w-48">
                                <div
                                    onClick={() => handleOptionClick('Low to High')}
                                    className="p-2 cursor-pointer hover:bg-gray-100"
                                >
                                    Low to High
                                </div>
                                <div
                                    onClick={() => handleOptionClick('High to Low')}
                                    className="p-2 cursor-pointer hover:bg-gray-100"
                                >
                                    High to Low
                                </div>
                            </div>
                        )}
                    </div>
                </div>
    
                {/* Property List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mx-10 mt-10">
                    {sortedProperties.length === 0 ? (
                        <div className="col-span-3 flex justify-center items-center">
                            <BounceLoader color="#36d7b7" loading={true} size={60} />
                        </div>
                    ) : (
                        sortedProperties.map((data, index) => (
                            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                                <div className="relative h-72 w-full">
                                    {/* Check if the image URL is valid before rendering */}
                                    {data.images[currentIndices[index]] ? (
                                        <Image
                                            src={data.images[currentIndices[index]]}
                                            alt={`Image of ${data.title}`}
                                            layout="fill"
                                            objectFit="cover"
                                            className="w-full"
                                            loading="lazy"
                                         />
                                    ) : (
                                        // If no image URL exists, display a fallback image or empty space
                                        <Image
                                            src="/default-image.jpg"  // Use a default image
                                            alt="Fallback Image"
                                            layout="fill"
                                            objectFit="cover"
                                            className="w-full"
                                        />
                                    )}
                                </div>
    
                                <div className="p-4">
                                    <div className="flex justify-between">
                                        <h2 className="text-lg font-bold">{data.title}</h2>
                                        <div className="flex gap-3">
                                            <div onClick={() => handlePrev(index)}>
                                                <KeyboardDoubleArrowLeftIcon className="cursor-pointer" />
                                            </div>
                                            <div onClick={() => handleNext(index)}>
                                                <KeyboardDoubleArrowRightIcon className="cursor-pointer" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-start items-center">
                                        <FmdGoodIcon style={{ marginTop: 10 }} />
                                        <p className="text-gray-700 mt-2 ml-2">{data.location}</p>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <ChecklistIcon />
                                        {data.services.map((item, idx) => (
                                            <span key={idx}>
                                                {item}
                                                {idx < data.services.length - 1 ? ' | ' : ''}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center mt-4">
                                        <span className="text-xl font-semibold text-green-600">
                                            ${data.price}
                                        </span>
                                        <button
                                            onClick={() => router.push(`/pages/property/details/${data.id}`)}
                                            className="px-4 py-2 bg-red-600 hover:bg-blue-600 text-white rounded transition-transform duration-300 ease-in-out transform hover:scale-105"
                                        >
                                            Explore
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </>
        );
};

export default LetestProperty;
