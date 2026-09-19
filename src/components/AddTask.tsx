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

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;
        onAddTask({
            title,
            description,
        });
        setTitle("");
        setDescription("");
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
            <Button
                label="Agregar"
                type="submit"
                disabled={!title.trim() || !description.trim()}
            />
        </form>
    );
}