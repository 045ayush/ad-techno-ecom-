require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECERET_KEY=process.env.JWT_SECRET

const generateToken=(userId)=>{
    let payload = { "id" : userId};
    const token=jwt.sign(payload,SECERET_KEY,{ expiresIn: '148h' })
    return token;
}

const getUserIdFromToken=(token)=>{
    const decodedToken=jwt.verify(token,SECERET_KEY)
    return decodedToken.id
}


module.exports={generateToken,getUserIdFromToken};