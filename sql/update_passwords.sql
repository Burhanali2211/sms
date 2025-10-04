-- Update all existing users with the demo password "password123"
-- Password hash for "password123": $2b$10$90eb/NgU5V21mlaB3DiDMOfUCkPKzlit6LVVKV3BcrOKG9G.20v6u

UPDATE users SET 
    password_hash = '$2b$10$90eb/NgU5V21mlaB3DiDMOfUCkPKzlit6LVVKV3BcrOKG9G.20v6u';

-- Update user details for consistency
UPDATE users SET name = 'Alex Student' WHERE email = 'student@edusync.com';
UPDATE users SET name = 'Taylor Teacher' WHERE email = 'teacher@edusync.com';
UPDATE users SET name = 'Pat Principal' WHERE email = 'principal@edusync.com';
UPDATE users SET name = 'Admin User' WHERE email = 'admin@edusync.com';
UPDATE users SET name = 'Finance Manager' WHERE email = 'financial@edusync.com';
UPDATE users SET name = 'Librarian' WHERE email = 'library@edusync.com';
UPDATE users SET name = 'Lab Technician' WHERE email = 'labs@edusync.com';
UPDATE users SET name = 'Admission Officer' WHERE email = 'admission@edusync.com';
UPDATE users SET name = 'Club Coordinator' WHERE email = 'club@edusync.com';
UPDATE users SET name = 'Super Administrator' WHERE email = 'superadmin@edusync.com';

SELECT 'All user passwords updated successfully!' as message;