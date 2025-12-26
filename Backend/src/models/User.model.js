import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    profilePic:{
        type:String,
        default:""
    },
    clerkId:{
        type:String,
        required:true,
        unique:true
    }
},
{timestamps :true } //CreatedAT , updatedAT
);

const UserModel = mongoose.model("User" , userSchema)

export default UserModel;