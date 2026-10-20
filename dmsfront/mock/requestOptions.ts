import type { SelectOption } from "@/types/request";

export const RECEIVED_VIA_OPTIONS: SelectOption[] = [
  { value: "Registered Post", label: "Registered Post" },
  { value: "Email", label: "Email" },
  { value: "Hand Delivery", label: "Hand Delivery" },
  { value: "Fax", label: "Fax" },
  { value: "Online", label: "Online" },
  { value: "WhatsApp", label: "WhatsApp" },
  { value: "Other", label: "Other" },
];

export const RECEIVED_TYPE_BY_VIA: Record<string, SelectOption[]> = {
  "Registered Post": [
    { value: "Letter", label: "Letter" },
    { value: "Parcel", label: "Parcel" },
    { value: "Registered Document", label: "Registered Document" },
  ],
  Email: [
    { value: "Official Email", label: "Official Email" },
    { value: "Complaint Email", label: "Complaint Email" },
    { value: "Query Email", label: "Query Email" },
  ],
  "Hand Delivery": [
    { value: "Application", label: "Application" },
    { value: "Report", label: "Report" },
    { value: "Invoice", label: "Invoice" },
  ],
  Fax: [
    { value: "Fax Message", label: "Fax Message" },
    { value: "Fax Document", label: "Fax Document" },
  ],
  Online: [
    { value: "Online Form", label: "Online Form" },
    { value: "Portal Submission", label: "Portal Submission" },
    { value: "Web Request", label: "Web Request" },
  ],
  WhatsApp: [
    { value: "WhatsApp Message", label: "WhatsApp Message" },
    { value: "WhatsApp Document", label: "WhatsApp Document" },
  ],
  Other: [
    { value: "Other", label: "Other" },
  ],
};

export const RECEIVED_ORG_BY_TYPE: Record<string, SelectOption[]> = {
  Letter: [
    { value: "Ministry of Finance", label: "Ministry of Finance" },
    { value: "Ministry of Technology", label: "Ministry of Technology" },
    { value: "Sri Lanka Telecom HQ", label: "Sri Lanka Telecom HQ" },
  ],
  Parcel: [
    { value: "Department of Posts", label: "Department of Posts" },
    { value: "Ceylon Electricity Board", label: "Ceylon Electricity Board" },
  ],
  "Registered Document": [
    { value: "Land Registry", label: "Land Registry" },
    { value: "National Archives", label: "National Archives" },
  ],
  "Official Email": [
    { value: "Audit Division", label: "Audit Division" },
    { value: "HR Department", label: "HR Department" },
    { value: "Finance Division", label: "Finance Division" },
  ],
  "Complaint Email": [
    { value: "Customer Relations", label: "Customer Relations" },
    { value: "Quality Assurance", label: "Quality Assurance" },
  ],
  "Query Email": [
    { value: "IT Support", label: "IT Support" },
    { value: "Service Desk", label: "Service Desk" },
  ],
  Application: [
    { value: "Public Applicant", label: "Public Applicant" },
    { value: "Corporate Entity", label: "Corporate Entity" },
    { value: "Government Agency", label: "Government Agency" },
  ],
  Report: [
    { value: "Internal Audit", label: "Internal Audit" },
    { value: "Financial Reporting Unit", label: "Financial Reporting Unit" },
  ],
  Invoice: [
    { value: "Vendor A", label: "Vendor A" },
    { value: "Vendor B", label: "Vendor B" },
    { value: "Procurement Division", label: "Procurement Division" },
  ],
  "Fax Message": [
    { value: "Regional Office Kandy", label: "Regional Office Kandy" },
    { value: "Regional Office Galle", label: "Regional Office Galle" },
  ],
  "Fax Document": [
    { value: "Legal Department", label: "Legal Department" },
    { value: "Regulatory Affairs", label: "Regulatory Affairs" },
  ],
  "Online Form": [
    { value: "Self-Service Portal", label: "Self-Service Portal" },
    { value: "e-Government Portal", label: "e-Government Portal" },
  ],
  "Portal Submission": [
    { value: "Business Portal", label: "Business Portal" },
    { value: "Citizen Portal", label: "Citizen Portal" },
  ],
  "Web Request": [
    { value: "DMS Public Site", label: "DMS Public Site" },
    { value: "External Integration", label: "External Integration" },
  ],
  "WhatsApp Message": [
    { value: "Public Citizen", label: "Public Citizen" },
    { value: "Customer Relations", label: "Customer Relations" },
    { value: "Media Division", label: "Media Division" },
  ],
  "WhatsApp Document": [
    { value: "Public Applicant", label: "Public Applicant" },
    { value: "Corporate Entity", label: "Corporate Entity" },
    { value: "Media Division", label: "Media Division" },
  ],
  Other: [
    { value: "General Public", label: "General Public" },
    { value: "External Organization", label: "External Organization" },
    { value: "Other", label: "Other" },
  ],
};

export const MAIN_CATEGORY_OPTIONS: SelectOption[] = [
  { value: "Information", label: "Information" },
  { value: "Complaint", label: "Complaint" },
  { value: "Service Request", label: "Service Request" },
  { value: "Inquiry", label: "Inquiry" },
  { value: "Appeal", label: "Appeal" },
  { value: "Report", label: "Report" },
  { value: "Feedback", label: "Feedback" },
];

export const ACTION_TAKEN_OPTIONS: SelectOption[] = [
  { value: "Forwarded", label: "Forwarded" },
  { value: "Acknowledged", label: "Acknowledged" },
  { value: "Filed", label: "Filed" },
  { value: "Pending", label: "Pending" },
];

export const DESIGNATION_TYPE_OPTIONS: SelectOption[] = [
  { value: "Management", label: "Management" },
  { value: "Technical", label: "Technical" },
  { value: "Administrative", label: "Administrative" },
  { value: "Field Operations", label: "Field Operations" },
];

export const DESIGNATION_BY_TYPE: Record<string, SelectOption[]> = {
  Management: [
    { value: "Director General", label: "Director General" },
    { value: "Deputy Director", label: "Deputy Director" },
    { value: "Assistant Director", label: "Assistant Director" },
    { value: "Manager", label: "Manager" },
  ],
  Technical: [
    { value: "Senior Engineer", label: "Senior Engineer" },
    { value: "Engineer", label: "Engineer" },
    { value: "Technical Officer", label: "Technical Officer" },
    { value: "Network Analyst", label: "Network Analyst" },
  ],
  Administrative: [
    { value: "Administrative Officer", label: "Administrative Officer" },
    { value: "Clerk", label: "Clerk" },
    { value: "Registry Officer", label: "Registry Officer" },
  ],
  "Field Operations": [
    { value: "Field Supervisor", label: "Field Supervisor" },
    { value: "Technician", label: "Technician" },
    { value: "Field Officer", label: "Field Officer" },
  ],
};

export const ASSIGNEE_BY_DESIGNATION: Record<string, SelectOption[]> = {
  "Director General": [
    { value: "DG001", label: "Mr. K. Perera (DG001)" },
    { value: "DG002", label: "Ms. S. Fernando (DG002)" },
  ],
  "Deputy Director": [
    { value: "DD001", label: "Mr. R. Jayawardena (DD001)" },
    { value: "DD002", label: "Ms. N. Wickramasinghe (DD002)" },
    { value: "DD003", label: "Mr. T. Gunawardena (DD003)" },
  ],
  "Assistant Director": [
    { value: "AD001", label: "Mr. L. Bandara (AD001)" },
    { value: "AD002", label: "Ms. C. Dissanayake (AD002)" },
  ],
  Manager: [
    { value: "MG001", label: "Mr. A. Silva (MG001)" },
    { value: "MG002", label: "Ms. P. Kumari (MG002)" },
    { value: "MG003", label: "Mr. B. Rathnayake (MG003)" },
  ],
  "Senior Engineer": [
    { value: "SE001", label: "Mr. V. Mendis (SE001)" },
    { value: "SE002", label: "Mr. H. Dias (SE002)" },
  ],
  Engineer: [
    { value: "EN001", label: "Mr. U. Weerasinghe (EN001)" },
    { value: "EN002", label: "Ms. D. Karunaratne (EN002)" },
    { value: "EN003", label: "Mr. I. Samarawickrama (EN003)" },
  ],
  "Technical Officer": [
    { value: "TO001", label: "Mr. J. Liyanage (TO001)" },
    { value: "TO002", label: "Ms. G. Madushani (TO002)" },
  ],
  "Network Analyst": [
    { value: "NA001", label: "Ms. E. Seneviratne (NA001)" },
    { value: "NA002", label: "Mr. F. Wijesinghe (NA002)" },
  ],
  "Administrative Officer": [
    { value: "AO001", label: "Ms. M. Senanayake (AO001)" },
    { value: "AO002", label: "Mr. O. Pathirane (AO002)" },
  ],
  Clerk: [
    { value: "CL001", label: "Ms. Q. Tennakoon (CL001)" },
    { value: "CL002", label: "Mr. W. Rajapaksa (CL002)" },
  ],
  "Registry Officer": [
    { value: "RO001", label: "Ms. X. Hapuarachchi (RO001)" },
  ],
  "Field Supervisor": [
    { value: "FS001", label: "Mr. Y. Ekanayake (FS001)" },
    { value: "FS002", label: "Mr. Z. Gunasekara (FS002)" },
  ],
  Technician: [
    { value: "TN001", label: "Mr. AA. Fonseka (TN001)" },
    { value: "TN002", label: "Ms. AB. Ratnayake (TN002)" },
    { value: "TN003", label: "Mr. AC. Siriwardena (TN003)" },
  ],
  "Field Officer": [
    { value: "FO001", label: "Mr. AD. Munasinghe (FO001)" },
    { value: "FO002", label: "Ms. AE. Amarasinghe (FO002)" },
  ],
};
