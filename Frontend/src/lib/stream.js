import {StreamVideoClient} from '@stream-io/video-react-sdk';

const apiKey = import.meta.env.VITE_STREAM_API_KEY;
const streamVideoToken = import.meta.env.VITE_STREAM_VIDEO_TOKEN;

let client = null;

export const initializeStreamClient = async(user , token)=>{
    // if client already exists, return it
    if(client && client?.user?.id === user?.id) return client;

    if(!apiKey) throw new Error("Stream API Key is not defined");
    if(!user) throw new Error("User is required to initialize Stream Client");
    if(!token) throw new Error("Stream Video Token is required to initialize Stream Client");

    client = new StreamVideoClient({
        apiKey,
        user,
        token
    });

    return client;
}

export const disconnectStreamClient = async()=>{
    if(client){
        try {
            await client.disconnect();
            client = null;
        } catch (error) {
            console.log("Error disconnecting Stream client:" , error)        
        }

    }  
}