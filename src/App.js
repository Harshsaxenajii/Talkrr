import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./Components/Helper/ScrollToTop";
import Spinner from "./Components/Helper/Spinner";

import ProtectedRoute from "./Components/Helper/ProtectedRoute";
const Home = React.lazy(() => import("./Components/Home"));
const Login = React.lazy(() => import("./Components/Auth/Login"));
const Register = React.lazy(() => import("./Components/Auth/Register"));

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <React.Suspense fallback={<Spinner />}>
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            </React.Suspense>
          }
        />

        <Route
          exact
          path="/Login"
          element={
            <React.Suspense fallback={<Spinner />}>
              <Login />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/Register"
          element={
            <React.Suspense fallback={<Spinner />}>
              <Register />
            </React.Suspense>
          }
        />
        <Route exact path="/load" element={<Spinner />} />
      </Routes>
    </Router>
  );
}
