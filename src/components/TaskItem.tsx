import type { Task } from "../types/Task";
import { Button } from "./ui/Button";

interface TaskItemProps {
    task: Task;
    onToggleComplete: (id: number) => void;
    onDelete: (id: number) => void;
}

export const TaskItem = ({ task, onToggleComplete, onDelete }: TaskItemProps) => {
    return (
        <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{task.date.toLocaleDateString()}</p>
            <p>{task.completed ? "Completada" : "Pendiente"}</p>

            <Button label={task.completed ? "Pendiente" : "Completar"} onClick={() => onToggleComplete(task.id)} />
            <Button label="Eliminar" onClick={() => onDelete(task.id)} />
        </div>
    );
};