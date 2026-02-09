import React, { useState } from "react";
import { DocumentCard } from "../../components/documents/DocumentCard";
import { DocumentUpload } from "../../components/documents/DocumentUpload";
import { SignaturePad } from "../../components/documents/SignaturePad";
import { Card } from "../../components/ui/Card";
import { DocumentChamber } from "../../types/documents";
import { FileText } from "lucide-react";

export const DocumentChamberPage: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentChamber[]>([
    {
      id: "doc-1",
      name: "Term Sheet.pdf",
      type: "pdf",
      size: "2.3 MB",
      lastModified: "2 days ago",
      shared: true,
      url: "#",
      ownerId: "user-1",
      status: "signed",
      uploadedBy: "You",
      uploadedAt: new Date(Date.now() - 172800000).toISOString(),
      signatories: [
        {
          id: "sig-1",
          documentId: "doc-1",
          signerName: "John Investor",
          signatureData: "",
          signedAt: new Date(Date.now() - 86400000).toISOString(),
          signerEmail: "john@investor.com",
        },
      ],
    },
    {
      id: "doc-2",
      name: "Investment Agreement.pdf",
      type: "pdf",
      size: "3.1 MB",
      lastModified: "1 day ago",
      shared: true,
      url: "#",
      ownerId: "user-1",
      status: "in-review",
      uploadedBy: "You",
      uploadedAt: new Date(Date.now() - 86400000).toISOString(),
      signatories: [],
    },
    {
      id: "doc-3",
      name: "Privacy Policy.docx",
      type: "docx",
      size: "0.5 MB",
      lastModified: "1 week ago",
      shared: false,
      url: "#",
      ownerId: "user-1",
      status: "draft",
      uploadedBy: "You",
      uploadedAt: new Date(Date.now() - 604800000).toISOString(),
      signatories: [],
    },
  ]);

  const [selectedDocument, setSelectedDocument] =
    useState<DocumentChamber | null>(null);
  const [showSignaturePad, setShowSignaturePad] = useState(false);

  const handleFileSelect = (file: File) => {
    console.log("File selected:", file.name);
  };

  const handleUpload = (files: File[]) => {
    const newDocs: DocumentChamber[] = files.map((file) => ({
      id: "doc-" + Date.now(),
      name: file.name,
      type: file.type,
      size: (file.size / 1024 / 1024).toFixed(2) + " MB",
      lastModified: "Just now",
      shared: false,
      url: "#",
      ownerId: "user-1",
      status: "draft" as const,
      uploadedBy: "You",
      uploadedAt: new Date().toISOString(),
      signatories: [],
    }));
    setDocuments([...documents, ...newDocs]);
  };

  const handleSignDocument = (doc: DocumentChamber) => {
    setSelectedDocument(doc);
    setShowSignaturePad(true);
  };

  const handleSignatureComplete = (signatureData: string) => {
    if (selectedDocument) {
      const updatedDocs = documents.map((doc) =>
        doc.id === selectedDocument.id
          ? {
              ...doc,
              status: "in-review" as const,
              signatories: [
                ...(doc.signatories || []),
                {
                  id: "sig-" + Date.now(),
                  documentId: doc.id,
                  signerName: "You",
                  signatureData,
                  signedAt: new Date().toISOString(),
                  signerEmail: "your-email@example.com",
                },
              ],
            }
          : doc,
      );
      setDocuments(updatedDocs);
      setShowSignaturePad(false);
      setSelectedDocument(null);
    }
  };

  const handleDeleteDocument = (docId: string) => {
    setDocuments(documents.filter((doc) => doc.id !== docId));
  };

  const handleDownloadDocument = (docId: string) => {
    console.log("Downloading document:", docId);
  };

  const stats = {
    total: documents.length,
    signed: documents.filter((d) => d.status === "signed").length,
    inReview: documents.filter((d) => d.status === "in-review").length,
    draft: documents.filter((d) => d.status === "draft").length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg p-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <FileText size={32} />
          <h1 className="text-3xl font-bold">Document Chamber</h1>
        </div>
        <p className="text-primary-100">
          Upload, manage, and sign deal documents
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-primary-600">
            {stats.total}
          </div>
          <p className="text-gray-600 text-sm mt-1">Total Documents</p>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-green-600">
            {stats.signed}
          </div>
          <p className="text-gray-600 text-sm mt-1">Signed</p>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-yellow-600">
            {stats.inReview}
          </div>
          <p className="text-gray-600 text-sm mt-1">In Review</p>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-blue-600">{stats.draft}</div>
          <p className="text-gray-600 text-sm mt-1">Draft</p>
        </Card>
      </div>

      {/* Upload Section */}
      <DocumentUpload onFileSelect={handleFileSelect} onUpload={handleUpload} />

      {/* Documents Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FileText size={24} />
          Documents
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onView={() => setSelectedDocument(doc)}
              onSign={handleSignDocument}
              onDelete={handleDeleteDocument}
              onDownload={handleDownloadDocument}
            />
          ))}
        </div>
      </div>

      {/* Signature Modal */}
      {showSignaturePad && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Sign Document
              </h2>
              <p className="text-gray-600 mb-6">
                Document:{" "}
                <span className="font-semibold">{selectedDocument.name}</span>
              </p>
              <SignaturePad
                signerName="Your Name"
                onSave={handleSignatureComplete}
                onCancel={() => {
                  setShowSignaturePad(false);
                  setSelectedDocument(null);
                }}
              />
            </div>
          </Card>
        </div>
      )}

      {/* Document Preview Modal */}
      {selectedDocument && !showSignaturePad && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-96 overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedDocument.name}
                </h2>
                <button
                  onClick={() => setSelectedDocument(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>
              <div className="bg-gray-100 p-8 rounded text-center text-gray-600">
                <FileText size={48} className="mx-auto mb-4 text-gray-400" />
                <p>Document preview not available in demo</p>
                <p className="text-sm mt-2">
                  Status: {selectedDocument.status}
                </p>
                {selectedDocument.signatories &&
                  selectedDocument.signatories.length > 0 && (
                    <div className="mt-4 text-left">
                      <p className="font-semibold mb-2">Signed by:</p>
                      {selectedDocument.signatories.map((sig, idx) => (
                        <p key={idx} className="text-sm">
                          • {sig.signerName} -{" "}
                          {new Date(sig.signedAt).toLocaleDateString()}
                        </p>
                      ))}
                    </div>
                  )}
              </div>
              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => setSelectedDocument(null)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                >
                  Close
                </button>
                {selectedDocument.status !== "signed" && (
                  <button
                    onClick={() => handleSignDocument(selectedDocument)}
                    className="flex-1 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition"
                  >
                    Sign This Document
                  </button>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
