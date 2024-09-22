import React, { useEffect } from 'react';
import MainCarousel from '../../Components/MainCarousel/MainCarousel';
import { HomeSectionCarousal } from '../../Components/HomeSectionCarousal/HomeSectionCarousal';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../Redux/Customers/Product/ProductAction';

export const Homepage = () => {

  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Sorting by creation date
  const firstSection = products?.sort((a, b) => {
    return new Date(b.productCreatedAt) - new Date(a.productCreatedAt);
  });

  // Filtering products with limited stock
  const secondSection = products?.filter(product => product.variantQuantity < 10);

  return (
    <div>
      <MainCarousel />
      <div className='space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10'>
        <HomeSectionCarousal data={firstSection} sectionName={"Recently Added"} />
        {secondSection.length > 0 && (
          <HomeSectionCarousal data={secondSection} sectionName={"Limited Stock"} />
        )}
      </div>
    </div>
  );
}

export default Homepage;
