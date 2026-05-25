import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
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
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Pencil, Trash2, MoreHorizontal, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ClassroomsProps {
  classrooms: any[];
  isAddingClassroom: boolean;
  setIsAddingClassroom: (open: boolean) => void;
  newClassroom: any;
  setNewClassroom: (classroom: any) => void;
  buildings: string[];
  handleAddClassroom: () => void;
  handleDeleteClassroom: (id: string) => void;
}

export const Classrooms = ({
  classrooms,
  isAddingClassroom,
  setIsAddingClassroom,
  newClassroom,
  setNewClassroom,
  buildings,
  handleAddClassroom,
  handleDeleteClassroom
}: ClassroomsProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Classrooms & Facilities</CardTitle>
          <CardDescription>
            Manage all classrooms and facilities in the school
          </CardDescription>
        </div>
        <Dialog open={isAddingClassroom} onOpenChange={setIsAddingClassroom}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Classroom
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Classroom</DialogTitle>
              <DialogDescription>
                Enter the details for the new classroom or facility.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="room-name">Room Name</Label>
                <Input 
                  id="room-name" 
                  placeholder="e.g., Room 101"
                  value={newClassroom.name}
                  onChange={(e) => setNewClassroom({...newClassroom, name: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="building">Building</Label>
                  <Select 
                    value={newClassroom.building}
                    onValueChange={(value) => setNewClassroom({...newClassroom, building: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select building" />
                    </SelectTrigger>
                    <SelectContent>
                      {buildings.map((building) => (
                        <SelectItem key={building} value={building}>
                          {building}
                        </SelectItem>
                      ))}
                      <SelectItem value="New Building">New Building</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="floor">Floor</Label>
                  <Input 
                    id="floor" 
                    type="number" 
                    min={0}
                    value={newClassroom.floor}
                    onChange={(e) => setNewClassroom({...newClassroom, floor: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="capacity">Capacity (seats)</Label>
                <Input 
                  id="capacity" 
                  type="number" 
                  min={1}
                  value={newClassroom.capacity}
                  onChange={(e) => setNewClassroom({...newClassroom, capacity: parseInt(e.target.value)})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="features">Features (comma separated)</Label>
                <Input 
                  id="features" 
                  placeholder="e.g., Projector, Whiteboard, Computers"
                  onChange={(e) => setNewClassroom({
                    ...newClassroom, 
                    features: e.target.value.split(',').map(f => f.trim()).filter(f => f)
                  })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingClassroom(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddClassroom}>
                Add Classroom
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Building</TableHead>
              <TableHead>Floor</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Features</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classrooms.map((classroom) => (
              <TableRow key={classroom.id}>
                <TableCell className="font-medium">{classroom.name}</TableCell>
                <TableCell>{classroom.building}</TableCell>
                <TableCell>{classroom.floor}</TableCell>
                <TableCell>{classroom.capacity} seats</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {classroom.features.map((feature: string, index: number) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
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
                      <DropdownMenuItem onClick={() => {
                        toast({
                          title: "Edit Classroom",
                          description: `Editing ${classroom.name}`,
                        });
                      }}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        toast({
                          title: "View Schedule",
                          description: `Viewing schedule for ${classroom.name}`,
                        });
                      }}>
                        <Calendar className="h-4 w-4 mr-2" />
                        View Schedule
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => handleDeleteClassroom(classroom.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
