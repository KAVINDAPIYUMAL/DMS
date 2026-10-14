"use client";

import type { AttachmentFile } from "@/types/request";

interface AttachmentTableProps {
  files: AttachmentFile[];
  onRemove: (id: number) => void;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function AttachmentTable({ files, onRemove }: AttachmentTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--surface-border)]">
      <table className="w-full text-sm text-left" aria-label="Attached files">
        <thead className="bg-[var(--surface-muted)] text-[var(--foreground)] font-semibold border-b border-[var(--surface-border)]">
          <tr>
            <th scope="col" className="px-4 py-3 w-16">Count</th>
            <th scope="col" className="px-4 py-3">Title</th>
            <th scope="col" className="px-4 py-3 w-32">Size</th>
            <th scope="col" className="px-4 py-3 w-24 text-center">Attach</th>
          </tr>
        </thead>
        <tbody>
          {files.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="px-4 py-8 text-center text-[var(--foreground)] italic"
              >
                No attachments added yet.
              </td>
            </tr>
          ) : (
            files.map((file, index) => (
              <tr
                key={file.id}
                className="border-t border-[var(--surface-border)] hover:bg-[var(--surface-muted)] transition-colors"
              >
                <td className="px-4 py-3 text-[var(--foreground)]">{index + 1}</td>

                <td className="px-4 py-3 text-[var(--foreground)] break-all">{file.name}</td>

                <td className="px-4 py-3 text-[var(--foreground)]">{formatSize(file.size)}</td>

                <td className="px-4 py-3 text-center">
                  <button
                    type="button"
                    onClick={() => onRemove(file.id)}
                    aria-label={`Remove ${file.name}`}
                    className="inline-flex items-center justify-center w-7 h-7 rounded-full text-[var(--foreground-muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foreground-muted)] transition-colors"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
