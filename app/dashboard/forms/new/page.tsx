"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface FormField {
  id: string
  type: string
  label: string
  placeholder?: string
  required: boolean
  options?: string[]
}

const fieldTypes = [
  { type: "text", label: "Text Input", icon: Icons.text },
  { type: "number", label: "Number Input", icon: Icons.number },
  { type: "email", label: "Email Input", icon: Icons.email },
  { type: "phone", label: "Phone Input", icon: Icons.phone },
  { type: "textarea", label: "Text Area", icon: Icons.textarea },
  { type: "dropdown", label: "Dropdown", icon: Icons.dropdown },
  { type: "checkbox", label: "Checkbox", icon: Icons.checkbox },
  { type: "radio", label: "Radio Button", icon: Icons.radio },
  { type: "date", label: "Date Picker", icon: Icons.date },
  { type: "time", label: "Time Picker", icon: Icons.time },
  { type: "rating", label: "Rating", icon: Icons.rating },
  { type: "upload", label: "File Upload", icon: Icons.upload },
  { type: "signature", label: "Signature", icon: Icons.signature },
  { type: "address", label: "Address", icon: Icons.address },
  { type: "divider", label: "Section Divider", icon: Icons.divider },
]

export default function FormBuilderPage() {
  const router = useRouter()
  const [formTitle, setFormTitle] = useState("Untitled Form")
  const [formDescription, setFormDescription] = useState("")
  const [fields, setFields] = useState<FormField[]>([
    { id: "1", type: "text", label: "Full Name", placeholder: "Enter your name", required: true },
    { id: "2", type: "email", label: "Email Address", placeholder: "name@example.com", required: true },
  ])
  const [selectedField, setSelectedField] = useState<FormField | null>(null)
  const [propertiesOpen, setPropertiesOpen] = useState(false)

  const addField = (type: string) => {
    const fieldType = fieldTypes.find((f) => f.type === type)
    const newField: FormField = {
      id: Date.now().toString(),
      type,
      label: fieldType?.label || "New Field",
      placeholder: type === "divider" ? undefined : "Enter value...",
      required: false,
    }
    setFields([...fields, newField])
  }

  const removeField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id))
    if (selectedField?.id === id) {
      setSelectedField(null)
      setPropertiesOpen(false)
    }
  }

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, ...updates } : f)))
    if (selectedField?.id === id) {
      setSelectedField({ ...selectedField, ...updates })
    }
  }

  const selectField = (field: FormField) => {
    setSelectedField(field)
    setPropertiesOpen(true)
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      {/* Builder Header */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/forms">
              <Icons.arrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <Input
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="border-none bg-transparent text-xl font-bold focus-visible:ring-0 p-0 h-auto"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Icons.view className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button variant="outline" size="sm">
            <Icons.settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button size="sm" onClick={() => router.push("/dashboard/forms")}>
            <Icons.check className="mr-2 h-4 w-4" />
            Publish
          </Button>
        </div>
      </div>

      {/* Builder Content */}
      <div className="flex flex-1 gap-4 pt-4 overflow-hidden">
        {/* Left Panel - Field Components */}
        <Card className="w-64 shrink-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Form Fields</CardTitle>
            <CardDescription className="text-xs">Drag and drop to add</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-20rem)]">
              <div className="grid grid-cols-2 gap-2 p-4 pt-0">
                {fieldTypes.map((field) => {
                  const Icon = field.icon
                  return (
                    <Button
                      key={field.type}
                      variant="outline"
                      className="h-auto flex-col gap-1 p-3 text-xs"
                      onClick={() => addField(field.type)}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-center leading-tight">{field.label}</span>
                    </Button>
                  )
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Center - Live Form Canvas */}
        <Card className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-8">
              <div className="mx-auto max-w-2xl space-y-6">
                {/* Form Header */}
                <div className="text-center">
                  <h2 className="text-2xl font-bold">{formTitle}</h2>
                  <Textarea
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Add a description for your form..."
                    className="mt-2 border-none bg-transparent text-center text-muted-foreground resize-none focus-visible:ring-0"
                  />
                </div>

                <Separator />

                {/* Form Fields */}
                <div className="space-y-4">
                  {fields.length === 0 ? (
                    <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-12 text-center">
                      <Icons.add className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        Click on fields from the left panel to add them
                      </p>
                    </div>
                  ) : (
                    fields.map((field) => (
                      <div
                        key={field.id}
                        className={cn(
                          "group relative rounded-lg border p-4 transition-all cursor-pointer",
                          selectedField?.id === field.id
                            ? "border-primary ring-2 ring-primary/20"
                            : "border-border hover:border-primary/50"
                        )}
                        onClick={() => selectField(field)}
                      >
                        {field.type === "divider" ? (
                          <div className="flex items-center gap-4">
                            <Separator className="flex-1" />
                            <span className="text-sm text-muted-foreground">{field.label}</span>
                            <Separator className="flex-1" />
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Label className="flex items-center gap-1">
                              {field.label}
                              {field.required && <span className="text-destructive">*</span>}
                            </Label>
                            {field.type === "textarea" ? (
                              <Textarea placeholder={field.placeholder} disabled />
                            ) : field.type === "dropdown" ? (
                              <Select disabled>
                                <SelectTrigger>
                                  <SelectValue placeholder={field.placeholder} />
                                </SelectTrigger>
                              </Select>
                            ) : field.type === "checkbox" ? (
                              <div className="flex items-center gap-2">
                                <input type="checkbox" disabled className="h-4 w-4" />
                                <span className="text-sm">{field.placeholder}</span>
                              </div>
                            ) : field.type === "radio" ? (
                              <div className="space-y-2">
                                {["Option 1", "Option 2", "Option 3"].map((opt) => (
                                  <div key={opt} className="flex items-center gap-2">
                                    <input type="radio" disabled className="h-4 w-4" />
                                    <span className="text-sm">{opt}</span>
                                  </div>
                                ))}
                              </div>
                            ) : field.type === "rating" ? (
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Icons.rating
                                    key={star}
                                    className="h-6 w-6 text-muted-foreground"
                                  />
                                ))}
                              </div>
                            ) : field.type === "upload" ? (
                              <div className="rounded-lg border-2 border-dashed p-6 text-center">
                                <Icons.upload className="mx-auto h-8 w-8 text-muted-foreground" />
                                <p className="mt-2 text-sm text-muted-foreground">
                                  Click to upload or drag and drop
                                </p>
                              </div>
                            ) : field.type === "signature" ? (
                              <div className="rounded-lg border-2 border-dashed p-6 text-center">
                                <Icons.signature className="mx-auto h-8 w-8 text-muted-foreground" />
                                <p className="mt-2 text-sm text-muted-foreground">
                                  Click to sign
                                </p>
                              </div>
                            ) : (
                              <Input
                                type={field.type === "email" ? "email" : field.type === "number" ? "number" : "text"}
                                placeholder={field.placeholder}
                                disabled
                              />
                            )}
                          </div>
                        )}

                        {/* Field Actions */}
                        <div className="absolute -right-2 -top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-6 w-6 bg-card"
                            onClick={(e) => {
                              e.stopPropagation()
                              selectField(field)
                            }}
                          >
                            <Icons.edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-6 w-6 bg-card text-destructive hover:text-destructive"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeField(field.id)
                            }}
                          >
                            <Icons.delete className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Submit Button Preview */}
                {fields.length > 0 && (
                  <Button className="w-full" disabled>
                    Submit
                  </Button>
                )}
              </div>
            </div>
          </ScrollArea>
        </Card>

        {/* Right Panel - Field Properties */}
        <Sheet open={propertiesOpen} onOpenChange={setPropertiesOpen}>
          <SheetContent className="w-80 sm:w-96">
            <SheetHeader>
              <SheetTitle>Field Properties</SheetTitle>
              <SheetDescription>Configure the selected field</SheetDescription>
            </SheetHeader>
            {selectedField && (
              <div className="mt-6 space-y-6">
                <Tabs defaultValue="general">
                  <TabsList className="w-full">
                    <TabsTrigger value="general" className="flex-1">General</TabsTrigger>
                    <TabsTrigger value="validation" className="flex-1">Validation</TabsTrigger>
                    <TabsTrigger value="style" className="flex-1">Style</TabsTrigger>
                  </TabsList>
                  <TabsContent value="general" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label>Field Label</Label>
                      <Input
                        value={selectedField.label}
                        onChange={(e) =>
                          updateField(selectedField.id, { label: e.target.value })
                        }
                      />
                    </div>
                    {selectedField.type !== "divider" && (
                      <div className="space-y-2">
                        <Label>Placeholder</Label>
                        <Input
                          value={selectedField.placeholder || ""}
                          onChange={(e) =>
                            updateField(selectedField.id, { placeholder: e.target.value })
                          }
                        />
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <Label>Required Field</Label>
                      <Switch
                        checked={selectedField.required}
                        onCheckedChange={(checked) =>
                          updateField(selectedField.id, { required: checked })
                        }
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="validation" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label>Min Length</Label>
                      <Input type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <Label>Max Length</Label>
                      <Input type="number" placeholder="100" />
                    </div>
                    <div className="space-y-2">
                      <Label>Pattern (Regex)</Label>
                      <Input placeholder="Enter regex pattern..." />
                    </div>
                    <div className="space-y-2">
                      <Label>Error Message</Label>
                      <Input placeholder="Please enter a valid value" />
                    </div>
                  </TabsContent>
                  <TabsContent value="style" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label>Field Width</Label>
                      <Select defaultValue="full">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full">Full Width</SelectItem>
                          <SelectItem value="half">Half Width</SelectItem>
                          <SelectItem value="third">Third Width</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Show Label</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Show Placeholder</Label>
                      <Switch defaultChecked />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
