import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus, X, Edit, Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";
import { CalendarEvent } from "@/types/calendar";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { apiClient } from "@/utils/api/client";
import { useAuth } from "@/contexts/AuthContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Calendar = () => {
  // State for managing date and UI
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isViewEventOpen, setIsViewEventOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  
  // Form state for new event
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    title: "",
    description: "",
    start_date: new Date().toISOString().slice(0, 16),
    end_date: new Date(Date.now() + 3600000).toISOString().slice(0, 16), // 1 hour later
    location: "",
    event_type: "event",
    is_public: true
  });

  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch events from API
  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.getCalendarEvents();
      if (response.error) {
        throw new Error(response.error);
      }
      setEvents((response.data as CalendarEvent[]) || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load events. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Get day names for the calendar header
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  // Get the current month and year
  const month = currentMonth.toLocaleString('default', { month: 'long' });
  const year = currentMonth.getFullYear();
  
  // Get the first day of the month and the number of days in the month
  const firstDayOfMonth = new Date(year, currentMonth.getMonth(), 1).getDay();
  const daysInMonth = new Date(year, currentMonth.getMonth() + 1, 0).getDate();
  
  // Calculate the number of days from the previous month we need to display
  const prevMonthDays = firstDayOfMonth;
  
  // Generate array of days for the current month
  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  
  // Previous and next month navigation
  const prevMonth = () => {
    setCurrentMonth(new Date(year, currentMonth.getMonth() - 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(year, currentMonth.getMonth() + 1));
  };
  
  // Check if a day has events
  const getEventsForDay = (day: number) => {
    const targetDate = new Date(year, currentMonth.getMonth(), day);
    
    return events.filter(event => {
      const eventStartDate = new Date(event.start_date);
      const eventEndDate = new Date(event.end_date);
      
      // Check if the target date falls within the event's date range
      return targetDate >= eventStartDate && targetDate <= eventEndDate;
    });
  };

  // Today's date for highlighting
  const today = new Date();
  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  // Event handlers for the form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setNewEvent(prev => ({ ...prev, is_public: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Format the data to match backend expectations
      const eventToSave = {
        title: newEvent.title,
        description: newEvent.description,
        start_date: newEvent.start_date,
        end_date: newEvent.end_date,
        location: newEvent.location,
        event_type: newEvent.event_type,
        is_public: newEvent.is_public !== undefined ? newEvent.is_public : true
      };
      
      let response;
      if (editingEventId) {
        // Update existing event
        response = await apiClient.updateEvent(editingEventId, eventToSave);
        if (response.error) {
          throw new Error(response.error);
        }
        toast({
          title: "Event Updated",
          description: "Your event has been updated.",
        });
      } else {
        // Create new event
        response = await apiClient.createEvent(eventToSave);
        if (response.error) {
          throw new Error(response.error);
        }
        toast({
          title: "Event Created",
          description: "Your event has been added to the calendar.",
        });
      }
      
      // Reset form and close dialog
      setNewEvent({
        title: "",
        description: "",
        start_date: new Date().toISOString().slice(0, 16),
        end_date: new Date(Date.now() + 3600000).toISOString().slice(0, 16),
        location: "",
        event_type: "event",
        is_public: true
      });
      setEditingEventId(null);
      setIsAddEventOpen(false);
      
      // Refresh events
      fetchEvents();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${editingEventId ? 'update' : 'create'} event. Please try again.`,
        variant: "destructive",
      });
    }
  };
  
  // Function to handle edit button click
  const handleEditClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setEditingEventId(event.id);
    setNewEvent({
      title: event.title || '',
      description: event.description || '',
      start_date: event.start_date ? event.start_date.slice(0, 16) : new Date().toISOString().slice(0, 16),
      end_date: event.end_date ? event.end_date.slice(0, 16) : new Date(Date.now() + 3600000).toISOString().slice(0, 16),
      location: event.location || '',
      event_type: event.event_type || 'event',
      is_public: event.is_public !== undefined ? event.is_public : true
    });
    setIsViewEventOpen(false);
    setIsAddEventOpen(true);
  };
  
  // Function to reset the form when dialog is closed
  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setEditingEventId(null);
      setNewEvent({
        title: "",
        description: "",
        start_date: new Date().toISOString().slice(0, 16),
        end_date: new Date(Date.now() + 3600000).toISOString().slice(0, 16),
        location: "",
        event_type: "event",
        is_public: true
      });
    }
    setIsAddEventOpen(open);
  };
  
  // Function to handle delete button click
  const handleDeleteClick = async () => {
    if (!selectedEvent) return;
    
    try {
      const response = await apiClient.deleteEvent(selectedEvent.id);
      if (response.error) {
        throw new Error(response.error);
      }
      
      toast({
        title: "Event Deleted",
        description: "The event has been removed from your calendar.",
      });
      
      setSelectedEvent(null);
      setIsViewEventOpen(false);
      
      // Refresh events
      fetchEvents();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete event. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Get event color based on type
  const getEventColor = (type: string = 'event') => {
    switch (type) {
      case 'class': return '#3b82f6'; // blue
      case 'meeting': return '#10b981'; // green
      case 'deadline': return '#ef4444'; // red
      case 'event': return '#8b5cf6'; // purple
      default: return '#6366f1'; // indigo
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleViewEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsViewEventOpen(true);
  };

  // Fetch events when component mounts or user changes
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <DashboardLayout>
      <DashboardHeader title="Calendar" />
      <div className="flex-1 overflow-auto bg-gray-50 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
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
                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Weekday headers */}
                  {weekdays.map((day) => (
                    <div key={day} className="text-center font-medium p-2">
                      {day}
                    </div>
                  ))}
                  
                  {/* Empty cells for previous month */}
                  {Array(prevMonthDays)
                    .fill(null)
                    .map((_, index) => (
                      <div key={`prev-${index}`} className="text-center p-2 text-gray-300">
                        {new Date(year, currentMonth.getMonth() - 1, new Date(year, currentMonth.getMonth(), 0).getDate() - prevMonthDays + index + 1).getDate()}
                      </div>
                    ))}
                  
                  {/* Current month days */}
                  {days.map((day) => {
                    const dayEvents = getEventsForDay(day);
                    return (
                      <div
                        key={day}
                        className={`min-h-20 border p-1 text-center relative ${
                          isToday(day) ? 'bg-blue-50 border-blue-200' : ''
                        }`}
                      >
                        <div className="text-sm mb-1">{day}</div>
                        {dayEvents.length > 0 && (
                          <div className="absolute bottom-1 left-0 right-0 px-1">
                            {dayEvents.map((event) => (
                              <div 
                                key={event.id} 
                                className="flex items-start text-xs mb-1 cursor-pointer"
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
          </div>
          
          {/* Upcoming events */}
          <div>
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Upcoming Events</CardTitle>
                  <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Event
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>{editingEventId ? 'Edit Event' : 'Add New Event'}</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                              id="title"
                              name="title"
                              value={newEvent.title}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          
                          <div className="grid gap-2">
                            <Label htmlFor="event_type">Event Type</Label>
                            <Select 
                              name="event_type"
                              value={newEvent.event_type}
                              onValueChange={(value) => setNewEvent(prev => ({ ...prev, event_type: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select event type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="event">Event</SelectItem>
                                <SelectItem value="class">Class</SelectItem>
                                <SelectItem value="meeting">Meeting</SelectItem>
                                <SelectItem value="deadline">Deadline</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              name="description"
                              value={newEvent.description}
                              onChange={handleInputChange}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="start_date">Start Date & Time</Label>
                              <Input
                                id="start_date"
                                name="start_date"
                                type="datetime-local"
                                value={newEvent.start_date}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="end_date">End Date & Time</Label>
                              <Input
                                id="end_date"
                                name="end_date"
                                type="datetime-local"
                                value={newEvent.end_date}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="grid gap-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                              id="location"
                              name="location"
                              value={newEvent.location}
                              onChange={handleInputChange}
                            />
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="is_public"
                              checked={newEvent.is_public}
                              onCheckedChange={handleCheckboxChange}
                            />
                            <Label htmlFor="is_public">Public Event</Label>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">{editingEventId ? 'Update' : 'Create'} Event</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-4 text-muted-foreground">
                    Loading events...
                  </div>
                ) : events.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No upcoming events</p>
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
                  <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                    {events
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
          </div>
        </div>
        
        {/* Event View Dialog */}
        <Dialog open={isViewEventOpen} onOpenChange={setIsViewEventOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>{selectedEvent?.title}</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost" 
                    size="icon"
                    className="h-6 w-6 rounded-full"
                    onClick={() => {
                      setNewEvent({
                        title: selectedEvent?.title || '',
                        description: selectedEvent?.description || '',
                        start_date: selectedEvent?.start_date ? selectedEvent.start_date.slice(0, 16) : new Date().toISOString().slice(0, 16),
                        end_date: selectedEvent?.end_date ? selectedEvent.end_date.slice(0, 16) : new Date(Date.now() + 3600000).toISOString().slice(0, 16),
                        location: selectedEvent?.location || '',
                        event_type: selectedEvent?.event_type || 'event',
                        is_public: selectedEvent?.is_public !== undefined ? selectedEvent.is_public : true
                      });
                      setEditingEventId(selectedEvent?.id || null);
                      setIsViewEventOpen(false);
                      setIsAddEventOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost" 
                    size="icon"
                    className="h-6 w-6 rounded-full"
                    onClick={handleDeleteClick}
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
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Calendar;