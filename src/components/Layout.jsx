import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-[24px]">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
