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

} from "lucide-react"

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
  { title: "Platform Analytics", href: "/dashboard/analytics", icon: PieChart, roles: ["super-admin"] },
  { title: "Students", href: "/dashboard/students", icon: Users, roles: ["admin", "teacher"] },
  { title: "Teachers", href: "/dash board/teachers", icon: GraduationCap, roles: ["admin"] },
  { title: "Courses", href: "/dashboard/courses", icon: BookOpen, roles: ["admin"] },
  { title: "Batches", href: "/dashboard/batches", icon: Calendar, roles: ["admin", "teacher"] },
  { title: "Subjects", href: "/dashboard/subjects", icon: BookOpen, roles: ["admin"] },
  { title: "Attendance", href: "/dashboard/attendance", icon: ClipboardCheck, roles: ["admin", "teacher", "student"] },
  { title: "Homework", href: "/dashboard/homework", icon: FileText, roles: ["admin", "teacher", "student"] },
  { title: "Exams", href: "/dashboard/exams", icon: FileText, roles: ["admin", "teacher", "student"] },
  { title: "Study Materials", href: "/dashboard/materials", icon: Upload, roles: ["admin", "teacher", "student"] },
  { title: "Fees", href: "/dashboard/fees", icon: DollarSign, roles: ["admin", "accountant", "student"] },
  { title: "Expenses", href: "/dashboard/expenses", icon: Receipt, roles: ["admin", "accountant"] },
  { title: "Salary", href: "/dashboard/salary", icon: Wallet, roles: ["admin", "accountant"] },
  { title: "Reports", href: "/dashboard/reports", icon: BarChart3, roles: ["admin", "accountant"] },
  { title: "Notifications", href: "/dashboard/notifications", icon: Bell, roles: ["admin", "teacher", "accountant", "student"] },
  { title: "Settings", href: "/dashboard/settings", icon: Settings, roles: ["super-admin", "admin"] },
]

interface MobileSidebarProps {
  onClose: () => void
}

export function MobileSidebar({ onClose }: MobileSidebarProps) {
  const { user } = useAuth()
  const pathname = usePathname()

  if (!user) return null

  const filteredNavItems = navItems.filter((item) => item.roles.includes(user.role))

  return (

    <div className="flex h-full flex-col bg-[#f3f4f6] text-gray-900 border-r border-gray-200">
      <div className="flex h-20 items-center px-6 mb-2 border-b border-gray-200/50">
        <Link href="/dashboard" className="flex items-center gap-2.5" onClick={onClose}>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#725ef1] shadow-lg shadow-indigo-100">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-gray-900 text-lg tracking-tight">CoachingHub</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1.5 pb-10">
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-200 group",
                    isActive
                      ? "bg-[#725ef1]/10 text-[#725ef1]"
                      : "text-[#6b7280] hover:bg-white/50 hover:text-gray-900"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 shrink-0 transition-colors duration-200",
                    isActive ? "text-[#725ef1]" : "text-[#6b7280] group-hover:text-gray-900"
                  )} />
                  <span className="font-semibold">{item.title}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#725ef1]" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>

  )
}
