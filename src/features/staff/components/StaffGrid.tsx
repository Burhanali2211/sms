import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, CalendarDays, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  joinDate: string;
  status: string;
  avatar: string;
}

interface StaffGridProps {
  staffList: StaffMember[];
}

export const StaffGrid = ({ staffList }: StaffGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {staffList.map((staff) => (
        <Card key={staff.id} className="group border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 bg-white overflow-hidden flex flex-col">
          <CardContent className="p-0 flex flex-col h-full">
            <div className="p-6 flex flex-col items-center text-center pb-5">
              <Avatar className="h-20 w-20 mb-4 ring-2 ring-slate-100 ring-offset-2">
                <AvatarImage src={staff.avatar} className="object-cover" />
                <AvatarFallback className="bg-slate-100 text-slate-600 font-medium text-lg">
                  {staff.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-base font-semibold text-slate-900 leading-tight">{staff.name}</h3>
              <p className="text-sm text-slate-500 font-medium mt-1">{staff.role}</p>
              
              <div className="flex gap-2 mt-3 items-center">
                <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-none font-normal">
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
            
            <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 space-y-2.5 mt-auto flex-1">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                <span className="truncate">{staff.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                <span className="truncate">{staff.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <CalendarDays className="h-4 w-4 text-slate-400 shrink-0" />
                <span className="truncate">Joined {new Date(staff.joinDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-white">
              <Button asChild variant="ghost" className="w-full justify-between text-slate-600 hover:text-slate-900 hover:bg-slate-50">
                <Link to={`/dashboard/staff/${staff.id}`}>
                  View Profile
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
