import { useState, useEffect } from 'react';
import { apiClient } from '@/utils/api/client';

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
    try {
      setLoading(true);
      const response = await apiClient.get('/reports/available');
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      setReports(response.data as Report[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  };

  // Fetch report history
  const fetchHistory = async () => {
    try {
      const response = await apiClient.get('/reports/history');
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      setHistory(response.data as ReportHistory[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch report history');
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