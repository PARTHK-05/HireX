import {useMutation , useQuery}  from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast"
import { sessionApi } from "../api/session.js";

// export const useCreateSession = ()=>{
//     const result = useMutation({
//         mutationKey:["createSession"],
//         mutationFn:sessionApi.createSession,
//         onSuccess:() => toast.success("Session created Successfully"),
//         onSuccess:(error) => toast.error(error.respose?.data?.message || "Failed to create room"),
//     })
//     return result;
// }

export const useCreateSession = () => {
  return useMutation({
    mutationKey: ["createSession"],
    mutationFn: sessionApi.createSession,
    onSuccess: () => {
      toast.success("Session created successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create room");
    },
  });
};


export const useActiveSessions = ()=>{
    const result = useQuery({
        queryKey:["activeSessions"],
        queryFn:sessionApi.getActiveSessions,
    })
    return result;
}

export const useMyRecentSessions = ()=>{
    const result = useQuery({
        queryKey:["myRecentSessions"],
        queryFn:sessionApi.getMyRecentSession,
    })
    return result;
}

export const useSessionById = (id)=>{
    const result = useQuery({
        queryKey:["session"],id,
        queryFn:()=>sessionApi.getSessionById(id),
        enabled: !!id,
        refetchInterval: 5000, //refetch every 5 sec to detect status changes
    })
    return result;
}

export const useJoinSession = ()=>{
    const result = useMutation({
        mutationKey:["joinSession"],
        mutationFn:sessionApi.joinSession,
        onSuccess:() => toast.success("Joined Session Successfully"),
        onError:(error) => toast.error(error.respose?.data?.message || "Failed to join session"),
    })
    return result;
}

export const useEndSession = () => {
  const result = useMutation({
    mutationKey: ["endSession"],
    mutationFn: sessionApi.endSession,
    onSuccess: () => toast.success("Session ended successfully!"),
    onError: (error) => toast.error(error.response?.data?.message || "Failed to end session"),
  });

  return result;
};