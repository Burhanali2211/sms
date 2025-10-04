export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start_date: string; // ISO format date string
  end_date: string; // ISO format date string
  location?: string;
  event_type?: string;
  color?: string;
  created_by: string;
  is_public?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CalendarViewOptions {
  view: 'month' | 'week' | 'day' | 'agenda';
  date: Date;
}

export interface EventAction {
  type: 'add' | 'update' | 'delete';
  event: CalendarEvent;
}