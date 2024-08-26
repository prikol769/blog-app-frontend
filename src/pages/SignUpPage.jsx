import { Button } from "@material-tailwind/react";
import FormInput from "../components/FormInput";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AlertCustomCloseIcon from "../components/AlertCustomCloseIcon";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullName: "",
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data: response } = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          ...userData,
        }
      );
      console.log(response, "response");
      setError("Sign Up successful!");
      setTimeout(() => {
        navigate("/sign-in");
      }, 3000);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh]">
      {error && <AlertCustomCloseIcon message={error} setError={setError} />}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-7 w-[500px] mb-[60px]"
      >
        <div className="text-center">
          <p className=" text-5xl font-extrabold mb-5">Sign Up</p>
          <p className="mt-[-10px]">Create your account</p>
        </div>
        <FormInput
          label="Full name"
          placeholder="Enter your full name"
          value={userData.fullName}
          onChange={(e) =>
            setUserData({ ...userData, fullName: e.target.value })
          }
        />
        <FormInput
          label="Email"
          placeholder="Enter your email address"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <FormInput
          label="Username"
          placeholder="Set your username"
          value={userData.username}
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
        />
        <FormInput
          type="password"
          label="Password"
          placeholder="Set your password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        <Button className="mt-6 h-[52px] text-md" type="submit">
          Sign Up
        </Button>
        <p className="text-center">
          Already have an account?{" "}
          <Link className="text-black font-semibold" to="/sign-in">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
