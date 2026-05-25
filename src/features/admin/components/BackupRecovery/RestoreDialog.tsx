import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileArchive, AlertTriangle, Play } from "lucide-react";
import { Backup } from "./types";

interface RestoreDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedBackup: Backup | null;
  onRestore: () => void;
}

export const RestoreDialog = ({ 
  open, 
  onOpenChange, 
  selectedBackup, 
  onRestore 
}: RestoreDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Restore</DialogTitle>
          <DialogDescription>
            Are you sure you want to restore the system from this backup? This action cannot be undone and will replace current data.
          </DialogDescription>
        </DialogHeader>
        
        {selectedBackup && (
          <div className="py-4">
            <div className="rounded-md border p-4">
              <div className="flex items-center">
                <FileArchive className="h-5 w-5 mr-2 text-primary" />
                <div className="font-medium">{selectedBackup.name}</div>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                <div>Date: {selectedBackup.date} {selectedBackup.time}</div>
                <div>Type: {selectedBackup.type === 'full' ? 'Full Backup' : 'Incremental Backup'}</div>
                <div>Size: {selectedBackup.size}</div>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-amber-600 rounded-md bg-amber-50 border border-amber-200 p-3 flex items-start">
              <AlertTriangle className="h-4 w-4 mr-2 mt-0.5" />
              <div>
                <strong>Warning:</strong> Restoring from a backup will replace all current data and settings. The system will be unavailable during the restore process.
              </div>
            </div>
          </div>
        )}
        
        <DialogFooter>
          <Button 
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={onRestore}
          >
            <Play className="h-4 w-4 mr-2" />
            Restore System
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
