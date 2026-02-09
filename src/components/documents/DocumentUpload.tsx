import React from "react";
import { Upload, File } from "lucide-react";
import { Card } from "../ui/Card";

interface DocumentUploadProps {
  onFileSelect?: (file: File) => void;
  onUpload?: (files: File[]) => void;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  onFileSelect,
  onUpload,
}) => {
  const [dragActive, setDragActive] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    const documentFiles = files.filter(
      (f) =>
        ["application/pdf", "application/msword", "text/plain"].includes(
          f.type,
        ) ||
        f.name.endsWith(".pdf") ||
        f.name.endsWith(".doc") ||
        f.name.endsWith(".docx"),
    );

    setSelectedFiles([...selectedFiles, ...documentFiles]);
    documentFiles.forEach((f) => onFileSelect?.(f));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles([...selectedFiles, ...files]);
    files.forEach((f) => onFileSelect?.(f));
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      onUpload?.(selectedFiles);
      setSelectedFiles([]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Upload Documents
      </h3>

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
          dragActive
            ? "border-primary-500 bg-primary-50"
            : "border-gray-300 bg-gray-50 hover:bg-gray-100"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          onChange={handleChange}
          accept=".pdf,.doc,.docx,.txt"
          className="hidden"
        />
        <Upload size={32} className="mx-auto text-primary-600 mb-2" />
        <p className="text-gray-700 font-medium mb-1">
          Drag documents here or click to select
        </p>
        <p className="text-sm text-gray-600">Supported: PDF, DOC, DOCX, TXT</p>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium text-gray-800 mb-3">
            Selected Files ({selectedFiles.length})
          </h4>
          <div className="space-y-2 mb-4">
            {selectedFiles.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200"
              >
                <div className="flex items-center gap-2">
                  <File size={18} className="text-gray-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(idx)}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={handleUpload}
            className="w-full px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition font-medium"
          >
            Upload Files
          </button>
        </div>
      )}
    </Card>
  );
};
