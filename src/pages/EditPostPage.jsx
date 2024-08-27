import {
  Button,
  ButtonGroup,
  IconButton,
  Textarea,
  Typography,
} from "@material-tailwind/react";

import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";

import FormInput from "../components/FormInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { PreviewPostCard } from "../components/PreviewPostCard";
import { useGlobalContext } from "../context/GlobalContext";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import "highlight.js/styles/monokai-sublime.css";
import PreviewArticle from "../components/PreviewArticle";
import { useNavigate, useParams } from "react-router-dom";

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

const EditPostPage = () => {
  const { userInfo } = useGlobalContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

  const [previewCard, setPreviewCard] = useState(false);
  const [previewArticle, setPreviewArticle] = useState(false);
  const [previewFullArticle, setPreviewFullArticle] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data: response } = await axios.get(
          `http://localhost:5000/api/posts/${id}`
        );
        const { title, category, summary, content } = response;
        setTitle(title);
        setCategory(category);
        setSummary(summary);
        setContent(content);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);

  const updatePost = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.put(
        `http://localhost:5000/api/posts/${id}/${userInfo.id}`,
        {
          title,
          summary,
          content,
          category,
        },
        { withCredentials: true }
      );
      console.log(data, "data");
      if (data.statusText == "OK") {
        navigate(`/post/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-10 relative">
      <div className="py-4 flex items-center justify-end">
        {previewArticle && (
          <IconButton
            variant="outlined"
            className={`mr-5 ${
              previewFullArticle
                ? "bg-[#212121] text-white"
                : "bg-white text-black"
            }`}
            onClick={() => {
              setPreviewFullArticle(!previewFullArticle);
            }}
          >
            <ArrowsPointingOutIcon className="w-5 h-5" />
          </IconButton>
        )}
        <ButtonGroup variant="outlined">
          <Button
            className={`${
              previewCard ? "bg-[#212121] text-white" : "bg-white text-black"
            }`}
            onClick={() => {
              setPreviewCard(!previewCard);
              setPreviewArticle(false);
              setPreviewFullArticle(false);
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
              setPreviewFullArticle(false);
            }}
          >
            Article
          </Button>
        </ButtonGroup>
      </div>
      <div
        className={`flex  ${previewCard || previewArticle ? "gap-12" : ""} ${
          previewCard ? "flex-col lg:flex-row gap-12" : ""
        }  ${previewArticle ? "flex-col 2xl:flex-row gap-12" : ""}`}
      >
        <form
          className={`flex flex-col gap-4 flex-1 ${
            previewFullArticle ? "hidden" : ""
          }`}
          onSubmit={updatePost}
        >
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
            onChange={(newValue) => {
              setContent(newValue);
            }}
            className="!border !rounded-lg !border-gray-300  bg-white text-gray-900 shadow-lg shadow-gray-900/5 "
          />
          <Button className="z-10" type="submit">
            Save Post
          </Button>
        </form>

        {previewCard && (
          <div className="max-w-[430px]">
            <PreviewPostCard
              title={title}
              category={category}
              summary={summary}
              author={userInfo.fullName}
            />
          </div>
        )}

        {previewArticle && (
          <div
            className={`flex max-w-[100%] ${
              previewFullArticle
                ? "max-w-[1000px] w-full mx-auto"
                : "2xl:max-w-[50%]"
            }`}
          >
            <PreviewArticle
              title={title}
              category={category}
              author={userInfo.fullName}
              content={content}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EditPostPage;
