import { useState } from 'react'
import type { Task } from '../types/Task.ts'
import { Input } from './ui/Input.tsx'
import { Button } from './ui/Button.tsx'
import { Textarea } from './ui/Textarea.tsx';

interface AddTaskProps {
    onAddTask: (task: Omit<Task, "id" | "date" | "completed">) => void;
}

export const AddTask = ({ onAddTask }: AddTaskProps) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title.trim().length < 3 || !description.trim() || !date.trim() || !time.trim()) return;
        onAddTask({
            title,
            description,
            deadline: new Date(date + "T" + time)
        });
        setTitle("");
        setDescription("");
        setDate("");
        setTime("");
    }

    return (
        <form onSubmit={handleSubmit}>
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
            <fieldset>
                <legend>Fecha Limite de la Tarea</legend>
                <Input
                    label="Fecha"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
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
                disabled={title.trim().length < 3 || !description.trim() || !date.trim() || !time.trim()}
            />
        </form>
    );
}