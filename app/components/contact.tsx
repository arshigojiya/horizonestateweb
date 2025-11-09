import { AddLocationAlt, Email, Phone } from '@mui/icons-material';
import React from 'react';

const ContactForm = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between p-14 bg-white rounded-lg ">
      <div className="flex-1 lg:mr-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Get in Touch</h2>
        <p className="mb-6 text-gray-600">Fill out the form below to contact us, and our team will respond to you shortly.</p>
        <form>
          <div className="mb-4">
            <input
              type="text"
              id="fullName"
              placeholder="Full Name"
              className="mt-1 block w-full border-2 border-[#babcbf] rounded-lg shadow-sm focus:border-[#E74D3C] focus:ring focus:ring-[#E74D3C] focus:ring-opacity-50 py-3 px-4"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              className="mt-1 block w-full border-2 border-[#babcbf] rounded-lg shadow-sm focus:border-[#E74D3C] focus:ring focus:ring-[#E74D3C] focus:ring-opacity-50 py-3 px-4"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="tel"
              id="phone"
              placeholder="Phone Number"
              className="mt-1 block w-full border-2 border-[#babcbf] rounded-lg shadow-sm focus:border-[#E74D3C] focus:ring focus:ring-[#E74D3C] focus:ring-opacity-50 py-3 px-4"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              id="message"
              placeholder="Your Message"
              className="mt-1 block w-full border-2 border-[#babcbf] rounded-lg shadow-sm focus:border-[#E74D3C] focus:ring focus:ring-[#E74D3C] focus:ring-opacity-50 py-3 px-4"
              required
            ></textarea>
          </div>
          <div className='flex justify-center'>
            <button type="submit" className="w-full bg-[#E74D3C] text-white font-semibold py-3 rounded-lg hover:bg-[#C0392B] transition">Send Message</button>
          </div>
        </form>
      </div>

      <div className="flex items-center justify-center mt-12 ">
        <div className="mt-9 lg:mt-0 bg-white shadow-lg rounded-lg p-8 transition-transform transform hover:scale-105 duration-300">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Contact Information</h3>
          <p className="mb-6 text-gray-600">
            Reach out to us directly via phone or visit our office at the location below.
          </p>

          <div className="flex items-start mb-6">
            <AddLocationAlt className="text-[#ff5722] mr-2" />
            <div>
              <h4 className="font-semibold text-gray-700">Our Office</h4>
              <p className="text-gray-600">Rajkot, Gujarat, India</p>
            </div>
          </div>

          <div className="flex items-start mb-6">
            <Phone className="text-[#ff5722] mr-2" />
            <div>
              <h4 className="font-semibold text-gray-700">Call Us</h4>
              <p className="text-gray-600">+91 7567145617</p>
            </div>
          </div>

          <div className="flex items-start">
            <Email className="text-[#ff5722] mr-2" />
            <div>
              <h4 className="font-semibold text-gray-700">Email Us</h4>
              <p className="text-gray-600">sparkvision73@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
