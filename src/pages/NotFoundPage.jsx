import { Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-[calc(100vh-135px)] text-[#212121] max-w-[768px] text-center m-auto px-4">
        <div className="flex items-end">
          <Typography
            variant="h1"
            className="text-[150px] leading-[140px] mr-[-40px] z-10"
          >
            404
          </Typography>
          <img src="/cactus.png" width="200px" />
        </div>
        <Typography variant="h2" className="mt-5">
          Lost in the Digital Wilderness
        </Typography>
        <Typography
          variant="paragraph"
          className="text-[#616161] text-xl mt-5 mb-12"
        >
          {
            "You've ventured into uncharted digital territory. The page you seek has eluded us. Let's guide you back to familiar paths."
          }
        </Typography>
        <Button onClick={() => navigate("/")}>BACK TO HOME</Button>
      </div>
      <div className="animation-container">
        <div className="tumbleweed"></div>
        <div className="pebble1"></div>
        <div className="pebble2"></div>
        <div className="pebble3"></div>
      </div>
    </div>
  );
};

export default NotFoundPage;
