import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
   name:{
      type: String,
      required: [true,"Provide name"]
   },
   email:{
      type:String,
      required:[true, "Provide email"],
      uniquer:true
   },
   password:{
      type:String,
      required:[true,"Provede password"]
   },
   avatar:{
      type:String,
      default:''
   },
   mobile:{
      type:Number,
      default:null,
      required:[true,"Provede mobile number"]
   },
   refresh_token: {
      type:String,
      default:''
   },
   verify_email: {
      type: Boolean,
      default:false
   },
   last_login_date: {
      tyoe:Date,
      default:''
   },
   status: {
      type:String,
      enum:["Active","Inactivate","Suspended"]
   },
   address_details:[
      {
         type:mongoose.Schema.ObjectId,
         ref:"cartProduct"
      }
   ],
   orderHistory:[{
      type:mongoose.Schema.ObjectId,
      ref:'order'
   }],
   forgot_password_expiry:{
      type:Date,
      default:''
   },
   role:{
      type:String,
      enum:["ADMIN","USER"],
      default:"USER"
   }
},{
   timestamps:true
})

const UserModel = mongoose.model("User",userSchema)
export default UserModel