import React, { useState } from "react";
import { CalendarComponent } from "../../components/calendar/CalendarComponent";
import { AvailabilityManager } from "../../components/calendar/AvailabilityManager";
import { MeetingRequestCard } from "../../components/calendar/MeetingRequestCard";
import {
  mockMeetings,
  mockAvailabilitySlots,
  mockMeetingRequests,
} from "../../data/meetings";
import {
  Meeting,
  AvailabilitySlot,
  MeetingRequest,
} from "../../types/calendar";
import { Card } from "../../components/ui/Card";
import { Calendar, Clock, Users } from "lucide-react";

export const CalendarPage: React.FC = () => {
  const [meetings] = useState<Meeting[]>(mockMeetings);
  const [availabilitySlots, setAvailabilitySlots] = useState<
    AvailabilitySlot[]
  >(mockAvailabilitySlots);
  const [meetingRequests, setMeetingRequests] =
    useState<MeetingRequest[]>(mockMeetingRequests);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  const handleAddAvailability = (slot: Omit<AvailabilitySlot, "id">) => {
    const newSlot: AvailabilitySlot = {
      ...slot,
      id: `avail-${Date.now()}`,
      userId: "current-user", // In real app, from context
    };
    setAvailabilitySlots([...availabilitySlots, newSlot]);
  };

  const handleDeleteAvailability = (slotId: string) => {
    setAvailabilitySlots(availabilitySlots.filter((s) => s.id !== slotId));
  };

  const handleAcceptRequest = (requestId: string) => {
    setMeetingRequests(
      meetingRequests.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status: "accepted" as const,
              respondedAt: new Date().toISOString(),
            }
          : req,
      ),
    );
    // In real app, would create a meeting from the request
  };

  const handleDeclineRequest = (requestId: string) => {
    setMeetingRequests(
      meetingRequests.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status: "declined" as const,
              respondedAt: new Date().toISOString(),
            }
          : req,
      ),
    );
  };

  const pendingRequests = meetingRequests.filter((r) => r.status === "pending");
  const upcomingMeetings = meetings.filter((m) => m.status === "scheduled");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg p-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Calendar size={32} />
          <h1 className="text-3xl font-bold">Meeting & Calendar</h1>
        </div>
        <p className="text-primary-100">
          Manage your availability and schedule meetings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Calendar */}
        <div className="lg:col-span-2 space-y-6">
          {/* Calendar Component */}
          <CalendarComponent
            meetings={meetings}
            onMeetingClick={setSelectedMeeting}
          />

          {/* Upcoming Meetings */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Users size={24} />
              Upcoming Meetings ({upcomingMeetings.length})
            </h2>
            <div className="space-y-3">
              {upcomingMeetings.length === 0 ? (
                <p className="text-gray-500">No upcoming meetings</p>
              ) : (
                upcomingMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded border-l-4 border-primary-500 cursor-pointer hover:shadow-md transition"
                    onClick={() => setSelectedMeeting(meeting)}
                  >
                    <h3 className="font-semibold text-gray-800">
                      {meeting.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {meeting.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-700">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {new Date(meeting.startTime).toLocaleString()}
                      </span>
                      <span className="bg-primary-200 text-primary-800 px-2 py-1 rounded text-xs font-medium">
                        {meeting.meetingType.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Meeting Requests */}
          <Card className="p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Meeting Requests ({pendingRequests.length})
            </h2>
            <div className="space-y-3">
              {pendingRequests.length === 0 ? (
                <p className="text-gray-500 text-sm">No pending requests</p>
              ) : (
                pendingRequests.map((request) => (
                  <MeetingRequestCard
                    key={request.id}
                    request={request}
                    initiatorName="John Investor"
                    onAccept={handleAcceptRequest}
                    onDecline={handleDeclineRequest}
                  />
                ))
              )}
            </div>
          </Card>

          {/* Availability Manager */}
          <AvailabilityManager
            slots={availabilitySlots}
            onAdd={handleAddAvailability}
            onDelete={handleDeleteAvailability}
            editable={true}
          />
        </div>
      </div>

      {/* Selected Meeting Details Modal */}
      {selectedMeeting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md p-6">
            <button
              onClick={() => setSelectedMeeting(null)}
              className="float-right text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedMeeting.title}
            </h2>
            {selectedMeeting.description && (
              <p className="text-gray-600 mb-4">
                {selectedMeeting.description}
              </p>
            )}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar size={18} className="text-primary-600" />
                <span>
                  {new Date(selectedMeeting.startTime).toLocaleString()}
                </span>
              </div>
              {selectedMeeting.location && (
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="font-medium">Location:</span>
                  <span>{selectedMeeting.location}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-700">
                <span className="font-medium">Type:</span>
                <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-sm">
                  {selectedMeeting.meetingType.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <span className="font-medium">Status:</span>
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${
                    selectedMeeting.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {selectedMeeting.status.charAt(0).toUpperCase() +
                    selectedMeeting.status.slice(1)}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedMeeting(null)}
              className="w-full px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition"
            >
              Close
            </button>
          </Card>
        </div>
      )}
    </div>
  );
};
