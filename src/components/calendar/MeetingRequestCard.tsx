import React from "react";
import { MeetingRequest } from "../../types/calendar";
import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Badge } from "../ui/Badge";

interface MeetingRequestCardProps {
  request: MeetingRequest;
  initiatorName: string;
  onAccept?: (requestId: string) => void;
  onDecline?: (requestId: string) => void;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "accepted":
      return <CheckCircle className="text-green-600" size={20} />;
    case "declined":
      return <XCircle className="text-red-600" size={20} />;
    default:
      return <AlertCircle className="text-yellow-600" size={20} />;
  }
};

export const MeetingRequestCard: React.FC<MeetingRequestCardProps> = ({
  request,
  initiatorName,
  onAccept,
  onDecline,
}) => {
  const proposedDate = new Date(request.proposedTime);
  const isPending = request.status === "pending";

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-primary-500">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold text-gray-800">
              Meeting Request from {initiatorName}
            </h4>
            <Badge
              variant={
                request.status === "pending"
                  ? "warning"
                  : request.status === "accepted"
                    ? "success"
                    : "error"
              }
            >
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </Badge>
          </div>
          <p className="text-gray-600 text-sm mb-2">{request.reason}</p>
        </div>
        {getStatusIcon(request.status)}
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
        <Clock size={16} />
        <span>
          {proposedDate.toLocaleDateString()} at{" "}
          {proposedDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        <span className="text-gray-500">• {request.duration} minutes</span>
      </div>

      {isPending && (
        <div className="flex gap-2">
          <button
            onClick={() => onAccept?.(request.id)}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition font-medium text-sm"
          >
            Accept
          </button>
          <button
            onClick={() => onDecline?.(request.id)}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-medium text-sm"
          >
            Decline
          </button>
        </div>
      )}
    </div>
  );
};
