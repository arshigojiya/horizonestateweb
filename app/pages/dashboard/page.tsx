'use client';
import React, { useState } from 'react';
import Overview from './overview/index';
import Property from './property/index';
import Categories from './categories/index';
import Profile from './profile/page'

function Page() {
    const [currentpage, setCurrentPage] = useState('overview');

    const handleButtonClick = (page: React.SetStateAction<string>) => {
        setCurrentPage(page);
    };

    return (
        <div className="mt-4">
            <div className="flex justify-center gap-5">
                {['overview', 'property', 'categories', 'myProfile'].map((page) => (
                    <button
                        key={page}
                        className={`${
                            currentpage === page ? 'bg-blue-500' : 'bg-[#e75040]'
                        } text-white p-2 rounded-[20px] transition-transform duration-200 hover:scale-110`}
                        onClick={() => handleButtonClick(page)}
                    >
                        {page.charAt(0).toUpperCase() + page.slice(1)}
                    </button>
                ))}
            </div>
            <div>
                {(() => {
                    switch (currentpage) {
                        case 'overview':
                            return <Overview />;
                        case 'property':
                            return <Property />;
                        case 'categories':
                            return <Categories />;
                        case 'myProfile':
                            return <Profile/>;
                        default:
                            return <div>Please select a page.</div>;
                    }
                })()}
            </div>
        </div>
    );
}

export default Page;
