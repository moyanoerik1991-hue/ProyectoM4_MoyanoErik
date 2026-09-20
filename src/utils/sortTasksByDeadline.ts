import type { Task } from "../types/Task";

export function sortTasksByDeadline(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => a.deadline.getTime() - b.deadline.getTime());
}