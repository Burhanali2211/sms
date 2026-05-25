import { Backup, BackupSchedule } from './types';

export const mockBackups: Backup[] = [
  {
    id: '1',
    name: 'Full System Backup',
    date: '2025-05-17',
    time: '23:00',
    type: 'full',
    size: '1.2 GB',
    status: 'completed'
  },
  {
    id: '2',
    name: 'Database Backup',
    date: '2025-05-17',
    time: '18:00',
    type: 'full',
    size: '450 MB',
    status: 'completed'
  },
  {
    id: '3',
    name: 'User Data Backup',
    date: '2025-05-17',
    time: '12:00',
    type: 'incremental',
    size: '85 MB',
    status: 'completed'
  },
  {
    id: '4',
    name: 'Content Files Backup',
    date: '2025-05-16',
    time: '23:00',
    type: 'incremental',
    size: '124 MB',
    status: 'completed'
  },
  {
    id: '5',
    name: 'Configuration Backup',
    date: '2025-05-16',
    time: '18:00',
    type: 'full',
    size: '12 MB',
    status: 'completed'
  },
  {
    id: '6',
    name: 'Full System Backup',
    date: '2025-05-16',
    time: '03:00',
    type: 'full',
    size: '1.1 GB',
    status: 'failed',
    nodes: ['Database connection timeout', 'Insufficient storage space']
  },
  {
    id: '7',
    name: 'Media Library Backup',
    date: '2025-05-15',
    time: '23:00',
    type: 'incremental',
    size: '340 MB',
    status: 'completed'
  }
];

export const mockSchedules: BackupSchedule[] = [
  {
    id: '1',
    name: 'Full System Backup',
    frequency: 'daily',
    retention: '7 days',
    time: '23:00',
    lastRun: '2025-05-17 23:00',
    nextRun: '2025-05-18 23:00',
    enabled: true
  },
  {
    id: '2',
    name: 'Database Backup',
    frequency: 'daily',
    retention: '14 days',
    time: '18:00',
    lastRun: '2025-05-17 18:00',
    nextRun: '2025-05-18 18:00',
    enabled: true
  },
  {
    id: '3',
    name: 'User Data Backup',
    frequency: 'daily',
    retention: '7 days',
    time: '12:00',
    lastRun: '2025-05-17 12:00',
    nextRun: '2025-05-18 12:00',
    enabled: true
  },
  {
    id: '4',
    name: 'Configuration Backup',
    frequency: 'weekly',
    retention: '30 days',
    time: '18:00',
    lastRun: '2025-05-16 18:00',
    nextRun: '2025-05-23 18:00',
    enabled: true
  },
  {
    id: '5',
    name: 'Media Library Backup',
    frequency: 'weekly',
    retention: '14 days',
    time: '23:00',
    lastRun: '2025-05-15 23:00',
    nextRun: '2025-05-22 23:00',
    enabled: false
  }
];
