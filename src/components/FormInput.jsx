import { Input, Typography } from "@material-tailwind/react";

const FormInput = ({ placeholder, type = "text", label }) => {
  return (
    <div className="w-full">
      <Typography
        variant="small"
        color="blue-gray"
        className="mb-2 font-medium"
      >
        {label}
      </Typography>
      <Input
        type={type}
        placeholder={placeholder}
        labelProps={{
          className: "hidden",
        }}
        className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
      />
    </div>
  );
};

export default FormInput;
