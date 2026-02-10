import React, { useState } from "react";
import { DocumentCard } from "../../components/documents/DocumentCard";
import { DocumentUpload } from "../../components/documents/DocumentUpload";
import { SignaturePad } from "../../components/documents/SignaturePad";
import { Card } from "../../components/ui/Card";
import { DocumentChamber } from "../../types/documents";
import {
  FileText,
  CheckCircle,
  Clock,
  FilePlus,
  LayoutGrid,
  Info,
  Search,
} from "lucide-react";

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
    <div className="max-w-[1600px] mx-auto space-y-8 p-4 md:p-8">
      {/* --- Section 1: Minimal Header & Search --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-2 bg-primary-600 rounded-xl text-white">
              <FileText size={28} />
            </div>
            Document Chamber
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Manage, sign, and archive your legal workspace.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden lg:block">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search vault..."
              className="pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-primary-500 w-64 transition-all"
            />
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button className="p-2 bg-white shadow-sm rounded-lg text-primary-600">
              <LayoutGrid size={18} />
            </button>
            <button className="p-2 text-slate-400">
              <FileText size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* --- Section 2: Split Layout --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* SIDEBAR (Col 4) */}
        <div className="lg:col-span-4 space-y-8">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-5 border-none bg-primary-50">
              <div className="flex justify-between items-start">
                <span className="p-2 bg-primary-600 text-white rounded-lg">
                  <FilePlus size={16} />
                </span>
                <span className="text-2xl font-black text-primary-900">
                  {stats.total}
                </span>
              </div>
              <p className="text-primary-700 text-xs font-bold uppercase tracking-wider mt-4">
                Total Vault
              </p>
            </Card>
            <Card className="p-5 border-none bg-green-50">
              <div className="flex justify-between items-start">
                <span className="p-2 bg-green-600 text-white rounded-lg">
                  <CheckCircle size={16} />
                </span>
                <span className="text-2xl font-black text-green-900">
                  {stats.signed}
                </span>
              </div>
              <p className="text-green-700 text-xs font-bold uppercase tracking-wider mt-4">
                Signed
              </p>
            </Card>
            <Card className="p-5 border-none bg-yellow-50">
              <div className="flex justify-between items-start">
                <span className="p-2 bg-yellow-600 text-white rounded-lg">
                  <Clock size={16} />
                </span>
                <span className="text-2xl font-black text-yellow-900">
                  {stats.inReview}
                </span>
              </div>
              <p className="text-yellow-700 text-xs font-bold uppercase tracking-wider mt-4">
                Review
              </p>
            </Card>
            <Card className="p-5 border-none bg-blue-50">
              <div className="flex justify-between items-start">
                <span className="p-2 bg-blue-600 text-white rounded-lg">
                  <FileText size={16} />
                </span>
                <span className="text-2xl font-black text-blue-900">
                  {stats.draft}
                </span>
              </div>
              <p className="text-blue-700 text-xs font-bold uppercase tracking-wider mt-4">
                Drafts
              </p>
            </Card>
          </div>

          {/* Upload Widget - Embedded */}
          <div className="sticky top-8">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
              Ingestion
            </h3>
            <DocumentUpload
              onFileSelect={handleFileSelect}
              onUpload={handleUpload}
            />

            <Card className="mt-6 p-4 bg-slate-900 text-white border-none shadow-2xl relative overflow-hidden">
              <Info
                className="absolute -right-2 -bottom-2 text-white/10"
                size={100}
              />
              <div className="relative z-10">
                <p className="text-xs font-bold text-primary-400 uppercase">
                  Security Note
                </p>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  All documents in the chamber are encrypted using AES-256
                  standards. Signatures are legally binding.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* MAIN REPOSITORY (Col 8) */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 min-h-[600px]">
            <div className="flex items-center justify-between mb-8 border-b border-slate-50 pb-6">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                Recent Files
                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full">
                  {documents.length}
                </span>
              </h2>
              <button className="text-sm font-bold text-primary-600 hover:underline">
                Manage All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            {documents.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-slate-400">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <FileText size={40} className="opacity-20" />
                </div>
                <p className="font-medium text-lg text-slate-500">
                  The vault is currently empty
                </p>
                <p className="text-sm">
                  Drag files to the upload zone to begin.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- Modals --- */}
      {showSignaturePad && selectedDocument && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
          <Card className="w-full max-w-2xl border-none shadow-2xl overflow-hidden rounded-3xl">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-black text-slate-900">
                    Sign Document
                  </h2>
                  <p className="text-slate-500 font-medium">
                    Validating:{" "}
                    <span className="text-primary-600">
                      {selectedDocument.name}
                    </span>
                  </p>
                </div>
              </div>
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

      {selectedDocument && !showSignaturePad && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in zoom-in-95 duration-200">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden border-none shadow-2xl rounded-3xl flex flex-col">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-100 rounded-xl text-slate-600">
                  <FileText size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {selectedDocument.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedDocument(null)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"
              >
                ✕
              </button>
            </div>

            <div className="p-8 overflow-y-auto bg-slate-50 flex-1">
              <div className="bg-white border-2 border-dashed border-slate-200 p-12 rounded-2xl text-center text-slate-400">
                <FileText size={64} className="mx-auto mb-6 opacity-10" />
                <p className="text-lg font-bold text-slate-500">
                  Preview Restricted
                </p>
                <p className="text-sm mt-1 mb-4">
                  Full document render is only available via secure download.
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-xs font-bold uppercase tracking-wider">
                  Status: {selectedDocument.status}
                </div>

                {selectedDocument.signatories &&
                  selectedDocument.signatories.length > 0 && (
                    <div className="mt-8 text-left bg-primary-50 p-5 rounded-2xl border border-primary-100">
                      <p className="font-black text-primary-900 text-xs uppercase tracking-widest mb-4">
                        Certified Signatories
                      </p>
                      <div className="space-y-3">
                        {selectedDocument.signatories.map((sig, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="font-bold text-primary-800 flex items-center gap-2">
                              <CheckCircle size={14} /> {sig.signerName}
                            </span>
                            <span className="text-primary-600/60 text-xs">
                              {new Date(sig.signedAt).toLocaleDateString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>

            <div className="p-6 bg-white border-t border-slate-100 flex gap-4">
              <button
                onClick={() => setSelectedDocument(null)}
                className="flex-1 px-6 py-4 font-bold text-slate-500 rounded-2xl hover:bg-slate-50 transition-all"
              >
                Close Preview
              </button>
              {selectedDocument.status !== "signed" && (
                <button
                  onClick={() => handleSignDocument(selectedDocument)}
                  className="flex-[2] px-6 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-lg shadow-slate-200 hover:bg-black transition-all active:scale-95"
                >
                  Sign This Document
                </button>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
