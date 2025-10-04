-- Add demo notifications and events for testing

-- Insert additional notifications for all users
WITH inserted_notifications AS (
  INSERT INTO notifications (title, message, type, created_by) 
  SELECT 'System Update', 'We have updated the system with new features.', 'info', id
  FROM users
  RETURNING id, created_by
)
INSERT INTO user_notifications (notification_id, user_id)
SELECT id, created_by
FROM inserted_notifications;

-- Insert more notifications with different types
WITH inserted_notifications AS (
  INSERT INTO notifications (title, message, type, created_by) 
  SELECT 'Important Deadline', 'Please submit your assignments by tomorrow.', 'warning', id
  FROM users WHERE role IN ('student', 'teacher')
  RETURNING id, created_by
)
INSERT INTO user_notifications (notification_id, user_id)
SELECT id, created_by
FROM inserted_notifications;

WITH inserted_notifications AS (
  INSERT INTO notifications (title, message, type, created_by) 
  SELECT 'Grade Updated', 'Your latest test grade has been published.', 'success', id
  FROM users WHERE role = 'student'
  RETURNING id, created_by
)
INSERT INTO user_notifications (notification_id, user_id)
SELECT id, created_by
FROM inserted_notifications;

-- Insert more events
INSERT INTO events (title, description, start_date, end_date, location, event_type, color, is_public, created_by)
SELECT 'Parent-Teacher Meeting', 'Discuss student progress with parents.', NOW() + INTERVAL '3 days', NOW() + INTERVAL '3 days 1 hour', 'Conference Room', 'meeting', '#f59e0b', true, id
FROM users WHERE role = 'teacher'
LIMIT 1;

INSERT INTO events (title, description, start_date, end_date, location, event_type, color, is_public, created_by)
SELECT 'Sports Day', 'Annual sports competition for all students.', NOW() + INTERVAL '10 days', NOW() + INTERVAL '10 days 6 hours', 'School Ground', 'event', '#8b5cf6', true, id
FROM users WHERE role = 'admin'
LIMIT 1;

-- Insert some private events
INSERT INTO events (title, description, start_date, end_date, location, event_type, color, is_public, created_by)
SELECT 'Personal Planning', 'Private planning session.', NOW() + INTERVAL '2 days', NOW() + INTERVAL '2 days 1 hour', 'My Office', 'meeting', '#ef4444', false, id
FROM users WHERE role = 'principal'
LIMIT 1;

SELECT 'Demo notifications and events added successfully!' as message;