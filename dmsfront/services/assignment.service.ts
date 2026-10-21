/**
 * Assignment Service
 * Provides simulated asynchronous data operations for task assignments.
 */

import type {
  AssignmentFilterValue,
  AssignmentItem,
} from '@/types/assignment';
import { MOCK_ASSIGNMENTS } from '@/mock/assignmentOptions';

// TODO (Phase 2): replace with real API call
export async function getAssignments(
  filter?: string | string[]
): Promise<AssignmentItem[]> {
  // Simulated asynchronous network latency
  await new Promise<void>((resolve) => setTimeout(resolve, 350));

  if (!filter || filter === 'All') {
    return [...MOCK_ASSIGNMENTS];
  }

  if (Array.isArray(filter)) {
    if (filter.length === 0) return [];
    return MOCK_ASSIGNMENTS.filter((item) => filter.includes(item.category));
  }

  return MOCK_ASSIGNMENTS.filter(
    (item) => item.category === filter || item.status === filter
  );
}
