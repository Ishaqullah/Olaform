import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  FormInput, 
  Search, 
  Filter,
  Star,
  Users,
  Calendar,
  Mail,
  Phone,
  MapPin,
  FileText,
  Heart,
  MessageSquare,
  ShoppingCart,
  GraduationCap,
  Briefcase
} from "lucide-react";

const templates = [
  {
    id: 1,
    title: "Contact Form",
    description: "Simple contact form for websites and businesses",
    category: "Business",
    icon: Mail,
    fields: 5,
    uses: 1240,
    rating: 4.8,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    title: "Event Registration",
    description: "Collect registrations for events and workshops",
    category: "Events",
    icon: Calendar,
    fields: 8,
    uses: 890,
    rating: 4.9,
    color: "from-green-500 to-green-600",
  },
  {
    id: 3,
    title: "Customer Feedback",
    description: "Gather customer feedback and reviews",
    category: "Business",
    icon: MessageSquare,
    fields: 6,
    uses: 2100,
    rating: 4.7,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: 4,
    title: "Job Application",
    description: "Professional job application form",
    category: "Employment",
    icon: Briefcase,
    fields: 12,
    uses: 650,
    rating: 4.6,
    color: "from-orange-500 to-orange-600",
  },
  {
    id: 5,
    title: "Survey Form",
    description: "Multi-question survey template",
    category: "Research",
    icon: FileText,
    fields: 10,
    uses: 1800,
    rating: 4.8,
    color: "from-red-500 to-red-600",
  },
  {
    id: 6,
    title: "Order Form",
    description: "E-commerce order collection form",
    category: "E-commerce",
    icon: ShoppingCart,
    fields: 7,
    uses: 950,
    rating: 4.9,
    color: "from-indigo-500 to-indigo-600",
  },
  {
    id: 7,
    title: "Student Registration",
    description: "Academic course registration form",
    category: "Education",
    icon: GraduationCap,
    fields: 9,
    uses: 720,
    rating: 4.7,
    color: "from-teal-500 to-teal-600",
  },
  {
    id: 8,
    title: "Appointment Booking",
    description: "Schedule appointments and consultations",
    category: "Services",
    icon: Calendar,
    fields: 6,
    uses: 1100,
    rating: 4.8,
    color: "from-pink-500 to-pink-600",
  },
];

const categories = [
  "All",
  "Business",
  "Events",
  "Employment",
  "Research",
  "E-commerce",
  "Education",
  "Services",
];

export default function TemplatesPage() {
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
            <span className="text-lg font-semibold">Templates</span>
          </div>
          <Button>Create New Form</Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search templates..."
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates.map((template) => {
            const Icon = template.icon;
            return (
              <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${template.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <Button variant="ghost" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-lg mt-3">{template.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {template.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span className="flex items-center">
                      <FileText className="w-4 h-4 mr-1" />
                      {template.fields} fields
                    </span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {template.uses} uses
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-medium">{template.rating}</span>
                    </div>
                    <Button size="sm">Use Template</Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Templates
          </Button>
        </div>
      </div>
    </div>
  );
}