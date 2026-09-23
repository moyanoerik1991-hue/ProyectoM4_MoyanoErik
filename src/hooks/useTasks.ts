import { useState, useEffect } from "react";
import type { Task } from "../types/Task";
import { useAuth } from "./useAuth";
import {
    createTask,
    getTasksByUser,
    updateTask,
    deleteTask,
} from "../services/taskService";

export const useTasks = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Carga las tareas del usuario logueado apenas hay un user válido,
    // y se vuelve a ejecutar si el usuario cambia (login/logout)
    useEffect(() => {
        if (!user) {
            setTasks([]);
            setLoading(false);
            return;
        }

        const loadTasks = async () => {
            setLoading(true);
            try {
                const userTasks = await getTasksByUser(user.uid);
                setTasks(userTasks);
                setError(null);
            } catch {
                setError("No se pudieron cargar las tareas.");
            } finally {
                setLoading(false);
            }
        };

        loadTasks();
    }, [user]);

    const handleAddTask = async (newTask: Omit<Task, "id" | "userId" | "date" | "completed">) => {
        if (!user) return;
        try {
            const created = await createTask({
                ...newTask,
                userId: user.uid,
                date: new Date(),
                completed: false,
            });
            setTasks([...tasks, created]);
        } catch {
            setError("No se pudo crear la tarea.");
        }
    };

    const handleEditTask = async (id: string, updateFields: Omit<Task, "id" | "userId" | "date" | "completed">) => {
        try {
            await updateTask(id, updateFields);
            setTasks(
                tasks.map((task) =>
                    task.id === id ? { ...task, ...updateFields } : task
                )
            );
        } catch {
            setError("No se pudo editar la tarea.");
        }
    };

    const handleToggleComplete = async (id: string) => {
        const target = tasks.find((task) => task.id === id);
        if (!target) return;
        try {
            await updateTask(id, { completed: !target.completed });
            setTasks(
                tasks.map((task) =>
                    task.id === id ? { ...task, completed: !task.completed } : task
                )
            );
        } catch {
            setError("No se pudo actualizar el estado de la tarea.");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteTask(id);
            setTasks(tasks.filter((task) => task.id !== id));
        } catch {
            setError("No se pudo eliminar la tarea.");
        }
    };

    return {
        tasks,
        loading,
        error,
        handleAddTask,
        handleEditTask,
        handleToggleComplete,
        handleDelete,
    };
};