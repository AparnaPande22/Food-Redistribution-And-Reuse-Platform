import { Routes, Route } from "react-router-dom";
import Login from "./Component/Login";
import AdminDashboard from "./Pages/admin/AdminDashboard";
import Users from "./Pages/admin/Users";
import PendingUsers from "./Pages/admin/PendingUsers";
import AdminMatchingQueuePage from "./Pages/admin/AdminMatchingQueuePage";
import AdminDonationsPage from "./Pages/admin/AdminDonationsPage";
import AdminDeliveriesPage from "./Pages/admin/AdminDeliveriesPage";
import AdminReportsPage from "./Pages/admin/AdminReportsPage";
import DonationMap from "./pages/admin/DonationMap";
import DonorDashboard from "./Pages/donor/DonorDashboard";
import ReceiverDashboard from "./Pages/ReceiverDashboard";
import VolunteerDashboard from "./Pages/VolunteerDashboard";
import ForgotPassword from "./Pages/ForgotPassword";
import Register from "./Component/Register";
import CreateDonation from "./Pages/donor/CreateDonation";
import DonationSubmitted from "./Pages/donor/DonationSubmitted";
import DonationHistory from "./Pages/donor/DonationHistory";
import DonationDetails from "./Pages/donor/DonationDetails";
import Payment from "./Pages/Industry/Payment";
import IndustryDashboard from "./Pages/Industry/IndustryDashboard";
import RequestDetails from "./Pages/industry/RequestDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route
        path="/admin/users"
        element={<Users />}
      />
      <Route
        path="/admin/pending-users"
        element={<PendingUsers />}
      />
      <Route path="/admin/pending-requests" element={<AdminDashboard />} />
      <Route path="/admin/matching-queue" element={<AdminMatchingQueuePage />} />
      <Route path="/admin/donations" element={<AdminDonationsPage />} />
      <Route path="/admin/deliveries" element={<AdminDeliveriesPage />} />
      <Route path="/admin/reports" element={<AdminReportsPage />} />
      <Route
        path="/admin/map"
        element={<DonationMap />}
      />


      <Route path="/donor" element={<DonorDashboard />} />
      <Route path="/receiver" element={<ReceiverDashboard />} />
      <Route path="/volunteer" element={<VolunteerDashboard />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/register" element={<Register />} />

      <Route path="/donor/create-donation" element={<CreateDonation />} />
      <Route path="/donor/donation-submitted" element={<DonationSubmitted />} />
      <Route path="/donor/history" element={<DonationHistory />} />
      <Route path="/donor/donation-details/:id" element={<DonationDetails />} />

      <Route path="/Payment" element={<Payment />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/industry" element={<IndustryDashboard />} />
      <Route path="/industry/request/:id" element={<RequestDetails />} />
    </Routes>
  );
}

export default App;