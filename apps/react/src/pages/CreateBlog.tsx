import { useMutation, useQuery } from "@tanstack/react-query";
import SuperAdminProtectedWrap from "../hoc/SuperAdminProtectedWrap";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaBold, FaItalic, FaUndo, FaRedo, FaUnderline } from "react-icons/fa";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useState } from "react";

function unprotectedCreateBlog() {
  const { mutate } = useMutation({
    mutationFn: async (content: any) => {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/postBlog`,
        content,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: (data: any) => {
      toast.success(data.message);
      navigate("/");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
      console.error("Failed to create blog", error.response?.data?.message);
    },
  });

  const navigate = useNavigate();

  const editor: any = useEditor({
    extensions: [StarterKit, Underline],
    content: "",
  });

  const [title, setTitle] = useState("");

  const submitFunction = () => {
    const html = editor.getHTML();
    const submitObj = {
      title,
      description: html,
    };
    mutate(submitObj);
    // console.log(html);
  };

  return (
    <>
      <div className="flex flex-col gap-[3rem]">
        <div className="flex justify-center gap-[1rem] border-2 p-5 mt-5">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={
              editor.isActive("bold")
                ? "border-black border-2 text-red-600 p-1 cursor-pointer"
                : "border-black border-2 p-1 cursor-pointer"
            }
          >
            <FaBold />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={
              editor.isActive("italic")
                ? "border-black border-2 text-red-600 p-1 cursor-pointer"
                : "border-black border-2 p-1 cursor-pointer"
            }
          >
            <FaItalic />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={
              editor.isActive("underline")
                ? "border-black border-2 text-red-600 p-1 cursor-pointer"
                : "border-black border-2 p-1 cursor-pointer"
            }
          >
            <FaUnderline />
          </button>
          <button
            onClick={() => editor.chain().focus().undo().run()}
            className="border-black border-2 p-1 cursor-pointer"
          >
            <FaUndo />
          </button>

          <button
            onClick={() => editor.chain().focus().redo().run()}
            className="border-black border-2 p-1 cursor-pointer"
          >
            <FaRedo />
          </button>
        </div>

        <button className="border-2 block self-center px-[4rem] py-[1rem]  cursor-pointer">
          Upload Image
        </button>

        <div className="mx-[4rem]">
          <span className="text-2xl font-extrabold">Title:</span>
          <input
            type="text"
            className=" border-2 h-[3rem] w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className=" mx-[4rem]">
          <span className="text-2xl font-extrabold">Description:</span>
          <EditorContent editor={editor} className="border-2 " />
        </div>
        <button
          className="mb-[10rem] border-2 self-center px-[1rem] cursor-pointer"
          onClick={submitFunction}
        >
          Submit
        </button>
      </div>
    </>
  );
}

export const CreateBlog = SuperAdminProtectedWrap(unprotectedCreateBlog);
