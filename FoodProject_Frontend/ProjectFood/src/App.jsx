
import { Routes, Route } from "react-router-dom";

import Login from "./Component/Login";
import AdminDashboard from "./Pages/AdminDashboard";
import DonorDashboard from "./Pages/DonorDashboard";
import ReceiverDashboard from "./Pages/ReceiverDashboard";
import VolunteerDashboard from "./Pages/VolunteerDashboard";
import ForgotPassword from "./Pages/ForgotPassword";
import Register from "./Component/Register";
import CreateDonation from "./Pages/donor/CreateDonation";
import DonationSubmitted from "./Pages/donor/DonationSubmitted";
function App() {
  return (
    <Routes>
       <Route path="/" element={<Login />} />
       <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/donor" element={<DonorDashboard />} />
      <Route path="/receiver" element={<ReceiverDashboard />} />
      <Route path="/volunteer" element={<VolunteerDashboard />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/register" element={<Register />} />
    <Route path="/donor/create-donation" element={<CreateDonation />} />
    <Route path="/donor/donation-submitted" element={<DonationSubmitted />}
/>
    </Routes>
  );
}

export default App;