import type { Task } from "../types/Task";
import { getTimeRemaining } from "./getTimeRemaining";

export type FilterCategory = "completed" | "pending" | "expired";

function getTaskCategory(task: Task): FilterCategory {
    if (task.completed) return "completed";

    const timeRemaining = getTimeRemaining(task.deadline);

    if (timeRemaining.expired) return "expired";

    return "pending";
}

export function filterTasks(tasks: Task[], activeFilters: FilterCategory[]): Task[] {
    if (activeFilters.length === 0) return tasks;

    return tasks.filter((task) => activeFilters.includes(getTaskCategory(task)));
}