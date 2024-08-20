const Header = () => {
  return (
    <header className="flex justify-between p-6">
      <div>Blog</div>
      <nav className="flex gap-2">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </nav>
    </header>
  );
};

export default Header;
