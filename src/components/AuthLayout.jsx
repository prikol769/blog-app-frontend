import { Outlet } from "react-router-dom";
import ParticlesComponent from "./Particles";

function AuthLayout() {
  return (
    <>
      <ParticlesComponent id="particles" />
      <div className="max-w-[1400px] mx-auto">
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default AuthLayout;
