import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-[24px]">
        <Header />
        <main className="min-h-[calc(100vh-572px)]">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
