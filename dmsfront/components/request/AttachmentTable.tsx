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
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm text-left" aria-label="Attached files">
        <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
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
                className="px-4 py-8 text-center text-gray-400 italic"
              >
                No attachments added yet.
              </td>
            </tr>
          ) : (
            files.map((file, index) => (
              <tr
                key={file.id}
                className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 text-gray-500">{index + 1}</td>

                <td className="px-4 py-3 text-gray-800 break-all">{file.name}</td>

                <td className="px-4 py-3 text-gray-600">{formatSize(file.size)}</td>

                <td className="px-4 py-3 text-center">
                  <button
                    type="button"
                    onClick={() => onRemove(file.id)}
                    aria-label={`Remove ${file.name}`}
                    className="inline-flex items-center justify-center w-7 h-7 rounded-full
                               text-red-500 hover:bg-red-50 hover:text-red-700
                               focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400
                               transition-colors"
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
