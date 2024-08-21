import { Button } from "@material-tailwind/react";
import FormInput from "../components/FormInput";
import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data: response } = await axios.post(
        "http://localhost:5000/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      console.log(response, "response");
      if (response.id) {
        setRedirect(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleLogin} className="flex flex-col gap-10 w-[500px]">
        <FormInput
          placeholder="Username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormInput
          placeholder="Password"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default LoginPage;
