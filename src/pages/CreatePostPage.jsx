import { Button, Textarea, Typography } from "@material-tailwind/react";
import FormInput from "../components/FormInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import axios from "axios";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
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
];

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

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
    <div className="mb-10">
      <form className="flex flex-col gap-4" onSubmit={createNewPost}>
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
          className="!border !rounded-lg !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 "
        />
        <Button type="submit">Create Post</Button>
      </form>
    </div>
  );
};

export default CreatePostPage;
