import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import * as api from "../api/drinks";
import EditDrinkForm from "../components/EditDrinkForm/EditDrinkForm";

// Mock the GET fetch for the specific drink ID once
const mockDrink = {
  id: "1",
  name: "Test Latte",
  description: "A test description",
  origin: "Testland",
  price: 2.5,
};

beforeAll(() => {
  global.fetch = vi.fn((url) => {
    if (url.endsWith(`/drinks/${mockDrink.id}`)) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockDrink),
      });
    }
    return Promise.reject(new Error("Unexpected URL: " + url));
  });
});

describe("EditDrinkForm", () => {
  const onUpdatedMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Spy on updateDrink
    vi.spyOn(api, "updateDrink").mockResolvedValue({
      ...mockDrink,
      name: "Updated Latte",
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders form fields populated from fetched data", async () => {
    render(<EditDrinkForm id={mockDrink.id} onUpdated={onUpdatedMock} />);

    // 1) Wait for the form heading to confirm data has loaded
    await screen.findByRole("heading", {
      level: 3,
      name: new RegExp(`Edit “${mockDrink.name}”`),
    });

    // 2) Now wait for each input to receive its value
    const nameInput = await screen.findByDisplayValue(mockDrink.name);
    expect(nameInput).toBeInTheDocument();

    expect(screen.getByDisplayValue(mockDrink.description)).toBeInTheDocument();

    expect(screen.getByDisplayValue(mockDrink.origin)).toBeInTheDocument();

    expect(
      screen.getByDisplayValue(mockDrink.price.toString())
    ).toBeInTheDocument();
  });

  it("submits updated values and shows success message", async () => {
    render(<EditDrinkForm id={mockDrink.id} onUpdated={onUpdatedMock} />);

    // Wait for form to load
    await screen.findByRole("heading", {
      level: 3,
      name: new RegExp(`Edit “${mockDrink.name}”`),
    });

    // Change the Name field
    fireEvent.change(screen.getByLabelText(/Name/), {
      target: { value: "Updated Latte" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Update Drink/i }));

    // Wait for updateDrink to be called with correct args
    await waitFor(() => {
      expect(api.updateDrink).toHaveBeenCalledWith(mockDrink.id, {
        name: "Updated Latte",
        description: mockDrink.description,
        origin: mockDrink.origin,
        price: mockDrink.price,
      });
    });

    // Confirm the callback fired
    expect(onUpdatedMock).toHaveBeenCalled();

    // Finally, check for the success message
    expect(
      await screen.findByText(/Drink updated successfully!/i)
    ).toBeInTheDocument();
  });
});
