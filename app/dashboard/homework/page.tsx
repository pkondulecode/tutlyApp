"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
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
import { Field, FieldLabel } from "@/components/ui/field"
import { Plus, Calendar, BookOpen, User, FileText } from "lucide-react"
import { homework, batches, subjects } from "@/lib/dummy-data"
import { useAuth } from "@/context/auth-context"

export default function HomeworkPage() {
  const { user } = useAuth()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [batchFilter, setBatchFilter] = useState("all")

  const isTeacherOrAdmin = user?.role === "admin" || user?.role === "teacher"

  const filteredHomework = homework.filter((hw) => {
    if (batchFilter === "all") return true
    return hw.batch === batchFilter
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Homework</h1>
          <p className="text-muted-foreground">
            {isTeacherOrAdmin ? "Assign and manage homework assignments" : "View your homework assignments"}
          </p>
        </div>
        {isTeacherOrAdmin && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Assign Homework
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Assign Homework</DialogTitle>
                <DialogDescription>Create a new homework assignment</DialogDescription>
              </DialogHeader>
              <form className="space-y-4">
                <Field>
                  <FieldLabel>Title</FieldLabel>
                  <Input placeholder="Enter homework title" />
                </Field>
                <Field>
                  <FieldLabel>Subject</FieldLabel>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.name}
                        </SelectItem>
                      ))}
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
                <Field>
                  <FieldLabel>Due Date</FieldLabel>
                  <Input type="date" />
                </Field>
                <Field>
                  <FieldLabel>Description</FieldLabel>
                  <Textarea placeholder="Enter homework description" />
                </Field>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Assign</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="flex gap-2">
        <Select value={batchFilter} onValueChange={setBatchFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by batch" />
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
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredHomework.map((hw) => (
          <Card key={hw.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{hw.title}</CardTitle>
                  <CardDescription>{hw.subject}</CardDescription>
                </div>
                <Badge variant={hw.status === "active" ? "default" : "secondary"}>
                  {hw.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{hw.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>{hw.batch}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{hw.teacher}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Due: {hw.dueDate}</span>
                </div>
              </div>
              {user?.role === "student" && (
                <Button className="w-full mt-4" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Submit
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
