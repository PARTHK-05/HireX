import {StreamChat} from "stream-chat"
import {ENV} from "./env.js"

const apiKey = ENV.STREAM_API_KEY
const apiSecret = ENV.STREAM_API_SECRET

if(!apiKey || !apiSecret){
    console.error("stream api key or stream secret is missing")
}

export const chatClient = StreamChat.getInstance(apiKey , apiSecret);

export const upsertStreamUser = async(userData) =>{
    try {
        await chatClient.upsertUser(userData)
        console.log("Stream user upserted successfully :" , userData)
    } catch (error) {
        console.error("Error upserting Stream user:",error)

    }
}

export const DeleteStreamUser = async(userId) =>{
    try {
        await chatClient.deleteUser(userId)
        console.log("stream user deleted succefully")
    } catch (error) {
        console.error("Error deleting Stream user:",error)
    }
}

// todo : add another method to generateToken