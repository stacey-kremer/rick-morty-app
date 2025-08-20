import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CharacterDetails from "./pages/CharacterDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:id" element={<CharacterDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
