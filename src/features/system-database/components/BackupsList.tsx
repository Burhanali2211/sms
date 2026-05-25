import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BackupsListProps {
  mockBackups: any[];
  handleDownloadBackup: (id: number) => void;
  handleCreateBackup: () => void;
}

export const BackupsList = ({ mockBackups, handleDownloadBackup, handleCreateBackup }: BackupsListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Database Backups</CardTitle>
        <CardDescription>
          Manage system database backups
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Backup Schedule</h3>
            <p className="text-sm text-muted-foreground">
              Daily automatic backups at 2:00 AM
            </p>
          </div>
          <Button onClick={handleCreateBackup}>
            Create Backup Now
          </Button>
        </div>

        <Separator />

        <div>
          <h3 className="font-medium mb-3">Recent Backups</h3>
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Filename</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockBackups.map((backup) => (
                  <TableRow key={backup.id}>
                    <TableCell className="font-medium">{backup.filename}</TableCell>
                    <TableCell>{backup.size}</TableCell>
                    <TableCell>{backup.created}</TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${backup.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                          }`}
                      >
                        {backup.status}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadBackup(backup.id)}
                      >
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
