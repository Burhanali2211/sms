import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CalendarEvent } from "@/types/calendar";
import { getEventColor } from "./utils";

interface CalendarGridProps {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  filteredEvents: CalendarEvent[];
  handleViewEvent: (event: CalendarEvent) => void;
}

export const CalendarGrid = ({
  currentMonth,
  setCurrentMonth,
  filteredEvents,
  handleViewEvent
}: CalendarGridProps) => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const month = currentMonth.toLocaleString('default', { month: 'long' });
  const year = currentMonth.getFullYear();
  
  const firstDayOfMonth = new Date(year, currentMonth.getMonth(), 1).getDay();
  const daysInMonth = new Date(year, currentMonth.getMonth() + 1, 0).getDate();
  const prevMonthDays = firstDayOfMonth;
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  const prevMonth = () => setCurrentMonth(new Date(year, currentMonth.getMonth() - 1));
  const nextMonth = () => setCurrentMonth(new Date(year, currentMonth.getMonth() + 1));
  
  const getEventsForDay = (day: number) => {
    const targetDate = new Date(year, currentMonth.getMonth(), day);
    return filteredEvents.filter(event => {
      const eventStartDate = new Date(event.start_date);
      const eventEndDate = new Date(event.end_date);
      return targetDate >= eventStartDate && targetDate <= eventEndDate;
    });
  };

  const today = new Date();
  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>
            {month} {year}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {weekdays.map((day) => (
            <div key={day} className="text-center font-medium p-2">
              {day}
            </div>
          ))}
          
          {Array(prevMonthDays)
            .fill(null)
            .map((_, index) => (
              <div key={`prev-${index}`} className="text-center p-2 text-gray-300">
                {new Date(year, currentMonth.getMonth() - 1, new Date(year, currentMonth.getMonth(), 0).getDate() - prevMonthDays + index + 1).getDate()}
              </div>
            ))}
          
          {days.map((day) => {
            const dayEvents = getEventsForDay(day);
            return (
              <div
                key={day}
                className={`min-h-[80px] border p-1 text-center relative ${
                  isToday(day) ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="text-sm mb-1">{day}</div>
                {dayEvents.length > 0 && (
                  <div className="absolute bottom-1 left-0 right-0 px-1">
                    {dayEvents.map((event) => (
                      <div 
                        key={event.id} 
                        className="flex items-start text-xs mb-1 cursor-pointer hover:opacity-80"
                        onClick={() => handleViewEvent(event)}
                        title={`${event.title} (${event.event_type})`}
                      >
                        <div 
                          className="w-2 h-2 rounded-full mt-1.5 mr-1 flex-shrink-0"
                          style={{ backgroundColor: event.color || getEventColor(event.event_type) }}
                        />
                        <div 
                          className="p-1 text-white rounded truncate flex-grow"
                          style={{ backgroundColor: event.color || getEventColor(event.event_type) }}
                        >
                          {event.title}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
