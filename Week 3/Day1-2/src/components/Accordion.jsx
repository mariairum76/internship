export function Accordion({ children }) {
  return <div style={{ border: "1px solid black", padding: "10px" }}>
    {children}
  </div>;
}

export function Title({ children }) {
  return <h3>{children}</h3>;
}

export function Content({ children }) {
  return <p>{children}</p>;
}