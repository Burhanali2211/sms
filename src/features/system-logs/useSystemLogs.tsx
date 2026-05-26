import { useState } from "react";

// Types for logs
export interface SystemLog {
  id: string;
  timestamp: string;
  type: 'error' | 'info' | 'warning' | 'success';
  message: string;
  details: string;
  source: string;
  user?: string;
}

// Mock log data
export const mockLogs: SystemLog[] = [
  {
    id: '1',
    timestamp: '2026-05-25T11:23:45Z',
    type: 'error',
    message: 'Database connection timeout',
    details: 'Connection timeout after 120s on replica node db-02',
    source: 'Database Service',
    user: 'system'
  },
  {
    id: '2',
    timestamp: '2026-05-25T11:18:32Z',
    type: 'info',
    message: 'User login successful',
    details: 'IP: 10.0.1.22 | Browser: Chrome 124',
    source: 'Authentication Service',
    user: 'rohan.verma'
  },
  {
    id: '3',
    timestamp: '2026-05-25T11:12:10Z',
    type: 'warning',
    message: 'High memory usage detected',
    details: 'Cache layer memory at 89% — auto-scaling triggered',
    source: 'System Monitor',
  },
  {
    id: '4',
    timestamp: '2026-05-25T10:58:00Z',
    type: 'success',
    message: 'Full system backup completed',
    details: 'Backup size: 1.4 GB | Duration: 18 min 32 sec',
    source: 'Backup Service',
    user: 'system'
  },
  {
    id: '5',
    timestamp: '2026-05-25T10:45:19Z',
    type: 'info',
    message: 'New student enrolled',
    details: 'Student: Aarav Singh | Class: 9-A | Roll: 42',
    source: 'Admission Service',
    user: 'anjali.gupta'
  },
  {
    id: '6',
    timestamp: '2026-05-25T10:38:54Z',
    type: 'error',
    message: 'Fee payment gateway timeout',
    details: 'Transaction TXN-2026-8821 failed — gateway response: 504',
    source: 'Payment Gateway',
    user: 'fatima.siddiqui'
  },
  {
    id: '7',
    timestamp: '2026-05-25T10:30:11Z',
    type: 'success',
    message: 'Email notifications dispatched',
    details: 'Sent to 847 recipients — fee reminder batch #3',
    source: 'Notification Service',
    user: 'system'
  },
  {
    id: '8',
    timestamp: '2026-05-25T10:22:44Z',
    type: 'warning',
    message: 'Slow database query detected',
    details: 'Query on attendance_records took 6.2s — index missing on date_col',
    source: 'Database Monitor',
  },
  {
    id: '9',
    timestamp: '2026-05-25T10:15:30Z',
    type: 'info',
    message: 'System settings updated',
    details: 'SMTP gateway reconfigured by super admin',
    source: 'Settings Service',
    user: 'rohan.verma'
  },
  {
    id: '10',
    timestamp: '2026-05-25T10:02:07Z',
    type: 'success',
    message: 'Timetable published',
    details: 'Class 10-B schedule activated for June 2026 term',
    source: 'Academic Service',
    user: 'principal.arora'
  },
  {
    id: '11',
    timestamp: '2026-05-25T09:55:18Z',
    type: 'warning',
    message: 'Disk usage threshold reached',
    details: 'Storage at 78% — media uploads directory growing at 2.3 GB/week',
    source: 'Storage Service',
  },
  {
    id: '12',
    timestamp: '2026-05-25T09:44:02Z',
    type: 'info',
    message: 'Staff attendance marked',
    details: '82 of 85 staff members marked present for 2026-05-25',
    source: 'Attendance Service',
    user: 'vikram.patel'
  },
  {
    id: '13',
    timestamp: '2026-05-25T09:30:55Z',
    type: 'error',
    message: 'API rate limit exceeded',
    details: 'Mobile client exceeded 1000 req/min — throttled for 5 min',
    source: 'API Gateway',
    user: 'mobile-app'
  },
  {
    id: '14',
    timestamp: '2026-05-25T09:20:13Z',
    type: 'success',
    message: 'Library catalog synced',
    details: '1,240 book records updated from ISBN registry',
    source: 'Library Service',
    user: 'mohammed.khan'
  },
  {
    id: '15',
    timestamp: '2026-05-25T09:05:40Z',
    type: 'info',
    message: 'System update available',
    details: 'EIT SMS v3.1.2 ready — changelog: security patches, report improvements',
    source: 'Update Service',
  },
  {
    id: '16',
    timestamp: '2026-05-24T18:45:22Z',
    type: 'success',
    message: 'Fee collection report generated',
    details: 'Monthly report for May 2026 — ₹14.2 L collected of ₹18.6 L target',
    source: 'Finance Service',
    user: 'fatima.siddiqui'
  },
  {
    id: '17',
    timestamp: '2026-05-24T17:30:09Z',
    type: 'error',
    message: 'File upload rejected',
    details: 'File size 48 MB exceeds 10 MB limit — user: priya.sharma',
    source: 'Storage Service',
    user: 'priya.sharma'
  },
  {
    id: '18',
    timestamp: '2026-05-24T16:15:33Z',
    type: 'warning',
    message: 'Multiple failed login attempts',
    details: '14 failed attempts from IP 10.0.1.45 in 30 minutes — account locked',
    source: 'Authentication Service',
  },
  {
    id: '19',
    timestamp: '2026-05-24T15:00:18Z',
    type: 'info',
    message: 'Scheduled maintenance completed',
    details: 'Database vacuum and index rebuild — duration: 22 minutes',
    source: 'System Service',
    user: 'system'
  },
  {
    id: '20',
    timestamp: '2026-05-24T13:48:55Z',
    type: 'success',
    message: 'Student records backup completed',
    details: 'Backup size: 94 MB | 1,250 student records archived',
    source: 'Backup Service',
    user: 'system'
  },
  {
    id: '21',
    timestamp: '2026-05-24T11:22:40Z',
    type: 'info',
    message: 'New teacher account created',
    details: 'Account created for Lata Desai — Music Department',
    source: 'User Service',
    user: 'anjali.gupta'
  },
  {
    id: '22',
    timestamp: '2026-05-24T10:10:05Z',
    type: 'warning',
    message: 'Low cache hit rate',
    details: 'Cache hit rate dropped to 71% — flushed and rebuilt',
    source: 'Cache Service',
  },
  {
    id: '23',
    timestamp: '2026-05-23T20:15:00Z',
    type: 'success',
    message: 'Database backup completed',
    details: 'Backup size: 512 MB | Encrypted and stored on offsite node',
    source: 'Backup Service',
    user: 'system'
  },
  {
    id: '24',
    timestamp: '2026-05-23T16:05:28Z',
    type: 'error',
    message: 'SMTP connection refused',
    details: 'Email relay rejected — authentication failure on port 587',
    source: 'Notification Service',
    user: 'system'
  },
  {
    id: '25',
    timestamp: '2026-05-23T09:00:00Z',
    type: 'info',
    message: 'Academic term started',
    details: 'June 2026 term activated — 1,250 students, 85 staff enrolled',
    source: 'Academic Service',
    user: 'principal.arora'
  },
];

export const useSystemLogs = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [logTypeFilter, setLogTypeFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const logsPerPage = 10;

  // Get unique sources for filter
  const sources = ['all', ...Array.from(new Set(mockLogs.map(log => log.source)))];

  // Filter logs based on tab, search, and filters
  const filteredLogs = mockLogs.filter(log => {
    // Filter by tab
    if (activeTab !== 'all' && log.type !== activeTab) {
      return false;
    }

    // Filter by search term
    if (
      searchTerm &&
      !log.message.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !log.source.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !(log.user && log.user.toLowerCase().includes(searchTerm.toLowerCase()))
    ) {
      return false;
    }

    // Filter by log type
    if (logTypeFilter !== 'all' && log.type !== logTypeFilter) {
      return false;
    }

    // Filter by source
    if (sourceFilter !== 'all' && log.source !== sourceFilter) {
      return false;
    }

    return true;
  });

  // Pagination
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  // Stats
  const errorCount = mockLogs.filter(log => log.type === 'error').length;
  const warningCount = mockLogs.filter(log => log.type === 'warning').length;
  const infoCount = mockLogs.filter(log => log.type === 'info').length;
  const successCount = mockLogs.filter(log => log.type === 'success').length;

  return {
    activeTab,
    setActiveTab,
    searchTerm,
    setSearchTerm,
    logTypeFilter,
    setLogTypeFilter,
    sourceFilter,
    setSourceFilter,
    currentPage,
    setCurrentPage,
    logsPerPage,
    sources,
    filteredLogs,
    currentLogs,
    totalPages,
    errorCount,
    warningCount,
    infoCount,
    successCount,
    mockLogs,
  };
};
