import { useState } from "react";
import type { Task } from "../types/Task";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { formatDate } from "../utils/formatDate";
import { useCountdown } from "../hooks/useCountdown";
import { dateToInputStrings } from "../utils/dateToInputStrings";
import { getDeadlineRange } from "../utils/getDeadlineRange";
import { getTimeRemaining } from "../utils/getTimeRemaining";

interface TaskItemProps {
    task: Task;
    onToggleComplete: (id: string) => void;
    onDelete: (id: string) => void;
    onEditTask: (id: string, updateFields: Omit<Task, "id" | "userId" | "date" | "completed">) => void;
}

export const TaskItem = ({ task, onToggleComplete, onDelete, onEditTask }: TaskItemProps) => {
    const countdown = useCountdown(task.deadline, task.completed);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editDate, setEditDate] = useState("");
    const [editTime, setEditTime] = useState("");
    const [error, setError] = useState<string | null>(null);

    const dateRange = getDeadlineRange();

    let countdownText = null;
    if (!task.completed) {
        countdownText = countdown.expired
            ? "Tiempo Expirado"
            : `Tiempo Restante: ${countdown.days}d  ${countdown.hours}h  ${countdown.minutes}m`;
    }

    const handleEditClick = () => {
        const { datePart, timePart } = dateToInputStrings(task.deadline);
        setIsEditing(true);
        setEditTitle(task.title);
        setEditDescription(task.description);
        setEditDate(datePart);
        setEditTime(timePart);
        setError(null);
    };

    const handleSaveClick = () => {
        if (editTitle.trim().length < 3) {
            setError("El título debe tener al menos 3 caracteres.");
            return;
        }
        if (!editDescription.trim()) {
            setError("La descripción no puede estar vacía.");
            return;
        }
        if (!editDate.trim() || !editTime.trim()) {
            setError("Debés completar la fecha y hora límite.");
            return;
        }

        const newDeadline = new Date(editDate + "T" + editTime);
        if (getTimeRemaining(newDeadline).expired) {
            setError("La fecha límite ya pasó. Elegí una fecha futura.");
            return;
        }

        setError(null);
        onEditTask(task.id, { title: editTitle, description: editDescription, deadline: newDeadline });
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setError(null);
        setIsEditing(false);
    };

    return (
        <div>
            {isEditing ? (
                <>
                    {error && <p>{error}</p>}
                    <Input
                        label="Titulo"
                        placeholder="Nueva Tarea"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        maxLength={50}
                    />
                    <Textarea
                        label="Descripcion"
                        placeholder="Descripcion de la tarea"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        maxLength={200}
                    />
                    <fieldset>
                        <legend>Fecha Limite de la Tarea</legend>
                        <Input
                            label="Fecha"
                            type="date"
                            value={editDate}
                            onChange={(e) => setEditDate(e.target.value)}
                            min={dateRange.min}
                            max={dateRange.max}
                        />
                        <Input
                            label="Hora"
                            type="time"
                            value={editTime}
                            onChange={(e) => setEditTime(e.target.value)}
                        />
                    </fieldset>
                    <Button label="Guardar" onClick={handleSaveClick} />
                    <Button label="Cancelar" onClick={handleCancelClick} />
                </>
            ) : (
                <>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>Fecha de creación: {formatDate(task.date)}</p>
                    <p>Fecha de vencimiento: {formatDate(task.deadline)}</p>
                    <p>{task.completed ? "Completada" : "Pendiente"}</p>
                    {countdownText && <p>{countdownText}</p>}
                    <Button label={task.completed ? "Pendiente" : "Completar"} onClick={() => onToggleComplete(task.id)} />
                    <Button label="Editar" onClick={handleEditClick} />
                    <Button label="Eliminar" onClick={() => onDelete(task.id)} />
                </>
            )}
        </div>
    );
};