export type Task = {
    id: string;
    userId: string;
    title: string;
    description: string;
    category: "Trabajo" | "Hogar" | "Salud" | "Deporte" | "Otros";
    date: Date;
    deadline: Date;
    completed: boolean;
};