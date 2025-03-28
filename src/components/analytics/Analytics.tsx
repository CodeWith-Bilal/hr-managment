"use client";
import { Users, CalendarCheck, Briefcase, FileText } from "lucide-react";
import { useAnalyticsData } from "./useAnalytics";
import LottieAnimation from "../lottieAnimation/LottieAnimation";
import { StatCardProps } from "@/types/types";

const Analytics = () => {
  const {
    employeeCount,
    leaveCount,
    attendanceCount,
    projectCount,
    updateDates,
    loading,
  } = useAnalyticsData();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-customBlack">
        <LottieAnimation />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <StatCard
        icon={<Users size={25} className="text-orange-500" />}
        title="Total Employees"
        count={employeeCount}
        updateDate={updateDates?.employees}
        percentage={12}
      />

      <StatCard
        icon={<Briefcase size={25} className="text-orange-500" />}
        title="Total Leaves"
        count={leaveCount}
        updateDate={updateDates?.leaves}
        percentage={5}
      />

      <StatCard
        icon={<CalendarCheck size={25} className="text-orange-500" />}
        title="Today Attendance"
        count={attendanceCount}
        updateDate={updateDates?.attendance}
        percentage={-8}
      />

      <StatCard
        icon={<FileText size={25} className="text-orange-500" />}
        title="Total Projects"
        count={projectCount}
        updateDate={updateDates?.projects}
        percentage={12}
      />
    </div>
  );
};



const StatCard = ({
  icon,
  title,
  count,
  updateDate,
  percentage,
}: StatCardProps) => {
  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 shadow-md flex flex-col justify-between">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-md">{icon}</div>
        <h3 className="dark:text-white text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-4xl font-bold dark:text-white mt-3 border-b border-gray-300 dark:border-gray-700">
        {count}
      </p>
      <div className="flex justify-between items-center mt-4 ">
        <p className="dark:text-gray-400 text-sm">Update: {updateDate}</p>
        <div
          className={`text-sm px-2 py-1 rounded-md ${
            percentage >= 0 ? "bg-green-500" : "bg-red-500"
          } dark:text-white`}
        >
          {percentage >= 0 ? `▲ ${percentage}%` : `▼ ${Math.abs(percentage)}%`}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
