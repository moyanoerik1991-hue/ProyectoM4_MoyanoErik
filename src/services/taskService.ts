import {
    addDoc,
    collection,
    getDocs,
    query,
    where,
    Timestamp,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";

import { db } from "./firebase.ts";
import type { Task } from "../types/Task.ts";

type CreateTaskData = Omit<Task, "id">;

export const createTask = async (
    task: CreateTaskData
): Promise<Task> => {
    const taskRef = await addDoc(
        collection(db, "tasks"),
        {
            userId: task.userId,
            title: task.title,
            description: task.description,
            date: Timestamp.fromDate(task.date),
            deadline: Timestamp.fromDate(task.deadline),
            completed: task.completed,
        }
    );

    return {
        ...task,
        id: taskRef.id,
    };
};

export const getTasksByUser = async (
    userId: string
): Promise<Task[]> => {
    const tasksQuery = query(
        collection(db, "tasks"),
        where("userId", "==", userId)
    );

    const snapshot = await getDocs(tasksQuery);

    return snapshot.docs.map((document) => {
        const data = document.data();

        return {
            id: document.id,
            userId: data.userId,
            title: data.title,
            description: data.description,
            date: data.date.toDate(),
            deadline: data.deadline.toDate(),
            completed: data.completed,
        };
    });
};

export const updateTask = async (
    id: string,
    updateFields: Partial<Omit<Task, "id" | "userId">>
): Promise<void> => {
    const taskRef = doc(db, "tasks", id);

    const dataToUpdate: Record<string, unknown> = { ...updateFields };
    if (updateFields.date) dataToUpdate.date = Timestamp.fromDate(updateFields.date);
    if (updateFields.deadline) dataToUpdate.deadline = Timestamp.fromDate(updateFields.deadline);

    await updateDoc(taskRef, dataToUpdate);
};

export const deleteTask = async (id: string): Promise<void> => {
    const taskRef = doc(db, "tasks", id);
    await deleteDoc(taskRef);
};