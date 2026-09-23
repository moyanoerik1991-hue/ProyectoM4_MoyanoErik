import { useState } from 'react'
import type { Task } from '../types/Task.ts'
import { Input } from './ui/Input.tsx'
import { Button } from './ui/Button.tsx'
import { Textarea } from './ui/Textarea.tsx';
import { Select } from './ui/Select.tsx';
import { CATEGORY_OPTIONS } from '../utils/taskCategories.ts';
import { getDeadlineRange } from '../utils/getDeadlineRange.ts';
import { getTimeRemaining } from '../utils/getTimeRemaining.ts';

interface AddTaskProps {
    onAddTask: (task: Omit<Task, "id" | "userId" | "date" | "completed">) => void;
}

export const AddTask = ({ onAddTask }: AddTaskProps) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState<Task["category"]>("Otros");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [error, setError] = useState<string | null>(null);

    const dateRange = getDeadlineRange();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (title.trim().length < 3) {
            setError("El título debe tener al menos 3 caracteres.");
            return;
        }
        if (!description.trim()) {
            setError("La descripción no puede estar vacía.");
            return;
        }
        if (!date.trim() || !time.trim()) {
            setError("Debés completar la fecha y hora límite.");
            return;
        }

        const newDeadline = new Date(date + "T" + time);
        if (getTimeRemaining(newDeadline).expired) {
            setError("La fecha límite ya pasó. Elegí una fecha futura.");
            return;
        }

        setError(null);
        onAddTask({ title, description, category, deadline: newDeadline });
        setTitle("");
        setDescription("");
        setCategory("Otros");
        setDate("");
        setTime("");
    }

    return (
        <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <Input
                label="Titulo"
                placeholder="Nueva Tarea"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={50}
            />
            <Textarea
                label="Descripcion"
                placeholder="Descripcion de la tarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={200}
            />
            <Select
                label="Categoria"
                value={category}
                onChange={(e) => setCategory(e.target.value as Task["category"])}
                options={CATEGORY_OPTIONS}
            />
            <fieldset>
                <legend>Fecha Limite de la Tarea</legend>
                <Input
                    label="Fecha"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={dateRange.min}
                    max={dateRange.max}
                />
                <Input
                    label="Hora"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
            </fieldset>
            <Button
                label="Agregar"
                type="submit"
            />
        </form>
    );
}