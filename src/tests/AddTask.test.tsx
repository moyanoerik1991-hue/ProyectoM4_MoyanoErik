import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AddTask } from "../components/AddTask";

describe("AddTask", () => {
	it("renderiza los campos principales del formulario", () => {
		render(<AddTask onAddTask={vi.fn()} />);

		expect(screen.getByPlaceholderText("Nueva Tarea")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Descripcion de la tarea")).toBeInTheDocument();
		expect(screen.getByText("Fecha Limite de la Tarea")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Agregar" })).toBeInTheDocument();
	});

	it("muestra un error y no agrega la tarea si el título es demasiado corto", () => {
		const onAddTask = vi.fn();

		render(<AddTask onAddTask={onAddTask} />);
		fireEvent.change(screen.getByPlaceholderText("Nueva Tarea"), {
			target: { value: "AB" },
		});
		fireEvent.submit(screen.getByRole("button", { name: "Agregar" }).closest("form")!);

		expect(screen.getByText("El título debe tener al menos 3 caracteres.")).toBeInTheDocument();
		expect(onAddTask).not.toHaveBeenCalled();
	});
});
