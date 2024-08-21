import { Button } from "@material-tailwind/react";
import FormInput from "../components/FormInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data: response } = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          username,
          password,
        }
      );
      console.log(response, "response");
    } catch (error) {
      console.log(error);
    }
    navigate("/sign-in");
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-[500px]">
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
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpPage;
