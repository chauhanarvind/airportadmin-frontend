import api from "@/app/lib/api";

interface WarningPayload {
  shiftId: number;
  coveringUserId: number;
  shiftDate: string;
  startTime: string;
  endTime: string;
}

export async function fetchShiftCoverWarnings(
  payload: WarningPayload
): Promise<string[]> {
  try {
    const res = await api.post<string[]>("/api/cover-requests/check", payload);
    return res.data || [];
  } catch (err) {
    console.error("Failed to check warnings:", err);
    throw err;
  }
}
