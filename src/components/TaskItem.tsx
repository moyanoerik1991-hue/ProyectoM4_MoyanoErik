import { useState } from "react";
import type { Task } from "../types/Task";
import { Button } from "./ui/Button";
import { formatDate } from "../utils/formatDate";
import { useCountdown } from "../hooks/useCountdown";
import { dateToInputStrings } from "../utils/dateToInputStrings";
import { Textarea } from "./ui/Textarea";
import { Input } from "./ui/Input";

interface TaskItemProps {
    task: Task;
    onToggleComplete: (id: number) => void;
    onDelete: (id: number) => void;
    onEditTask: (id: number, updateFields: Omit<Task, "id" | "date" | "completed">) => void;
}

export const TaskItem = ({ task, onToggleComplete, onDelete, onEditTask }: TaskItemProps) => {
    const countdown = useCountdown(task.deadline, task.completed);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editDate, setEditDate] = useState("");
    const [editTime, setEditTime] = useState("");

    const handleEditClick = () => {
        const { datePart, timePart } = dateToInputStrings(task.deadline);
        setIsEditing(true);
        setEditTitle(task.title);
        setEditDescription(task.description);
        setEditDate(datePart);
        setEditTime(timePart);
    };

    const handleSaveClick = () => {
        if (editTitle.trim().length < 3 || !editDescription.trim() || !editDate.trim() || !editTime.trim()) return;
        const newDeadline = new Date(editDate + "T" + editTime);
        onEditTask(task.id, { title: editTitle, description: editDescription, deadline: newDeadline });
        setIsEditing(false);
    }

    const handleCancelClick = () => {
        setIsEditing(false);
    }

    let countdownText = null;
    if (!task.completed) {
        countdownText = countdown.expired ? "Tiempo Expirado" : `Tiempo Restante: ${countdown.days}d  ${countdown.hours}h  ${countdown.minutes}m`;
    }

    return (
        <div>
            {isEditing ? (
                <>
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