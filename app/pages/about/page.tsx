import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import Image from 'next/image';

export default function About() {
  return (
    <div className="bg-gray-100 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Horizon Estates</h1>
        <p className="text-lg text-gray-600">
          At Horizon Estates, we are dedicated to helping you find the perfect property with ease and confidence.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mt-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-700">
            Our mission is to revolutionize the real estate experience by providing top-quality properties, tailored
            advice, and a seamless buying or renting process to match every lifestyle and need.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-16 grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2"><AutoGraphIcon className='mb-1'/>  Integrity</h3>
          <p className="text-gray-600">
            Honesty and transparency are at the heart of all our dealings.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2"> <StarOutlineIcon className='mb-1'/> Quality</h3>
          <p className="text-gray-600">
            We only present properties that meet the highest standards.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2"><AutoAwesomeMosaicIcon className='mb-1'/>  Commitment</h3>
          <p className="text-gray-600">
            Your satisfaction is our priority every step of the way.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Image 
                   height={100}
                   width={100} className="w-24 h-24 mx-auto rounded-full mb-4" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoOINRQme20Ar7FUUSKjY-auB2mX_TnDDySw&s" alt="Team Member 1" />
            <h3 className="text-lg font-semibold text-gray-800">thor</h3>
            <p className="text-gray-600">CEO & Founder</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Image 
                   height={100}
                   width={100} className="w-24 h-24 mx-auto rounded-full mb-4" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYkylnkBKrwgQZqesNIc9vcWCa0qlCmGSn9g&s" alt="Team Member 2" />
            <h3 className="text-lg font-semibold text-gray-800">itachi uchiha</h3>
            <p className="text-gray-600">Head of Sales</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Image 
                   height={100}
                   width={100} className="w-24 h-24 mx-auto rounded-full mb-4" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSrJcjoHeOAacxrphPcBXdkyF6JfaEq4eyFw&s" alt="Team Member 3" />
            <h3 className="text-lg font-semibold text-gray-800">nagato</h3>
            <p className="text-gray-600">Lead Agent</p>
          </div>
        </div>
      </div>
    </div>
  );
}
