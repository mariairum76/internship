import { FixedSizeList } from "react-window";

const Row = ({ index, style }) => (
  <div style={style}>
    User #{index}
  </div>
);

export default function VirtualizedList() {
  return (
    <div>
      <h2>10,000 Users</h2>

      <FixedSizeList
        height={400}
        width={400}
        itemSize={35}
        itemCount={10000}
      >
        {Row}
      </FixedSizeList>
    </div>
  );
}