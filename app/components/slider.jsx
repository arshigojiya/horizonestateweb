'use client'
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useRouter } from 'next/navigation';

export default function Slider() {
    const [isClient, setIsClient] = useState(false);
    const [animationKey, setAnimationKey] = useState(0);
    const router = useRouter();
    
    const properties = [
        {
            title: "City Apartment",
            price: 500000,
            location: "New York, USA",
            images: ["/upload/672b9b759199ba397c95327f-home8.jpg"],
            services: ["Gym Access"]
        },
        {
            title: "Suburban Home",
            price: 400000,
            location: "Houston, USA",
            images: ["/upload/672b9c829199ba397c953281-estate.jpg"],
            services: ["2 Bathrooms", "Garden"]
        },
        {
            title: "Historic Villa",
            price: 1500000,
            location: "Savannah, USA",
            images: ["/upload/672b9cc19199ba397c953283-estate3.jpg"],
            services: ["6 Bedrooms", "4 Bathrooms"]
        }
    ];

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    const handleSlideChange = () => {
        setAnimationKey((prevKey) => prevKey + 1);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
            <Swiper
                loop={true}
                pagination={{ clickable: true }}
                modules={[Pagination, Autoplay]}
                autoplay={{ delay: 3000 }}
                style={{ width: '100%', height: '100%' }}
                onSlideChange={handleSlideChange}
            >
                {properties.map((data, index) => (
                    <SwiperSlide key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                width: '90%',
                                height: '95%',
                                backgroundImage: `url(${data.images[0]})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: 8,
                                padding: '20px',
                                position: 'relative',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <div
                                style={{
                                    padding: '20px',
                                    borderRadius: '10px',
                                    textAlign: 'center',
                                    color: '#fff',
                                    maxWidth: '500px',
                                    width: '100%',
                                }}
                            >
                                <h1
                                    key={`${animationKey}-${index}`}
                                    className="fade-in"
                                    style={{
                                        fontSize: '2.5rem',
                                        marginBottom: '20px',
                                        color: '#ffffff',
                                        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
                                        fontWeight: 'bold',
                                        letterSpacing: '1px',
                                    }}
                                >
                                    {data.title}
                                </h1>
                                <p
                                    className="fade-in"
                                    style={{
                                        fontSize: '1.5rem',
                                        marginBottom: '20px',
                                        color: '#ffffff',
                                        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
                                        fontWeight: 'bold',
                                        letterSpacing: '1px',
                                        animationDelay: '0.5s',
                                    }}
                                >
                                    ${data.price.toLocaleString()}
                                </p>
                                <button
                                    onClick={() => router.push('/pages/property/details')}
                                    style={{
                                        padding: 15,
                                        fontSize: '1.3rem',
                                        backgroundColor: '#FF6347',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s ease',
                                    }}
                                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#E74D3C')}
                                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#FF6347')}
                                >
                                    Explore
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <style jsx>{`
                @keyframes fadeIn {
                    0% {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .fade-in {
                    animation: fadeIn 1s ease-in-out forwards;
                }
            `}</style>
        </div>
    );
}
