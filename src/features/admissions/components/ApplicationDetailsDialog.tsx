import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, CheckCircle, XCircle, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ApplicationDetailsDialogProps {
  isViewingApplication: boolean;
  setIsViewingApplication: (open: boolean) => void;
  selectedApplication: any;
  setSelectedApplication: (app: any) => void;
  handleUpdateStatus: (id: string, status: 'pending' | 'approved' | 'rejected') => void;
}

export const ApplicationDetailsDialog = ({
  isViewingApplication,
  setIsViewingApplication,
  selectedApplication,
  setSelectedApplication,
  handleUpdateStatus
}: ApplicationDetailsDialogProps) => {
  return (
    <Dialog
      open={isViewingApplication}
      onOpenChange={(open) => {
        setIsViewingApplication(open);
        if (!open) setSelectedApplication(null);
      }}
    >
      {selectedApplication && (
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              Review application information and make a decision
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Student Name</h3>
                <p className="text-base">{selectedApplication.studentName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Applying for</h3>
                <p className="text-base">Grade {selectedApplication.grade}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Parent/Guardian</h3>
                <p className="text-base">{selectedApplication.parentName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Submitted On</h3>
                <p className="text-base">{selectedApplication.submittedAt}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Email Address</h3>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p className="text-base">{selectedApplication.email}</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Phone Number</h3>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p className="text-base">{selectedApplication.phone}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Current Status</h3>
              {selectedApplication.status === "pending" ? (
                <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  Pending
                </Badge>
              ) : selectedApplication.status === "approved" ? (
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
            </div>

            <div className="border-t pt-4 mt-4">
              <h3 className="font-medium mb-2">Application Notes</h3>
              <p className="text-muted-foreground text-sm">
                No additional notes were provided with this application.
              </p>
            </div>
          </div>
          <DialogFooter>
            <div className="flex space-x-2">
              <Button
                variant="destructive"
                onClick={() => handleUpdateStatus(selectedApplication.id, "rejected")}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsViewingApplication(false)}
              >
                Close
              </Button>
              <Button
                onClick={() => handleUpdateStatus(selectedApplication.id, "approved")}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};
