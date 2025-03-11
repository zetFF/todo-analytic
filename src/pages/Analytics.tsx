
import { useTaskContext } from "../context/TaskContext";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const Analytics = () => {
  const { tasks } = useTaskContext();

  const completionData = [
    {
      name: "Completed",
      value: tasks.filter((t) => t.completed).length,
    },
    {
      name: "Pending",
      value: tasks.filter((t) => !t.completed).length,
    },
  ];

  const COLORS = ["#10B981", "#EF4444"];
  const RADIAN = Math.PI / 180;
  
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const categoryData = Array.from(
    tasks.reduce((acc, task) => {
      acc.set(task.category, (acc.get(task.category) || 0) + 1);
      return acc;
    }, new Map())
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Analytics</h1>
        <p className="text-gray-500">Track your productivity</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-card lg:col-span-1">
          <div className="text-center">
            <h3 className="text-4xl font-bold text-gray-900">{tasks.length}</h3>
            <p className="text-gray-500 mt-1">Total Tasks</p>
          </div>
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
            <div className="text-center">
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-lg font-medium text-success">
                {tasks.filter(t => t.completed).length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-lg font-medium text-red-500">
                {tasks.filter(t => !t.completed).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-card lg:col-span-3">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Task Completion Rate</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={completionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {completionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      strokeWidth={1}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} Tasks`, '']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-card lg:col-span-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Tasks by Category</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} Tasks`, '']} />
                <Legend />
                <Bar 
                  dataKey="value" 
                  fill="#6366F1"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
