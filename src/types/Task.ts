export type Task = {
    id: string;
    userId: string;
    title: string;
    description: string;
    date: Date;
    deadline: Date;
    completed: boolean;
};
