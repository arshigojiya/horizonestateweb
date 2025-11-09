'use client'
import React, { useEffect, useState } from "react";
import Editprofile from './edit';
import Image from "next/image";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

type Profile = {
  username?: string;
  email?: string;
  totalProperties?: number;
};

const ProfilePage: React.FC = () => {
  const [openModel, setOpenModel] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    username: "John Doe",
    email: "johndoe@example.com",
    totalProperties: 15,
  });

  const toggleModel = () => setOpenModel((prev) => !prev);

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem('userid');
      if (!userId) {
        console.error("User ID not found in localStorage");
        return;
      }

      try {
        const response = await fetch(`/api/profile/${userId}`);
        if (!response.ok) throw new Error(`Error fetching profile: ${response.statusText}`);

        const data = await response.json();
        console.log("User profile data:", data.user);
        setProfile(data.user);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="mt-7 mb-7 flex items-center justify-center">
      <div className="bg-white max-w-lg w-full rounded-lg shadow-lg overflow-hidden">
        <div
          className="bg-red-600 h-32"
          style={{
            backgroundImage: `url('https://wallpapers.com/images/hd/real-estate-background-mvz77u10om8fzefy.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        <div className="-mt-16 text-center">
          <Image
            className="w-32 h-32 rounded-full mx-auto border-4 border-white"
            src="https://png.pngtree.com/png-vector/20240913/ourlarge/pngtree-cartoon-user-avatar-vector-png-image_13572227.png"
            alt="Profile"
            width={128}
            height={128}
          />
          <h2 className="text-2xl font-semibold mt-2 text-gray-800">{profile.username}</h2>
          <p className="text-gray-600">Real Estate Manager</p>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-center mt-4 mb-6 text-red-600">
            <div className="text-center">
              <h4 className="text-lg font-semibold">Total Properties</h4>
              <p className="text-2xl font-bold">{profile.totalProperties}</p>
            </div>
          </div>
          <div className="space-y-4 text-gray-700">
            <div className="flex items-center">
              <span className="font-semibold w-32">Email:</span>
              <span>{profile.email}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-32">Phone:</span>
              <span>+1 (123) 456-7890</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-32">Social Media:</span>
              <div className="flex space-x-4">
                <a href="#" aria-label="Instagram" className="hover:text-red-700">
                  <InstagramIcon fontSize="large" />
                </a>
                <a href="#" aria-label="Facebook" className="hover:text-red-700">
                  <FacebookIcon fontSize="large" />
                </a>
                <a href="#" aria-label="LinkedIn" className="hover:text-red-700">
                  <LinkedInIcon fontSize="large" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <button
              className="w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700"
              onClick={toggleModel}
            >
              Edit Profile
            </button>
          </div>
        </div>
        {openModel && <Editprofile onClose={toggleModel} />}
      </div>
    </div>
  );
};

export default ProfilePage;
