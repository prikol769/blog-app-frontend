import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/dateFormat";

export function PostCard({ post }) {
  const navigate = useNavigate();
  const { category, title, summary, _id, createdAt, author } = post;

  const handleClick = () => {
    navigate(`/post/${_id}`);
  };

  const upperCaseTitle = title.charAt(0).toUpperCase() + title.slice(1);
  return (
    <Card className="pt-10 max-w-[600px] w-auto min-w-96 shadow-[0px_4px_6px_1px_rgb(0,0,0,0.1)] min-h-[480px] max-h-[480px] justify-between">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
          alt="card-image"
        />
      </CardHeader>
      <CardBody className="min-h-[175px]">
        <Badge category={category} />
        <h5
          color="blue-gray"
          className="mb-2 mt-5 line-clamp-1 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-inherit"
        >
          {upperCaseTitle}
        </h5>
        <p className="line-clamp-2">{summary}</p>
      </CardBody>
      <hr className="mb-5" />
      <CardFooter className="pt-0 flex items-center justify-between">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <img className="h-8 w-8" src="/hero-avatar.png" alt="hero-avatar" />
            <div>
              <p className="text-[#97989F] text-xs font-semibold">{author}</p>
              <p className="text-[#97989F] text-xs">{formatDate(createdAt)}</p>
            </div>
          </div>
          <Button className="w-[50%]" onClick={handleClick}>
            Read More
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
