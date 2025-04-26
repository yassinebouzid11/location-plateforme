// middlewares/upload.js
const multer = require("multer")

const storage = multer.memoryStorage() // ou diskStorage si tu veux enregistrer sur disque

const upload = multer({ storage })

module.exports = upload
