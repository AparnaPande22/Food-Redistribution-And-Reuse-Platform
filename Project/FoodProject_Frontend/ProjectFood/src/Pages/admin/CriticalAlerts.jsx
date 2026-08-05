import {
    FaExclamationTriangle,
    FaTruck,
    FaClipboardCheck
} from "react-icons/fa";

function CriticalAlerts() {

    const alerts = [

        {
            icon:<FaTruck/>,
            title:"Delayed Delivery",
            desc:"Driver stuck in traffic",
            color:"#e74c3c"
        },

        {
            icon:<FaExclamationTriangle/>,
            title:"Unassigned Request",
            desc:"Community Kitchen",
            color:"#f39c12"
        },

        {
            icon:<FaClipboardCheck/>,
            title:"Policy Update Pending",
            desc:"3 Vendors",
            color:"#16a085"
        }

    ];

    return (

        <div className="alerts-card">

            <div className="header">

                <h2>Critical Alerts</h2>

                <span>3 ACTIVE</span>

            </div>

            {

                alerts.map((item,index)=>(

                    <div
                        className="alert-box"
                        key={index}
                    >

                        <div
                            className="alert-icon"
                            style={{color:item.color}}
                        >
                            {item.icon}
                        </div>

                        <div>

                            <h4>{item.title}</h4>

                            <p>{item.desc}</p>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default CriticalAlerts;