import React from 'react';

export default function BookCard({ title, description }) {
  return (
    <div className="bg-white shadow-md rounded-lg px-16 py-24 hover:shadow-lg transition duration-300">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};