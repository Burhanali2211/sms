import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, Filter, BarChart3, PieChart, LineChart, Calendar, User, BookOpen, DollarSign, Beaker, Users, Search, Eye, FileText, RefreshCw } from "lucide-react";
import { UserRole } from "@/types/dashboard";
import { useReports } from "@/hooks/use-reports";
import { toast } from "@/hooks/use-toast";

// Mock data for different report types
const mockReports = {
  academic: [
    { id: 1, title: "Student Performance Report", description: "Detailed analysis of student grades and performance metrics", type: "academic", lastGenerated: "2023-05-15", status: "generated" },
    { id: 2, title: "Attendance Summary", description: "Comprehensive attendance records for all students", type: "academic", lastGenerated: "2023-05-14", status: "generated" },
    { id: 3, title: "Course Completion Rates", description: "Analysis of course completion across different departments", type: "academic", lastGenerated: "2023-05-10", status: "scheduled" },
  ],
  financial: [
    { id: 4, title: "Fee Collection Report", description: "Detailed breakdown of fee collections and pending payments", type: "financial", lastGenerated: "2023-05-12", status: "generated" },
    { id: 5, title: "Budget Utilization", description: "Monthly budget allocation and expenditure analysis", type: "financial", lastGenerated: "2023-05-05", status: "generated" },
  ],
  administrative: [
    { id: 6, title: "User Activity Report", description: "Login statistics and user engagement metrics", type: "administrative", lastGenerated: "2023-05-13", status: "generated" },
    { id: 7, title: "Resource Utilization", description: "Usage statistics for library, labs and other resources", type: "administrative", lastGenerated: "2023-05-11", status: "pending" },
  ],
  events: [
    { id: 8, title: "Event Participation", description: "Attendance and engagement in school events", type: "events", lastGenerated: "2023-05-08", status: "generated" },
  ]
};

// Mock data for user roles that can be viewed
const mockUserRoles = [
  { id: "student", name: "Students" },
  { id: "teacher", name: "Teachers" },
  { id: "admin", name: "Administrators" },
  { id: "principal", name: "Principal" },
  { id: "financial", name: "Financial Staff" },
  { id: "library", name: "Library Staff" },
  { id: "labs", name: "Lab Assistants" },
  { id: "super-admin", name: "Super Admin" },
];

// Mock data for report history
const mockReportHistory = [
  { id: 1, title: "Student Performance Report", generatedBy: "Admin User", date: "2023-05-15", format: "PDF", size: "2.4 MB" },
  { id: 2, title: "Attendance Summary", generatedBy: "Principal", date: "2023-05-14", format: "Excel", size: "1.8 MB" },
  { id: 3, title: "Fee Collection Report", generatedBy: "Financial Staff", date: "2023-05-12", format: "PDF", size: "3.1 MB" },
  { id: 4, title: "User Activity Report", generatedBy: "System", date: "2023-05-13", format: "CSV", size: "0.9 MB" },
];

const Reports = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const { reports, history, loading, error, generateReport, exportReport, viewReport } = useReports();
  
  const [filteredReports, setFilteredReports] = useState<any[]>([]);

  // Filter reports based on active tab, selected role and search term
  useEffect(() => {
    let result = reports;
    
    if (activeTab !== "all") {
      result = result.filter(report => report.type === activeTab);
    }
    
    if (searchTerm) {
      result = result.filter(report => 
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredReports(result);
  }, [activeTab, reports, searchTerm]);

  const handleGenerateReport = async (reportId: number) => {
    try {
      const result = await generateReport(reportId, 'pdf');
      toast({
        title: "Report Generated",
        description: `Report generated successfully. ${(result as any).message}`
      });
    } catch (err) {
      toast({
        title: "Generation Failed",
        description: `Failed to generate report: ${err}`,
        variant: "destructive"
      });
    }
  };

  const handleExportReport = async (reportId: number) => {
    try {
      const result = await exportReport(reportId, 'pdf');
      toast({
        title: "Report Exported",
        description: `Report exported successfully. ${(result as any).message}`
      });
    } catch (err) {
      toast({
        title: "Export Failed",
        description: `Failed to export report: ${err}`,
        variant: "destructive"
      });
    }
  };

  const handleViewReport = async (reportId: number) => {
    try {
      const result = await viewReport(reportId);
      toast({
        title: "Report Viewed",
        description: `Report viewed successfully. ${(result as any).message}`
      });
    } catch (err) {
      toast({
        title: "View Failed",
        description: `Failed to view report: ${err}`,
        variant: "destructive"
      });
    }
  };

  // Determine which roles can be viewed based on current user role
  const getViewableRoles = () => {
    switch (user?.role) {
      case "principal":
      case "super-admin":
        return mockUserRoles;
      case "admin":
        return mockUserRoles.filter(role => ["student", "teacher"].includes(role.id));
      default:
        return [{ id: user?.role || "self", name: "My Reports" }];
    }
  };

  const viewableRoles = getViewableRoles();

  // Get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "generated": return "default";
      case "pending": return "secondary";
      case "scheduled": return "outline";
      default: return "default";
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <DashboardHeader title="Reports" />
        <main className="flex-1 overflow-auto dashboard-content p-6 flex items-center justify-center">
          <div>Loading reports...</div>
        </main>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <DashboardHeader title="Reports" />
        <main className="flex-1 overflow-auto dashboard-content p-6 flex items-center justify-center">
          <div>Error loading reports: {error}</div>
        </main>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardHeader title="Reports" />

      <main className="flex-1 overflow-auto dashboard-content p-6 space-y-6">
        <div className="flex flex-col gap-6">
          {/* Report Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Report Dashboard
              </CardTitle>
              <CardDescription>
                Generate and view reports based on your role and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div className="flex flex-col gap-2 w-full md:w-auto">
                  <label className="text-sm font-medium">Report Category</label>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                      <TabsTrigger value="all">All Reports</TabsTrigger>
                      <TabsTrigger value="academic">Academic</TabsTrigger>
                      <TabsTrigger value="financial">Financial</TabsTrigger>
                      <TabsTrigger value="administrative">Administrative</TabsTrigger>
                      <TabsTrigger value="events">Events</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {viewableRoles.length > 1 && (
                  <div className="flex flex-col gap-2 w-full md:w-auto">
                    <label className="text-sm font-medium">View Reports For</label>
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        {viewableRoles.map((role) => (
                          <SelectItem key={role.id} value={role.id}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="flex flex-col gap-2 w-full md:w-auto flex-1 max-w-md">
                  <label className="text-sm font-medium">Search Reports</label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search reports..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-2 mt-6 md:mt-0">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      // Refresh reports data
                      window.location.reload();
                    }}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                  <Button 
                    onClick={() => {
                      // The filtering is already handled by the useEffect
                      // This button is for visual confirmation
                      toast({
                        title: "Filters Applied",
                        description: "Reports have been filtered based on your selections."
                      });
                    }}
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Apply Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reports Grid */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredReports.map((report: any) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-start justify-between">
                    <span className="text-lg">{report.title}</span>
                    {report.type === "academic" && <BookOpen className="h-5 w-5 text-blue-500" />}
                    {report.type === "financial" && <DollarSign className="h-5 w-5 text-green-500" />}
                    {report.type === "administrative" && <Users className="h-5 w-5 text-purple-500" />}
                    {report.type === "events" && <Calendar className="h-5 w-5 text-red-500" />}
                  </CardTitle>
                  <CardDescription>{report.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <Badge variant={getStatusVariant(report.status)}>{report.status}</Badge>
                    <div className="text-sm text-muted-foreground">
                      Last: {report.lastGenerated}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleViewReport(report.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleGenerateReport(report.id)}
                    >
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Generate
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => handleExportReport(report.id)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Export
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Report History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Recent Report History
              </CardTitle>
              <CardDescription>
                Recently generated reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Title</TableHead>
                    <TableHead>Generated By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map((report: any) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.title}</TableCell>
                      <TableCell>{report.generatedBy}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>{report.format}</TableCell>
                      <TableCell>{report.size}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="mr-2"
                          onClick={() => handleViewReport(report.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleExportReport(report.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Report Statistics */}
          {user?.role && ["principal", "super-admin", "admin"].includes(user.role) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Report Statistics
                </CardTitle>
                <CardDescription>
                  Overview of report generation and usage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">24</div>
                    <div className="text-sm text-muted-foreground">Reports Generated</div>
                  </div>
                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">8</div>
                    <div className="text-sm text-muted-foreground">Active Reports</div>
                  </div>
                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-sm text-muted-foreground">Scheduled Reports</div>
                  </div>
                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">98%</div>
                    <div className="text-sm text-muted-foreground">On-time Delivery</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Reports;