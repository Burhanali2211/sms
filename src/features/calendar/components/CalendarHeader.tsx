import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Grid3X3, List } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EventDialog } from "./EventDialog";
import { CalendarEvent } from "@/types/calendar";

interface CalendarHeaderProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  eventTypeFilter: string;
  setEventTypeFilter: React.Dispatch<React.SetStateAction<string>>;
  eventVisibilityFilter: string;
  setEventVisibilityFilter: React.Dispatch<React.SetStateAction<string>>;
  viewMode: 'month' | 'week' | 'day';
  setViewMode: React.Dispatch<React.SetStateAction<'month' | 'week' | 'day'>>;
  isAddEventOpen: boolean;
  setIsAddEventOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingEventId: string | null;
  newEvent: Partial<CalendarEvent>;
  setNewEvent: React.Dispatch<React.SetStateAction<Partial<CalendarEvent>>>;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCheckboxChange: (checked: boolean) => void;
  handleDialogClose: (open: boolean) => void;
}

export const CalendarHeader = ({
  searchTerm, setSearchTerm,
  eventTypeFilter, setEventTypeFilter,
  eventVisibilityFilter, setEventVisibilityFilter,
  viewMode, setViewMode,
  isAddEventOpen, setIsAddEventOpen,
  editingEventId,
  newEvent, setNewEvent,
  handleSubmit, handleInputChange, handleCheckboxChange, handleDialogClose
}: CalendarHeaderProps) => {
  return (
    <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
      <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-8 w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="event">Events</SelectItem>
              <SelectItem value="class">Classes</SelectItem>
              <SelectItem value="meeting">Meetings</SelectItem>
              <SelectItem value="deadline">Deadlines</SelectItem>
            </SelectContent>
          </Select>
          <Select value={eventVisibilityFilter} onValueChange={setEventVisibilityFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Visibility</SelectItem>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="private">Private</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-2">
        <Button 
          variant={viewMode === 'month' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setViewMode('month')}
        >
          <Grid3X3 className="h-4 w-4 mr-1" />
          Month
        </Button>
        <Button 
          variant={viewMode === 'week' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setViewMode('week')}
        >
          <List className="h-4 w-4 mr-1" />
          Week
        </Button>
        
        <EventDialog 
          isOpen={isAddEventOpen}
          onOpenChange={handleDialogClose}
          isEditing={!!editingEventId}
          eventData={newEvent}
          setEventData={setNewEvent}
          onSubmit={handleSubmit}
          onChange={handleInputChange}
          onCheckboxChange={handleCheckboxChange}
        />
      </div>
    </div>
  );
};
