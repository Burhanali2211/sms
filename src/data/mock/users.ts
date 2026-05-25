import { UserManagementUser, UserRole } from '@/types/dashboard';

export interface DemoCredential {
  email: string;
  password: string;
  role: UserRole;
  name: string;
  id: string;
  avatar: string;
  phone: string;
  status: string;
  created_at: string;
  last_login: string;
}

export const DEMO_PASSWORD = 'demo123';

export const DEMO_CREDENTIALS: DemoCredential[] = [
  {
    id: 'u-superadmin-001',
    email: 'superadmin@demo.com',
    password: DEMO_PASSWORD,
    role: 'super-admin',
    name: 'Dr. Arjun Mehta',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ArjunMehta',
    phone: '+91-98100-00001',
    status: 'active',
    created_at: '2023-01-10T08:00:00Z',
    last_login: new Date().toISOString(),
  },
  {
    id: 'u-admin-001',
    email: 'admin@demo.com',
    password: DEMO_PASSWORD,
    role: 'admin',
    name: 'Priya Sharma',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaSharma',
    phone: '+91-98100-00002',
    status: 'active',
    created_at: '2023-01-12T08:00:00Z',
    last_login: new Date().toISOString(),
  },
  {
    id: 'u-teacher-001',
    email: 'teacher@demo.com',
    password: DEMO_PASSWORD,
    role: 'teacher',
    name: 'Mr. Rohan Verma',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RohanVerma',
    phone: '+91-98100-00003',
    status: 'active',
    created_at: '2023-02-01T08:00:00Z',
    last_login: new Date().toISOString(),
  },
  {
    id: 'u-student-001',
    email: 'student@demo.com',
    password: DEMO_PASSWORD,
    role: 'student',
    name: 'Aisha Khan',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AishaKhan',
    phone: '+91-98100-00004',
    status: 'active',
    created_at: '2023-06-01T08:00:00Z',
    last_login: new Date().toISOString(),
  },
  {
    id: 'u-finance-001',
    email: 'finance@demo.com',
    password: DEMO_PASSWORD,
    role: 'financial',
    name: 'Sunita Patel',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SunitaPatel',
    phone: '+91-98100-00005',
    status: 'active',
    created_at: '2023-01-15T08:00:00Z',
    last_login: new Date().toISOString(),
  },
  {
    id: 'u-librarian-001',
    email: 'librarian@demo.com',
    password: DEMO_PASSWORD,
    role: 'library',
    name: 'Ms. Kavita Nair',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KavitaNair',
    phone: '+91-98100-00006',
    status: 'active',
    created_at: '2023-01-18T08:00:00Z',
    last_login: new Date().toISOString(),
  },
  {
    id: 'u-principal-001',
    email: 'principal@demo.com',
    password: DEMO_PASSWORD,
    role: 'principal',
    name: 'Dr. Suresh Iyer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SureshIyer',
    phone: '+91-98100-00007',
    status: 'active',
    created_at: '2022-12-01T08:00:00Z',
    last_login: new Date().toISOString(),
  },
  {
    id: 'u-admission-001',
    email: 'admission@demo.com',
    password: DEMO_PASSWORD,
    role: 'admission',
    name: 'Neha Gupta',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NehaGupta',
    phone: '+91-98100-00008',
    status: 'active',
    created_at: '2023-01-20T08:00:00Z',
    last_login: new Date().toISOString(),
  },
];

export const MOCK_USERS: UserManagementUser[] = [
  { id: 'u-superadmin-001', name: 'Dr. Arjun Mehta', email: 'superadmin@demo.com', role: 'super-admin', status: 'active', lastLogin: '2 minutes ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ArjunMehta', phone: '+91-98100-00001', address: '12, MG Road, Bangalore' },
  { id: 'u-admin-001', name: 'Priya Sharma', email: 'admin@demo.com', role: 'admin', status: 'active', lastLogin: '15 minutes ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaSharma', phone: '+91-98100-00002', address: '45, Ring Road, Delhi' },
  { id: 'u-principal-001', name: 'Dr. Suresh Iyer', email: 'principal@demo.com', role: 'principal', status: 'active', lastLogin: '1 hour ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SureshIyer', phone: '+91-98100-00007', address: '7, Lake View, Chennai' },
  { id: 'u-teacher-001', name: 'Mr. Rohan Verma', email: 'teacher@demo.com', role: 'teacher', status: 'active', lastLogin: '30 minutes ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RohanVerma', phone: '+91-98100-00003', address: '88, Sector 14, Gurgaon' },
  { id: 'u-teacher-002', name: 'Ms. Fatima Siddiqui', email: 'fatima.siddiqui@school.edu', role: 'teacher', status: 'active', lastLogin: '2 hours ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FatimaSiddiqui', phone: '+91-98100-00009', address: '33, Civil Lines, Lucknow' },
  { id: 'u-teacher-003', name: 'Mr. Vijay Pillai', email: 'vijay.pillai@school.edu', role: 'teacher', status: 'active', lastLogin: 'Yesterday', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=VijayPillai', phone: '+91-98100-00010', address: '21, KK Nagar, Coimbatore' },
  { id: 'u-teacher-004', name: 'Mrs. Anita Desai', email: 'anita.desai@school.edu', role: 'teacher', status: 'active', lastLogin: '3 hours ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AnitaDesai', phone: '+91-98100-00011', address: '56, Matunga, Mumbai' },
  { id: 'u-student-001', name: 'Aisha Khan', email: 'student@demo.com', role: 'student', status: 'active', lastLogin: '5 minutes ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AishaKhan', phone: '+91-98100-00004', address: '10, Sainik Nagar, Hyderabad' },
  { id: 'u-student-002', name: 'Rahul Tiwari', email: 'rahul.tiwari@school.edu', role: 'student', status: 'active', lastLogin: '1 day ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RahulTiwari', phone: '+91-98100-00012', address: '4, BHU Campus, Varanasi' },
  { id: 'u-student-003', name: 'Sneha Kulkarni', email: 'sneha.kulkarni@school.edu', role: 'student', status: 'active', lastLogin: '2 days ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SnehaKulkarni', phone: '+91-98100-00013', address: '22, FC Road, Pune' },
  { id: 'u-student-004', name: 'Aryan Singh', email: 'aryan.singh@school.edu', role: 'student', status: 'inactive', lastLogin: '1 week ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AryanSingh', phone: '+91-98100-00014', address: '67, Hazratganj, Lucknow' },
  { id: 'u-student-005', name: 'Pooja Mishra', email: 'pooja.mishra@school.edu', role: 'student', status: 'active', lastLogin: '3 hours ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PoojaMishra', phone: '+91-98100-00015', address: '15, Shastri Nagar, Jaipur' },
  { id: 'u-finance-001', name: 'Sunita Patel', email: 'finance@demo.com', role: 'financial', status: 'active', lastLogin: '45 minutes ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SunitaPatel', phone: '+91-98100-00005', address: '9, Paldi, Ahmedabad' },
  { id: 'u-librarian-001', name: 'Ms. Kavita Nair', email: 'librarian@demo.com', role: 'library', status: 'active', lastLogin: '1 hour ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KavitaNair', phone: '+91-98100-00006', address: '34, Vyttila, Kochi' },
  { id: 'u-admission-001', name: 'Neha Gupta', email: 'admission@demo.com', role: 'admission', status: 'active', lastLogin: '20 minutes ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NehaGupta', phone: '+91-98100-00008', address: '71, Model Town, Amritsar' },
  { id: 'u-labs-001', name: 'Dr. Kiran Rao', email: 'labs@demo.com', role: 'labs', status: 'active', lastLogin: '4 hours ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KiranRao', phone: '+91-98100-00016', address: '28, Jubilee Hills, Hyderabad' },
  { id: 'u-club-001', name: 'Mr. Amit Joshi', email: 'club@demo.com', role: 'club', status: 'active', lastLogin: 'Yesterday', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AmitJoshi', phone: '+91-98100-00017', address: '53, Indira Nagar, Bangalore' },
  { id: 'u-school-admin-001', name: 'Mrs. Rekha Singh', email: 'schooladmin@demo.com', role: 'school-admin', status: 'active', lastLogin: '2 hours ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RekhaSingh', phone: '+91-98100-00018', address: '6, Rajpur Road, Dehradun' },
  { id: 'u-student-006', name: 'Dev Bhatia', email: 'dev.bhatia@school.edu', role: 'student', status: 'active', lastLogin: '6 hours ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DevBhatia', phone: '+91-98100-00019', address: '40, Punjabi Bagh, Delhi' },
  { id: 'u-teacher-005', name: 'Mr. Sanjay Dubey', email: 'sanjay.dubey@school.edu', role: 'teacher', status: 'inactive', lastLogin: '3 days ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SanjayDubey', phone: '+91-98100-00020', address: '19, Cantonment, Kanpur' },
];

export function findDemoUser(email: string, password: string): DemoCredential | null {
  if (password !== DEMO_PASSWORD) return null;
  return DEMO_CREDENTIALS.find(u => u.email.toLowerCase() === email.toLowerCase()) ?? null;
}
