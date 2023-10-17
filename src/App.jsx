import { Route, Routes } from "react-router-dom";
import { Newsline } from "./pages/Newsline";
import { NotFound404 } from "./pages/NotFound404";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Newsline />} />
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
}

export default App;
