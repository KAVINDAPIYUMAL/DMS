/**
 * useDashboard — Custom hook for executive dashboard data.
 *
 * Encapsulates:
 * - Summary statistics fetching
 * - Recent tasks fetching
 * - Loading and error states
 */

import { useState, useEffect, useCallback } from 'react';
import {
  getDashboardSummary,
  getRecentTasks,
  type DashboardSummary,
  type RecentTask,
} from '@/services/dashboard.service';

export function useDashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [recentTasks, setRecentTasks] = useState<RecentTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [summaryData, tasksData] = await Promise.all([
        getDashboardSummary(),
        getRecentTasks(),
      ]);
      setSummary(summaryData);
      setRecentTasks(tasksData);
    } catch {
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    summary,
    recentTasks,
    isLoading,
    error,
    refetch: fetchData,
  };
}
