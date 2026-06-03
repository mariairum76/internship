import React, { Suspense, lazy } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";

const Login = lazy(() =>
  import("./pages/Login")
);

const Dashboard = lazy(() =>
  import("./pages/Dashboard")
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Routes>

          <Route
            path="/"
            element={<Login />}
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;