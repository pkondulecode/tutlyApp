// Coaching Institutes
export const coachingInstitutes = [
  { id: "c1", name: "Excel Academy", location: "Delhi", students: 450, teachers: 25, status: "active", plan: "Premium", revenue: 1250000 },
  { id: "c2", name: "Bright Future Institute", location: "Mumbai", students: 320, teachers: 18, status: "active", plan: "Standard", revenue: 890000 },
  { id: "c3", name: "Knowledge Hub", location: "Bangalore", students: 280, teachers: 15, status: "active", plan: "Premium", revenue: 780000 },
  { id: "c4", name: "Success Point", location: "Chennai", students: 180, teachers: 10, status: "inactive", plan: "Basic", revenue: 450000 },
  { id: "c5", name: "Achievers Academy", location: "Hyderabad", students: 220, teachers: 12, status: "active", plan: "Standard", revenue: 620000 },
]

// Subscription Plans
export const subscriptionPlans = [
  { id: "p1", name: "Basic", price: 5000, students: 100, teachers: 5, features: ["Student Management", "Attendance", "Basic Reports"] },
  { id: "p2", name: "Standard", price: 10000, students: 300, teachers: 15, features: ["All Basic Features", "Fee Management", "Exams", "Homework"] },
  { id: "p3", name: "Premium", price: 20000, students: 500, teachers: 30, features: ["All Standard Features", "Advanced Reports", "Study Materials", "SMS Integration"] },
]

// Students
export const students = [
  { id: "s1", name: "Rahul Sharma", email: "rahul@test.com", phone: "9876543210", batch: "Class 10 Science", course: "Science Stream", attendance: 92, feesPaid: 45000, feesDue: 5000, status: "active", joinDate: "2025-04-15", parent: "Mr. Sharma" },
  { id: "s2", name: "Priya Patel", email: "priya@test.com", phone: "9876543211", batch: "Class 10 Science", course: "Science Stream", attendance: 88, feesPaid: 50000, feesDue: 0, status: "active", joinDate: "2025-04-10", parent: "Mr. Patel" },
  { id: "s3", name: "Amit Kumar", email: "amit@test.com", phone: "9876543212", batch: "Class 12 Commerce", course: "Commerce Stream", attendance: 95, feesPaid: 40000, feesDue: 10000, status: "active", joinDate: "2025-03-20", parent: "Mrs. Kumar" },
  { id: "s4", name: "Sneha Gupta", email: "sneha@test.com", phone: "9876543213", batch: "Class 12 Science", course: "Science Stream", attendance: 78, feesPaid: 35000, feesDue: 15000, status: "active", joinDate: "2025-05-01", parent: "Mr. Gupta" },
  { id: "s5", name: "Vikram Singh", email: "vikram@test.com", phone: "9876543214", batch: "Class 10 Commerce", course: "Commerce Stream", attendance: 85, feesPaid: 50000, feesDue: 0, status: "active", joinDate: "2025-02-15", parent: "Mrs. Singh" },
  { id: "s6", name: "Ananya Reddy", email: "ananya@test.com", phone: "9876543215", batch: "Class 12 Science", course: "Science Stream", attendance: 91, feesPaid: 42000, feesDue: 8000, status: "active", joinDate: "2025-04-01", parent: "Mr. Reddy" },
  { id: "s7", name: "Karan Mehta", email: "karan@test.com", phone: "9876543216", batch: "Class 10 Science", course: "Science Stream", attendance: 89, feesPaid: 48000, feesDue: 2000, status: "active", joinDate: "2025-03-10", parent: "Mrs. Mehta" },
  { id: "s8", name: "Neha Joshi", email: "neha@test.com", phone: "9876543217", batch: "Class 12 Commerce", course: "Commerce Stream", attendance: 82, feesPaid: 30000, feesDue: 20000, status: "inactive", joinDate: "2025-01-20", parent: "Mr. Joshi" },
]

// Teachers
export const teachers = [
  { id: "t1", name: "Dr. Priya Sharma", email: "priya.s@test.com", phone: "9876543220", subject: "Physics", batches: ["Class 12 Science", "Class 10 Science"], salary: 45000, status: "active", joinDate: "2024-06-01" },
  { id: "t2", name: "Mr. Rajesh Kumar", email: "rajesh@test.com", phone: "9876543221", subject: "Mathematics", batches: ["Class 12 Science", "Class 12 Commerce"], salary: 42000, status: "active", joinDate: "2024-08-15" },
  { id: "t3", name: "Mrs. Sunita Verma", email: "sunita@test.com", phone: "9876543222", subject: "Chemistry", batches: ["Class 12 Science", "Class 10 Science"], salary: 40000, status: "active", joinDate: "2024-09-01" },
  { id: "t4", name: "Mr. Anil Gupta", email: "anil@test.com", phone: "9876543223", subject: "Biology", batches: ["Class 12 Science"], salary: 38000, status: "active", joinDate: "2024-07-20" },
  { id: "t5", name: "Ms. Kavita Reddy", email: "kavita@test.com", phone: "9876543224", subject: "Accountancy", batches: ["Class 12 Commerce", "Class 10 Commerce"], salary: 35000, status: "active", joinDate: "2024-10-01" },
  { id: "t6", name: "Mr. Suresh Patel", email: "suresh@test.com", phone: "9876543225", subject: "Economics", batches: ["Class 12 Commerce"], salary: 36000, status: "active", joinDate: "2024-11-15" },
]

// Courses
export const courses = [
  { id: "co1", name: "Science Stream", description: "Physics, Chemistry, Biology, Mathematics", duration: "2 Years", fee: 50000, students: 85 },
  { id: "co2", name: "Commerce Stream", description: "Accountancy, Economics, Business Studies", duration: "2 Years", fee: 45000, students: 65 },
  { id: "co3", name: "JEE Preparation", description: "Engineering Entrance Preparation", duration: "1 Year", fee: 75000, students: 45 },
  { id: "co4", name: "NEET Preparation", description: "Medical Entrance Preparation", duration: "1 Year", fee: 70000, students: 40 },
  { id: "co5", name: "Foundation Course", description: "Class 9-10 Foundation", duration: "1 Year", fee: 35000, students: 60 },
]

// Batches
export const batches = [
  { id: "b1", name: "Class 10 Science", course: "Science Stream", teacher: "Dr. Priya Sharma", students: 28, timing: "9:00 AM - 12:00 PM", days: "Mon, Wed, Fri" },
  { id: "b2", name: "Class 12 Science", course: "Science Stream", teacher: "Mr. Rajesh Kumar", students: 32, timing: "2:00 PM - 5:00 PM", days: "Mon, Wed, Fri" },
  { id: "b3", name: "Class 12 Commerce", course: "Commerce Stream", teacher: "Ms. Kavita Reddy", students: 25, timing: "9:00 AM - 12:00 PM", days: "Tue, Thu, Sat" },
  { id: "b4", name: "Class 10 Commerce", course: "Commerce Stream", teacher: "Mr. Suresh Patel", students: 22, timing: "2:00 PM - 5:00 PM", days: "Tue, Thu, Sat" },
  { id: "b5", name: "JEE Batch A", course: "JEE Preparation", teacher: "Dr. Priya Sharma", students: 30, timing: "6:00 AM - 9:00 AM", days: "Mon - Sat" },
  { id: "b6", name: "NEET Batch A", course: "NEET Preparation", teacher: "Mr. Anil Gupta", students: 28, timing: "6:00 AM - 9:00 AM", days: "Mon - Sat" },
]

// Subjects
export const subjects = [
  { id: "sub1", name: "Physics", course: "Science Stream", teacher: "Dr. Priya Sharma" },
  { id: "sub2", name: "Chemistry", course: "Science Stream", teacher: "Mrs. Sunita Verma" },
  { id: "sub3", name: "Biology", course: "Science Stream", teacher: "Mr. Anil Gupta" },
  { id: "sub4", name: "Mathematics", course: "Science Stream", teacher: "Mr. Rajesh Kumar" },
  { id: "sub5", name: "Accountancy", course: "Commerce Stream", teacher: "Ms. Kavita Reddy" },
  { id: "sub6", name: "Economics", course: "Commerce Stream", teacher: "Mr. Suresh Patel" },
]

// Attendance Records
export const attendanceRecords = [
  { id: "a1", studentId: "s1", studentName: "Rahul Sharma", batch: "Class 10 Science", date: "2026-03-10", status: "present" },
  { id: "a2", studentId: "s2", studentName: "Priya Patel", batch: "Class 10 Science", date: "2026-03-10", status: "present" },
  { id: "a3", studentId: "s3", studentName: "Amit Kumar", batch: "Class 12 Commerce", date: "2026-03-10", status: "absent" },
  { id: "a4", studentId: "s4", studentName: "Sneha Gupta", batch: "Class 12 Science", date: "2026-03-10", status: "present" },
  { id: "a5", studentId: "s5", studentName: "Vikram Singh", batch: "Class 10 Commerce", date: "2026-03-10", status: "present" },
  { id: "a6", studentId: "s6", studentName: "Ananya Reddy", batch: "Class 12 Science", date: "2026-03-10", status: "present" },
  { id: "a7", studentId: "s7", studentName: "Karan Mehta", batch: "Class 10 Science", date: "2026-03-10", status: "absent" },
  { id: "a8", studentId: "s1", studentName: "Rahul Sharma", batch: "Class 10 Science", date: "2026-03-09", status: "present" },
  { id: "a9", studentId: "s2", studentName: "Priya Patel", batch: "Class 10 Science", date: "2026-03-09", status: "present" },
  { id: "a10", studentId: "s3", studentName: "Amit Kumar", batch: "Class 12 Commerce", date: "2026-03-09", status: "present" },
]

// Homework
export const homework = [
  { id: "h1", title: "Physics Chapter 5 Problems", subject: "Physics", batch: "Class 12 Science", teacher: "Dr. Priya Sharma", dueDate: "2026-03-15", assignedDate: "2026-03-10", status: "active", description: "Solve all problems from Chapter 5 - Electromagnetic Waves" },
  { id: "h2", title: "Chemistry Lab Report", subject: "Chemistry", batch: "Class 12 Science", teacher: "Mrs. Sunita Verma", dueDate: "2026-03-14", assignedDate: "2026-03-09", status: "active", description: "Complete the lab report for the titration experiment" },
  { id: "h3", title: "Mathematics Practice Set", subject: "Mathematics", batch: "Class 10 Science", teacher: "Mr. Rajesh Kumar", dueDate: "2026-03-12", assignedDate: "2026-03-08", status: "active", description: "Complete practice set 7 - Quadratic Equations" },
  { id: "h4", title: "Economics Case Study", subject: "Economics", batch: "Class 12 Commerce", teacher: "Mr. Suresh Patel", dueDate: "2026-03-16", assignedDate: "2026-03-10", status: "active", description: "Analyze the given case study on market structures" },
]

// Exams
export const exams = [
  { id: "e1", name: "Mid-Term Examination", type: "Mid-Term", batch: "Class 12 Science", startDate: "2026-03-20", endDate: "2026-03-25", status: "upcoming", subjects: ["Physics", "Chemistry", "Mathematics", "Biology"] },
  { id: "e2", name: "Unit Test 3", type: "Unit Test", batch: "Class 10 Science", startDate: "2026-03-18", endDate: "2026-03-18", status: "upcoming", subjects: ["Physics", "Chemistry", "Mathematics"] },
  { id: "e3", name: "Monthly Test - March", type: "Monthly Test", batch: "Class 12 Commerce", startDate: "2026-03-15", endDate: "2026-03-15", status: "completed", subjects: ["Accountancy", "Economics"] },
  { id: "e4", name: "Pre-Board Examination", type: "Pre-Board", batch: "Class 12 Science", startDate: "2026-02-10", endDate: "2026-02-20", status: "completed", subjects: ["Physics", "Chemistry", "Mathematics", "Biology"] },
]

// Exam Results
export const examResults = [
  { id: "r1", examId: "e3", studentId: "s3", studentName: "Amit Kumar", subject: "Accountancy", marks: 85, maxMarks: 100, grade: "A" },
  { id: "r2", examId: "e3", studentId: "s3", studentName: "Amit Kumar", subject: "Economics", marks: 78, maxMarks: 100, grade: "B+" },
  { id: "r3", examId: "e4", studentId: "s4", studentName: "Sneha Gupta", subject: "Physics", marks: 72, maxMarks: 100, grade: "B" },
  { id: "r4", examId: "e4", studentId: "s4", studentName: "Sneha Gupta", subject: "Chemistry", marks: 68, maxMarks: 100, grade: "B" },
  { id: "r5", examId: "e4", studentId: "s6", studentName: "Ananya Reddy", subject: "Physics", marks: 88, maxMarks: 100, grade: "A" },
  { id: "r6", examId: "e4", studentId: "s6", studentName: "Ananya Reddy", subject: "Chemistry", marks: 92, maxMarks: 100, grade: "A+" },
]

// Study Materials
export const studyMaterials = [
  { id: "m1", title: "Physics Formula Sheet", subject: "Physics", type: "PDF", batch: "Class 12 Science", uploadedBy: "Dr. Priya Sharma", uploadDate: "2026-03-01", downloads: 45 },
  { id: "m2", title: "Chemistry Reaction Mechanisms", subject: "Chemistry", type: "PDF", batch: "Class 12 Science", uploadedBy: "Mrs. Sunita Verma", uploadDate: "2026-02-28", downloads: 38 },
  { id: "m3", title: "Mathematics Video Lecture - Calculus", subject: "Mathematics", type: "Video", batch: "Class 12 Science", uploadedBy: "Mr. Rajesh Kumar", uploadDate: "2026-03-05", downloads: 52 },
  { id: "m4", title: "Accountancy Practice Problems", subject: "Accountancy", type: "PDF", batch: "Class 12 Commerce", uploadedBy: "Ms. Kavita Reddy", uploadDate: "2026-03-02", downloads: 28 },
]

// Fee Records
export const feeRecords = [
  { id: "f1", studentId: "s1", studentName: "Rahul Sharma", batch: "Class 10 Science", totalFee: 50000, paidAmount: 45000, dueAmount: 5000, lastPayment: "2026-02-15", status: "partial" },
  { id: "f2", studentId: "s2", studentName: "Priya Patel", batch: "Class 10 Science", totalFee: 50000, paidAmount: 50000, dueAmount: 0, lastPayment: "2026-01-10", status: "paid" },
  { id: "f3", studentId: "s3", studentName: "Amit Kumar", batch: "Class 12 Commerce", totalFee: 50000, paidAmount: 40000, dueAmount: 10000, lastPayment: "2026-02-20", status: "partial" },
  { id: "f4", studentId: "s4", studentName: "Sneha Gupta", batch: "Class 12 Science", totalFee: 50000, paidAmount: 35000, dueAmount: 15000, lastPayment: "2026-01-25", status: "partial" },
  { id: "f5", studentId: "s5", studentName: "Vikram Singh", batch: "Class 10 Commerce", totalFee: 50000, paidAmount: 50000, dueAmount: 0, lastPayment: "2026-03-01", status: "paid" },
  { id: "f6", studentId: "s6", studentName: "Ananya Reddy", batch: "Class 12 Science", totalFee: 50000, paidAmount: 42000, dueAmount: 8000, lastPayment: "2026-02-10", status: "partial" },
]

// Expenses
export const expenses = [
  { id: "ex1", category: "Salary", description: "Teacher Salaries - March", amount: 236000, date: "2026-03-01", status: "paid" },
  { id: "ex2", category: "Rent", description: "Building Rent - March", amount: 50000, date: "2026-03-01", status: "paid" },
  { id: "ex3", category: "Utilities", description: "Electricity Bill - February", amount: 12000, date: "2026-03-05", status: "paid" },
  { id: "ex4", category: "Supplies", description: "Stationery and Materials", amount: 8000, date: "2026-03-08", status: "pending" },
  { id: "ex5", category: "Maintenance", description: "AC Maintenance", amount: 5000, date: "2026-03-10", status: "pending" },
]

// Salary Records
export const salaryRecords = [
  { id: "sal1", teacherId: "t1", teacherName: "Dr. Priya Sharma", month: "March 2026", salary: 45000, status: "paid", paidDate: "2026-03-01" },
  { id: "sal2", teacherId: "t2", teacherName: "Mr. Rajesh Kumar", month: "March 2026", salary: 42000, status: "paid", paidDate: "2026-03-01" },
  { id: "sal3", teacherId: "t3", teacherName: "Mrs. Sunita Verma", month: "March 2026", salary: 40000, status: "paid", paidDate: "2026-03-01" },
  { id: "sal4", teacherId: "t4", teacherName: "Mr. Anil Gupta", month: "March 2026", salary: 38000, status: "pending", paidDate: null },
  { id: "sal5", teacherId: "t5", teacherName: "Ms. Kavita Reddy", month: "March 2026", salary: 35000, status: "pending", paidDate: null },
  { id: "sal6", teacherId: "t6", teacherName: "Mr. Suresh Patel", month: "March 2026", salary: 36000, status: "pending", paidDate: null },
]

// Notifications
export const notifications = [
  { id: "n1", title: "Homework Assigned", message: "New homework assigned for Physics - Chapter 5 Problems", type: "homework", date: "2026-03-10", read: false },
  { id: "n2", title: "Exam Announcement", message: "Mid-Term Examination scheduled from March 20-25", type: "exam", date: "2026-03-09", read: false },
  { id: "n3", title: "Fee Due Reminder", message: "Your fee payment of Rs. 5000 is pending", type: "fee", date: "2026-03-08", read: true },
  { id: "n4", title: "New Study Material", message: "Physics Formula Sheet has been uploaded", type: "material", date: "2026-03-07", read: true },
  { id: "n5", title: "Attendance Alert", message: "Your attendance is below 80% this month", type: "attendance", date: "2026-03-06", read: true },
]

// Monthly Revenue Data for Charts
export const monthlyRevenue = [
  { month: "Oct", revenue: 380000 },
  { month: "Nov", revenue: 420000 },
  { month: "Dec", revenue: 350000 },
  { month: "Jan", revenue: 480000 },
  { month: "Feb", revenue: 520000 },
  { month: "Mar", revenue: 450000 },
]

// Student Growth Data
export const studentGrowth = [
  { month: "Oct", students: 120 },
  { month: "Nov", students: 135 },
  { month: "Dec", students: 142 },
  { month: "Jan", students: 155 },
  { month: "Feb", students: 165 },
  { month: "Mar", students: 175 },
]

// Attendance Statistics
export const attendanceStats = [
  { day: "Mon", present: 145, absent: 10 },
  { day: "Tue", present: 140, absent: 15 },
  { day: "Wed", present: 148, absent: 7 },
  { day: "Thu", present: 142, absent: 13 },
  { day: "Fri", present: 150, absent: 5 },
  { day: "Sat", present: 138, absent: 17 },
]
