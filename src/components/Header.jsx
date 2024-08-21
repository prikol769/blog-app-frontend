import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const Header = () => {
  const { setUserInfo, userInfo } = useGlobalContext();

  useEffect(() => {
    const profileFetch = async () => {
      try {
        const { data: response } = await axios.get(
          "http://localhost:5000/api/auth/profile",
          { withCredentials: true }
        );
        setUserInfo(response);
      } catch (error) {
        console.log(error);
      }
    };
    profileFetch();
  }, []);

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setUserInfo(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="flex justify-between p-6">
      <Link to="/">Blog</Link>
      <nav className="flex gap-2">
        {userInfo?.username && (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!userInfo?.username && (
          <>
            <Link to="/sign-in">Sign In</Link>
            <Link to="/sign-up">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
