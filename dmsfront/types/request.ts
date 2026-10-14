export type ReceivedVia =
  | "Registered Post"
  | "Email"
  | "Hand Delivery"
  | "Fax"
  | "Online";

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
