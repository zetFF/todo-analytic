
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

  const COLORS = ["#22C55E", "#EF4444"];

  const categoryData = Array.from(
    tasks.reduce((acc, task) => {
      acc.set(task.category, (acc.get(task.category) || 0) + 1);
      return acc;
    }, new Map())
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-gray-600">Track your productivity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Task Completion</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={completionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {completionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Tasks by Category</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0EA5E9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
