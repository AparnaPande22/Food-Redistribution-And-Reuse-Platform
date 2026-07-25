function TopNavbar() {
    return (
        <div
            style={{
                height: "70px",
                background: "#fff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 30px",
                borderBottom: "1px solid #ddd"
            }}
        >
            <h3>Donations</h3>

            <div>👤 Donor</div>
        </div>
    );
}

export default TopNavbar;