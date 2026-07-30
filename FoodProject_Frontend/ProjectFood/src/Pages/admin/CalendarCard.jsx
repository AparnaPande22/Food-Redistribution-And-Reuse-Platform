function CalendarCard(){

    const today = new Date();

    return(

        <div className="calendar-card">

            <h2>Today's Date</h2>

            <h1>{today.getDate()}</h1>

            <h3>

                {today.toLocaleDateString("en-US",{
                    weekday:"long",
                    month:"long",
                    year:"numeric"
                })}

            </h3>

            <p>

                Scheduled Pickups : 12

            </p>

            <p>

                Deliveries : 18

            </p>

        </div>

    );

}

export default CalendarCard;