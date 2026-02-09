import { AvailabilitySlot, MeetingRequest, Meeting } from "../types/calendar";

export const mockAvailabilitySlots: AvailabilitySlot[] = [
  {
    id: "avail-1",
    userId: "user-1",
    dayOfWeek: 1, // Monday
    startTime: "09:00",
    endTime: "17:00",
    timezone: "UTC",
  },
  {
    id: "avail-2",
    userId: "user-1",
    dayOfWeek: 3, // Wednesday
    startTime: "10:00",
    endTime: "16:00",
    timezone: "UTC",
  },
  {
    id: "avail-3",
    userId: "user-2",
    dayOfWeek: 2, // Tuesday
    startTime: "14:00",
    endTime: "18:00",
    timezone: "UTC",
  },
];

export const mockMeetingRequests: MeetingRequest[] = [
  {
    id: "req-1",
    initiatorId: "user-2",
    recipientId: "user-1",
    proposedTime: new Date(Date.now() + 86400000).toISOString(),
    duration: 30,
    reason: "Discuss potential investment opportunity",
    status: "pending",
    createdAt: new Date().toISOString(),
  },
  {
    id: "req-2",
    initiatorId: "user-1",
    recipientId: "user-3",
    proposedTime: new Date(Date.now() + 172800000).toISOString(),
    duration: 60,
    reason: "Product demo and Q&A",
    status: "accepted",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    respondedAt: new Date(Date.now() - 43200000).toISOString(),
  },
];

export const mockMeetings: Meeting[] = [
  {
    id: "meet-1",
    participantIds: ["user-1", "user-2"],
    title: "Investment Discussion",
    description: "Initial meeting to discuss Series A funding",
    startTime: new Date(Date.now() + 172800000).toISOString(),
    endTime: new Date(Date.now() + 172800000 + 1800000).toISOString(), // 30 min
    meetingType: "video",
    status: "scheduled",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "meet-2",
    participantIds: ["user-1", "user-3"],
    title: "Startup Pitch",
    description: "Pitch presentation for tech startup",
    startTime: new Date(Date.now() + 345600000).toISOString(),
    endTime: new Date(Date.now() + 345600000 + 3600000).toISOString(), // 1 hour
    meetingType: "video",
    status: "scheduled",
    createdAt: new Date().toISOString(),
  },
];
