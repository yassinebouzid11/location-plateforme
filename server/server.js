require("dotenv").config();
const mongoose  = require('mongoose');
// console.log(process.env.NODE_ENV);

const express = require ("express");

const app = express()
const connectDB = require("./config/db.config");

connectDB();

const PORT = process.env.PORT || 5000;

const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}))

app.use(cookieParser()); 

app.use(express.json()); 


app.use(express.urlencoded({ extended: true }))

app.use("/auth", require('./routes/authRoutes'));
app.use("/users", require('./routes/userRoutes'));
app.use("/offer", require('./routes/offerRoutes'));




mongoose.connection.once('open', ()=>{
console.log('connected to the database');
app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`);

});

})





