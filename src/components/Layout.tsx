
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BarChart2, Settings } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: "Tasks", path: "/" },
    { icon: BarChart2, label: "Analytics", path: "/analytics" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <nav className="w-64 border-r border-gray-200 p-4 space-y-4">
        <div className="flex items-center space-x-2 mb-8">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">T</span>
          </div>
          <h1 className="text-xl font-bold">TaskMaster</h1>
        </div>
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
};

export default Layout;
