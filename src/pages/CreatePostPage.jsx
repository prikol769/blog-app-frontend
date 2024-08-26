import {
  Button,
  ButtonGroup,
  Textarea,
  Typography,
} from "@material-tailwind/react";

import FormInput from "../components/FormInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import axios from "axios";
import { PreviwPostCard } from "../components/PreviwPostCard";
import { useGlobalContext } from "../context/GlobalContext";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import "highlight.js/styles/monokai-sublime.css";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("css", css);

const modules = {
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value,
  },
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "code-block"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "code-block",
];

const CreatePostPage = () => {
  const { userInfo } = useGlobalContext();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [previewCard, setPreviewCard] = useState(false);
  const [previewArticle, setPreviewArticle] = useState(false);
  console.log(previewCard, "previewCard");

  const createNewPost = async (e) => {
    e.preventDefault();
    try {
      const { data: response } = await axios.post(
        "http://localhost:5000/api/posts",
        {
          title,
          summary,
          content,
          category,
        },
        { withCredentials: true }
      );
      console.log(response, "response");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-10 relative">
      <div className="py-4 flex items-center justify-end">
        <ButtonGroup variant="outlined">
          <Button
            className={`${
              previewCard ? "bg-[#212121] text-white" : "bg-white text-black"
            }`}
            onClick={() => {
              setPreviewCard(!previewCard);
              setPreviewArticle(false);
            }}
          >
            Card
          </Button>
          <Button
            className={`${
              previewArticle ? "bg-[#212121] text-white" : "bg-white text-black"
            }`}
            onClick={() => {
              setPreviewArticle(!previewArticle);
              setPreviewCard(false);
            }}
          >
            Article
          </Button>
        </ButtonGroup>
      </div>
      <div
        className={`flex flex-col lg:flex-row ${previewCard ? "gap-12" : ""} `}
      >
        <form className="flex flex-col gap-4 flex-1" onSubmit={createNewPost}>
          <div className="flex gap-6">
            <FormInput
              label="Title"
              maxLength="200"
              required
              placeholder="Technology is our future!"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <FormInput
              label="Category"
              required
              maxLength="15"
              placeholder="Next.js React JavaScript"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Summary
            </Typography>
            <Textarea
              labelProps={{
                className: "hidden",
              }}
              maxLength="400"
              className=" !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              required
              placeholder="Provide a brief overview of the key points discussed..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>
          <ReactQuill
            required
            modules={modules}
            formats={formats}
            value={content}
            onChange={(newValue) => setContent(newValue)}
            className="!border !rounded-lg !border-gray-300  bg-white text-gray-900 shadow-lg shadow-gray-900/5 "
          />
          <Button type="submit">Create Post</Button>
        </form>
        <div className="max-w-[430px]">
          {previewCard && (
            <div>
              <PreviwPostCard
                title={title}
                category={category}
                summary={summary}
                author={userInfo.fullName}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
