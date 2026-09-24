import { useState } from "react";
import { AddTask } from "../components/AddTask.tsx";
import { TaskItem } from "../components/TaskItem.tsx";
import { TaskFilter } from "../components/TaskFilter.tsx";
import { CategoryFilter } from "../components/CategoryFilter.tsx";
import { useTasks } from "../hooks/useTasks.ts";
import { useAuth } from "../hooks/useAuth.ts";
import { sortTasksByDeadline } from "../utils/sortTasksByDeadline.ts";
import { filterTasks, filterTasksByCategory, type FilterCategory } from "../utils/filterTasks.ts";
import type { Task } from "../types/Task.ts";
import { Button } from "../components/ui/Button.tsx";
import { sendTaskSummaryEmail } from "../services/emailService.ts";

export const TaskPage = () => {
    const { tasks, handleAddTask, handleToggleComplete, handleDelete, handleEditTask } = useTasks();
    const { user } = useAuth();
    const [emailStatus, setEmailStatus] = useState<string | null>(null);
    const [activeFilters, setActiveFilters] = useState<FilterCategory[]>([]);
    const [activeCategories, setActiveCategories] = useState<Task["category"][]>([]);

    const statusFiltered = filterTasks(tasks, activeFilters);
    const categoryFiltered = filterTasksByCategory(statusFiltered, activeCategories);
    const sortedTasks = sortTasksByDeadline(categoryFiltered);

    const handleSendSummary = async () => {
        if (!user?.email) return;

        try {
            await sendTaskSummaryEmail(user.email, tasks);
            setEmailStatus("Resumen enviado correctamente a tu email.");
        } catch {
            setEmailStatus("Ocurrió un error al enviar el resumen. Intentá de nuevo.");
        }
    };

    return (
        <>
            <AddTask onAddTask={handleAddTask} />
            <Button label="Enviar resumen por email" onClick={handleSendSummary} />
            {emailStatus && <p>{emailStatus}</p>}
            <TaskFilter activeFilters={activeFilters} onFilterChange={setActiveFilters} />
            <CategoryFilter activeCategories={activeCategories} onCategoryChange={setActiveCategories} />
            {sortedTasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggleComplete={handleToggleComplete}
                    onDelete={handleDelete}
                    onEditTask={handleEditTask}
                />
            ))}
        </>
    );
}