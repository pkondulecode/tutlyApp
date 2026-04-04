"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
  FieldContent,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Building2,
  Contact,
  MapPin,
  Banknote,
  GraduationCap,
  Settings2,
  Save,
  Loader2,
  Image as ImageIcon
} from "lucide-react"

const instituteFormSchema = z.object({
  institutE_SRNO: z.number().default(0),
  owneR_SRNO: z.number().default(1),
  institutE_CODE: z.string().min(1, "Institute Code is required"),
  institutE_NAME: z.string().min(1, "Institute name is required"),
  institutE_TYPE: z.string().min(1, "Institute type is required"),
  affiliation: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  citY_SRNO: z.coerce.number().min(1, "City is required"),
  statE_SRNO: z.coerce.number().min(1, "State is required"),
  pincode: z.string().min(6, "Pincode must be 6 digits"),
  contacT_NO: z.string().min(10, "Contact number is required"),
  alternatE_CONTACT_NO: z.string().optional(),
  emaiL_ID: z.string().email("Invalid email address"),
  websitE_URL: z.string().url("Invalid website URL").or(z.literal("")),
  contacT_PERSON_NAME: z.string().min(1, "Contact person name is required"),
  contacT_PERSON_ROLE: z.string().optional(),
  contacT_PERSON_NO: z.string().optional(),
  logO_URL: z.string().optional(),
  establisheD_YEAR: z.coerce.number().optional(),
  registratioN_NO: z.string().optional(),
  paN_NO: z.string().optional(),
  gstiN_NO: z.string().optional(),
  banK_NAME: z.string().optional(),
  banK_ACCOUNT_NO: z.string().optional(),
  ifsC_CODE: z.string().optional(),
  capacity: z.coerce.number().default(0),
  nO_OF_STAFF: z.coerce.number().default(0),
  shifT_TYPE: z.string().optional(),
  academiC_YEAR_START_MONTH: z.coerce.number().min(1).max(12),
  academiC_YEAR_END_MONTH: z.coerce.number().min(1).max(12),
  latitude: z.coerce.number().optional().default(0),
  longitude: z.coerce.number().optional().default(0),
  iS_ACTIVE: z.boolean().default(true),
  description: z.string().optional(),
  remarks: z.string().optional(),
  useR_SRNO: z.number().default(0),
})

type InstituteFormValues = z.infer<typeof instituteFormSchema>

export default function InstituteSettingsPage() {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InstituteFormValues>({
    resolver: zodResolver(instituteFormSchema),
    defaultValues: {
      institutE_SRNO: 0,
      owneR_SRNO: 1,
      citY_SRNO: 1,
      statE_SRNO: 1,
      academiC_YEAR_START_MONTH: 4,
      academiC_YEAR_END_MONTH: 3,
      iS_ACTIVE: true,
      latitude: 0,
      longitude: 0,
      useR_SRNO: 1,
    },
  })

  const formValues = watch()

  async function onSubmit(data: InstituteFormValues) {
    setLoading(true)
    try {
      const response = await fetch(
        "http://raghuvatsal-001-site1.anytempurl.com/api/Institute/IU_M_INSTITUTE",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )

      if (!response.ok) {
        throw new Error("Failed to save institute settings")
      }

      const result = await response.json()
      toast.success("Institute settings saved successfully!")
      console.log("Success:", result)
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-6">
      <div className="flex items-center justify-between">

        {/* <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground/90">
            Institute Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Configure your coaching institute's global profile and business details.
          </p>
        </div> */}
        {/* <Button
          form="institute-form"
          type="submit"
          size="lg"
          disabled={loading}
          className="rounded-xl bg-gradient-to-r from-[#725ef1] to-[#7d3ced] hover:opacity-90 shadow-lg shadow-[#725ef1]/20 transition-all active:scale-[0.98]"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </>
          )}
        </Button> */}


      </div>

      <form id="institute-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info */}
        <Card className="overflow-hidden border-none shadow-xl shadow-muted/50 transition-all hover:shadow-2xl hover:shadow-muted/60">
          <CardHeader className="bg-gradient-to-r from-[#725ef1]/5 to-transparent pb-6 border-b border-dashed">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">Basic Information</CardTitle>
                <CardDescription>Core identity of your institute</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
            <Field>
              <FieldLabel>Institute Name</FieldLabel>
              <Input {...register("institutE_NAME")} placeholder="Enter institute name" />
              <FieldError errors={[errors.institutE_NAME]} />
            </Field>

            <Field>
              <FieldLabel>Institute Code</FieldLabel>
              <Input {...register("institutE_CODE")} placeholder="ABC-001" />
              <FieldError errors={[errors.institutE_CODE]} />
            </Field>

            <Field>
              <FieldLabel>Institute Type</FieldLabel>
              <Select onValueChange={(val) => setValue("institutE_TYPE", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Coaching">Coaching</SelectItem>
                  <SelectItem value="School">School</SelectItem>
                  <SelectItem value="College">College</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FieldError errors={[errors.institutE_TYPE]} />
            </Field>

            <Field>
              <FieldLabel>Affiliation</FieldLabel>
              <Input {...register("affiliation")} placeholder="e.g. CBSE, ICSE" />
            </Field>

            <Field>
              <FieldLabel>Established Year</FieldLabel>
              <Input type="number" {...register("establisheD_YEAR")} placeholder="2020" />
            </Field>

            <Field>
              <FieldLabel>Registration No.</FieldLabel>
              <Input {...register("registratioN_NO")} placeholder="Enter reg. number" />
            </Field>

            <Field>
              <FieldLabel>PAN Number</FieldLabel>
              <Input {...register("paN_NO")} placeholder="ABCDE1234F" />
            </Field>

            <Field>
              <FieldLabel>GSTIN Number</FieldLabel>
              <Input {...register("gstiN_NO")} placeholder="22AAAAA0000A1Z5" />
            </Field>

            <Field className="sm:col-span-2 lg:col-span-3">
              <FieldLabel>Description</FieldLabel>
              <Textarea {...register("description")} placeholder="Briefly describe your institute" />
            </Field>
          </CardContent>
        </Card>

        {/* Contact Details */}
        <Card className="overflow-hidden border-none shadow-xl shadow-muted/50">
          <CardHeader className="bg-gradient-to-r from-orange-500/5 to-transparent pb-6 border-b border-dashed">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600">
                <Contact className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">Contact Details</CardTitle>
                <CardDescription>Primary communication channels</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
            <Field>
              <FieldLabel>Email ID</FieldLabel>
              <Input type="email" {...register("emaiL_ID")} placeholder="info@institute.com" />
              <FieldError errors={[errors.emaiL_ID]} />
            </Field>

            <Field>
              <FieldLabel>Contact No.</FieldLabel>
              <Input {...register("contacT_NO")} placeholder="+91 9876543210" />
              <FieldError errors={[errors.contacT_NO]} />
            </Field>

            <Field>
              <FieldLabel>Alternate Contact No.</FieldLabel>
              <Input {...register("alternatE_CONTACT_NO")} placeholder="Secondary number" />
            </Field>

            <Field>
              <FieldLabel>Website URL</FieldLabel>
              <Input {...register("websitE_URL")} placeholder="https://www.example.com" />
              <FieldError errors={[errors.websitE_URL]} />
            </Field>

            <Separator className="sm:col-span-2 lg:col-span-3 my-2" />

            <Field>
              <FieldLabel>Contact Person Name</FieldLabel>
              <Input {...register("contacT_PERSON_NAME")} placeholder="Person's name" />
              <FieldError errors={[errors.contacT_PERSON_NAME]} />
            </Field>

            <Field>
              <FieldLabel>Contact Person Role</FieldLabel>
              <Input {...register("contacT_PERSON_ROLE")} placeholder="e.g. Manager" />
            </Field>

            <Field>
              <FieldLabel>Contact Person No.</FieldLabel>
              <Input {...register("contacT_PERSON_NO")} placeholder="Direct extension/no" />
            </Field>
          </CardContent>
        </Card>

        {/* Address */}
        <Card className="overflow-hidden border-none shadow-xl shadow-muted/50">
          <CardHeader className="bg-gradient-to-r from-emerald-500/5 to-transparent pb-6 border-b border-dashed">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">Address Information</CardTitle>
                <CardDescription>Physical location of the institute</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
            <Field className="sm:col-span-2 lg:col-span-3">
              <FieldLabel>Full Address</FieldLabel>
              <Textarea {...register("address")} placeholder="Enter complete address" />
              <FieldError errors={[errors.address]} />
            </Field>

            <Field>
              <FieldLabel>State</FieldLabel>
              <Select defaultValue="1" onValueChange={(val) => setValue("statE_SRNO", parseInt(val))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Maharashtra</SelectItem>
                  <SelectItem value="2">Gujarat</SelectItem>
                  <SelectItem value="3">Delhi</SelectItem>
                  <SelectItem value="4">Karnataka</SelectItem>
                </SelectContent>
              </Select>
              <FieldError errors={[errors.statE_SRNO]} />
            </Field>

            <Field>
              <FieldLabel>City</FieldLabel>
              <Select defaultValue="1" onValueChange={(val) => setValue("citY_SRNO", parseInt(val))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Mumbai</SelectItem>
                  <SelectItem value="2">Pune</SelectItem>
                  <SelectItem value="3">Nagpur</SelectItem>
                  <SelectItem value="4">Bangalore</SelectItem>
                </SelectContent>
              </Select>
              <FieldError errors={[errors.citY_SRNO]} />
            </Field>

            <Field>
              <FieldLabel>Pincode</FieldLabel>
              <Input {...register("pincode")} placeholder="400001" maxLength={6} />
              <FieldError errors={[errors.pincode]} />
            </Field>

            <Field>
              <FieldLabel>Latitude</FieldLabel>
              <Input type="number" step="any" {...register("latitude")} placeholder="0.0000" />
            </Field>

            <Field>
              <FieldLabel>Longitude</FieldLabel>
              <Input type="number" step="any" {...register("longitude")} placeholder="0.0000" />
            </Field>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Bank Details */}
          <Card className="overflow-hidden border-none shadow-xl shadow-muted/50">
            <CardHeader className="bg-gradient-to-r from-blue-500/5 to-transparent pb-6 border-b border-dashed">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
                  <Banknote className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">Bank Details</CardTitle>
                  <CardDescription>Payment and billing information</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid gap-6 p-6">
              <Field>
                <FieldLabel>Bank Name</FieldLabel>
                <Input {...register("banK_NAME")} placeholder="Enter bank name" />
              </Field>

              <Field>
                <FieldLabel>Account Number</FieldLabel>
                <Input {...register("banK_ACCOUNT_NO")} placeholder="Enter account number" />
              </Field>

              <Field>
                <FieldLabel>IFSC Code</FieldLabel>
                <Input {...register("ifsC_CODE")} placeholder="HDFC0001234" />
              </Field>
            </CardContent>
          </Card>

          {/* Academic Info */}
          <Card className="overflow-hidden border-none shadow-xl shadow-muted/50">
            <CardHeader className="bg-gradient-to-r from-purple-500/5 to-transparent pb-6 border-b border-dashed">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">Academic Info</CardTitle>
                  <CardDescription>Session and capacity settings</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid gap-6 p-6">
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Start Month</FieldLabel>
                  <Select defaultValue="4" onValueChange={(val) => setValue("academiC_YEAR_START_MONTH", parseInt(val))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">January</SelectItem>
                      <SelectItem value="4">April</SelectItem>
                      <SelectItem value="6">June</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError errors={[errors.academiC_YEAR_START_MONTH]} />
                </Field>

                <Field>
                  <FieldLabel>End Month</FieldLabel>
                  <Select defaultValue="3" onValueChange={(val) => setValue("academiC_YEAR_END_MONTH", parseInt(val))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">March</SelectItem>
                      <SelectItem value="5">May</SelectItem>
                      <SelectItem value="12">December</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError errors={[errors.academiC_YEAR_END_MONTH]} />
                </Field>
              </div>

              <Field>
                <FieldLabel>Shift Type</FieldLabel>
                <Select onValueChange={(val) => setValue("shifT_TYPE", val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select shift" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Morning">Morning</SelectItem>
                    <SelectItem value="Evening">Evening</SelectItem>
                    <SelectItem value="Both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Student Capacity</FieldLabel>
                  <Input type="number" {...register("capacity")} placeholder="0" />
                </Field>
                <Field>
                  <FieldLabel>Total Staff</FieldLabel>
                  <Input type="number" {...register("nO_OF_STAFF")} placeholder="0" />
                </Field>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Other Settings */}
        <Card className="overflow-hidden border-none shadow-xl shadow-muted/50">
          <CardHeader className="bg-gradient-to-r from-red-500/5 to-transparent pb-6 border-b border-dashed">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-600">
                <Settings2 className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">Other Settings</CardTitle>
                <CardDescription>Miscellaneous configurations</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field>
                <FieldLabel>Logo URL</FieldLabel>
                <div className="flex gap-2">
                  <Input {...register("logO_URL")} placeholder="https://..." className="flex-1" />
                  <Button variant="outline" size="icon" className="shrink-0">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </div>
              </Field>

              <div className="flex items-center justify-between p-4 rounded-xl border border-dashed border-red-200 bg-red-50/20">
                <div>
                  <p className="font-semibold text-foreground/90">Institute Status</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Toggle activation status of the institute</p>
                </div>
                <Switch
                  checked={formValues.iS_ACTIVE}
                  onCheckedChange={(checked) => setValue("iS_ACTIVE", checked)}
                />
              </div>
            </div>

            <Field>
              <FieldLabel>Remarks</FieldLabel>
              <Textarea {...register("remarks")} placeholder="Internal notes or remarks" />
            </Field>
          </CardContent>
        </Card>

        {/* Action Bar (Sticky at bottom for usability) */}
        <div className="sticky bottom-6 z-10 p-4 rounded-2xl border bg-background/80 backdrop-blur-md shadow-2xl flex items-center justify-between">
          <div className="text-sm">
            <span className="text-muted-foreground">Status:</span>
            <span className={cn(
              "ml-2 font-medium px-2 py-0.5 rounded-full text-xs",
              formValues.iS_ACTIVE ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
            )}>
              {formValues.iS_ACTIVE ? "Active" : "Inactive"}
            </span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" type="button" className="rounded-xl px-8 transition-all active:scale-[0.98]">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="rounded-xl px-8 bg-gradient-to-r from-[#725ef1] to-[#7d3ced] hover:opacity-90 shadow-lg shadow-[#725ef1]/20 transition-all active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </form>


    </div>
  )


}
