import React from 'react';
import CallIcon from '@mui/icons-material/Call';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import Image from 'next/image';
import Aboutimg from '../../public/property/about.jpg';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MovingIcon from '@mui/icons-material/Moving';
import GppGoodIcon from '@mui/icons-material/GppGood';

function About() {
  return (
    <>
      <div className='flex flex-col lg:flex-row p-10  rounded-lg mt-6'>
        <div className='lg:w-[60%] flex flex-col justify-center p-5'>
          <h3 className='text-3xl font-bold mb-4'>About Our Estate Properties</h3>
          <p className='text-lg mb-6'>
            We offer the finest selection of properties in prime locations, designed to meet your highest standards. Our team of experienced professionals is here to help you find the perfect home or investment property.
          </p>
          <div className='flex space-x-4 text-gray-600 gap-3'>
            <GpsFixedIcon style={{ color: '#ff5722', cursor: 'pointer' }} />
            <CallIcon style={{ color: '#ff5722', cursor: 'pointer' }} />
            <MarkEmailUnreadIcon style={{ color: '#ff5722', cursor: 'pointer' }} />
          </div>
        </div>
        <div className='lg:w-[40%] flex justify-center items-center'>
          <Image height={700} width={700} src={Aboutimg} alt='About our estate properties' className='' />
        </div>
      </div>

      <div className=' p-5'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='flex items-center p-4 bg-white rounded-lg'>
            <span className='text-[#ff5722]  mr-4'>
              <AttachMoneyIcon style={{ fontSize: 50 }} />
            </span>
            <div>
              <h6 className='font-bold text-lg text-gray-800'>Best Interest Rates</h6>
              <p className='text-gray-600'>
                We offer the lowest interest rates in the market, making homeownership affordable.
              </p>
            </div>
          </div>

          <div className='flex items-center p-4 bg-white  rounded-lg'>
            <span className='text-[#ff5722] mr-4'>
              <MovingIcon style={{ fontSize: 50 }} />
            </span>
            <div>
              <h6 className='font-bold text-lg text-gray-800'>Unbeatable Prices</h6>
              <p className='text-gray-600'>
                Our properties come at the most competitive prices, ensuring value for your investment.
              </p>
            </div>
          </div>

          <div className='flex items-center p-4 bg-white  rounded-lg'>
            <span className='text-[#ff5722]  mr-4'>
              <GppGoodIcon style={{ fontSize: 50 }} />
            </span>
            <div>
              <h6 className='font-bold text-lg text-gray-800'>Secure Investments</h6>
              <p className='text-gray-600'>
                All our properties are legally verified and ensure safe investments for buyers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
