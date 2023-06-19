import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "./features/user/userSlice.js";
import Navbar from "./Components/Navbar";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Toast from "./Components/Toast";
import { authProtectedRoutes } from "./routes";

function App() {
  const dispatch = useDispatch();
  const { navbar } = useSelector((state) => state.navbar);
  const [toggleForm, setToggleForm] = useState(true);
  const { toast } = useSelector((state) => state.toast);
  const { user } = useSelector((state) => state.user);

  const getUser = () => {
    const token = JSON.parse(localStorage.getItem("user"));
    if (token && !user) {
      dispatch(logIn(token));
      return true;
    } else if (user) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div id="app">
      <BrowserRouter>
        {toast[0] && <Toast />}
        {navbar && <Navbar />}
        <div id="app-content">
          <Routes>
            <Route
              path="/auth"
              element={
                toggleForm ? (
                  <Login setToggleForm={setToggleForm} />
                ) : (
                  <Register setToggleForm={setToggleForm} />
                )
              }
            />
            {authProtectedRoutes.map((route, index) => (
              <Route
                path={route.path}
                element={
                  getUser() ? <route.component /> : <Navigate to="/auth" />
                }
                key={"auth" + index}
                isAuthProtected={getUser()}
                exact={true}
              />
            ))}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
