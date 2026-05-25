import { AdmissionApplication } from '@/types/dashboard';

export const MOCK_ADMISSIONS: AdmissionApplication[] = [
  { id: 'adm-001', studentName: 'Preethi Ramachandran', parentName: 'Mr. Venkat Ramachandran', email: 'venkat.r@gmail.com', phone: '+91-94440-11001', grade: 'VI', status: 'approved', submittedAt: '2025-05-01T10:30:00Z' },
  { id: 'adm-002', studentName: 'Omar Abdullah', parentName: 'Mr. Tariq Abdullah', email: 'tariq.a@gmail.com', phone: '+91-98220-22002', grade: 'IX', status: 'under_review', submittedAt: '2025-05-05T09:00:00Z' },
  { id: 'adm-003', studentName: 'Shreya Kapoor', parentName: 'Mrs. Sunanda Kapoor', email: 'sunanda.k@gmail.com', phone: '+91-97330-33003', grade: 'VI', status: 'approved', submittedAt: '2025-05-03T14:00:00Z' },
  { id: 'adm-004', studentName: 'Nikhil Banerjee', parentName: 'Mr. Subrata Banerjee', email: 'subrata.b@gmail.com', phone: '+91-96440-44004', grade: 'XI', status: 'pending', submittedAt: '2025-05-10T11:00:00Z' },
  { id: 'adm-005', studentName: 'Ritu Choudhary', parentName: 'Dr. Bharat Choudhary', email: 'bharat.c@gmail.com', phone: '+91-95550-55005', grade: 'VII', status: 'waitlisted', submittedAt: '2025-05-08T16:00:00Z' },
  { id: 'adm-006', studentName: 'Anuj Rawat', parentName: 'Mr. Deepak Rawat', email: 'deepak.r@gmail.com', phone: '+91-94660-66006', grade: 'VI', status: 'approved', submittedAt: '2025-05-02T08:30:00Z' },
  { id: 'adm-007', studentName: 'Laleh Ahmadi', parentName: 'Mr. Farhad Ahmadi', email: 'farhad.a@gmail.com', phone: '+91-93770-77007', grade: 'VIII', status: 'under_review', submittedAt: '2025-05-12T13:00:00Z' },
  { id: 'adm-008', studentName: 'Vikram Reddy', parentName: 'Mr. Suresh Reddy', email: 'suresh.r@gmail.com', phone: '+91-92880-88008', grade: 'VI', status: 'rejected', submittedAt: '2025-04-28T10:00:00Z' },
  { id: 'adm-009', studentName: 'Tanishka Mehra', parentName: 'Mrs. Alka Mehra', email: 'alka.m@gmail.com', phone: '+91-91990-99009', grade: 'IX', status: 'pending', submittedAt: '2025-05-15T09:30:00Z' },
  { id: 'adm-010', studentName: 'Arjit Sinha', parentName: 'Mr. Rakesh Sinha', email: 'rakesh.s@gmail.com', phone: '+91-90001-00010', grade: 'XI', status: 'approved', submittedAt: '2025-05-06T15:00:00Z' },
];
