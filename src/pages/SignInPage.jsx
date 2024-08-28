import { Button } from "@material-tailwind/react";
import FormInput from "../components/FormInput";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import AlertCustomCloseIcon from "../components/AlertCustomCloseIcon";

const SignInPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh]">
      {error && <AlertCustomCloseIcon message={error} setError={setError} />}
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-8 w-[500px] mb-[60px]"
      >
        <div className="text-center">
          <p className=" text-5xl font-extrabold mb-5">Welcome Back</p>
          <p className="mt-[-10px]">Enter your credentials to login</p>
        </div>
        <FormInput
          required
          minLength="4"
          placeholder="Enter your username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormInput
          required
          minLength="4"
          placeholder="Enter your password"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="mt-6 h-[52px] text-md" type="submit">
          Sign In
        </Button>
        <p className="text-center">
          New to MK Blog?{" "}
          <Link className="text-black font-semibold" to="/sign-up">
            Join now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignInPage;
