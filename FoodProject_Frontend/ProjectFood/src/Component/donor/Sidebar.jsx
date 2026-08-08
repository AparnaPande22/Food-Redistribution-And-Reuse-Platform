function Sidebar() {
    return (
        <div className="donor-sidebar">

            <div className="sidebar-brand">
                <h2>Beyond Waste</h2>
            </div>

            <div className="sidebar-menu">
                <p>Dashboard</p>
                <p>Create Donation</p>
                <p>History</p>
                <p>Impact</p>
                <p>Settings</p>
            </div>

            <div className="sidebar-bottom">
                <button>Sign Out</button>
            </div>

        </div>
    );
}

export default Sidebar;