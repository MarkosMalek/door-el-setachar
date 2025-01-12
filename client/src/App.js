import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./features/home";
import Register from "./features/users/register";
import UsersList from "./features/users/usersList";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<UsersList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
