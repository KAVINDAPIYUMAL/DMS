/**
 * Assignment Types
 * Strict type definitions for the My Assignments module.
 */

export type AssignmentStatus = 'Pending' | 'In Progress' | 'Completed';

export type AssignmentCategory =
  | 'Information'
  | 'Tariff Change'
  | 'Organizational Change'
  | 'Policy Update'
  | 'Position Replacement'
  | 'Government Direction'
  | 'Vouchers'
  | 'Bills'
  | 'Circular'
  | 'Notice'
  | 'Request Letters'
  | 'Answers';

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
