const Offer=require("../models/Offer")

// Create a new offer
const createOffer = async (req, res) => {
    try {
    const { titre, adresse, description, type, prix, images } = req.body;
    
    if (!titre || !adresse || !description || !type || !prix) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }
    const newOffer = new Offer({
        titre,
        adresse,
        description,
        type,
        prix,
        images,
        proprietaire: req.user.id // id depuis le verifyJWT 
    });

    await newOffer.save();
    res.status(201).json({ message: "Offre créée avec succès", offer: newOffer });
    } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de l'offre", error });
    }
};

// Get all offers
const getAllOffers = async (req, res) => {
    try {
    const offers = await Offer.find().populate("proprietaire", "nom email");
    res.json(offers);
    } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des offres", error });
    }
};

// Get single offer by ID
const getOfferById = async (req, res) => {
    try {
    const offer = await Offer.findById(req.params.id).populate("proprietaire", "nom email");

    if (!offer) {
        return res.status(404).json({ message: "Offre non trouvée" });
    }

    res.json(offer);
    } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'offre", error });
    }
};

// Update an offer
const updateOffer = async (req, res) => {
    try {
    const updatedOffer = await Offer.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!updatedOffer) {
        return res.status(404).json({ message: "Offre non trouvée" });
    }

    res.json({ message: "Offre mise à jour", offer: updatedOffer });
    } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'offre", error });
    }
};

// Delete an offer
const deleteOffer = async (req, res) => {
    try {
    const deleted = await Offer.findByIdAndDelete(req.params.id);

    if (!deleted) {
        return res.status(404).json({ message: "Offre non trouvée" });
    }

    res.json({ message: "Offre supprimée" });
    } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'offre", error });
    }
};
module.exports ={
    createOffer,
    deleteOffer,
    getAllOffers,
    getOfferById,
    updateOffer,

}