"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/dashboard/stat-card"
import { Users, BookOpen, ClipboardCheck, FileText, Calendar } from "lucide-react"
import { batches, students, homework, exams, attendanceRecords } from "@/lib/dummy-data"
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

export function TeacherDashboard() {
  const myBatches = batches.filter((b) => b.teacher === "Dr. Priya Sharma")
  const totalStudents = myBatches.reduce((sum, b) => sum + b.students, 0)
  const myHomework = homework.filter((h) => h.teacher === "Dr. Priya Sharma")
  const todayAttendance = attendanceRecords.filter((a) => a.date === "2026-03-10")
  const presentToday = todayAttendance.filter((a) => a.status === "present").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Teacher Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Dr. Priya Sharma</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="My Batches"
          value={myBatches.length}
          icon={BookOpen}
        />
        <StatCard
          title="Total Students"
          value={totalStudents}
          icon={Users}
        />
        <StatCard
          title="Active Homework"
          value={myHomework.length}
          icon={FileText}
        />
        <StatCard
          title="Today's Attendance"
          value={`${presentToday}/${todayAttendance.length}`}
          icon={ClipboardCheck}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>My Batches</CardTitle>
            <CardDescription>Batches assigned to you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myBatches.map((batch) => (
                <div key={batch.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{batch.name}</h4>
                    <p className="text-sm text-muted-foreground">{batch.course}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{batch.students} students</p>
                    <p className="text-sm text-muted-foreground">{batch.timing}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Homework</CardTitle>
              <CardDescription>Homework you assigned</CardDescription>
            </div>
            <Button size="sm">Add New</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myHomework.map((hw) => (
                <div key={hw.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{hw.title}</h4>
                      <p className="text-sm text-muted-foreground">{hw.batch}</p>
                    </div>
                    <Badge variant={hw.status === "active" ? "default" : "secondary"}>
                      {hw.status}
                    </Badge>
                  </div>
                  <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Due: {hw.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{"Today's Attendance"}</CardTitle>
            <CardDescription>Mark attendance for your batches</CardDescription>
          </div>
          <Button size="sm">Mark Attendance</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {todayAttendance.slice(0, 6).map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.studentName}</TableCell>
                  <TableCell>{record.batch}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>
                    <Badge variant={record.status === "present" ? "default" : "destructive"}>
                      {record.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Exams</CardTitle>
          <CardDescription>Examinations for your batches</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {exams.filter((e) => e.status === "upcoming").slice(0, 4).map((exam) => (
              <div key={exam.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{exam.name}</h4>
                    <p className="text-sm text-muted-foreground">{exam.batch}</p>
                  </div>
                  <Badge variant="secondary">{exam.type}</Badge>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{exam.startDate} - {exam.endDate}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
