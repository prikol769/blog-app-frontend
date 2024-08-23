import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Badge from "./Badge";

export function PostCard() {
  return (
    <Card className="pt-10 max-w-[600px] w-auto min-w-96 shadow-[0px_4px_6px_1px_rgb(0,0,0,0.1)]">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
          alt="card-image"
        />
      </CardHeader>
      <CardBody>
        <Badge />
        <Typography variant="h5" color="blue-gray" className="mb-2 mt-5">
          UI/UX Review Check
        </Typography>
        <p className="line-clamp-2">
          The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to &quot;Naviglio&quot; where you can enjoy the main
          night life in Barcelona.
        </p>
      </CardBody>
      <CardFooter className="pt-0 flex items-center justify-between">
        <Button>Read More</Button>
        <p className="text-[#97989F] text-sm">August 28, 2024</p>
      </CardFooter>
    </Card>
  );
}
