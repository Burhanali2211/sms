import { Student, Teacher, ClassData } from '@/types/dashboard';

export const MOCK_TEACHERS: Teacher[] = [
  { id: 'u-teacher-001', name: 'Mr. Rohan Verma', email: 'teacher@demo.com', subject: 'Mathematics', classes: ['X-A', 'X-B', 'XI-Science'] },
  { id: 'u-teacher-002', name: 'Ms. Fatima Siddiqui', email: 'fatima.siddiqui@school.edu', subject: 'English Literature', classes: ['IX-A', 'X-A', 'XII-Arts'] },
  { id: 'u-teacher-003', name: 'Mr. Vijay Pillai', email: 'vijay.pillai@school.edu', subject: 'Physics', classes: ['XI-Science', 'XII-Science'] },
  { id: 'u-teacher-004', name: 'Mrs. Anita Desai', email: 'anita.desai@school.edu', subject: 'Chemistry', classes: ['XI-Science', 'XII-Science', 'X-B'] },
  { id: 'u-teacher-005', name: 'Mr. Sanjay Dubey', email: 'sanjay.dubey@school.edu', subject: 'History', classes: ['IX-B', 'X-A', 'XII-Arts'] },
];

export const MOCK_STUDENTS: Student[] = [
  { id: 'u-student-001', name: 'Aisha Khan', email: 'student@demo.com', rollNumber: 'X-A-01', grade: 'X', section: 'A', attendance: 96, performanceGrade: 'A+' },
  { id: 'u-student-002', name: 'Rahul Tiwari', email: 'rahul.tiwari@school.edu', rollNumber: 'X-A-02', grade: 'X', section: 'A', attendance: 88, performanceGrade: 'B+' },
  { id: 'u-student-003', name: 'Sneha Kulkarni', email: 'sneha.kulkarni@school.edu', rollNumber: 'X-A-03', grade: 'X', section: 'A', attendance: 92, performanceGrade: 'A' },
  { id: 'u-student-004', name: 'Aryan Singh', email: 'aryan.singh@school.edu', rollNumber: 'X-A-04', grade: 'X', section: 'A', attendance: 74, performanceGrade: 'C+' },
  { id: 'u-student-005', name: 'Pooja Mishra', email: 'pooja.mishra@school.edu', rollNumber: 'X-A-05', grade: 'X', section: 'A', attendance: 98, performanceGrade: 'A+' },
  { id: 'u-student-006', name: 'Dev Bhatia', email: 'dev.bhatia@school.edu', rollNumber: 'X-A-06', grade: 'X', section: 'A', attendance: 91, performanceGrade: 'A' },
  { id: 'u-student-007', name: 'Riya Joshi', email: 'riya.joshi@school.edu', rollNumber: 'X-A-07', grade: 'X', section: 'A', attendance: 85, performanceGrade: 'B' },
  { id: 'u-student-008', name: 'Karan Malhotra', email: 'karan.malhotra@school.edu', rollNumber: 'X-A-08', grade: 'X', section: 'A', attendance: 93, performanceGrade: 'A' },
];

export const MOCK_CLASSES: ClassData[] = [
  { id: 'cls-001', name: 'X-A Mathematics', subject: 'Mathematics', grade: 'X', section: 'A', students: 38, schedule: 'Mon, Wed, Fri — 8:00 AM', room: 'Room 201', teacherId: 'u-teacher-001' },
  { id: 'cls-002', name: 'X-B Mathematics', subject: 'Mathematics', grade: 'X', section: 'B', students: 35, schedule: 'Tue, Thu — 10:00 AM', room: 'Room 202', teacherId: 'u-teacher-001' },
  { id: 'cls-003', name: 'XI-Science Mathematics', subject: 'Mathematics', grade: 'XI', section: 'Science', students: 40, schedule: 'Mon, Wed, Fri — 11:00 AM', room: 'Room 301', teacherId: 'u-teacher-001' },
  { id: 'cls-004', name: 'IX-A English', subject: 'English Literature', grade: 'IX', section: 'A', students: 36, schedule: 'Tue, Thu — 9:00 AM', room: 'Room 105', teacherId: 'u-teacher-002' },
  { id: 'cls-005', name: 'XI-Science Physics', subject: 'Physics', grade: 'XI', section: 'Science', students: 40, schedule: 'Mon, Wed, Fri — 9:00 AM', room: 'Physics Lab', teacherId: 'u-teacher-003' },
  { id: 'cls-006', name: 'XII-Science Physics', subject: 'Physics', grade: 'XII', section: 'Science', students: 38, schedule: 'Tue, Thu, Sat — 11:00 AM', room: 'Physics Lab', teacherId: 'u-teacher-003' },
];

export const MOCK_TEACHER_SCHEDULE = [
  { time: '08:00 – 08:45', class: 'X-A', subject: 'Mathematics', room: 'Room 201', students: 38 },
  { time: '09:00 – 09:45', class: 'Break', subject: '', room: '', students: 0 },
  { time: '10:00 – 10:45', class: 'X-B', subject: 'Mathematics', room: 'Room 202', students: 35 },
  { time: '11:00 – 11:45', class: 'XI-Science', subject: 'Mathematics', room: 'Room 301', students: 40 },
  { time: '12:00 – 13:00', class: 'Lunch', subject: '', room: '', students: 0 },
  { time: '14:00 – 14:45', class: 'Remedial', subject: 'Mathematics (Extra)', room: 'Room 201', students: 12 },
];

export const MOCK_STUDENT_TIMETABLE = [
  { time: '08:00 – 08:45', subject: 'Mathematics', teacher: 'Mr. Rohan Verma', room: 'Room 201' },
  { time: '09:00 – 09:45', subject: 'English Literature', teacher: 'Ms. Fatima Siddiqui', room: 'Room 105' },
  { time: '10:00 – 10:45', subject: 'Break', teacher: '', room: '' },
  { time: '11:00 – 11:45', subject: 'Physics', teacher: 'Mr. Vijay Pillai', room: 'Physics Lab' },
  { time: '12:00 – 12:45', subject: 'Chemistry', teacher: 'Mrs. Anita Desai', room: 'Chem Lab' },
  { time: '13:00 – 14:00', subject: 'Lunch', teacher: '', room: '' },
  { time: '14:00 – 14:45', subject: 'History', teacher: 'Mr. Sanjay Dubey', room: 'Room 108' },
  { time: '15:00 – 15:45', subject: 'Physical Education', teacher: 'Coach Rajesh', room: 'Ground' },
];

export interface GradeRecord {
  subject: string;
  teacher: string;
  midterm: number;
  final: number | null;
  grade: string;
  trend: 'up' | 'down' | 'stable';
}

export const MOCK_STUDENT_GRADES: GradeRecord[] = [
  { subject: 'Mathematics', teacher: 'Mr. Rohan Verma', midterm: 88, final: 91, grade: 'A+', trend: 'up' },
  { subject: 'English Literature', teacher: 'Ms. Fatima Siddiqui', midterm: 85, final: 82, grade: 'A', trend: 'down' },
  { subject: 'Physics', teacher: 'Mr. Vijay Pillai', midterm: 79, final: 84, grade: 'A', trend: 'up' },
  { subject: 'Chemistry', teacher: 'Mrs. Anita Desai', midterm: 75, final: 78, grade: 'B+', trend: 'up' },
  { subject: 'History', teacher: 'Mr. Sanjay Dubey', midterm: 90, final: null, grade: 'A+', trend: 'stable' },
];

const today = new Date();
const dayStr = (offset: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + offset);
  return d.toISOString().split('T')[0];
};

export interface AttendanceRecord {
  date: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  status: 'present' | 'absent' | 'late' | 'excused';
}

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  // Today
  ...MOCK_STUDENTS.map((s, i) => ({
    date: dayStr(0),
    studentId: s.id,
    studentName: s.name,
    rollNumber: s.rollNumber,
    status: (['present', 'present', 'present', 'late', 'present', 'present', 'present', 'present'] as const)[i] ?? 'present',
  })),
  // Yesterday
  ...MOCK_STUDENTS.map((s, i) => ({
    date: dayStr(-1),
    studentId: s.id,
    studentName: s.name,
    rollNumber: s.rollNumber,
    status: (['present', 'absent', 'present', 'absent', 'present', 'late', 'present', 'present'] as const)[i] ?? 'present',
  })),
  // 2 days ago
  ...MOCK_STUDENTS.map((s, i) => ({
    date: dayStr(-2),
    studentId: s.id,
    studentName: s.name,
    rollNumber: s.rollNumber,
    status: (['present', 'present', 'late', 'present', 'present', 'present', 'absent', 'present'] as const)[i] ?? 'present',
  })),
];

export interface PendingAssignment {
  id: string;
  title: string;
  class: string;
  submitted: number;
  total: number;
  dueDate: string;
}

export const MOCK_PENDING_ASSIGNMENTS: PendingAssignment[] = [
  { id: 'asn-001', title: 'Algebra Unit Test Grading', class: 'X-A', submitted: 35, total: 38, dueDate: dayStr(1) },
  { id: 'asn-002', title: 'Calculus Problem Set Review', class: 'XI-Science', submitted: 28, total: 40, dueDate: dayStr(2) },
  { id: 'asn-003', title: 'Mid-term Paper Evaluation', class: 'X-B', submitted: 35, total: 35, dueDate: dayStr(0) },
];

export const MOCK_UPCOMING_EXAMS = [
  { subject: 'Mathematics', date: dayStr(8), time: '09:00 AM', room: 'Hall A', duration: '3 hrs' },
  { subject: 'Physics', date: dayStr(10), time: '09:00 AM', room: 'Hall B', duration: '3 hrs' },
  { subject: 'English Literature', date: dayStr(12), time: '11:00 AM', room: 'Hall A', duration: '2 hrs' },
];
