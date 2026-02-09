import React, { useRef } from "react";
import { Trash2, Check } from "lucide-react";

interface SignaturePadProps {
  signerName: string;
  onSave?: (signatureData: string) => void;
  onCancel?: () => void;
  readonly?: boolean;
  existingSignature?: string;
}

export const SignaturePad: React.FC<SignaturePadProps> = ({
  signerName,
  onSave,
  onCancel,
  readonly = false,
  existingSignature,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = React.useState(false);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && existingSignature && readonly) {
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        ctx?.drawImage(img, 0, 0);
      };
      img.src = existingSignature;
    }
  }, [existingSignature, readonly]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (readonly) return;
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx?.beginPath();
    ctx?.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || readonly) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx?.lineTo(x, y);
    ctx?.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (canvas && onSave) {
      onSave(canvas.toDataURL());
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-300 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Signature Pad
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Signer: <span className="font-medium">{signerName}</span>
      </p>

      <div className="border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-50 mb-4">
        <canvas
          ref={canvasRef}
          width={500}
          height={150}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className={`w-full bg-white cursor-${readonly ? "default" : "crosshair"}`}
        />
      </div>

      {!readonly && (
        <div className="flex gap-2">
          <button
            onClick={clearSignature}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition flex items-center justify-center gap-2"
          >
            <Trash2 size={18} />
            Clear
          </button>
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={saveSignature}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition flex items-center justify-center gap-2"
          >
            <Check size={18} />
            Sign
          </button>
        </div>
      )}
    </div>
  );
};
