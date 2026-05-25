import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, MapPin, Plus } from "lucide-react";
import { CalendarEvent } from "@/types/calendar";
import { getEventColor, formatDate } from "./utils";

interface EventListProps {
  filteredEvents: CalendarEvent[];
  isLoading: boolean;
  setIsAddEventOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleViewEvent: (event: CalendarEvent) => void;
}

export const EventList = ({
  filteredEvents,
  isLoading,
  setIsAddEventOpen,
  handleViewEvent
}: EventListProps) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Upcoming Events</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-4 text-muted-foreground">
            Loading events...
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No events found</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setIsAddEventOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create your first event
            </Button>
          </div>
        ) : (
          <div className="space-y-4 max-h-[calc(100vh-400px)] overflow-y-auto">
            {filteredEvents
              .filter(event => new Date(event.start_date) >= new Date())
              .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
              .slice(0, 10)
              .map(event => (
                <div 
                  key={event.id} 
                  className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleViewEvent(event)}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-sm">{event.title}</h3>
                    <Badge 
                      variant="secondary" 
                      style={{ backgroundColor: getEventColor(event.event_type) }}
                      className="text-white"
                    >
                      {event.event_type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <CalendarIcon className="h-3 w-3" />
                    <span>{formatDate(event.start_date)}</span>
                    <Clock className="h-3 w-3 ml-2" />
                    <span>{new Date(event.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{event.location}</span>
                    </div>
                  )}
                  {!event.is_public && (
                    <div className="mt-2">
                      <Badge variant="outline" className="text-xs">
                        Private
                      </Badge>
                    </div>
                  )}
                </div>
              ))
            }
          </div>
        )}
      </CardContent>
    </Card>
  );
};
