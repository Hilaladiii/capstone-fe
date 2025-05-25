import React from 'react';

interface CardProps {
  title: string;
  address: string;
  imageUrl: string;
}

const CardPartner: React.FC<CardProps> = ({ title, address, imageUrl }) => {
  return (
    <div className="bg-white border-1 border-black w-50 h-58 rounded-xl overflow-hidden flex flex-col items-center p-6"
      style={{ boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.2)" }}
    >
      <img
        src={imageUrl}
        alt={title}
        className="object-contain rounded h-16 mb-6"
      />
      <h3 className="text-sm font-semibold mb-2 text-center text-black">{title}</h3>
      <p className="text-black text-justify text-xs">{address}</p>
    </div>
  );
};

export default CardPartner;
