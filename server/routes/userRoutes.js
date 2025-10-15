const express = require("express");
const router = express.Router();

const userController = require("../controllers/userControllers");
const { verifyJWT } = require("../middelwares/verifyJWT");

router.route("/all").get(userController.getAllUsers);
router.route("/:id").get(userController.getUserById);
router.route("/:id").put(verifyJWT,userController.updateUser); 
router.route("/delete/:id").delete(userController.deleteUser);
router.route("/search/:search").get(userController.searchUser);

module.exports = router;