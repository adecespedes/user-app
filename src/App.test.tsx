import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

const mockUsers = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "leanne@example.com",
    address: {
      street: "Kulas Light",
      city: "Gwenborough",
      zipcode: "92998",
      geo: { lat: "-37.3159", lng: "81.1496" },
    },
    phone: "1-770-736-8031",
    website: "hildegard.org",
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "ervin@example.com",
    address: {
      street: "Victor Plains",
      city: "Wisokyburgh",
      zipcode: "90566",
      geo: { lat: "-43.9509", lng: "-34.4618" },
    },
    phone: "010-692-6593",
    website: "anastasia.net",
  },
];

afterEach(() => {
  vi.restoreAllMocks();
});

describe("App", () => {
  it("should display the loading state while fetching users", () => {
    vi.spyOn(globalThis, "fetch").mockReturnValue(new Promise(() => {}));

    render(<App />);

    expect(screen.getByText("Cargando usuarios...")).toBeInTheDocument();
  });

  it("should display users after fetching them", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      json: async () => mockUsers,
    } as Response);

    render(<App />);

    expect(await screen.findByText("Leanne Graham")).toBeInTheDocument();
    expect(screen.getByText("Ervin Howell")).toBeInTheDocument();
  });

  it("should filter users by name", async () => {
    const user = userEvent.setup();

    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      json: async () => mockUsers,
    } as Response);

    render(<App />);

    const searchInput = await screen.findByPlaceholderText(
      "Buscar por nombre...",
    );

    await user.type(searchInput, "Leanne");

    expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
    expect(screen.queryByText("Ervin Howell")).not.toBeInTheDocument();
  });
});
