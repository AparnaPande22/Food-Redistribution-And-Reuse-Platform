import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend
} from "recharts";

const data = [

    {
        name:"Donors",
        value:72
    },

    {
        name:"Community Partners",
        value:28
    }

];

const COLORS = ["#0b4b36","#d26d32"];

function PartnerAcquisition(){

    return(

        <div className="pie-card">

            <h2>Partner Acquisition</h2>

            <ResponsiveContainer
                width="100%"
                height={280}
            >

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        outerRadius={90}
                    >

                        {

                            data.map((entry,index)=>(

                                <Cell
                                    key={index}
                                    fill={COLORS[index]}
                                />

                            ))

                        }

                    </Pie>

                    <Legend/>

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default PartnerAcquisition;