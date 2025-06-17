import React from "react";
import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

// 1) Mock useFetch so ShopPage gets our fake drinks immediately
vi.mock("../hooks/useFetch", () => ({
  default: () => ({
    data: [
      {
        id: 1,
        name: "Latte",
        description: "Creamy espresso latte",
        origin: "Colombia",
        price: 4.5,
      },
      {
        id: 2,
        name: "Mocha",
        description: "Chocolatey mocha",
        origin: "Brazil",
        price: 5.0,
      },
    ],
    loading: false,
    error: "",
  }),
}));

import ShopPage from "../components/ShopPage/ShopPage";

describe("ShopPage", () => {
  it("renders all drink cards and filters based on search input", async () => {
    render(<ShopPage />);

    // Should show two drink cards initially
    const cards = await screen.findAllByRole("heading", { level: 2 });
    expect(cards).toHaveLength(2);

    // Search for "mocha"
    const input = screen.getByLabelText(/Search Drinks/i);
    fireEvent.change(input, { target: { value: "mocha" } });

    // Now only the "Mocha" card remains
    expect(
      screen.getByRole("heading", { level: 2, name: /mocha/i })
    ).toBeInTheDocument();

    const filtered = screen.getAllByRole("heading", { level: 2 });
    expect(filtered).toHaveLength(1);
  });
});
