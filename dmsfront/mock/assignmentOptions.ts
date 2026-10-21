/**
 * Mock Dropdown Options and Rows for My Assignments
 */

import type {
  AssignmentFilterOption,
  AssignmentItem,
} from '@/types/assignment';

export const ASSIGNMENT_CATEGORIES: string[] = [
  'Information',
  'Tariff Change',
  'Organizational Change',
  'Policy Update',
  'Position Replacement',
  'Government Direction',
  'Vouchers',
  'Bills',
  'Circular',
  'Notice',
  'Request Letters',
  'Answers',
];

export const ASSIGNMENT_FILTER_OPTIONS: AssignmentFilterOption[] = [
  { value: 'Pending', label: 'Pending' },
  { value: 'In Progress', label: 'In Progress' },
  { value: 'Completed', label: 'Completed' },
  { value: 'All', label: 'All' },
];

export const MOCK_ASSIGNMENTS: AssignmentItem[] = [
  {
    id: 'asn-001',
    reference: 'REF-2026-001',
    created: '2026-03-10',
    requestFrom: 'Ministry of Finance',
    category: 'Bills',
    status: 'Pending',
  },
  {
    id: 'asn-002',
    reference: 'REF-2026-004',
    created: '2026-03-11',
    requestFrom: 'Department of Government Information',
    category: 'Information',
    status: 'In Progress',
  },
  {
    id: 'asn-003',
    reference: 'REF-2026-009',
    created: '2026-03-12',
    requestFrom: 'Ministry of Technology',
    category: 'Policy Update',
    status: 'In Progress',
  },
  {
    id: 'asn-004',
    reference: 'REF-2026-012',
    created: '2026-03-13',
    requestFrom: 'Sri Lanka Telecom HQ',
    category: 'Circular',
    status: 'Completed',
  },
  {
    id: 'asn-005',
    reference: 'REF-2026-018',
    created: '2026-03-14',
    requestFrom: 'National Archives',
    category: 'Government Direction',
    status: 'Pending',
  },
  {
    id: 'asn-006',
    reference: 'REF-2026-022',
    created: '2026-03-15',
    requestFrom: 'Department of Posts',
    category: 'Information',
    status: 'Completed',
  },
  {
    id: 'asn-007',
    reference: 'REF-2026-025',
    created: '2026-03-16',
    requestFrom: 'TRCSL Regulatory Unit',
    category: 'Tariff Change',
    status: 'Pending',
  },
  {
    id: 'asn-008',
    reference: 'REF-2026-029',
    created: '2026-03-17',
    requestFrom: 'HR Administration Directorate',
    category: 'Organizational Change',
    status: 'In Progress',
  },
  {
    id: 'asn-009',
    reference: 'REF-2026-033',
    created: '2026-03-18',
    requestFrom: 'Public Service Commission',
    category: 'Position Replacement',
    status: 'Pending',
  },
  {
    id: 'asn-010',
    reference: 'REF-2026-037',
    created: '2026-03-19',
    requestFrom: 'Internal Audit & Accounts',
    category: 'Vouchers',
    status: 'Completed',
  },
  {
    id: 'asn-011',
    reference: 'REF-2026-041',
    created: '2026-03-20',
    requestFrom: 'Department of Information - Press Bureau',
    category: 'Notice',
    status: 'In Progress',
  },
  {
    id: 'asn-012',
    reference: 'REF-2026-045',
    created: '2026-03-21',
    requestFrom: 'Public Petitions Division',
    category: 'Request Letters',
    status: 'Pending',
  },
  {
    id: 'asn-013',
    reference: 'REF-2026-048',
    created: '2026-03-22',
    requestFrom: 'Parliamentary Affairs Unit',
    category: 'Answers',
    status: 'In Progress',
  },
  {
    id: 'asn-014',
    reference: 'REF-2026-052',
    created: '2026-03-23',
    requestFrom: 'Information Commission Desk',
    category: 'Information',
    status: 'Pending',
  },
];
