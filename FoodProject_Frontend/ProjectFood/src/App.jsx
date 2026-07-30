// import { Routes, Route } from "react-router-dom";

// import Login from "./Component/Login";
// import AdminDashboard from "./Pages/admin/AdminDashboard";
// import DonorDashboard from "./Pages/donor/DonorDashboard";
// import ReceiverDashboard from "./Pages/ReceiverDashboard";
// import VolunteerDashboard from "./Pages/VolunteerDashboard";
// import ForgotPassword from "./Pages/ForgotPassword";
// import Register from "./Component/Register";
// import CreateDonation from "./Pages/donor/CreateDonation";
// import DonationSubmitted from "./Pages/donor/DonationSubmitted";
// import DonationHistory from "./Pages/donor/DonationHistory";
// import DonationDetail from "./Pages/donor/DonationDetail";

// function App() {

//   return (
//     <Routes>
// <Route path="/"  element={<Login />} />
//       <Route  path="/login"  element={<Login />}  />
//       <Route  path="/admin" element={<AdminDashboard />}  />
//       <Route   path="/donor" element={<DonorDashboard />} />
// <Route  path="/receiver"  element={<ReceiverDashboard />}   />
//   <Route   path="/volunteer" element={<VolunteerDashboard />}  />
// <Route   path="/forgot-password"  element={<ForgotPassword />} />
//  <Route  path="/register"  element={<Register />}    />
//   <Route      path="/donor/create-donation"  element={<CreateDonation />} />
// <Route   path="/donor/donation-submitted" element={<DonationSubmitted />} />
//  <Route   path="/donor/history"   element={<DonationHistory />}  />
//  <Route  path="/donation-details/:id"   element={<DonationDetail />} />
//  </Routes>
//   );
// }
// export default App;


import { Routes, Route } from "react-router-dom";

import Login from "./Component/Login";
//import AdminDashboard from "./Pages/admin/AdminDashboard";
import DonorDashboard from "./Pages/donor/DonorDashboard";
import ReceiverDashboard from "./Pages/ReceiverDashboard";
import VolunteerDashboard from "./Pages/VolunteerDashboard";
import ForgotPassword from "./Pages/ForgotPassword";
import Register from "./Component/Register";
import CreateDonation from "./Pages/donor/CreateDonation";
import DonationSubmitted from "./Pages/donor/DonationSubmitted";
import DonationHistory from "./Pages/donor/DonationHistory";
import DonationDetails from "./Pages/donor/DonationDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* #<Route path="/admin" element={<AdminDashboard />} /> */}
      <Route path="/donor" element={<DonorDashboard />} />
      <Route path="/receiver" element={<ReceiverDashboard />} />
      <Route path="/volunteer" element={<VolunteerDashboard />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/register" element={<Register />} />

      <Route path="/donor/create-donation" element={<CreateDonation />} />
      <Route path="/donor/donation-submitted" element={<DonationSubmitted />} />
      <Route path="/donor/history" element={<DonationHistory />} />    
<Route  path="/donor/donation-details/:id"element={<DonationDetails />}/>    
    </Routes>
  );
}

export default App;