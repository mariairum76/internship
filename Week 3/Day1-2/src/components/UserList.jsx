import { useState } from "react";

export default function UserList() {
  const [users, setUsers] = useState([
    { id: 1, name: "Ali" },
    { id: 2, name: "Ahmed" },
    { id: 3, name: "Sara" }
  ]);

  const addUser = () => {
    const newUser = {
      id: Date.now(),
      name: "New User"
    };

    setUsers([...users, newUser]);
  };

  return (
    <div>
      <h2>User List</h2>

      <button onClick={addUser}>
        Add User
      </button>

      {users.map((user) => (
        <p key={user.id}>
          {user.name}
        </p>
      ))}
    </div>
  );
}