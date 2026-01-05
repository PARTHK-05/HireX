import { requireAuth } from '@clerk/express'
import UserModel from '../models/User.model.js'

export const protectRoute = [
    requireAuth(),
    async(req , res , next)=>{
        try {
            const clerkId = req.auth.userId;
            // console.log(clerkId)
            if(!clerkId) return res.status(401).json({message:"Unauthorized - Invalid Token"})

            const user = await UserModel.findOne({clerkId})

            if(!user) return res.status(404).json({message:"User not found"})
            
            
            req.user = user
            next()
        } catch (error) {
            console.error("Error is protectRoute middleware : ",error);
            res.status(500).json({message : "Internal Server Error"});
        }
    }
]


// import { getAuth } from "@clerk/express";

// export const protectRoute = async (req, res, next) => {
//   try {
//     const { userId } = getAuth(req);

//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const user = await UserModel.findOne({ clerkId: userId });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.error("Error in protectRoute:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
