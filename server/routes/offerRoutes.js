const express = require("express");
const router = express.Router();

const upload  = require("../middelwares/upload");
const offerController = require("../controllers/offerController");
const { verifyJWT } = require("../middelwares/verifyJWT");

// router.use(verifyJWT)
router.route("/create").post(verifyJWT,upload.array('images'), offerController.createOffer)
router.route("/all").get(offerController.getAllOffers);
router.route('/image/:offerId/:imageIndex').get(offerController.getOfferImage)
router.route("/:id").get(offerController.getOfferById);
router.route("/update/:id").put(verifyJWT,offerController.updateOffer);
router.route("/delete/:id").put(verifyJWT,offerController.deleteOffer); 


module.exports = router;