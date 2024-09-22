import React from "react";
import { useDispatch } from "react-redux";
import { Button, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { updateCartItem, removeCartItem } from "../../Redux/Customers/Cart/Action";

const  CartItem = ({ item ,showButton }) => {
  const dispatch = useDispatch();

  // Function to update cart item quantity
  const handleUpdateCartItem = (quantityChange) => {
    const newQuantity = item.quantity + quantityChange;
    if (newQuantity > 0) {
      dispatch(updateCartItem(item.id, { quantity: newQuantity }));
    }
  };

  // Function to remove item from the cart
  const handleRemoveItemFromCart = () => {
    dispatch(removeCartItem(item.id));
  };

  
  return (
    <div className="p-5 shadow-lg border rounded-md">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          {console.log(item.product)}
          
          <img
            className="w-50 h-50 object-cover object-top"
            src={item.variant.images[0]}
            alt={item.product.title}
          />
        </div>
        <div className="ml-5 space-y-1">
          <p className="font-semibold">{item.product.title}</p>
          <p className="opacity-70"> {item.variant.variantName}</p>
          {/* <p className="opacity-70 mt-2">Seller: {item.product.brand}</p> */}
          <div className="flex space-x-2 items-center pt-3">
            <p className="opacity-50 line-through">₹{item.variant.price}</p>
            <p className="font-semibold text-lg">₹{item.variant.discountedPrice}</p>
            <p className="text-green-600 font-semibold">{item.variant.discountPercentage}% off</p>
          </div>
        </div>
      </div>
      {showButton&&<div className="flex  items-center lg:space-x-10 pt-4">
        <div className="flex items-center space-x-2 ">
          <IconButton
            onClick={() => handleUpdateCartItem(-1)}
            color="primary"
            aria-label="decrease quantity"
          >
            <RemoveCircleOutlineIcon />
          </IconButton>
          <span className="py-1 px-7 border rounded-sm">{item.quantity}</span>
          <IconButton
            onClick={() => handleUpdateCartItem(1)}
            color="primary"
            aria-label="increase quantity"
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </div>
        <div className="flex text-sm lg:text-base ml-4 lg:ml-10">
          <Button onClick={handleRemoveItemFromCart} variant="text">
            Remove
          </Button>
        </div>
      </div>}
    </div>
  );
};

export default CartItem;
