function LatestUsers() {

    const users = [

        {
            name:"Aparna Pande",
            role:"Donor"
        },

        {
            name:"Rahul Sharma",
            role:"Volunteer"
        },

        {
            name:"Hope Foundation",
            role:"NGO"
        },

        {
            name:"Hotel Taj",
            role:"Partner"
        }

    ];

    return(

        <div className="table-card">

            <h2>Recently Registered Users</h2>

            <table>

                <thead>

                    <tr>

                        <th>Name</th>

                        <th>Role</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        users.map((user,index)=>(

                            <tr key={index}>

                                <td>{user.name}</td>

                                <td>{user.role}</td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default LatestUsers;