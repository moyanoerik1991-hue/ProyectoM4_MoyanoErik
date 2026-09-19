import { AddTask } from "../components/AddTask.tsx";
import { TaskItem } from "../components/TaskItem.tsx";
import { useTasks } from "../hooks/useTasks.ts";

export const TaskPage = () => {
    const { tasks, handleAddTask, handleToggleComplete, handleDelete } = useTasks();

    return (
        <>
            <AddTask onAddTask={handleAddTask} />
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggleComplete={handleToggleComplete}
                    onDelete={handleDelete}
                />
            ))}
        </>
    );
}