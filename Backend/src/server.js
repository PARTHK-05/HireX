import express from "express"
import {ENV} from './lib/env.js'

const app = express()

console.log(ENV.PORT)
console.log(ENV.DB_URL)

app.get("/" , (req , res)=>{
    res.status(200).json({msg:"success ,the api is working from backend"})
})

app.listen(ENV.PORT , ()=>{
    console.log("Server is running on the port:",ENV.PORT)
})