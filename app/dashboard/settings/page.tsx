"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Field, FieldLabel } from "@/components/ui/field"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/context/auth-context"
import { Building2, User, Bell, Shield, Palette, Save } from "lucide-react"

export default function SettingsPage() {
  const { user } = useAuth()
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [pushNotifications, setPushNotifications] = useState(true)

  const isSuperAdmin = user?.role === "super-admin"

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application settings</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          {!isSuperAdmin && (
            <TabsTrigger value="institute">
              <Building2 className="mr-2 h-4 w-4" />
              Institute
            </TabsTrigger>
          )}
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          {isSuperAdmin && (
            <TabsTrigger value="platform">
              <Palette className="mr-2 h-4 w-4" />
              Platform
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Field>
                  <FieldLabel>Full Name</FieldLabel>
                  <Input defaultValue={user?.name} />
                </Field>
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input type="email" defaultValue={user?.email} />
                </Field>
                <Field>
                  <FieldLabel>Phone</FieldLabel>
                  <Input placeholder="Enter phone number" />
                </Field>
                <Field>
                  <FieldLabel>Role</FieldLabel>
                  <Input value={user?.role?.replace("-", " ").toUpperCase()} disabled />
                </Field>
              </div>
              <Field>
                <FieldLabel>Bio</FieldLabel>
                <Textarea placeholder="Tell us about yourself" />
              </Field>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {!isSuperAdmin && (
          <TabsContent value="institute" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Institute Settings</CardTitle>
                <CardDescription>Manage institute information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field>
                    <FieldLabel>Institute Name</FieldLabel>
                    <Input defaultValue={user?.coachingName} />
                  </Field>
                  <Field>
                    <FieldLabel>Contact Email</FieldLabel>
                    <Input type="email" placeholder="contact@institute.com" />
                  </Field>
                  <Field>
                    <FieldLabel>Contact Phone</FieldLabel>
                    <Input placeholder="Enter contact number" />
                  </Field>
                  <Field>
                    <FieldLabel>Website</FieldLabel>
                    <Input placeholder="https://www.example.com" />
                  </Field>
                </div>
                <Field>
                  <FieldLabel>Address</FieldLabel>
                  <Textarea placeholder="Enter institute address" />
                </Field>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                  </div>
                  <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive push notifications in browser</p>
                  </div>
                  <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>
              </div>

              <div className="pt-4">
                <h4 className="font-medium mb-4">Notification Types</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Homework Assignments</p>
                      <p className="text-xs text-muted-foreground">When new homework is assigned</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Exam Announcements</p>
                      <p className="text-xs text-muted-foreground">When exams are scheduled</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Fee Reminders</p>
                      <p className="text-xs text-muted-foreground">When fee payment is due</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Attendance Alerts</p>
                      <p className="text-xs text-muted-foreground">When attendance falls below threshold</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-4">Change Password</h4>
                <div className="space-y-4 max-w-md">
                  <Field>
                    <FieldLabel>Current Password</FieldLabel>
                    <Input type="password" placeholder="Enter current password" />
                  </Field>
                  <Field>
                    <FieldLabel>New Password</FieldLabel>
                    <Input type="password" placeholder="Enter new password" />
                  </Field>
                  <Field>
                    <FieldLabel>Confirm New Password</FieldLabel>
                    <Input type="password" placeholder="Confirm new password" />
                  </Field>
                  <Button>Update Password</Button>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-4">Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Add an extra layer of security to your account
                </p>
                <Button variant="outline">Enable 2FA</Button>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-4">Active Sessions</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage your active login sessions
                </p>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Current Session</p>
                      <p className="text-sm text-muted-foreground">Chrome on Windows - Active now</p>
                    </div>
                    <Button variant="outline" size="sm">Sign Out</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {isSuperAdmin && (
          <TabsContent value="platform" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Global platform configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field>
                    <FieldLabel>Platform Name</FieldLabel>
                    <Input defaultValue="CoachingHub" />
                  </Field>
                  <Field>
                    <FieldLabel>Support Email</FieldLabel>
                    <Input type="email" defaultValue="support@coachinghub.com" />
                  </Field>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Default Settings</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Allow New Registrations</p>
                        <p className="text-xs text-muted-foreground">Allow new coaching institutes to register</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Require Email Verification</p>
                        <p className="text-xs text-muted-foreground">Require email verification for new accounts</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Maintenance Mode</p>
                        <p className="text-xs text-muted-foreground">Put platform in maintenance mode</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
