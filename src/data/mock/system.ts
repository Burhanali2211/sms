// Mock data for super-admin system monitoring

export const MOCK_SYSTEM_HEALTH = {
  uptime: '99.92%',
  avgResponse: '42ms',
  cpuUsage: 42,
  memoryUsage: 67,
  diskUsage: 64,
  activeConnections: 342,
  requestsPerMin: 1840,
  errorRate: '0.03%',
};

export const MOCK_INFRASTRUCTURE = [
  { name: 'API Server (Primary)', status: 'operational', uptime: '99.99%', load: '42%', region: 'ap-south-1' },
  { name: 'Database Main (PostgreSQL)', status: 'operational', uptime: '99.95%', load: '68%', region: 'ap-south-1' },
  { name: 'Cache Layer (Redis)', status: 'degraded', uptime: '98.20%', load: '89%', region: 'ap-south-1' },
  { name: 'File Storage (S3)', status: 'operational', uptime: '99.99%', load: '21%', region: 'ap-southeast-1' },
  { name: 'CDN (CloudFront)', status: 'operational', uptime: '100%', load: '34%', region: 'Global' },
  { name: 'Email Gateway', status: 'operational', uptime: '99.80%', load: '15%', region: 'us-east-1' },
];

export const MOCK_ACTIVE_ALERTS = [
  { id: 'alert-001', title: 'High Memory Usage — Cache Layer', desc: 'Redis cache memory exceeded 85% threshold. Consider scaling or flushing stale keys.', severity: 'high', since: '2 hours ago' },
  { id: 'alert-002', title: 'Database Backup Delayed', desc: 'Scheduled nightly backup took 45s longer than the 120s SLA. No data loss detected.', severity: 'medium', since: '6 hours ago' },
  { id: 'alert-003', title: 'Unusual Login Attempt', desc: 'Multiple failed login attempts detected from IP 203.0.113.45. Account temporarily locked.', severity: 'low', since: '12 hours ago' },
];

export const MOCK_AUDIT_LOGS = [
  { id: 'aud-001', action: 'User Role Updated', target: 'User: Fatima Siddiqui', by: 'superadmin@demo.com', time: '10 minutes ago', type: 'warning' as const },
  { id: 'aud-002', action: 'System Backup Completed', target: 'Database Main', by: 'system_cron', time: '6 hours ago', type: 'success' as const },
  { id: 'aud-003', action: 'New User Created', target: 'User: Kiran Rao (labs)', by: 'admin@demo.com', time: '1 hour ago', type: 'info' as const },
  { id: 'aud-004', action: 'Failed Login Attempt', target: 'Unknown User', by: 'IP: 203.0.113.45', time: '12 hours ago', type: 'error' as const },
  { id: 'aud-005', action: 'Settings Updated', target: 'Email Gateway Config', by: 'superadmin@demo.com', time: '1 day ago', type: 'info' as const },
  { id: 'aud-006', action: 'Permission Changed', target: 'Role: Principal — Calendar Write', by: 'superadmin@demo.com', time: '2 days ago', type: 'warning' as const },
  { id: 'aud-007', action: 'Database Migration Run', target: 'Schema v2.4.1', by: 'system_deploy', time: '3 days ago', type: 'info' as const },
  { id: 'aud-008', action: 'User Deactivated', target: 'User: Sanjay Dubey (teacher)', by: 'admin@demo.com', time: '4 days ago', type: 'warning' as const },
];

const genUsageSeries = (base: number, variance: number, points = 24) =>
  Array.from({ length: points }, (_, i) => ({
    time: `${String(i).padStart(2, '0')}:00`,
    value: Math.min(100, Math.max(5, Math.round(base + (Math.sin(i / 3) * variance) + (Math.random() * variance * 0.5)))),
  }));

export const MOCK_PERFORMANCE_SERIES = {
  cpu: genUsageSeries(42, 15),
  memory: genUsageSeries(67, 10),
  requests: genUsageSeries(1840, 400).map(p => ({ ...p, value: p.value * 10 })),
  responseTime: genUsageSeries(42, 20),
};

export const MOCK_DATABASE_TABLES = [
  { name: 'users', rows: 1248, size: '4.2 MB', lastWrite: '2 min ago', indexes: 5 },
  { name: 'students', rows: 847, size: '3.1 MB', lastWrite: '15 min ago', indexes: 6 },
  { name: 'attendance', rows: 184320, size: '42.8 MB', lastWrite: '5 min ago', indexes: 4 },
  { name: 'grades', rows: 38400, size: '12.6 MB', lastWrite: '1 hour ago', indexes: 4 },
  { name: 'events', rows: 2840, size: '1.8 MB', lastWrite: '20 min ago', indexes: 3 },
  { name: 'notifications', rows: 15620, size: '5.4 MB', lastWrite: '1 min ago', indexes: 3 },
  { name: 'library_items', rows: 4820, size: '2.2 MB', lastWrite: '1 day ago', indexes: 3 },
  { name: 'financial_records', rows: 8940, size: '7.1 MB', lastWrite: '45 min ago', indexes: 4 },
];

export const MOCK_BACKUPS = [
  { id: 'bkp-001', type: 'Full Backup', status: 'success', size: '2.4 GB', duration: '8m 32s', createdAt: '2025-05-25 02:00:00' },
  { id: 'bkp-002', type: 'Incremental', status: 'success', size: '142 MB', duration: '1m 14s', createdAt: '2025-05-24 02:00:00' },
  { id: 'bkp-003', type: 'Incremental', status: 'success', size: '138 MB', duration: '1m 08s', createdAt: '2025-05-23 02:00:00' },
  { id: 'bkp-004', type: 'Full Backup', status: 'success', size: '2.3 GB', duration: '8m 18s', createdAt: '2025-05-18 02:00:00' },
  { id: 'bkp-005', type: 'Incremental', status: 'warning', size: '156 MB', duration: '2m 47s', createdAt: '2025-05-17 02:00:00' },
];
