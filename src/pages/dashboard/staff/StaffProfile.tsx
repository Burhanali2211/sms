import { useParams, Link } from "react-router-dom";
import { getStaffById } from "@/features/staff/useStaff";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, CalendarDays, MapPin, Briefcase, GraduationCap, Award, BookOpen } from "lucide-react";

const StaffProfile = () => {
  const { id } = useParams<{ id: string }>();
  const staff = getStaffById(id || "");

  if (!staff) {
    return (
      <DashboardLayout>
        <DashboardHeader title="Staff Profile" />
        <div className="flex-1 p-6 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Staff Member Not Found</h2>
          <p className="text-slate-500 mb-6">The staff member you are looking for does not exist or has been removed.</p>
          <Button asChild variant="outline">
            <Link to="/dashboard/staff">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Staff Directory
            </Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardHeader title="Staff Profile" />
      <div className="flex-1 overflow-auto bg-slate-50/50 p-6">
        <div className="w-full space-y-6">
          
          {/* Header Action */}
          <div className="flex items-center justify-between">
            <Button asChild variant="ghost" className="text-slate-500 hover:text-slate-900 -ml-4">
              <Link to="/dashboard/staff">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Staff
              </Link>
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" className="bg-white">Edit Profile</Button>
              <Button>Send Message</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Identity & Contact (Bento) */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
                <div className="h-24 bg-gradient-to-r from-slate-100 to-slate-200" />
                <CardContent className="px-6 pb-6 pt-0 relative">
                  <div className="flex justify-center -mt-12 mb-4">
                    <Avatar className="h-24 w-24 ring-4 ring-white shadow-sm">
                      <AvatarImage src={staff.avatar} className="object-cover" />
                      <AvatarFallback className="bg-slate-100 text-slate-600 font-medium text-2xl">
                        {staff.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="text-center">
                    <h2 className="text-xl font-bold text-slate-900">{staff.name}</h2>
                    <p className="text-slate-500 font-medium mt-1">{staff.role}</p>
                    <div className="flex justify-center gap-2 mt-4">
                      <Badge variant="secondary" className="bg-slate-100 text-slate-700 border-none hover:bg-slate-200 transition-colors cursor-pointer">
                        {staff.department}
                      </Badge>
                      <Badge 
                        variant="outline"
                        className={`border-none font-medium ${
                          staff.status === "active" ? "bg-emerald-50 text-emerald-700" : 
                          staff.status === "leave" ? "bg-amber-50 text-amber-700" : 
                          "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {staff.status === "active" ? "Active" : 
                         staff.status === "leave" ? "On Leave" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-sm bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="p-2 bg-slate-50 rounded-md text-slate-400">
                      <Mail className="h-4 w-4" />
                    </div>
                    <span className="truncate">{staff.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="p-2 bg-slate-50 rounded-md text-slate-400">
                      <Phone className="h-4 w-4" />
                    </div>
                    <span className="truncate">{staff.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="p-2 bg-slate-50 rounded-md text-slate-400">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <span className="truncate">Staff Quarters, EIT Campus</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="p-2 bg-slate-50 rounded-md text-slate-400">
                      <CalendarDays className="h-4 w-4" />
                    </div>
                    <span className="truncate">Joined {new Date(staff.joinDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Details & Stats (Bento) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="border-slate-200 shadow-sm bg-white">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                      <Briefcase className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Experience</p>
                      <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                        {new Date().getFullYear() - new Date(staff.joinDate).getFullYear()}+ Years
                      </h3>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-slate-200 shadow-sm bg-white">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Education</p>
                      <h3 className="text-xl font-bold text-slate-900 mt-0.5">M.Sc, B.Ed</h3>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-slate-200 shadow-sm bg-white">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                      <Award className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Performance</p>
                      <h3 className="text-xl font-bold text-slate-900 mt-0.5">Excellent</h3>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Assigned Classes */}
              <Card className="border-slate-200 shadow-sm bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-slate-400" />
                    Assigned Classes & Subjects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-slate-600">
                        <thead className="text-xs text-slate-500 bg-slate-50 border-b border-slate-200 uppercase tracking-wider">
                          <tr>
                            <th className="px-6 py-3.5 font-medium">Class / Section</th>
                            <th className="px-6 py-3.5 font-medium">Subject</th>
                            <th className="px-6 py-3.5 font-medium">Schedule</th>
                            <th className="px-6 py-3.5 font-medium text-right">Students</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          <tr className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4 font-medium text-slate-900">Grade 10 - A</td>
                            <td className="px-6 py-4">{staff.department}</td>
                            <td className="px-6 py-4">Mon, Wed, Fri (10:00 AM)</td>
                            <td className="px-6 py-4 text-right">32</td>
                          </tr>
                          <tr className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4 font-medium text-slate-900">Grade 10 - B</td>
                            <td className="px-6 py-4">{staff.department}</td>
                            <td className="px-6 py-4">Tue, Thu (11:30 AM)</td>
                            <td className="px-6 py-4 text-right">28</td>
                          </tr>
                          <tr className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4 font-medium text-slate-900">Grade 12 - Science</td>
                            <td className="px-6 py-4">Advanced {staff.department}</td>
                            <td className="px-6 py-4">Mon - Fri (09:00 AM)</td>
                            <td className="px-6 py-4 text-right">24</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StaffProfile;
