import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    Tooltip
} from "recharts";

const data = [
    { month: "Jan", meals: 80 },
    { month: "Feb", meals: 120 },
    { month: "Mar", meals: 95 },
    { month: "Apr", meals: 150 },
    { month: "May", meals: 180 },
    { month: "Jun", meals: 220 }
];

function MonthlyChart() {
    return (
        <div className="chart-card">

            <h2>Monthly Performance</h2>

            <p>Impact trajectory over the last 6 months</p>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="month"/>
                    <Tooltip/>
                    <Bar
                        dataKey="meals"
                        fill="#0b4b36"
                        radius={[5,5,0,0]}
                    />
                </BarChart>
            </ResponsiveContainer>

        </div>
    );
}

export default MonthlyChart;