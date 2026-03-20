"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/dashboard/stat-card"
import { DollarSign, Receipt, Wallet, TrendingUp, TrendingDown, AlertCircle } from "lucide-react"
import { feeRecords, expenses, salaryRecords, monthlyRevenue } from "@/lib/dummy-data"
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

const expenseCategories = [
  { name: "Salary", value: 236000, color: "hsl(var(--chart-1))" },
  { name: "Rent", value: 50000, color: "hsl(var(--chart-2))" },
  { name: "Utilities", value: 12000, color: "hsl(var(--chart-3))" },
  { name: "Supplies", value: 8000, color: "hsl(var(--chart-4))" },
  { name: "Maintenance", value: 5000, color: "hsl(var(--chart-5))" },
]

export function AccountantDashboard() {
  const totalCollection = feeRecords.reduce((sum, f) => sum + f.paidAmount, 0)
  const pendingFees = feeRecords.reduce((sum, f) => sum + f.dueAmount, 0)
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)
  const pendingSalaries = salaryRecords.filter((s) => s.status === "pending").reduce((sum, s) => sum + s.salary, 0)
  const studentsWithDues = feeRecords.filter((f) => f.dueAmount > 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Finance Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Ravi Kumar</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Collection"
          value={`Rs. ${(totalCollection / 1000).toFixed(0)}K`}
          icon={DollarSign}
          trend={{ value: 15, label: "vs last month" }}
        />
        <StatCard
          title="Pending Fees"
          value={`Rs. ${(pendingFees / 1000).toFixed(0)}K`}
          icon={AlertCircle}
          trend={{ value: -12, label: "vs last month" }}
        />
        <StatCard
          title="Total Expenses"
          value={`Rs. ${(totalExpenses / 1000).toFixed(0)}K`}
          icon={Receipt}
          trend={{ value: 8, label: "vs last month" }}
        />
        <StatCard
          title="Pending Salaries"
          value={`Rs. ${(pendingSalaries / 1000).toFixed(0)}K`}
          icon={Wallet}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Fee Collection Trend</CardTitle>
            <CardDescription>Monthly fee collection overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `${value / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`Rs. ${value.toLocaleString()}`, "Collection"]}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>This month's expenses by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {expenseCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`Rs. ${value.toLocaleString()}`, ""]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {expenseCategories.map((cat) => (
                <div key={cat.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-sm text-muted-foreground">{cat.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pending Fee Payments</CardTitle>
            <CardDescription>Students with outstanding dues</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead className="text-right">Due</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentsWithDues.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.studentName}</TableCell>
                    <TableCell>{record.batch}</TableCell>
                    <TableCell className="text-success">Rs. {record.paidAmount.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-destructive">Rs. {record.dueAmount.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Salary Status</CardTitle>
            <CardDescription>Teacher salary payments</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Month</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salaryRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.teacherName}</TableCell>
                    <TableCell>{record.month}</TableCell>
                    <TableCell>Rs. {record.salary.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={record.status === "paid" ? "default" : "secondary"}>
                        {record.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
          <CardDescription>Latest expense entries</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>
                    <Badge variant="outline">{expense.category}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{expense.description}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>
                    <Badge variant={expense.status === "paid" ? "default" : "secondary"}>
                      {expense.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">Rs. {expense.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
