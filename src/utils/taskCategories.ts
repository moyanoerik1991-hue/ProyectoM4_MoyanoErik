import type { Task } from "../types/Task";

export const CATEGORY_OPTIONS: { value: Task["category"]; label: string }[] = [
    { value: "Trabajo", label: "Trabajo" },
    { value: "Hogar", label: "Hogar" },
    { value: "Salud", label: "Salud" },
    { value: "Deporte", label: "Deporte" },
    { value: "Otros", label: "Otros" },
];