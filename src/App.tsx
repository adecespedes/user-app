import { useState, useEffect } from "react";
import "./App.css";
import { PostsModal } from "./PostsModal";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<{
    id: number;
    name: string;
    username: string;
  } | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.trim();
    setSearchTerm(term);

    if (term === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(term.toLowerCase()),
      );
      setFilteredUsers(filtered);
    }
  };

  const handleUserClick = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setSelectedUser({
        id: user.id,
        name: user.name,
        username: user.username,
      });
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then((res) => res.json())
        .then((posts) => {
          setUserPosts(posts);
        })
        .catch((err) => {
          console.error(err);
          setUserPosts([]);
        });
    }
  };

  const handleAddPost = async (newPost: { title: string; body: string }) => {
    if (!selectedUser) return;

    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newPost,
        userId: selectedUser.id,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al crear la publicación");
    }

    const createdPost: Post = await response.json();

    setUserPosts((prevPosts) => [createdPost, ...prevPosts]);
  };

  const handleModalClose = () => {
    setSelectedUser(null);
    setUserPosts([]);
  };

  if (isLoading) {
    return <div className="loading">Cargando usuarios...</div>;
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>Listado de usuarios</h1>
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
      </header>

      <main className="main-content">
        <div className="users-list">
          {filteredUsers.length === 0 && searchTerm !== "" ? (
            <div className="empty-state">
              No se encontraron usuarios con ese nombre
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="user-card"
                onClick={() => handleUserClick(user.id)}
                style={{
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <div className="user-header">
                  <h3 className="user-name">{user.name}</h3>
                  <span className="user-username">@{user.username}</span>
                </div>
                <p className="user-contact-item">
                  <strong>Teléfono:</strong> {user.phone}
                </p>
                <p className="user-contact-item">
                  <strong>Correo:</strong> {user.email}
                </p>
                <p className="user-contact-item">
                  <strong>Sitio web:</strong>{" "}
                  <a
                    href={`https://${user.website}`}
                    target="_blank"
                    rel="noopener"
                  >
                    {user.website}
                  </a>
                </p>
                <p className="user-address">
                  {user.address.street}, {user.address.city}
                </p>
              </div>
            ))
          )}
        </div>

        <PostsModal
          isOpen={!!selectedUser}
          onClose={handleModalClose}
          user={selectedUser!}
          posts={userPosts}
          onAddPost={handleAddPost}
        />
      </main>
    </div>
  );
}

export default App;
