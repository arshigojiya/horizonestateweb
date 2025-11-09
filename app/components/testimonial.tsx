import Image from 'next/image';
import React from 'react';

function Testimonial() {
  return (
    <div>
      <section className="block">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
          <h2 className="mx-auto mb-8 max-w-3xl text-center text-3xl font-bold md:mb-12 md:text-5xl lg:mb-16">
            What Our Homeowners Are Saying
          </h2>
          <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:mb-8">
            <div className="grid grid-cols-1 gap-6 rounded-md border border-solid border-gray-300 bg-white p-8 md:p-10">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Image
                   height={100}
                   width={100}
                    key={i}
                    src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a947e84e6cf91_Vector.svg"
                    alt="star"
                    className="mr-1 inline-block w-3.5 flex-none"
                  />
                ))}
              </div>
              <div className="text-gray-500">
                “The Downtown Apartment is fantastic! The building is modern, the staff is friendly, and I feel at home
                every time I step in. Highly recommend!”
              </div>
              <div className="flex flex-row items-start">
                <Image
                
                height={100}
                width={100}
                  src="https://randomuser.me/api/portraits/men/3.jpg"
                  alt="John Smith" 
                  className="mr-4 inline-block h-16 w-16 object-cover rounded-full"
                />
                <div className="flex flex-col items-start">
                  <h6 className="text-base font-bold">John Smith</h6>
                  <p className="text-sm text-gray-500">Homeowner, Downtown Apartment, NY</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 rounded-md border border-solid border-gray-300 bg-white p-8 md:p-10">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Image
                  
                  height={100}
                  width={100}
                    key={i}
                    src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a947e84e6cf91_Vector.svg"
                    alt="star"
                    className="mr-1 inline-block w-3.5 flex-none"
                  />
                ))}
              </div>
              <div className="text-gray-500">
                “Owning the Beach House in Miami has been a dream come true. The location is perfect, and it’s been a great
                rental property for extra income!”
              </div>
              <div className="flex flex-row items-start">
                <Image
                
                height={100}
                width={100}
                  src="https://randomuser.me/api/portraits/women/31.jpg"
                  alt="Emma Johnson"
                  className="mr-4 inline-block h-16 w-16 object-cover rounded-full"
                />
                <div className="flex flex-col items-start">
                  <h6 className="text-base font-bold">Emma Johnson</h6>
                  <p className="text-sm text-gray-500">Investor, Beach House, Miami</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 rounded-md border border-solid border-gray-300 bg-white p-8 md:p-10">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Image
                  
                  height={100}
                  width={100}
                    key={i}
                    src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a947e84e6cf91_Vector.svg"
                    alt="star"
                    className="mr-1 inline-block w-3.5 flex-none"
                  />
                ))}
              </div>
              <div className="text-gray-500">
                “We absolutely love our Countryside Villa in Texas. It’s a peaceful retreat away from the city, with all the
                modern amenities we need.”
              </div>
              <div className="flex flex-row items-start">
                <Image
                
                height={100}
                width={100}
                  src="https://randomuser.me/api/portraits/men/18.jpg"
                  alt="Liam Brown"
                  className="mr-4 inline-block h-16 w-16 object-cover rounded-full"
                />
                <div className="flex flex-col items-start">
                  <h6 className="text-base font-bold">Liam Brown</h6>
                  <p className="text-sm text-gray-500">Homeowner, Countryside Villa, TX</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Testimonial;
