import React, { useEffect, useRef, useState } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Phone,
  Share2,
  Copy,
  Users,
} from "lucide-react";

interface VideoCallProps {
  participantName: string;
  onEndCall?: () => void;
  roomId?: string;
}

export const VideoCallComponent: React.FC<VideoCallProps> = ({
  participantName,
  onEndCall,
  roomId = "room-" + Math.random().toString(36).substr(2, 9),
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [showParticipants, setShowParticipants] = useState(false);
  const [copied, setCopied] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Simulate getting video stream (in real app, would use getUserMedia)
    initializeVideoStreams();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const initializeVideoStreams = async () => {
    try {
      // In a real application, this would use getUserMedia
      // For demo purposes, we'll just show placeholder divs
      console.log("Video streams initialized (mock)");
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return [hours, minutes, secs]
      .map((val) => String(val).padStart(2, "0"))
      .join(":");
  };

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        // In real app: const stream = await navigator.mediaDevices.getDisplayMedia();
        setIsScreenSharing(true);
      } else {
        setIsScreenSharing(false);
      }
    } catch (error) {
      console.error("Screen sharing error:", error);
    }
  };

  return (
    <div className="bg-black rounded-lg overflow-hidden">
      {/* Main Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-black min-h-screen">
        {/* Local Video */}
        <div className="relative bg-gray-900 rounded-lg overflow-hidden h-64 md:h-full">
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
            <video
              ref={localVideoRef}
              className="w-full h-full object-cover"
              autoPlay
              muted
              playsInline
            />
            {isVideoOff && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
                <div className="text-center">
                  <VideoOff size={48} className="text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400">Camera Off</p>
                </div>
              </div>
            )}
          </div>
          <div className="absolute bottom-4 left-4 bg-gray-900 bg-opacity-75 px-3 py-2 rounded">
            <p className="text-white text-sm font-medium">You</p>
          </div>
        </div>

        {/* Remote Video */}
        <div className="relative bg-gray-900 rounded-lg overflow-hidden h-64 md:h-full">
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-900 to-primary-800">
            <video
              ref={remoteVideoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
            />
            {isScreenSharing && (
              <div className="absolute inset-0 bg-gradient-to-b from-secondary-400 to-secondary-600 flex items-center justify-center opacity-90">
                <div className="text-center text-white">
                  <Share2 size={48} className="mx-auto mb-2" />
                  <p className="font-medium">Screen Being Shared</p>
                </div>
              </div>
            )}
          </div>
          <div className="absolute bottom-4 left-4 bg-gray-900 bg-opacity-75 px-3 py-2 rounded">
            <p className="text-white text-sm font-medium">{participantName}</p>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-gray-900 border-t border-gray-700 px-4 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          {/* Left: Duration */}
          <div className="text-white font-medium text-lg">
            {formatDuration(callDuration)}
          </div>

          {/* Center: Controls */}
          <div className="flex items-center gap-3">
            {/* Mute/Unmute */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-3 rounded-full transition ${
                isMuted
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <MicOff size={24} className="text-white" />
              ) : (
                <Mic size={24} className="text-white" />
              )}
            </button>

            {/* Video On/Off */}
            <button
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`p-3 rounded-full transition ${
                isVideoOff
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              title={isVideoOff ? "Turn on camera" : "Turn off camera"}
            >
              {isVideoOff ? (
                <VideoOff size={24} className="text-white" />
              ) : (
                <Video size={24} className="text-white" />
              )}
            </button>

            {/* Screen Share */}
            <button
              onClick={toggleScreenShare}
              className={`p-3 rounded-full transition ${
                isScreenSharing
                  ? "bg-secondary-600 hover:bg-secondary-700"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              title="Share screen"
            >
              <Share2 size={24} className="text-white" />
            </button>

            {/* Participants */}
            <button
              onClick={() => setShowParticipants(!showParticipants)}
              className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition"
              title="Show participants"
            >
              <Users size={24} className="text-white" />
            </button>

            {/* End Call */}
            <button
              onClick={onEndCall}
              className="p-3 rounded-full bg-red-600 hover:bg-red-700 transition ml-4"
              title="End call"
            >
              <Phone size={24} className="text-white" />
            </button>
          </div>

          {/* Right: Room ID */}
          <div className="hidden lg:flex items-center gap-2 text-white">
            <span className="text-sm">Room: {roomId}</span>
            <button
              onClick={handleCopyRoomId}
              className="p-2 hover:bg-gray-700 rounded transition"
            >
              {copied ? "✓" : <Copy size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Participants Panel */}
      {showParticipants && (
        <div className="bg-gray-800 border-t border-gray-700 px-4 py-4">
          <h3 className="text-white font-semibold mb-3">Participants (2)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-700 p-3 rounded">
              <p className="text-white text-sm font-medium">You</p>
              <p className="text-gray-300 text-xs">Connected</p>
            </div>
            <div className="bg-gray-700 p-3 rounded">
              <p className="text-white text-sm font-medium">
                {participantName}
              </p>
              <p className="text-gray-300 text-xs">Connected</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
