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
  statusFilter?: AssignmentFilterValue
): Promise<AssignmentItem[]> {
  // Simulated asynchronous network latency
  await new Promise<void>((resolve) => setTimeout(resolve, 450));

  if (!statusFilter || statusFilter === 'All') {
    return [...MOCK_ASSIGNMENTS];
  }

  return MOCK_ASSIGNMENTS.filter((item) => item.status === statusFilter);
}
