import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarEvent } from "@/types/calendar";

interface DashboardEventsProps {
  events: CalendarEvent[];
}

const DashboardEvents = ({ events }: DashboardEventsProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events && events.length > 0 ? events.slice(0, 3).map((event) => (
            <div key={event.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(event.start_date).toLocaleDateString()} • {new Date(event.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          )) : (
            <div className="text-center py-4 text-muted-foreground">
              No upcoming events
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardEvents;