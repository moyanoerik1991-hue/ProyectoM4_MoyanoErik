import { useState } from "react";
import type { Task } from "../types/Task";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { Select } from "./ui/Select";
import { formatDate } from "../utils/formatDate";
import { useCountdown } from "../hooks/useCountdown";
import { dateToInputStrings } from "../utils/dateToInputStrings";
import { getDeadlineRange } from "../utils/getDeadlineRange";
import { getTimeRemaining } from "../utils/getTimeRemaining";
import { CATEGORY_OPTIONS } from "../utils/taskCategories";


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
    const [editCategory, setEditCategory] = useState<Task["category"]>("Otros");
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
        setEditCategory(task.category);
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
        onEditTask(task.id, { title: editTitle, description: editDescription, category: editCategory, deadline: newDeadline });
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setError(null);
        setIsEditing(false);
    };

    return (
        <article className="task-page__task-card">
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
                    <Select
                        label="Categoria"
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value as Task["category"])}
                        options={CATEGORY_OPTIONS}
                    />
                    <fieldset className="task-form__deadline">
                        <legend>Fecha Limite de la Tarea</legend>
                        <div className="task-form__inline-group">
                            <div className="task-form__deadline-field">
                                <Input
                                    label="Fecha"
                                    type="date"
                                    value={editDate}
                                    onChange={(e) => setEditDate(e.target.value)}
                                    min={dateRange.min}
                                    max={dateRange.max}
                                />
                            </div>
                            <div className="task-form__deadline-field">
                                <Input
                                    label="Hora"
                                    type="time"
                                    value={editTime}
                                    onChange={(e) => setEditTime(e.target.value)}
                                />
                            </div>
                        </div>
                    </fieldset>
                    <Button label="Guardar" onClick={handleSaveClick} />
                    <Button label="Cancelar" onClick={handleCancelClick} />
                </>
            ) : (
                <>
                    <header className="task-card__header">
                        <h3 title={task.title}>{task.title}</h3>
                        <span className={`task-badge ${task.completed ? "task-badge--completed" : countdown.expired ? "task-badge--expired" : "task-badge--pending"}`}>
                            {task.completed ? "Completada" : countdown.expired ? "Expirada" : "Pendiente"}
                        </span>
                    </header>
                    <p className="task-card__description" title={task.description}>{task.description}</p>
                    <div className="task-card__details">
                        <p><strong>Categoría</strong><span>{task.category}</span></p>
                        <p><strong>Creada</strong><span>{formatDate(task.date)}</span></p>
                        <p><strong>Vence</strong><span>{formatDate(task.deadline)}</span></p>
                        <p className={`task-card__countdown ${!countdownText ? "task-card__countdown--empty" : ""}`} aria-hidden={!countdownText}>
                            <strong>Tiempo</strong>
                            <span>{countdownText?.replace("Tiempo Restante: ", "") || "-"}</span>
                        </p>
                    </div>
                    <div className="task-card__actions">
                        <Button label={task.completed ? "Pendiente" : "Completar"} onClick={() => onToggleComplete(task.id)} />
                        <Button label="Editar" onClick={handleEditClick} />
                        <Button label="Eliminar" onClick={() => onDelete(task.id)} />
                    </div>
                </>
            )}
        </article>
    );
};