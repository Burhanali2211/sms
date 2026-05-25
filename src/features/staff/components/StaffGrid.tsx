import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Phone, Mail, FileText } from "lucide-react";

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {staffList.map((staff) => (
        <Card key={staff.id} className="overflow-hidden">
          <div className="h-2 bg-school-primary" />
          <CardContent className="pt-6">
            <div className="flex flex-col items-center mb-4">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarImage src={staff.avatar} />
                <AvatarFallback>{staff.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-semibold">{staff.name}</h3>
              <p className="text-sm text-muted-foreground">{staff.role}</p>
              <Badge 
                variant={
                  staff.status === "active" ? "default" : 
                  staff.status === "leave" ? "outline" : "secondary"
                }
                className="mt-2"
              >
                {staff.status === "active" ? "Active" : 
                 staff.status === "leave" ? "On Leave" : "Inactive"}
              </Badge>
            </div>
            
            <div className="space-y-2 mt-4">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{staff.department}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{staff.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{staff.phone}</span>
              </div>
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">Joined: {new Date(staff.joinDate).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="flex justify-center mt-6">
              <Button variant="outline" size="sm">View Profile</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
