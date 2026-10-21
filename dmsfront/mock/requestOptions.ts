import type { SelectOption } from "@/types/request";

export const RECEIVED_VIA_OPTIONS: SelectOption[] = [
  { value: "Registered Post", label: "Registered Post" },
  { value: "Normal Post", label: "Normal Post" },
  { value: "Email", label: "Email" },
  { value: "Hand Delivery", label: "Hand Delivery" },
  { value: "Fax", label: "Fax" },
  { value: "Online", label: "Online" },
  { value: "WhatsApp", label: "WhatsApp" },
  { value: "Other", label: "Other" },
];

export const RECEIVED_TYPE_BY_VIA: Record<string, SelectOption[]> = {
  "Registered Post": [
    { value: "Internal", label: "Internal" },
    { value: "External", label: "External" },
    { value: "Letter", label: "Letter" },
    { value: "Parcel", label: "Parcel" },
    { value: "Registered Document", label: "Registered Document" },
  ],
  "Normal Post": [
    { value: "Internal", label: "Internal" },
    { value: "External", label: "External" },
    { value: "Letter", label: "Letter" },
    { value: "Parcel", label: "Parcel" },
    { value: "General Document", label: "General Document" },
  ],
  Email: [
    { value: "Internal", label: "Internal" },
    { value: "External", label: "External" },
    { value: "Official Email", label: "Official Email" },
    { value: "Complaint Email", label: "Complaint Email" },
    { value: "Query Email", label: "Query Email" },
  ],
  "Hand Delivery": [
    { value: "Internal", label: "Internal" },
    { value: "External", label: "External" },
    { value: "Application", label: "Application" },
    { value: "Report", label: "Report" },
    { value: "Invoice", label: "Invoice" },
  ],
  Fax: [
    { value: "Internal", label: "Internal" },
    { value: "External", label: "External" },
    { value: "Fax Message", label: "Fax Message" },
    { value: "Fax Document", label: "Fax Document" },
  ],
  Online: [
    { value: "Internal", label: "Internal" },
    { value: "External", label: "External" },
    { value: "Online Form", label: "Online Form" },
    { value: "Portal Submission", label: "Portal Submission" },
    { value: "Web Request", label: "Web Request" },
  ],
  WhatsApp: [
    { value: "Internal", label: "Internal" },
    { value: "External", label: "External" },
    { value: "WhatsApp Message", label: "WhatsApp Message" },
    { value: "WhatsApp Document", label: "WhatsApp Document" },
  ],
  Other: [
    { value: "Internal", label: "Internal" },
    { value: "External", label: "External" },
    { value: "Other", label: "Other" },
  ],
};

export const RECEIVED_ORG_BY_TYPE: Record<string, SelectOption[]> = {
  Internal: [
    { value: "Director General of Government Information", label: "Director General of Government Information" },
    { value: "Additional Director General (Admin)", label: "Additional Director General (Admin)" },
    { value: "Additional Director General (Media)", label: "Additional Director General (Media)" },
    { value: "Director (Admin)", label: "Director (Admin)" },
    { value: "Chief Account", label: "Chief Account" },
    { value: "Director (Gov. Film)", label: "Director (Gov. Film)" },
    { value: "Director (News)", label: "Director (News)" },
    { value: "Assistant Director of Information (Admin)", label: "Assistant Director of Information (Admin)" },
    { value: "Assistant Director of Information (Admin II)", label: "Assistant Director of Information (Admin II)" },
    { value: "Assistant Director of Information (Admin III)", label: "Assistant Director of Information (Admin III)" },
    { value: "Assistant Director (Research)", label: "Assistant Director (Research)" },
    { value: "Assistant Director (Communication)", label: "Assistant Director (Communication)" },
    { value: "Accountant", label: "Accountant" },
    { value: "Executive Producer", label: "Executive Producer" },
    { value: "Unit Head – Sound and Auditorium", label: "Unit Head – Sound and Auditorium" },
    { value: "Unit Head – Editing", label: "Unit Head – Editing" },
    { value: "Unit Head – Photography", label: "Unit Head – Photography" },
    { value: "Unit Head – Film and Digital Archive", label: "Unit Head – Film and Digital Archive" },
    { value: "Unit Head – Research", label: "Unit Head – Research" },
    { value: "Unit Head – International News", label: "Unit Head – International News" },
    { value: "Unit Head – School Media Development", label: "Unit Head – School Media Development" },
    { value: "Unit Head – Media Investigation", label: "Unit Head – Media Investigation" },
    { value: "Unit Head – Desathiya Publication", label: "Unit Head – Desathiya Publication" },
    { value: "Unit Head – Publicity", label: "Unit Head – Publicity" },
    { value: "Unit Head – School Media", label: "Unit Head – School Media" },
    { value: "Unit Head – New Media", label: "Unit Head – New Media" },
    { value: "Unit Head – District Media", label: "Unit Head – District Media" },
    { value: "Unit Head – Internal Audit", label: "Unit Head – Internal Audit" },
  ],
  External: [
    { value: "Ministry of Finance", label: "Ministry of Finance" },
    { value: "Ministry of Mass Media", label: "Ministry of Mass Media" },
    { value: "Ministry of Technology", label: "Ministry of Technology" },
    { value: "Department of Posts", label: "Department of Posts" },
    { value: "Ceylon Electricity Board", label: "Ceylon Electricity Board" },
    { value: "Sri Lanka Telecom HQ", label: "Sri Lanka Telecom HQ" },
    { value: "President's Media Division", label: "President's Media Division" },
    { value: "Prime Minister's Office", label: "Prime Minister's Office" },
    { value: "General Public", label: "General Public" },
  ],
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
  "General Document": [
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
  { value: "Resolved", label: "Resolved" },
  { value: "Rejected", label: "Rejected" },
];

export const DESIGNATION_TYPE_OPTIONS: SelectOption[] = [
  { value: "Departmental Service -Grade I", label: "Departmental Service -Grade I" },
  { value: "Departmental Service -Grade II", label: "Departmental Service -Grade II" },
  { value: "Departmental Service -Grade III", label: "Departmental Service -Grade III" },
  { value: "Development Officer Service - Grade", label: "Development Officer Service - Grade" },
  { value: "Development Officer Service - Grade II", label: "Development Officer Service - Grade II" },
  { value: "Development Officer Service - Grade III", label: "Development Officer Service - Grade III" },
  { value: "Driver Service - Grade I", label: "Driver Service - Grade I" },
  { value: "Driver Service - Grade II", label: "Driver Service - Grade II" },
  { value: "Driver Service - Grade III", label: "Driver Service - Grade III" },
  { value: "Emloyee Office Service - Grade I", label: "Emloyee Office Service - Grade I" },
  { value: "Emloyee Office Service - Grade II", label: "Emloyee Office Service - Grade II" },
  { value: "Emloyee Office Service - Grade III", label: "Emloyee Office Service - Grade III" },
  { value: "Journalist", label: "Journalist" },
  { value: "Management Service - Grade I", label: "Management Service - Grade I" },
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
  "Departmental Service -Grade I": [
    { value: "Senior Departmental Officer", label: "Senior Departmental Officer" },
    { value: "Grade I Executive Officer", label: "Grade I Executive Officer" },
  ],
  "Departmental Service -Grade II": [
    { value: "Departmental Officer Grade II", label: "Departmental Officer Grade II" },
  ],
  "Departmental Service -Grade III": [
    { value: "Departmental Officer Grade III", label: "Departmental Officer Grade III" },
  ],
  "Development Officer Service - Grade": [
    { value: "Development Officer Grade I", label: "Development Officer Grade I" },
  ],
  "Development Officer Service - Grade II": [
    { value: "Development Officer Grade II", label: "Development Officer Grade II" },
  ],
  "Development Officer Service - Grade III": [
    { value: "Development Officer Grade III", label: "Development Officer Grade III" },
  ],
  "Driver Service - Grade I": [
    { value: "Senior Driver (Special Grade)", label: "Senior Driver (Special Grade)" },
    { value: "Driver Grade I", label: "Driver Grade I" },
  ],
  "Driver Service - Grade II": [
    { value: "Driver Grade II", label: "Driver Grade II" },
  ],
  "Driver Service - Grade III": [
    { value: "Driver Grade III", label: "Driver Grade III" },
  ],
  "Emloyee Office Service - Grade I": [
    { value: "Office Assistant Grade I", label: "Office Assistant Grade I" },
  ],
  "Emloyee Office Service - Grade II": [
    { value: "Office Assistant Grade II", label: "Office Assistant Grade II" },
  ],
  "Emloyee Office Service - Grade III": [
    { value: "Office Assistant Grade III", label: "Office Assistant Grade III" },
  ],
  Journalist: [
    { value: "Chief Journalist", label: "Chief Journalist" },
    { value: "Senior Journalist", label: "Senior Journalist" },
    { value: "Staff Journalist", label: "Staff Journalist" },
  ],
  "Management Service - Grade I": [
    { value: "Management Assistant Grade I", label: "Management Assistant Grade I" },
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
