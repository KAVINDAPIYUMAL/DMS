"use client";



import { useState, useRef, useCallback, useEffect } from "react";
import type {
  SubmitRequestFormState,
  FormErrors,
  AttachmentFile,
} from "@/types/request";
import {
  RECEIVED_VIA_OPTIONS,
  RECEIVED_TYPE_BY_VIA,
  RECEIVED_ORG_BY_TYPE,
  MAIN_CATEGORY_OPTIONS,
  ACTION_TAKEN_OPTIONS,
  DESIGNATION_TYPE_OPTIONS,
  DESIGNATION_BY_TYPE,
  ASSIGNEE_BY_DESIGNATION,
} from "@/mock/requestOptions";
import { submitRequest } from "@/services/request.service";
import AttachmentTable from "./AttachmentTable";



const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = [
  "pdf", "doc", "docx", "xls", "xlsx", "jpg", "jpeg", "png",
];
const MAX_COMMENTS = 200;




function getTodayDate(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}/${mm}/${dd}`;
}


function getCurrentTime(): string {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}


function emptyState(): SubmitRequestFormState {
  return {
    receivedVia: "Registered Post",
    documentReference: "",
    documentSubject: "",
    receivedType: "",
    receivedOrganization: "",
    receivedDate: "",
    receivedTime: "",
    mainCategory: "Information",
    extraCategories: [],
    actionTaken: "Forwarded",
    designationType: "",
    designation: "",
    assignTo: "",
    comments: "",
    attachments: [],
  };
}



interface FieldWrapperProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

function FieldWrapper({ label, htmlFor, required, error, children }: FieldWrapperProps) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium text-[var(--foreground)]"
      >
        {label}
        {required && (
          <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>
        )}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-xs text-red-600 mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
}

const inputBase = "w-full rounded-md border border-[var(--surface-border)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--slt-primary)] focus:border-[var(--slt-primary)] transition-colors bg-[var(--surface)]";

const inputError = "border-[var(--foreground-muted)] focus-visible:ring-[var(--foreground-muted)] focus-visible:border-[var(--foreground-muted)]";

const inputReadOnly = "bg-[var(--surface-muted)] text-[var(--foreground-muted)] cursor-not-allowed";

const inputDisabled = "bg-[var(--surface-muted)] text-[var(--foreground-muted)] cursor-not-allowed opacity-70";

export default function SubmitRequestForm() {
  const [form, setForm] = useState<SubmitRequestFormState>(emptyState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const attachIdCounter = useRef(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    setForm((f) => ({
      ...f,
      receivedDate: getTodayDate(),
      receivedTime: getCurrentTime(),
    }));
    const interval = setInterval(() => {
      setForm((f) => ({ ...f, receivedTime: getCurrentTime() }));
    }, 30_000);
    return () => clearInterval(interval);
  }, []);

  const setField = useCallback(
    <K extends keyof SubmitRequestFormState>(
      key: K,
      value: SubmitRequestFormState[K]
    ) => {
      setForm((f) => ({ ...f, [key]: value }));
      setErrors((e) => ({ ...e, [key]: undefined }));
    },
    []
  );

  function handleReceivedViaChange(value: string) {
    setForm((f) => ({
      ...f,
      receivedVia: value,
      receivedType: "",
      receivedOrganization: "",
    }));
    setErrors((e) => ({
      ...e,
      receivedVia: undefined,
      receivedType: undefined,
      receivedOrganization: undefined,
    }));
  }

  function handleReceivedTypeChange(value: string) {
    setForm((f) => ({
      ...f,
      receivedType: value,
      receivedOrganization: "",
    }));
    setErrors((e) => ({
      ...e,
      receivedType: undefined,
      receivedOrganization: undefined,
    }));
  }

  function handleActionTakenChange(value: string) {
    setForm((f) => ({
      ...f,
      actionTaken: value,
      designationType: "",
      designation: "",
      assignTo: "",
    }));
    setErrors((e) => ({
      ...e,
      actionTaken: undefined,
      designationType: undefined,
      designation: undefined,
      assignTo: undefined,
    }));
  }

  function handleDesignationTypeChange(value: string) {
    setForm((f) => ({
      ...f,
      designationType: value,
      designation: "",
      assignTo: "",
    }));
    setErrors((e) => ({
      ...e,
      designationType: undefined,
      designation: undefined,
      assignTo: undefined,
    }));
  }

  function handleDesignationChange(value: string) {
    setForm((f) => ({ ...f, designation: value, assignTo: "" }));
    setErrors((e) => ({ ...e, designation: undefined, assignTo: undefined }));
  }

  function addCategory() {
    const cat = newCategory.trim();
    if (!cat) return;
    if (form.extraCategories.includes(cat)) {
      setNewCategory("");
      return;
    }
    setField("extraCategories", [...form.extraCategories, cat]);
    setNewCategory("");
  }

  function removeCategory(cat: string) {
    setField(
      "extraCategories",
      form.extraCategories.filter((c) => c !== cat)
    );
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);
    if (selected.length === 0) return;

    const errorMessages: string[] = [];
    const validFiles: AttachmentFile[] = [];

    for (const file of selected) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        errorMessages.push(`"${file.name}" exceeds 10 MB limit.`);
        continue;
      }
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        errorMessages.push(
          `"${file.name}" type not allowed. Accepted: ${ALLOWED_EXTENSIONS.join(", ")}.`
        );
        continue;
      }
      attachIdCounter.current += 1;
      validFiles.push({
        id: attachIdCounter.current,
        name: file.name,
        size: file.size,
        file,
      });
    }

    if (errorMessages.length > 0) {
      setErrors((e) => ({ ...e, attachmentError: errorMessages.join(" ") }));
    } else {
      setErrors((e) => ({ ...e, attachmentError: undefined }));
    }

    if (validFiles.length > 0) {
      setField("attachments", [...form.attachments, ...validFiles]);
    }

    e.target.value = "";
  }

  function removeAttachment(id: number) {
    setField(
      "attachments",
      form.attachments.filter((f) => f.id !== id)
    );
  }

  function validateField(
    name: keyof SubmitRequestFormState,
    value: SubmitRequestFormState[keyof SubmitRequestFormState]
  ): string | undefined {
    const isForwarded = form.actionTaken === "Forwarded";

    switch (name) {
      case "receivedVia":
        return !value ? "Received via is required." : undefined;
      case "documentReference":
        return !(value as string).trim() ? "Document Reference is required." : undefined;
      case "documentSubject":
        return !(value as string).trim() ? "Document Subject is required." : undefined;
      case "receivedType":
        return !value ? "Received Type is required." : undefined;
      case "receivedOrganization":
        return !value ? "Received Organization is required." : undefined;
      case "mainCategory":
        return !value ? "Main Category is required." : undefined;
      case "actionTaken":
        return !value ? "Action taken is required." : undefined;
      case "designationType":
        return isForwarded && !value ? "Designation Type is required when forwarding." : undefined;
      case "designation":
        return isForwarded && !value ? "Designation is required when forwarding." : undefined;
      case "assignTo":
        return isForwarded && !value ? "Assign To is required when forwarding." : undefined;
      default:
        return undefined;
    }
  }

  function validateAll(): FormErrors {
    const isForwarded = form.actionTaken === "Forwarded";
    const requiredFields: (keyof SubmitRequestFormState)[] = [
      "receivedVia",
      "documentReference",
      "documentSubject",
      "receivedType",
      "receivedOrganization",
      "mainCategory",
      "actionTaken",
      ...(isForwarded
        ? (["designationType", "designation", "assignTo"] as (keyof SubmitRequestFormState)[])
        : []),
    ];

    const newErrors: FormErrors = {};
    for (const field of requiredFields) {
      const err = validateField(field, form[field]);
      if (err) newErrors[field] = err;
    }
    return newErrors;
  }

  function handleBlur(name: keyof SubmitRequestFormState) {
    const err = validateField(name, form[name]);
    setErrors((e) => ({ ...e, [name]: err }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSuccessMessage(null);
    setSubmitError(null);

    const newErrors = validateAll();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorEl = document.querySelector("[role='alert']");
      firstErrorEl?.closest("div")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsLoading(true);
    try {
      const result = await submitRequest(form);
      setSuccessMessage(
        `Request submitted successfully! Your request number is: ${result.requestNumber}`
      );
      setForm(emptyState());
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSubmitError("Failed to submit request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setForm(emptyState());
    setErrors({});
    setSuccessMessage(null);
    setSubmitError(null);
    setNewCategory("");
  }

  const receivedTypeOptions = form.receivedVia
    ? (RECEIVED_TYPE_BY_VIA[form.receivedVia] ?? [])
    : [];

  const receivedOrgOptions = form.receivedType
    ? (RECEIVED_ORG_BY_TYPE[form.receivedType] ?? [])
    : [];

  const designationOptions = form.designationType
    ? (DESIGNATION_BY_TYPE[form.designationType] ?? [])
    : [];

  const assigneeOptions = form.designation
    ? (ASSIGNEE_BY_DESIGNATION[form.designation] ?? [])
    : [];

  const isForwarded = form.actionTaken === "Forwarded";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Submit new request form"
    >
      {successMessage && (
        <div
          role="alert"
          aria-live="polite"
          className="mb-6 flex items-start gap-3 rounded-lg border border-green-200
                     bg-green-50 px-4 py-3 text-sm text-green-800 shadow-sm"
        >
          <svg className="mt-0.5 h-5 w-5 shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>{successMessage}</span>
        </div>
      )}

      {submitError && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-6 flex items-start gap-3 rounded-lg border border-red-200
                     bg-red-50 px-4 py-3 text-sm text-red-800 shadow-sm"
        >
          <svg className="mt-0.5 h-5 w-5 shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{submitError}</span>
        </div>
      )}

      <section
        aria-labelledby="section-doc-details"
        className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] shadow-sm overflow-hidden mb-6"
      >
        <div className="bg-[var(--surface-muted)] border-b border-[var(--surface-border)] px-6 py-3">
          <h2
            id="section-doc-details"
            className="text-sm font-semibold uppercase tracking-wider text-[var(--slt-primary)]"
          >
            Document Details
          </h2>
        </div>

        <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          <FieldWrapper
            label="Received via"
            htmlFor="receivedVia"
            required
            error={errors.receivedVia}
          >
            <select
              id="receivedVia"
              value={form.receivedVia}
              onChange={(e) => handleReceivedViaChange(e.target.value)}
              onBlur={() => handleBlur("receivedVia")}
              aria-required="true"
              aria-invalid={!!errors.receivedVia}
              className={`${inputBase} ${errors.receivedVia ? inputError : ""}`}
            >
              {RECEIVED_VIA_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </FieldWrapper>

          <FieldWrapper
            label="Document Reference"
            htmlFor="documentReference"
            required
            error={errors.documentReference}
          >
            <input
              id="documentReference"
              type="text"
              placeholder="reference"
              value={form.documentReference}
              onChange={(e) => setField("documentReference", e.target.value)}
              onBlur={() => handleBlur("documentReference")}
              aria-required="true"
              aria-invalid={!!errors.documentReference}
              className={`${inputBase} ${errors.documentReference ? inputError : ""}`}
            />
          </FieldWrapper>

          <FieldWrapper
            label="Document Subject"
            htmlFor="documentSubject"
            required
            error={errors.documentSubject}
          >
            <input
              id="documentSubject"
              type="text"
              placeholder="Subject"
              value={form.documentSubject}
              onChange={(e) => setField("documentSubject", e.target.value)}
              onBlur={() => handleBlur("documentSubject")}
              aria-required="true"
              aria-invalid={!!errors.documentSubject}
              className={`${inputBase} ${errors.documentSubject ? inputError : ""}`}
            />
          </FieldWrapper>

          <FieldWrapper
            label="Received Type"
            htmlFor="receivedType"
            required
            error={errors.receivedType}
          >
            <select
              id="receivedType"
              value={form.receivedType}
              onChange={(e) => handleReceivedTypeChange(e.target.value)}
              onBlur={() => handleBlur("receivedType")}
              disabled={!form.receivedVia}
              aria-required="true"
              aria-invalid={!!errors.receivedType}
              aria-disabled={!form.receivedVia}
              className={`${inputBase}
                ${errors.receivedType ? inputError : ""}
                ${!form.receivedVia ? inputDisabled : ""}`}
            >
              <option value="">Nothing selected</option>
              {receivedTypeOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </FieldWrapper>

          <FieldWrapper
            label="Received Organization"
            htmlFor="receivedOrganization"
            required
            error={errors.receivedOrganization}
          >
            <select
              id="receivedOrganization"
              value={form.receivedOrganization}
              onChange={(e) => setField("receivedOrganization", e.target.value)}
              onBlur={() => handleBlur("receivedOrganization")}
              disabled={!form.receivedType}
              aria-required="true"
              aria-invalid={!!errors.receivedOrganization}
              aria-disabled={!form.receivedType}
              className={`${inputBase}
                ${errors.receivedOrganization ? inputError : ""}
                ${!form.receivedType ? inputDisabled : ""}`}
            >
              <option value="">Nothing selected</option>
              {receivedOrgOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </FieldWrapper>

          <FieldWrapper label="Received Date" htmlFor="receivedDate">
            <input
              id="receivedDate"
              type="text"
              value={form.receivedDate}
              readOnly
              aria-readonly="true"
              className={`${inputBase} ${inputReadOnly}`}
            />
          </FieldWrapper>

          <FieldWrapper label="Received Time" htmlFor="receivedTime">
            <input
              id="receivedTime"
              type="text"
              value={form.receivedTime}
              readOnly
              aria-readonly="true"
              className={`${inputBase} ${inputReadOnly}`}
            />
          </FieldWrapper>

          <div className="sm:col-span-2 lg:col-span-3">
            <FieldWrapper
              label="Main Category"
              htmlFor="mainCategory"
              required
              error={errors.mainCategory}
            >
              <div className="flex items-center gap-2 flex-wrap">
                <select
                  id="mainCategory"
                  value={form.mainCategory}
                  onChange={(e) => setField("mainCategory", e.target.value)}
                  onBlur={() => handleBlur("mainCategory")}
                  aria-required="true"
                  aria-invalid={!!errors.mainCategory}
                  className={`${inputBase} max-w-xs ${errors.mainCategory ? inputError : ""}`}
                >
                  {MAIN_CATEGORY_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>

                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCategory();
                    }
                  }}
                  placeholder="Add category…"
                  aria-label="New category name"
                  className={`${inputBase} max-w-[180px]`}
                />

                <button
                  type="button"
                  onClick={addCategory}
                  aria-label="Add category"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md
                             bg-[var(--slt-primary)] text-[var(--foreground)] hover:bg-[var(--slt-primary)]/90
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--slt-primary)]
                             transition-colors shrink-0"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </FieldWrapper>

            {form.extraCategories.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2" aria-label="Added categories">
                {form.extraCategories.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1 rounded-full bg-[var(--surface-muted)]
                               text-[var(--slt-primary)] text-xs font-medium px-3 py-1 border border-[var(--surface-border)]"
                  >
                    {cat}
                    <button
                      type="button"
                      onClick={() => removeCategory(cat)}
                      aria-label={`Remove category ${cat}`}
                      className="ml-0.5 rounded-full hover:text-red-600 focus:outline-none
                                 focus-visible:ring-1 focus-visible:ring-red-400 transition-colors"
                    >
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

      <section
        aria-labelledby="section-action"
        className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] shadow-sm overflow-hidden mb-6"
      >
        <div className="bg-[var(--surface-muted)] border-b border-[var(--surface-border)] px-6 py-3">
          <h2
            id="section-action"
            className="text-sm font-semibold uppercase tracking-wider text-[var(--slt-primary)]"
          >
            Action &amp; Assignment
          </h2>
        </div>

        <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          <FieldWrapper
            label="Action taken"
            htmlFor="actionTaken"
            required
            error={errors.actionTaken}
          >
            <select
              id="actionTaken"
              value={form.actionTaken}
              onChange={(e) => handleActionTakenChange(e.target.value)}
              onBlur={() => handleBlur("actionTaken")}
              aria-required="true"
              aria-invalid={!!errors.actionTaken}
              className={`${inputBase} ${errors.actionTaken ? inputError : ""}`}
            >
              {ACTION_TAKEN_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </FieldWrapper>

          <FieldWrapper
            label="Designation Type"
            htmlFor="designationType"
            required={isForwarded}
            error={errors.designationType}
          >
            <select
              id="designationType"
              value={form.designationType}
              onChange={(e) => handleDesignationTypeChange(e.target.value)}
              onBlur={() => handleBlur("designationType")}
              disabled={!isForwarded}
              aria-required={isForwarded}
              aria-invalid={!!errors.designationType}
              aria-disabled={!isForwarded}
              className={`${inputBase}
                ${errors.designationType ? inputError : ""}
                ${!isForwarded ? inputDisabled : ""}`}
            >
              <option value="">Nothing Selected</option>
              {DESIGNATION_TYPE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </FieldWrapper>

          <FieldWrapper
            label="Designation"
            htmlFor="designation"
            required={isForwarded}
            error={errors.designation}
          >
            <select
              id="designation"
              value={form.designation}
              onChange={(e) => handleDesignationChange(e.target.value)}
              onBlur={() => handleBlur("designation")}
              disabled={!form.designationType}
              aria-required={isForwarded}
              aria-invalid={!!errors.designation}
              aria-disabled={!form.designationType}
              className={`${inputBase}
                ${errors.designation ? inputError : ""}
                ${!form.designationType ? inputDisabled : ""}`}
            >
              <option value="">Nothing Selected</option>
              {designationOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </FieldWrapper>

          <FieldWrapper
            label="Assign To"
            htmlFor="assignTo"
            required={isForwarded}
            error={errors.assignTo}
          >
            <select
              id="assignTo"
              value={form.assignTo}
              onChange={(e) => setField("assignTo", e.target.value)}
              onBlur={() => handleBlur("assignTo")}
              disabled={!form.designation}
              aria-required={isForwarded}
              aria-invalid={!!errors.assignTo}
              aria-disabled={!form.designation}
              className={`${inputBase}
                ${errors.assignTo ? inputError : ""}
                ${!form.designation ? inputDisabled : ""}`}
            >
              <option value="">Nothing Selected</option>
              {assigneeOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </FieldWrapper>

          <div className="sm:col-span-2">
            <FieldWrapper
              label="Comments (if any)"
              htmlFor="comments"
              error={errors.comments}
            >
              <textarea
                id="comments"
                rows={4}
                maxLength={MAX_COMMENTS}
                value={form.comments}
                onChange={(e) => setField("comments", e.target.value)}
                placeholder="Enter any additional comments here…"
                aria-describedby="comments-counter"
                className={`${inputBase} resize-y min-h-[100px]`}
              />
              <p
                id="comments-counter"
                className="text-xs text-gray-400 text-right -mt-0.5"
                aria-live="polite"
              >
                {form.comments.length}/{MAX_COMMENTS}
              </p>
            </FieldWrapper>
          </div>

        </div>
      </section>

      <section
        aria-labelledby="section-attachments"
        className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] shadow-sm overflow-hidden mb-6"
      >
        <div className="bg-[var(--surface-muted)] border-b border-[var(--surface-border)] px-6 py-3">
          <h2
            id="section-attachments"
            className="text-sm font-semibold uppercase tracking-wider text-[var(--slt-primary)]"
          >
            Attachments
          </h2>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div className="flex items-center gap-4 flex-wrap">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-md border border-[#1a8fa8]
                         text-[#1a8fa8] text-sm font-medium px-4 py-2
                         hover:bg-[#e8f7fa] focus:outline-none focus-visible:ring-2
                         focus-visible:ring-[#1a8fa8] transition-colors"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              Add Attachment
            </button>

            <p className="text-xs text-gray-400">
              Max 10 MB per file. Accepted: pdf, doc, docx, xls, xlsx, jpg, png
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="sr-only"
            aria-hidden="true"
            tabIndex={-1}
          />

          {errors.attachmentError && (
            <p role="alert" className="text-xs text-red-600">
              {errors.attachmentError}
            </p>
          )}

          <AttachmentTable
            files={form.attachments}
            onRemove={removeAttachment}
          />
        </div>
      </section>

      <div className="flex items-center justify-end gap-3 pt-2 pb-6">
        <button
          type="button"
          onClick={handleReset}
          disabled={isLoading}
          className="rounded-md border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)]
                     text-sm font-medium px-5 py-2.5 hover:bg-[var(--surface-muted)]
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foreground-muted)]
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          Reset
        </button>

        <button
          type="submit"
          disabled={isLoading}
          aria-busy={isLoading}
          className="inline-flex items-center gap-2 rounded-md bg-[var(--slt-primary)] text-white
                     text-sm font-semibold px-6 py-2.5 hover:bg-[var(--slt-primary-hover)]
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foreground-muted)]
                     disabled:opacity-60 disabled:cursor-not-allowed transition-colors
                     shadow-sm cursor-pointer"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12" cy="12" r="10"
                  stroke="currentColor" strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                />
              </svg>
              Submitting…
            </>
          ) : (
            "Submit Request"
          )}
        </button>
      </div>
    </form>
  );
}
