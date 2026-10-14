/**
 * Assignment Types
 * Strict type definitions for the My Assignments module.
 */

export type AssignmentStatus = 'Pending' | 'In Progress' | 'Completed';

export type AssignmentFilterValue = AssignmentStatus | 'All';

export interface AssignmentFilterOption {
  value: AssignmentFilterValue;
  label: string;
}

export interface AssignmentItem {
  id: string;
  reference: string;
  created: string;
  requestFrom: string;
  category: string;
  status: AssignmentStatus;
}

export type AssignmentActionType = 'View' | 'Update status' | 'Forward';
