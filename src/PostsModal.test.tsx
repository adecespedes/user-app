import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PostsModal } from "./PostsModal";

const mockUser = {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
};

const mockPosts = [
  {
    id: 1,
    title: "Primera publicación",
    body: "Contenido de la primera publicación",
    userId: 1,
  },
  {
    id: 2,
    title: "Segunda publicación",
    body: "Contenido de la segunda publicación",
    userId: 1,
  },
];

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
  user: mockUser,
  posts: mockPosts,
  onAddPost: vi.fn().mockResolvedValue(undefined),
};

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("PostsModal", () => {
  // 1. No mostrar el modal cuando está cerrado
  it("should not render when isOpen is false", () => {
    render(<PostsModal {...defaultProps} isOpen={false} />);

    expect(
      screen.queryByText("Publicaciones de Leanne Graham"),
    ).not.toBeInTheDocument();
  });

  // 2. Mostrar el nombre del usuario y sus publicaciones
  it("should display user information and posts", () => {
    render(<PostsModal {...defaultProps} />);

    expect(
      screen.getByText("Publicaciones de Leanne Graham"),
    ).toBeInTheDocument();

    expect(screen.getByText("Primera publicación")).toBeInTheDocument();

    expect(
      screen.getByText("Contenido de la primera publicación"),
    ).toBeInTheDocument();

    expect(screen.getByText("Segunda publicación")).toBeInTheDocument();
  });

  // 3. Mostrar mensaje cuando no existen publicaciones
  it("should display empty state when there are no posts", () => {
    render(<PostsModal {...defaultProps} posts={[]} />);

    expect(
      screen.getByText("No hay publicaciones para este usuario"),
    ).toBeInTheDocument();
  });

  // 4. Cerrar el modal principal
  it("should call onClose when clicking the close button", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<PostsModal {...defaultProps} onClose={onClose} />);

    await user.click(screen.getByRole("button", { name: "✕" }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // 5. Abrir el formulario de nueva publicación
  it("should open the new post form", async () => {
    const user = userEvent.setup();

    render(<PostsModal {...defaultProps} />);

    await user.click(
      screen.getByRole("button", {
        name: /Adicionar publicación/i,
      }),
    );

    expect(
      screen.getByRole("heading", {
        name: "Nueva publicación",
      }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText("Título *")).toBeInTheDocument();

    expect(screen.getByLabelText("Texto *")).toBeInTheDocument();
  });

  // 6. Crear una publicación correctamente
  it("should submit a new post with trimmed values", async () => {
    const user = userEvent.setup();
    const onAddPost = vi.fn().mockResolvedValue(undefined);

    render(<PostsModal {...defaultProps} onAddPost={onAddPost} />);

    await user.click(
      screen.getByRole("button", {
        name: /Adicionar publicación/i,
      }),
    );

    await user.type(screen.getByLabelText("Título *"), "  Nueva publicación  ");

    await user.type(
      screen.getByLabelText("Texto *"),
      "  Contenido de prueba  ",
    );

    await user.click(
      screen.getByRole("button", {
        name: "Guardar publicación",
      }),
    );

    expect(onAddPost).toHaveBeenCalledWith({
      title: "Nueva publicación",
      body: "Contenido de prueba",
    });

    expect(onAddPost).toHaveBeenCalledTimes(1);

    expect(
      screen.queryByRole("heading", {
        name: "Nueva publicación",
      }),
    ).not.toBeInTheDocument();
  });

  // 7. No permitir guardar campos vacíos
  it("should disable submit button when fields are empty", async () => {
    const user = userEvent.setup();

    render(<PostsModal {...defaultProps} />);

    await user.click(
      screen.getByRole("button", {
        name: /Adicionar publicación/i,
      }),
    );

    expect(
      screen.getByRole("button", {
        name: "Guardar publicación",
      }),
    ).toBeDisabled();

    await user.type(screen.getByLabelText("Título *"), "   ");

    await user.type(screen.getByLabelText("Texto *"), "Contenido");

    expect(
      screen.getByRole("button", {
        name: "Guardar publicación",
      }),
    ).toBeDisabled();
  });

  // 8. Mostrar error cuando falla la creación
  it("should display an error when post creation fails", async () => {
    const user = userEvent.setup();
    const onAddPost = vi.fn().mockRejectedValue(new Error("Server error"));

    render(<PostsModal {...defaultProps} onAddPost={onAddPost} />);

    await user.click(
      screen.getByRole("button", {
        name: /Adicionar publicación/i,
      }),
    );

    await user.type(screen.getByLabelText("Título *"), "Nueva publicación");

    await user.type(screen.getByLabelText("Texto *"), "Contenido de prueba");

    await user.click(
      screen.getByRole("button", {
        name: "Guardar publicación",
      }),
    );

    expect(
      await screen.findByText(
        "No se pudo adicionar la publicación. Inténtalo nuevamente.",
      ),
    ).toBeInTheDocument();

    expect(onAddPost).toHaveBeenCalledTimes(1);
  });
});
