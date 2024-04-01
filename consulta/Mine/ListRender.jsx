import { useState } from "react";

function ListRender() {
  const [list] = useState(["Ricardo", "Elias", "Roberto"]);

  const [users, setUsers] = useState([
    { id: 1, name: "Ricardo", age: 25 },
    { id: 2, name: "Simões", age: 25 },
    { id: 3, name: "Elias", age: 25 },
  ]);

  const deleteRandom = () => {
    const randomNumber = Math.floor(Math.random() * 4);
    setUsers((prevUsers) =>
      prevUsers.filter((user) => randomNumber !== user.id)
    );
  };
  return (
    <div>
      {/* Render sem key */}
      <ul>
        {list.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
      {/* Render com key */}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.age}
          </li>
        ))}
      </ul>
      {/* Previous State*/}
      <button onClick={deleteRandom}>Delete random user </button>
    </div>
  );
}

export default ListRender;
