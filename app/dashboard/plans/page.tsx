"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Edit, Plus } from "lucide-react"

const plans = [
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
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Subscription Plans</h1>
          <p className="text-muted-foreground">Manage platform pricing tiers and limits.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Plan
        </Button>
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
