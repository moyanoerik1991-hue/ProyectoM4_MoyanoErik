import { useState } from 'react'
import type { Task } from '../types/Task.ts'
import { Input } from './ui/Input.tsx'
import { Button } from './ui/Button.tsx'

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
        if (!title.trim() || !description.trim() || !date.trim() || !time.trim()) return;
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <Input
                label="Descripcion"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
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
            <Button
                label="Agregar"
                type="submit"
                disabled={!title.trim() || !description.trim() || !date.trim() || !time.trim()}
            />
        </form>
    );
}