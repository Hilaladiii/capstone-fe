import React from 'react';

interface CardProps {
  title: string;
  address: string;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({ title, address, imageUrl }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden flex flex-col items-center p-6"
      style={{ boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.2)" }}
    >
      <img
        src={imageUrl}
        alt={title}
        className="object-contain rounded h-24 mb-4"
        style={{ background: "#f3f4f6" }}
      />
      <h3 className="text-lg font-semibold mb-2 text-center text-secondary">{title}</h3>
      <p className="text-black text-center text-sm">{address}</p>
    </div>
  );
};

export default Card;
