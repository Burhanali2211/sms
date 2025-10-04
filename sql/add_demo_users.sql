-- Add missing demo users to edusync_db
-- Password hash for "password123": $2b$10$90eb/NgU5V21mlaB3DiDMOfUCkPKzlit6LVVKV3BcrOKG9G.20v6u

-- Insert missing demo users
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
('superadmin@edusync.com', '$2b$10$90eb/NgU5V21mlaB3DiDMOfUCkPKzlit6LVVKV3BcrOKG9G.20v6u', 'Super Administrator', 'super-admin', '+1234567800', '808 Super Admin Ave')
ON CONFLICT (email) DO NOTHING;

-- Update existing users with known demo credentials if they exist
UPDATE users SET 
    password_hash = '$2b$10$90eb/NgU5V21mlaB3DiDMOfUCkPKzlit6LVVKV3BcrOKG9G.20v6u',
    name = 'Alex Student',
    phone = '+1234567890',
    address = '123 Student St'
WHERE email = 'student@edusync.com';

UPDATE users SET 
    password_hash = '$2b$10$90eb/NgU5V21mlaB3DiDMOfUCkPKzlit6LVVKV3BcrOKG9G.20v6u',
    name = 'Taylor Teacher',
    phone = '+1234567891',
    address = '456 Teacher Ave'
WHERE email = 'teacher@edusync.com';

UPDATE users SET 
    password_hash = '$2b$10$90eb/NgU5V21mlaB3DiDMOfUCkPKzlit6LVVKV3BcrOKG9G.20v6u',
    name = 'Pat Principal',
    phone = '+1234567892',
    address = '789 Principal Blvd'
WHERE email = 'principal@edusync.com';

UPDATE users SET 
    password_hash = '$2b$10$90eb/NgU5V21mlaB3DiDMOfUCkPKzlit6LVVKV3BcrOKG9G.20v6u',
    name = 'Admin User',
    phone = '+1234567893',
    address = '101 Admin Rd'
WHERE email = 'admin@edusync.com';

UPDATE users SET 
    password_hash = '$2b$10$90eb/NgU5V21mlaB3DiDMOfUCkPKzlit6LVVKV3BcrOKG9G.20v6u',
    name = 'Finance Manager',
    phone = '+1234567894',
    address = '202 Finance Way'
WHERE email = 'financial@edusync.com';

UPDATE users SET 
    password_hash = '$2b$10$90eb/NgU5V21mlaB3DiDMOfUCkPKzlit6LVVKV3BcrOKG9G.20v6u',
    name = 'Librarian',
    phone = '+1234567895',
    address = '303 Library Ln'
WHERE email = 'library@edusync.com';

UPDATE users SET 
    password_hash = '$2b$10$90eb/NgU5V21mlaB3DiDMOfUCkPKzlit6LVVKV3BcrOKG9G.20v6u',
    name = 'Lab Technician',
    phone = '+1234567896',
    address = '404 Lab Ave'
WHERE email = 'labs@edusync.com';

UPDATE users SET 
    password_hash = '$2b$10$90eb/NgU5V21mlaB3DiDMOfUCkPKzlit6LVVKV3BcrOKG9G.20v6u',
    name = 'Admission Officer',
    phone = '+1234567897',
    address = '505 Admission Dr'
WHERE email = 'admission@edusync.com';

-- Insert sample notifications for each user
INSERT INTO notifications (title, message, category, priority, created_by) 
SELECT 'Welcome to EduSync', 'Welcome to the EduSync platform! Your role is ' || role || '.', 'general', 'normal', id
FROM users
ON CONFLICT DO NOTHING;

SELECT 'Demo users added/updated successfully!' as message;