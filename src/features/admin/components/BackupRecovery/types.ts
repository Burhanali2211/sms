export interface Backup {
  id: string;
  name: string;
  date: string;
  time: string;
  type: 'full' | 'incremental';
  size: string;
  status: 'completed' | 'failed' | 'in-progress';
  nodes?: string[];
}

export interface BackupSchedule {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  retention: string;
  time: string;
  lastRun?: string;
  nextRun: string;
  enabled: boolean;
}
