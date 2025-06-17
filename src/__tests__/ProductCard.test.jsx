import React from "react";
import { render, screen } from "@testing-library/react";
import ProductCard from "../components/ProductCard/ProductCard";

describe("ProductCard component", () => {
  const drink = {
    id: 42,
    name: "Test Latte",
    description: "A test description",
    origin: "Testland",
    price: 2.5,
  };

  beforeEach(() => {
    render(<ProductCard drink={drink} />);
  });

  it("renders the drink name", () => {
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Test Latte"
    );
  });

  it("renders the description", () => {
    expect(screen.getByText(/A test description/i)).toBeInTheDocument();
  });

  it("renders the origin", () => {
    expect(screen.getByText(/Origin: Testland/i)).toBeInTheDocument();
  });

  it("renders the price formatted to two decimals", () => {
    expect(screen.getByText("$2.50")).toBeInTheDocument();
  });
});
