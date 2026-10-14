/**
 * Mock Dropdown Options and Rows for My Assignments
 */

import type {
  AssignmentFilterOption,
  AssignmentItem,
} from '@/types/assignment';

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
    category: 'Circulars',
    status: 'Completed',
  },
  {
    id: 'asn-005',
    reference: 'REF-2026-018',
    created: '2026-03-14',
    requestFrom: 'National Archives',
    category: 'Cabinet Papers',
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
];
