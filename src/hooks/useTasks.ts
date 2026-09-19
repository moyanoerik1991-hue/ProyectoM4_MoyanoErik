import { useState, useRef } from "react";
import type { Task } from "../types/Task";

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const nextId = useRef(1);

    const handleAddTask = (newTask: Omit<Task, "id" | "date" | "completed">) => {
        const task: Task = {
            ...newTask,
            id: nextId.current++,
            date: new Date(),
            completed: false,
        };
        setTasks([...tasks, task]);
    };

    const handleToggleComplete = (id: number) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const handleDelete = (id: number) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    return {
        tasks,
        handleAddTask,
        handleToggleComplete,
        handleDelete,
    };
};