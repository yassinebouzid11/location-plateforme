const Offer=require("../models/Offer")


const createOffer = async (req, res) => {
    try {
        

        const { titre, adresse, description, type, prix } = req.body;
        const files = req.files;
    
        if (!titre || !adresse || !description || !type || !prix) {
            return res.status(400).json({ message: 'Tous les champs sont requis.' });
        }
    
        const images = files.map((file) => ({
            filename: file.originalname,
            buffer: file.buffer,
            mimetype: file.mimetype,
        }));
    
        const newOffer = new Offer({
            titre,
            adresse,
            description,
            type,
            prix,
            images,
            proprietaire: req.user.id,
        });
    
        await newOffer.save();
        res.status(201).json({ message: "Offre créée avec succès !", offer: newOffer });
        } catch (error) {
        console.error("Erreur createOffer:", error);
        res.status(500).json({ message: "Erreur lors de la création de l'offre", error });
        }
};



const getAllOffers = async (req, res) => {
    try {
    const offers = await Offer.find().populate("proprietaire", "nom email");
    res.json(offers);
    } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des offres", error });
    }
};

const getOfferImage = async (req, res) => {
    try {
        const { offerId, imageIndex } = req.params
        const offer = await Offer.findById(offerId)
    
        if (!offer || !offer.images || !offer.images[imageIndex]) {
            return res.status(404).send("Image non trouvée")
        }
    
        const image = offer.images[imageIndex]
        res.set('Content-Type', image.mimetype)
        res.send(image.buffer)
        } catch (err) {
        console.error("Erreur lors de la récupération de l'image :", err)
        res.status(500).send("Erreur serveur")
        }
    }

const getOfferById = async (req, res) => {
    try {
        const offer = await Offer.findById(req.params.id)
        .populate("proprietaire", "nom email")
        .lean();

        if (!offer) {
            return res.status(404).json({ message: "Offre non trouvée" });
        }

        
        offer.images = offer.images.map((img, index) => ({
            filename: img.filename,
            mimetype: img.mimetype,
            url: `/offer/image/${offer._id}/${index}` 
        }));

        res.json(offer);
    } catch (error) {
        console.error("Erreur dans getOfferById:", error);
        res.status(500).json({ message: "Erreur lors de la récupération de l'offre", error });
    }
};



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
    getOfferImage,
    getOfferById,
    updateOffer,

}