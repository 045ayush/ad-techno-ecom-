import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Rating } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from "../../Redux/Customers/Product/ProductAction";
import { addItemToCart } from "../../Redux/Customers/Cart/Action";
import Zoom from 'react-medium-image-zoom'; // Import the zoom library


export default function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productState = useSelector((state) => state.products);
  const cartState = useSelector((state) => state.cart);
  
  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  const product = productState.product;

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (product && product.variants) {
      setSelectedVariant(product.variants[0]);
      setSelectedImageIndex(0);
    }
  }, [product]);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setSelectedImageIndex(0); 
  };

  const handleImageChange = (index) => {
    setSelectedImageIndex(index); // Update the main image when a thumbnail is clicked
    
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedVariant) {
      dispatch(addItemToCart({ variantId: selectedVariant.id }))
        .then(() => {
          navigate("/cart");
        })
        .catch((error) => {
          console.error("Failed to add item to cart", error);
        });
    }
  };


  if (productState.loading) {
    return <div>Loading...</div>;
  }

  if (productState.error) {
    return <div>Error: {productState.error}</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  return (
    <div className="bg-white lg:px-20">
      <div className="pt-6">
        <section className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 px-4 pt-10">
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
              
              <img
                src={selectedVariant?.images[selectedImageIndex]}
                alt={"product"}
                className="h-full w-full object-cover object-center"
              />
              
            </div>
            <div className="flex flex-wrap space-x-5 justify-center">
              {selectedVariant?.images.map((image, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4"
                  onClick={() => handleImageChange(index)} 

                >
                  <img
                    src={image}
                    alt={`variant-${index}`}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1 mx-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
            <div className="lg:col-span-2">
              <h1 className="text-lg lg:text-xl font-semibold tracking-tight text-gray-900">
                {product.title}
              </h1>
              <h1 className="text-lg lg:text-xl tracking-tight text-gray-900 opacity-60 pt-1">
                {selectedVariant?.variantName}
              </h1>
            </div>

            <div className="mt-4">
              <h2 className="text-sm font-medium text-gray-900">Select Variant</h2>
              <div className="flex space-x-3 mt-2">
                {product.variants.map((vari) => (
                  <button
                    key={vari.id}
                    onClick={() => handleVariantChange(vari)}
                    className={`py-2 px-4 border transition-colors duration-300 ${
                      vari.id === selectedVariant?.id
                        ? "border-black "
                        : "border-gray-400"
                    }`}
                  >
                    {vari.variantName}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex space-x-5 items-center text-lg lg:text-xl tracking-tight text-gray-900">
                <p className="font-semibold">₹{selectedVariant?.discountedPrice}</p>
                <p className="opacity-50 line-through">₹{selectedVariant?.price}</p>
                <p className="text-green-600 font-semibold">
                  {selectedVariant?.discountPercentage}% Off
                </p>
              </div>

              {false&&<div className="mt-6">
                <div className="flex items-center space-x-3">
                  <Rating name="read-only" value={4.6} precision={0.5} readOnly />
                  <p className="opacity-60 text-sm">42807 Ratings</p>
                  <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {product.reviews?.totalCount || "117"} reviews
                  </p>
                </div>
              </div>}

              <form className="mt-1" onSubmit={handleSubmit}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ padding: ".8rem 2rem", marginTop: "2rem" }}
                >
                  Add To Cart
                </Button>
              </form>
            </div>
          </div>
        </section>
        <section className="bg-white pb-12 px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12">
            <div className="py-10">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Description</h3>
                <p className="text-base text-gray-700 mt-4 leading-relaxed">{product.description}</p>
              </div>

              <div className="mt-12">
                <h3 className="text-lg font-semibold text-gray-800">Highlights</h3>
                <ul className="list-disc space-y-2 pl-5 text-base text-gray-700 mt-4">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="leading-relaxed">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="py-10 lg:pl-16">
              <h3 className="text-lg font-semibold text-gray-800">Specifications</h3>
              <ul className="list-disc space-y-2 pl-5 text-base text-gray-700 mt-4">
                {Object.entries(selectedVariant?.specifications || {}).map(([key, value]) => (
                  <li key={key} className="leading-relaxed">
                    <span className="font-medium">{key}:</span> {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
