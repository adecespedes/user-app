import { useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: number;
    name: string;
    username: string;
  };
  posts: Post[];
  onAddPost: (post: { title: string; body: string }) => Promise<void>;
}

export const PostsModal: React.FC<PostsModalProps> = ({
  isOpen,
  onClose,
  user,
  posts,
  onAddPost,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleCancel = () => {
    setShowForm(false);
    setTitle("");
    setBody("");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) return;

    try {
      setIsSubmitting(true);
      setError("");

      await onAddPost({
        title: title.trim(),
        body: body.trim(),
      });

      handleCancel();
    } catch (err) {
      setError("No se pudo adicionar la publicación. Inténtalo nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* MODAL PRINCIPAL */}
      <div className="posts-modal">
        <div className="posts-modal-content">
          <div className="posts-modal-header">
            <h3>Publicaciones de {user.name}</h3>

            <button className="posts-modal-close" onClick={onClose}>
              ✕
            </button>
          </div>

          {/* Botón adicionar */}
          <div className="posts-modal-actions">
            <button
              className="add-post-button"
              onClick={() => setShowForm(true)}
            >
              <span>+</span> Adicionar publicación
            </button>
          </div>

          {/* Tabla */}
          {posts.length === 0 ? (
            <p className="empty-state">
              No hay publicaciones para este usuario
            </p>
          ) : (
            <div className="posts-modal-body">
              <table className="posts-table">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Cuerpo</th>
                  </tr>
                </thead>

                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td>
                        <div className="post-title">{post.title}</div>
                      </td>

                      <td>
                        <div className="post-body">{post.body}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* MODAL SECUNDARIO - NUEVA PUBLICACIÓN */}
      {showForm && (
        <div className="post-form-modal">
          <div className="post-form-modal-content">
            <div className="post-form-modal-header">
              <h3>Nueva publicación</h3>

              <button
                className="posts-modal-close"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                ✕
              </button>
            </div>

            <form className="post-form" onSubmit={handleSubmit}>
              <div className="post-form-field">
                <label htmlFor="post-title">Título *</label>

                <input
                  id="post-title"
                  type="text"
                  placeholder="Escribe el título..."
                  className="search-input post-form-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  maxLength={150}
                />
              </div>

              <div className="post-form-field">
                <label htmlFor="post-body">Texto *</label>

                <textarea
                  id="post-body"
                  placeholder="Escribe el texto de la publicación..."
                  className="search-input post-form-input post-form-textarea"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                  rows={5}
                />
              </div>

              {error && <p className="post-form-error">{error}</p>}

              <div className="post-form-actions">
                <button
                  type="button"
                  className="cancel-post-button"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="save-post-button"
                  disabled={isSubmitting || !title.trim() || !body.trim()}
                >
                  {isSubmitting ? "Guardando..." : "Guardar publicación"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
