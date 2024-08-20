import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between p-6">
      <Link to="/">Blog</Link>
      <nav className="flex gap-2">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  );
};

export default Header;
