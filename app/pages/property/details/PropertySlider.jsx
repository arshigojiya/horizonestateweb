import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ImageSlider = () => {
  const [property, setProperty] = useState({
    images: [
      '/upload/672b9b759199ba397c95327f-home8.jpg', // Static image 1
      '/upload/672b9c829199ba397c953281-estate.jpg', // Static image 2
      '/upload/672b9cc19199ba397c953283-estate3.jpg', // Static image 3
    ],
    activeIndex: 0, // Track active index for thumbnail styling
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulating an API call with static data
    setIsLoading(false);
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full h-full max-w-3xl">
      <Swiper
        loop={true}
        onSlideChange={(swiper) => {
          setProperty((prev) => ({ ...prev, activeIndex: swiper.realIndex }));
        }}
        pagination={{ clickable: true }}
        style={{ width: '90%', height: '60%' }}
      >
        {property.images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              width={1200}
              height={800}
              className="w-full h-[40%]"
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex flex-row justify-center items-center gap-2 mt-4 relative">
        <div
          className="cursor-pointer"
          onClick={() => swiperRef.current?.swiper?.slidePrev()}
        >
          <ArrowBackIosIcon />
        </div>

        <div className="flex items-center gap-3">
          {property.images.map((data, index) => (
            <div
              key={index}
              className={`cursor-pointer shadow-lg border-2 transition-transform duration-300 ${
                index === property.activeIndex
                  ? 'border-red-500 shadow-red-500/50 transform scale-110'
                  : 'border-gray-300'
              }`}
              onClick={() => swiperRef.current?.swiper?.slideToLoop(index)}
            >
              <Image
                src={data}
                alt={`Thumbnail ${index + 1}`}
                width={120}
                height={100}
                className="h-[100px] w-[120px] object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <div
          className="cursor-pointer"
          onClick={() => swiperRef.current?.swiper?.slideNext()}
        >
          <ArrowForwardIosIcon />
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
