import { Home } from "./pages/home";
import { UserDetails } from "./pages/userDetails";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
