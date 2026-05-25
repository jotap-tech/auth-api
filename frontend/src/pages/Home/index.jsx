import "./style.css";
import { FaTrash } from "react-icons/fa";
import api from "../../services/api";
import { useEffect, useState, useRef } from "react";

function Home() {
  const [users, setUsers] = useState([]);

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers() {
    const usersFromApi = await api.get("/users");

    setUsers(usersFromApi.data);
  }

  async function createUsers() {
    await api.post("/users", {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    });
    getUsers()
  }

  async function deleteUsers(id) {
    await api.delete(`/users/${id}`);

    getUsers()
  }


  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <nav className="navbar">
        <h2>UserCRUD</h2>

        <a
          href="https://github.com/jotap-tech"
          target="_blank"
          rel="noreferrer"
        >
          João Pedro
        </a>
      </nav>
      <div className="container">
        <form>
          <h1>Cadastro de Usuários</h1>
          <input placeholder="Nome" name="name" type="text" ref={inputName} />
          <input placeholder="Idade" name="age" type="number" ref={inputAge} />
          <input placeholder="E-mail" name="email" type="email" ref={inputEmail} />
          <button type="button" onClick={createUsers}>Cadastrar</button>
        </form>

        {users.map((user) => (
          <div className="card" key={user.id}>
            <div>
              <p>
                Nome: <span>{user.name}</span>
              </p>
              <p>
                Idade: <span>{user.age}</span>
              </p>
              <p>
                E-mail: <span>{user.email}</span>
              </p>
            </div>

            <button onClick={() => deleteUsers(user.id)}>
              <FaTrash size={20} />
            </button>
          </div>
        ))}
      </div>

    </>
  );
}

export default Home;
