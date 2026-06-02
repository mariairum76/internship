import ErrorBoundary from "./components/ErrorBoundary";
import BuggyComponent from "./components/BuggyComponent";

function App() {
  return (
    <div>
      <h1>Error Boundary Demo</h1>

      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    </div>
  );
}

export default App;