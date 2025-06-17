import { describe, test, expect, beforeEach, vi } from "vitest";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductForm from "../components/ProductForm/ProductForm";
import * as api from "../api/drinks";

vi.mock("../api/drinks");
api.createDrink = vi.fn().mockResolvedValue({ id: 123, name: "Test Drink" });

describe("ProductForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("shows validation error when fields are empty", async () => {
    render(<ProductForm />);
    fireEvent.click(screen.getByRole("button", { name: /create drink/i }));
    expect(
      await screen.findByText(/all fields are required/i)
    ).toBeInTheDocument();
  });

  test("submits form and shows success message", async () => {
    render(<ProductForm />);
    fireEvent.change(screen.getByLabelText(/drink name/i), {
      target: { name: "name", value: "Test" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { name: "description", value: "Desc" },
    });
    fireEvent.change(screen.getByLabelText(/origin/i), {
      target: { name: "origin", value: "Origin" },
    });
    fireEvent.change(screen.getByLabelText(/price/i), {
      target: { name: "price", value: "5" },
    });
    fireEvent.click(screen.getByRole("button", { name: /create drink/i }));

    await waitFor(() => {
      expect(api.createDrink).toHaveBeenCalledWith({
        name: "Test",
        description: "Desc",
        origin: "Origin",
        price: 5,
      });
    });
    expect(
      await screen.findByText(/drink successfully created/i)
    ).toBeInTheDocument();
  });
});
