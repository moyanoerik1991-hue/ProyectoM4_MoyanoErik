import type { Task } from "../types/Task";
import { Button } from "./ui/Button";
import { formatDate } from "../utils/formatDate";
import { useCountdown } from "../hooks/useCountdown";

interface TaskItemProps {
    task: Task;
    onToggleComplete: (id: number) => void;
    onDelete: (id: number) => void;
}

export const TaskItem = ({ task, onToggleComplete, onDelete }: TaskItemProps) => {
    const countdown = useCountdown(task.deadline, task.completed);

    let countdownText = null;
    if (!task.completed) {
        countdownText = countdown.expired ? "Tiempo Expirado" : `Tiempo Restante: ${countdown.days}d  ${countdown.hours}h  ${countdown.minutes}m`;
    }
    return (
        <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Fecha de creación: {formatDate(task.date)}</p>
            <p>Fecha de vencimiento: {formatDate(task.deadline)}</p>
            <p>{task.completed ? "Completada" : "Pendiente"}</p>
            {countdownText && <p>{countdownText}</p>}
            <Button label={task.completed ? "Pendiente" : "Completar"} onClick={() => onToggleComplete(task.id)} />
            <Button label="Eliminar" onClick={() => onDelete(task.id)} />
        </div>
    );
};