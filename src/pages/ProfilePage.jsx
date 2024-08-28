import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostCard } from "../components/PostCard";
import { useGlobalContext } from "../context/GlobalContext";
import { Modal } from "../components/Modal";

const ProfilePage = () => {
  const { userInfo } = useGlobalContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletedPostId, setDeletedPostId] = useState("");
  const [deleteResponse, setDeleteResponse] = useState(null);
  console.log(deleteResponse, "deleteResponse");

  const isPostCreator = userInfo?.id === id;
  console.log(userPosts, "userPosts");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: response } = await axios.get(
          `http://localhost:5000/api/users/${id}`
        );
        console.log(response, "response");
        setUser(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
    const fetchUserPosts = async () => {
      try {
        const { data: response } = await axios.get(
          `http://localhost:5000/api/posts/user-posts/${id}`
        );
        console.log(response, "response");
        setUserPosts(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserPosts();
  }, [id]);

  const handleDeletePost = async () => {
    try {
      const data = await axios.delete(
        `http://localhost:5000/api/posts/${deletedPostId}/${id}`,
        { withCredentials: true }
      );
      console.log(data, "data");
      setDeleteResponse(data.data);

      if (data.statusText === "OK") {
        const filteredPosts = userPosts.posts.filter(
          (post) => post._id !== deletedPostId
        );

        setUserPosts({ ...userPosts, posts: filteredPosts });
      }

      setDeletedPostId("");
    } catch (error) {
      console.log(error);
    }
  };

  const openDeleteModalHandler = (postId) => {
    setDeleteModalOpen(true);
    setDeletedPostId(postId);
  };

  return (
    <div>
      <div className="bg-[#F6F6F7] p-12 rounded-xl flex flex-col justify-center items-center gap-4 text-center">
        <div className=" w-40 h-40 bg-black text-6xl font-semibold text-white rounded-full  flex items-center justify-center">
          M
        </div>
        <div>
          <p className="text-xl font-semibold text-[#181A2A]">
            {user?.fullName}
          </p>
          <p className="text-lg text-[#696A75]">Collaborator & Editor</p>
        </div>
      </div>
      <div className="py-12">
        <p className="text-xl font-semibold text-[#181A2A] mb-8">
          Latest Posts
        </p>
        {userPosts?.posts?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-8">
            {userPosts?.posts?.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                isPostCreator={isPostCreator}
                openDeleteModalHandler={(postId) =>
                  openDeleteModalHandler(postId)
                }
                handleEditPost={() => navigate(`/edit-post/${post._id}`)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-2xl text-[#696A75]">
            No posts have been made yet.
          </p>
        )}
      </div>
      {deleteModalOpen && (
        <Modal
          open={deleteModalOpen}
          setOpen={setDeleteModalOpen}
          handleDelete={handleDeletePost}
          deleteResponse={deleteResponse}
          setDeleteResponse={setDeleteResponse}
        />
      )}
    </div>
  );
};

export default ProfilePage;
