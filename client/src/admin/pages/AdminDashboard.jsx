import { Users, Store, Home, DollarSign } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useAppContext } from '../../context/AppContext';
import {useState, useEffect} from 'react';

export default function AdminDashboard() {


  const [today, setToday] = useState("");
  

  const {rentals, products, sellers} = useAppContext();

  const data = [
    { day: "Today", sellers: sellers.length, products: products.length, rentals: rentals.length, revenue: 0 },
  ];


  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Admin Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Users */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Sellers
            </h2>
            <Users className="h-5 w-5 text-indigo-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {sellers.length}
          </p>
        </div>

        {/* Sellers */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Products
            </h2>
            <Store className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {products.length}
          </p>
        </div>

        {/* Rentals */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Rentals
            </h2>
            <Home className="h-5 w-5 text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {rentals.length}
          </p>
        </div>

        {/* Revenue */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Revenue
            </h2>
            <DollarSign className="h-5 w-5 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            Ksh 0
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          User Growth & Revenue
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#6366F1" strokeWidth={2} />
              <Line type="monotone" dataKey="sellers" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="rentals" stroke="#F97316" strokeWidth={2} />
              <Line type="monotone" dataKey="revenue" stroke="#059669" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
