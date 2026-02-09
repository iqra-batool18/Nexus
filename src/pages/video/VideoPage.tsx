import React from "react";
import { VideoCallComponent } from "../../components/video/VideoCallComponent";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Phone } from "lucide-react";

interface VideoPageProps {
  onEndCall?: () => void;
}

export const VideoPage: React.FC<VideoPageProps> = ({ onEndCall }) => {
  const [inCall, setInCall] = React.useState(false);
  const [selectedParticipant, setSelectedParticipant] = React.useState<
    string | null
  >(null);

  const participants = [
    { id: "user-1", name: "John Investor", status: "available" },
    { id: "user-2", name: "Sarah Entrepreneur", status: "available" },
    { id: "user-3", name: "Mike Developer", status: "busy" },
  ];

  const handleStartCall = (participantName: string) => {
    setSelectedParticipant(participantName);
    setInCall(true);
  };

  const handleEndCall = () => {
    setInCall(false);
    setSelectedParticipant(null);
    onEndCall?.();
  };

  if (inCall && selectedParticipant) {
    return (
      <div className="h-screen flex flex-col">
        <VideoCallComponent
          participantName={selectedParticipant}
          onEndCall={handleEndCall}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg p-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Phone size={32} />
          <h1 className="text-3xl font-bold">Video Calling</h1>
        </div>
        <p className="text-primary-100">
          Start a video call with other members
        </p>
      </div>

      {/* Quick Call */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Start a Call</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {participants.map((participant) => (
            <div
              key={participant.id}
              className="bg-gray-50 rounded-lg p-6 border border-gray-200"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {participant.name.charAt(0)}
                </div>
              </div>
              <h3 className="text-center font-semibold text-gray-800 mb-2">
                {participant.name}
              </h3>
              <div className="text-center mb-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    participant.status === "available"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {participant.status === "available"
                    ? "● Available"
                    : "● Busy"}
                </span>
              </div>
              <Button
                onClick={() => handleStartCall(participant.name)}
                variant="primary"
                className="w-full"
                disabled={participant.status === "busy"}
              >
                {participant.status === "available" ? "Call" : "Call (Busy)"}
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Calls */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Calls</h2>
        <div className="space-y-3">
          {[
            { name: "John Investor", date: "2 days ago", duration: "23 min" },
            {
              name: "Sarah Entrepreneur",
              date: "1 week ago",
              duration: "45 min",
            },
            { name: "Mike Developer", date: "2 weeks ago", duration: "15 min" },
          ].map((call, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 bg-gray-50 rounded border border-gray-200"
            >
              <div>
                <p className="font-semibold text-gray-800">{call.name}</p>
                <p className="text-sm text-gray-600">{call.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">{call.duration}</span>
                <button className="p-2 hover:bg-gray-200 rounded-full transition">
                  <Phone size={20} className="text-primary-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Tips Section */}
      <Card className="p-6 bg-blue-50 border border-blue-200">
        <h2 className="text-lg font-bold text-blue-900 mb-3">
          💡 Video Call Tips
        </h2>
        <ul className="space-y-2 text-blue-900">
          <li>✓ Ensure good lighting and clear audio</li>
          <li>✓ Check your camera and microphone before starting</li>
          <li>✓ Use screen sharing to collaborate better</li>
          <li>✓ End the call gracefully</li>
        </ul>
      </Card>
    </div>
  );
};
