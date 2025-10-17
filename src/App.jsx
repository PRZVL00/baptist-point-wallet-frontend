import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import TeacherDashboardPage from "./pages/TeacherDashboardPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
