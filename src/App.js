import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Join from "./pages/Join";
import Login from "./pages/Login";
import Main from "./pages/Main";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import userReducer from "./store/UserReducer";
import { clearUser, setUser, } from "./store/UserReducer";

function App() {
  const dispatch = useDispatch();
  const { isLoading, currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const unsubscripbe = onAuthStateChanged(getAuth(), (user) => {
      if (!!user) {
        dispatch(setUser(user));
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscripbe();
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<Main />} />

      <Route
        path="/login"
        element={<Login />}
      />
      <Route path="/join" element={currentUser ? <Navigate to="/" /> : <Join />} />
    </Routes>
  );
}

export default App;
