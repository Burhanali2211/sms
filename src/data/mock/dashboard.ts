import { DashboardStat } from '@/types/dashboard';
import { UserRole } from '@/types/dashboard';

export interface MockNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  is_read: boolean;
  created_at: string;
}

export interface MockEvent {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  event_type: string;
}

const now = new Date();
const dateStr = (offsetDays: number, h = 9, m = 0) => {
  const d = new Date(now);
  d.setDate(d.getDate() + offsetDays);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
};

export const MOCK_STATS_BY_ROLE: Record<string, DashboardStat[]> = {
  'super-admin': [
    { title: 'Total Users', value: '1,248', description: 'Across all roles', change: '+12%', increasing: true },
    { title: 'Active Sessions', value: '342', description: 'Currently logged in', change: '+8%', increasing: true },
    { title: 'System Uptime', value: '99.9%', description: 'Last 30 days', change: '+0.1%', increasing: true },
    { title: 'Pending Alerts', value: '3', description: '2 high, 1 medium', change: '-5', increasing: false },
  ],
  'admin': [
    { title: 'Total Users', value: '1,248', description: 'Across all roles', change: '+12%', increasing: true },
    { title: 'Active Sessions', value: '342', description: 'Currently logged in', change: '+8%', increasing: true },
    { title: 'New This Month', value: '47', description: 'New registrations', change: '+23%', increasing: true },
    { title: 'Inactive Accounts', value: '18', description: 'Require attention', change: '-3', increasing: false },
  ],
  'principal': [
    { title: 'Total Students', value: '847', description: 'Enrolled this year', change: '+5%', increasing: true },
    { title: 'Teaching Staff', value: '62', description: 'Active faculty', change: '+2', increasing: true },
    { title: 'Avg Attendance', value: '94.2%', description: 'This week', change: '+1.3%', increasing: true },
    { title: 'Pending Approvals', value: '7', description: 'Leave & admissions', change: '+2', increasing: false },
  ],
  'teacher': [
    { title: 'My Classes', value: '4', description: 'Active this semester', change: '', increasing: true },
    { title: 'Total Students', value: '136', description: 'Across all classes', change: '', increasing: true },
    { title: 'Avg Class Score', value: '78.4%', description: 'Last assessment', change: '+3.2%', increasing: true },
    { title: 'Pending Grading', value: '23', description: 'Assignments to review', change: '+8', increasing: false },
  ],
  'student': [
    { title: 'Current GPA', value: '3.7', description: 'Out of 4.0', change: '+0.2', increasing: true },
    { title: 'Attendance', value: '96%', description: 'This semester', change: '+1%', increasing: true },
    { title: 'Upcoming Exams', value: '3', description: 'Next 2 weeks', change: '', increasing: false },
    { title: 'Assignments Due', value: '5', description: 'This week', change: '+2', increasing: false },
  ],
  'financial': [
    { title: 'Total Revenue', value: '₹42.6L', description: 'This month', change: '+8.3%', increasing: true },
    { title: 'Pending Fees', value: '₹3.1L', description: '47 students overdue', change: '-12%', increasing: false },
    { title: 'Expenses', value: '₹18.9L', description: 'This month', change: '+2.1%', increasing: false },
    { title: 'Net Surplus', value: '₹23.7L', description: 'Month to date', change: '+14%', increasing: true },
  ],
  'admission': [
    { title: 'Total Applications', value: '184', description: 'This cycle', change: '+22%', increasing: true },
    { title: 'Under Review', value: '43', description: 'Pending decision', change: '', increasing: false },
    { title: 'Accepted', value: '97', description: 'Offers extended', change: '+15%', increasing: true },
    { title: 'Enrolled', value: '81', description: 'Confirmed joiners', change: '+18%', increasing: true },
  ],
  'library': [
    { title: 'Total Books', value: '4,820', description: 'In collection', change: '+34', increasing: true },
    { title: 'Books Issued', value: '312', description: 'Currently borrowed', change: '+18', increasing: true },
    { title: 'Overdue Returns', value: '29', description: 'Past due date', change: '+5', increasing: false },
    { title: 'New Arrivals', value: '18', description: 'Added this month', change: '', increasing: true },
  ],
  'school-admin': [
    { title: 'Total Students', value: '847', description: 'Enrolled this year', change: '+5%', increasing: true },
    { title: 'Teaching Staff', value: '62', description: 'Active faculty', change: '+2', increasing: true },
    { title: 'Support Staff', value: '38', description: 'Non-teaching', change: '', increasing: true },
    { title: 'Open Requests', value: '12', description: 'Staff leave & admin', change: '+3', increasing: false },
  ],
  'labs': [
    { title: 'Total Equipment', value: '342', description: 'Across all labs', change: '+8', increasing: true },
    { title: 'Currently In Use', value: '87', description: 'Active sessions', change: '', increasing: true },
    { title: 'Under Maintenance', value: '14', description: 'Scheduled repairs', change: '-3', increasing: false },
    { title: 'Bookings Today', value: '22', description: 'Lab sessions', change: '+5', increasing: true },
  ],
  'club': [
    { title: 'Active Clubs', value: '12', description: 'Running this semester', change: '+2', increasing: true },
    { title: 'Total Members', value: '634', description: 'Across all clubs', change: '+47', increasing: true },
    { title: 'Events This Month', value: '8', description: 'Club activities', change: '+3', increasing: true },
    { title: 'Pending Requests', value: '5', description: 'New memberships', change: '', increasing: false },
  ],
};

export const MOCK_NOTIFICATIONS: MockNotification[] = [
  { id: 'n-001', title: 'System Backup Completed', message: 'Nightly backup of the database completed successfully. All data secure.', type: 'success', is_read: false, created_at: dateStr(0, 6, 30) },
  { id: 'n-002', title: 'New Student Enrolled', message: 'Preethi Ramachandran has been enrolled in Class X-A. Profile setup required.', type: 'info', is_read: false, created_at: dateStr(0, 8, 15) },
  { id: 'n-003', title: 'Fee Payment Received', message: '₹42,000 fee payment received from Rahul Tiwari (Class XI-B).', type: 'success', is_read: true, created_at: dateStr(-1, 14, 20) },
  { id: 'n-004', title: 'High Memory Usage Alert', message: 'Cache server memory exceeded 85% threshold. Auto-scaling initiated.', type: 'warning', is_read: false, created_at: dateStr(0, 10, 0) },
  { id: 'n-005', title: 'Parent-Teacher Meeting', message: 'Reminder: PTM scheduled for Saturday 31st May. 240 parents have confirmed.', type: 'info', is_read: true, created_at: dateStr(-2, 9, 0) },
  { id: 'n-006', title: 'Grade Book Updated', message: 'Mid-term exam results for Class X Science have been published by Mr. Rohan Verma.', type: 'info', is_read: false, created_at: dateStr(0, 11, 30) },
  { id: 'n-007', title: 'Overdue Library Books', message: '29 books are overdue for return. Automated reminders sent to borrowers.', type: 'warning', is_read: true, created_at: dateStr(-3, 8, 0) },
  { id: 'n-008', title: 'New Admission Application', message: '12 new applications received for Class VI admissions. Requires review.', type: 'info', is_read: false, created_at: dateStr(0, 9, 45) },
];

export const MOCK_EVENTS: MockEvent[] = [
  { id: 'ev-001', title: 'Annual Science Fair', description: 'Inter-school science project competition. All students invited to participate.', start_date: dateStr(5, 9, 0), end_date: dateStr(5, 16, 0), location: 'School Auditorium', event_type: 'academic' },
  { id: 'ev-002', title: 'Parent-Teacher Meeting', description: 'Semester progress review with parents. Attendance mandatory for all faculty.', start_date: dateStr(6, 10, 0), end_date: dateStr(6, 14, 0), location: 'Classrooms', event_type: 'meeting' },
  { id: 'ev-003', title: 'Mid-Term Examinations', description: 'Classes VI to XII mid-term exams. Timetable posted on school portal.', start_date: dateStr(10, 8, 0), end_date: dateStr(17, 12, 0), location: 'Examination Halls', event_type: 'exam' },
  { id: 'ev-004', title: 'Annual Sports Day', description: 'Inter-house athletic competition. Track & field, team sports, and relays.', start_date: dateStr(14, 8, 30), end_date: dateStr(14, 17, 0), location: 'School Ground', event_type: 'sports' },
  { id: 'ev-005', title: 'Staff Development Workshop', description: 'Professional development: Modern pedagogical approaches and EdTech tools.', start_date: dateStr(3, 10, 0), end_date: dateStr(3, 13, 0), location: 'Conference Room A', event_type: 'training' },
  { id: 'ev-006', title: 'Cultural Fest — Tarang 2025', description: 'Annual cultural festival featuring dance, drama, music, and art exhibitions.', start_date: dateStr(21, 9, 0), end_date: dateStr(22, 18, 0), location: 'School Campus', event_type: 'cultural' },
  { id: 'ev-007', title: 'Board Exam Prep Seminar', description: 'Special coaching session for Class XII students preparing for board exams.', start_date: dateStr(2, 14, 0), end_date: dateStr(2, 16, 0), location: 'Lecture Hall B', event_type: 'academic' },
  { id: 'ev-008', title: 'Library Week', description: 'Celebrate reading! Special book fairs, quizzes, and author interactions.', start_date: dateStr(7, 9, 0), end_date: dateStr(11, 17, 0), location: 'Library & School Hall', event_type: 'cultural' },
];
