"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "super-admin" | "admin" | "teacher" | "accountant" | "student"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  coachingId?: string
  coachingName?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const DUMMY_USERS: Record<string, { password: string; user: User }> = {
  "superadmin@test.com": {
    password: "123456",
    user: {
      id: "1",
      email: "superadmin@test.com",
      name: "Super Admin",
      role: "super-admin",
      avatar: "SA",
    },
  },
  "admin@test.com": {
    password: "123456",
    user: {
      id: "2",
      email: "admin@test.com",
      name: "Coaching Admin",
      role: "admin",
      avatar: "CA",
      coachingId: "c1",
      coachingName: "Excel Academy",
    },
  },
  "teacher@test.com": {
    password: "123456",
    user: {
      id: "3",
      email: "teacher@test.com",
      name: "Dr. Priya Sharma",
      role: "teacher",
      avatar: "PS",
      coachingId: "c1",
      coachingName: "Excel Academy",
    },
  },
  "accountant@test.com": {
    password: "123456",
    user: {
      id: "4",
      email: "accountant@test.com",
      name: "Ravi Kumar",
      role: "accountant",
      avatar: "RK",
      coachingId: "c1",
      coachingName: "Excel Academy",
    },
  },
  "student@test.com": {
    password: "123456",
    user: {
      id: "5",
      email: "student@test.com",
      name: "Rahul Sharma",
      role: "student",
      avatar: "RS",
      coachingId: "c1",
      coachingName: "Excel Academy",
    },
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("coaching-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    const userRecord = DUMMY_USERS[email.toLowerCase()]
    if (userRecord && userRecord.password === password) {
      setUser(userRecord.user)
      localStorage.setItem("coaching-user", JSON.stringify(userRecord.user))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("coaching-user")
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
