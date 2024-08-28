import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FormInput from "../components/FormInput";
import {
  Button,
  Spinner,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import AlertCustomCloseIcon from "../components/AlertCustomCloseIcon";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const EditProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [userDataPersonalStart, setUserDataPersonalStart] = useState({
    fullName: "",
    username: "",
    email: "",
  });
  const [userDataPersonal, setUserDataPersonal] = useState({
    fullName: "",
    username: "",
    email: "",
  });
  const [userDataPassword, setUserDataPassword] = useState({
    password: "",
    confirmPassword: "",
    currentPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: response } = await axios.get(
          `http://localhost:5000/api/users/${id}`
        );
        console.log(response, "response");
        setUser(response);
        setUserDataPersonal({
          ...userDataPersonal,
          fullName: response.fullName,
          username: response.username,
          email: response.email,
        });
        setUserDataPersonalStart({
          ...userDataPersonalStart,
          fullName: response.fullName,
          username: response.username,
          email: response.email,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmitPersonal = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data: response } = await axios.put(
        `http://localhost:5000/api/users/update-user/${id}`,
        {
          ...userDataPersonal,
          fullName: userDataPersonal.fullName.trim(),
        },
        { withCredentials: true }
      );
      console.log(response, "response");
      setUserDataPersonal({
        ...userDataPersonal,
        fullName: response.fullName,
        username: response.username,
        email: response.email,
      });
      setUserDataPersonalStart({
        ...userDataPersonalStart,
        fullName: response.fullName,
        username: response.username,
        email: response.email,
      });
      setError("Update successful!");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    if (userDataPassword.password !== userDataPassword.confirmPassword) {
      setError("The new password must match the confirm password.");
      return;
    }

    if (userDataPassword.currentPassword === userDataPassword.password) {
      setError("The new password must be different from current password.");
      return;
    }

    try {
      setIsLoading(true);
      const { data: response } = await axios.put(
        `http://localhost:5000/api/users/update-password/${id}`,
        {
          currentPassword: userDataPassword.currentPassword,
          newPassword: userDataPassword.password,
        },
        { withCredentials: true }
      );
      setUserDataPassword({
        password: "",
        confirmPassword: "",
        currentPassword: "",
      });
      console.log(response, "response");
      setError("Password updated successful!");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-20">
      <div className="bg-[#F6F6F7] p-12 rounded-xl flex flex-col gap-20 md:flex-row">
        <div className="mx-auto md:mx-0">
          <div className=" w-40 h-40 bg-black text-6xl font-semibold text-white rounded-full flex items-center justify-center">
            {user?.fullName[0]}
          </div>
          <p className="text-lg text-[#696A75] mt-4 text-nowrap">
            Collaborator & Editor
          </p>
        </div>
        <div className="flex flex-col gap-7 w-[600px] max-w-[100%]">
          <div className="ml-4">
            <p className="font-extrabold mb-1 text-xl">Basic Information</p>
            <p className=" text-sm text-[#757575]">
              Update your profile information below.
            </p>
          </div>
          <Tabs value="Personal" className="max-w-[40rem]">
            <TabsHeader
              className="bg-transparent mx-4 bg-white mb-4"
              indicatorProps={{
                className: "bg-gray-900/10 shadow-none !text-gray-900",
              }}
            >
              <Tab className="font-semibold" value={"Personal"}>
                Personal
              </Tab>
              <Tab className="font-semibold" value={"Password"}>
                Password
              </Tab>
            </TabsHeader>
            <TabsBody>
              <TabPanel value={"Personal"}>
                <form
                  onSubmit={handleSubmitPersonal}
                  className="flex flex-col gap-7 flex-1"
                >
                  <FormInput
                    required
                    minLength="3"
                    label="Full name"
                    placeholder="Enter your full name"
                    value={userDataPersonal.fullName}
                    onChange={(e) =>
                      setUserDataPersonal({
                        ...userDataPersonal,
                        fullName: e.target.value,
                      })
                    }
                  />
                  <FormInput
                    required
                    minLength="4"
                    label="Email"
                    placeholder="Enter your email address"
                    value={userDataPersonal.email}
                    onChange={(e) =>
                      setUserDataPersonal({
                        ...userDataPersonal,
                        email: e.target.value,
                      })
                    }
                  />
                  <FormInput
                    required
                    minLength="4"
                    label="Username"
                    placeholder="Set your username"
                    value={userDataPersonal.username}
                    onChange={(e) =>
                      setUserDataPersonal({
                        ...userDataPersonal,
                        username: e.target.value,
                      })
                    }
                  />
                  <Button
                    size="md"
                    className="mt-6 h-[48px] w-[80px] size-fit self-end"
                    type="submit"
                    disabled={
                      JSON.stringify(userDataPersonal) ===
                      JSON.stringify(userDataPersonalStart)
                    }
                  >
                    {isLoading ? <Spinner /> : "Save"}
                  </Button>
                </form>
              </TabPanel>
              <TabPanel value={"Password"}>
                <form
                  onSubmit={handleSubmitPassword}
                  className="flex flex-col flex-1 gap-7"
                >
                  <FormInput
                    required
                    minLength="4"
                    type={showPassword ? "text" : "password"}
                    label="Current password"
                    placeholder="Set your new password"
                    value={userDataPassword.currentPassword}
                    icon={
                      showPassword ? (
                        <EyeIcon
                          className="mt-2 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <EyeSlashIcon
                          className="mt-2 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )
                    }
                    onChange={(e) =>
                      setUserDataPassword({
                        ...userDataPassword,
                        currentPassword: e.target.value,
                      })
                    }
                  />
                  <FormInput
                    required
                    minLength="4"
                    type={showPassword ? "text" : "password"}
                    label="New password"
                    placeholder="Set your new password"
                    value={userDataPassword.password}
                    icon={
                      showPassword ? (
                        <EyeIcon
                          className="mt-2 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <EyeSlashIcon
                          className="mt-2 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )
                    }
                    onChange={(e) =>
                      setUserDataPassword({
                        ...userDataPassword,
                        password: e.target.value,
                      })
                    }
                  />
                  <FormInput
                    required
                    minLength="4"
                    type={showPassword ? "text" : "password"}
                    label="Confirm new password"
                    placeholder="Confirm your new password"
                    value={userDataPassword.confirmPassword}
                    icon={
                      showPassword ? (
                        <EyeIcon
                          className="mt-2 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <EyeSlashIcon
                          className="mt-2 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )
                    }
                    onChange={(e) =>
                      setUserDataPassword({
                        ...userDataPassword,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                  <Button
                    size="md"
                    className="mt-6 h-[48px] size-fit self-end"
                    type="submit"
                    disabled={
                      !userDataPassword.password ||
                      !userDataPassword.currentPassword ||
                      !userDataPassword.confirmPassword
                    }
                  >
                    {isLoading ? <Spinner /> : "Update password"}
                  </Button>
                </form>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </div>
      </div>
      {error && <AlertCustomCloseIcon message={error} setError={setError} />}
    </div>
  );
};

export default EditProfilePage;
