import React from "react";

function MemoChild({ count }) {
  console.log("Child render hua");

  return <h3>Child Count: {count}</h3>;
}

export default React.memo(MemoChild);