const User = require('../models/User');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer'); // Import nodemailer for sending emails



const getAllUsers = async(req,res)=>{ 

    const users = await User.find().select("").lean({ virtuals: true });

    if (!users){
        return res.status(400).json({message: "No users found"});
    }
    res.json(users);
}

const getUserById = async(req,res)=>{
    // const{id}=req.params;
    //console.log(req.params.id);

    const user = await User.findById(req.params.id).select("-password").lean();
    if (!user){
        return res.status(400).json({message: "No user with that id is founded"});
    }
    res.json(user);
} 



// const updateUser = async (req, res) => {
//     try { 
//         const { id } = req.params;
//         const updates = req.body;
//         const emailContent=`Hello, your password has been successfully updated. If you did not perform this change, please contact support immediately.`;
//         const emailObject='Password Updated';
        
//         if (updates.password) {
//             updates.password = await bcrypt.hash(updates.password, 10);

//             await sendEmail(id, emailContent, emailObject);
//         }

//         // Update the user in the database
//         const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true })
//             .select('-password') // Exclude password from the response
//             .lean();

//         // Check if the user was found and updated
//         if (!updatedUser) {
//             return res.status(404).json({ message: "No users found" });
//         }

//         res.json(updatedUser);
//     } catch (error) {
//         console.error("Error updating user:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, email, cin } = req.body;

        if (!nom || !email || !cin) {
            return res.status(400).json({ message: 'Tous les champs sont requis.' });
        }

        const updatedUser = await User.findByIdAndUpdate(
        id,
        { nom, email, cin },
        { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Utilisateur introuvable." });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};


const sendEmail = async (userId, emailBody, emailSubject) => {
    try {
    
        const user = await User.findById(userId).select('email').lean();
        if (!user || !user.email) {
            throw new Error("User email not found");
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
            to: user.email, 
            subject: emailSubject,
            text: emailBody,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('email sent to:', user.email);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};


const searchUser = async(req,res)=>{
    const {search}=req.params;
    const Search=req.body;
    if ( search.length < 3) {
        return res.status(400).json({ message: "Search query must be at least 3 characters long." });
    }
    const user = await User.find({nom: {$regex:`^${search}`,$options: "i"  }}).select("-password").lean();

    if(!user){
        return res.status(400).json({message:"use not found"});
    }else 
    res.json(user);
} 

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        // Check if `id` is provided
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }
        // Validate the `id` format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid User ID format" });
        }

        const user = await User.findByIdAndDelete(id).select("-password").lean();

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Server error" });
    }
};


module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    searchUser,
    deleteUser}