import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface NewApplicationDialogProps {
  isAddingApplication: boolean;
  setIsAddingApplication: (open: boolean) => void;
  newApplication: any;
  setNewApplication: (app: any) => void;
  handleAddApplication: () => void;
  grades: string[];
}

export const NewApplicationDialog = ({
  isAddingApplication,
  setIsAddingApplication,
  newApplication,
  setNewApplication,
  handleAddApplication,
  grades
}: NewApplicationDialogProps) => {
  return (
    <Dialog open={isAddingApplication} onOpenChange={setIsAddingApplication}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          New Application
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>New Admission Application</DialogTitle>
          <DialogDescription>
            Enter student and parent information for a new admission application.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="student-name">Student Name*</Label>
              <Input
                id="student-name"
                placeholder="Full name of student"
                value={newApplication.studentName}
                onChange={(e) => setNewApplication({ ...newApplication, studentName: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="parent-name">Parent/Guardian Name*</Label>
              <Input
                id="parent-name"
                placeholder="Full name of parent/guardian"
                value={newApplication.parentName}
                onChange={(e) => setNewApplication({ ...newApplication, parentName: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address*</Label>
              <Input
                id="email"
                type="email"
                placeholder="Contact email"
                value={newApplication.email}
                onChange={(e) => setNewApplication({ ...newApplication, email: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="Contact phone number"
                value={newApplication.phone}
                onChange={(e) => setNewApplication({ ...newApplication, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="grade">Grade Applying For*</Label>
            <Select
              onValueChange={(value) => setNewApplication({ ...newApplication, grade: value })}
            >
              <SelectTrigger id="grade">
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                {grades.map((grade) => (
                  <SelectItem key={grade} value={grade}>
                    Grade {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional information about the applicant"
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsAddingApplication(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddApplication}>
            Submit Application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
