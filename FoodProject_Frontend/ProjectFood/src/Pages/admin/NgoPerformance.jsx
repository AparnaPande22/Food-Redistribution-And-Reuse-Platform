function NgoPerformance(){

const ngos=[

{
name:"Hope Foundation",
meals:1200
},

{
name:"Smile Trust",
meals:980
},

{
name:"Food For All",
meals:870
}

];

return(

<div className="table-card">

<h2>Top NGO Partners</h2>

{

ngos.map((ngo,index)=>(

<div className="ngo-card" key={index}>

<div>

<h4>{ngo.name}</h4>

</div>

<span>{ngo.meals} Meals</span>

</div>

))

}

</div>

)

}

export default NgoPerformance;