"use client"

import { ArrowUp, Package, ShoppingCart, Users, HelpCircle, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { useEffect, useState } from "react"
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

interface DashboardData {
  orders: {
    total: number;
    today: number;
    growth: string;
  };
  customers: {
    total: number;
    today: number;
    growth: string;
  };
  enquiries: {
    total: number;
    today: number;
    resolved: number;
    growth: string;
  };
  charts: {
    topSellingProducts: Array<{ name: string; value: number }>;
    topInquiryProducts: Array<{ name: string; value: number }>;
  };
}

interface IndexProps {
  token: string;
}

const Index = ({ token }: IndexProps) => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/dashboard`, {
        headers: { token }
      });
      
      if (response.data.success) {
        setDashboardData(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  // Custom colors for the charts
  const chartColors = {
    primary: "#4f46e5", // Indigo
    secondary: "#0ea5e9", // Sky blue
    grid: "#e2e8f0", // Slate-200
    text: "#475569", // Slate-600
  };

  // Custom tooltip styles
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-sm text-gray-600">
            {payload[0].name}: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  const calculateResolutionRate = (data: DashboardData | null): string => {
    if (!data || !data.enquiries || !data.enquiries.total || !data.enquiries.resolved) {
      return '0';
    }
    return ((data.enquiries.resolved / data.enquiries.total) * 100).toFixed(1);
  };

  const SkeletonCard = () => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
      </CardHeader>
      <CardContent>
        <div className="h-8 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
      </CardContent>
    </Card>
  );

  const SkeletonChart = () => (
    <Card>
      <CardHeader>
        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] bg-gray-100 rounded animate-pulse"></div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="space-y-8 p-8 max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between">
          <div className="h-9 w-64 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <SkeletonChart />
          <SkeletonChart />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard Overview</h2>
        <button 
          onClick={() => fetchDashboardData()}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Refresh Data
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{dashboardData?.orders.total || 0}</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUp className="mr-1 h-3 w-3" />
              <span>{dashboardData?.orders.growth}% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today Orders</CardTitle>
            <Package className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{dashboardData?.orders.today || 0}</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUp className="mr-1 h-3 w-3" />
              <span>{dashboardData?.orders.growth}% increase</span>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers Today</CardTitle>
            <Users className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{dashboardData?.customers.today || 0}</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUp className="mr-1 h-3 w-3" />
              <span>{dashboardData?.customers.growth}% increase</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enquiries</CardTitle>
            <HelpCircle className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{dashboardData?.enquiries.total || 0}</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUp className="mr-1 h-3 w-3" />
              <span>{dashboardData?.enquiries.growth}% from last week</span>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today Enquiries</CardTitle>
            <HelpCircle className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{dashboardData?.enquiries.today || 0}</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUp className="mr-1 h-3 w-3" />
              <span>New enquiries today</span>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enquiries Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{dashboardData?.enquiries.resolved || 0}</div>
            <div className="flex items-center text-xs text-green-600">
              {dashboardData?.enquiries.total && dashboardData.enquiries.total > 0 && (
                <span>
                  {calculateResolutionRate(dashboardData)}% resolution rate
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">Top Selling Products</CardTitle>
            <CardDescription className="text-gray-600">
              {currentMonth}'s best performing products
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart 
                data={dashboardData?.charts.topSellingProducts || []} 
                layout="vertical" 
                margin={{ left: 100, right: 20, top: 20, bottom: 20 }}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={chartColors.grid}
                  horizontal={false}
                />
                <XAxis 
                  type="number"
                  tick={{ fill: chartColors.text }}
                  axisLine={{ stroke: chartColors.grid }}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  tick={{ fill: chartColors.text, fontSize: 12 }}
                  axisLine={{ stroke: chartColors.grid }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ 
                    paddingTop: "20px",
                    fontSize: "14px"
                  }} 
                />
                <Bar 
                  dataKey="value" 
                  name="Units Sold" 
                  fill={chartColors.primary}
                  radius={[0, 4, 4, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">Product Inquiries</CardTitle>
            <CardDescription className="text-gray-600">
              Most inquired products this {currentMonth}
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart 
                data={dashboardData?.charts.topInquiryProducts || []} 
                layout="vertical" 
                margin={{ left: 100, right: 20, top: 20, bottom: 20 }}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={chartColors.grid}
                  horizontal={false}
                />
                <XAxis 
                  type="number"
                  tick={{ fill: chartColors.text }}
                  axisLine={{ stroke: chartColors.grid }}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  tick={{ fill: chartColors.text, fontSize: 12 }}
                  axisLine={{ stroke: chartColors.grid }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ 
                    paddingTop: "20px",
                    fontSize: "14px"
                  }} 
                />
                <Bar 
                  dataKey="value" 
                  name="Inquiry Count" 
                  fill={chartColors.secondary}
                  radius={[0, 4, 4, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;

