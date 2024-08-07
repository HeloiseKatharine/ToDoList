import "./App.css";
import Home from "./components/pages/Home";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { RegisterProvider } from "./context/RegisterContext";

function App() {
  const Private = ({ children }: { children: JSX.Element }) => {
    const { user } = useAuth();
    console.log(user);
    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className="App">
      <RegisterProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="*" element={<Login />} />
              <Route path="/home" element={<Private children={<Home />} />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Router>
        </AuthProvider>
      </RegisterProvider>
    </div>
  );
}

export default App;
