import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, MapPin, Edit, X } from "lucide-react";
import { CalendarEvent } from "@/types/calendar";
import { getEventColor, formatDate } from "./utils";

interface ViewEventDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedEvent: CalendarEvent | null;
  currentUserId?: string;
  onEditClick: (event: CalendarEvent) => void;
  onDeleteClick: () => void;
}

export const ViewEventDialog = ({
  isOpen,
  onOpenChange,
  selectedEvent,
  currentUserId,
  onEditClick,
  onDeleteClick
}: ViewEventDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center pr-4">
            <span>{selectedEvent?.title}</span>
            <div className="flex gap-1">
              <Button
                variant="ghost" 
                size="icon"
                className="h-6 w-6 rounded-full"
                onClick={() => selectedEvent && onEditClick(selectedEvent)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost" 
                size="icon"
                className="h-6 w-6 rounded-full"
                onClick={onDeleteClick}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Event Type</h4>
              <div className="flex items-center gap-2 mt-1">
                <span 
                  className="text-xs px-2 py-1 rounded-full text-white"
                  style={{ backgroundColor: selectedEvent?.color || getEventColor(selectedEvent?.event_type) }}
                >
                  {selectedEvent?.event_type}
                </span>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
              <p className="text-sm mt-1">
                {selectedEvent?.description || 'No description provided'}
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Date & Time</h4>
              <div className="flex items-center gap-2 mt-1 text-sm">
                <CalendarIcon className="h-4 w-4" />
                <span>{selectedEvent?.start_date && formatDate(selectedEvent.start_date)}</span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-sm">
                <Clock className="h-4 w-4" />
                <span>
                  {selectedEvent?.start_date && new Date(selectedEvent.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                  {selectedEvent?.end_date && new Date(selectedEvent.end_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
            
            {selectedEvent?.location && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Location</h4>
                <div className="flex items-center gap-2 mt-1 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>{selectedEvent.location}</span>
                </div>
              </div>
            )}
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Visibility</h4>
              <div className="flex items-center gap-2 mt-1">
                {selectedEvent?.is_public ? (
                  <Badge variant="default">Public</Badge>
                ) : (
                  <Badge variant="secondary">Private</Badge>
                )}
              </div>
            </div>
            
            {currentUserId === selectedEvent?.created_by && (
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Event Actions</h4>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => selectedEvent && onEditClick(selectedEvent)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={onDeleteClick}>
                    <X className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
