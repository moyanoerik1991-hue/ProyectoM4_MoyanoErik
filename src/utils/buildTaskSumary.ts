import type { Task } from "../types/Task";
import { sortTasksByDeadline } from "./sortTasksByDeadline";
import { getTimeRemaining } from "./getTimeRemaining";

export function buildTaskSummary(tasks: Task[]) {
    const completedCount = tasks.filter((task) => task.completed).length;
    const pendingCount = tasks.filter((task) => !task.completed).length;

    const activeTasks = tasks.filter(
        (task) => !task.completed && !getTimeRemaining(task.deadline).expired
    );

    const upcoming = sortTasksByDeadline(activeTasks).slice(0, 5);

    return {
        completedCount,
        pendingCount,
        upcoming,
    };
}