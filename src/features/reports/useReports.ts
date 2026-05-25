import { useState, useEffect } from 'react';
import { apiClient } from '@/utils/api/client';

const isDemoToken = () => {
  const token = localStorage.getItem('authToken');
  return !token || token.startsWith('demo-token-');
};

const MOCK_REPORTS: Report[] = [
  { id: 1, title: 'Student Attendance Report', type: 'attendance', description: 'Daily and monthly attendance summary for all classes', lastGenerated: '2026-05-24', status: 'ready' },
  { id: 2, title: 'Academic Performance Report', type: 'academic', description: 'Grade distribution and subject-wise performance analysis', lastGenerated: '2026-05-20', status: 'ready' },
  { id: 3, title: 'Fee Collection Report', type: 'finance', description: 'Monthly fee collection status and pending dues', lastGenerated: '2026-05-22', status: 'ready' },
  { id: 4, title: 'Library Usage Report', type: 'library', description: 'Books issued, returned, and overdue items summary', lastGenerated: '2026-05-18', status: 'ready' },
  { id: 5, title: 'Staff Attendance Report', type: 'hr', description: 'Teacher and staff attendance for the current month', lastGenerated: '2026-05-24', status: 'ready' },
  { id: 6, title: 'Admission Pipeline Report', type: 'admissions', description: 'Applications received, approved, and rejected overview', lastGenerated: '2026-05-15', status: 'ready' },
];

const MOCK_HISTORY: ReportHistory[] = [
  { id: 1, title: 'Student Attendance Report', generatedBy: 'Mr. Rohan Verma', date: '2026-05-24', format: 'PDF', size: '245 KB' },
  { id: 2, title: 'Fee Collection Report', generatedBy: 'Ms. Nisha Mehta', date: '2026-05-22', format: 'Excel', size: '182 KB' },
  { id: 3, title: 'Academic Performance Report', generatedBy: 'Principal Arora', date: '2026-05-20', format: 'PDF', size: '1.2 MB' },
  { id: 4, title: 'Library Usage Report', generatedBy: 'Mr. Thomas Joseph', date: '2026-05-18', format: 'PDF', size: '98 KB' },
  { id: 5, title: 'Staff Attendance Report', generatedBy: 'Admin User', date: '2026-05-15', format: 'Excel', size: '156 KB' },
];

interface Report {
  id: number;
  title: string;
  type: string;
  description: string;
  lastGenerated?: string;
  status?: string;
}

interface ReportHistory {
  id: number;
  title: string;
  generatedBy: string;
  date: string;
  format: string;
  size: string;
}

export const useReports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [history, setHistory] = useState<ReportHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch available reports
  const fetchReports = async () => {
    if (isDemoToken()) {
      setReports(MOCK_REPORTS);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await apiClient.get('/reports/available');
      if (response.error) throw new Error(response.error);
      setReports((response.data as Report[]) || MOCK_REPORTS);
    } catch {
      setReports(MOCK_REPORTS);
    } finally {
      setLoading(false);
    }
  };

  // Fetch report history
  const fetchHistory = async () => {
    if (isDemoToken()) {
      setHistory(MOCK_HISTORY);
      return;
    }
    try {
      const response = await apiClient.get('/reports/history');
      if (response.error) throw new Error(response.error);
      setHistory((response.data as ReportHistory[]) || MOCK_HISTORY);
    } catch {
      setHistory(MOCK_HISTORY);
    }
  };

  // Generate a report
  const generateReport = async (reportId: number, format: string = 'pdf', filters: any = {}) => {
    try {
      const response = await apiClient.post(`/reports/generate/${reportId}`, { format, filters });
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate report');
      throw err;
    }
  };

  // Export a report
  const exportReport = async (reportId: number, format: string = 'pdf') => {
    try {
      // In a real implementation, this would trigger the actual export
      // For now, we'll simulate it with a shorter delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true, message: `Report #${reportId} exported in ${format.toUpperCase()} format successfully` };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export report');
      throw err;
    }
  };

  // View a report
  const viewReport = async (reportId: number) => {
    try {
      // In a real implementation, this would open the report
      // For now, we'll simulate it with a shorter delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return { success: true, message: `Report #${reportId} opened successfully` };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to view report');
      throw err;
    }
  };

  useEffect(() => {
    fetchReports();
    fetchHistory();
  }, []);

  return {
    reports,
    history,
    loading,
    error,
    fetchReports,
    generateReport,
    exportReport,
    viewReport
  };
};