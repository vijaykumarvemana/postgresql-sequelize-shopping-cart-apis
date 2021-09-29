import express from 'express'
import cors from 'cors'
// import sequelize from './db/index.js'
import { connectDB } from './db/index.js'

import productRouter from "./services/products/index.js"
import reviewRouter from './services/reviews/index.js'



const server = express()

const {PORT = 5000} = process.env

server.use(cors())

server.use(express.json())
server.use("/products", productRouter)
server.use("/reviews", reviewRouter)

server.listen(PORT, async() => {
    console.log('Server is running on port:',PORT)
    await connectDB({alert: true})
})

server.on("error", (error) =>{
    console.log("Server is stopped", error)
})