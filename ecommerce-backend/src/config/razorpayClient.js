require('dotenv').config();

const Razorpay = require('razorpay');

const APIKey=process.env.APIKey
const APISECRET=process.env.APISECRET

const razorpay = new Razorpay({
    key_id: APIKey,
    key_secret: APISECRET,
  });


module.exports=razorpay;