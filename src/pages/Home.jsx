import { Button } from "@material-tailwind/react";
import { PostCard } from "../components/PostCard";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  console.log(posts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data: response } = await axios(
          "http://localhost:5000/api/posts"
        );
        console.log(response, "response");
        setPosts(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <section>
        <div className="relative">
          <img src="hero.png" alt="hero" />
          <div className="bg-white p-[40px] w-[680px] rounded-xl absolute bottom-[-64px] left-[64px] shadow-[0_12px_24px_-6px_rgba(24,26,42,0.12)]">
            <div className="bg-[#4B6BFB] px-[10px] py-[4px] text-white rounded-md text-sm w-[90px]">
              Technology
            </div>
            <h1 className="text-[#181A2A] text-[40px] leading-[48px] font-semibold mt-4 mb-6 tracking-wide">
              The Impact of Technology on the Workplace: How Technology is
              Changing
            </h1>
            <div className="flex items-center  text-[#97989F]">
              <img src="hero-avatar.png" alt="hero-avatar" />
              <p className="ml-3 mr-5 ">Mykyta Krumalenko</p>
              <p>August 28, 2024</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-[150px]">
        <div className="grid  grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-8">
          {posts?.posts?.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
        <div className="w-full flex">
          <Button variant="outlined" className="mt-[50px] mb-[100px] mx-auto">
            Show More
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
