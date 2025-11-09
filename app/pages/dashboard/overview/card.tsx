import React from 'react';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

function PropertyCard() {
  const totalProperties = 120;
  const totalCategories = 15;
  const totalAgents = 8;
  const totalClients = 200;

  const cards = [
    {
      title: 'Total Properties',
      value: totalProperties,
      icon: <AssignmentIcon className='text-blue-600' style={{ fontSize: '40px' }} />,
    },
    {
      title: 'Total Categories',
      value: totalCategories,
      icon: <CategoryIcon className='text-green-600' style={{ fontSize: '40px' }} />,
    },
    {
      title: 'Total Agents',
      value: totalAgents,
      icon: <PeopleIcon className='text-purple-600' style={{ fontSize: '40px' }} />,
    },
    {
      title: 'Total Clients',
      value: totalClients,
      icon: <AccountBalanceIcon className='text-orange-600' style={{ fontSize: '40px' }} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
      {cards.map((card, index) => (
        <div key={index} style={{  boxShadow: '0 4px 15px rgba(255, 0, 0, 0.5)'  }}  className="bg-white  border-2 rounded-lg p-6 text-center h-full">
          <div className='flex items-center justify-center'>
            {card.icon}
            <h2 className='ml-2 text-xl font-bold'>{card.title}</h2>
          </div>
          <h1 className='mt-4 text-4xl font-bold text-gray-800'>{card.value}</h1>
        </div>
      ))}
    </div>
  );
}

export default PropertyCard;
