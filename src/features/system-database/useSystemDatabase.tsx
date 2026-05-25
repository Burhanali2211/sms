import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export const mockTables = [
  { name: "users", rows: 1254, size: "12.8 MB", lastUpdate: "2023-05-12 09:15 AM" },
  { name: "courses", rows: 87, size: "4.2 MB", lastUpdate: "2023-05-11 02:30 PM" },
  { name: "enrollments", rows: 3421, size: "24.6 MB", lastUpdate: "2023-05-12 10:45 AM" },
  { name: "classes", rows: 156, size: "3.1 MB", lastUpdate: "2023-05-10 04:15 PM" },
  { name: "attendance", rows: 25789, size: "64.3 MB", lastUpdate: "2023-05-12 11:00 AM" },
  { name: "grades", rows: 18542, size: "42.7 MB", lastUpdate: "2023-05-12 08:30 AM" },
  { name: "payments", rows: 8754, size: "28.9 MB", lastUpdate: "2023-05-12 09:45 AM" },
  { name: "notifications", rows: 36521, size: "78.2 MB", lastUpdate: "2023-05-12 11:15 AM" },
  { name: "calendar_events", rows: 1245, size: "8.4 MB", lastUpdate: "2023-05-11 01:00 PM" },
  { name: "system_logs", rows: 245678, size: "156.8 MB", lastUpdate: "2023-05-12 11:30 AM" },
];

export const mockQueries = [
  { id: 1, query: "SELECT * FROM users WHERE role = 'student';", duration: "12ms", executed: "2023-05-12 09:15 AM" },
  { id: 2, query: "SELECT COUNT(*) FROM attendance WHERE date = CURRENT_DATE;", duration: "8ms", executed: "2023-05-12 10:45 AM" },
  { id: 3, query: "SELECT AVG(score) FROM grades GROUP BY course_id;", duration: "45ms", executed: "2023-05-12 11:00 AM" },
  { id: 4, query: "UPDATE system_settings SET value = 'true' WHERE key = 'maintenance_mode';", duration: "6ms", executed: "2023-05-12 09:30 AM" },
  { id: 5, query: "SELECT users.name, courses.title FROM users JOIN enrollments ON users.id = enrollments.user_id JOIN courses ON enrollments.course_id = courses.id;", duration: "89ms", executed: "2023-05-11 02:30 PM" },
];

export const mockBackups = [
  { id: 1, filename: "edusync_backup_20230512_020000.sql", size: "342.6 MB", created: "2023-05-12 02:00 AM", status: "Completed" },
  { id: 2, filename: "edusync_backup_20230511_020000.sql", size: "339.2 MB", created: "2023-05-11 02:00 AM", status: "Completed" },
  { id: 3, filename: "edusync_backup_20230510_020000.sql", size: "336.8 MB", created: "2023-05-10 02:00 AM", status: "Completed" },
  { id: 4, filename: "edusync_backup_20230509_020000.sql", size: "335.1 MB", created: "2023-05-09 02:00 AM", status: "Completed" },
  { id: 5, filename: "edusync_backup_20230508_020000.sql", size: "334.5 MB", created: "2023-05-08 02:00 AM", status: "Completed" },
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
          { id: 1, name: "Alex Student", email: "student@edusync.com", role: "student", created_at: "2023-01-15" },
          { id: 2, name: "Taylor Teacher", email: "teacher@edusync.com", role: "teacher", created_at: "2022-08-22" },
          { id: 3, name: "Pat Principal", email: "principal@edusync.com", role: "principal", created_at: "2022-06-10" },
          { id: 4, name: "Admin User", email: "admin@edusync.com", role: "admin", created_at: "2022-05-05" },
        ],
        rowCount: 4,
        executionTime: "32ms",
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
