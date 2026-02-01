import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Schedule from "./pages/schedule/Schedule";
import Tasks from "./pages/tasks/Tasks";
import Library from "./pages/library/Library";
import Videos from "./pages/videos/Videos";
import ProfileSettings from '././pages/auth/ProfileSettings';

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/library" element={<Library />} />
        <Route path="/videos" element={token ? <Videos /> : <Navigate to="/login" />} />
        <Route
          path="/"
          element={<Navigate to={token ? "/dashboard" : "/login"} />}
        />
        <Route path="/settings" element={<ProfileSettings />} />
      </Routes>
    </Router>
  );
}

export default App;
