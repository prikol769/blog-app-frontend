import { Button } from "@material-tailwind/react";
import FormInput from "../components/FormInput";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center">
      <form className="flex flex-col gap-10 w-[500px]">
        <FormInput placeholder="Username" label="Username" />
        <FormInput placeholder="Password" type="password" label="Password" />
        <Button>Login</Button>
      </form>
    </div>
  );
};

export default LoginPage;
