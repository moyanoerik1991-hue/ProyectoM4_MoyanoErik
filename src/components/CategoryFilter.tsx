import type { Task } from "../types/Task";
import { Checkbox } from "./ui/CheckBox";
import { CATEGORY_OPTIONS } from "../utils/taskCategories";

interface CategoryFilterProps {
    activeCategories: Task["category"][];
    onCategoryChange: (categories: Task["category"][]) => void;
}

export const CategoryFilter = ({ activeCategories, onCategoryChange }: CategoryFilterProps) => {
    const handleCategoryToggle = (category: Task["category"]) => {
        const isActive = activeCategories.includes(category);
        onCategoryChange(isActive ? [] : [category]);
    };

    return (
        <div className="task-page__filter-content">
            <h3>Categoría</h3>
            {CATEGORY_OPTIONS.map((option) => (
                <Checkbox
                    key={option.value}
                    label={option.label}
                    checked={activeCategories.includes(option.value)}
                    onChange={() => handleCategoryToggle(option.value)}
                />
            ))}
        </div>
    );
};