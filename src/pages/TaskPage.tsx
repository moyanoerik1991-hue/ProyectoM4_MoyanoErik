import { useState } from "react";
import { AddTask } from "../components/AddTask.tsx";
import { TaskItem } from "../components/TaskItem.tsx";
import { useTasks } from "../hooks/useTasks.ts";
import { useAuth } from "../hooks/useAuth.ts";
import { sortTasksByDeadline } from "../utils/sortTasksByDeadline.ts";
import { Button } from "../components/ui/Button.tsx";
import { sendTaskSummaryEmail } from "../services/emailService.ts";

export const TaskPage = () => {
    const { tasks, handleAddTask, handleToggleComplete, handleDelete, handleEditTask } = useTasks();
    const { user } = useAuth();
    const [emailStatus, setEmailStatus] = useState<string | null>(null);
    const sortedTasks = sortTasksByDeadline(tasks);

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