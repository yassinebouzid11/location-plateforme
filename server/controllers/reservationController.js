const Reservation = require("../models/Reservation");
const Offer = require("../models/Offer");
const User = require("../models/User");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

// GET ALL RESERVATIONS
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().lean();
    if (!reservations || reservations.length === 0) {
      return res.status(400).json({ message: "Aucune réservation trouvée." });
    }
    res.json(reservations);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des réservations." });
  }
};

// Récupérer les réservations d'un propriétaire
const getReservationsByOwner = async (req, res) => {
  const { ownerId } = req.params;

  try {
    const reservations = await Reservation.find({ ownerId }).lean();
    if (!reservations || reservations.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucune réservation trouvée pour ce propriétaire." });
    }

    res.json(reservations);
  } catch (err) {
    res.status(500).json({
      error: "Erreur lors de la récupération des réservations du propriétaire.",
    });
  }
};

// Récupérer les réservations d'un client
const getReservationsByClient = async (req, res) => {
  const { clientId } = req.params;

  try {
    const reservations = await Reservation.find({ clientId }).lean();
    if (!reservations || reservations.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucune réservation trouvée pour ce client." });
    }

    res.json(reservations);
  } catch (err) {
    res.status(500).json({
      error: "Erreur lors de la récupération des réservations du client.",
    });
  }
};

// CREATE RESERVATION
const createReservation = async (req, res) => {
  const { clientId, ownerId, offerId } = req.body;

  if (!clientId || !ownerId || !offerId) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
    // Vérifier si l'offre existe
    const offer = await Offer.findById(offerId);
    if (!offer) {
      return res.status(404).json({ message: "Offre introuvable." });
    }

    // Créer la réservation
    const newReservation = new Reservation({
      clientId,
      ownerId,
      offerId,
      status: "Invalider",
    });

    const savedReservation = await newReservation.save();

    const owner = await User.findOne({ _id: ownerId }).exec();

    const emailContent = `Un utilisateur a demandé une réservation pour votre offre intitulé: ${offer.titre}`;
    const emailSubject = "Nouvelle demande de réservation";

    sendEmail(owner.email, emailContent, emailSubject);

    res.status(201).json(savedReservation);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Erreur lors de la création de la réservation." });
  }
};

// Supprimer une réservation
const deleteReservation = async (req, res) => {
  const { reservationId } = req.params;

  try {
    const deleted = await Reservation.findByIdAndDelete(reservationId);

    if (!deleted) {
      return res.status(404).json({ message: "Réservation introuvable." });
    }

    res.json({
      message: "Réservation supprimée avec succès.",
      reservation: deleted,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de la réservation." });
  }
};

// next 3 functions to update status
const setReservationToPendingPayment = async (req, res) => {
  await updateStatus(req, res, "En attente de paiement");
};

const setReservationToValider = async (req, res) => {
  await updateStatus(req, res, "Valider");
};

const updateStatus = async (req, res, newStatus) => {
  const { reservationId } = req.params;

  try {
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: "Réservation introuvable." });
    }

    reservation.status = newStatus;
    await reservation.save();

    res.json({ message: `Statut mis à jour : ${newStatus}`, reservation });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la mise à jour du statut." });
  }
};

const sendEmail = async (ownerEmail, content, subject) => {
  try {
    if (!ownerEmail) {
      throw new Error("no owner founded");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bouzidyassine08@gmail.com",
        pass: "ahsj mikl mhhh xkhd",
      },
    });

    const mailOptions = {
      from: "bouzidyassine08@gmail.com",
      to: ownerEmail,
      subject: subject,
      text: content,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("email sent to:", distinationEmail);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = {
  getAllReservations,
  createReservation,
  setReservationToPendingPayment,
  setReservationToValider,
};
