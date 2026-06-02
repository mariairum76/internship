import { useQuery } from "@tanstack/react-query";

const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
};

export default function Users() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 5000
  });

  if (isLoading) return <h3>Loading...</h3>;
  if (error) return <h3>Error occurred</h3>;

  return (
    <div>
      <h2>Users (React Query)</h2>

      {data.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}