require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const { Server } = require("socket.io");
const http = require("http"); 
const connectDB = require("./config/db.config");
const socketHandler = require("./middelwares/socketHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");

const app = express();
const server = http.createServer(app); 

connectDB();

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  mongoSanitize.sanitize(req.body);
  mongoSanitize.sanitize(req.params);
  next();
});                                   //contre injection
app.use(hpp()); // contre les requette pollué qui pet inflige a un DOS

app.use("/auth", require("./routes/authRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/offer", require("./routes/offerRoutes"));
app.use("/conversations", require("./routes/conversationRoutes"));
app.use("/messages", require("./routes/messageRoutes"));


const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    },
});


socketHandler(io);


mongoose.connection.once("open", () => {
    console.log("Connected to the database");
    server.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
