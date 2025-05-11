import React from 'react';

interface CardProps {
  title: string;
  address: string;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({ title, address, imageUrl }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover rounded-lg mb-4" />
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{address}</p>
    </div>
  );
};

export default Card;
