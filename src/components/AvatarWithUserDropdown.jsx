import React from "react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

export function AvatarWithUserDropdown({ onLogout }) {
  const navigate = useNavigate();
  const { userInfo } = useGlobalContext();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  // profile menu component
  const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
      link: `/profile/${userInfo.id}`,
    },
    {
      label: "Edit Profile",
      icon: Cog6ToothIcon,
      link: `/edit-profile/${userInfo.id}`,
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
      link: "/",
    },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center rounded-full p-0"
        >
          <p className="h-12 w-12 text-xl font-semibold text-white rounded-full bg-black flex items-center justify-center ">
            {userInfo.fullName[0]}
          </p>
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, link }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => {
                closeMenu();
                if (!isLastItem) {
                  navigate(link);
                }
                if (isLastItem) {
                  onLogout();
                }
              }}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
