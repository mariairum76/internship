import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const addUserAPI = async (newUser) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      "Content-Type": "application/json"
    }
  });

  return res.json();
};

export default function AddUser() {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");

  const mutation = useMutation({
    mutationFn: addUserAPI,

    // 🔥 Optimistic Update
    onMutate: async (newUser) => {
      await queryClient.cancelQueries(["users"]);

      const previousUsers = queryClient.getQueryData(["users"]);

      queryClient.setQueryData(["users"], (old = []) => [
        ...old,
        { id: Date.now(), name: newUser.name }
      ]);

      return { previousUsers };
    },

    onError: (err, newUser, context) => {
      queryClient.setQueryData(["users"], context.previousUsers);
    },

    onSettled: () => {
      queryClient.invalidateQueries(["users"]);
    }
  });

  const handleAdd = () => {
    if (!name) return;

    mutation.mutate({ name });
    setName("");
  };

  return (
    <div>
      <h2>Add User (Mutation)</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />

      <button onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}