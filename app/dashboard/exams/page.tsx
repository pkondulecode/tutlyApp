"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Field, FieldLabel } from "@/components/ui/field"
import { Plus, Calendar, FileText, CheckCircle2 } from "lucide-react"
import { exams, examResults, batches } from "@/lib/dummy-data"
import { useAuth } from "@/context/auth-context"

export default function ExamsPage() {
  const { user } = useAuth()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState("upcoming")

  const isAdmin = user?.role === "admin"
  const isStudent = user?.role === "student"

  const upcomingExams = exams.filter((e) => e.status === "upcoming")
  const completedExams = exams.filter((e) => e.status === "completed")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Examinations</h1>
          <p className="text-muted-foreground">
            {isAdmin ? "Create and manage examinations" : "View exam schedules and results"}
          </p>
        </div>
        {isAdmin && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Exam
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create Examination</DialogTitle>
                <DialogDescription>Schedule a new examination</DialogDescription>
              </DialogHeader>
              <form className="space-y-4">
                <Field>
                  <FieldLabel>Exam Name</FieldLabel>
                  <Input placeholder="Enter exam name" />
                </Field>
                <Field>
                  <FieldLabel>Type</FieldLabel>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unit-test">Unit Test</SelectItem>
                      <SelectItem value="mid-term">Mid-Term</SelectItem>
                      <SelectItem value="final">Final</SelectItem>
                      <SelectItem value="pre-board">Pre-Board</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel>Batch</FieldLabel>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select batch" />
                    </SelectTrigger>
                    <SelectContent>
                      {batches.map((batch) => (
                        <SelectItem key={batch.id} value={batch.id}>
                          {batch.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel>Start Date</FieldLabel>
                    <Input type="date" />
                  </Field>
                  <Field>
                    <FieldLabel>End Date</FieldLabel>
                    <Input type="date" />
                  </Field>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Exams</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          {isStudent && <TabsTrigger value="results">My Results</TabsTrigger>}
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingExams.map((exam) => (
              <Card key={exam.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{exam.name}</CardTitle>
                      <CardDescription>{exam.batch}</CardDescription>
                    </div>
                    <Badge variant="secondary">{exam.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{exam.startDate} - {exam.endDate}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Subjects:</p>
                      <div className="flex flex-wrap gap-1">
                        {exam.subjects.map((subject, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Completed Examinations</CardTitle>
              <CardDescription>Past exams with published results</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exam Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    {isAdmin && <TableHead className="text-right">Actions</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedExams.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell className="font-medium">{exam.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{exam.type}</Badge>
                      </TableCell>
                      <TableCell>{exam.batch}</TableCell>
                      <TableCell>{exam.startDate}</TableCell>
                      <TableCell>
                        <Badge variant="default">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Completed
                        </Badge>
                      </TableCell>
                      {isAdmin && (
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            View Results
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {isStudent && (
          <TabsContent value="results" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>My Exam Results</CardTitle>
                <CardDescription>Your performance in past examinations</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Marks</TableHead>
                      <TableHead>Max Marks</TableHead>
                      <TableHead>Percentage</TableHead>
                      <TableHead>Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {examResults.slice(0, 4).map((result) => (
                      <TableRow key={result.id}>
                        <TableCell className="font-medium">{result.subject}</TableCell>
                        <TableCell>{result.marks}</TableCell>
                        <TableCell>{result.maxMarks}</TableCell>
                        <TableCell>{((result.marks / result.maxMarks) * 100).toFixed(1)}%</TableCell>
                        <TableCell>
                          <Badge variant={result.grade.startsWith("A") ? "default" : "secondary"}>
                            {result.grade}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
