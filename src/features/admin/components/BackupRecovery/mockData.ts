import { Backup, BackupSchedule } from './types';

export const mockBackups: Backup[] = [
  {
    id: '1',
    name: 'Full System Backup',
    date: '2026-05-25',
    time: '02:00',
    type: 'full',
    size: '1.4 GB',
    status: 'completed'
  },
  {
    id: '2',
    name: 'Database Backup',
    date: '2026-05-25',
    time: '18:00',
    type: 'full',
    size: '512 MB',
    status: 'completed'
  },
  {
    id: '3',
    name: 'Student Records Backup',
    date: '2026-05-25',
    time: '12:00',
    type: 'incremental',
    size: '94 MB',
    status: 'completed'
  },
  {
    id: '4',
    name: 'Full System Backup',
    date: '2026-05-24',
    time: '02:00',
    type: 'full',
    size: '1.38 GB',
    status: 'completed'
  },
  {
    id: '5',
    name: 'Fee & Finance Backup',
    date: '2026-05-24',
    time: '20:00',
    type: 'incremental',
    size: '67 MB',
    status: 'completed'
  },
  {
    id: '6',
    name: 'Full System Backup',
    date: '2026-05-23',
    time: '02:00',
    type: 'full',
    size: '1.3 GB',
    status: 'failed',
    nodes: ['Database connection timeout after 120s', 'Partial write — 62% complete']
  },
  {
    id: '7',
    name: 'Media & Documents Backup',
    date: '2026-05-22',
    time: '23:00',
    type: 'incremental',
    size: '380 MB',
    status: 'completed'
  },
  {
    id: '8',
    name: 'Configuration Backup',
    date: '2026-05-21',
    time: '18:00',
    type: 'full',
    size: '14 MB',
    status: 'completed'
  },
  {
    id: '9',
    name: 'Full System Backup',
    date: '2026-05-20',
    time: '02:00',
    type: 'full',
    size: '1.35 GB',
    status: 'completed'
  },
  {
    id: '10',
    name: 'Library Catalog Backup',
    date: '2026-05-19',
    time: '14:00',
    type: 'incremental',
    size: '28 MB',
    status: 'completed'
  },
];

export const mockSchedules: BackupSchedule[] = [
  {
    id: '1',
    name: 'Full System Backup',
    frequency: 'daily',
    retention: '7 days',
    time: '02:00',
    lastRun: '2026-05-25 02:00',
    nextRun: '2026-05-26 02:00',
    enabled: true
  },
  {
    id: '2',
    name: 'Database Backup',
    frequency: 'daily',
    retention: '14 days',
    time: '18:00',
    lastRun: '2026-05-25 18:00',
    nextRun: '2026-05-26 18:00',
    enabled: true
  },
  {
    id: '3',
    name: 'Student Records Backup',
    frequency: 'daily',
    retention: '30 days',
    time: '12:00',
    lastRun: '2026-05-25 12:00',
    nextRun: '2026-05-26 12:00',
    enabled: true
  },
  {
    id: '4',
    name: 'Fee & Finance Backup',
    frequency: 'daily',
    retention: '14 days',
    time: '20:00',
    lastRun: '2026-05-24 20:00',
    nextRun: '2026-05-26 20:00',
    enabled: true
  },
  {
    id: '5',
    name: 'Configuration Backup',
    frequency: 'weekly',
    retention: '90 days',
    time: '18:00',
    lastRun: '2026-05-21 18:00',
    nextRun: '2026-05-28 18:00',
    enabled: true
  },
  {
    id: '6',
    name: 'Media & Documents Backup',
    frequency: 'weekly',
    retention: '30 days',
    time: '23:00',
    lastRun: '2026-05-22 23:00',
    nextRun: '2026-05-29 23:00',
    enabled: true
  },
  {
    id: '7',
    name: 'Library Catalog Backup',
    frequency: 'weekly',
    retention: '14 days',
    time: '14:00',
    lastRun: '2026-05-19 14:00',
    nextRun: '2026-05-26 14:00',
    enabled: false
  }
];
