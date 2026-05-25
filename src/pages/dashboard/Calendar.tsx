import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { toast } from "@/hooks/use-toast";
import { apiClient } from "@/utils/api/client";
import { CalendarEvent } from "@/types/calendar";
import { useCalendar } from "@/features/calendar/hooks/useCalendar";
import { CalendarHeader } from "@/features/calendar/components/CalendarHeader";
import { CalendarGrid } from "@/features/calendar/components/CalendarGrid";
import { EventList } from "@/features/calendar/components/EventList";
import { ViewEventDialog } from "@/features/calendar/components/ViewEventDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const Calendar = () => {
  const { user } = useAuth();
  const { state, actions } = useCalendar();
  const {
    currentMonth, setCurrentMonth,
    isAddEventOpen, setIsAddEventOpen,
    selectedEvent, setSelectedEvent,
    isViewEventOpen, setIsViewEventOpen,
    editingEventId, setEditingEventId,
    newEvent, setNewEvent,
    events, setEvents,
    filteredEvents,
    isLoading,
    viewMode, setViewMode,
    searchTerm, setSearchTerm,
    eventTypeFilter, setEventTypeFilter,
    eventVisibilityFilter, setEventVisibilityFilter
  } = state;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setNewEvent(prev => ({ ...prev, is_public: checked }));
  };

  const handleDialogClose = (open: boolean) => {
    setIsAddEventOpen(open);
    if (!open) {
      setTimeout(() => {
        setEditingEventId(null);
        setNewEvent({
          title: '',
          description: '',
          start_date: new Date().toISOString().slice(0, 16),
          end_date: new Date(Date.now() + 3600000).toISOString().slice(0, 16),
          location: '',
          event_type: 'event',
          is_public: true
        });
      }, 200);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const eventPayload = {
        ...newEvent,
        created_by: user?.id,
        tenant_id: user?.tenant_id
      };
      
      let savedEvent;
      
      if (editingEventId) {
        const response = await apiClient.updateCalendarEvent(editingEventId, eventPayload);
        if (response.error) throw new Error(response.error);
        savedEvent = response.data;
        
        setEvents(events.map(ev => ev.id === editingEventId ? (savedEvent as CalendarEvent) : ev));
        
        toast({
          title: "Event updated",
          description: "Your calendar event has been updated successfully.",
        });
      } else {
        const response = await apiClient.createCalendarEvent(eventPayload);
        if (response.error) throw new Error(response.error);
        savedEvent = response.data;
        
        setEvents([...events, savedEvent as CalendarEvent]);
        
        toast({
          title: "Event created",
          description: "Your calendar event has been created successfully.",
        });
      }
      
      handleDialogClose(false);
    } catch (error) {
      console.error('Failed to save event:', error);
      toast({
        title: "Error",
        description: "Failed to save the event. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteClick = async () => {
    if (!selectedEvent) return;
    
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await apiClient.deleteCalendarEvent(selectedEvent.id);
        if (response.error) throw new Error(response.error);
        
        setEvents(events.filter(e => e.id !== selectedEvent.id));
        setIsViewEventOpen(false);
        toast({
          title: "Event deleted",
          description: "The event has been successfully deleted.",
        });
      } catch (error) {
        console.error('Failed to delete event:', error);
        toast({
          title: "Error",
          description: "Failed to delete the event.",
          variant: "destructive",
        });
      }
    }
  };

  const handleEditClick = (event: CalendarEvent) => {
    setNewEvent({
      title: event.title || '',
      description: event.description || '',
      start_date: event.start_date ? event.start_date.slice(0, 16) : new Date().toISOString().slice(0, 16),
      end_date: event.end_date ? event.end_date.slice(0, 16) : new Date(Date.now() + 3600000).toISOString().slice(0, 16),
      location: event.location || '',
      event_type: event.event_type || 'event',
      is_public: event.is_public !== undefined ? event.is_public : true
    });
    setEditingEventId(event.id);
    setIsViewEventOpen(false);
    setIsAddEventOpen(true);
  };

  const handleViewEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsViewEventOpen(true);
  };

  const stats = actions.getEventStatistics();
  const pieData = [
    { name: 'Events', value: stats.byType.event, color: '#8b5cf6' },
    { name: 'Classes', value: stats.byType.class, color: '#3b82f6' },
    { name: 'Meetings', value: stats.byType.meeting, color: '#10b981' },
    { name: 'Deadlines', value: stats.byType.deadline, color: '#ef4444' }
  ].filter(item => item.value > 0);

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Calendar</h1>
        
        <CalendarHeader 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          eventTypeFilter={eventTypeFilter}
          setEventTypeFilter={setEventTypeFilter}
          eventVisibilityFilter={eventVisibilityFilter}
          setEventVisibilityFilter={setEventVisibilityFilter}
          viewMode={viewMode}
          setViewMode={setViewMode}
          isAddEventOpen={isAddEventOpen}
          setIsAddEventOpen={setIsAddEventOpen}
          editingEventId={editingEventId}
          newEvent={newEvent}
          setNewEvent={setNewEvent}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          handleCheckboxChange={handleCheckboxChange}
          handleDialogClose={handleDialogClose}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <CalendarGrid 
              currentMonth={currentMonth}
              setCurrentMonth={setCurrentMonth}
              filteredEvents={filteredEvents}
              handleViewEvent={handleViewEvent}
            />
          </div>
          
          <div className="space-y-6">
            <EventList 
              filteredEvents={filteredEvents}
              isLoading={isLoading}
              setIsAddEventOpen={setIsAddEventOpen}
              handleViewEvent={handleViewEvent}
            />

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Events Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full">
                  {pieData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                      No data to display
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <ViewEventDialog 
          isOpen={isViewEventOpen}
          onOpenChange={setIsViewEventOpen}
          selectedEvent={selectedEvent}
          currentUserId={user?.id}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
      </div>
    </DashboardLayout>
  );
};

export default Calendar;