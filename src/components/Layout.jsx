import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
  return (
    <div className="max-w-[1400px] mx-auto px-[24px]">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
