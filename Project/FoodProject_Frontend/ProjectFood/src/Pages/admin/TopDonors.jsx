function TopDonors() {

const donors=[

{name:"Hotel Taj", meals:4200},

{name:"ITC Hotels", meals:3100},

{name:"Domino's", meals:2850},

{name:"Wedding Palace", meals:2700},

{name:"McDonald's", meals:2200}

];

return(

<div className="table-card">

<h2>Top Donors</h2>

{
donors.map((d,index)=>(

<div className="leaderboard" key={index}>

<div>

<h4>{d.name}</h4>

</div>

<strong>{d.meals} Meals</strong>

</div>

))
}

</div>

)

}

export default TopDonors;