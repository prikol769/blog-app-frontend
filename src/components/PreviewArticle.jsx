import { formatDate } from "../utils/dateFormat";
import Badge from "./Badge";

const PreviewArticle = ({ title, content, category, author }) => {
  const upperCaseTitle = title.charAt(0).toUpperCase() + title.slice(1);
  return (
    <div className="pt-8 pb-[80px] max-w-[1000px] mx-auto relative w-[100%]">
      <Badge category={category ? category : "Your category"} />
      <h1 className="text-[#181A2A] text-4xl font-semibold mt-4 mb-5 leading-[52px]">
        {upperCaseTitle ? upperCaseTitle : "Your title"}
      </h1>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <img className="h-8 w-8" src="/hero-avatar.png" alt="hero-avatar" />
          <p className="text-[#97989F] text-sm font-semibold">{author}</p>
        </div>
        <p className="text-[#97989F] text-sm">{formatDate(new Date())}</p>
      </div>
      <div className="my-8">
        <img
          className="rounded-xl w-full"
          src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
          alt="card-image"
        />
      </div>
      <div className="content">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default PreviewArticle;
