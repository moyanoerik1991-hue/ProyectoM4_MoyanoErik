import { useState, useRef } from "react";
import type { Task } from "../types/Task";

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const nextId = useRef(1);

    // Función para añadir una nueva tarea - se utiliza "lazy initial state" en el useState
    const handleAddTask = (newTask: Omit<Task, "id" | "date" | "completed">) => {
        const task: Task = {
            ...newTask,
            id: nextId.current++,
            date: new Date(),
            completed: false,
        };
        setTasks([...tasks, task]);
    };

    // Función para editar una tarea existente - se utiliza el spred operator para actualizar solo los campos necesarios
    const handleEditTask = (id: number, updateFields: Omit<Task, "id" | "date" | "completed">) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, ...updateFields } : task
            )
        )
    }

    // Función para alternar el estado de completado de una tarea.
    const handleToggleComplete = (id: number) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    // Función para eliminar una tarea - filter se utiliza para crear un nuevo array que excluye la tarea con el id especificado
    const handleDelete = (id: number) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    return {
        tasks,
        handleAddTask,
        handleEditTask,
        handleToggleComplete,
        handleDelete,
    };
};