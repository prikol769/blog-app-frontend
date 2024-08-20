import { Button } from "@material-tailwind/react";
import FormInput from "../components/FormInput";

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center">
      <form className="flex flex-col gap-10 w-[500px]">
        <FormInput placeholder="Username" label="Username" />
        <FormInput placeholder="Password" type="password" label="Password" />
        <Button>Register</Button>
      </form>
    </div>
  );
};

export default RegisterPage;
