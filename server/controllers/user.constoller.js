import { hashPassword, comparePassword} from "../helper/passwordHashing"

import UserModel from "../models/user.models"
import generateAccessToken from "../utils/generateAccessToken.js"
import generateRefreshToken from "../utils/generateRefreshToken.js"
import verificationEmailTemplate from "../utils/vereficationEmailTemplate.js"
import dotenv from "dotenv"

import jwt from "jsonwebtoken"

dotenv.config()

//register user
export const registerUserController = async (req,res) => {
try{
   const {name,email,password,mobile} = req.body

   if(!name || !email || !password || !mobile){
      return res.status(400).json({
         message:"Please fill the required fields",
         error: true,
         success: false
      })
   }

   const existingUser = await UserModel.findOne({ $or: [{email},{mobile}]})

   if(existingUser) {
      res.status(400).json({
         message: existingUser.email === email
         ?"Email is already registered"
         : "Mobile number is registered",
         error:true,
         success:false
      })
   }

const hashedPassword = await hashPassword (password)

const newUser = new UserModel({
   name,
   email,
   password:hashPassword,
   mobile
})

const savedUser = await newUser.save()

const verifyEmailURL = `${process.env.CLIENT_URL}/verify-email?code=${savedUser._id}`

await sendMail ({
   sendTo: email,
   subject:"Verification Email from Blinkit",
   html:verificationEmailTemplate({
      name:savedUser.name,
      url:verifyEmailURL
   })
})

const accessToken = await generateAccessToken(savedUser._id)
const refreshToken = await generateRefreshToken(savedUser._id)

const cookieOption = {
   httpOnly: true,
   secure: false,
   sameSite:'None'
}

res.cookie("accessToken", accessToken,cookieOption)
res.cookie("refreshToken", refreshToken,cookieOption)

return res.status(201).json({
   message:"User registered sucessfully",
   error:false,
   success:true,
   data: {
      user:savedUser,
      accessToken,
      refreshToken
   }
})

}catch(error){
   return res.status(500).json({
      message: "Internal serner eror", 
      error: true,
      success:false
   })
}
}