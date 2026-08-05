import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

const data = [
  { day: "Mon", meals: 180 },
  { day: "Tue", meals: 250 },
  { day: "Wed", meals: 210 },
  { day: "Thu", meals: 320 },
  { day: "Fri", meals: 410 },
  { day: "Sat", meals: 520 },
  { day: "Sun", meals: 470 },
];

function WeeklyDonationChart() {
  return (
    <div className="chart-card">
      <h2>Weekly Donation Trend</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="meals"
            stroke="#0b4b36"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WeeklyDonationChart;