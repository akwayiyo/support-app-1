import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import CreateCasePage from "./pages/CreateCasePage";
import EditCasePage from "./pages/EditCasePage";
import ViewCasesPage from "./pages/ViewCasesPage";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  if (!isLoggedIn) {
    return <LoginForm onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/cases" element={<ViewCasesPage />} />
        <Route path="/cases/create" element={<CreateCasePage />} />
        <Route path="/cases/edit/:id" element={<EditCasePage />} />
        <Route path="*" element={<ViewCasesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
