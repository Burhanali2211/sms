import { LibraryItem } from '@/types/dashboard';

export const MOCK_LIBRARY_ITEMS: LibraryItem[] = [
  { id: 'lib-001', title: 'Mathematics for Class X (NCERT)', author: 'NCERT Editorial Board', category: 'Textbook', available: false, dueDate: '2025-05-28', borrowedBy: 'Aisha Khan' },
  { id: 'lib-002', title: 'The Alchemist', author: 'Paulo Coelho', category: 'Fiction', available: true },
  { id: 'lib-003', title: 'Physics Part I — Class XI', author: 'NCERT Editorial Board', category: 'Textbook', available: false, dueDate: '2025-05-20', borrowedBy: 'Rahul Tiwari' },
  { id: 'lib-004', title: 'Wings of Fire', author: 'Dr. A.P.J. Abdul Kalam', category: 'Biography', available: true },
  { id: 'lib-005', title: 'India After Gandhi', author: 'Ramachandra Guha', category: 'History', available: false, dueDate: '2025-05-15', borrowedBy: 'Sneha Kulkarni' },
  { id: 'lib-006', title: 'Organic Chemistry by Morrison Boyd', author: 'Morrison & Boyd', category: 'Reference', available: true },
  { id: 'lib-007', title: 'Sapiens: A Brief History', author: 'Yuval Noah Harari', category: 'Non-Fiction', available: false, dueDate: '2025-05-10', borrowedBy: 'Dev Bhatia' },
  { id: 'lib-008', title: 'English Grammar in Use', author: 'Raymond Murphy', category: 'Reference', available: true },
  { id: 'lib-009', title: 'The Diary of a Young Girl', author: 'Anne Frank', category: 'Biography', available: true },
  { id: 'lib-010', title: 'Problems in General Physics', author: 'I. E. Irodov', category: 'Reference', available: false, dueDate: '2025-06-02', borrowedBy: 'Karan Malhotra' },
  { id: 'lib-011', title: 'RD Sharma — Class XII Mathematics', author: 'R.D. Sharma', category: 'Textbook', available: true },
  { id: 'lib-012', title: 'Malgudi Days', author: 'R. K. Narayan', category: 'Fiction', available: true },
  { id: 'lib-013', title: 'The Hindu Editorial Archives 2024', author: 'The Hindu', category: 'Periodical', available: false, dueDate: '2025-05-08', borrowedBy: 'Pooja Mishra' },
  { id: 'lib-014', title: 'Environmental Studies Class IX', author: 'CBSE Board', category: 'Textbook', available: true },
  { id: 'lib-015', title: 'Artificial Intelligence: A Modern Approach', author: 'Russell & Norvig', category: 'Computer Science', available: true },
];

export const MOCK_LIBRARY_STATS = {
  totalBooks: 4820,
  checkedOut: 312,
  overdue: 29,
  newArrivals: 18,
  mostBorrowed: [
    { title: 'RD Sharma — Class XII Mathematics', checkouts: 47 },
    { title: 'Wings of Fire', checkouts: 38 },
    { title: 'Physics Part I — Class XI', checkouts: 34 },
    { title: 'The Alchemist', checkouts: 29 },
    { title: 'Sapiens: A Brief History', checkouts: 24 },
  ],
};
