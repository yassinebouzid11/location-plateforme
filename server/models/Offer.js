const mongoose = require('mongoose');


const offerSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true,
        trim: true
    },
    adresse: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["Chambre", "Studio", "S1", "S2", "S3", "S4", "S5"],
        required: true
    },
    prix: {
        type: Number,
        required: true,
        min: 0
    },
    images: {
        type: [String], // Array of image URLs
        default: []
    },
    proprietaire: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;

