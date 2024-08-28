import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Badge from "../components/Badge";
import { formatDate } from "../utils/dateFormat";
import { useGlobalContext } from "../context/GlobalContext";
import { Button } from "@material-tailwind/react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Modal } from "../components/Modal";

const PostPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userInfo } = useGlobalContext();
  const [post, setPost] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteResponse, setDeleteResponse] = useState(null);

  const isPostCreator = userInfo.id === post.userId;

  console.log(userInfo, "userInfo");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data: response } = await axios.get(
          `http://localhost:5000/api/posts/${id}`
        );
        console.log(response, "response");
        setPost(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [id]);

  const handleDeletePost = async () => {
    try {
      const { data: response } = await axios.delete(
        `http://localhost:5000/api/posts/${id}/${post.userId}`,
        { withCredentials: true }
      );
      console.log(response, "response");
      setDeleteResponse(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPost = async () => {
    navigate(`/edit-post/${id}`);
  };

  return (
    <div className="pt-8 pb-[80px] max-w-[1000px] mx-auto relative">
      {isPostCreator && (
        <div className="flex gap-4 pb-4 justify-end">
          <Button
            onClick={handleEditPost}
            size="md"
            className="flex items-center gap-3 pl-4"
          >
            <PencilSquareIcon className="w-4 h-4" />
            Edit
          </Button>
          <Button
            size="md"
            color="red"
            className="flex items-center gap-3 pl-4"
            onClick={() => setDeleteModalOpen(true)}
          >
            <TrashIcon className="w-4 h-4" /> Delete
          </Button>
          {
            <Modal
              open={deleteModalOpen}
              setOpen={setDeleteModalOpen}
              handleDelete={handleDeletePost}
              deleteResponse={deleteResponse}
              navigateTo="/"
            />
          }
        </div>
      )}
      <Badge category={post.category} />
      <h1 className="text-[#181A2A] text-4xl font-semibold mt-4 mb-5 leading-[52px]">
        {post.title}
      </h1>
      <div className="flex items-center gap-6">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate(`/profile/${post.userId}`)}
        >
          <img className="h-8 w-8" src="/hero-avatar.png" alt="hero-avatar" />
          <p className="text-[#97989F] text-sm font-semibold">{post.author}</p>
        </div>
        <p className="text-[#97989F] text-sm">{formatDate(post.createdAt)}</p>
      </div>
      <div className="my-8">
        <img
          className="rounded-xl w-full"
          src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
          alt="card-image"
        />
      </div>
      <div className="content">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  );
};

export default PostPage;
