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
    timestamp: '2025-05-18T10:15:23Z',
    type: 'error',
    message: 'Failed to connect to database',
    details: 'Connection timeout after 30s',
    source: 'Database Service',
    user: 'system'
  },
  {
    id: '2',
    timestamp: '2025-05-18T10:14:12Z',
    type: 'info',
    message: 'User login successful',
    details: 'IP: 192.168.1.145',
    source: 'Authentication Service',
    user: 'john.doe'
  },
  {
    id: '3',
    timestamp: '2025-05-18T10:13:45Z',
    type: 'warning',
    message: 'High memory usage detected',
    details: 'Memory usage at 85%',
    source: 'System Monitor',
  },
  {
    id: '4',
    timestamp: '2025-05-18T10:10:22Z',
    type: 'success',
    message: 'Database backup completed',
    details: 'Backup size: 1.2GB',
    source: 'Backup Service',
    user: 'system'
  },
  {
    id: '5',
    timestamp: '2025-05-18T10:05:11Z',
    type: 'error',
    message: 'API rate limit exceeded',
    details: 'Too many requests from client',
    source: 'API Gateway',
    user: 'mobile-app'
  },
  {
    id: '6',
    timestamp: '2025-05-18T10:01:54Z',
    type: 'info',
    message: 'System update available',
    details: 'Version 2.3.4 ready to install',
    source: 'Update Service',
  },
  {
    id: '7',
    timestamp: '2025-05-18T09:58:32Z',
    type: 'warning',
    message: 'Slow query detected',
    details: 'Query took 4.5s to execute',
    source: 'Database Monitor',
  },
  {
    id: '8',
    timestamp: '2025-05-18T09:45:19Z',
    type: 'success',
    message: 'Email notifications sent',
    details: 'Sent to 245 recipients',
    source: 'Notification Service',
    user: 'system'
  },
  {
    id: '9',
    timestamp: '2025-05-18T09:30:05Z',
    type: 'error',
    message: 'Failed to process payment',
    details: 'Invalid credit card information',
    source: 'Payment Gateway',
    user: 'jane.smith'
  },
  {
    id: '10',
    timestamp: '2025-05-18T09:25:43Z',
    type: 'info',
    message: 'New user registered',
    details: 'User: mark.johnson',
    source: 'User Service',
  },
  {
    id: '11',
    timestamp: '2025-05-17T18:15:23Z',
    type: 'error',
    message: 'File upload failed',
    details: 'File size exceeds maximum limit',
    source: 'Storage Service',
    user: 'robert.brown'
  },
  {
    id: '12',
    timestamp: '2025-05-17T16:14:12Z',
    type: 'info',
    message: 'Scheduled maintenance completed',
    details: 'Duration: 15 minutes',
    source: 'System Service',
    user: 'admin'
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
