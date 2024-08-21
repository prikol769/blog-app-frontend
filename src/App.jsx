import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { GlobalProvider } from "./context/GlobalContext";

const App = () => {
  return (
    <>
      <GlobalProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
          </Route>
        </Routes>
      </GlobalProvider>
    </>
  );
};

export default App;
