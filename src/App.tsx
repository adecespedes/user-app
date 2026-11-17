import { useState, useEffect } from "react";
import "./App.css";

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

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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

      <main className="users-grid">
        {filteredUsers.length === 0 && searchTerm !== "" ? (
          <div className="empty-state">
            No se encontraron usuarios con ese nombre
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div key={user.id} className="user-card">
              <h3>{user.name}</h3>
              <p>
                <strong>Usuario:</strong> {user.username}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Teléfono:</strong> {user.phone}
              </p>
              <p>
                <strong>Sitio web:</strong>{" "}
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener"
                >
                  {user.website}
                </a>
              </p>
              <p>
                <strong>Dirección:</strong> {user.address.street},{" "}
                {user.address.city} {user.address.zipcode}
              </p>
            </div>
          ))
        )}
      </main>
    </div>
  );
}

export default App;
