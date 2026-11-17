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
}

export const PostsModal: React.FC<PostsModalProps> = ({
  isOpen,
  onClose,
  user,
  posts,
}) => {
  if (!isOpen) return null;

  return (
    <div className="posts-modal">
      <div className="posts-modal-content">
        <div className="posts-modal-header">
          <h3>
 Publicaciones de {user.name}
          </h3>
          <button className="posts-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="posts-modal-body">
          {posts.length === 0 ? (
            <p className="empty-state">No hay publicaciones para este usuario</p>
          ) : (
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
          )}
        </div>
        {/* Footer quitado - solo queda header con ✕ */}
      </div>
    </div>
  );
};