
const User = require("../models/User");
const bcrypt = require ("bcrypt");
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");


const register = async (req,res) => {

const {nom,email,password,tele,cin,age}= req.body;
const emailContent=`Hello ${nom} your acount has been created successfully`;
const emailObject=`Welcome to our project Mr/Mrs ${nom}`;

if (!nom|| !email || !password || !tele || !cin || !age) {
    return res.status(400).json({message: "All fields are required"});
}

try {
    const duplicatedEmail = await User.findOne({email}).exec();

    if (duplicatedEmail) {
        return res.status(409).json({message: "User already exist"});
    }

    const hashedPassword = await bcrypt.hash(password,10);

    await User.create({
        nom,
        email,
        password:hashedPassword,
        tele,
        cin,
        age,
    });

    sendEmail(email,emailContent, emailObject);

    return res.status(201).json({message: "User created successfully"});
    

    }catch (error) {
    console.error(error);
    return res.status(500).json({message: "Server error"});

}

}

const login = async (req,res) =>{
    const {email,password}= req.body;

    // Check for missing fileds
    if ( !email || !password) {
        return res.status(400).json({message: "All fields are required"});
    }
    
    const foundedUser = await User.findOne({email}).exec();

    if(!foundedUser) {
        return res.status(401).json({message: "User does not exist"})
    }
const isMatch = await bcrypt.compare(password,foundedUser.password);

if(!isMatch) {
    return res.status(401).json({message: "Wrong password"})
}

const accessToken = jwt.sign({
    userInfo:{
        id: foundedUser._id,
    }
},process.env.ACCESS_TOKEN_SECRET, {expiresIn:"7d"});

res.status(200).send({
    accessToken,
    id: foundedUser._id,
    email: foundedUser.email,
});


};

const sendEmail = async (distinationEmail, emailBody, emailSubject) => {
    try {
        if(!distinationEmail){
            throw new Error("no acount created");
            
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: 'bouzidyassine08@gmail.com',
                pass: 'ahsj mikl mhhh xkhd', 
            },
        });

    
        const mailOptions = {
            from: 'bouzidyassine08@gmail.com', 
            to: distinationEmail, 
            subject: emailSubject,
            text: emailBody,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('email sent to:', distinationEmail);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};


module.exports = {
    register,
    login,
}