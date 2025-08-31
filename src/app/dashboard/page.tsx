"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  FormInput, 
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Share2,
  BarChart3,
  Users,
  Calendar,
  TrendingUp,
  FileText,
  Clock,
  Star
} from "lucide-react";

interface Form {
  id: string;
  title: string;
  description: string;
  responses: number;
  lastResponse: string;
  status: "active" | "draft" | "archived";
  createdAt: string;
}

const mockForms: Form[] = [
  {
    id: "1",
    title: "Customer Feedback Survey",
    description: "Gather customer feedback for our new product",
    responses: 156,
    lastResponse: "2 hours ago",
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Event Registration Form",
    description: "Conference registration for Tech Summit 2024",
    responses: 89,
    lastResponse: "1 day ago",
    status: "active",
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    title: "Job Application",
    description: "Software Developer position",
    responses: 234,
    lastResponse: "3 hours ago",
    status: "active",
    createdAt: "2024-01-08",
  },
  {
    id: "4",
    title: "Contact Form",
    description: "General contact form for website",
    responses: 45,
    lastResponse: "5 days ago",
    status: "draft",
    createdAt: "2024-01-12",
  },
  {
    id: "5",
    title: "Product Survey",
    description: "User experience survey for mobile app",
    responses: 0,
    lastResponse: "Never",
    status: "draft",
    createdAt: "2024-01-20",
  },
];

const stats = [
  {
    title: "Total Forms",
    value: "12",
    change: "+2",
    icon: FileText,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Total Responses",
    value: "524",
    change: "+12%",
    icon: Users,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Active Forms",
    value: "8",
    change: "+1",
    icon: TrendingUp,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "This Month",
    value: "156",
    change: "+23%",
    icon: Calendar,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
];

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredForms = mockForms.filter(form => {
    const matchesSearch = form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         form.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || form.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
            <span className="text-lg font-semibold">Dashboard</span>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Form
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600">{stat.change}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Forms Section */}
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">My Forms</h2>
              <p className="text-gray-600">Manage and track your forms</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search forms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex space-x-2">
            {["all", "active", "draft", "archived"].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>

          {/* Forms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredForms.map((form) => (
              <Card key={form.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <FormInput className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{form.title}</CardTitle>
                        <CardDescription className="text-sm">
                          {form.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Responses</span>
                      <span className="font-medium">{form.responses}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Last Response</span>
                      <span className="font-medium">{form.lastResponse}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Status</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(form.status)}`}>
                        {form.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-4 pt-4 border-t">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share2 className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredForms.length === 0 && (
            <div className="text-center py-12">
              <FormInput className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No forms found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Form
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}