import { StreamChat } from "stream-chat";
import { StreamClient } from "@stream-io/node-sdk"
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  throw new Error("Stream API key or secret is missing");
}

export const streamClient = new StreamClient(apiKey , apiSecret); // this will be the use for video calls
export const chatClient = StreamChat.getInstance(apiKey, apiSecret); //this is for chat Features

export const upsertStreamUser = async (userData) => {
  try {
    await chatClient.upsertUsers([userData]);
    console.log("Stream user upserted successfully:", userData);
  } catch (error) {
    console.error("Error upserting Stream user:", error);
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await chatClient.deleteUser({ id: userId });
    console.log("Stream user deleted successfully");
  } catch (error) {
    console.error("Error deleting Stream user:", error);
  }
};

// export const generateStreamToken = (userId) => {
//   return chatClient.createToken(userId);
// };
