import { FinancialRecord } from '@/types/dashboard';

export const MOCK_FINANCIAL_RECORDS: FinancialRecord[] = [
  { id: 'fin-001', type: 'income', amount: 420000, date: '2025-05-20', status: 'completed', description: 'Q2 Fee Collection — Class X & XI' },
  { id: 'fin-002', type: 'income', amount: 85000, date: '2025-05-18', status: 'completed', description: 'Transport Fee — May 2025' },
  { id: 'fin-003', type: 'expense', amount: 62000, date: '2025-05-17', status: 'completed', description: 'Staff Salaries — Support Staff' },
  { id: 'fin-004', type: 'income', amount: 35000, date: '2025-05-15', status: 'completed', description: 'Library & Lab Fees' },
  { id: 'fin-005', type: 'expense', amount: 28000, date: '2025-05-14', status: 'completed', description: 'Science Lab Equipment Procurement' },
  { id: 'fin-006', type: 'income', amount: 150000, date: '2025-05-10', status: 'completed', description: 'Annual Day Registration & Tickets' },
  { id: 'fin-007', type: 'expense', amount: 45000, date: '2025-05-09', status: 'completed', description: 'Utility Bills — Electricity & Water' },
  { id: 'fin-008', type: 'income', amount: 72000, date: '2025-05-05', status: 'pending', description: 'Hostel Fee — May 2025 (Partial)' },
  { id: 'fin-009', type: 'expense', amount: 18000, date: '2025-05-03', status: 'completed', description: 'Sports Equipment Replacement' },
  { id: 'fin-010', type: 'income', amount: 210000, date: '2025-05-01', status: 'completed', description: 'Tuition Fee — Class XII (Advance)' },
];

export const MOCK_PENDING_FEES = [
  { id: 'pf-001', studentName: 'Aryan Singh', class: 'X-A', amount: 42000, dueDate: '2025-05-15', daysOverdue: 10, contact: '+91-98100-00014' },
  { id: 'pf-002', studentName: 'Karan Malhotra', class: 'XI-B', amount: 48000, dueDate: '2025-05-20', daysOverdue: 5, contact: '+91-98100-00021' },
  { id: 'pf-003', studentName: 'Meera Iyer', class: 'IX-C', amount: 38000, dueDate: '2025-05-22', daysOverdue: 3, contact: '+91-98100-00022' },
  { id: 'pf-004', studentName: 'Sahil Qureshi', class: 'XII-Science', amount: 52000, dueDate: '2025-04-30', daysOverdue: 25, contact: '+91-98100-00023' },
  { id: 'pf-005', studentName: 'Tanvi Sharma', class: 'VIII-A', amount: 36000, dueDate: '2025-05-10', daysOverdue: 15, contact: '+91-98100-00024' },
];

export const MOCK_MONTHLY_REVENUE = [
  { month: 'Nov', income: 2850000, expense: 1620000 },
  { month: 'Dec', income: 1450000, expense: 1380000 },
  { month: 'Jan', income: 4200000, expense: 1890000 },
  { month: 'Feb', income: 3680000, expense: 1720000 },
  { month: 'Mar', income: 3120000, expense: 2100000 },
  { month: 'Apr', income: 3950000, expense: 1980000 },
  { month: 'May', income: 4260000, expense: 1890000 },
];

export const MOCK_BUDGET_VS_ACTUALS = [
  { category: 'Salaries', budget: 2500000, actual: 2380000 },
  { category: 'Infrastructure', budget: 800000, actual: 720000 },
  { category: 'Lab & Library', budget: 400000, actual: 430000 },
  { category: 'Events', budget: 300000, actual: 280000 },
  { category: 'Utilities', budget: 150000, actual: 165000 },
  { category: 'Transport', budget: 200000, actual: 185000 },
];

export const MOCK_FEE_COLLECTION_BY_CLASS = [
  { class: 'Class VI', collected: 92, pending: 8 },
  { class: 'Class VII', collected: 88, pending: 12 },
  { class: 'Class VIII', collected: 95, pending: 5 },
  { class: 'Class IX', collected: 91, pending: 9 },
  { class: 'Class X', collected: 86, pending: 14 },
  { class: 'Class XI', collected: 89, pending: 11 },
  { class: 'Class XII', collected: 97, pending: 3 },
];
