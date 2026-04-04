"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  Search,
  Plus,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Pencil,
  Trash2
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
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
import { useState, useEffect } from "react"
import { toast } from "sonner"
import Link from "next/link"



const formSchema = z.object({
  name: z.string().min(2, "Institute name must be at least 2 characters"),
  ownerName: z.string().min(2, "Owner name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  plan: z.string().min(1, "Please select a plan"),
  address: z.string().min(5, "Address must be at least 5 characters"),
})

const initialInstitutes = []

export default function InstitutesPage() {
  const [institutes, setInstitutes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)



  const fetchInstitutes = async () => {
    setLoading(true)
    try {
      const response = await fetch("http://raghuvatsal-001-site1.anytempurl.com/api/Institute/DG_M_INSTITUTE")

      if (!response.ok) throw new Error("Failed to fetch institutes")

      const result = await response.json()

      const data = result?.data?.Table || []

      setInstitutes(data)

    } catch (error) {
      console.error("Error fetching institutes:", error)
      toast.error("Could not load institutes")
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchInstitutes()
  }, [])




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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Preserving the existing add logic, ideally this would call an API
    const newInstitute = {
      id: Math.random(),
      institutE_NAME: values.name,
      emaiL_ID: values.email,
      contacT_NO: values.phone,
      iS_ACTIVE: true,
      plan: values.plan, // Temporary map
      capacity: 0,
      joinedDate: new Date().toISOString(),
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

          {/* <DialogTrigger asChild>
            <Button className="bg-[#725ef1] hover:bg-[#634ed1] text-white shadow-lg shadow-indigo-100 transition-all active:scale-95">
              <Plus className="mr-2 h-4 w-4" />
              Add Institute
            </Button>
          </DialogTrigger> */}




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
            <div className="text-2xl font-bold">{Array.isArray(institutes) ? institutes.length : 0}</div>
            <p className="text-xs text-muted-foreground mt-1">+2 this month</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Institutes</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Array.isArray(institutes) ? institutes.filter(i => i.iS_ACTIVE === true).length : 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Currently operating</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Inactive</CardTitle>
            <XCircle className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Array.isArray(institutes) ? institutes.filter(i => i.iS_ACTIVE === false).length : 0}
            </div>
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
                <TableHead>Address</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><div className="h-10 w-40 animate-pulse bg-muted rounded-md" /></TableCell>
                    <TableCell><div className="h-10 w-24 animate-pulse bg-muted rounded-md" /></TableCell>
                    <TableCell><div className="h-6 w-16 animate-pulse bg-muted rounded-md" /></TableCell>
                    <TableCell><div className="h-6 w-10 animate-pulse bg-muted rounded-md" /></TableCell>
                    <TableCell><div className="h-6 w-16 animate-pulse bg-muted rounded-md" /></TableCell>
                    <TableCell><div className="h-8 w-8 animate-pulse bg-muted rounded-full ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : institutes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground font-medium">
                    No institutes found.
                  </TableCell>
                </TableRow>
              ) : (
                institutes.map((institute) => (
                  <TableRow key={institute.id || institute.institutE_SRNO} className="hover:bg-muted/50 transition-colors">


                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-[#725ef1]/10 flex items-center justify-center text-[#725ef1] font-bold">
                          {institute.institutE_NAME?.charAt(0) || "I"}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{institute.INSTITUTE_NAME}</div>
                          <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                            Joined {new Date(institute.CREATED_AT || Date.now()).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="text-sm font-medium text-gray-700">{institute.EMAIL_ID}</div>
                      <div className="text-xs text-muted-foreground font-medium">{institute.CONTACT_NO}</div>
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline" className="bg-[#725ef1]/5 text-[#725ef1] border-[#725ef1]/10 font-bold px-3 py-0.5">
                        {institute.INSTITUTE_TYPE || "-"}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-gray-900 font-bold">
                      {(institute.CAPACITY || 0).toLocaleString()}
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline" className="bg-[#725ef1]/5 text-[#725ef1] border-[#725ef1]/10 font-bold px-3 py-0.5">
                        {institute.iS_ACTIVE ? "ACTIVE" : "INACTIVE"}
                      </Badge>
                    </TableCell>



                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="hover:bg-[#725ef1]/5 hover:text-[#725ef1] rounded-full">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px] rounded-xl shadow-xl border-muted/20">
                          <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />

                          <Link href="/admin/settings/institute">
                            <DropdownMenuItem className="cursor-pointer gap-2 focus:bg-[#725ef1]/10 focus:text-[#725ef1] py-2">
                              <Pencil className="h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuSeparator />

                          <DropdownMenuItem className="cursor-pointer gap-2 focus:bg-red-50 focus:text-red-600 text-red-600 py-2">
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>


                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="p-4 border-t text-sm text-muted-foreground flex justify-between bg-muted/20 items-center">
          <span>Showing {institutes.length} institutes</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-xl" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="rounded-xl">Next</Button>
          </div>
        </CardFooter>
      </Card>


    </div>
  )
}
