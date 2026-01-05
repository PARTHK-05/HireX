import { useState, useEffect, useRef } from "react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import { initializeStreamClient, disconnectStreamClient } from "../lib/stream";
import { sessionApi } from "../api/session";
// import { create } from "canvas-confetti";
// import { set } from "mongoose";

const useStreamClient = (session , loadingSession , isHost , isParticipant) => {
  const [streamClient, setStreamClient] = useState(null);
  const [call, setCall] = useState(null);
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [isInitializingCall, setIsInitializingCall] = useState(true);

  const videoCallRef = useRef(null);
  const chatClientRef = useRef(null);

  useEffect(()=>{
    const initCall = async()=>{
        if(!session?.callId) return;
        if(!isHost && !isParticipant) return;

        try {
            const {token , userId , userName ,UserImage} = await sessionApi.getStreamToken();

            const client = await initializeStreamClient({
                id:userId,
                name:userName,
                image:UserImage
            } , token);
            setStreamClient(client);

            const videoCall = client.call("default", session.callId);
            await videoCall.join({create:true});
            setCall(videoCall);
            videoCallRef.current = videoCall;

            const apiKey = import.meta.env.VITE_STREAM_API_KEY;
            const chatClientInstance = StreamChat.getInstance(apiKey);

            await chatClientInstance.connectUser({
                id:userId,
                name:userName,
                image:UserImage
            } , token);
            setChatClient(chatClientInstance);
            chatClientRef.current = chatClientInstance;

            const chatChannel = chatClientInstance.channel("messaging" , session.callId);
            await chatChannel.watch();
            setChannel(chatChannel);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to initialize Stream client");
            console.error("Error initializing Stream client:", error);
            setIsInitializingCall(false); // Set to false on error too
        }
    };

    const initialize = async () => {
      if(session && !loadingSession) {
        await initCall();
        setIsInitializingCall(false);
      } else {
        setIsInitializingCall(false);
      }
    };

    initialize();

    return () => {
        // iife
        (async () => {
            try {
            if (videoCallRef.current) await videoCallRef.current.leave();
            if (chatClientRef.current) await chatClientRef.current.disconnectUser();
            await disconnectStreamClient();
            } catch (error) {
            console.error("Cleanup error:", error);
            }
        })();
    };
  },[session,loadingSession,isHost,isParticipant]);

    return {
    streamClient,
    call,
    chatClient,
    channel,
    isInitializingCall,
  };

}

export default useStreamClient