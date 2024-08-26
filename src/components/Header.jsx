import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { Button } from "@material-tailwind/react";
import { AvatarWithUserDropdown } from "./AvatarWithUserDropdown";

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
    <header className="flex justify-between items-center py-6">
      <Link className="text-lg font-semibold" to="/">
        <img src="/Logo.png" />
      </Link>
      <nav className="flex gap-2 items-center ">
        {userInfo?.fullName && (
          <>
            <Link to="/create-post">
              <Button variant="text"> Create new post</Button>
            </Link>
            <AvatarWithUserDropdown onLogout={logout} />
          </>
        )}
        {!userInfo?.fullName && (
          <>
            <Link to="/sign-in">
              <Button variant="text">Sign In</Button>
            </Link>
            <Link to="/sign-up">
              <Button>Join</Button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
