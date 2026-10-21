/**
 * Request & Document Types
 * Canonical type definitions for document requests, workflows, and officer directory.
 */

// ── Domain Models (extracted from data files) ─────────────────────

export interface RequestActor {
  name: string;
  designation: string;
  code: string;
}

export interface TimelineStep {
  stage: string;
  date: string;
  actor: string;
  status: 'completed' | 'current' | 'pending';
  notes?: string;
}

export interface RequestAttachment {
  name: string;
  size: string;
  type: string;
}

export interface MyRequestItem {
  id: string;
  reference: string;
  created: string;
  title: string;
  description: string;
  assignTo: RequestActor;
  mainCategory: 'Bills' | 'Information' | 'Policy Update' | 'Circulars' | 'Cabinet Papers';
  assignFrom: RequestActor;
  status: 'Completed' | 'Pending' | 'Done';
  statusVariant: 'completed' | 'pending' | 'urgent';
  turnaroundText: string;
  turnaroundDays: number;
  isOverdue: boolean;
  priority: 'Normal' | 'High' | 'Urgent';
  progress: number;
  timeline: TimelineStep[];
  attachments: RequestAttachment[];
}

export interface OfficerDirectoryItem {
  code: string;
  designation: string;
  name: string;
  division?: string;
}

// ── Form & Submission Types ───────────────────────────────────────

export type ReceivedVia =
  | "Registered Post"
  | "Normal Post"
  | "Email"
  | "Hand Delivery"
  | "Fax"
  | "Online"
  | "WhatsApp"
  | "Other";

export type ActionTaken = "Forwarded" | "Acknowledged" | "Filed" | "Pending";

export interface SelectOption {
  value: string;
  label: string;
}

export interface AttachmentFile {
  id: number;
  name: string;
  size: number;
  file: File;
}

export interface SubmitRequestFormState {
  receivedVia: string;
  documentReference: string;
  documentSubject: string;
  receivedType: string;
  receivedOrganization: string;
  receivedDate: string;
  receivedTime: string;
  mainCategory: string;
  extraCategories: string[];
  actionTaken: string;
  designationType: string;
  designation: string;
  assignTo: string;
  comments: string;
  attachments: AttachmentFile[];
}

export type FormErrors = Partial<Record<keyof SubmitRequestFormState | "attachmentError", string>>;

export interface SubmitResult {
  requestNumber: string;
}
