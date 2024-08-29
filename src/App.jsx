import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { GlobalProvider } from "./context/GlobalContext";
import AuthLayout from "./components/AuthLayout";
import CreatePostPage from "./pages/CreatePostPage";
import PostPage from "./pages/PostPage";
import EditPostPage from "./pages/EditPostPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import EditProfilePage from "./pages/EditProfilePage";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const App = () => {
  return (
    <>
      <GlobalProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
          </Route>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/edit-post/:id" element={<EditPostPage />} />
            <Route path="/create-post" element={<CreatePostPage />} />
            <Route path="/edit-profile/:id" element={<EditProfilePage />} />
          </Route>
          <Route path="*" exact={true} element={<NotFoundPage />} />
        </Routes>
      </GlobalProvider>
    </>
  );
};

export default App;
