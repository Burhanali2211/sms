import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CalendarClock,
  CheckCircle,
  Clock,
  Eye,
  GraduationCap,
  Mail,
  MoreHorizontal,
  XCircle,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AdmissionsTableProps {
  filteredApplications: any[];
  handleViewApplication: (id: string) => void;
  handleUpdateStatus: (id: string, status: 'pending' | 'approved' | 'rejected') => void;
}

export const AdmissionsTable = ({
  filteredApplications,
  handleViewApplication,
  handleUpdateStatus,
}: AdmissionsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student Name</TableHead>
          <TableHead>Grade</TableHead>
          <TableHead>Parent/Guardian</TableHead>
          <TableHead>Submitted</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredApplications.map((app) => (
          <TableRow key={app.id}>
            <TableCell className="font-medium">{app.studentName}</TableCell>
            <TableCell>
              <div className="flex items-center">
                <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Grade {app.grade}</span>
              </div>
            </TableCell>
            <TableCell>
              <div>
                <div>{app.parentName}</div>
                <div className="text-sm text-muted-foreground">{app.email}</div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <CalendarClock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{app.submittedAt}</span>
              </div>
            </TableCell>
            <TableCell>
              {app.status === "pending" ? (
                <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  Pending
                </Badge>
              ) : app.status === "approved" ? (
                <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                  <CheckCircle className="h-3.5 w-3.5 mr-1" />
                  Approved
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                  <XCircle className="h-3.5 w-3.5 mr-1" />
                  Rejected
                </Badge>
              )}
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleViewApplication(app.id)}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    toast({
                      title: "Email Sent",
                      description: `Email sent to ${app.parentName} regarding ${app.studentName}'s application.`,
                    });
                  }}>
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Parent
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleUpdateStatus(app.id, "approved")}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleUpdateStatus(app.id, "rejected")}>
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}

        {filteredApplications.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-6">
              No applications found matching your search.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
