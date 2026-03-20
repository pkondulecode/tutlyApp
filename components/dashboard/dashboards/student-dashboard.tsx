"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/dashboard/stat-card"
import { ClipboardCheck, FileText, DollarSign, BookOpen, Calendar, Download } from "lucide-react"
import { students, homework, examResults, feeRecords, studyMaterials, notifications, attendanceRecords } from "@/lib/dummy-data"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function StudentDashboard() {
  const student = students[0] // Rahul Sharma
  const myFees = feeRecords[0]
  const myResults = examResults.filter((r) => r.studentName === "Amit Kumar") // Using Amit's results for demo
  const myHomework = homework.filter((h) => h.batch === student.batch)
  const myAttendance = attendanceRecords.filter((a) => a.studentId === "s1")
  const myNotifications = notifications.slice(0, 4)

  const attendancePercent = student.attendance
  const feePercent = (myFees.paidAmount / myFees.totalFee) * 100

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {student.name}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="My Attendance"
          value={`${attendancePercent}%`}
          icon={ClipboardCheck}
        />
        <StatCard
          title="Pending Homework"
          value={myHomework.length}
          icon={FileText}
        />
        <StatCard
          title="Fee Status"
          value={myFees.dueAmount > 0 ? `Rs. ${myFees.dueAmount} Due` : "Paid"}
          icon={DollarSign}
        />
        <StatCard
          title="My Batch"
          value={student.batch}
          icon={BookOpen}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>My Progress</CardTitle>
            <CardDescription>Your academic overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Attendance</span>
                <span className="text-sm text-muted-foreground">{attendancePercent}%</span>
              </div>
              <Progress value={attendancePercent} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Fee Payment</span>
                <span className="text-sm text-muted-foreground">{feePercent.toFixed(0)}%</span>
              </div>
              <Progress value={feePercent} className="h-2" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-secondary/50 rounded-lg">
                <p className="text-2xl font-bold">{myHomework.length}</p>
                <p className="text-sm text-muted-foreground">Active Assignments</p>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg">
                <p className="text-2xl font-bold">{myResults.length}</p>
                <p className="text-sm text-muted-foreground">Exam Results</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Recent updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myNotifications.map((notification) => (
                <div key={notification.id} className="flex items-start gap-3">
                  <div className={`h-2 w-2 mt-2 rounded-full ${notification.read ? "bg-muted" : "bg-primary"}`} />
                  <div>
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Homework</CardTitle>
            <CardDescription>Your pending assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myHomework.map((hw) => (
                <div key={hw.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{hw.title}</h4>
                      <p className="text-sm text-muted-foreground">{hw.subject}</p>
                    </div>
                    <Badge variant="secondary">{hw.status}</Badge>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Due: {hw.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Results</CardTitle>
            <CardDescription>Your exam performance</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Marks</TableHead>
                  <TableHead>Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myResults.length > 0 ? myResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell className="font-medium">{result.subject}</TableCell>
                    <TableCell>{result.marks}/{result.maxMarks}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{result.grade}</Badge>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground">
                      No results available yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Study Materials</CardTitle>
          <CardDescription>Resources for your batch</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {studyMaterials.slice(0, 4).map((material) => (
              <div key={material.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="outline">{material.type}</Badge>
                  <span className="text-xs text-muted-foreground">{material.downloads} downloads</span>
                </div>
                <h4 className="font-medium text-sm mb-1">{material.title}</h4>
                <p className="text-xs text-muted-foreground mb-3">{material.subject}</p>
                <Button size="sm" variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fee Details</CardTitle>
          <CardDescription>Your payment history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="p-4 bg-secondary/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Fee</p>
              <p className="text-2xl font-bold">Rs. {myFees.totalFee.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-success/10 rounded-lg">
              <p className="text-sm text-muted-foreground">Paid Amount</p>
              <p className="text-2xl font-bold text-success">Rs. {myFees.paidAmount.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-destructive/10 rounded-lg">
              <p className="text-sm text-muted-foreground">Due Amount</p>
              <p className="text-2xl font-bold text-destructive">Rs. {myFees.dueAmount.toLocaleString()}</p>
            </div>
          </div>
          {myFees.dueAmount > 0 && (
            <div className="mt-4">
              <Button>Pay Now</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
