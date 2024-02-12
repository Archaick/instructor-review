import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import CreatePost from "./CreatePost";
import Login from "./Login";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import Github from "./Github";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") === true);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <Router>
      <nav>
        <h1 className="page-name">Instructor Review</h1>
        <Link to="/home" > Home </Link>

        {!isAuth ? (
          <Link to="/login" className="login-btn"> Login </Link>
        ) : (
          <>
            <Link to="/createpost">Post</Link>
            <button onClick={signUserOut} className="logout"> Log Out</button>
          </>
        )}
      </nav>
        <Github />    
        <Routes>
          <Route path="/home" element={<Home isAuth={isAuth} />}  />
          <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        </Routes>


    </Router>
  );
}

export default App;