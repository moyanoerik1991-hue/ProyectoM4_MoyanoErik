import type { Task } from "../types/Task";
import { buildTaskSummary } from "../utils/buildTaskSumary";
import { formatDate } from "../utils/formatDate";

export async function sendTaskSummaryEmail(email: string, tasks: Task[]): Promise<void> {
    const { completedCount, pendingCount, upcoming } = buildTaskSummary(tasks);

    const response = await fetch("/api/send-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email,
            completedCount,
            pendingCount,
            upcoming: upcoming.map((task) => ({
                title: task.title,
                deadline: formatDate(task.deadline),
            })),
        }),
    });

    if (!response.ok) {
        throw new Error("No se pudo enviar el resumen por email.");
    }
}