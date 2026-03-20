"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar, CheckCircle2, XCircle, Users } from "lucide-react"
import { attendanceRecords, batches, students } from "@/lib/dummy-data"
import { useAuth } from "@/context/auth-context"

export default function AttendancePage() {
  const { user } = useAuth()
  const [selectedBatch, setSelectedBatch] = useState("all")
  const [selectedDate, setSelectedDate] = useState("2026-03-10")

  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesBatch = selectedBatch === "all" || record.batch === selectedBatch
    const matchesDate = record.date === selectedDate
    return matchesBatch && matchesDate
  })

  const presentCount = filteredRecords.filter((r) => r.status === "present").length
  const absentCount = filteredRecords.filter((r) => r.status === "absent").length
  const totalCount = filteredRecords.length

  const isTeacherOrAdmin = user?.role === "admin" || user?.role === "teacher"

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Attendance</h1>
          <p className="text-muted-foreground">Track and manage student attendance</p>
        </div>
        {isTeacherOrAdmin && (
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Mark Attendance
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{totalCount}</div>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold">{presentCount}</div>
                <p className="text-sm text-muted-foreground">Present</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                <XCircle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <div className="text-2xl font-bold">{absentCount}</div>
                <p className="text-sm text-muted-foreground">Absent</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Attendance Records</CardTitle>
              <CardDescription>View attendance for {selectedDate}</CardDescription>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Select batch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Batches</SelectItem>
                  {batches.map((batch) => (
                    <SelectItem key={batch.id} value={batch.name}>
                      {batch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Select date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2026-03-10">March 10, 2026</SelectItem>
                  <SelectItem value="2026-03-09">March 9, 2026</SelectItem>
                  <SelectItem value="2026-03-08">March 8, 2026</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  {isTeacherOrAdmin && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.studentName}</TableCell>
                      <TableCell>{record.batch}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>
                        <Badge variant={record.status === "present" ? "default" : "destructive"}>
                          {record.status === "present" ? (
                            <><CheckCircle2 className="mr-1 h-3 w-3" /> Present</>
                          ) : (
                            <><XCircle className="mr-1 h-3 w-3" /> Absent</>
                          )}
                        </Badge>
                      </TableCell>
                      {isTeacherOrAdmin && (
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={isTeacherOrAdmin ? 5 : 4} className="text-center text-muted-foreground">
                      No attendance records found for selected filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
