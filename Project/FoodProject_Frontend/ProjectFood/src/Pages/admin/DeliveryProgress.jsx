function DeliveryProgress(){

return(

<div className="table-card">

<h2>Today's Deliveries</h2>

<div className="progress-item">

<p>Completed</p>

<progress value="84" max="100"></progress>

<span>84%</span>

</div>

<div className="progress-item">

<p>Pending</p>

<progress value="16" max="100"></progress>

<span>16%</span>

</div>

</div>

)

}

export default DeliveryProgress;