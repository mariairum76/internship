export default function BuggyComponent() {
  const data = undefined;

  return (
    <div>
      <h2>{data.name}</h2>
    </div>
  );
}
