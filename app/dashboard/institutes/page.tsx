"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Building2, Search, Plus, MoreHorizontal, CheckCircle2, XCircle } from "lucide-react"
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
  DialogFooter
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(2, "Institute name must be at least 2 characters"),
  ownerName: z.string().min(2, "Owner name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  plan: z.string().min(1, "Please select a plan"),
  address: z.string().min(5, "Address must be at least 5 characters"),
})

const initialInstitutes = [
  { id: 1, name: "Excel Academy", email: "contact@excelacademy.com", phone: "+91 9876543210", status: "active", plan: "Pro", students: 450, joinedDate: "2024-01-15" },
  { id: 2, name: "Pioneer Classes", email: "info@pioneer.edu", phone: "+91 8765432109", status: "active", plan: "Basic", students: 120, joinedDate: "2024-02-10" },
  { id: 3, name: "Quantum Prep", email: "support@quantum.in", phone: "+91 7654321098", status: "inactive", plan: "Free", students: 45, joinedDate: "2024-03-05" },
  { id: 4, name: "Apex Coaching", email: "hello@apexcoaching.com", phone: "+91 6543210987", status: "active", plan: "Enterprise", students: 1250, joinedDate: "2023-11-20" },
  { id: 5, name: "Bright Minds", email: "info@brightminds.co.in", phone: "+91 9988776655", status: "active", plan: "Pro", students: 300, joinedDate: "2024-01-28" },
]

export default function InstitutesPage() {
  const [institutes, setInstitutes] = useState(initialInstitutes)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      ownerName: "",
      email: "",
      phone: "",
      plan: "Basic",
      address: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newInstitute = {
      id: institutes.length + 1,
      name: values.name,
      email: values.email,
      phone: values.phone,
      status: "active" as const,
      plan: values.plan,
      students: 0,
      joinedDate: new Date().toISOString().split('T')[0],
    }
    
    setInstitutes([newInstitute, ...institutes])
    setIsDialogOpen(false)
    form.reset()
    toast.success("Institute added successfully!")
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Coaching Institutes</h1>
          <p className="text-muted-foreground">Manage and monitor all registered coaching institutes.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#725ef1] hover:bg-[#634ed1] text-white shadow-lg shadow-indigo-100 transition-all active:scale-95">
              <Plus className="mr-2 h-4 w-4" />
              Add Institute
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px] rounded-2xl p-0 overflow-hidden border-none shadow-2xl">
            <DialogHeader className="p-6 bg-gradient-to-r from-[#725ef1] to-[#7d3ced] text-white">
              <DialogTitle className="text-2xl font-bold">Register New Institute</DialogTitle>
              <DialogDescription className="text-indigo-100">
                Setup a new coaching institute on the platform.
              </DialogDescription>
            </DialogHeader>
            <div className="p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Institute Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Excel Academy" {...field} className="rounded-xl" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="ownerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Owner Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} className="rounded-xl" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="contact@institute.com" {...field} className="rounded-xl" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 9988776655" {...field} className="rounded-xl" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="plan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subscription Plan</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl">
                              <SelectValue placeholder="Select a plan" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="Free">Free Plan</SelectItem>
                            <SelectItem value="Basic">Basic Plan</SelectItem>
                            <SelectItem value="Pro">Pro Plan</SelectItem>
                            <SelectItem value="Enterprise">Enterprise Plan</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Office Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Street, City, State" {...field} className="rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter className="pt-4">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      onClick={() => setIsDialogOpen(false)}
                      className="rounded-xl hover:bg-gray-100"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-[#725ef1] hover:bg-[#634ed1] text-white rounded-xl shadow-lg shadow-indigo-100 px-8"
                    >
                      Create Institute
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Institutes</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{institutes.length}</div>
            <p className="text-xs text-muted-foreground mt-1">+2 this month</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Institutes</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{institutes.filter(i => i.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently operating</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Inactive</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{institutes.filter(i => i.status === 'inactive').length}</div>
            <p className="text-xs text-muted-foreground mt-1">Require attention</p>
          </CardContent>
        </Card>
      </div>

      <Card className="hover:shadow-md transition-shadow overflow-hidden">
        <CardHeader className="pb-3 border-b border-border bg-muted/40">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-base font-medium">Institute Directory</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search institutes..."
                className="pl-9 w-[250px] bg-background"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/20">
              <TableRow>
                <TableHead>Institute Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {institutes.map((institute) => (
                <TableRow key={institute.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {institute.name.charAt(0)}
                      </div>
                      <div>
                        {institute.name}
                        <div className="text-xs text-muted-foreground font-normal">Joined {institute.joinedDate}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{institute.email}</div>
                    <div className="text-xs text-muted-foreground">{institute.phone}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      institute.plan === 'Enterprise' ? 'bg-primary/10 text-primary border-primary/20' :
                      institute.plan === 'Pro' ? 'bg-chart-2/10 text-chart-2 border-chart-2/20' : 'bg-muted text-muted-foreground border-border'
                    }>
                      {institute.plan}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {institute.students.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={institute.status === "active" ? "default" : "secondary"} className={institute.status === 'active' ? 'bg-success/15 hover:bg-success/25 text-success border-success/20' : 'bg-destructive/15 text-destructive hover:bg-destructive/25 border-destructive/20'}>
                      {institute.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="p-4 border-t text-sm text-muted-foreground flex justify-between bg-muted/20 items-center">
          <span>Showing 5 of 24 institutes</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
