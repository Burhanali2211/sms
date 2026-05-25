import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  Clock,
  Download,
  Trash2,
  UploadCloud,
  FileArchive,
  Check,
  AlertTriangle,
  Play,
  RefreshCw,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Backup } from "./types";
import { RestoreDialog } from "./RestoreDialog";

interface BackupListProps {
  backups: Backup[];
}

export const BackupList = ({ backups }: BackupListProps) => {
  const [backupInProgress, setBackupInProgress] = useState<boolean>(false);
  const [backupProgress, setBackupProgress] = useState<number>(0);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState<boolean>(false);
  const [selectedBackup, setSelectedBackup] = useState<Backup | null>(null);

  const handleStartBackup = () => {
    if (backupInProgress) return;
    
    setBackupInProgress(true);
    setBackupProgress(0);
    
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setBackupInProgress(false);
          
          toast({
            title: "Backup Completed",
            description: "Full system backup has been created successfully."
          });
          
          return 100;
        }
        return prev + 5;
      });
    }, 300);
  };

  const handleRestore = () => {
    if (!selectedBackup) return;
    
    setRestoreDialogOpen(false);
    
    toast({
      title: "Restore Started",
      description: `Restoring system from backup: ${selectedBackup.name}`
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Backups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{backups.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Available for recovery</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Latest Backup</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium">
              {backups[0]?.date} {backups[0]?.time}
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <Check className="h-3.5 w-3.5 mr-1 text-green-500" />
              {backups[0]?.name}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.4 GB</div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>42% of quota</span>
              <span>8 GB allocated</span>
            </div>
            <Progress value={42} className="h-1 mt-2" />
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Backup History</CardTitle>
              <CardDescription>View and manage system backups</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleStartBackup}
                disabled={backupInProgress}
              >
                <UploadCloud className="h-4 w-4 mr-2" />
                Create Backup
              </Button>
            </div>
          </div>
          
          {backupInProgress && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Creating full system backup...</span>
                <span>{backupProgress}%</span>
              </div>
              <Progress value={backupProgress} className="h-2" />
            </div>
          )}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {backups.map((backup) => (
                <TableRow key={backup.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <FileArchive className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{backup.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        {backup.date}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        {backup.time}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={backup.type === 'full' ? "secondary" : "outline"}>
                      {backup.type === 'full' ? 'Full' : 'Incremental'}
                    </Badge>
                  </TableCell>
                  <TableCell>{backup.size}</TableCell>
                  <TableCell>
                    {backup.status === 'completed' ? (
                      <span className="inline-flex items-center text-green-600">
                        <Check className="h-4 w-4 mr-1" />
                        Completed
                      </span>
                    ) : backup.status === 'failed' ? (
                      <span className="inline-flex items-center text-red-600">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Failed
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-blue-600">
                        <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                        In Progress
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Downloading Backup",
                            description: `Preparing ${backup.name} for download.`
                          });
                        }}
                      >
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={backup.status !== 'completed'}
                        onClick={() => {
                          setSelectedBackup(backup);
                          setRestoreDialogOpen(true);
                        }}
                      >
                        <Play className="h-4 w-4" />
                        <span className="sr-only">Restore</span>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Backup Deleted",
                            description: `${backup.name} has been deleted.`
                          });
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <RestoreDialog 
        open={restoreDialogOpen} 
        onOpenChange={setRestoreDialogOpen}
        selectedBackup={selectedBackup}
        onRestore={handleRestore}
      />
    </>
  );
};
