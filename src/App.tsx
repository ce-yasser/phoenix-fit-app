import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "@components/LoginPage";
import HomePage from "@components/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
