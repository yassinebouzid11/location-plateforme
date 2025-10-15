const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    clientId: {
      type: String,
      required: true,
    },

    ownerId: {
      type: String,
      required: true,
    },
    offerId: {
					type: String,
					required: true,
    },
				status: {
						type: String,
						enum: ["Invalider", "En attente de paiement", "Valider"],
				},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", reservationSchema);
