import { useState, useEffect } from "react";
import { CalendarEvent } from "@/types/calendar";
import { apiClient } from "@/utils/api/client";
import { toast } from "@/hooks/use-toast";
import { MOCK_EVENTS } from "@/data/mock/dashboard";

const isDemoToken = () => {
  const token = localStorage.getItem('authToken');
  return !token || token.startsWith('demo-token-');
};

const toCalendarEvents = (mockEvents: typeof MOCK_EVENTS): CalendarEvent[] =>
  mockEvents.map(e => ({
    id: e.id,
    title: e.title,
    description: e.description,
    start_date: e.start_date,
    end_date: e.end_date,
    location: e.location || '',
    event_type: e.event_type as CalendarEvent['event_type'],
    is_public: true,
    created_by: 'system',
    created_at: e.start_date
  }));

export const useCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isViewEventOpen, setIsViewEventOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  
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
  const [filteredEvents, setFilteredEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [searchTerm, setSearchTerm] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('all');
  const [eventVisibilityFilter, setEventVisibilityFilter] = useState('all');

  const fetchEvents = async () => {
    setIsLoading(true);
    if (isDemoToken()) {
      setEvents(toCalendarEvents(MOCK_EVENTS));
      setIsLoading(false);
      return;
    }
    try {
      const response = await apiClient.getCalendarEvents();
      if (response.error) throw new Error(response.error);
      let eventsData = response.data;
      if (!Array.isArray(eventsData) && eventsData !== undefined) {
        eventsData = Array.isArray(eventsData) ? eventsData : [eventsData];
      } else if (eventsData === undefined && Array.isArray(response)) {
        eventsData = response;
      }
      setEvents((eventsData as CalendarEvent[]) || toCalendarEvents(MOCK_EVENTS));
    } catch {
      setEvents(toCalendarEvents(MOCK_EVENTS));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let result = [...events];
    
    if (searchTerm) {
      result = result.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (event.location && event.location.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (eventTypeFilter !== 'all') {
      result = result.filter(event => event.event_type === eventTypeFilter);
    }
    
    if (eventVisibilityFilter !== 'all') {
      result = result.filter(event => 
        eventVisibilityFilter === 'public' ? event.is_public : !event.is_public
      );
    }
    
    setFilteredEvents(result);
  }, [events, searchTerm, eventTypeFilter, eventVisibilityFilter]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const getEventStatistics = () => {
    return {
      total: filteredEvents.length,
      public: filteredEvents.filter(e => e.is_public).length,
      private: filteredEvents.filter(e => !e.is_public).length,
      byType: {
        event: filteredEvents.filter(e => e.event_type === 'event').length,
        class: filteredEvents.filter(e => e.event_type === 'class').length,
        meeting: filteredEvents.filter(e => e.event_type === 'meeting').length,
        deadline: filteredEvents.filter(e => e.event_type === 'deadline').length
      }
    };
  };

  return {
    state: {
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
    },
    actions: {
      fetchEvents,
      getEventStatistics
    }
  };
};
