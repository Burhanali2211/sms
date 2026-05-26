import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export const mockTables = [
  { name: "users", rows: 1420, size: "14.2 MB", lastUpdate: "2026-05-25 09:15 AM" },
  { name: "students", rows: 1250, size: "18.6 MB", lastUpdate: "2026-05-25 10:45 AM" },
  { name: "staff", rows: 85, size: "2.1 MB", lastUpdate: "2026-05-25 08:30 AM" },
  { name: "subjects", rows: 42, size: "1.4 MB", lastUpdate: "2026-05-20 02:30 PM" },
  { name: "classes", rows: 38, size: "3.8 MB", lastUpdate: "2026-05-22 04:15 PM" },
  { name: "attendance", rows: 31250, size: "74.5 MB", lastUpdate: "2026-05-25 11:00 AM" },
  { name: "grades", rows: 22800, size: "51.3 MB", lastUpdate: "2026-05-25 08:30 AM" },
  { name: "fee_transactions", rows: 9840, size: "32.7 MB", lastUpdate: "2026-05-25 09:45 AM" },
  { name: "library_catalog", rows: 4200, size: "16.8 MB", lastUpdate: "2026-05-24 03:00 PM" },
  { name: "notifications", rows: 48320, size: "92.1 MB", lastUpdate: "2026-05-25 11:15 AM" },
  { name: "calendar_events", rows: 1560, size: "9.2 MB", lastUpdate: "2026-05-23 01:00 PM" },
  { name: "audit_trail", rows: 38420, size: "88.4 MB", lastUpdate: "2026-05-25 11:23 AM" },
  { name: "system_logs", rows: 312840, size: "198.6 MB", lastUpdate: "2026-05-25 11:30 AM" },
];

export const mockQueries = [
  { id: 1, query: "SELECT * FROM students WHERE class_id = '10-A' ORDER BY roll_no;", duration: "14ms", executed: "2026-05-25 09:15 AM" },
  { id: 2, query: "SELECT COUNT(*) FROM attendance WHERE date = CURRENT_DATE AND status = 'present';", duration: "9ms", executed: "2026-05-25 10:45 AM" },
  { id: 3, query: "SELECT AVG(marks) FROM grades WHERE exam_type = 'terminal' GROUP BY subject_id;", duration: "52ms", executed: "2026-05-25 11:00 AM" },
  { id: 4, query: "SELECT student_id, SUM(amount) FROM fee_transactions WHERE status = 'pending' GROUP BY student_id;", duration: "38ms", executed: "2026-05-25 09:30 AM" },
  { id: 5, query: "SELECT s.name, f.amount, f.due_date FROM students s JOIN fee_transactions f ON s.id = f.student_id WHERE f.status = 'overdue';", duration: "97ms", executed: "2026-05-24 02:30 PM" },
];

export const mockBackups = [
  { id: 1, filename: "eitsms_backup_20260525_020000.sql", size: "512.4 MB", created: "2026-05-25 02:00 AM", status: "Completed" },
  { id: 2, filename: "eitsms_backup_20260524_020000.sql", size: "508.7 MB", created: "2026-05-24 02:00 AM", status: "Completed" },
  { id: 3, filename: "eitsms_backup_20260523_020000.sql", size: "504.2 MB", created: "2026-05-23 02:00 AM", status: "Failed" },
  { id: 4, filename: "eitsms_backup_20260522_020000.sql", size: "501.9 MB", created: "2026-05-22 02:00 AM", status: "Completed" },
  { id: 5, filename: "eitsms_backup_20260521_020000.sql", size: "498.3 MB", created: "2026-05-21 02:00 AM", status: "Completed" },
];

export const useSystemDatabase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sqlQuery, setSqlQuery] = useState("");
  const [queryResult, setQueryResult] = useState<any>(null);

  const filteredTables = mockTables.filter(table =>
    table.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRunQuery = () => {
    if (!sqlQuery.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a SQL query to run.",
      });
      return;
    }

    // Mock query execution
    toast({
      title: "Query Executed",
      description: "Your query has been executed successfully.",
    });

    // Mock result for SELECT queries
    if (sqlQuery.toLowerCase().trim().startsWith("select")) {
      setQueryResult({
        columns: ["id", "name", "email", "role", "created_at"],
        rows: [
          { id: 1, name: "Aarav Singh", email: "aarav.singh@eitsms.edu.in", role: "student", created_at: "2026-04-01" },
          { id: 2, name: "Sunita Mishra", email: "sunita.mishra@eitsms.edu.in", role: "teacher", created_at: "2018-08-15" },
          { id: 3, name: "Principal Arora", email: "principal@eitsms.edu.in", role: "principal", created_at: "2015-06-01" },
          { id: 4, name: "Rohan Verma", email: "rohan.verma@eitsms.edu.in", role: "admin", created_at: "2017-02-14" },
        ],
        rowCount: 4,
        executionTime: "28ms",
      });
    } else {
      // Mock result for non-SELECT queries
      setQueryResult({
        message: "Query executed successfully",
        rowsAffected: 1,
        executionTime: "18ms",
      });
    }
  };

  const handleDownloadBackup = (id: number) => {
    toast({
      title: "Backup Download Started",
      description: "Your database backup file is being downloaded.",
    });
  };

  const handleCreateBackup = () => {
    toast({
      title: "Manual Backup Started",
      description: "A new database backup has been initiated.",
    });
  };

  const handleOptimize = () => {
    toast({
      title: "Optimization Started",
      description: "Database optimization process has been initiated.",
    });
  };

  const handleRefreshStats = () => {
    toast({
      title: "Refreshing Statistics",
      description: "Performance statistics are being updated.",
    });
  };

  return {
    searchTerm,
    setSearchTerm,
    sqlQuery,
    setSqlQuery,
    queryResult,
    filteredTables,
    handleRunQuery,
    handleDownloadBackup,
    handleCreateBackup,
    handleOptimize,
    handleRefreshStats,
    mockQueries,
    mockBackups
  };
};
