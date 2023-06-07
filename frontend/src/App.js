import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Toast from "./Components/Toast";
function App() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [toggleForm, setToggleForm] = useState(true);
  const [toast, setToast] = useState([false, ""]);

  return (
    <div id="app">
      <BrowserRouter>
        {toast[0] && <Toast setToast={setToast} toast={toast} />}

        {showNavbar && <Navbar />}
        <div id="app-content">
          <Routes>
            <Route
              path="/auth"
              element={
                toggleForm ? (
                  <Login
                    toggleForm={toggleForm}
                    setToggleForm={setToggleForm}
                    setToast={setToast}
                  />
                ) : (
                  <Register
                    toggleForm={toggleForm}
                    setToggleForm={setToggleForm}
                    setToast={setToast}
                  />
                )
              }
            />
            <Route
              path="/"
              element={
                <Home showNavbar={showNavbar} setShowNavbar={setShowNavbar} />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
