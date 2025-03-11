
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BarChart2, Settings, Menu, X } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { icon: Home, label: "Tasks", path: "/" },
    { icon: BarChart2, label: "Analytics", path: "/analytics" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <nav className="hidden md:block w-64 bg-white border-r border-gray-100 shadow-sm">
        <div className="h-full flex flex-col">
          <div className="p-6">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                TaskMaster
              </h1>
            </div>
          </div>
          
          <div className="flex-1 py-6">
            <div className="space-y-1 px-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-primary text-white font-medium shadow-md"
                        : "hover:bg-gray-50 text-gray-700 hover:text-primary"
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="p-4 m-3 border border-gray-100 rounded-lg bg-gray-50">
            <p className="text-xs text-gray-500">
              TaskMaster Pro
              <span className="text-xs ml-1 bg-primary/10 text-primary px-1.5 py-0.5 rounded">v1.0</span>
            </p>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-white shadow-md text-gray-700 hover:text-primary"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40 animate-fadeIn">
          <div className="absolute top-0 left-0 h-full w-64 bg-white shadow-xl animate-slideIn">
            <div className="p-6">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  TaskMaster
                </h1>
              </div>
            </div>
            
            <div className="py-6">
              <div className="space-y-1 px-3">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? "bg-primary text-white font-medium shadow-md"
                          : "hover:bg-gray-50 text-gray-700 hover:text-primary"
                      }`}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                      {isActive && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 pt-16 md:pt-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
