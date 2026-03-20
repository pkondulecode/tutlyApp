"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Building2, TrendingUp, HandCoins, Activity, ArrowUpRight } from "lucide-react"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from "recharts"

const platformRevenue = [
  { month: "Jan", revenue: 125000 },
  { month: "Feb", revenue: 140000 },
  { month: "Mar", revenue: 135000 },
  { month: "Apr", revenue: 160000 },
  { month: "May", revenue: 185000 },
  { month: "Jun", revenue: 210000 },
  { month: "Jul", revenue: 250000 },
]

const userGrowth = [
  { month: "Jan", students: 5000, teachers: 200 },
  { month: "Feb", students: 6000, teachers: 250 },
  { month: "Mar", students: 8000, teachers: 320 },
  { month: "Apr", students: 9500, teachers: 400 },
  { month: "May", students: 12000, teachers: 500 },
  { month: "Jun", students: 15000, teachers: 650 },
]

const planDistribution = [
  { name: 'Pro', value: 890, color: 'hsl(var(--primary))' },
  { name: 'Free', value: 145, color: 'hsl(var(--chart-2))' },
  { name: 'Enterprise', value: 42, color: 'hsl(var(--chart-3))' },
]

function StatCard({ title, value, icon: Icon, trend }: { title: string, value: string | number, icon: any, trend: string }) {
  return (
    <Card className="hover:shadow-md transition-shadow border-muted bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="flex items-center text-xs mt-1 text-muted-foreground font-medium">
          <span className="inline-flex items-center rounded-full px-1 py-0.5 text-[10px] font-medium bg-success/10 text-success mr-2">
            <ArrowUpRight className="h-3 w-3 mr-1" />
            {trend}
          </span>
          vs last month
        </p>
      </CardContent>
    </Card>
  )
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Platform Analytics</h1>
        <p className="text-muted-foreground">Global insights across all registered coaching centers.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Monthly Recurring Revenue"
          value="Rs. 2.50M"
          icon={TrendingUp}
          trend="18.5%"
        />
        <StatCard
          title="Total Active Institutes"
          value="1,077"
          icon={Building2}
          trend="8.2%"
        />
        <StatCard
          title="Total Platform Students"
          value="45,210"
          icon={Users}
          trend="24.1%"
        />
        <StatCard
          title="Server Uptime"
          value="99.99%"
          icon={Activity}
          trend="0.01%"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-base font-medium">Platform Revenue Growth</CardTitle>
              <CardDescription>Aggregate MRR over the past 6 months</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[320px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={platformRevenue} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(var(--card))", borderRadius: "8px", border: "1px solid hsl(var(--border))" }}
                    itemStyle={{ color: "hsl(var(--foreground))" }}
                    formatter={(value: number) => [`Rs. ${value.toLocaleString()}`, "Revenue"]}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(var(--success))" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-3 hover:shadow-md transition-shadow flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Plan Distribution</CardTitle>
            <CardDescription>Institutes per subscription tier</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip 
                    contentStyle={{ backgroundColor: "hsl(var(--card))", borderRadius: "8px", border: "1px solid hsl(var(--border))" }}
                    itemStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Pie
                    data={planDistribution}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {planDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {planDistribution.map(plan => (
                <div key={plan.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: plan.color }} />
                    <span className="text-muted-foreground">{plan.name}</span>
                  </div>
                  <span className="font-semibold">{plan.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">User Acquisition</CardTitle>
          <CardDescription>Growth of total students vs teachers globally</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userGrowth} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ backgroundColor: "hsl(var(--card))", borderRadius: "8px", border: "1px solid hsl(var(--border))" }}
                />
                <Bar dataKey="students" name="Students" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="teachers" name="Teachers" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
