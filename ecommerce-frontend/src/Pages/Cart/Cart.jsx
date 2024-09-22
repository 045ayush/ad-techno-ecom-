import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { emptyCart, fetchCart } from "../../Redux/Customers/Cart/Action";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Accessing cart state from Redux
  const { cart, loading, error } = useSelector((state) => state.cart);

  // Fetch the user's cart when the component mounts
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading cart: {error}</p>;

  if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white p-5">
        <img
          src="/images/empty-cart.png" // You can replace this with your chosen image
          alt="Empty Cart"
          className="w-32 h-32 mb-6"
        />
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-6">
          It looks like you haven't added anything to your cart yet. Start shopping to fill it up!
        </p>
        <Button
          onClick={() => navigate("/")}
          variant="contained"
          color="primary"
          sx={{ padding: ".8rem 2rem", borderRadius: "25px" }}
        >
          Shop Now
        </Button>
      </div>
    );
  }

  // Calculate total price, discount, and discounted price
  const totalItems = cart.totalItem;
  const totalPrice = cart.totalPrice;
  const totalDiscountedPrice = cart.totalDiscountedPrice;
  const discount = totalPrice - totalDiscountedPrice;

  return (
    <div className="my-10">
      <div className="lg:grid grid-cols-3 lg:px-16 relative">
        <div className="lg:col-span-2 px-5 bg-white">
          <div className="space-y-3">
            {cart.cartItems.map((item) => (
              <CartItem key={item.id} item={item} showButton={true}/>
            ))}
          </div>
        </div>
        <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0 ">
          <div className="border p-5 bg-white shadow-lg rounded-md">
            <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
            <hr />
            <div className="space-y-3 font-semibold">
              <div className="flex justify-between pt-3 text-black">
                <span>Price ({totalItems} items)</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-700">-₹{discount}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-green-700">Free</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span className="text-green-700">₹{totalDiscountedPrice}</span>
              </div>
            </div>

            <Button
              onClick={() => {
                navigate("/checkout?step=2")
              }}
              variant="contained"
              type="submit"
              sx={{ padding: ".8rem 2rem", marginTop: "2rem", width: "100%" }}
            >
              Check Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
