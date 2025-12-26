import express from "express"
import {ENV} from './lib/env.js'
import { connectDB } from "./lib/db.js"
import cors from 'cors'
import {serve}  from "inngest/express"
import { inngest , functions } from "./lib/inngest.js"

const app = express()


// middleware
app.use(express.json())
//credentials:true meaning ?? =>server allows a browser to include cookie on request
app.use(cors({origin:ENV.CLIENT_URL , credentials:true}))
app.use("/api/inngest" , serve({client : inngest , functions}))


app.get("/" , (req , res)=>{
    res.status(200).json({msg:"success ,the api is working from backend"})
})


const startServer = async ()=>{
    try {
        await connectDB();
        app.listen(ENV.PORT , ()=>{
            console.log("Server is running on the port:",ENV.PORT)
        })
    } catch (error) {
        console.error("Error starting the server 💥: ",error)
    }
}