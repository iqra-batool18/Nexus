import React from "react";
import { DocumentChamber } from "../../types/documents";
import { Badge } from "../ui/Badge";
import { FileText, Download, Eye, Trash2, Pen } from "lucide-react";

interface DocumentCardProps {
  document: DocumentChamber;
  onView?: (doc: DocumentChamber) => void;
  onSign?: (doc: DocumentChamber) => void;
  onDelete?: (docId: string) => void;
  onDownload?: (docId: string) => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  onView,
  onSign,
  onDelete,
  onDownload,
}) => {
  const canSign = document.status !== "signed";

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary-500 hover:shadow-lg transition">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="p-3 bg-blue-100 rounded">
            <FileText size={24} className="text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">{document.name}</h3>
            <p className="text-sm text-gray-600">
              {document.size} • {document.lastModified}
            </p>
          </div>
        </div>
        <Badge
          variant={
            document.status === "signed"
              ? "success"
              : document.status === "in-review"
                ? "warning"
                : "primary"
          }
        >
          {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
        </Badge>
      </div>

      {document.signatories && document.signatories.length > 0 && (
        <div className="mb-4 p-3 bg-gray-50 rounded">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Signatures ({document.signatories.length}):
          </p>
          <div className="space-y-1">
            {document.signatories.map((sig, idx) => (
              <p key={idx} className="text-sm text-gray-600">
                ✓ {sig.signerName} -{" "}
                {new Date(sig.signedAt).toLocaleDateString()}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => onView?.(document)}
          className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition text-sm font-medium flex items-center justify-center gap-2"
        >
          <Eye size={16} />
          View
        </button>
        <button
          onClick={() => onDownload?.(document.id)}
          className="flex-1 px-3 py-2 bg-gray-50 text-gray-700 rounded hover:bg-gray-100 transition text-sm font-medium flex items-center justify-center gap-2"
        >
          <Download size={16} />
          Download
        </button>
        {canSign && (
          <button
            onClick={() => onSign?.(document)}
            className="flex-1 px-3 py-2 bg-green-50 text-green-600 rounded hover:bg-green-100 transition text-sm font-medium flex items-center justify-center gap-2"
          >
            <Pen size={16} />
            Sign
          </button>
        )}
        <button
          onClick={() => onDelete?.(document.id)}
          className="px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};
