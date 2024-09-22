import React from 'react';

const HomeSectionCard = ({product}) => {
  // Dummy data for the description
  const description = product.description;

  // Limit the number of characters to show before truncation
  const maxLength = 22;

  // Truncate description logic
  const truncatedDescription = description.length > maxLength
    ? `${description.substring(0, maxLength)}...`
    : description;

  return (
    <div className='cursor-pointer flex flex-col  rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3 border border-gray-200 bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out h-full'>
      <div className='relative w-full h-[13rem]'>
        <img
          className='object-cover w-full h-full'
          src={product.variants[0].images[0]}
          alt="Product"
        />
      </div>
      <div className='p-4'>
        <h3 className='text-lg font-semibold text-gray-800 mb-2'>
          {product.name}
        </h3>
        <p className='text-sm text-gray-600 mb-2'>
          {truncatedDescription}
        </p>
        <a href="/single-product" className='text-blue-500 hover:underline block mt-2'>
          More Details
        </a>
      </div>
    </div>
  );
}

export default HomeSectionCard;

