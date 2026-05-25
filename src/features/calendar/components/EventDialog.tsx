import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { CalendarEvent } from "@/types/calendar";

interface EventDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEditing: boolean;
  eventData: Partial<CalendarEvent>;
  setEventData: React.Dispatch<React.SetStateAction<Partial<CalendarEvent>>>;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCheckboxChange: (checked: boolean) => void;
}

export const EventDialog = ({
  isOpen,
  onOpenChange,
  isEditing,
  eventData,
  setEventData,
  onSubmit,
  onChange,
  onCheckboxChange
}: EventDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Event' : 'Add New Event'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update the details of this event.' : 'Create a new calendar event. Fill in the details below.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Event Title *</Label>
              <Input 
                id="title" 
                name="title" 
                value={eventData.title || ''} 
                onChange={onChange}
                placeholder="e.g. Staff Meeting" 
                required 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="start_date">Start Date & Time *</Label>
                <Input 
                  id="start_date" 
                  name="start_date" 
                  type="datetime-local" 
                  value={eventData.start_date || ''} 
                  onChange={onChange}
                  required 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="end_date">End Date & Time *</Label>
                <Input 
                  id="end_date" 
                  name="end_date" 
                  type="datetime-local" 
                  value={eventData.end_date || ''} 
                  onChange={onChange}
                  required 
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="event_type">Event Type</Label>
              <Select 
                value={eventData.event_type || 'event'} 
                onValueChange={(value) => setEventData({...eventData, event_type: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="event">General Event</SelectItem>
                  <SelectItem value="class">Class</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="deadline">Deadline</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                name="location" 
                value={eventData.location || ''} 
                onChange={onChange}
                placeholder="e.g. Room 101, Online" 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={eventData.description || ''} 
                onChange={onChange}
                placeholder="Details about the event..." 
                rows={3} 
              />
            </div>
            
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox 
                id="is_public" 
                checked={eventData.is_public} 
                onCheckedChange={onCheckboxChange}
              />
              <Label htmlFor="is_public" className="cursor-pointer">
                Public event (visible to all users)
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? 'Update Event' : 'Save Event'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
