import { Button } from "@material-tailwind/react";
import FormInput from "../components/FormInput";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const SignInPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUserInfo } = useGlobalContext();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data: response } = await axios.post(
        "http://localhost:5000/api/auth/signin",
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      console.log(response, "response");
      if (response._id) {
        setUserInfo(response);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        <Button type="submit">Sign In</Button>
      </form>
    </div>
  );
};

export default SignInPage;
