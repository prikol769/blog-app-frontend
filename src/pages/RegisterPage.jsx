import { Button } from "@material-tailwind/react";
import FormInput from "../components/FormInput";
import { useState } from "react";
import axios from "axios";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data: response } = await axios.post(
        "http://localhost:5000/register",
        {
          username,
          password,
        }
      );
      console.log(response, "response");
    } catch (error) {
      console.log(error);
    }
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
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default RegisterPage;
