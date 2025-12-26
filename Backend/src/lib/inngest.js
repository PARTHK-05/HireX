import {Inngest} from 'inngest';
import { connectDB } from './db.js'
import UserModel from '../models/User.model.js';
import {  deleteStreamUser, upsertStreamUser } from './stream.js';

export const inngest = new Inngest({ id: "HireX-id" });

const syncUser = inngest.createFunction(
    {id:"sync-user"},
    {event:'clerk/user.created'},
    async({event})=>{
        await connectDB()

        const {id , email_addresses , first_name , last_name , image_url} = event.data

        if (!email_addresses?.length) {
             throw new Error("No email found in Clerk event");
        }

        const newUser = {
            clerkId:id,
            email: email_addresses[0]?.email_address,
            name:`${first_name || ""} ${last_name || ""}`,
            profilePic:image_url
        }
        await UserModel.create(newUser)

        await upsertStreamUser({
            id:newUser.clerkId.toString(),
            name:newUser.name,
            image:newUser.profilePic
        });
    }
)

const DeletUserFromDB = inngest.createFunction(
    {id:"HireX-user-from-db"},
    {event:'clerk/user.deleted'},
    async({event})=>{
        await connectDB()

        const {id} = event.data
        await UserModel.deleteOne({clerkId:id})

        await deleteStreamUser(id.toString());
    }
)

export const functions =  [syncUser, DeletUserFromDB]