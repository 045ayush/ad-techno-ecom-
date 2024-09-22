import React, { useEffect } from 'react';
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '../../Redux/Customers/Order/Action';
import AddressCard from "../../Components/Address/AdreessCard";
import CartItem from "../Cart/CartItem";
import {createPaymentLink} from "../../Redux/Customers/Payment/Action"

const OrderSummary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");
  const jwt=localStorage.getItem("jwt");
  const {order,loading,error}=useSelector(state=>state.order)
  const { paymentloading, paymentLink, paymentUpdateMessage, paymenerror } = useSelector((state) => state.payment);



  useEffect(() => {
    dispatch(fetchOrderById(orderId));
  }, [dispatch,orderId]);

  const handleCreatePayment = () => {
    dispatch(createPaymentLink(orderId));
  };

  if (loading||paymentloading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (paymenerror) {
    return <div>Error: {paymenerror}</div>;
  }

  return (
    <div className="space-y-5">
      <div className="p-5 shadow-lg rounded-md border">
        <AddressCard address={order?.shippingAddress || ''} />
      </div>
      <div className="lg:grid grid-cols-3 relative justify-between">
        <div className="lg:col-span-2">
          <div className="space-y-3">
            {order?.orderItems?.map((item) => (
              <CartItem key={item.id} item={item} showButton={false} />
            ))}
          </div>
        </div>
        <div className="sticky top-0 mt-5 lg:ml-4 lg:mt-0">
          <div className="border p-5 bg-white shadow-lg rounded-md">
            <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
            <hr />
            <div className="space-y-3 font-semibold">
              <div className="flex justify-between pt-3 text-black ">
                <span>Price ({order?.totalItem} items)</span>
                <span>₹{order?.totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-700">-₹{order?.discount}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-green-700">Free</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span className="text-green-700">₹{order?.totalDiscountedPrice}</span>
              </div>
            </div>
            <Button
              onClick={handleCreatePayment}
              variant="contained"
              type="submit"
              sx={{ padding: ".8rem 2rem", marginTop: "2rem", width: "100%" }}
            >
              Pay Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
