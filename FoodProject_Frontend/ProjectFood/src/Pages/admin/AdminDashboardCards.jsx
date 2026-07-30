// import {
//     FaUtensils,
//     FaDonate,
//     FaClipboardCheck,
//     FaClock,
//     FaLeaf,
//     FaTruck
// } from "react-icons/fa";

// function AdminDashboardCards() {

//     const cards = [

//         {
//             title: "Meals Served",
//             value: "142,500",
//             icon: <FaUtensils />,
//             color: "#0b5d3b"
//         },

//         {
//             title: "Active Donations",
//             value: "84",
//             icon: <FaDonate />,
//             color: "#e67e22"
//         },

//         {
//             title: "Requirements",
//             value: "56",
//             icon: <FaClipboardCheck />,
//             color: "#2ecc71"
//         },

//         {
//             title: "Pending Approvals",
//             value: "12",
//             icon: <FaClock />,
//             color: "#c0392b"
//         },

//         {
//             title: "Waste Diverted",
//             value: "420 Tons",
//             icon: <FaLeaf />,
//             color: "#16a085"
//         },

//         {
//             title: "Delivery Success",
//             value: "98.4%",
//             icon: <FaTruck />,
//             color: "#27ae60"
//         }

//     ];

//     return (

//         <div className="cards">

//             {

//                 cards.map((card, index) => (

//                     <div
//                         className="card"
//                         key={index}
//                     >

//                         <div
//                             className="icon"
//                             style={{color:card.color}}
//                         >
//                             {card.icon}
//                         </div>

//                         <h4>{card.title}</h4>

//                         <h2>{card.value}</h2>

//                     </div>

//                 ))

//             }

//         </div>

//     );

// }

// export default DashboardCards;
