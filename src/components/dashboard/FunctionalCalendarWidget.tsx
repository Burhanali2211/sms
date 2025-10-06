import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock, MapPin, Users, Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { apiClient } from "@/utils/api/client";
import { useAuth } from "@/contexts/AuthContext";
import { CalendarEvent } from "@/types/calendar";

const FunctionalCalendarWidget = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    location: '',
    event_type: 'event',
    is_public: true
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getCalendarEvents();
      if (response.error) {
        throw new Error(response.error);
      }
      
      // Transform the response data to match CalendarEvent interface
      const transformedEvents: CalendarEvent[] = ((response.data as any[]) || []).map((event: any) => ({
        id: event.id,
        title: event.title,
        description: event.description,
        start_date: event.start_date,
        end_date: event.end_date,
        location: event.location,
        event_type: event.event_type,
        color: event.color,
        created_by: event.created_by,
        is_public: event.is_public,
        created_at: event.created_at,
        updated_at: event.updated_at
      }));
      
      setEvents(transformedEvents);
    } catch (error) {
      console.error('Calendar widget error:', error);
      toast({
        title: 'Error',
        description: 'Failed to load events',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async () => {
    try {
      // Add created_by to the form data
      const eventData = {
        ...formData,
        created_by: user?.id
      };
      
      const response = await apiClient.createEvent(eventData);
      if (response.error) {
        throw new Error(response.error);
      }
      
      toast({
        title: 'Success',
        description: 'Event created successfully',
      });
      
      setIsCreateDialogOpen(false);
      resetForm();
      fetchEvents();
    } catch (error: any) {
      console.error('Create event error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create event',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateEvent = async () => {
    if (!editingEvent) return;
    
    try {
      const response = await apiClient.updateEvent(editingEvent.id, formData);
      if (response.error) {
        throw new Error(response.error);
      }
      
      toast({
        title: 'Success',
        description: 'Event updated successfully',
      });
      
      setEditingEvent(null);
      resetForm();
      fetchEvents();
    } catch (error: any) {
      console.error('Update event error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update event',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      const response = await apiClient.deleteEvent(eventId);
      if (response.error) {
        throw new Error(response.error);
      }
      
      toast({
        title: 'Success',
        description: 'Event deleted successfully',
      });
      
      fetchEvents();
    } catch (error: any) {
      console.error('Delete event error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete event',
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      start_date: '',
      end_date: '',
      location: '',
      event_type: 'event',
      is_public: true
    });
  };

  const openEditDialog = (event: CalendarEvent) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description || '',
      start_date: event.start_date,
      end_date: event.end_date,
      location: event.location || '',
      event_type: event.event_type || 'event',
      is_public: event.is_public !== undefined ? event.is_public : true
    });
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'class': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'meeting': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'deadline': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'event': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const upcomingEvents = events
    .filter(event => new Date(event.start_date) >= new Date())
    .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Calendar Events
          </CardTitle>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" onClick={resetForm}>
                <Plus className="h-4 w-4 mr-1" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Event title"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Event description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start_date">Start Date</Label>
                    <Input
                      id="start_date"
                      type="datetime-local"
                      value={formData.start_date}
                      onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="end_date">End Date</Label>
                    <Input
                      id="end_date"
                      type="datetime-local"
                      value={formData.end_date}
                      onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Event location"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="event_type">Event Type</Label>
                    <Select value={formData.event_type} onValueChange={(value) => setFormData({...formData, event_type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="event">Event</SelectItem>
                        <SelectItem value="class">Class</SelectItem>
                        <SelectItem value="meeting">Meeting</SelectItem>
                        <SelectItem value="deadline">Deadline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="is_public"
                        checked={formData.is_public}
                        onCheckedChange={(checked) => setFormData({...formData, is_public: checked as boolean})}
                      />
                      <Label htmlFor="is_public">Public Event</Label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={editingEvent ? handleUpdateEvent : handleCreateEvent}>
                    {editingEvent ? 'Update' : 'Create'} Event
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2">Loading events...</p>
          </div>
        ) : upcomingEvents.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No upcoming events</p>
            <p className="text-sm mt-1">Create an event to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium flex items-center gap-2">
                      {event.title}
                      <Badge variant="outline" className={getEventColor(event.event_type || 'event')}>
                        {event.event_type || 'event'}
                      </Badge>
                    </h4>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {formatDate(event.start_date)}
                      </span>
                      {event.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </span>
                      )}
                    </div>
                    {event.description && (
                      <p className="text-sm mt-2 text-muted-foreground line-clamp-2">
                        {event.description}
                      </p>
                    )}
                  </div>
                  {user?.id === event.created_by && (
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={() => openEditDialog(event)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-red-600"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FunctionalCalendarWidget;