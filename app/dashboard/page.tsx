"use client"

import { useAuth } from "@/context/auth-context"
import { SuperAdminDashboard } from "@/components/dashboard/dashboards/super-admin-dashboard"
import { AdminDashboard } from "@/components/dashboard/dashboards/admin-dashboard"
import { TeacherDashboard } from "@/components/dashboard/dashboards/teacher-dashboard"
import { AccountantDashboard } from "@/components/dashboard/dashboards/accountant-dashboard"
import { StudentDashboard } from "@/components/dashboard/dashboards/student-dashboard"

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) return null

  switch (user.role) {
    case "super-admin":
      return <SuperAdminDashboard />
    case "admin":
      return <AdminDashboard />
    case "teacher":
      return <TeacherDashboard />
    case "accountant":
      return <AccountantDashboard />
    case "student":
      return <StudentDashboard />
    default:
      return <AdminDashboard />
  }
}
