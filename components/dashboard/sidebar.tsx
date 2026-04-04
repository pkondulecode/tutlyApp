"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth, type UserRole } from "@/context/auth-context"
import {


  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  ClipboardCheck,
  FileText,
  DollarSign,
  Receipt,
  Wallet,
  BarChart3,
  Settings,
  Building2,
  CreditCard,
  PieChart,
  Upload,
  Bell,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Inbox,
  FileSpreadsheet


} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  roles: UserRole[]
}

const navItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["super-admin", "admin", "teacher", "accountant", "student"] },
  { title: "Coaching Institutes", href: "/dashboard/institutes", icon: Building2, roles: ["super-admin"] },
  { title: "Subscription Plans", href: "/dashboard/plans", icon: CreditCard, roles: ["super-admin"] },
  { title: "Platform Analytics", href: "/dashboard/analytics", icon: TrendingUp, roles: ["super-admin"] },
  { title: "Invoices", href: "/dashboard/fees", icon: FileSpreadsheet, roles: ["admin", "accountant", "student"] },
  { title: "Inbox", href: "/dashboard/notifications", icon: Inbox, roles: ["admin", "teacher", "accountant", "student"] },

  // Existing specific roles logic preserved below
  { title: "Students", href: "/dashboard/students", icon: Users, roles: ["admin", "teacher"] },
  { title: "Teachers", href: "/dashboard/teachers", icon: GraduationCap, roles: ["admin"] },
  { title: "Courses", href: "/dashboard/courses", icon: BookOpen, roles: ["admin"] },
  { title: "Batches", href: "/dashboard/batches", icon: Calendar, roles: ["admin", "teacher"] },
  { title: "Subjects", href: "/dashboard/subjects", icon: BookOpen, roles: ["admin"] },
  { title: "Attendance", href: "/dashboard/attendance", icon: ClipboardCheck, roles: ["admin", "teacher", "student"] },
  { title: "Homework", href: "/dashboard/homework", icon: FileText, roles: ["admin", "teacher", "student"] },
  { title: "Exams", href: "/dashboard/exams", icon: FileText, roles: ["admin", "teacher", "student"] },
  { title: "Study Materials", href: "/dashboard/materials", icon: Upload, roles: ["admin", "teacher", "student"] },
  { title: "Expenses", href: "/dashboard/expenses", icon: Receipt, roles: ["admin", "accountant"] },
  { title: "Salary", href: "/dashboard/salary", icon: Wallet, roles: ["admin", "accountant"] },
  { title: "Reports", href: "/dashboard/reports", icon: BarChart3, roles: ["admin", "accountant"] },

  { title: "Settings", href: "/dashboard/settings", icon: Settings, roles: ["super-admin", "admin"] },
]

export function Sidebar() {
  const { user } = useAuth()
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  if (!user) return null

  // Removing duplicates if titles match after adding the new requested labels
  const seen = new Set()
  const filteredNavItems = navItems.filter((item) => {
    const isAllowed = item.roles.includes(user.role)
    if (!isAllowed) return false
    const duplicate = seen.has(item.title)
    seen.add(item.title)
    return !duplicate
  })

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen transition-all duration-300 border-r border-gray-200 shadow-sm font-medium",
        "bg-[#f3f4f6]",
        "hidden lg:flex flex-col",
        collapsed ? "w-20" : "w-[240px]"
      )}
    >
      {/* Logo Section */}
      <div className="flex h-20 items-center px-6 mb-2">
        {!collapsed ? (
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#725ef1] shadow-lg shadow-indigo-100">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">
              CoachingHub
            </span>
          </Link>
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#725ef1] mx-auto shadow-md">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto px-4 py-2">
        <ul className="space-y-1.5">
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-200 group",
                    isActive
                      ? "bg-[#725ef1]/10 text-[#725ef1]"
                      : "text-[#6b7280] hover:bg-[#f1f5f9] hover:text-gray-900"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 shrink-0 transition-colors duration-200",
                    isActive ? "text-[#725ef1]" : "text-[#6b7280] group-hover:text-gray-900"
                  )} />
                  {!collapsed && (
                    <span className="whitespace-nowrap">{item.title}</span>
                  )}
                  {isActive && !collapsed && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#725ef1]" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer/Toggle Section */}
      <div className="p-4 mt-auto space-y-2">
        {user.role !== "super-admin" && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const superAdmin = {
                id: "1",
                email: "superadmin@test.com",
                name: "Super Admin",
                role: "super-admin" as const,
                avatar: "SA",
              }
              localStorage.setItem("coaching-user", JSON.stringify(superAdmin))
              window.location.reload()
            }}
            className={cn(
              "w-full h-10 justify-start rounded-xl border-dashed border-[#725ef1]/50 text-[#725ef1] hover:bg-[#725ef1]/10 hover:border-[#725ef1] transition-all font-semibold text-xs",
              collapsed && "justify-center px-0"
            )}
          >
            <PieChart className="h-4 w-4 shrink-0" />
            {!collapsed && <span className="ml-2">Super Admin Access</span>}
          </Button>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full h-11 justify-center rounded-xl text-[#6b7280] hover:bg-[#f1f5f9] hover:text-gray-900 transition-all font-bold tracking-tight"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <div className="flex items-center gap-2">
              <ChevronLeft className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Collapse Menu</span>
            </div>
          )}
        </Button>
      </div>

    </aside>
  )
}