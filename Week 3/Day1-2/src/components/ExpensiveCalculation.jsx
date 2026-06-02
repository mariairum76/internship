import { useState, useMemo } from "react";

export default function ExpensiveCalculation() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // heavy calculation
  const heavyValue = useMemo(() => {
    console.log("Heavy calculation running...");

    let sum = 0;

    for (let i = 0; i < 100000000; i++) {
      sum += i;
    }

    return sum;
  }, []);

  return (
    <div>
      <h2>useMemo Example</h2>

      <p>Heavy Value: {heavyValue}</p>

      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>

      <br /><br />

      <input
        placeholder="Type here"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}