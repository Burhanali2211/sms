import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { BackupSchedule } from "./types";

interface BackupSchedulesProps {
  schedules: BackupSchedule[];
  setSchedules: React.Dispatch<React.SetStateAction<BackupSchedule[]>>;
}

export const BackupSchedules = ({ schedules, setSchedules }: BackupSchedulesProps) => {
  const [createScheduleOpen, setCreateScheduleOpen] = useState<boolean>(false);
  const [newSchedule, setNewSchedule] = useState<Partial<BackupSchedule>>({
    name: '',
    frequency: 'daily',
    retention: '7 days',
    time: '00:00',
    enabled: true
  });

  const toggleScheduleStatus = (id: string) => {
    setSchedules(prev => 
      prev.map(schedule => 
        schedule.id === id 
          ? { ...schedule, enabled: !schedule.enabled } 
          : schedule
      )
    );
    
    const schedule = schedules.find(s => s.id === id);
    if (schedule) {
      toast({
        title: schedule.enabled ? "Schedule Disabled" : "Schedule Enabled",
        description: `Backup schedule "${schedule.name}" has been ${schedule.enabled ? 'disabled' : 'enabled'}.`
      });
    }
  };

  const handleCreateSchedule = () => {
    if (!newSchedule.name) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Schedule name is required."
      });
      return;
    }
    
    const now = new Date();
    const nextRun = new Date();
    const [hours, minutes] = newSchedule.time?.split(':') || ['00', '00'];
    nextRun.setHours(parseInt(hours), parseInt(minutes), 0);
    
    if (nextRun <= now) {
      nextRun.setDate(nextRun.getDate() + 1);
    }
    
    const schedule: BackupSchedule = {
      id: (schedules.length + 1).toString(),
      name: newSchedule.name,
      frequency: newSchedule.frequency as 'daily' | 'weekly' | 'monthly',
      retention: newSchedule.retention || '7 days',
      time: newSchedule.time || '00:00',
      nextRun: nextRun.toISOString().split('T')[0] + ' ' + newSchedule.time,
      enabled: newSchedule.enabled ?? true
    };
    
    setSchedules([...schedules, schedule]);
    setCreateScheduleOpen(false);
    
    toast({
      title: "Schedule Created",
      description: `Backup schedule "${schedule.name}" has been created.`
    });
    
    setNewSchedule({
      name: '',
      frequency: 'daily',
      retention: '7 days',
      time: '00:00',
      enabled: true
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Backup Schedules</CardTitle>
            <CardDescription>Configure automated backup schedules</CardDescription>
          </div>
          <Dialog open={createScheduleOpen} onOpenChange={setCreateScheduleOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Schedule
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Backup Schedule</DialogTitle>
                <DialogDescription>
                  Configure a new automated backup schedule
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Schedule Name</Label>
                  <Input 
                    id="name"
                    placeholder="Enter schedule name"
                    value={newSchedule.name}
                    onChange={(e) => setNewSchedule({...newSchedule, name: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select
                    value={newSchedule.frequency}
                    onValueChange={(value) => setNewSchedule({...newSchedule, frequency: value as any})}
                  >
                    <SelectTrigger id="frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="time">Time</Label>
                  <Input 
                    id="time"
                    type="time"
                    value={newSchedule.time}
                    onChange={(e) => setNewSchedule({...newSchedule, time: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="retention">Retention Period</Label>
                  <Select
                    value={newSchedule.retention}
                    onValueChange={(value) => setNewSchedule({...newSchedule, retention: value})}
                  >
                    <SelectTrigger id="retention">
                      <SelectValue placeholder="Select retention period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7 days">7 Days</SelectItem>
                      <SelectItem value="14 days">14 Days</SelectItem>
                      <SelectItem value="30 days">30 Days</SelectItem>
                      <SelectItem value="90 days">90 Days</SelectItem>
                      <SelectItem value="1 year">1 Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center gap-2">
                  <Label htmlFor="enabled">Enabled</Label>
                  <Switch 
                    id="enabled"
                    checked={newSchedule.enabled}
                    onCheckedChange={(checked) => setNewSchedule({...newSchedule, enabled: checked})}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline"
                  onClick={() => setCreateScheduleOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateSchedule}>
                  Create Schedule
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Retention</TableHead>
              <TableHead>Next Run</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedules.map((schedule) => (
              <TableRow key={schedule.id}>
                <TableCell>
                  <div className="font-medium">{schedule.name}</div>
                </TableCell>
                <TableCell className="capitalize">{schedule.frequency}</TableCell>
                <TableCell>{schedule.time}</TableCell>
                <TableCell>{schedule.retention}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <div>{schedule.nextRun}</div>
                    {schedule.lastRun && (
                      <div className="text-xs text-muted-foreground">
                        Last run: {schedule.lastRun}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={schedule.enabled ? "outline" : "secondary"} className={
                    schedule.enabled 
                      ? "bg-green-100 text-green-800 hover:bg-green-100" 
                      : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                  }>
                    {schedule.enabled ? 'Enabled' : 'Disabled'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toggleScheduleStatus(schedule.id)}
                    >
                      {schedule.enabled ? 'Disable' : 'Enable'}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Schedule Deleted",
                          description: `${schedule.name} has been deleted.`
                        });
                        setSchedules(schedules.filter(s => s.id !== schedule.id));
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
  );
};
