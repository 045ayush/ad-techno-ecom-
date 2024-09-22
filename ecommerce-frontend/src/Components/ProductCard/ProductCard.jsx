import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { productId,
    productTitle,
    productDescription,
    productBrand,
    productColor,
    productHighlights,
    productCreatedAt,
    productCategory, 
    variantId,
    variantName,
    variantPrice,
    variantDiscountedPrice,
    variantDiscountPercentage,
    variantQuantity,
    variantImages,
    variantSpecifications} = product;

  const navigate = useNavigate();
  const variantNameRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const element = variantNameRef.current;
    if (element) {
      const isOverflow = element.scrollHeight > element.clientHeight;
      setIsOverflowing(isOverflow);
    }
  }, [variantName]);

  const handleNavigate = () => {
    navigate(`/product/${productId}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="relative flex flex-col border rounded-lg shadow-sm transition-transform transform hover:scale-105 cursor-pointer p-4 bg-white h-full w-full"
    >
      <div className="flex-1 flex items-center justify-center">
        <img
          className="w-full h-36 object-contain"
          src={variantImages[0]}
          alt={productTitle}
        />
      </div>
      <div className="flex flex-col mt-4 h-full">
        <p className="font-semibold text-gray-700 text-sm pb-1">{productTitle}</p>
        <div className="relative flex-1">
          <p
            ref={variantNameRef}
            className={`font-bold text-gray-800 text-sm overflow-hidden ${
              isOverflowing ? 'line-clamp-2' : ''
            }`}
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {variantName}
            {isOverflowing && (
              <span className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent pointer-events-none"></span>
            )}
          </p>
        </div>
        <div className="flex items-center justify-between mt-2 space-x-2">
          <div className='flex items-center'>
          <p className="font-semibold text-sm text-gray-900">
            ₹{variantDiscountedPrice}
          </p>
          <p className="text-gray-500 line-through text-xs pl-2">
            ₹{variantPrice}
          </p>
          </div>
          <div>
          <p className="text-green-600 font-semibold text-xs">
            {variantDiscountPercentage}% off
          </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
