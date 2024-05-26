const express = require('express')
const cors = require('cors')
const residencyRoute  = require('./routes/residency')
const userRoutes = require('./routes/user')
const reviewRoutes = require('./routes/review')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}))
app.use(express.urlencoded({ extended: true }));

let port = 8082

//initialie of mongoose library
// getting-started.js
main()
.then(()=>{
    console.log("connection successfull")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/MERNproject');

// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.listen(port , ()=>{
   console.log("app is running on port no. 8082");
})

app.use('/api/residency' , residencyRoute)
app.use('/api/user' , userRoutes)
app.use('/api/review' , reviewRoutes)






