import Image from 'next/image';
import React from 'react';

function page() {
  return (
    <div className="text-gray-600 dark:text-gray-300 pt-8 dark:bg-gray-900" id="reviews">

      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
        <div className="mb-10 space-y-4 px-6 md:px-0">
          <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white md:text-4xl">
            Our Happy Homeowners.
          </h2>
        </div>

        <div className="md:columns-2 lg:columns-3 gap-8 space-y-8">
          {[
            {
              name: "John Smith",
              image: "https://randomuser.me/api/portraits/men/1.jpg",
              location: "Downtown Apartment, NY",
              role: "Homeowner",
              testimonial: "This apartment has exceeded our expectations in every way. The views are incredible, and the neighborhood is full of life.",
            },
            {
              name: "Emma Johnson",
              image: "https://randomuser.me/api/portraits/women/14.jpg",
              location: "Beach House, Miami",
              role: "Investor",
              testimonial: "The beach house investment has been perfect for us. We get to enjoy the property and rent it out seasonally. Highly recommend!",
            },
            {
              name: "Liam Brown",
              image: "https://randomuser.me/api/portraits/men/18.jpg",
              location: "Luxury Condo, LA",
              role: "Homeowner",
              testimonial: "Modern and elegant – the condo matches our style perfectly. Everything we need is within walking distance. Couldn’t be happier!",
            },
            {
              name: "Sophia Wilson",
              image: "https://randomuser.me/api/portraits/women/11.jpg",
              location: "Countryside Villa, TX",
              role: "Homeowner",
              testimonial: "Our family loves the peaceful villa. It's like living in a resort with all the amenities you could ask for.",
            },
            {
              name: "Lucas Davis",
              image: "https://randomuser.me/api/portraits/men/32.jpg",
              location: "Mountain Retreat, CO",
              role: "Vacation Renter",
              testimonial: "An incredible retreat! The mountain views and cozy interiors made this the perfect getaway spot for our family.",
            },
            {
              name: "Olivia Martinez",
              image: "https://randomuser.me/api/portraits/women/13.jpg",
              location: "Suburban Home, CA",
              role: "Homeowner",
              testimonial: "The neighborhood is friendly and safe, with top-rated schools nearby. This home was the perfect choice for us.",
            },
          ].map((review, index) => (
            <div
              key={index}
              className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none"
            >
              <div className="flex gap-4">
                <Image
                  className="w-12 h-12 rounded-full"
                  src={review.image}
                  alt={`${review.name} avatar`}
                  
                  height={200}
                  width={200}
                  loading="lazy"
                />
                <div>
                  <h6 className="text-lg font-medium text-gray-700 dark:text-white">{review.name}</h6>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{review.location}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{review.role}</p>
                </div>
              </div>
              <p className="mt-8">{review.testimonial}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
