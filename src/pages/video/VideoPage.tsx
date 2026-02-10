import React from "react";
import { VideoCallComponent } from "../../components/video/VideoCallComponent";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import {
  Phone,
  Video,
  History,
  Info,
  Settings2,
  MoreVertical,
  Users,
} from "lucide-react";

interface VideoPageProps {
  onEndCall?: () => void;
}

export const VideoPage: React.FC<VideoPageProps> = ({ onEndCall }) => {
  const [inCall, setInCall] = React.useState(false);
  const [selectedParticipant, setSelectedParticipant] = React.useState<
    string | null
  >(null);

  const participants = [
    {
      id: "user-1",
      name: "John Investor",
      status: "available",
      role: "Venture Partner",
    },
    {
      id: "user-2",
      name: "Sarah Entrepreneur",
      status: "available",
      role: "CEO @ TechFlow",
    },
    {
      id: "user-3",
      name: "Mike Developer",
      status: "busy",
      role: "Lead Engineer",
    },
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
      <div className="h-screen flex flex-col bg-gray-950">
        <VideoCallComponent
          participantName={selectedParticipant}
          onEndCall={handleEndCall}
        />
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto p-6 lg:p-10 space-y-8 bg-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary-50 text-primary-600 rounded-2xl">
            <Video size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Calls & Meetings
            </h1>
            <p className="text-gray-500 font-medium">
              Connect with your network instantly
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl border-gray-200">
            <Settings2 size={18} className="mr-2" />
            Audio Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Contacts */}
        <div className="col-span-12 xl:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">
              Available Contacts
            </h2>
            <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded">
              {participants.filter((p) => p.status === "available").length}{" "}
              Online
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-100 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-tr from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-gray-600 font-bold text-2xl group-hover:scale-105 transition-transform">
                      {participant.name.charAt(0)}
                    </div>
                    <div
                      className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-white ${
                        participant.status === "available"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    />
                  </div>
                  <button className="text-gray-300 hover:text-gray-600">
                    <MoreVertical size={20} />
                  </button>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 text-lg">
                    {participant.name}
                  </h3>
                  <p className="text-sm text-gray-500">{participant.role}</p>
                </div>

                <Button
                  onClick={() => handleStartCall(participant.name)}
                  variant={
                    participant.status === "available" ? "primary" : "secondary"
                  }
                  className="w-full rounded-xl py-6 font-bold"
                  disabled={participant.status === "busy"}
                >
                  <Phone size={18} className="mr-2" />
                  {participant.status === "available"
                    ? "Start Call"
                    : "Line Busy"}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-12 xl:col-span-4 space-y-6">
          <Card className="p-0 border-gray-100 shadow-xl rounded-2xl overflow-hidden">
            <div className="p-5 border-b flex items-center gap-2 bg-gray-50/50">
              <History size={18} className="text-gray-400" />
              <h2 className="font-bold text-gray-800">Recent Activity</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {[
                { name: "John Investor", date: "2 days ago", duration: "23m" },
                { name: "Sarah Entrepreneur", date: "1w ago", duration: "45m" },
                { name: "Mike Developer", date: "2w ago", duration: "15m" },
              ].map((call, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-xs">
                      {call.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">
                        {call.name}
                      </p>
                      <p className="text-xs text-gray-400">{call.date}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-gray-400">
                    {call.duration}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <div className="bg-primary-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Info size={20} className="text-primary-300" />
                <h2 className="font-bold">Pro Tips</h2>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm text-primary-100">
                  <span className="text-primary-400 font-bold">01</span>
                  Check microphone levels before a pitch.
                </li>
                <li className="flex gap-3 text-sm text-primary-100">
                  <span className="text-primary-400 font-bold">02</span>
                  Good lighting improves engagement.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
