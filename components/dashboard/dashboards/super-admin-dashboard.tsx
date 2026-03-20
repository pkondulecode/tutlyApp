"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Building2, Users, DollarSign, TrendingUp, Search, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react"
import { coachingInstitutes, subscriptionPlans } from "@/lib/dummy-data"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Button } from "@/components/ui/button"

const revenueData = [
  { month: "Oct", revenue: 380000 },
  { month: "Nov", revenue: 420000 },
  { month: "Dec", revenue: 350000 },
  { month: "Jan", revenue: 480000 },
  { month: "Feb", revenue: 520000 },
  { month: "Mar", revenue: 450000 },
]

const planDistribution = [
  { name: "Premium", value: 45, color: "#725ef1" },
  { name: "Standard", value: 30, color: "#7d3ced" },
  { name: "Basic", value: 25, color: "#9da1f2" },
]

function ModernStatCard({ title, value, icon: Icon, trend, description }: { title: string, value: string | number, icon: any, trend?: { value: number, label: string }, description?: string }) {
  const isPositive = trend && trend.value >= 0
  return (
    <Card className="hover:-translate-y-1 hover:shadow-xl transition-all duration-300 border-none shadow-md bg-white rounded-2xl relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#725ef1] to-[#7d3ced] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{title}</CardTitle>
        <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
          <Icon className="h-5 w-5 text-[#725ef1]" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-extrabold text-gray-900 mb-1">{value}</div>
        {trend && (
          <p className="flex items-center text-sm mt-2 font-medium">
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-bold mr-2 ${isPositive ? 'bg-indigo-100 text-indigo-700' : 'bg-red-100 text-red-700'}`}>
              {isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
              {Math.abs(trend.value)}%
            </span>
            <span className="text-gray-400">{trend.label}</span>
          </p>
        )}
        {description && <p className="text-xs text-gray-400 mt-1">{description}</p>}
      </CardContent>
    </Card>
  )
}

export function SuperAdminDashboard() {
  const totalCoaching = coachingInstitutes.length
  const totalStudents = coachingInstitutes.reduce((sum, c) => sum + c.students, 0)
  const totalRevenue = coachingInstitutes.reduce((sum, c) => sum + c.revenue, 0)
  const activeCoaching = coachingInstitutes.filter((c) => c.status === "active").length

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in-50 duration-500 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Platform Overview</h1>
          <p className="text-gray-500 font-medium mt-1">Welcome back, Super Admin</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex justify-center items-center gap-2 py-2.5 px-6 border border-transparent rounded-xl shadow-lg shadow-[#725ef1]/25 text-sm font-bold text-white bg-gradient-to-r from-[#725ef1] to-[#7d3ced] hover:from-[#634ed1] hover:to-[#6d2ed9] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 tracking-wide">
            Download Global Report
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <ModernStatCard
          title="Total Institutes"
          value={totalCoaching}
          icon={Building2}
          trend={{ value: 12, label: "vs last month" }}
        />
        <ModernStatCard
          title="Active Institutes"
          value={activeCoaching}
          icon={Activity}
          trend={{ value: 8, label: "vs last month" }}
        />
        <ModernStatCard
          title="Total Students"
          value={totalStudents.toLocaleString()}
          icon={Users}
          trend={{ value: 15, label: "vs last month" }}
        />
        <ModernStatCard
          title="Platform Revenue"
          value={`Rs. ${(totalRevenue / 100000).toFixed(1)}L`}
          icon={DollarSign}
          trend={{ value: 18, label: "vs last month" }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4 border-none shadow-md rounded-2xl bg-white hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-6 pt-6 px-6">
            <div className="space-y-1">
              <CardTitle className="text-lg font-bold text-gray-900">Revenue Trend</CardTitle>
              <CardDescription className="text-gray-500 font-medium">Monthly platform revenue (in thousands)</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPlatformRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#725ef1" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#7d3ced" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                  <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} dx={-10} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "none", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)", fontWeight: 600 }}
                    itemStyle={{ color: "#111827", fontWeight: 700 }}
                    formatter={(value: number) => [`Rs. ${value.toLocaleString()}`, "Revenue"]}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#725ef1" strokeWidth={3} fillOpacity={1} fill="url(#colorPlatformRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-3 hover:shadow-lg transition-all duration-300 border-none shadow-md rounded-2xl bg-white flex flex-col">
          <CardHeader className="pb-2 pt-6 px-6">
            <CardTitle className="text-lg font-bold text-gray-900">Plan Distribution</CardTitle>
            <CardDescription className="text-gray-500 font-medium">Institutes by subscription plan (%)</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center px-6 pb-6 pt-2">
            <div className="h-[220px] w-full mt-2 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #f3f4f6", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    itemStyle={{ color: "#111827", fontWeight: 700 }}
                    formatter={(value: number) => [`${value}%`]}
                  />
                  <Pie
                    data={planDistribution}
                    innerRadius={75}
                    outerRadius={100}
                    paddingAngle={6}
                    dataKey="value"
                    stroke="none"
                  >
                    {planDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {/* Center text for pie chart */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-extrabold text-gray-900">{totalCoaching}</span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</span>
              </div>
            </div>
            <div className="mt-8 space-y-4 px-2">
              {planDistribution.map((plan) => (
                <div key={plan.name} className="flex items-center justify-between text-sm group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: plan.color }} />
                    <span className="text-gray-600 font-medium group-hover:text-gray-900 transition-colors">{plan.name}</span>
                  </div>
                  <span className="font-bold text-gray-900">{plan.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="hover:shadow-lg transition-all duration-300 border-none shadow-md rounded-2xl bg-white overflow-hidden">
        <CardHeader className="pb-5 pt-6 px-6 border-b border-gray-100 bg-gray-50/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg font-bold text-gray-900">Coaching Institutes</CardTitle>
              <CardDescription className="text-gray-500 font-medium mt-1">All registered coaching centers</CardDescription>
            </div>
            <div className="flex bg-white border border-gray-200 rounded-xl px-4 py-2.5 items-center shadow-sm focus-within:ring-2 focus-within:ring-[#725ef1] focus-within:border-transparent transition-all">
              <Search className="h-4 w-4 text-gray-400 mr-3" />
              <input placeholder="Search institutes..." className="bg-transparent border-0 outline-none text-sm w-full sm:w-64 font-medium text-gray-700 placeholder:text-gray-400" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50 hover:bg-gray-50/50 border-b border-gray-100">
                  <TableHead className="w-[250px] font-bold text-gray-500 py-4 px-6 uppercase tracking-wider text-xs">Institute Name</TableHead>
                  <TableHead className="font-bold text-gray-500 py-4 px-6 uppercase tracking-wider text-xs">Location</TableHead>
                  <TableHead className="font-bold text-gray-500 py-4 px-6 uppercase tracking-wider text-xs">Students & Teachers</TableHead>
                  <TableHead className="font-bold text-gray-500 py-4 px-6 uppercase tracking-wider text-xs">Plan</TableHead>
                  <TableHead className="font-bold text-gray-500 py-4 px-6 uppercase tracking-wider text-xs">Status</TableHead>
                  <TableHead className="text-right font-bold text-gray-500 py-4 px-6 uppercase tracking-wider text-xs">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coachingInstitutes.map((institute) => (
                  <TableRow key={institute.id} className="cursor-pointer hover:bg-slate-50 transition-colors border-b border-gray-50 last:border-0">
                    <TableCell className="font-medium py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#725ef1]/20 to-[#7d3ced]/20 flex items-center justify-center text-sm font-bold text-[#725ef1] shrink-0 border border-[#725ef1]/10">
                          {institute.name.charAt(0)}
                        </div>
                        <span className="truncate text-gray-900 font-bold">{institute.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-500 font-medium py-4 px-6">{institute.location}</TableCell>
                    <TableCell className="font-medium py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <span className="text-gray-900 font-bold">{institute.students}</span>
                          <span className="text-gray-400 text-[10px] uppercase tracking-wider">Students</span>
                        </div>
                        <div className="h-8 w-px bg-gray-200"></div>
                        <div className="flex flex-col">
                          <span className="text-gray-900 font-bold">{institute.teachers}</span>
                          <span className="text-gray-400 text-[10px] uppercase tracking-wider">Teachers</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold leading-none ${institute.plan === 'Premium' ? 'bg-[#725ef1]/10 text-[#725ef1]' :
                        institute.plan === 'Standard' ? 'bg-[#7d3ced]/10 text-[#7d3ced]' : 'bg-gray-100 text-gray-600'
                        }`}>
                        {institute.plan === 'Premium' && <span className="w-1.5 h-1.5 rounded-full bg-[#725ef1] mr-1.5"></span>}
                        {institute.plan === 'Standard' && <span className="w-1.5 h-1.5 rounded-full bg-[#7d3ced] mr-1.5"></span>}
                        {institute.plan === 'Basic' && <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-1.5"></span>}
                        {institute.plan}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold leading-none border ${institute.status === 'active'
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-red-50 text-red-700 border-red-200'
                        }`}>
                        {institute.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-bold text-gray-900 py-4 px-6">
                      Rs. {institute.revenue.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="p-5 border-t border-gray-100 text-sm font-bold text-[#725ef1] flex justify-center hover:bg-slate-50 transition-colors cursor-pointer bg-white group mt-auto">
          View All Institutes
          <ArrowUpRight className="ml-1 h-4 w-4 transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
        </CardFooter>
      </Card>

    </div>
  )
}
