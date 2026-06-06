"use client";

import { useRouter } from "next/navigation";

interface CommissionStatusUpdateProps {
  id: string;
  currentStatus: string;
}

export function CommissionStatusUpdate({
  id,
  currentStatus,
}: CommissionStatusUpdateProps) {
  const router = useRouter();

  async function updateStatus(newStatus: string) {
    await fetch("/api/commission-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    });
    router.refresh();
  }

  return (
    <select
      value={currentStatus}
      onChange={(e) => updateStatus(e.target.value)}
      className="text-xs border rounded px-2 py-1 bg-transparent"
    >
      <option value="pending">Pending</option>
      <option value="reviewing">Reviewing</option>
      <option value="accepted">Accepted</option>
      <option value="declined">Declined</option>
      <option value="completed">Completed</option>
    </select>
  );
}
