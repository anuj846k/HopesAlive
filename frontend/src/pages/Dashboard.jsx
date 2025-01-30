import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import DashboardLayout from "../DashboardCompo/DashboardLayout";
import StatsCards from "../DashboardCompo/StatsCards";
import RecentIncidents from "../DashboardCompo/RecentIncidents";
import IncidentMap from "../DashboardCompo/IncidentMap";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const [ngoProfile, setNgoProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNgoProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://hopesalive-zh55.onrender.com/api/ngo/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          setNgoProfile(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch NGO profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNgoProfile();
  }, []);

  // Only show dashboard overview content on the index route
  const isDashboardIndex = location.pathname === "/dashboard";

  // const quickActions = [
  //   {
  //     title: "Report Incident",
  //     description: "Report a new animal in need",
  //     icon: "🆘",
  //     link: "/dashboard/report",
  //     color: "blue",
  //   },
  //   {
  //     title: "View Incidents",
  //     description: "Check all reported cases",
  //     icon: "📋",
  //     link: "/dashboard/incidents",
  //     color: "purple",
  //   },
  //   {
  //     title: "Notifications",
  //     description: "Check your notifications",
  //     icon: "🔔",
  //     link: "/dashboard/notifications",
  //     color: "yellow",
  //   },
  // ];

  if (isDashboardIndex && loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {isDashboardIndex ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Welcome Section */}
          <div className="bg-gradient-to-r bg-orange-50 rounded-xl p-6 border border-orange-100">
            <div className="max-w-3xl">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {ngoProfile?.name || "Animal Hero"}! 👋
              </h1>
              <p className="text-gray-600">
                Your dedication to helping animals makes a real difference.
                Here&apos;s your latest overview.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <StatsCards />
          </div>

          {/* Recent Incidents Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <RecentIncidents />
          </div>

          {/* Map Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold mb-4">Incident Map</h2>
            <IncidentMap />
          </div>
        </motion.div>
      ) : (
        <Outlet />
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
