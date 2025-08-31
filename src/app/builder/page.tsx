"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  FormInput, 
  Type, 
  CheckSquare, 
  Radio, 
  List, 
  Calendar,
  Mail,
  Phone,
  Hash,
  Textarea,
  Star,
  Trash2,
  Copy,
  Eye,
  Settings
} from "lucide-react";

interface FormField {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

const fieldTypes = [
  { type: "text", label: "Short Text", icon: Type },
  { type: "textarea", label: "Long Text", icon: Textarea },
  { type: "email", label: "Email", icon: Mail },
  { type: "phone", label: "Phone", icon: Phone },
  { type: "number", label: "Number", icon: Hash },
  { type: "date", label: "Date", icon: Calendar },
  { type: "checkbox", label: "Checkbox", icon: CheckSquare },
  { type: "radio", label: "Radio", icon: Radio },
  { type: "select", label: "Dropdown", icon: List },
  { type: "rating", label: "Rating", icon: Star },
];

export default function FormBuilder() {
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [formDescription, setFormDescription] = useState("");
  const [fields, setFields] = useState<FormField[]>([]);
  const [selectedField, setSelectedField] = useState<string | null>(null);

  const addField = (type: string) => {
    const newField: FormField = {
      id: `field_${Date.now()}`,
      type,
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      placeholder: `Enter ${type}...`,
      required: false,
      options: type === "radio" || type === "select" ? ["Option 1", "Option 2"] : undefined,
    };
    setFields([...fields, newField]);
    setSelectedField(newField.id);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ));
  };

  const deleteField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
    if (selectedField === id) {
      setSelectedField(null);
    }
  };

  const duplicateField = (id: string) => {
    const field = fields.find(f => f.id === id);
    if (field) {
      const newField = { ...field, id: `field_${Date.now()}` };
      setFields([...fields, newField]);
    }
  };

  const moveField = (id: string, direction: "up" | "down") => {
    const index = fields.findIndex(f => f.id === id);
    if (index === -1) return;

    const newFields = [...fields];
    if (direction === "up" && index > 0) {
      [newFields[index], newFields[index - 1]] = [newFields[index - 1], newFields[index]];
    } else if (direction === "down" && index < fields.length - 1) {
      [newFields[index], newFields[index + 1]] = [newFields[index + 1], newFields[index]];
    }
    setFields(newFields);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <FormInput className="w-4 h-4 mr-2" />
              OlaForm
            </Button>
            <div className="h-6 w-px bg-gray-300" />
            <Input
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="w-64 font-semibold"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Field Types */}
          <div className="col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Form Elements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {fieldTypes.map((fieldType) => {
                  const Icon = fieldType.icon;
                  return (
                    <Button
                      key={fieldType.type}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => addField(fieldType.type)}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {fieldType.label}
                    </Button>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Center - Form Builder */}
          <div className="col-span-6">
            <Card className="min-h-[600px]">
              <CardHeader>
                <CardTitle>Form Builder</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Form Header */}
                <div className="p-6 bg-white border rounded-lg">
                  <Input
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="text-2xl font-bold mb-2"
                    placeholder="Form Title"
                  />
                  <Input
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="text-gray-600"
                    placeholder="Form Description (optional)"
                  />
                </div>

                {/* Form Fields */}
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedField === field.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedField(field.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">#{index + 1}</span>
                        <span className="text-sm font-medium text-gray-700">
                          {field.type.charAt(0).toUpperCase() + field.type.slice(1)}
                        </span>
                        {field.required && (
                          <span className="text-red-500 text-xs">*</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            moveField(field.id, "up");
                          }}
                          disabled={index === 0}
                        >
                          ↑
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            moveField(field.id, "down");
                          }}
                          disabled={index === fields.length - 1}
                        >
                          ↓
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            duplicateField(field.id);
                          }}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteField(field.id);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Input
                      value={field.label}
                      onChange={(e) => updateField(field.id, { label: e.target.value })}
                      className="mb-2"
                      placeholder="Field label"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Input
                      value={field.placeholder}
                      onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                      className="text-gray-500"
                      placeholder="Placeholder text"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                ))}

                {fields.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <FormInput className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Drag form elements here or click to add</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Field Properties */}
          <div className="col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Field Properties</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedField ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Required</label>
                      <div className="mt-1">
                        <input
                          type="checkbox"
                          checked={fields.find(f => f.id === selectedField)?.required}
                          onChange={(e) => updateField(selectedField, { required: e.target.checked })}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-600">Make this field required</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Select a field to edit its properties</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}