const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    filename: String,
    buffer: Buffer,
    mimetype: String,
}); 

const offerSchema = new mongoose.Schema({
    titre: String,
    adresse: String,
    description: String,
    type: {
        type: String,
        enum: ["Chambre", "Studio", "S1", "S2", "S3", "S4", "S5"],
    },
    prix: Number,
    images: [imageSchema],
    proprietaire: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = mongoose.model("Offer", offerSchema);
