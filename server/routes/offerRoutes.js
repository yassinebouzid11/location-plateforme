const express = require("express");
const router = express.Router();

const upload  = require("../middelwares/upload");
const offerController = require("../controllers/offerController");
const { verifyJWT } = require("../middelwares/verifyJWT");

router.use(verifyJWT)
router.route("/create").post(upload.array('images'), offerController.createOffer)
router.route("/create").post(offerController.createOffer);
router.route("/all").get(offerController.getAllOffers);
router.route("/:id").get(offerController.getOfferById);
router.route("/update/:id").put(offerController.updateOffer);
router.route("/delete/:id").put(offerController.deleteOffer); 


module.exports = router;