import React from "react";

function Child({ onClick }) {
  console.log("Child render hua");

  return (
    <button onClick={onClick}>
      Child Button
    </button>
  );
}

export default React.memo(Child);