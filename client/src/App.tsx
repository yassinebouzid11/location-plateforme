import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import { Navbar } from "./components/NavBar"
import Home from "./pages/Home"
import ContactPage from "./pages/Contacts"
import Offres from "./pages/Offres"
import OfferDetails from "./pages/OfferDetails"
import CreateOffer from "./pages/CreateOffer"
import AdminLayout from "./pages/admin/AdminLayout"
import ManageOffers from "./pages/admin/ManageOffers"
import ManageUsers from "./pages/admin/ManageUsers"
import ManageOffersRequest from "./pages/admin/ManageOffersRequest"
import OfferRequestDetails from "./pages/admin/OfferRequestDetails"
import AdminOfferDetails from "./pages/admin/AdminOfferDetails"
import { MessagesPage } from "./pages/messages/MessagesPage"
import { ConversationPanel } from "./components/messages/ConversationPanel"
import ReservationLayout from "./pages/reservation/ReservationLayout"
import ReservationRequest from "./pages/reservation/ReservationRequest"
import ReservationReceve from "./pages/reservation/ReservationReceve"
import RequestedReservationDetails from "./pages/reservation/RequestedReservationDetails"



function App() {

  const defaultConversationId=1
  return (
    <Router>
      <Navbar />
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/contacts" element={<ContactPage />} />
        <Route path="/offres" element={<Offres />} />
        <Route path="/createoffer" element={<CreateOffer />} />
        <Route path="/offredetails/:id" element={<OfferDetails />} />

        <Route path="/messages" element={<MessagesPage />}>
          <Route index element={<Navigate to={`conversation/${defaultConversationId}`}  />} />
          <Route path="conversation/:conversationId" element={<ConversationPanel />} />
        </Route>
        
        <Route path="/reservation" element={<ReservationLayout />}>
          <Route index element={<Navigate to={"/reservation/requested"}  />} />
          <Route path="requested" element={<ReservationRequest />} />
          <Route path="request-details/:id" element={<RequestedReservationDetails />} />
          <Route path="receved" element={<ReservationReceve />} />
          <Route path="recived-request-details/:id" element={<RequestedReservationDetails />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to={"/admin/users"} />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="offers" element={<ManageOffers />} />
          <Route path="offers-details/:id" element={<AdminOfferDetails />} />
          <Route path="offer-requests" element={<ManageOffersRequest/>} />
          <Route path="offer-requests-details/:id" element={<OfferRequestDetails/>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
