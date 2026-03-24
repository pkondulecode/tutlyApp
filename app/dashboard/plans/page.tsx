"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Edit, Plus } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(2, "Plan name must be at least 2 characters"),
  price: z.string().min(1, "Price is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  features: z.string().min(5, "Please enter at least one feature"),
  maxStudents: z.string().min(1, "Max students is required"),
  maxTeachers: z.string().min(1, "Max teachers is required"),
})

const initialPlans = [
  {
    id: "free",
    name: "Free",
    price: "0",
    description: "Perfect for new individual tutors starting out.",
    features: [
      "Up to 50 Students",
      "1 Teacher Account",
      "Basic Attendance Tracking",
      "Email Support",
    ],
    subscribers: 145,
    popular: false,
    color: "bg-muted",
    textColor: "text-muted-foreground",
  },
  {
    id: "pro",
    name: "Professional",
    price: "2,999",
    description: "Ideal for growing coaching centers with multiple batches.",
    features: [
      "Up to 500 Students",
      "5 Teacher Accounts",
      "Advanced Attendance & Exams",
      "Fee Management System",
      "Priority Email Support",
    ],
    subscribers: 890,
    popular: true,
    color: "bg-primary",
    textColor: "text-primary",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "7,999",
    description: "For large scale institutes requiring maximum control.",
    features: [
      "Unlimited Students",
      "Unlimited Teacher Accounts",
      "Custom Branding & Domain",
      "Dedicated Account Manager",
      "24/7 Phone Support",
    ],
    subscribers: 42,
    popular: false,
    color: "bg-chart-2",
    textColor: "text-chart-2",
  },
]

export default function PlansPage() {
  const [plans, setPlans] = useState(initialPlans)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      features: "",
      maxStudents: "",
      maxTeachers: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newPlan = {
      id: values.name.toLowerCase().replace(/\s+/g, '-'),
      name: values.name,
      price: values.price,
      description: values.description,
      features: values.features.split('\n').filter(f => f.trim() !== ''),
      subscribers: 0,
      popular: false,
      color: "bg-muted",
      textColor: "text-muted-foreground",
    }
    
    setPlans([...plans, newPlan])
    setIsDialogOpen(false)
    form.reset()
    toast.success("Subscription plan created successfully!")
  }
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Subscription Plans</h1>
          <p className="text-muted-foreground">Manage platform pricing tiers and limits.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#725ef1] hover:bg-[#634ed1] text-white shadow-lg shadow-indigo-100 transition-all active:scale-95">
              <Plus className="mr-2 h-4 w-4" />
              Create New Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px] rounded-2xl p-0 overflow-hidden border-none shadow-2xl">
            <DialogHeader className="p-6 bg-gradient-to-r from-[#725ef1] to-[#7d3ced] text-white">
              <DialogTitle className="text-2xl font-bold">New Subscription Plan</DialogTitle>
              <DialogDescription className="text-indigo-100">
                Define a new tier for coaching institutes.
              </DialogDescription>
            </DialogHeader>
            <div className="p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Plan Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Pro Plus" {...field} className="rounded-xl" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price (Monthly)</FormLabel>
                          <FormControl>
                            <Input placeholder="4,999" {...field} className="rounded-xl" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder="Best for medium sized institutes" {...field} className="rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="maxStudents"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Max Students</FormLabel>
                          <FormControl>
                            <Input placeholder="1000" type="number" {...field} className="rounded-xl" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="maxTeachers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Max Teachers</FormLabel>
                          <FormControl>
                            <Input placeholder="20" type="number" {...field} className="rounded-xl" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="features"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Features (One per line)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Up to 1000 Students&#10;Custom Reports&#10;SMS Integration" 
                            {...field} 
                            className="rounded-xl min-h-[100px]" 
                          />
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
                      className="rounded-xl"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-[#725ef1] hover:bg-[#634ed1] text-white rounded-xl shadow-lg shadow-indigo-100 px-8"
                    >
                      Create Plan
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mt-8">
        {plans.map((plan) => (
          <Card key={plan.id} className={`relative flex flex-col hover:shadow-xl transition-all duration-300 ${plan.popular ? 'border-primary shadow-md scale-[1.02]' : 'border-border'}`}>
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Badge className="bg-primary text-primary-foreground text-xs uppercase font-bold tracking-wider py-1 px-3">
                  Most Popular
                </Badge>
              </div>
            )}
            <CardHeader className="text-center pb-4 pt-8">
              <CardTitle className={`text-xl ${plan.popular ? 'text-primary' : ''}`}>{plan.name}</CardTitle>
              <div className="mt-4 flex items-baseline justify-center text-4xl font-extrabold">
                <span className="text-sm font-medium text-muted-foreground mr-1">Rs.</span>
                {plan.price}
                <span className="text-sm font-medium text-muted-foreground ml-1">/mo</span>
              </div>
              <CardDescription className="pt-4 h-12 flex items-center justify-center">
                {plan.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="bg-muted/30 rounded-lg p-4 mb-6 text-center border">
                <div className="text-2xl font-bold text-foreground">{plan.subscribers}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mt-1">Active Institutes</div>
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-sm text-muted-foreground">
                    <Check className={`mr-3 h-4 w-4 shrink-0 ${plan.textColor}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pt-4 border-t bg-muted/10">
              <Button variant={plan.popular ? "default" : "outline"} className="w-full">
                <Edit className="mr-2 h-4 w-4" /> Edit Plan
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
