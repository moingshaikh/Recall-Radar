export type RiskLevel = 'low' | 'medium' | 'high' | 'urgent';

export interface DashboardSummary {
  openAlerts: number;
  highPriority: number;
  categories: number;
  resolvedThisWeek: number;
}

export interface SystemStatus {
  status: 'ok';
  service: 'recall-radar';
  environment: string;
  updatedAt: string;
}

export function createDashboardSummary(summary: DashboardSummary): DashboardSummary {
  return summary;
}

export function getSystemStatus(): SystemStatus {
  return {
    status: 'ok',
    service: 'recall-radar',
    environment: process.env.NODE_ENV || 'development',
    updatedAt: new Date().toISOString(),
  };
}

export function getRiskLabel(score: number): RiskLevel {
  if (score >= 90) return 'urgent';
  if (score >= 75) return 'high';
  if (score >= 50) return 'medium';
  return 'low';
}
