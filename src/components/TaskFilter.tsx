import type { FilterCategory } from "../utils/filterTasks";
import { Checkbox } from "./ui/CheckBox";

interface TaskFilterProps {
    activeFilters: FilterCategory[];
    onFilterChange: (filters: FilterCategory[]) => void;
}

const FILTERS: { label: string; category: FilterCategory }[] = [
    { label: "Completadas", category: "completed" },
    { label: "Pendientes", category: "pending" },
    { label: "Expiradas", category: "expired" },
];

export const TaskFilter = ({ activeFilters, onFilterChange }: TaskFilterProps) => {
    const handleFilterToggle = (category: FilterCategory) => {
        onFilterChange(
            activeFilters.includes(category)
                ? activeFilters.filter((f) => f !== category)
                : [...activeFilters, category]
        );
    };

    return (
        <div className="task-page__filter-content">
            <h3>Filtros</h3>
            {FILTERS.map((filter) => (
                <Checkbox
                    key={filter.category}
                    label={filter.label}
                    checked={activeFilters.includes(filter.category)}
                    onChange={() => handleFilterToggle(filter.category)}
                />
            ))}
        </div>
    );
}