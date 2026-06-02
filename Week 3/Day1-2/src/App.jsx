import { Accordion, Title, Content } from "./components/Accordion";

function App() {
  return (
    <div>
      <h1>Compound Component</h1>

      <Accordion>
        <Title>What is React?</Title>
        <Content>React is a UI library</Content>
      </Accordion>
    </div>
  );
}

export default App;