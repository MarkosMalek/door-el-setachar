import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./features/home";
import Register from "./features/users/register";
import UsersList from "./features/users/usersList";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Main application component that sets up routing for the React application.
 * 
 * @description Configures the application's navigation using React Router, defining routes for:
 * - Home page (`/`)
 * - User registration page (`/register`)
 * - Users list page (`/users`)
 * 
 * @returns {JSX.Element} A browser router with defined routes for the application
 */
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
