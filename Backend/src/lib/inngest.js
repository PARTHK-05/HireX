import {Inngest} from 'inngest';
import { connectDB } from './db.js'
import UserModel from '../models/User.model.js';

export const inngest = new Inngest({ id: "HireX-id" });

const syncUser = inngest.createFunction(
    {id:"sync-user"},
    {event:'clerk/user.created'},
    async({event})=>{
        await connectDB()

        const {id , email_addresses , first_name , last_name , image_url} = event.data

        const newUser = {
            clerkId:id,
            email:email_addresses[0]?.email_addresses,
            name:`${first_name || ""} ${last_name || ""}`,
            profilePic:image_url
        }
        await UserModel.create(newUser)
    }
)

const DeletUserFromDB = inngest.createFunction(
    {id:"HireX-user-from-db"},
    {event:'clerk/user.deleted'},
    async({event})=>{
        await connectDB()

        const {id} = event.data
        await UserModel.deleteOne({clerkId:id})


        //todo :do something else
    }
)

export const functions =  [syncUser, DeletUserFromDB]