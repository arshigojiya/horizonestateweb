import { Disclosure } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Drawer from "./Drawer";
import Drawerdata from "./Drawerdata";
import Image from 'next/image';
import userimg from '../../../public/user.jpg';
import { usePathname, useRouter } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [navigation, setNavigation] = useState([
        { name: 'Home', href: '/', current: false },
        { name: 'Properties', href: '/pages/property', current: false },
        { name: 'Testimonial', href: '/pages/testimonial', current: false },
        { name: 'About Us', href: '/pages/about', current: false },
        { name: 'Contact', href: '/pages/contact', current: false }
    ]);
    const [userid, setUserid] = useState<string | null>('');
    const [token, setToken] = useState<string | null>('');
    const [isauth, setIsAuth] = useState(Boolean(userid && token));
    const [profiledropdown, setProfileDropdown] = useState(false);
    
    const updateAuthState = () => {
        const newUserid = localStorage.getItem('userid');
        const newToken = localStorage.getItem('token');
        setIsAuth(Boolean(newUserid && newToken));
        setUserid(newUserid);
        setToken(newToken);
    };

    const handleLogout = () => {
        localStorage.removeItem('userid');
        localStorage.removeItem('token');
        updateAuthState();
    };

    useEffect(() => {
        const updatedNavigation = navigation.map(item => ({
            ...item,
            current: item.href === pathname
        }));
        setNavigation(updatedNavigation);
    }, [pathname]);

    useEffect(() => {
        const handleStorageChange = () => {
            updateAuthState();
        };

        window.addEventListener('storage', handleStorageChange);

        // Periodic check for localStorage changes to enhance reactivity
        const intervalId = setInterval(() => {
            updateAuthState();
        }, 1000); // Checks every 1 second

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(intervalId);
        };
    }, []);

    return (
        <Disclosure as="nav" className="navbar" style={{ marginBottom: 1 }}>
            <>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="relative flex h-20 items-center justify-between">
                        <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <Image
                                    src="/assets/logo1.png"
                                    alt="Courses-Logo"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <div className="hidden sm:ml-14 md:block">
                                <div className="flex space-x-4">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={'px-3 py-4 text-15px font-medium space-links'}
                                            style={{
                                                color: item.current ? "#e74d3c" : 'black'
                                            }}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {!isauth ? (
                            <>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    <div className='hidden md:block'>
                                        <button type="button" className='text-15px font-medium space-links' onClick={() => router.push('/auth/login')}>
                                            Sign In
                                        </button>
                                    </div>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0">
                                    <div className='hidden md:block'>
                                        <button
                                            style={{ background: '#e74d3c' }}
                                            className="hover:bg-red hover:text-white text-white text-15px font-medium ml-8 py-4 px-5 rounded"
                                            onClick={() => router.push('/auth/register')}
                                        >
                                            Register
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="relative flex flex-col items-center space-y-3">
                                <div className="cursor-pointer flex justify-center" onClick={() => setProfileDropdown(!profiledropdown)}>
                                    <Image className="rounded-full shadow-md" alt="User Profile" src={userimg} height={60} width={60} />
                                </div>
                                {profiledropdown && (
                                    <div className="absolute top-[53px] z-50 flex flex-col bg-white p-6 rounded-lg shadow-lg space-y-2">
                                        <button className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-all duration-200" onClick={() => {
                                            router.push('/pages/dashboard')
                                            setProfileDropdown(false)
                                        }}>Dashboard</button>
                                        <button
                                         className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-all duration-200"
                                         onClick={() => router.push('/pages/myprofile')}
                                        >
                                         Profile</button>
                                        <button
                                            className="text-sm font-semibold text-gray-700 hover:text-red-600 transition-all duration-200"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                        <div className='block md:hidden'>
                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" onClick={() => setIsOpen(true)} />
                        </div>
                        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                            <Drawerdata />
                        </Drawer>
                    </div>
                </div>
            </>
        </Disclosure>
    );
};

export default Navbar;
