import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Delivered", value: 72 },
  { name: "Pending", value: 18 },
  { name: "Cancelled", value: 10 },
];

const COLORS = ["#2ecc71", "#f39c12", "#e74c3c"];

function DonationStatusChart() {
  return (
    <div className="chart-card">
      <h2>Donation Status</h2>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={90}
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DonationStatusChart;