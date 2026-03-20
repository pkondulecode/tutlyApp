"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Users, GraduationCap, DollarSign, ClipboardCheck, Calendar, BookOpen, Search, Filter, MoreHorizontal, ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react"
import { students, teachers, batches, feeRecords, attendanceRecords, exams, monthlyRevenue, studentGrowth, attendanceStats } from "@/lib/dummy-data"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function ModernStatCard({ title, value, icon: Icon, trend, description }: { title: string, value: string | number, icon: any, trend?: { value: number, label: string }, description?: string }) {
  const isPositive = trend && trend.value >= 0
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
        {trend && (
          <p className="flex items-center text-xs mt-1 text-muted-foreground">
            <span className={`inline-flex items-center rounded-full px-1 py-0.5 text-[10px] font-medium ${isPositive ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'} mr-2`}>
              {isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
              {Math.abs(trend.value)}%
            </span>
            {trend.label}
          </p>
        )}
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  )
}

export function AdminDashboard() {
  const totalStudents = students.length
  const totalTeachers = teachers.length
  const totalRevenue = feeRecords.reduce((sum, f) => sum + f.paidAmount, 0)
  const pendingFees = feeRecords.reduce((sum, f) => sum + f.dueAmount, 0)
  const todayAttendance = attendanceRecords.filter((a) => a.date === "2026-03-10" && a.status === "present").length
  const totalTodayStudents = attendanceRecords.filter((a) => a.date === "2026-03-10").length
  const upcomingExams = exams.filter((e) => e.status === "upcoming").length

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in-50 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Overview</h1>
          <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your academy today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="hidden sm:flex" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Last 30 Days
          </Button>
          <Button size="sm">
            Download Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ModernStatCard
          title="Total Students"
          value={totalStudents.toLocaleString()}
          icon={Users}
          trend={{ value: 12, label: "vs last month" }}
        />
        <ModernStatCard
          title="Total Teachers"
          value={totalTeachers}
          icon={GraduationCap}
          trend={{ value: 5, label: "vs last month" }}
        />
        <ModernStatCard
          title="Monthly Revenue"
          value={`Rs. ${(totalRevenue / 1000).toFixed(0)}K`}
          icon={DollarSign}
          trend={{ value: 18, label: "vs last month" }}
        />
        <ModernStatCard
          title="Active Batches"
          value={batches.length}
          icon={BookOpen}
          description="Currently running schedules"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-base font-medium">Revenue Growth</CardTitle>
              <CardDescription>Monthly fee collection overview</CardDescription>
            </div>
            <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
          </CardHeader>
          <CardContent>
            <div className="h-[320px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyRevenue} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(var(--card))", borderRadius: "8px", border: "1px solid hsl(var(--border))", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                    itemStyle={{ color: "hsl(var(--foreground))" }}
                    formatter={(value: number) => [`Rs. ${value.toLocaleString()}`, "Revenue"]}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-3 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-base font-medium">Student Growth</CardTitle>
              <CardDescription>Enrollment trends over time</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[320px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={studentGrowth} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ backgroundColor: "hsl(var(--card))", borderRadius: "8px", border: "1px solid hsl(var(--border))" }}
                  />
                  <Bar dataKey="students" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-7 mt-6">
        <Card className="col-span-1 lg:col-span-7 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-base font-medium">Attendance Overview</CardTitle>
              <CardDescription>Present vs Absent students this week</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceStats} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ backgroundColor: "hsl(var(--card))", borderRadius: "8px", border: "1px solid hsl(var(--border))" }}
                  />
                  <Bar dataKey="present" name="Present" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  <Bar dataKey="absent" name="Absent" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mt-6">
        <Card className="hover:shadow-md transition-shadow overflow-hidden">
          <CardHeader className="pb-3 border-b border-border bg-muted/40">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-medium">Recent Enrollments</CardTitle>
                <CardDescription>Latest students who joined</CardDescription>
              </div>
              <div className="flex bg-background border border-border rounded-md px-3 py-1 items-center">
                <Search className="h-4 w-4 text-muted-foreground mr-2" />
                <input placeholder="Search..." className="bg-transparent border-0 outline-none text-sm w-24 sm:w-32 focus:ring-0" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20">
                  <TableHead className="w-[200px]">Student Name</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.slice(0, 5).map((student) => (
                  <TableRow key={student.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary uppercase">
                          {student.name.charAt(0)}
                        </div>
                        {student.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{student.batch}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                          <div className={`h-full ${student.attendance > 80 ? 'bg-success' : 'bg-warning'}`} style={{ width: `${student.attendance}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{student.attendance}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={student.status === "active" ? "default" : "secondary"} className={student.status === 'active' ? 'bg-success/15 hover:bg-success/25 text-success border-success/20' : ''}>
                        {student.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="p-4 border-t text-sm text-muted-foreground flex justify-center hover:text-primary transition-colors cursor-pointer bg-muted/20">
            View all students
          </CardFooter>
        </Card>

        <Card className="hover:shadow-md transition-shadow overflow-hidden">
          <CardHeader className="pb-3 border-b border-border bg-muted/40">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-medium">Recent Fee Payments</CardTitle>
                <CardDescription>Tracking latest transactions</CardDescription>
              </div>
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20">
                  <TableHead>Student</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {feeRecords.slice(0, 5).map((record, i) => (
                  <TableRow key={record.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">
                      {students.find(s => s.id === record.studentId)?.name || 'Unknown Student'}
                    </TableCell>
                    <TableCell className="font-semibold text-foreground">Rs. {record.paidAmount.toLocaleString()}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{record.lastPayment || 'N/A'}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className={record.status === 'paid' ? 'bg-success/15 text-success border-success/20 hover:bg-success/25' : record.status === 'partial' ? 'bg-warning/15 text-warning border-warning/20 hover:bg-warning/25' : 'bg-destructive/15 text-destructive border-destructive/20 hover:bg-destructive/25'}>
                        {record.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="p-4 border-t text-sm text-muted-foreground flex justify-center hover:text-primary transition-colors cursor-pointer bg-muted/20">
            View all transactions
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
