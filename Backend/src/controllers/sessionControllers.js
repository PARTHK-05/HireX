import { chatClient, streamClient } from "../lib/stream.js"
import Session from "../models/Session.js"

export async function createSession(req,res){
    try {
        const {problem , difficulty} = req.body
        const userId = req.user_id
        const clerkId = req.user.clerkId 

        if(!problem || !difficulty){
            return res.status(400).json({message:"Problem and Difficulty are required"})
        }

        //generate a unique call id for stream video

        const callId = `session_${Date.now()}_${Math.random().toString(32).substring(7)}`

        const session = await Session.create({
            problem,
            difficulty,
            host:userId,
            callId,
        })

        await streamClient.video.call("default",callId).getOrCreate({
            data:{
                created_by_id:clerkId,
                custom:{
                    problem , 
                    difficulty , 
                    sessionId:session._id.toString()
                }
            },

        })

        const channel =  chatClient.channel("messaging",callId , {
            name:`${problem} Session`,
            created_by_id:clerkId,
            members:{clerkId}
        })

        await channel.create()

        res.status(201).JSON({
           session 
        })
    } catch (error) {
        console.log("Error in Createsession controller:",error.message);
        res.status(500).JSON({message : "iNTERNAL SERVER ERROR"})
    }
}

export async function getActiveSessions(_,res){
    try {
        const sessions = (await Session.find({status:"active"})
            .populate("host" , "name profilePic email clerId"))
            .toSorted({createdAt:-1})
            .limit(20);

        res.status(200).json({sessions})

    } catch (error) {
        
    }
}

export async function getMyRecentSession(req,res){
    try {
        const userId = req.user._id;
        // where user is either host or participant
        const sessions = await Session.find({status:"completed" ,
            $or:[
                {
                    host:userId
                },
                {
                    participant:userId
                }
            ],
        }).sort({createdAt:-1})
          .limit(20);

        res.status(200).json({sessions})

    } catch (error) {
        console.log("Error in getMyRecentSession controller:",error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function getSessionById(req,res){
    try {
        const {id} = req.params

        const session = await Session.findById(id)
                                            .populate("host" , "name email profilePic clerkId")
                                            .populate("participant" ,"name email profilePic clerkId")
        
        if(!session)  return res.status(404).json({message:"Session not found"})

        res.status(200).json({session})
    } catch (error) {
        console.log("Error in getSessionById controller:" , error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function joinSession(req,res){
    try {
        const {id} = req.params;
        const userId = req.user_id
        const clerkId = req.clerkId

        const session = await Session.findById(id)

        if(!session)  return res.status(404).json({message:"Session not found"})

        
        // check if sesion is already full


        if (session.status!== "active") {
            return res.status(400).json({ message: "Cannot join a completed session" });
        }

        if(session.host.toString() === userId.toString()){
            return res.status(400).json({message : "Host cannot join their own session as participant"})
        }

        if(session.participant)  return res.status(409).json({message:"Session is full"})

        session.participant = userId
        await session.save();

        const channel = chatClient.channel("messaging",session.callId)
        await channel.addMembers({clerkId})

        res.status(200).json({session})

    } catch (error) {
        console.log("error in joinSession controller",error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function endSession(req,res){
    try {
        const {id} = req.params
        const userId = req.user._id

        const session  = Session.findById(id);

        if(!session)  return res.status(404).json({message:"Session not found"})

        // check if the user is host

        if(session.host.toString() !== userId.toString()){
            return res.status(403).json({message :"Only the host can end the session"})
        }

        //check if session is already completed
        if(session.status === "completed"){
            return res.status(400).json({message : "Session is already completed"})
        }

        // delete stream video call
        const call = streamClient.video.call("default" , session.callId)
        await call.delete({hard : true})

        // delete stream chat call
        const channel = chatClient.channel("messaging",session.callId)
        await channel.delete();

        session.status = "completed"
        await session.save()

        res.status(200).json({session , message:"Session ended successfully"})
    } catch (error) {
        console.log("Error is occured in endSession:",error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}

