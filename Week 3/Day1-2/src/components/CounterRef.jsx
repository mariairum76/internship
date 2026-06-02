import { useRef, useState } from "react";

export default function CounterRef() {
  const countRef = useRef(0);
  const [state, setState] = useState(0);

  const increaseRef = () => {
    countRef.current++;
    console.log("Ref:", countRef.current);
  };

  return (
    <div>
      <h2>useRef Example</h2>

      <button onClick={increaseRef}>
        Increase Ref
      </button>

      <button onClick={() => setState(state + 1)}>
        Increase State: {state}
      </button>
    </div>
  );
}