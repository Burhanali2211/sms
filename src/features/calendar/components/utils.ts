export const getEventColor = (type: string = 'event') => {
  switch (type) {
    case 'class': return '#3b82f6'; // blue
    case 'meeting': return '#10b981'; // green
    case 'deadline': return '#ef4444'; // red
    case 'event': return '#8b5cf6'; // purple
    default: return '#6366f1'; // indigo
  }
};

export const formatDate = (dateString: string) => {
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
