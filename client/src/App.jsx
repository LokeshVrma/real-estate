import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from './pages/RegisterPage'
import HomePage from "./pages/HomePage";
import RecommendationsPage from "./pages/RecommendationsPage";
import NotFoundPage from "./pages/NotFoundPage";
import { AuthProvider } from "./contexts/AuthContext"

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
