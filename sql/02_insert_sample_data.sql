-- EduSync Sample Data Insertion Script
-- This script inserts sample users for all available roles

-- Insert sample users for all roles with password "password123"
-- Password hash for "password123": $2b$10$90eb/NgU5V21mlaB3DiDMOfUCkPKzlit6LVVKV3BcrOKG9G.20v6u

INSERT INTO users (email, password_hash, name, role, phone, address) VALUES
('student@edusync.com', '$2b$10$90eb/NgU5V21mlaB3DiDMOfUCkPKzlit6LVVKV3BcrOKG9G.20v6u', 'Alex Student', 'student', '+1234567890', '123 Student St'),
('teacher@edusync.com', '$2b$10$90eb/NgU5V21mlaB3DiDMOfUCkPKzlit6LVVKV3BcrOKG9G.20v6u', 'Taylor Teacher', 'teacher', '+1234567891', '456 Teacher Ave'),
('principal@edusync.com', '$2b$10$90eb/NgU5V21mlaB3DiDMOfUCkPKzlit6LVVKV3BcrOKG9G.20v6u', 'Pat Principal', 'principal', '+1234567892', '789 Principal Blvd'),
('admin@edusync.com', '$2b$10$90eb/NgU5V21mlaB3DiDMOfUCkPKzlit6LVVKV3BcrOKG9G.20v6u', 'Admin User', 'admin', '+1234567893', '101 Admin Rd'),
('financial@edusync.com', '$2b$10$90eb/NgU5V21mlaB3DiDMOfUCkPKzlit6LVVKV3BcrOKG9G.20v6u', 'Finance Manager', 'financial', '+1234567894', '202 Finance Way'),
('library@edusync.com', '$2b$10$90eb/NgU5V21mlaB3DiDMOfUCkPKzlit6LVVKV3BcrOKG9G.20v6u', 'Librarian', 'library', '+1234567895', '303 Library Ln'),
('labs@edusync.com', '$2b$10$90eb/NgU5V21mlaB3DiDMOfUCkPKzlit6LVVKV3BcrOKG9G.20v6u', 'Lab Technician', 'labs', '+1234567896', '404 Lab Ave'),
('admission@edusync.com', '$2b$10$90eb/NgU5V21mlaB3DiDMOfUCkPKzlit6LVVKV3BcrOKG9G.20v6u', 'Admission Officer', 'admission', '+1234567897', '505 Admission Dr'),
('schooladmin@edusync.com', '$2b$10$90eb/NgU5V21mlaB3DiDMOfUCkPKzlit6LVVKV3BcrOKG9G.20v6u', 'School Administrator', 'school-admin', '+1234567898', '606 School Admin St'),
('club@edusync.com', '$2b$10$90eb/NgU5V21mlaB3DiDMOfUCkPKzlit6LVVKV3BcrOKG9G.20v6u', 'Club Coordinator', 'club', '+1234567899', '707 Club Ct'),
('superadmin@edusync.com', '$2b$10$90eb/NgU5V21mlaB3DiDMOfUCkPKzlit6LVVKV3BcrOKG9G.20v6u', 'Super Administrator', 'super-admin', '+1234567800', '808 Super Admin Ave');

-- Insert sample school
INSERT INTO schools (name, address, phone, email) VALUES
('EduSync High School', '123 Education Blvd, Learning City', '+1234567800', 'info@edusync.com');

-- Insert sample students
INSERT INTO students (user_id, student_id, grade, section) 
SELECT id, 'STU001', '10', 'A' FROM users WHERE email = 'student@edusync.com';

-- Insert sample teachers
INSERT INTO teachers (user_id, employee_id, subject) 
SELECT id, 'EMP001', 'Mathematics' FROM users WHERE email = 'teacher@edusync.com';

-- Insert sample notifications for each user
WITH inserted_notifications AS (
  INSERT INTO notifications (title, message, type, created_by) 
  SELECT 'Welcome to EduSync', 'Welcome to the EduSync platform! Your role is ' || role || '.', 'info', id
  FROM users
  RETURNING id, created_by
)
INSERT INTO user_notifications (notification_id, user_id)
SELECT id, created_by
FROM inserted_notifications;

-- Insert sample events
INSERT INTO events (title, description, start_date, end_date, location, event_type, color, is_public, created_by)
SELECT 'Math Quiz', 'Monthly math assessment', NOW() + INTERVAL '1 day', NOW() + INTERVAL '1 day 2 hours', 'Room 101', 'exam', '#3b82f6', true, id
FROM users WHERE role = 'teacher'
UNION ALL
SELECT 'Science Fair', 'Annual science project exhibition', NOW() + INTERVAL '7 days', NOW() + INTERVAL '7 days 8 hours', 'Main Hall', 'event', '#10b981', true, id
FROM users WHERE role = 'teacher'
LIMIT 1;

SELECT 'Sample data inserted successfully!' as message;